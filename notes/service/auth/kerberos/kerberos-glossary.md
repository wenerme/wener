---
tags:
  - Glossary
---

# Kerberos Glossary

| abbr.  | stand for                                         |
| ------ | ------------------------------------------------- |
| SPN    | Service Principal Name                            |
| UPN    | User Principal Name                               |
| KDC    | Key Distribution Center                           |
| SPNEGO | Simple and Protected GSSAPI Negotiation Mechanism |
| TGT    | Ticket Granting Ticket                            |
| APM    | Access Policy Manager                             |
| AS     | Authentication Server                             |
| ST     | Service Ticket                                    |

ADUC ｜ Active Directory Users and Computers
UAC|User Account Control

- BIG-IP APM
- APM Session
- VPE
- PAC
- Server <- NTLM Auth -> KDC
- Client <- Kerberos Auth -> KDC
  - -> AS_REQ
  - <- AS_REP - ticket
  - -> TGS_REQ -> Ticket Granting Server
  - <- TGS_REP - service ticket
  - --> AP_REQ -> Server - service ticket
  - <-- AP_REP <-- Server - UDP, TCP/large ticket
- SPN - Service Principal Name
  - svc/name@realm - HTTP/www.mydomain.org@MYDOMAIN.ORG
- Delegation - constrained & proxy
  - client --> server --> db
  - tgt --> delegate --> db
- Protocol Transition
  - validate user
  - kerberos ticket request on user's behalf
    - service for user to self
  - perform constrained delegation

## KVNO - Key Version Number

- Kerberos Pricinple

## GSSAPI - Generic Security Services Application Program Interface

- 代码层面的标准接口
- 底层可使用不同 Kerberos 实现
- https://en.wikipedia.org/wiki/Generic_Security_Services_Application_Program_Interface
