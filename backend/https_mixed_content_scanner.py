from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_https_mixed_content(url):
    socketio.emit("update", {"message": f"🔍 Scanning {url} for HTTPS and mixed content issues..."})
    print(f"🔍 Scanning {url} for HTTPS and mixed content issues...")  # Console log

    results = {
        "base_url_https": False,
        "mixed_content": [],
        "total_resources_checked": 0,
        "tests_performed": []
    }

    # ✅ Check if the base URL uses HTTPS
    results["tests_performed"].append("Checked if base URL uses HTTPS.")
    if url.startswith("https://"):
        results["base_url_https"] = True
        socketio.emit("update", {"message": "✅ Base URL is using HTTPS."})
    else:
        results["base_url_https"] = False
        socketio.emit("update", {"message": "⚠️ Warning: Base URL is not using HTTPS!"})

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            fail_message = f"❌ Failed to fetch website content from {url}. Status Code: {response.status_code}"
            print(fail_message)
            socketio.emit("update", {"message": fail_message})
            return {"success": False, "message": fail_message}

        html_content = response.text
        soup = BeautifulSoup(html_content, "html.parser")

        # ✅ Define tag-attribute pairs to check for resources
        tag_attrs = [
            ("script", "src"),
            ("link", "href"),
            ("img", "src"),
            ("iframe", "src"),
            ("video", "src"),
            ("audio", "src")
        ]

        mixed_resources = []
        total_resources = 0

        for tag, attr in tag_attrs:
            for element in soup.find_all(tag):
                resource_url = element.get(attr)
                if resource_url:
                    total_resources += 1
                    absolute_url = urljoin(url, resource_url)
                    results["tests_performed"].append(f"Checked resource: {absolute_url}")

                    # ✅ Check if the resource URL starts with "http://"
                    if absolute_url.startswith("http://"):
                        mixed_resources.append(absolute_url)
                        socketio.emit("update", {"message": f"⚠️ Insecure resource detected: {absolute_url}"})

        results["total_resources_checked"] = total_resources
        results["mixed_content"] = mixed_resources

        # ✅ Handle different cases separately
        if mixed_resources:
            message = f"⚠️ Mixed content detected: {len(mixed_resources)} insecure resource(s) found."
        else:
            message = f"✅ No mixed content detected. {results['total_resources_checked']} resources were analyzed."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except requests.exceptions.Timeout:
        timeout_message = f"⏳ Timeout error while accessing {url}. Possible firewall protection."
        print(timeout_message)
        socketio.emit("update", {"message": timeout_message})
        return {"success": False, "message": timeout_message}

    except requests.exceptions.RequestException as e:
        error_message = f"🚨 Error scanning {url} for HTTPS/mixed content: {str(e)}"
        print(error_message)
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-https-mixed", methods=["POST", "OPTIONS"])
def test_https_mixed_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_https_mixed_content(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5018)
