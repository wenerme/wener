# Wireshark


* http://packetlife.net/library/cheat-sheets/
* [Wireshark 工具](https://www.wireshark.org/tools/)


## Filter
* Display
  * https://wiki.wireshark.org/DisplayFilters
* Capture
  * https://wiki.wireshark.org/CaptureFilters
  * https://www.wireshark.org/docs/wsug_html_chunked/ChCapCaptureFilterSection.html
  * http://www.tcpdump.org/manpages/pcap-filter.7.html
  * [字符串匹配生成器](https://www.wireshark.org/tools/string-cf.html)
```
dst host <name/ip>
src host <name/ip>
host <name/ip>

dst port <port>
src port <port>
port <port>

icmp
udp
tcp
rtsp
rtp

and &&
or ||
not !
```
