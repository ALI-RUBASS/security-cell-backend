from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_third_party_scripts(url):
    socketio.emit("update", {"message": f"🔍 Analyzing third-party scripts on: {url}"})
    print(f"🔍 Analyzing third-party scripts on: {url}")  # Console log

    results = {
        "total_scripts": 0,
        "third_party_scripts": [],
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

        script_tags = soup.find_all("script", src=True)
        results["total_scripts"] = len(script_tags)

        # Determine the base domain of the target URL
        parsed_base = urlparse(url)
        base_domain = parsed_base.netloc.lower()

        for script in script_tags:
            src = script.get("src")
            parsed_src = urlparse(src)

            # Convert relative URLs to absolute
            if not parsed_src.scheme:
                absolute_url = urljoin(url, src)
                parsed_src = urlparse(absolute_url)
            else:
                absolute_url = src

            script_domain = parsed_src.netloc.lower()

            # Log the test performed for each script
            test_details = f"Tested script: {absolute_url} | Base Domain: {base_domain} | Script Domain: {script_domain}"
            results["tests_performed"].append(test_details)
            socketio.emit("update", {"message": f"🔎 {test_details}"})

            # Consider it third-party if the script's domain is different from the base domain
            if script_domain and script_domain != base_domain:
                script_info = {
                    "url": absolute_url,
                    "domain": script_domain,
                    "uses_https": parsed_src.scheme.lower() == "https",
                    "has_integrity": bool(script.get("integrity"))
                }
                results["third_party_scripts"].append(script_info)
                socketio.emit("update", {
                    "message": f"⚠️ Third-party script detected: {absolute_url} (HTTPS: {script_info['uses_https']}, Integrity: {script_info['has_integrity']})"
                })

        # ✅ Handle different cases separately
        if results["third_party_scripts"]:
            message = f"⚠️ Found {len(results['third_party_scripts'])} third-party scripts out of {results['total_scripts']} scripts checked."
        else:
            message = f"✅ No third-party scripts detected on {url}. {results['total_scripts']} scripts were analyzed."

        socketio.emit("update", {"message": message})
        return {"success": True, "message": message, "results": results}

    except requests.exceptions.Timeout:
        timeout_message = f"⏳ Timeout error while accessing {url}. Possible firewall protection."
        print(timeout_message)
        socketio.emit("update", {"message": timeout_message})
        return {"success": False, "message": timeout_message}

    except requests.exceptions.RequestException as e:
        error_message = f"🚨 Error checking third-party scripts on {url}: {str(e)}"
        print(error_message)
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-third-party-scripts", methods=["POST", "OPTIONS"])
def test_third_party_scripts_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_third_party_scripts(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5017)
