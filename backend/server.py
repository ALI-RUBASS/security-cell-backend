from multiprocessing import Process
import os

# Function to run the XSS testing Flask app
def run_xss_app():
    os.system("python app.py")  # XSS Flask app script

# Function to run the SQL Injection testing Flask app
def run_sql_injection_app():
    os.system("python sqli.py")  # SQL Injection Flask app script

# Function to run the CSRF testing Flask app
def run_csrf_app():
    os.system("python csrf.py")  # CSRF Flask app script

# Function to run the Brute Force testing Flask app
def run_brute_force_app():
    os.system("python bruteforce.py")  # Brute Force Flask app script

# Function to run the Broken Access Control testing Flask app
def run_bac_app():
    os.system("python bac.py")  # Broken Access Control Flask app script

# Function to run the CORS testing Flask app
def run_cors_app():
    os.system("python cors.py")  # CORS Flask app script

# Function to run the SSL testing Flask app
def run_ssl_app():
    os.system("python test_ssl.py")  # SSL Flask app script

def run_ssrf_app():
    os.system("python ssrf.py")  # SSRF Flask app script

def run_security_app():
    os.system("python securityMisConfig.py")  # securityMisConfig Flask app script

def run_vulnerable_components_app():
    os.system("python vulnerablecomponents.py")  # Vulnerable Components Flask app script

def run_crypto_failures_app():
    os.system("python crypto_failures.py")  # Crypto Failures Flask app script

def run_auth_failures_app():
    os.system("python auth_failures.py")  # Auth Failures Flask app script

def run_software_data_integrity_app():
    os.system("python software_data_integrity.py")  # Software Data Integrity Flask app script

def run_security_monitoring_app():
    os.system("python security_logging_monitoring.py")  # Security Logging Monitoring Flask app script

def run_csp_checker_app():
    os.system("python csp_checker.py")  # CSP Checker Flask app script

def run_cookie_security_app():
    os.system("python cookie_security.py")  # Cookie Security Flask app script

def run_form_security_analyzer_app():
    os.system("python form_security_analyzer.py")  # Form Security Analyzer Flask app script

def run_third_party_script_monitor():
    os.system("python third_party_script_monitor.py")  # Third-Party Script Monitor Flask app script

def run_https_mixed_content_scanner():
    os.system("python https_mixed_content_scanner.py")  # HTTPS Mixed Content Scanner Flask app script

if __name__ == "__main__":
    # Create processes for each Flask app
    xss_process = Process(target=run_xss_app)
    sql_injection_process = Process(target=run_sql_injection_app)
    csrf_process = Process(target=run_csrf_app)
    brute_force_process = Process(target=run_brute_force_app)
    bac_process = Process(target=run_bac_app)
    cors_process = Process(target=run_cors_app)
    ssl_process = Process(target=run_ssl_app)
    ssrf_process = Process(target=run_ssrf_app)
    security_process = Process(target=run_security_app)
    vulnerable_components_process = Process(target=run_vulnerable_components_app)
    crypto_failures_process = Process(target=run_crypto_failures_app)
    auth_failures_process = Process(target=run_auth_failures_app)
    software_data_integrity_process = Process(target=run_software_data_integrity_app)
    security_logging_monitoring_process = Process(target=run_security_monitoring_app)
    csp_checker_ptocess = Process(target=run_csp_checker_app)
    cookie_security_process = Process(target=run_cookie_security_app)
    form_security_analyzer_process = Process(target=run_form_security_analyzer_app)
    third_party_script_proess = Process(target=run_third_party_script_monitor)
    https_mixed_content_scanner_process = Process(target=run_https_mixed_content_scanner)

    # Start all processes
    xss_process.start()
    sql_injection_process.start()
    csrf_process.start()
    brute_force_process.start()
    bac_process.start()
    cors_process.start()
    ssl_process.start()
    ssrf_process.start()
    security_process.start()
    vulnerable_components_process.start()
    crypto_failures_process.start()
    auth_failures_process.start()
    software_data_integrity_process.start()
    security_logging_monitoring_process.start()
    csp_checker_ptocess.start()
    cookie_security_process.start()
    form_security_analyzer_process.start()
    third_party_script_proess.start()
    https_mixed_content_scanner_process.start()

    print("All Nineteen Flask apps are running...")

    # Wait for the processes to finish
    xss_process.join()
    sql_injection_process.join()
    csrf_process.join()
    brute_force_process.join()
    bac_process.join()
    cors_process.join()
    ssl_process.join()
    ssrf_process.join()
    security_process.join()
    vulnerable_components_process.join()
    crypto_failures_process.join()
    auth_failures_process.join()
    software_data_integrity_process.join()
    security_logging_monitoring_process.join()
    csp_checker_ptocess.join()
    cookie_security_process.join()
    form_security_analyzer_process.join()
    third_party_script_proess.join()
    https_mixed_content_scanner_process.join()

    print("All Nineteen Flask apps have finished running.")
