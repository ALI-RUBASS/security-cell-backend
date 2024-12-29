from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Function to check CORS headers
def check_cors_policy(url):
    socketio.emit("update", {"message": f"Testing CORS policy for: {url}"})
    try:
        response = requests.options(url, timeout=10)

        if response.status_code == 200:
            cors_headers = {
                "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
                "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
                "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers"),
            }

            update_message = f"CORS Headers for {url}: {cors_headers}"
            print(update_message)  # Console log
            socketio.emit("update", {"message": update_message})

            return {
                "success": True,
                "cors_headers": cors_headers,
                "message": f"CORS policy for {url} analyzed successfully.",
            }
        else:
            return {
                "success": False,
                "message": f"Failed to retrieve CORS headers for {url} with status code {response.status_code}.",
            }
    except Exception as e:
        error_message = f"Error checking CORS for {url}: {str(e)}"
        print(error_message)  # Console log
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

# Flask API Endpoint
@app.route("/api/test-cors", methods=["POST"])
def test_cors_endpoint():
    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400

        result = check_cors_policy(url)
        return jsonify(result)
    except Exception as e:
        error_message = str(e)
        print(f"Error: {error_message}")  # Console log
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5005)
