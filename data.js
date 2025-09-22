const STATUS_OPTIONS = [
  { value: 'not started', label: 'Not started' },
  { value: 'in progress', label: 'In progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'done', label: 'Done' },
  { value: 'not applicable', label: 'Not applicable' }
];

const TEST_CATEGORIES = [
  {
    id: 'information-gathering',
    name: 'Information Gathering',
    tests: [
      {
        id: 'WSTG-INFO-01',
        title: 'Conduct Search Engine Discovery and Reconnaissance for Information Leakage',
        summary:
          'Determine whether search engines expose sensitive design, configuration, or deployment information about the target.',
      },
      {
        id: 'WSTG-INFO-02',
        title: 'Fingerprint Web Server',
        summary: 'Identify the web server software, version, and modules to inform further testing.',
      },
      {
        id: 'WSTG-INFO-03',
        title: 'Review Webserver Metafiles for Information Leakage',
        summary: 'Inspect robots.txt, sitemap.xml, and similar metafiles for sensitive endpoints or disclosures.',
      },
      {
        id: 'WSTG-INFO-04',
        title: 'Enumerate Applications on Webserver',
        summary: 'List hosted applications and services to understand the attack surface.',
      },
      {
        id: 'WSTG-INFO-05',
        title: 'Review Webpage Comments and Metadata for Information Leakage',
        summary: 'Check HTML comments, metadata, and client-side code for secrets or implementation hints.',
      },
      {
        id: 'WSTG-INFO-06',
        title: 'Identify Application Entry Points',
        summary: 'Locate parameters, forms, APIs, and other input vectors available to users.',
      },
      {
        id: 'WSTG-INFO-07',
        title: 'Map Execution Paths Through Application',
        summary: 'Understand the logical flow of the application and reachable functionality.',
      },
      {
        id: 'WSTG-INFO-08',
        title: 'Fingerprint Web Application Framework',
        summary: 'Detect frameworks and libraries that shape application behavior and security posture.',
      },
      {
        id: 'WSTG-INFO-09',
        title: 'Fingerprint Web Application',
        summary: 'Identify unique application characteristics that can aid in targeted testing.',
      },
      {
        id: 'WSTG-INFO-10',
        title: 'Map Application Architecture',
        summary: 'Document components, integrations, and trust boundaries across the solution.',
      },
    ],
  },
  {
    id: 'configuration-and-deployment-management',
    name: 'Configuration and Deployment Management',
    tests: [
      {
        id: 'WSTG-CONF-01',
        title: 'Test Network Infrastructure Configuration',
        summary: 'Review supporting network services for insecure configurations and exposed services.',
      },
      {
        id: 'WSTG-CONF-02',
        title: 'Test Application Platform Configuration',
        summary: 'Inspect application servers, containers, and runtimes for hardening gaps.',
      },
      {
        id: 'WSTG-CONF-03',
        title: 'Review Old, Backup, and Unreferenced Files for Sensitive Data',
        summary: 'Discover forgotten files or backups that could leak credentials or logic.',
      },
      {
        id: 'WSTG-CONF-04',
        title: 'Enumerate Infrastructure and Application Admin Interfaces',
        summary: 'Identify privileged portals or panels that require strict access controls.',
      },
      {
        id: 'WSTG-CONF-05',
        title: 'Test HTTP Methods',
        summary: 'Verify that only required HTTP verbs are enabled and protected.',
      },
      {
        id: 'WSTG-CONF-06',
        title: 'Test HTTP Strict Transport Security',
        summary: 'Assess whether HSTS is enforced to prevent protocol downgrades and cookie leakage.',
      },
      {
        id: 'WSTG-CONF-07',
        title: 'Test Rich Internet Application Cross Domain Policy',
        summary: 'Ensure cross-domain policies do not overexpose privileged resources.',
      },
      {
        id: 'WSTG-CONF-08',
        title: 'Test File Extensions Handling',
        summary: 'Confirm that file uploads and downloads cannot bypass content-type protections.',
      },
      {
        id: 'WSTG-CONF-09',
        title: 'Test for Subdomain Takeover',
        summary: 'Check for dangling DNS entries that attackers could claim.',
      },
      {
        id: 'WSTG-CONF-10',
        title: 'Test Cloud Storage',
        summary: 'Review object storage buckets and shares for public exposure or weak controls.',
      },
      {
        id: 'WSTG-CONF-11',
        title: 'Test Content Security Policy',
        summary: 'Evaluate CSP directives to ensure they mitigate client-side attacks effectively.',
      },
    ],
  },
  {
    id: 'identity-management',
    name: 'Identity Management',
    tests: [
      {
        id: 'WSTG-IDNT-01',
        title: 'Test Role Definitions',
        summary: 'Validate that roles align with least privilege and business requirements.',
      },
      {
        id: 'WSTG-IDNT-02',
        title: 'Test User Registration Process',
        summary: 'Assess enrollment workflows for validation, verification, and abuse prevention.',
      },
      {
        id: 'WSTG-IDNT-03',
        title: 'Test Account Provisioning Process',
        summary: 'Review how accounts are created, modified, and deprovisioned for gaps.',
      },
      {
        id: 'WSTG-IDNT-04',
        title: 'Test for Account Enumeration and Guessable User Accounts',
        summary: 'Ensure workflows do not reveal valid usernames or predictable identifiers.',
      },
      {
        id: 'WSTG-IDNT-05',
        title: 'Test for Weak or Unenforced Username Policy',
        summary: 'Check whether username rules prevent weak, default, or duplicate choices.',
      },
    ],
  },
  {
    id: 'authentication',
    name: 'Authentication',
    tests: [
      {
        id: 'WSTG-ATHN-01',
        title: 'Test Credentials Transported over an Encrypted Channel',
        summary: 'Verify credentials are never transmitted over cleartext protocols.',
      },
      {
        id: 'WSTG-ATHN-02',
        title: 'Test for Default Credentials',
        summary: 'Identify default or weak vendor credentials that remain active.',
      },
      {
        id: 'WSTG-ATHN-03',
        title: 'Test for Weak Lockout Mechanism',
        summary: 'Evaluate protection against credential stuffing and brute force attempts.',
      },
      {
        id: 'WSTG-ATHN-04',
        title: 'Test for Bypassing Authentication Schema',
        summary: 'Attempt to circumvent authentication through logic flaws or misconfigurations.',
      },
      {
        id: 'WSTG-ATHN-05',
        title: 'Test Remember Me Functionality',
        summary: 'Assess persistent login features for token security and revocation.',
      },
      {
        id: 'WSTG-ATHN-06',
        title: 'Test Browser Cache Weaknesses',
        summary: 'Check whether sensitive authenticated pages are cached improperly.',
      },
      {
        id: 'WSTG-ATHN-07',
        title: 'Test for Weak Password Policy',
        summary: 'Review password complexity, length, and reuse requirements.',
      },
      {
        id: 'WSTG-ATHN-08',
        title: 'Test for Weak Security Question Answer',
        summary: 'Determine if knowledge-based factors use predictable or guessable answers.',
      },
      {
        id: 'WSTG-ATHN-09',
        title: 'Test for Brute Force Vulnerabilities',
        summary: 'Confirm rate limiting and monitoring detect excessive authentication attempts.',
      },
      {
        id: 'WSTG-ATHN-10',
        title: 'Test for Password Reset Vulnerabilities',
        summary: 'Assess reset workflows for predictable tokens, leaks, or abuse.',
      },
    ],
  },
  {
    id: 'authorization',
    name: 'Authorization',
    tests: [
      {
        id: 'WSTG-ATHZ-01',
        title: 'Test Directory Traversal and File Include',
        summary: 'Check resource access controls for path traversal and inclusion flaws.',
      },
      {
        id: 'WSTG-ATHZ-02',
        title: 'Test for Bypassing Authorization Schema',
        summary: 'Attempt to access restricted functionality by manipulating requests.',
      },
      {
        id: 'WSTG-ATHZ-03',
        title: 'Test for Privilege Escalation',
        summary: 'Verify that users cannot gain higher privileges through application flaws.',
      },
      {
        id: 'WSTG-ATHZ-04',
        title: 'Test for Insecure Direct Object References',
        summary: 'Ensure object references are protected against tampering and enumeration.',
      },
    ],
  },
  {
    id: 'session-management',
    name: 'Session Management',
    tests: [
      {
        id: 'WSTG-SESS-01',
        title: 'Test for Session Management Schema',
        summary: 'Review how sessions are established, maintained, and destroyed.',
      },
      {
        id: 'WSTG-SESS-02',
        title: 'Test for Cookies Attributes',
        summary: 'Ensure cookies use secure attributes such as HttpOnly, Secure, and SameSite.',
      },
      {
        id: 'WSTG-SESS-03',
        title: 'Test for Session Fixation',
        summary: 'Check whether attackers can set or reuse session identifiers.',
      },
      {
        id: 'WSTG-SESS-04',
        title: 'Test for Exposed Session Variables',
        summary: 'Identify whether session identifiers leak through URLs or logs.',
      },
      {
        id: 'WSTG-SESS-05',
        title: 'Test for Cross-Site Request Forgery',
        summary: 'Assess CSRF defenses protecting state-changing requests.',
      },
      {
        id: 'WSTG-SESS-06',
        title: 'Test for Logout and Session Termination',
        summary: 'Validate session invalidation on logout, timeout, and inactivity.',
      },
      {
        id: 'WSTG-SESS-07',
        title: 'Test for Session Puzzling',
        summary: 'Ensure partial session manipulation cannot reassemble elevated sessions.',
      },
      {
        id: 'WSTG-SESS-08',
        title: 'Test for Session Timeout',
        summary: 'Confirm sessions expire as expected and cannot be reused indefinitely.',
      },
      {
        id: 'WSTG-SESS-09',
        title: 'Test for Session Hijacking',
        summary: 'Evaluate susceptibility to token theft or replay.',
      },
    ],
  },
  {
    id: 'input-validation',
    name: 'Input Validation',
    tests: [
      { id: 'WSTG-INPV-01', title: 'Test for Reflected Cross-Site Scripting', summary: 'Probe inputs for reflected XSS in responses.' },
      { id: 'WSTG-INPV-02', title: 'Test for Stored Cross-Site Scripting', summary: 'Identify persistent XSS across user interactions.' },
      { id: 'WSTG-INPV-03', title: 'Test for DOM-Based Cross-Site Scripting', summary: 'Assess client-side scripts for DOM XSS sinks.' },
      { id: 'WSTG-INPV-04', title: 'Test for Cross-Site Script Inclusion', summary: 'Check for insecure external script inclusion that enables code injection.' },
      { id: 'WSTG-INPV-05', title: 'Test for HTTP Verb Tampering', summary: 'Determine if non-standard verbs bypass validation or authorization.' },
      { id: 'WSTG-INPV-06', title: 'Test for HTTP Parameter Pollution', summary: 'Evaluate multi-parameter inputs for inconsistent parsing or validation.' },
      { id: 'WSTG-INPV-07', title: 'Test for SQL Injection', summary: 'Test database interactions for injectable parameters.' },
      { id: 'WSTG-INPV-08', title: 'Test for NoSQL Injection', summary: 'Assess NoSQL queries for tampering opportunities.' },
      { id: 'WSTG-INPV-09', title: 'Test for LDAP Injection', summary: 'Check directory queries for unvalidated input.' },
      { id: 'WSTG-INPV-10', title: 'Test for ORM Injection', summary: 'Verify ORM-based data access resists crafted payloads.' },
      { id: 'WSTG-INPV-11', title: 'Test for XML Injection', summary: 'Inspect XML processing for untrusted entity expansion or injection.' },
      { id: 'WSTG-INPV-12', title: 'Test for SSI Injection', summary: 'Ensure server-side includes cannot be manipulated to execute code.' },
      { id: 'WSTG-INPV-13', title: 'Test for XPath Injection', summary: 'Probe XPath queries for parameterized input handling.' },
      { id: 'WSTG-INPV-14', title: 'Test for XQuery Injection', summary: 'Assess XQuery processing for injection flaws.' },
      { id: 'WSTG-INPV-15', title: 'Test for Local File Inclusion', summary: 'Determine if inputs can force loading of local files.' },
      { id: 'WSTG-INPV-16', title: 'Test for Remote File Inclusion', summary: 'Check for inclusion of external resources leading to code execution.' },
      { id: 'WSTG-INPV-17', title: 'Test for Path Traversal', summary: 'Ensure directory traversal cannot access arbitrary files.' },
      { id: 'WSTG-INPV-18', title: 'Test for Server-Side Request Forgery', summary: 'Identify SSRF risks enabling internal network access.' },
      { id: 'WSTG-INPV-19', title: 'Test for Host Header Injection', summary: 'Validate host header handling to prevent routing or cache poisoning.' },
    ],
  },
  {
    id: 'error-handling',
    name: 'Error Handling',
    tests: [
      {
        id: 'WSTG-ERRH-01',
        title: 'Test for Improper Error Handling',
        summary: 'Ensure errors do not reveal stack traces, secrets, or internal details.',
      },
      {
        id: 'WSTG-ERRH-02',
        title: 'Test for Stack Traces',
        summary: 'Verify stack trace data is not exposed to end users.',
      },
    ],
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    tests: [
      {
        id: 'WSTG-CRYP-01',
        title: 'Test for Weak Transport Layer Security',
        summary: 'Review TLS configuration, supported ciphers, and protocol versions.',
      },
      {
        id: 'WSTG-CRYP-02',
        title: 'Test for Padding Oracle',
        summary: 'Assess cryptographic error handling for padding oracle vulnerabilities.',
      },
      {
        id: 'WSTG-CRYP-03',
        title: 'Test for Sensitive Information Sent via Unencrypted Channels',
        summary: 'Ensure confidential data is protected in transit with strong encryption.',
      },
      {
        id: 'WSTG-CRYP-04',
        title: 'Test for Improper Error Handling in Cryptographic Operations',
        summary: 'Confirm cryptographic errors do not leak key material or enable attacks.',
      },
    ],
  },
  {
    id: 'business-logic',
    name: 'Business Logic',
    tests: [
      { id: 'WSTG-BUSL-01', title: 'Test Business Logic Data Validation', summary: 'Ensure business rules validate user-controlled data correctly.' },
      { id: 'WSTG-BUSL-02', title: 'Test for Ability to Forge Requests', summary: 'Check whether workflows can be forced out of sequence or duplicated.' },
      { id: 'WSTG-BUSL-03', title: 'Test Integrity Checks', summary: 'Verify integrity controls detect tampering with transactions or data.' },
      { id: 'WSTG-BUSL-04', title: 'Test for Process Timing', summary: 'Identify race conditions or time-based abuse of business processes.' },
      { id: 'WSTG-BUSL-05', title: 'Test Number of Times a Function Can Be Used', summary: 'Assess enforcement of usage limits such as coupon redemption counts.' },
      { id: 'WSTG-BUSL-06', title: 'Test Sequencing Dependencies', summary: 'Ensure steps must be completed in the intended order without bypass.' },
      { id: 'WSTG-BUSL-07', title: 'Test for Transaction Tampering', summary: 'Attempt to manipulate values during multi-step transactions.' },
      { id: 'WSTG-BUSL-08', title: 'Test for Defenses against Automation', summary: 'Evaluate anti-automation controls such as CAPTCHAs and rate limits.' },
      { id: 'WSTG-BUSL-09', title: 'Test for Business Logic Data Injection', summary: 'Check if business rules accept unsafe custom values or states.' },
    ],
  },
  {
    id: 'client-side',
    name: 'Client-Side Testing',
    tests: [
      { id: 'WSTG-CLNT-01', title: 'Test for DOM-Based Cross-Site Scripting', summary: 'Analyze DOM manipulation for unsafe data flows.' },
      { id: 'WSTG-CLNT-02', title: 'Test for JavaScript Execution', summary: 'Determine whether untrusted scripts can execute in the browser context.' },
      { id: 'WSTG-CLNT-03', title: 'Test for HTML Injection', summary: 'Check if user input can alter the DOM structure.' },
      { id: 'WSTG-CLNT-04', title: 'Test for CSS Injection', summary: 'Assess whether user input can inject CSS or exfiltrate data.' },
      { id: 'WSTG-CLNT-05', title: 'Test for Client-Side URL Redirect', summary: 'Verify client-side redirects cannot be abused to launch attacks.' },
      { id: 'WSTG-CLNT-06', title: 'Test for Client-Side Resource Manipulation', summary: 'Review integrity protection for client-side resources.' },
      { id: 'WSTG-CLNT-07', title: 'Test for Cross-Origin Resource Sharing', summary: 'Validate CORS configuration prevents data leakage.' },
      { id: 'WSTG-CLNT-08', title: 'Test for Cross-Site Flashing', summary: 'Check legacy Flash interactions for code execution issues.' },
      { id: 'WSTG-CLNT-09', title: 'Test for Clickjacking', summary: 'Ensure framing protections prevent UI redressing.' },
      { id: 'WSTG-CLNT-10', title: 'Test Web Messaging', summary: 'Assess postMessage handlers for origin validation.' },
      { id: 'WSTG-CLNT-11', title: 'Test Browser Storage', summary: 'Review localStorage, sessionStorage, and IndexedDB usage for sensitive data.' },
      { id: 'WSTG-CLNT-12', title: 'Test for Cross-Site Script Inclusion', summary: 'Ensure third-party scripts are controlled and integrity protected.' },
      { id: 'WSTG-CLNT-13', title: 'Test for WebSockets', summary: 'Evaluate WebSocket endpoints for authentication and input validation.' },
    ],
  },
  {
    id: 'api-testing',
    name: 'API Testing',
    tests: [
      { id: 'WSTG-APIT-01', title: 'Inventory and Document APIs', summary: 'Identify available APIs, versions, and documentation accuracy.' },
      { id: 'WSTG-APIT-02', title: 'Test API Authentication Mechanisms', summary: 'Evaluate how APIs authenticate clients and protect credentials.' },
      { id: 'WSTG-APIT-03', title: 'Test API Authorisation', summary: 'Verify authorization checks enforce proper access control on endpoints.' },
      { id: 'WSTG-APIT-04', title: 'Test Rate Limiting and Throttling', summary: 'Ensure APIs restrict abusive call volumes and automation.' },
      { id: 'WSTG-APIT-05', title: 'Test for Excessive Data Exposure', summary: 'Check responses for overly broad datasets or hidden fields.' },
      { id: 'WSTG-APIT-06', title: 'Test for Mass Assignment', summary: 'Attempt to set unauthorized fields through object binding.' },
      { id: 'WSTG-APIT-07', title: 'Test for Injection Flaws', summary: 'Assess API parameters for SQL, NoSQL, and command injection.' },
      { id: 'WSTG-APIT-08', title: 'Test for Improper Assets Management', summary: 'Ensure deprecated or hidden APIs are not exposed without control.' },
      { id: 'WSTG-APIT-09', title: 'Test for Security Misconfiguration', summary: 'Review API infrastructure for insecure defaults or missing headers.' },
      { id: 'WSTG-APIT-10', title: 'Test for Broken Object Level Authorization', summary: 'Attempt to manipulate identifiers to access other users’ resources.' },
      { id: 'WSTG-APIT-11', title: 'Test for Broken User Authentication', summary: 'Check for weak credential handling in API authentication flows.' },
      { id: 'WSTG-APIT-12', title: 'Test for Broken Function Level Authorization', summary: 'Determine if APIs improperly expose administrative operations.' },
      { id: 'WSTG-APIT-13', title: 'Test for Unrestricted Resource Consumption', summary: 'Evaluate protections against excessive resource usage via API calls.' },
      { id: 'WSTG-APIT-14', title: 'Test for Unprotected APIs', summary: 'Identify endpoints lacking authentication, authorization, or encryption.' },
      { id: 'WSTG-APIT-15', title: 'Test for Server-Side Request Forgery in APIs', summary: 'Probe API integrations for SSRF opportunities.' },
      { id: 'WSTG-APIT-16', title: 'Test for Cross-Site Scripting in APIs', summary: 'Assess API-supplied data for XSS payloads rendered by clients.' },
      { id: 'WSTG-APIT-17', title: 'Test for Insecure Direct Object References', summary: 'Ensure API object references are robust against tampering.' },
      { id: 'WSTG-APIT-18', title: 'Test for Directory Traversal', summary: 'Check file-related API parameters for traversal or disclosure.' },
      { id: 'WSTG-APIT-19', title: 'Test for Command Injection', summary: 'Attempt to execute OS commands via API parameters.' },
      { id: 'WSTG-APIT-20', title: 'Test for Improper Input Validation', summary: 'Verify APIs validate and sanitize all incoming data.' },
      { id: 'WSTG-APIT-21', title: 'Test for Deserialization Vulnerabilities', summary: 'Assess handling of serialized objects for tampering and RCE.' },
      { id: 'WSTG-APIT-22', title: 'Test for GraphQL Specific Issues', summary: 'Review GraphQL endpoints for introspection, batching, and authorization gaps.' },
      { id: 'WSTG-APIT-23', title: 'Test for SOAP Specific Issues', summary: 'Evaluate SOAP services for WS-Security and XML-related weaknesses.' },
      { id: 'WSTG-APIT-24', title: 'Test for REST Specific Issues', summary: 'Check REST conventions like verbs, caching, and content negotiation for flaws.' },
      { id: 'WSTG-APIT-25', title: 'Test for WebSocket APIs', summary: 'Assess WebSocket-based APIs for authentication and data validation.' },
      { id: 'WSTG-APIT-26', title: 'Test for RPC Specific Issues', summary: 'Review remote procedure call implementations for security controls.' },
      { id: 'WSTG-APIT-27', title: 'Test for gRPC Specific Issues', summary: 'Assess gRPC services for transport security and authorization.' },
      { id: 'WSTG-APIT-28', title: 'Test for GraphQL Authorization', summary: 'Ensure GraphQL resolvers enforce fine-grained authorization.' },
      { id: 'WSTG-APIT-29', title: 'Test for API Error Handling', summary: 'Confirm API errors do not leak stack traces or sensitive data.' },
      { id: 'WSTG-APIT-30', title: 'Test for Logging and Monitoring', summary: 'Review API logging to ensure important events are captured securely.' },
      { id: 'WSTG-APIT-31', title: 'Test for Replay Attacks', summary: 'Determine if APIs prevent reuse of captured requests.' },
      { id: 'WSTG-APIT-32', title: 'Test for Business Logic Flaws in APIs', summary: 'Assess APIs for logic abuse unique to backend workflows.' },
      { id: 'WSTG-APIT-33', title: 'Test for Data Integrity and Non-Repudiation', summary: 'Check whether APIs protect against tampering and provide accountability.' },
      { id: 'WSTG-APIT-34', title: 'Test for Unsafe File Uploads', summary: 'Evaluate upload endpoints for validation, scanning, and storage controls.' },
    ],
  },
];

const TOTAL_TESTS = TEST_CATEGORIES.reduce((sum, category) => sum + category.tests.length, 0);
