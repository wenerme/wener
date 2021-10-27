---
title: IAX
tags:
  - RFC
  - Protocol
---

# IAX

- [rfc5456](https://datatracker.ietf.org/doc/html/rfc5456)
  IAX: Inter-Asterisk eXchange Version 2
- peer-to-peer, VoIP-oriented protocol
- control & media
- `iax:[username@]host[:port][/number[?context]]`
- 60s 超时

---

- Registration - 注册
  - REGREQ, REGAUTH, REGACK, REGREJ, REGREL
- Call Link Management - Call Leg Management
  - NEW, AUTHREP, AUTHREQ, REJECT, HANGUP, ACCEPT, PROCEEDING, RINGING, ANSWER
- Call Control
  - PROCEEDING, RINGING, ANSWER
- Mid-Call Behavior - Mid-Call Link Operations
  - FLASH, HOLD, UNHOLD, QUELCH, UNQUELCH, TRANSFER
- Call Path Optimization
  - TXREJ, TXREL, TXREQ, TXCNT, TXACC, TXREADY, TXMEDIA
- Call Tear Down
  - HANGUP, REJECT, TRANSFER, TXREADY
- Network Monitoring
  - POKE, PING, PONG, LAGRQ, LAGRP
- Digit Dialing
  - DPREQ, DPREP, DIAL
- Miscellaneous
  - ACK, INVAL, VNAK, MWI, UNSUPPORT
- Media Messages
  - DMTF
  - voice, video, text, image, html

| abbr. | stand for           |
| ----- | ------------------- |
| IE    | Information Element |

---

- 消息传输
  - Mini Frame
    - media data
  - Full Frame - reliably
    - signaling, media data
    - 通过 ACK 确认
    - 维护 sequence
    - timestamp 要求单调递增
- Trunking
  - trunk frame
    - 封装 trunked call audio
    - 2 octets - source number
    - 2 octets - length of data
- Timers
- Encryption
  - AES
  - NEW 时建立

---

![](https://kroki.io/bytefield/svg/eNqlkktvwjAMgO_8iqi7gLRKpTzHbYMh7bJJgxvqwS0OREsfS1IxhPLf57KuDwnQpB2-i_PZie10t8jBGKXZLNy5O4WYsNOMCymZcwce5-A5ttfptrQjSpkeao_zy14mko-mFXqXrOgI7TuBw4Vaucok1h4OwxGfFN5ZZFEq8zhxJYQoNds4nnPv9AmfGBBDYkSMiQkxJR6IR-KJmBML4plYEv_LD36ez8L0C7WboXIVDWzg12H3ILZmz3yvCCk4uGUDe4QtKv0bJZNRPbY5zXRGc-rbelEBa1mrNFcRsjnQfF7zOETVSBvZaiNBK-v9Su2WtEBtRAJGpMnt-sUu26lrEVMyxFktD3zb-EbBeYOV_7bCzyR1WOlObavay83TpYIY2fqY4TVj_pduV3kYSdC6KjKx1Rt3kNE4wEBxGIvyw5XL02xsG90Yk8a9zjfJygQ0)

<!--
(defattrs :bg-green {:fill "#a0ffa0"})
(defattrs :bg-yellow {:fill "#ffffa0"})
(defattrs :bg-pink {:fill "#ffb0a0"})
(defattrs :bg-cyan {:fill "#a0fafa"})
(defattrs :bg-purple {:fill "#e4b5f7"})

(def column-labels ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"])
(def boxes-per-row 32)
(def box-width 20)
(draw-column-headers)
(draw-box "F" [{:span 1} :bg-green] )
(draw-box "Source Call Number" [{:span 15} :bg-pink])
(draw-box "R" [{:span 1} :bg-green])
(draw-box "Destination Call Number" [{:span 15} :bg-cyan])
(draw-box "Timestamp" [{:span 32} :bg-yellow])

(draw-box "OSeqno" {:span 8})
(draw-box "ISeqno" {:span 8})
(draw-box "Frame Type" {:span 8})
(draw-box "C" [{:span 1} :bg-green])
(draw-box "Subclass" {:span 7})

(draw-gap "Data" {:min-label-columns 6})

(draw-bottom)
-->

- F - full frame
- R - retransmitted
- time-stamp - since first transmission of the call
- OSeqno - outbound stream sequence number
- ISeqno - inbound stream sequence number
- C - 影响 Subclass
  - 0 - Subclass 7-bit unsigned integer
  - 1 - pow(Subclass,2)
- frame type
  - DTMF
  - Voice
  - Video
  - Control
  - Null
  - IAX
    - 包含 IE
  - Text
  - Image
  - HTML
  - Comfort Noise

```pre title="mini frame"
                        1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |F|     Source call number      |            time-stamp         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   :                             Data                              :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

```pre title="meta frame"
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |F|         Meta Indicator      |V|      Source Call Number     |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |?|          time-stamp         |                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               |
   |                                         Data                  |
   :                                                               :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- frame 前 16 byte 都为 0
- Meta Indicator = 0
- V=1 - meta video frame

```pre title="meta trunk frame"
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |F|         Meta Indicator      |V|Meta Command | Cmd Data (0)  |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                            time-stamp                         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |R|      Source Call Number     |     Data Length (in octets)   |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   :                             Data                              :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                   .
                                   .
                                   .
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |R|      Source Call Number     |     Data Length (in octets)   |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   :                             Data                              :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- Meta Command=1 - meta trunk frame
- Command Data
  - 0 - 不包含 timestamp
  - 1 - 额外增加 timestamp

```pre title="full frame enc"
                        1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |F|     Source Call Number      |R|   Destination Call Number   |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                         12 Random bytes                       |
   |                                                               |
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |               28  Random bits                         |padding|
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   : between 0 and 15 (as indicated by the padding field above)    :
   :                         Random bytes                          :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                                                               |
   :                    Remainder of Actual Frame                  :
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

```pre title="full frame dec"
                        1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |F|     Source Call Number      |R|   Destination Call Number   |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                         Encrypted data                        |
   |                Multiple of 16 bytes                           |
   |                                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
