# cookie_security_improved.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_cookie_security(url):
    socketio.emit("update", {"message": f"Checking cookie security on: {url}"})
    results = {
        "cookies_checked": 0,
        "insecure_cookies": [],
        "cookie_details": []
    }
    
    try:
        # Send a GET request to the target URL.
        response = requests.get(url, timeout=10)
        cookies = response.cookies
        results["cookies_checked"] = len(cookies)
        
        # Iterate through each cookie
        for cookie in cookies:
            # Each cookie is a http.cookiejar.Cookie object.
            # The secure flag is available as cookie.secure (a boolean)
            # Nonstandard attributes (like HttpOnly and SameSite) are in cookie._rest dictionary.
            detail = {
                "name": cookie.name,
                "domain": cookie.domain,
                "path": cookie.path,
                "secure": cookie.secure,
                "httpOnly": cookie._rest.get("HttpOnly", False),  # using _rest to get nonstandard attributes
                "sameSite": cookie._rest.get("SameSite", None),
                "issues": []
            }
            
            # Check for missing Secure attribute
            if not detail["secure"]:
                detail["issues"].append("Missing Secure attribute")
            # Check for missing HttpOnly attribute
            if not detail["httpOnly"]:
                detail["issues"].append("Missing HttpOnly attribute")
            # Check for SameSite attribute
            if not detail["sameSite"]:
                detail["issues"].append("Missing SameSite attribute")
            else:
                # Optionally flag if SameSite is explicitly set to None (case insensitive)
                if detail["sameSite"].lower() == "none":
                    detail["issues"].append("SameSite set to None")
            
            results["cookie_details"].append(detail)
            if detail["issues"]:
                results["insecure_cookies"].append(cookie.name)
                socketio.emit("update", {"message": f"Insecure cookie detected: {cookie.name} - {', '.join(detail['issues'])}"})
        
        # Emit overall result if all cookies appear secure.
        if not results["insecure_cookies"]:
            socketio.emit("update", {"message": "All cookies appear to be secure."})
        
        return {"success": True, "message": "Cookie security check completed.", "results": results}
    
    except Exception as e:
        error_message = f"Error checking cookie security on {url}: {str(e)}"
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-cookie-security", methods=["POST", "OPTIONS"])
def test_cookie_security_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200
    try:
        data = request.json
        url = data.get("url")
        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400
        result = check_cookie_security(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5015)
