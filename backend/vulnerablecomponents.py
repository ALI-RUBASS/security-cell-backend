from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests
import json
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

VULNERABILITY_DB = "https://raw.githubusercontent.com/RetireJS/retire.js/master/repository/jsrepository.json"

def extract_library_versions(html_content):
    libraries = {}
    matches = re.findall(r'<script[^>]+src=[\'"](.*?\.js)[\'"]', html_content, re.IGNORECASE)
    
    for match in matches:
        lib_name = match.split("/")[-1]
        lib_name = lib_name.replace(".min", "")
        if "-" in lib_name:
            parts = lib_name.split("-")
            name = parts[0].lower()
            version_part = parts[1]
            version = version_part.split(".js")[0]
            libraries[name] = version
    
    return libraries

def match_with_vulnerability_db(lib_versions):
    try:
        db_response = requests.get(VULNERABILITY_DB, timeout=10)
        db_data = db_response.json()
        vulnerable_libs = []
        
        for lib, version in lib_versions.items():
            if lib in db_data:
                vulnerable_versions = db_data[lib].get("vulnerable", [])
                if version in vulnerable_versions:
                    vulnerable_libs.append({
                        "library": lib,
                        "version": version,
                        "issues": db_data[lib].get("info", "No additional info")
                    })
        
        return vulnerable_libs
    except Exception as e:
        return [{"error": f"⚠️ Failed to fetch vulnerability database: {str(e)}"}]

def check_vulnerable_components(url):
    socketio.emit("update", {"message": f"🔍 Checking vulnerable components on: {url}"})
    print(f"🔍 Checking vulnerable components on: {url}")  # Console log

    results = {"vulnerable_libraries": []}

    try:
        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            fail_message = f"❌ Failed to fetch website content from {url}. Status Code: {response.status_code}"
            print(fail_message)
            socketio.emit("update", {"message": fail_message})
            return {"success": False, "message": fail_message}

        content = response.text
        lib_versions = extract_library_versions(content)
        
        if not lib_versions:
            no_libs_message = f"✅ No JavaScript libraries detected on {url}."
            print(no_libs_message)
            socketio.emit("update", {"message": no_libs_message})
            return {"success": True, "message": no_libs_message, "results": results}

        vulnerable_libs = match_with_vulnerability_db(lib_versions)
        results["vulnerable_libraries"].extend(vulnerable_libs)

        if vulnerable_libs:
            success_message = f"⚠️ Found {len(vulnerable_libs)} vulnerable JavaScript libraries on {url}."
            socketio.emit("update", {"message": success_message})
        else:
            success_message = f"✅ No known vulnerable JavaScript libraries found on {url}."
            socketio.emit("update", {"message": success_message})

        return {"success": True, "message": success_message, "results": results}

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

@app.route("/api/test-vulnerable-components", methods=["POST", "OPTIONS"])
def test_vulnerable_components_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200

    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "❌ URL is required."}), 400

        result = check_vulnerable_components(url)
        return jsonify(result)

    except Exception as e:
        error_message = f"🚨 Server Error: {str(e)}"
        print(error_message)  # ✅ Log server-side errors
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5009)
