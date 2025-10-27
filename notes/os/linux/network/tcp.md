---
title: TCP
---

# TCP

- KCM - kernel connection multiplexer
  - https://www.kernel.org/doc/Documentation/networking/kcm.txt
  - https://lwn.net/Articles/657999/
- TCP Brutal -  Hysteria 自有的拥塞控制算法
  - 与 BBR 不同，Brutal 采用固定速率模型，丢包或 RTT 变化不会降低速度。相反，如果无法达到预定的目标速率，反而会根据计算的丢包率提高发送速率来进行补偿。Brutal 只在你知道（并正确设置了）当前网络的最大速度时才能正常运行。其擅长在拥塞的网络中抢占带宽，因此得名。
  - Brutal 如果带宽设置低于实际最大值也能正常运行；相当于限速。重要的是不要将其设置得高于实际最大值，否则会因为补偿机制导致连接速度慢、不稳定，且浪费流量。
