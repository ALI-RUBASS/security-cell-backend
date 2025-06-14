from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_software_data_integrity(url):
    socketio.emit("update", {"message": f"🔍 Checking software and data integrity on: {url}"})
    print(f"🔍 Checking software and data integrity on: {url}")  # Console log

    results = {
        "missing_integrity": [],
        "weak_integrity": [],
        "resources_checked": 0,
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

        # Extract <script> tags with src and <link> tags for stylesheets.
        script_tags = soup.find_all("script", src=True)
        link_tags = soup.find_all("link", rel=lambda x: x and "stylesheet" in x)

        resources = []
        for tag in script_tags:
            src = tag.get("src")
            if src:
                absolute_url = urljoin(url, src)
                resources.append({"type": "script", "url": absolute_url, "integrity": tag.get("integrity")})
        for tag in link_tags:
            href = tag.get("href")
            if href:
                absolute_url = urljoin(url, href)
                resources.append({"type": "stylesheet", "url": absolute_url, "integrity": tag.get("integrity")})

        results["resources_checked"] = len(resources)

        for res in resources:
            resource_url = res["url"]
            integrity = res["integrity"]

            # Check if integrity attribute is missing
            if not integrity:
                results["missing_integrity"].append(resource_url)
                socketio.emit("update", {"message": f"⚠️ Missing integrity attribute: {resource_url}"})
            else:
                # Check if the integrity attribute uses a strong algorithm (sha256, sha384, sha512)
                if not any(algo in integrity.lower() for algo in ["sha256", "sha384", "sha512"]):
                    results["weak_integrity"].append(resource_url)
                    socketio.emit("update", {"message": f"⚠️ Weak integrity algorithm used: {resource_url}"})

        # ✅ Handle different cases separately
        if results["missing_integrity"] and results["weak_integrity"]:
            message = f"⚠️ Software integrity issues found: {len(results['missing_integrity'])} missing attributes & {len(results['weak_integrity'])} weak algorithms."
        elif results["missing_integrity"]:
            message = "⚠️ Missing integrity attributes detected. ✅ No weak algorithms found."
        elif results["weak_integrity"]:
            message = "⚠️ Weak integrity algorithms detected. ✅ No missing integrity attributes found."
        else:
            message = f"✅ No software integrity issues found on {url}."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except requests.exceptions.Timeout:
        timeout_message = f"⏳ Timeout error while accessing {url}. Possible firewall protection."
        print(timeout_message)
        socketio.emit("update", {"message": timeout_message})
        return {"success": False, "message": timeout_message}

    except requests.exceptions.RequestException as e:
        error_message = f"🚨 Error checking software/data integrity on {url}: {str(e)}"
        print(error_message)
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-software-data-integrity", methods=["POST", "OPTIONS"])
def test_software_data_integrity_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_software_data_integrity(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5012)
