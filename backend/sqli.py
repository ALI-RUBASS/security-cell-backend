from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.common.exceptions import (
    NoAlertPresentException,
    UnexpectedAlertPresentException,
    StaleElementReferenceException,
)
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable WebSocket communication


# Function to load SQL injection payloads from a file
def load_payloads(filename):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            payloads = file.read().splitlines()
        return payloads
    except FileNotFoundError:
        print(f"Error: {filename} not found.")
        return []
    except UnicodeDecodeError as e:
        print(f"UnicodeDecodeError: {e}. Please ensure the file is encoded in UTF-8.")
        return []


# Function to handle alerts
def handle_alert(driver):
    try:
        alert = Alert(driver)
        alert_text = alert.text
        alert.accept()
        return f"Alert detected with text: {alert_text}"
    except NoAlertPresentException:
        return None
    except UnexpectedAlertPresentException:
        return "Unexpected alert present."


# Function to check for SQL errors or data leaks
def check_sql_error_or_data_leak(page_source, payload):
    sql_errors = [
        "SQL syntax",
        "database error",
        "MySQL error",
        "error in your SQL syntax",
        "you have an error in your SQL syntax",
    ]
    for error in sql_errors:
        if error.lower() in page_source.lower():
            return True
    if "First name:" in page_source or "ID:" in page_source:
        return True
    return False


# SQL Injection Testing Function
def test_sql_injection(data):
    sql_injection_url = data.get("url")
    # sql_injection_url = "https://www.instagram.com/";
    sql_payloads = load_payloads("sql-payloads.txt")
    requires_login = data.get("requires_login", False)
    login_url = data.get("login_url")
    username = data.get("username")
    password = data.get("password")

    if not sql_payloads:
        return {"success": False, "message": "No payloads found."}

    if not sql_injection_url:
        return {"success": False, "message": "SQL injection URL is required."}

    # Configure Selenium WebDriver in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=chrome_options)

    detected_payloads = []

    try:
        # Perform login if required
        if requires_login:
            driver.get(login_url)
            driver.find_element(By.NAME, "username").send_keys(username)
            driver.find_element(By.NAME, "password").send_keys(password)
            driver.find_element(By.NAME, "Login").click()
            time.sleep(2)
            if "Login failed" in driver.page_source:
                return {"success": False, "message": "Login failed."}

        driver.get(sql_injection_url)
        forms = driver.find_elements(By.TAG_NAME, "form")
        if not forms:
            return {"success": False, "message": "No forms found."}

        for form_index, form in enumerate(forms):
            for payload in sql_payloads:
                try:
                    forms = driver.find_elements(By.TAG_NAME, "form")
                    form = forms[form_index]

                    inputs = form.find_elements(By.TAG_NAME, "input")
                    for input_field in inputs:
                        if input_field.get_attribute("type") in ["text", "search"]:
                            # Clear the input field explicitly using JavaScript
                            driver.execute_script("arguments[0].value = '';", input_field)
                            time.sleep(0.5)
                            input_field.send_keys(payload)
                            update_message = f"Testing payload: {payload}"
                            print(update_message)  # Print on console
                            socketio.emit("update", {"message": update_message})

                    original_page_source = driver.page_source
                    form.submit()
                    time.sleep(2)

                    alert_message = handle_alert(driver)
                    if alert_message and payload not in detected_payloads:
                        detected_payloads.append(payload)
                        update_message = f"Alert detected with payload: {payload}"
                        print(update_message)  # Print on console
                        socketio.emit("update", {"message": update_message})

                    new_page_source = driver.page_source
                    if (
                        original_page_source != new_page_source
                        and check_sql_error_or_data_leak(new_page_source, payload)
                        and payload not in detected_payloads
                    ):
                        detected_payloads.append(payload)
                        update_message = f"SQL Injection vulnerability detected with payload: {payload}"
                        print(update_message)  # Print on console
                        socketio.emit("update", {"message": update_message})

                except StaleElementReferenceException:
                    retry_message = "Retrying due to stale element reference."
                    print(retry_message)  # Print on console
                    socketio.emit("update", {"message": retry_message})
                    continue

        return {
            "success": True,
            "message": "SQL Injection testing completed.",
            "detected_payloads": detected_payloads,
        }

    finally:
        driver.quit()


# Flask API Endpoint
@app.route("/api/test-sql-injection", methods=["POST"])
def test_sql_injection_endpoint():
    try:
        data = request.json
        result = test_sql_injection(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5001)
