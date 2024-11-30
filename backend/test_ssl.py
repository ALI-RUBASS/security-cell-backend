from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import ssl
import socket
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Function to check SSL certificate
def check_ssl_certificate(url):
    if not url.startswith("https://"):
        url = f"https://{url.lstrip('http://')}"
    hostname = url.split("//")[1].split("/")[0]

    socketio.emit("update", {"message": f"Checking SSL certificate for: {hostname}"})
    try:
        context = ssl.create_default_context()
        with socket.create_connection((hostname, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()

        # Extract certificate details
        issuer = dict(x[0] for x in cert["issuer"])
        validity_start = datetime.strptime(cert["notBefore"], "%b %d %H:%M:%S %Y %Z")
        validity_end = datetime.strptime(cert["notAfter"], "%b %d %H:%M:%S %Y %Z")
        is_valid = datetime.now() < validity_end

        cert_details = {
            "hostname": hostname,
            "issuer": issuer.get("organizationName", "Unknown"),
            "valid_from": validity_start.strftime("%Y-%m-%d %H:%M:%S"),
            "valid_until": validity_end.strftime("%Y-%m-%d %H:%M:%S"),
            "is_valid": is_valid,
        }

        update_message = f"SSL Certificate for {hostname}: {cert_details}"
        print(update_message)  # Console log
        socketio.emit("update", {"message": update_message})

        return {
            "success": True,
            "ssl_certificate": cert_details,
            "message": f"SSL certificate for {hostname} checked successfully.",
        }
    except Exception as e:
        error_message = f"Error checking SSL certificate for {hostname}: {str(e)}"
        print(error_message)  # Console log
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

# Flask API Endpoint
@app.route("/api/test-ssl", methods=["POST"])
def test_ssl_endpoint():
    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400

        result = check_ssl_certificate(url)
        return jsonify(result)
    except Exception as e:
        error_message = str(e)
        print(f"Error: {error_message}")  # Console log
        socketio.emit("update", {"message": f"Error: {error_message}"})
        return jsonify({"success": False, "message": error_message}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5006)
