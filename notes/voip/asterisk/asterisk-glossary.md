---
id: glossory
title: Asterisk 词汇
---

# Asterisk 词汇

* [ADSI](https://www.voip-info.org/adsi/)
  * Analog Display Services Interface
* AGI - Asterisk Gateway Interface
  * 执行 Dialplan 中的脚本
  * 针对单次通话
* AMI - Asterisk Manage Interface
  * `manager.conf`
  * 实时接口
  * Telnet
  * 针对整个 PBX
  * Actions
  * Events
* ARI - Asterisk Restful Interface
  * `ari.conf`
  * 通过接口的方式而不是 C 的方式来写应用
  * HTTP GET POST DELETE
  * Websocks 统计和事件
* AMD
  * Answering Machine Detection - 应答机检测
  * `app_amd.so`
* [ALSA](https://en.wikipedia.org/wiki/Advanced_Linux_Sound_Architecture)
  * Advanced Linux Sound Architecture - 高级Linux声音体系
* [AOR](https://wiki.asterisk.org/wiki/display/~jcolp/AORs%2C+Contacts%2C+Device+State)
  * Address of Records - 地址记录
* CDR
  * Call detail recording - 呼叫详情记录
* CEL
  * Call Event Log - 呼叫事件日志
* [CCSS](https://wiki.asterisk.org/wiki/display/AST/Call+Completion+Supplementary+Services+(CCSS))
  * [](Call Completion Supplementary Services)
* DISA (Direct Inward System Access)
* SMDI
  * Simplified Message Desk Interface
* Diaplan - 拨号计划
* DAHDI
  * Digium Asterisk Hardware Device Interface
* libpri
* IVR
  * 交互式语音应答
* [SRTP](https://en.wikipedia.org/wiki/Secure_Real-time_Transport_Protocol)
  * Secure Real-time Transport Protocol
  * RTP 的 Profile
  * 安全协议：TLS 信令层，[SRTP](https://wiki.asterisk.org/wiki/display/AST/Secure+Calling+Tutorial#SecureCallingTutorial-Part2(SRTP)) 媒体层
  * [Asterisk SRTP](https://www.voip-info.org/asterisk-srtp/)
* ps - pjsip
* PBX
* B2BUA
  * Back to Back User Agent - 后端到后端用户代理
  * 类似于电话线路
* DPMA
  * Digium Phone Module for Asterisk
  * 私有技术 - 允许 Asterisk 系统和 Digium 电话之间建立安全连接
* SPEEX
  * [speex.org](https://www.speex.org/) / [xiph/speex](https://github.com/xiph/speex)
  * 一种编码，已被 opus 废弃
* [chan_mobile](https://wiki.asterisk.org/wiki/display/AST/Mobile+Channel)
  * 将蓝牙手机/电话作为 FXO，将耳机作为 FXS
* [OSS](https://en.wikipedia.org/wiki/Open_Sound_System)
  * Open Sound System
