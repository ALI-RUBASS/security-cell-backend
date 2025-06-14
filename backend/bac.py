from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Function to read endpoints from the file
def load_endpoints(file_path="endpoints.txt"):
    try:
        with open(file_path, "r") as file:
            endpoints = [line.strip() for line in file if line.strip()]
        print(f"Loaded {len(endpoints)} endpoints from {file_path}.")  # Console log
        return endpoints
    except FileNotFoundError:
        error_message = f"File not found: {file_path}"
        print(error_message)  # Console log
        socketio.emit("update", {"message": error_message})
        return []

# Test unauthorized access to endpoints
def test_broken_access_control(base_url):
    # Load endpoints from the file
    endpoints = load_endpoints()
    if not endpoints:
        return {"success": False, "message": "No endpoints found in endpoints.txt file."}

    socketio.emit("update", {"message": f"Testing access control on base URL: {base_url}"})
    print(f"Testing access control on base URL: {base_url}")  # Console log

    results = {"accessible_endpoints": []}
    count = 0

    for endpoint in endpoints:
        full_url = f"{base_url.rstrip('/')}{endpoint}"

        # Log that we are testing this endpoint
        testing_message = f"Trying endpoint: {full_url}"
        print(testing_message)  # Console log
        socketio.emit("update", {"message": testing_message})

        try:
            response = requests.get(full_url, timeout=10)

            if response.status_code == 200:
                results["accessible_endpoints"].append(endpoint)
                success_message = f"✅ Access granted: {full_url} (Possible Broken Access Control)"
                print(success_message)  # Console log
                count += 1
                socketio.emit("update", {"message": success_message})

        except Exception as e:
            error_message = f"Error accessing {full_url}: {str(e)}"
            print(error_message)  # Console log
            socketio.emit("update", {"message": error_message})

    if count == 0:
        no_success_message = "❌ No accessible endpoints found."
        print(no_success_message)
        socketio.emit("update", {"message": no_success_message})
        return {"success": False, "message": no_success_message}
    return {"success": True, "message": "Broken Access Control testing completed.", "results": results}

# Flask API Endpoint
@app.route("/api/test-broken-access", methods=["POST"])
def test_broken_access_endpoint():
    try:
        data = request.json
        base_url = data.get("url")

        if not base_url:
            return jsonify({"success": False, "message": "Base URL is required."}), 400

        result = test_broken_access_control(base_url)
        return jsonify(result)
    except Exception as e:
        error_message = str(e)
        print(f"Error: {error_message}")  # Console log
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5004)
