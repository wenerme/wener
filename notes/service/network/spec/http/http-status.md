---
title: HTTP Status
---

# Status

| status | name                                     | note       |
| ------ | ---------------------------------------- | ---------- |
| 100    | Continue                                 |
| 101    | Switching Protocols                      |
| 102    | Processing                               |
| 103    | Early Hints                              |
| 200    | OK                                       |
| 201    | Created                                  |
| 202    | Accepted                                 |
| 203    | Non-Authoritative Information            |
| 204    | No Content                               |
| 205    | Reset Content                            |
| 206    | Partial Content                          |
| 207    | Multi-Status                             |
| 208    | Already Reported                         |
| 226    | IM Used                                  |
| 300    | Multiple Choices                         |
| 301    | Moved Permanently                        |
| 302    | Found                                    |
| 303    | See Other                                |
| 304    | Not Modified                             |
| 305    | Use Proxy                                |
| 306    | Switch Proxy                             |
| 307    | Temporary Redirect                       |
| 308    | Permanent Redirect                       |
| 400    | Bad Request                              |
| 401    | Unauthorized                             |
| 402    | Payment Required                         |
| 403    | Forbidden                                |
| 404    | Not Found                                |
| 405    | Method Not Allowed                       |
| 406    | Not Acceptable                           |            |
| 407    | Proxy Authentication Required            |
| 408    | Request Timeout                          |
| 409    | Conflict                                 |
| 410    | Gone                                     |
| 411    | Length Required                          |
| 412    | Precondition Failed                      |
| 413    | Request Entity Too Large                 |
| 414    | Request-URI Too Long                     |
| 415    | Unsupported Media Type                   |
| 416    | Requested Range Not Satisfiable          |
| 417    | Expectation Failed                       |
| 418    | I'm a teapot                             |
| 421    | Misdirected Request                      |
| 422    | Unprocessable Entity                     |
| 423    | Locked                                   |
| 424    | Failed Dependency                        |
| 425    | Too Early                                |
| 426    | Upgrade Required                         |
| 428    | Precondition Required                    |
| 429    | Too Many Requests                        |
| 431    | Request Header Fields Too Large          |
| 451    | Unavailable For Legal Reasons            |
| 500    | Internal Server Error                    |
| 501    | Not Implemented                          |
| 502    | Bad Gateway                              |
| 503    | Service Unavailable                      |
| 504    | Gateway Timeout                          |
| 505    | HTTP Version Not Supported               |
| 506    | Variant Also Negotiates                  |
| 507    | Insufficient Storage                     |
| 508    | Loop Detected                            |
| 510    | Not Extended                             |
| 511    | Network Authentication Required          |
| 520    | Web Server Returned an Unknown Error     | Cloudflare |
| 521    | Web Server Is Down                       | Cloudflare |
| 522    | Connection Timed Out                     | Cloudflare |
| 523    | Origin Is Unreachable                    | Cloudflare |
| 524    | A Timeout Occurred                       | Cloudflare |
| 525    | SSL Handshake Failed                     | Cloudflare |
| 526    | Invalid SSL Certificate                  | Cloudflare |
| 527    | Railgun Error                            | Cloudflare |
| 530    | Origin DNS Error                         |
| 561    | Unauthorized (AWS Elastic Load Balancer) |

- RFC 7231
  - 502,503,504,505
- RFC 7235
  - 401, 407
- RFC 2295
  - 506
- RFC 4918
  - 507
- 403 Forbidden
  - 一般用于无权限，也用于需要认证 WWW-Authenticate
- 406 Not Acceptable
  - Accept 头不匹配

| extra | for                                                                                         |
| ----- | ------------------------------------------------------------------------------------------- |
| 419   | CSRF Token Missong or Expired                                                               |
| 420   | Enhance Your Calm                                                                           |
| 440   | Login Time-out                                                                              |
| 444   | No Response                                                                                 |
| 449   | Retry With                                                                                  |
| 450   | Blocked by Windows Parental Controls                                                        |
| 460   | Client closed the connection with AWS Elastic Load Balancer                                 |
| 463   | The load balancer received an X-Forwarded-For request header with more than 30 IP addresses |
| 494   | Request header too large                                                                    |
| 495   | SSL Certificate Error                                                                       |
| 496   | SSL Certificate Required                                                                    |
| 497   | HTTP Request Sent to HTTPS Port                                                             |
| 498   | Invalid Token (Esri)                                                                        |
| 499   | Client Closed Request                                                                       |

- https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
- https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/
- http://httpstat.us/
