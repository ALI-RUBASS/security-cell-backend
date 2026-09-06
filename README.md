# Security Cell, Backend

*Automated web vulnerability scanning engine covering the OWASP Top 10.*

## Overview

Security Cell Backend is the scanning engine behind the Security Cell platform, a tool for automatically detecting and reporting common web application vulnerabilities. It is built as a collection of independent Flask microservices, each dedicated to testing one specific class of vulnerability such as SQL injection, XSS, CSRF, broken access control, or CORS misconfiguration. Each service uses Selenium to drive a real headless browser against the target URL (for form based attacks like SQL injection and XSS) or issues direct HTTP requests to inspect response headers and configuration (for checks like CORS, CSP, and SSL/TLS). Every service streams live progress updates over WebSockets (Flask-SocketIO) so a client can display results as the scan runs rather than waiting for a final report. This repository provides the API layer only; it is designed to be consumed by the [security-cell-frontend](https://github.com/ALI-RUBASS/security-cell-frontend) dashboard, which sends scan requests and renders the results.

## Features

- 19 independent scan modules, each exposed as its own Flask + Socket.IO service on its own port, covering:
  - SQL Injection (`sqli.py`)
  - Cross-Site Scripting / XSS (`app.py`)
  - CSRF (`csrf.py`)
  - Brute Force login testing using demo username/password wordlists (`bruteforce.py`)
  - Broken Access Control (`bac.py`)
  - CORS misconfiguration (`cors.py`)
  - SSL/TLS certificate inspection (`test_ssl.py`)
  - SSRF (`ssrf.py`)
  - Security Misconfiguration (`securityMisConfig.py`)
  - Vulnerable and Outdated Components (`vulnerablecomponents.py`)
  - Cryptographic Failures (`crypto_failures.py`)
  - Identification and Authentication Failures (`auth_failures.py`)
  - Software and Data Integrity Failures (`software_data_integrity.py`)
  - Security Logging and Monitoring gaps (`security_logging_monitoring.py`)
  - Content Security Policy checks (`csp_checker.py`)
  - Cookie security attribute checks (`cookie_security.py`)
  - Form security analysis (`form_security_analyzer.py`)
  - Third-party script monitoring (`third_party_script_monitor.py`)
  - HTTPS mixed content scanning (`https_mixed_content_scanner.py`)
- Real-time scan progress pushed to connected clients via WebSockets, instead of a single blocking response
- Headless Chrome automation (via Selenium and webdriver-manager) that fills and submits real forms with attack payloads to detect reflected/stored issues
- Payload driven testing using dedicated payload lists (`sql-payloads.txt`, `S-payloads.txt`, `B-payloads.txt`)
- A `server.py` orchestrator that launches all scan services as separate processes at once
- JSON scan result output (see `security_scan_results.json`, `vulnerable_components_results.json`) suited for automated reporting

## Tech Stack

- Python 3
- Flask, Flask-CORS, Flask-SocketIO (REST + WebSocket API layer)
- Selenium with webdriver-manager (headless Chrome browser automation)
- requests (direct HTTP/header based checks)
- BeautifulSoup4 (HTML parsing)
- cryptography (x509 certificate parsing for SSL/TLS checks)
- Python multiprocessing (running all scan services concurrently)

## Getting Started

### Prerequisites

- Python 3.9+
- Google Chrome installed locally (required by Selenium/webdriver-manager for headless scanning)
- pip

### Installation

```bash
git clone https://github.com/ALI-RUBASS/security-cell-backend.git
cd security-cell-backend/backend
pip install -r requirements.txt
```

The committed `requirements.txt` lists the core packages (Flask, Flask-CORS, Flask-SocketIO, selenium, cryptography). The scan modules also import `requests`, `beautifulsoup4`, and `webdriver-manager`, so install those as well if they are not already present:

```bash
pip install requests beautifulsoup4 webdriver-manager
```

### Running the Project

Each scan module is its own standalone Flask app and listens on its own port (5001 to 5018, with the XSS service on 5000). You can run an individual scanner directly, for example:

```bash
python app.py            # XSS service on port 5000
python sqli.py           # SQL Injection service on port 5001
```

Or start every scan service at once using the orchestrator:

```bash
python server.py
```

Each service exposes a single POST endpoint, for example `/api/test-sql-injection` or `/api/test-xss`, that accepts a JSON body containing the target `url` (and, for the brute-force and authenticated checks, credentials or a login URL). The [frontend](https://github.com/ALI-RUBASS/security-cell-frontend) is expected to call these endpoints and listen on the corresponding Socket.IO connection for live progress messages.

No `.env` file is required to run the backend; there are currently no environment-variable-based secrets in this codebase.

## Project Structure

```
security-cell-backend/
├── backend/
│   ├── app.py                          # XSS scan service
│   ├── sqli.py                         # SQL injection scan service
│   ├── csrf.py                         # CSRF scan service
│   ├── bruteforce.py                   # Brute-force login scan service
│   ├── bac.py                          # Broken access control scan service
│   ├── cors.py                         # CORS scan service
│   ├── test_ssl.py                     # SSL/TLS scan service
│   ├── ssrf.py                         # SSRF scan service
│   ├── securityMisConfig.py            # Security misconfiguration scan service
│   ├── vulnerablecomponents.py         # Vulnerable/outdated components scan service
│   ├── crypto_failures.py              # Cryptographic failures scan service
│   ├── auth_failures.py                # Authentication failures scan service
│   ├── software_data_integrity.py      # Software/data integrity scan service
│   ├── security_logging_monitoring.py  # Logging & monitoring scan service
│   ├── csp_checker.py                  # Content Security Policy scan service
│   ├── cookie_security.py              # Cookie security scan service
│   ├── form_security_analyzer.py       # Form security scan service
│   ├── third_party_script_monitor.py   # Third-party script scan service
│   ├── https_mixed_content_scanner.py  # Mixed content scan service
│   ├── server.py                       # Orchestrator that runs all scan services together
│   ├── requirements.txt                # Core Python dependencies
│   ├── *-payloads.txt                  # Attack payload lists used by the scan modules
│   ├── usernames.txt / passwords.txt   # Demo wordlists used by the brute-force scan module
│   └── *.json                          # Sample scan result output
└── securitycell/                       # Reserved/empty at present
```

## Related Repository

The client dashboard for this scanning engine lives in [security-cell-frontend](https://github.com/ALI-RUBASS/security-cell-frontend). It calls the endpoints exposed here and renders scan progress and reports for the user.

## Author

**Ali Rubass**

- Portfolio: [alirubass.me](https://alirubass.me)
- GitHub: [@ALI-RUBASS](https://github.com/ALI-RUBASS)
- LinkedIn: [ali-rubass](https://www.linkedin.com/in/ali-rubass/)
