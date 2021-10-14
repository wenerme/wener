---
title: Security Glossary
tags:
  - Glossary
---

# Security Glossary

| abbr.   | stand for                                     |
| ------- | --------------------------------------------- |
| AEAD    | Authenticated Encryption with Associated Data |
| ASN.1   |
| DER     |
| HSM     | Hardware Security Modules                     |
| KMS     | Key Management Systems                        |
| PEM     | Privacy Enhanced Mail [rfc1421]               |
| PKCS    | Public-Key Cryptography Standards [rfc7292]   |
| PKCS#1  | RSA                                           |
| PKCS#12 |
| PKCS#7  |
| RSA     |
| TPM     | Trusted Platform Modules                      |
| X.509   |

[rfc1421]: https://www.rfc-editor.org/rfc/rfc1421
[rfc7292]: https://www.rfc-editor.org/rfc/rfc7292

| pem header              | stand for                   |
| ----------------------- | --------------------------- |
| CERTIFICATE             | Certificate                 |
| X509 CRL                | Certificate Revocation List |
| NEW CERTIFICATE REQUEST | Certificate Request         |
| RSA PRIVATE KEY         | PKCS#1 private key          |
| RSA PUBLIC KEY          | PKCS#1 public key           |
| PRIVATE KEY             | PKCS#8 private key          |

| file extension      | stand for                   | encoding  |
| ------------------- | --------------------------- | --------- |
| .csr                | Certificate Signing Request | PKCS10    |
| .pem                |                             | base64    |
| .key                | private key                 | PEM       |
| .pkcs12, .pfx, .p12 | PCKS                        |
| .der                |                             | ASN.1     |
| .cert, .cer, .crt   |                             | .pem,.der |
| .p7b, .keystore     | PCKS#7, [rfc2315]           |
| .crl                | certificate revocation list |
