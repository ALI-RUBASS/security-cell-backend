# security_logging_monitoring.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
import random
import string

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_logging_headers(url):
    socketio.emit("update", {"message": f"Checking logging headers on: {url}"})
    try:
        response = requests.get(url, timeout=10)
        headers = response.headers
        details = {}
        # Extended list of common logging/trace headers
        header_list = [
            "X-Request-ID", "X-Correlation-ID", "X-Trace-ID", "X-Log-ID",
            "X-Monitoring-ID", "X-Debug-Info", "X-Error"
        ]
        for header in header_list:
            details[header] = headers.get(header, None)
        return details
    except Exception as e:
        return {"error": str(e)}

def check_error_page(url):
    # Append a random string to trigger a non-existent page.
    random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    test_url = f"{url.rstrip('/')}/nonexistent_{random_str}?trigger_error=1"
    socketio.emit("update", {"message": f"Triggering error page: {test_url}"})
    try:
        response = requests.get(test_url, timeout=10)
        content = response.text.lower().strip()
        # Expanded list of error indicators
        error_indicators = [
            "traceback", "exception", "stack", "fatal", "error", "at line",
            "file:", "debug", "internal server error", "warning"
        ]
        found = [word for word in error_indicators if word in content]
        return {
            "status_code": response.status_code,
            "error_indicators_found": found,
            "content_preview": content[:300]
        }
    except Exception as e:
        return {"error": str(e)}

def check_security_logging_monitoring(url):
    socketio.emit("update", {"message": f"Checking security logging and monitoring on: {url}"})
    results = {}
    
    # 1. Check Logging Headers
    logging_headers = check_logging_headers(url)
    results["logging_headers"] = logging_headers
    if any(logging_headers.get(h) for h in logging_headers if logging_headers.get(h)):
        socketio.emit("update", {"message": "Some logging headers are present."})
    else:
        socketio.emit("update", {"message": "No common logging headers detected."})
    
    # 2. Check Error Page for Sensitive Information
    error_page_result = check_error_page(url)
    results["error_page_analysis"] = error_page_result
    if error_page_result.get("error_indicators_found"):
        socketio.emit("update", {"message": "Verbose error page detected; potential logging/monitoring failure."})
    else:
        socketio.emit("update", {"message": "Error page appears generic (no sensitive details detected)."})
    
    return results

@app.route("/api/test-software-logging", methods=["POST", "OPTIONS"])
def test_security_logging_monitoring_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200
    try:
        data = request.json
        url = data.get("url")
        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400
        
        results = check_security_logging_monitoring(url)
        message = "Security Logging and Monitoring check completed."
        return jsonify({"success": True, "message": message, "results": results})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5013)