# crypto_failures.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import ssl, socket
from cryptography import x509
from cryptography.hazmat.backends import default_backend

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def check_crypto_failures(url):
    # Ensure URL starts with HTTPS
    if not url.startswith("https://"):
        url = "https://" + url.lstrip("http://")
    hostname = url.split("//")[1].split("/")[0]
    socketio.emit("update", {"message": f"Checking cryptographic configuration on: {hostname}"})
    
    try:
        # Create an SSL context with default settings (which enforces TLSv1.2+)
        context = ssl.create_default_context()
        # Connect to the server on port 443
        with socket.create_connection((hostname, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                # Get the negotiated protocol (e.g. TLSv1.2 or TLSv1.3)
                protocol = ssock.version()
                # Get the certificate in binary DER format
                der_cert = ssock.getpeercert(binary_form=True)
        
        # Load the certificate using the cryptography library
        cert_obj = x509.load_der_x509_certificate(der_cert, default_backend())
        sig_algo = cert_obj.signature_hash_algorithm.name
        
        # Define weak signature algorithms (e.g. md5, sha1)
        weak_algos = ["md5", "sha1"]
        crypto_failure = False
        message = f"Certificate uses {sig_algo.upper()} signature algorithm. "
        if sig_algo.lower() in weak_algos:
            crypto_failure = True
            message += "This signature algorithm is considered weak. "
        else:
            message += "Signature algorithm is strong. "
        
        # Check if the negotiated protocol is secure (TLSv1.2 or TLSv1.3)
        if protocol not in ["TLSv1.2", "TLSv1.3"]:
            crypto_failure = True
            message += f"Protocol {protocol} is outdated. "
        else:
            message += f"Protocol {protocol} is secure. "
        
        result = {
            "hostname": hostname,
            "protocol": protocol,
            "signature_algorithm": sig_algo,
            "crypto_failure": crypto_failure,
            "message": message
        }
        socketio.emit("update", {"message": message})
        return {"success": True, "result": result}
    except Exception as e:
        error_message = f"Error checking cryptographic failures: {str(e)}"
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-crypto-failures", methods=["POST", "OPTIONS"])
def test_crypto_failures_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200
    try:
        data = request.json
        url = data.get("url")
        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400
        result = check_crypto_failures(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5010)
