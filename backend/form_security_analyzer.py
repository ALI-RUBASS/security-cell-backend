from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def analyze_forms(url):
    socketio.emit("update", {"message": f"🔍 Analyzing forms on: {url}"})
    print(f"🔍 Analyzing forms on: {url}")  # Console log

    results = {
        "total_forms": 0,
        "secure_forms": 0,
        "insecure_forms": 0,
        "forms": [],
        "tests_performed": []
    }

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            fail_message = f"❌ Failed to fetch website content from {url}. Status Code: {response.status_code}"
            print(fail_message)
            socketio.emit("update", {"message": fail_message})
            return {"success": False, "message": fail_message}

        html_content = response.text
        soup = BeautifulSoup(html_content, "html.parser")
        forms = soup.find_all("form")
        results["total_forms"] = len(forms)

        for i, form in enumerate(forms):
            form_info = {
                "index": i + 1,
                "action": form.get("action"),
                "method": form.get("method", "GET").upper(),
                "issues": [],
                "tests": []
            }

            # 1️⃣ **Check form action URL:** It should be present and use HTTPS.
            action = form.get("action")
            form_info["tests"].append("Checked form action URL.")
            if action:
                if not action.lower().startswith("https://"):
                    form_info["issues"].append("Form action is not secure (not HTTPS).")
            else:
                form_info["issues"].append("Form action is missing.")

            # 2️⃣ **Check form method:** Ideally should be POST for sensitive data.
            form_info["tests"].append("Checked form method (GET vs. POST).")
            if form_info["method"] != "POST":
                form_info["issues"].append(f"Form method is {form_info['method']} (expected POST).")

            # 3️⃣ **Check for CAPTCHA presence.**
            form_info["tests"].append("Checked for CAPTCHA.")
            captcha_found = False
            if form.find(attrs={"class": re.compile("captcha", re.I)}) or form.find(attrs={"id": re.compile("captcha", re.I)}):
                captcha_found = True
            if "g-recaptcha" in str(form).lower() or "hcaptcha" in str(form).lower():
                captcha_found = True
            if not captcha_found:
                form_info["issues"].append("No CAPTCHA detected in the form.")

            # 4️⃣ **Check for CSRF token in hidden inputs.**
            form_info["tests"].append("Checked for CSRF token.")
            csrf_found = False
            hidden_inputs = form.find_all("input", {"type": "hidden"})
            for input_elem in hidden_inputs:
                if "csrf" in input_elem.get("name", "").lower():
                    csrf_found = True
                    break
            if not csrf_found:
                form_info["issues"].append("No CSRF token detected in the form.")

            # 5️⃣ **Check for an `onsubmit` attribute** (could be used for form jacking).
            form_info["tests"].append("Checked for onsubmit attribute.")
            onsubmit = form.get("onsubmit")
            if onsubmit:
                form_info["issues"].append("Form has an onsubmit attribute which may be exploited.")

            # Determine if the form is secure or not
            if not form_info["issues"]:
                results["secure_forms"] += 1
            else:
                results["insecure_forms"] += 1

            results["forms"].append(form_info)
            socketio.emit("update", {
                "message": f"📋 Form {i+1} analysis completed. Issues: {len(form_info['issues'])} | Tests: {', '.join(form_info['tests'])}"
            })

        # ✅ Handle different cases separately
        if results["insecure_forms"] > 0 and results["secure_forms"] > 0:
            message = f"⚠️ {results['insecure_forms']} insecure forms found out of {results['total_forms']} analyzed."
        elif results["insecure_forms"] > 0:
            message = f"⚠️ All {results['total_forms']} forms have security issues."
        else:
            message = f"✅ All {results['total_forms']} forms are secure."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except requests.exceptions.Timeout:
        timeout_message = f"⏳ Timeout error while accessing {url}. Possible firewall protection."
        print(timeout_message)
        socketio.emit("update", {"message": timeout_message})
        return {"success": False, "message": timeout_message}

    except requests.exceptions.RequestException as e:
        error_message = f"🚨 Error analyzing forms on {url}: {str(e)}"
        print(error_message)
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-form-security", methods=["POST", "OPTIONS"])
def test_form_security_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = analyze_forms(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5016)
