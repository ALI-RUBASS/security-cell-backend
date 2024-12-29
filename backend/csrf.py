from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Fetch dynamic content using Selenium
def fetch_dynamic_content(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)

    page_source = driver.page_source
    driver.quit()
    return BeautifulSoup(page_source, 'html.parser')

# Detect CSRF vulnerabilities in forms
def detect_csrf(url):
    socketio.emit("update", {"message": f"Scanning {url} for CSRF vulnerabilities..."})
    soup = fetch_dynamic_content(url)

    forms = soup.find_all('form')
    results = {
        "forms_analyzed": len(forms),
        "csrf_vulnerabilities": []
    }

    if len(forms) == 0:
        socketio.emit("update", {"message": "No forms detected on the page."})
        return results

    for form in forms:
        action = form.get('action')
        method = form.get('method', 'get').lower()
        inputs = form.find_all('input')

        # Convert relative URLs to absolute URLs
        action_url = urljoin(url, action) if action else url

        has_csrf_token = False
        input_details = []
        for input_field in inputs:
            input_name = input_field.get('name')
            input_type = input_field.get('type')
            input_value = input_field.get('value')
            input_details.append({
                "name": input_name,
                "type": input_type,
                "value": input_value
            })

            if input_type == 'hidden' and 'csrf' in input_name.lower():
                has_csrf_token = True

        if not has_csrf_token:
            vulnerability = {
                "action": action_url,
                "method": method,
                "inputs": input_details
            }
            results["csrf_vulnerabilities"].append(vulnerability)
            socketio.emit("update", {
                "message": f"CSRF vulnerability detected: Action={action_url}, Method={method}, Inputs={input_details}"
            })

    return results

# Flask API Endpoint
@app.route("/api/test-csrf", methods=["POST"])
def test_csrf_endpoint():
    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "URL is required"}), 400

        results = detect_csrf(url)
        return jsonify(results)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5002)
