---
title: flv
---

# flv

- .flv, .fla, .f4v, .f4a, .f4b, .f4p
- FLV - 2003-09 - SWF
- F4V - 2007-12 - H.264, MPEG-4 Part 12
- video/x-flv, video/mp4, audio/mp4
- 参考
  - [Flash Video](https://en.wikipedia.org/wiki/Flash_Video)

## format

- Header - 9 bytes
  - Signature
  - Version
  - Flags
  - Header Size
- Packet - 15 bytes
  - Previous Tag Size
  - Tag Type
  - Data Size
  - Timestamp
  - Stream ID
- Packet Type
  - 18/0x12 - AMF Metadata
  - 8/0x08 - Audio
  - 9/0x09 - Video
- AMF Metadata
  - duration - double
  - width - double
  - height - double
  - framerate - double
  - AdditionalHeader
    - Encryption
    - Metadata


![](https://kroki.io/bytefield/svg/eNptkU1vgzAMhu_7FVZ2odIihZW2G7d99bTzLohDKA6ghQ8lQdBV_Pe561ZKx-FRJOuRndf2UlTSOWMhTDKeGcQKDqEqtAZ2K4VSUrBhceNNtD1qXXejp9S81xTV56WViDlrt5fTmVLJmV6taTSOHgbJSm2O3o8Iu1q3ZcW1TFBbiJhgd8wn7oklERArYk1siAfikXginokX4pV4I7YsPo2HpO7R8gYNNxTYX49l3hWpyyEQx5KRHf_9QI4yRWP_qmQC275_MIgOoW0o6XK4WHUME1H0_ij6w3mJV5rSMrP_xNNVpqrnsHdAQSEKS-nymF7bJsDy1IAtvpCSnvsE04HnNs7V5eIbrmOnnA==)

<!--
(defattrs :bg-green {:fill "#a0ffa0"})
(defattrs :bg-yellow {:fill "#ffffa0"})
(defattrs :bg-pink {:fill "#ffb0a0"})
(defattrs :bg-cyan {:fill "#a0fafa"})
(defattrs :bg-purple {:fill "#e4b5f7"})

(def column-labels ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"])
(def boxes-per-row 16)
(def box-width 40)
(draw-column-headers)
(draw-box "FLV" [{:span 3} :bg-green ] )
(draw-box "0x1" [{:span 1} :bg-pink] )
(draw-box "flags" [{:span 1} :bg-yellow] )
(draw-box (text "9" [:math] [:sub "hdr size"]) [{:span 4} :bg-pink] )

(draw-bottom)
-->

![](https://kroki.io/bytefield/svg/eNqNkc9uwjAMh-97Csu7gLRK7Shj621_XwJxcKhTqqU0StIBQ333mY1RqhVph0-RrC-_2M4oZ00hOA-ZKqLCMa9hn-nSGMBrirWmGNvx1ain7diYetN5Wg97tly_n1sqHrKWO-q_SZoGshpnDXcep2qqZwfvW4RlbZpqHRlSbDzMMcYbTIRbYSKkwlS4E2bCvfAgPApPwrPwIrwKb7j4eR5UvWUfWXaRk4GTu64cbco8rCCNDyVHm-jYwIopZ-d_q2ICWscfEKgAX34ywnyfeSszp-3Z0hfQuxJ2thOT9mztfXEUeBsAj8FZRWG1kNM3CjCnQDLJKWbSnn5lMCT4PxGNldkHMg5_9t8M6bmfkVzqA31wTBWUOV5q-mgXZAF1ySb3eCqqOoS6Gn8Bce7flg==)

<!--
(defattrs :bg-green {:fill "#a0ffa0"})
(defattrs :bg-yellow {:fill "#ffffa0"})
(defattrs :bg-pink {:fill "#ffb0a0"})
(defattrs :bg-cyan {:fill "#a0fafa"})
(defattrs :bg-purple {:fill "#e4b5f7"})

(def column-labels ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"])
(def boxes-per-row 16)
(def box-width 40)
(draw-column-headers)
(draw-box "prev tag size" [{:span 4} :bg-green ] )
(draw-box "typ" [{:span 1} :bg-yellow] )
(draw-box (text "size" [:math] [:sub "data"]) [{:span 3} :bg-pink] )
(draw-box (text "ts" [:math] [:sub "upper"]) [{:span 3} :bg-cyan] )
(draw-box (text "ts" [:math] [:sub "lower"]) [{:span 1} :bg-pink] )
(draw-box "stream id" [{:span 3} :bg-pink] )

(draw-gap "fields")

(draw-bottom)
-->
