# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.common.exceptions import StaleElementReferenceException, WebDriverException
# import time

# app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests

# # Load XSS payloads from a file
# def load_payloads(filename):
#     try:
#         with open(filename, "r", encoding="utf-8") as file:
#             payloads = file.read().splitlines()
#         return payloads
#     except FileNotFoundError:
#         print(f"Error: {filename} not found.")
#         return []

# # XSS Testing Function
# def test_xss(url):
#     # Load the XSS payloads
#     xss_payloads = load_payloads("B-payloads.txt")
#     if not xss_payloads:
#         return {"success": False, "message": "No payloads found"}

#     detected_payloads = []

#     # Set up Selenium WebDriver
#     driver = webdriver.Chrome()  # Ensure you have the correct WebDriver for your browser
#     try:
#         # Navigate to the provided URL
#         driver.get(url)
#         print(f"Navigated to {url}.")

#         # Find forms on the page
#         forms = driver.find_elements(By.TAG_NAME, "form")
#         if not forms:
#             return {"success": False, "message": "No forms found on the page"}

#         print(f"Found {len(forms)} forms. Testing for XSS vulnerabilities...")

#         for form_index, form in enumerate(forms):
#             for payload in xss_payloads:
#                 try:
#                     # Re-locate the form to avoid stale element reference
#                     forms = driver.find_elements(By.TAG_NAME, "form")
#                     form = forms[form_index]

#                     # Locate text input fields in the form
#                     inputs = form.find_elements(By.TAG_NAME, "input")

#                     # Inject the payload into the input fields
#                     for input_field in inputs:
#                         if input_field.get_attribute("type") == "text":
#                             # Clear the input field explicitly using JavaScript
#                             driver.execute_script("arguments[0].value = '';", input_field)
#                             time.sleep(0.5)  # Small delay to ensure the field is cleared
#                             input_field.send_keys(payload)
#                             print(f"Injected payload: {payload}")

#                     # Submit the form
#                     form.submit()
#                     time.sleep(2)  # Wait for the response to load

#                     # Check if the payload is reflected in the page source
#                     if payload in driver.page_source and payload not in detected_payloads:
#                         detected_payloads.append(payload)
#                         print(f"Potential XSS vulnerability detected with payload: {payload}")
#                 except StaleElementReferenceException:
#                     print("Encountered StaleElementReferenceException. Re-locating elements...")
#                     continue

#         return {
#             "success": True,
#             "message": "XSS testing completed",
#             "detected_payloads": detected_payloads,
#         }

#     except WebDriverException as e:
#         print(f"WebDriver error: {e}")
#         return {"success": False, "message": "Error during Selenium interaction"}
#     finally:
#         driver.quit()


# # Flask API Endpoint
# @app.route("/api/test-xss", methods=["POST"])
# def test_xss_endpoint():
#     try:
#         data = request.json
#         if not data or "url" not in data:
#             return jsonify({"success": False, "message": "URL is required"}), 400

#         url = data["url"]
#         result = test_xss(url)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"success": False, "message": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)




############################################################



from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import StaleElementReferenceException, WebDriverException
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable WebSocket communication

# Load XSS payloads from a file
def load_payloads(filename):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            payloads = file.read().splitlines()
        return payloads
    except FileNotFoundError:
        print(f"Error: {filename} not found.")
        return []

# XSS Testing Function
def test_xss(url):
    # Load the XSS payloads
    xss_payloads = load_payloads("S-payloads.txt")
    if not xss_payloads:
        return {"success": False, "message": "No payloads found"}

    detected_payloads = []

    # Set up Selenium WebDriver in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=chrome_options)

    try:
        # Navigate to the provided URL
        driver.get(url)
        socketio.emit("update", {"message": f"Navigated to {url}"})

        # Find forms on the page
        forms = driver.find_elements(By.TAG_NAME, "form")
        if not forms:
            return {"success": False, "message": "No forms found on the page"}

        socketio.emit("update", {"message": f"Found {len(forms)} forms. Testing for XSS vulnerabilities..."})

        for form_index, form in enumerate(forms):
            for payload in xss_payloads:
                try:
                    # Re-locate the form to avoid stale element reference
                    forms = driver.find_elements(By.TAG_NAME, "form")
                    form = forms[form_index]

                    # Locate text input fields in the form
                    inputs = form.find_elements(By.TAG_NAME, "input")

                    # Inject the payload into the input fields
                    for input_field in inputs:
                        if input_field.get_attribute("type") == "text":
                            driver.execute_script("arguments[0].value = '';", input_field)
                            time.sleep(0.5)
                            input_field.send_keys(payload)
                            socketio.emit("update", {"message": f"Testing payload: {payload}"})

                    # Submit the form
                    form.submit()
                    time.sleep(0.5)

                    # Check if the payload is reflected in the page source
                    if payload in driver.page_source and payload not in detected_payloads:
                        detected_payloads.append(payload)
                        socketio.emit(
                            "update",
                            {"message": f"Potential XSS vulnerability detected with payload: {payload}"},
                        )
                except StaleElementReferenceException:
                    socketio.emit("update", {"message": "Encountered StaleElementReferenceException. Retrying..."})
                    continue

        return {
            "success": True,
            "message": "XSS testing completed",
            "detected_payloads": detected_payloads,
        }

    except WebDriverException as e:
        print(f"WebDriver error: {e}")
        return {"success": False, "message": "Error during Selenium interaction"}
    finally:
        driver.quit()

# Flask API Endpoint
@app.route("/api/test-xss", methods=["POST"])
def test_xss_endpoint():
    try:
        data = request.json
        if not data or "url" not in data:
            return jsonify({"success": False, "message": "URL is required"}), 400

        url = data["url"]
        result = test_xss(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
