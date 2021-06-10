---
title: SIP Awesome
---

# SIP Awesome

- [fonoster/fonos](https://github.com/fonoster/fonos)
  open-source alternative to Twilio
  - MIT, Nodejs+Resit
- [fonoster/routr](https://github.com/fonoster/routr)
  - MIT, Nodejs+Resit
  - sip proxy, location server, registrar
  - TCP, UDP, TLS, WS, WSS
  - 路由 Intra-Domain, Domain Ingress, Domain Egress, Peer Egress
- http://callflow.sourceforge.net/
  - 生成呼叫流
- https://web.archive.org/web/20120106005622/https://www.iptel.org/~sipsc/
- https://en.wikipedia.org/wiki/List_of_SIP_response_codes

## SIP

| rfc     | title                                             | Obsoleted by |
| ------- | ------------------------------------------------- | ------------ |
| rfc3261 | SIP: Session Initiation Protocol                  |
| rfc3262 | Reliability of Provisional Responses              |
| rfc3265 | Event Notification                                | rfc6665      |
| rfc3581 | Symmetric Response Routing                        |
| rfc3959 | The Early Session Disposition Type                |
| rfc5373 | Requesting Answering Modes                        |
| rfc5839 | Events for Conditional Event Notification         |
| rfc6228 | Response Code for Indication of Terminated Dialog |
| rfc6337 | SIP Usage of the Offer/Answer Model               |
| rfc6665 | Event Notification                                |
| rfc7118 | WebSocket Protocol as a Transport                 |

```js
// options
"100rel": true, // RFC 3262
"199": true, // RFC 6228
answermode: true, // RFC 5373
"early-session": true, // RFC 3959

// status code
199: "Early Dialog Terminated", // draft-ietf-sipcore-199
200: "OK",
202: "Accepted", // RFC 3265
204: "No Notification", // RFC 5839
```

**Session State**

```
                  ___________________________________________________________
                 |  ____________________________________________             |
                 | |            ____________________________    |            |
Session          | |           |                            v   v            v
Constructed -> Initial -> Establishing -> Established -> Terminating -> Terminated
                               |               |___________________________^   ^
                               |_______________________________________________|
```

**Signaling State**

|     | Offer                | Answer               | RFC      | Ini | Est | Early |
| --- | -------------------- | -------------------- | -------- | --- | --- | ----- |
| 1.  | INVITE Req.          | 2xx INVITE Resp.     | RFC 3261 | Y   | Y   | N     |
| 2.  | 2xx INVITE Resp.     | ACK Req.             | RFC 3261 | Y   | Y   | N     |
| 3.  | INVITE Req.          | 1xx-rel INVITE Resp. | RFC 3262 | Y   | Y   | N     |
| 4.  | 1xx-rel INVITE Resp. | PRACK Req.           | RFC 3262 | Y   | Y   | N     |
| 5.  | PRACK Req.           | 200 PRACK Resp.      | RFC 3262 | N   | Y   | Y     |
| 6.  | UPDATE Req.          | 2xx UPDATE Resp.     | RFC 3311 | N   | Y   | Y     |

[Summary of SIP Usage of the Offer/Answer Model]

> [rfc6337#section-2.2](https://datatracker.ietf.org/doc/html/rfc6337#section-2.2)
