---
id: wireshark
title: Wireshark
---

# Wireshark

## Tips
* http://packetlife.net/library/cheat-sheets/
* [Wireshark 工具](https://www.wireshark.org/tools/)
* How I use Wireshark https://news.ycombinator.com/item?id=17344342

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

## Remote
* https://www.wireshark.org/docs/man-pages/sshdump.html
* Provide interfaces to capture from a remote host through SSH using a remote capture binary.
* tshark

```bash
ssh admin@192.168.1.2 tcpdump -U -s0 'not port 22' -i eth0 -w - | wireshark -k -i -

mkfifo /tmp/remote
wireshark -k -i /tmp/remote
ssh root@firewall "tcpdump -s 0 -U -n -w - -i eth0 not port 22" > /tmp/remote
```
