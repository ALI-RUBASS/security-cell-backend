from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

# Default authentication endpoints if file is missing
AUTH_ENDPOINTS = [
    "/login", "/admin", "/authenticate", "/user/login", "/signin",
    "/signup", "/dashboard", "/account", "/session", "/auth"
]

# Keywords to identify session cookies
SESSION_KEYWORDS = ["session", "auth", "token", "jwt"]

def check_authentication_failures(base_url):
    socketio.emit("update", {"message": f"🔍 Checking authentication weaknesses on: {base_url}"})
    print(f"🔍 Checking authentication weaknesses on: {base_url}")  # Console log

    results = {
        "exposed_auth_endpoints": [],
        "missing_auth_headers": [],
        "weak_session_cookies": []
    }

    try:
        # 1️⃣ Check for Exposed Authentication Endpoints
        for endpoint in AUTH_ENDPOINTS:
            url = f"{base_url.rstrip('/')}{endpoint}"
            try:
                response = requests.get(url, timeout=5, allow_redirects=False)  # prevent auto-redirects
                if response.status_code in [200, 401, 403]:
                    content = response.text.lower()
                    if "<form" in content and 'type="password"' in content:
                        results["exposed_auth_endpoints"].append(url)
                        socketio.emit("update", {"message": f"🔓 Exposed authentication endpoint detected: {url}"})
            except Exception as ex:
                error_msg = f"🚨 Error testing endpoint {url}: {str(ex)}"
                socketio.emit("update", {"message": error_msg})

        # 2️⃣ Check for Missing WWW-Authenticate Header
        try:
            response = requests.get(base_url, timeout=5)
            if response.status_code == 401 and "WWW-Authenticate" not in response.headers:
                results["missing_auth_headers"].append("Missing WWW-Authenticate header.")
                socketio.emit("update", {"message": "⚠️ Missing WWW-Authenticate header on base URL."})
        except Exception as ex:
            error_msg = f"🚨 Error checking headers on {base_url}: {str(ex)}"
            socketio.emit("update", {"message": error_msg})

        # 3️⃣ Check for Weak Session Cookie Attributes
        try:
            cookies = response.cookies
            for cookie in cookies:
                if any(keyword in cookie.name.lower() for keyword in SESSION_KEYWORDS):
                    if not cookie.secure or not cookie.rest.get("HttpOnly", False):
                        results["weak_session_cookies"].append(cookie.name)
                        socketio.emit("update", {"message": f"⚠️ Weak session cookie detected: {cookie.name}"})
        except Exception as ex:
            error_msg = f"🚨 Error checking cookies on {base_url}: {str(ex)}"
            socketio.emit("update", {"message": error_msg})

        # ✅ Handle different cases separately
        if results["exposed_auth_endpoints"] and results["missing_auth_headers"] and results["weak_session_cookies"]:
            message = "⚠️ Multiple authentication weaknesses detected: exposed endpoints, missing headers, and weak session cookies."
        elif results["exposed_auth_endpoints"]:
            message = "🔓 Exposed authentication endpoints detected. ✅ No missing headers or weak session cookies."
        elif results["missing_auth_headers"]:
            message = "⚠️ Missing authentication headers detected. ✅ No exposed endpoints or weak session cookies."
        elif results["weak_session_cookies"]:
            message = "⚠️ Weak session cookies detected. ✅ No exposed endpoints or missing headers."
        else:
            message = f"✅ No authentication weaknesses found on {base_url}."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except Exception as e:
        error_message = f"🚨 Error testing {base_url}: {str(e)}"
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-auth-failures", methods=["POST", "OPTIONS"])
def test_auth_failures_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        base_url = data.get("url")

        if not base_url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_authentication_failures(base_url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5011)
