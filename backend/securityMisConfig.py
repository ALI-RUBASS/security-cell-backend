from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
from urllib.parse import urlparse
import threading

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

# List of security headers to check
SECURITY_HEADERS = [
    "X-Frame-Options", "Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options",
    "Referrer-Policy", "Permissions-Policy", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers", "Expect-CT", "Cache-Control", "Pragma", "Server",
    "X-Permitted-Cross-Domain-Policies", "X-DNS-Prefetch-Control"
]

# Sensitive files to check
SENSITIVE_FILES = [
    "/.env", "/config.php", "/wp-config.php", "/wp-config-sample.php", "/.git/config", "/.gitignore", "/.htaccess",
    "/.htpasswd", "/settings.py", "/.bash_history", "/.bashrc", "/.zshrc", "/.npmrc", "/.yarnrc",
    "/backup.zip", "/database.sql", "/db.sql", "/dump.sql", "/logs/error.log", "/logs/access.log",
    "/debug.log", "/backup.tar.gz", "/.DS_Store", "/Thumbs.db",
    "/messages.php", "/message.php", "/subscribe.php", "/unsubscribe.php", "/register.php", "/login.php",
    "/admin.php", "/admin-login.php", "/admin-login.html", "/administrator.php", "/user.php", "/panel.php",
    "/dashboard.php", "/phpinfo.php", "/server-status", "/.well-known/security.txt",
    "/robots.txt", "/sitemap.xml", "/crossdomain.xml", "/web.config"
]

ERROR_PATTERNS = ["not found", "access denied", "403 forbidden", "error id", "forbidden", "vercel"]

def check_security_misconfiguration(url):
    socketio.emit("update", {"message": f"🔍 Scanning security misconfiguration on: {url}"})
    print(f"🔍 Scanning security misconfiguration on: {url}")  # Console log

    results = {"missing_headers": [], "exposed_files": []}

    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
        headers = response.headers
        homepage_content = response.text.strip().lower()

        # Check for missing security headers
        for header in SECURITY_HEADERS:
            if header not in headers:
                results["missing_headers"].append(header)
                socketio.emit("update", {"message": f"⚠️ Missing security header: {header}"})

        # Function to check if a sensitive file is exposed
        def test_file(file_path):
            test_url = f"{url.rstrip('/')}{file_path}"
            file_response = requests.get(test_url, timeout=5, allow_redirects=True)

            status_code = file_response.status_code
            content = file_response.text.strip().lower()

            # Skip irrelevant responses
            if "x-vercel-id" in file_response.headers or any(pattern in content for pattern in ERROR_PATTERNS):
                return

            # Ignore responses identical to the homepage
            if content == homepage_content:
                return

            # Always report exposed robots.txt
            if file_path == "/robots.txt" and status_code == 200:
                results["exposed_files"].append(test_url)
                socketio.emit("update", {"message": f"🔓 Exposed sensitive file detected: {test_url}"})
                return

            # Report sensitive files that are accessible
            if status_code in [200, 401, 402, 403] and not any(pattern in content for pattern in ERROR_PATTERNS):
                results["exposed_files"].append(test_url)
                socketio.emit("update", {"message": f"🔓 Exposed sensitive file detected: {test_url}"})

        # Run file checks in parallel
        threads = []
        for file_path in SENSITIVE_FILES:
            thread = threading.Thread(target=test_file, args=(file_path,))
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()

        # ✅ Handle different cases separately
        if results["missing_headers"] and results["exposed_files"]:
            message = f"⚠️ Found security misconfigurations: {len(results['missing_headers'])} missing headers & {len(results['exposed_files'])} exposed files."
        elif results["missing_headers"]:
            message = "⚠️ Missing security headers found. ✅ No exposed files detected."
        elif results["exposed_files"]:
            message = "🔓 Exposed sensitive files detected. ✅ All security headers are properly configured."
        else:
            message = f"✅ No security misconfigurations found on {url}."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except requests.exceptions.Timeout:
        timeout_message = f"⏳ Timeout error while accessing {url}. Possible firewall protection."
        print(timeout_message)
        socketio.emit("update", {"message": timeout_message})
        return {"success": False, "message": timeout_message}

    except requests.exceptions.RequestException as e:
        error_message = f"🚨 Error fetching {url}: {str(e)}"
        print(error_message)
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-security-misconfig", methods=["POST", "OPTIONS"])
def test_security_misconfig_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_security_misconfiguration(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5008)
