# csp_checker.py - Enhanced Version
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

def parse_csp(csp_value):
    """
    Parse the CSP header string into a dictionary of directives.
    Each directive maps to its corresponding values (as a list).
    """
    directives = {}
    # Split the policy by ';' to separate directives
    for directive in csp_value.split(';'):
        directive = directive.strip()
        if not directive:
            continue
        # Split directive into key and values
        parts = directive.split()
        if len(parts) >= 1:
            key = parts[0].lower()
            values = parts[1:] if len(parts) > 1 else []
            directives[key] = values
    return directives

def analyze_csp(csp_value):
    """
    Analyze the given CSP header and provide detailed feedback.
    Checks for weak values, missing critical directives, and
    offers recommendations.
    """
    analysis = {
        "raw": csp_value,
        "directives": {},
        "weak_directives": [],
        "missing_directives": [],
        "recommendations": [],
        "overall_strength": "strong"
    }
    
    # Parse the CSP header into directives
    directives = parse_csp(csp_value)
    analysis["directives"] = directives

    # List of recommended directives and their secure defaults
    recommended = {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "object-src": ["'none'"],
        "style-src": ["'self'"],
        "base-uri": ["'self'"],
        "frame-ancestors": ["'none'"],
        "form-action": ["'self'"],
        "img-src": ["'self'"],
    }
    
    # Check for weak values in directives (unsafe keywords)
    weak_values = ["unsafe-inline", "unsafe-eval"]
    
    for directive, rec_values in recommended.items():
        if directive not in directives:
            analysis["missing_directives"].append(f"{directive} directive is missing.")
        else:
            # If directive exists, check if it contains any unsafe values
            for value in directives[directive]:
                if value.lower() in weak_values:
                    analysis["weak_directives"].append(f"{directive} allows {value}.")
    
    # Special check for reporting directives (optional but recommended)
    if "report-uri" not in directives and "report-to" not in directives:
        analysis["recommendations"].append("Consider adding a report-uri or report-to directive for CSP violation reporting.")

    # Determine overall strength based on findings
    if analysis["missing_directives"] or analysis["weak_directives"]:
        analysis["overall_strength"] = "weak"
        analysis["recommendations"].append("Review and update your CSP to include all critical directives and avoid unsafe values.")
    else:
        analysis["overall_strength"] = "strong"
    
    return analysis

def check_csp(url):
    socketio.emit("update", {"message": f"Checking Content Security Policy on: {url}"})
    results = {}
    try:
        response = requests.get(url, timeout=10)
        csp = None
        csp_report_only = None

        # Look for both CSP and CSP-Report-Only headers (case-insensitive)
        for header in response.headers:
            if header.lower() == "content-security-policy":
                csp = response.headers[header]
            elif header.lower() == "content-security-policy-report-only":
                csp_report_only = response.headers[header]

        results["csp"] = csp
        results["csp_report_only"] = csp_report_only

        if csp:
            analysis = analyze_csp(csp)
            results["analysis"] = analysis
            socketio.emit("update", {"message": f"CSP detected: {csp}"})
            if analysis["overall_strength"] == "weak":
                socketio.emit("update", {"message": f"Weak CSP detected: {analysis}"})
            else:
                socketio.emit("update", {"message": "CSP appears strong."})
        elif csp_report_only:
            analysis = analyze_csp(csp_report_only)
            results["analysis"] = analysis
            socketio.emit("update", {"message": f"CSP-Report-Only detected: {csp_report_only}"})
            socketio.emit("update", {"message": "CSP-Report-Only is in use; consider enforcing CSP with a strong policy."})
        else:
            socketio.emit("update", {"message": "No Content-Security-Policy header detected."})
            results["analysis"] = "No CSP header found."
        
        return {"success": True, "message": "CSP check completed.", "results": results}
    except Exception as e:
        error_message = f"Error checking CSP on {url}: {str(e)}"
        socketio.emit("update", {"message": error_message})
        return {"success": False, "message": error_message}

@app.route("/api/test-csp", methods=["POST", "OPTIONS"])
def test_csp_endpoint():
    if request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight check success"}), 200
    try:
        data = request.json
        url = data.get("url")
        if not url:
            return jsonify({"success": False, "message": "URL is required."}), 400
        result = check_csp(url)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5014)
