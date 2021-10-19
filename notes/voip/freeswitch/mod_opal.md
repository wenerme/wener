---
title: mod_opal
---

# mod_opal

- mod_opal
  - 基于 [opal] 的 endpoint 模块
  - 支持 H.323 和 IAX2
  - beta 质量
  - [src/mod/endpoints/mod_opal](https://github.com/signalwire/freeswitch/tree/master/src/mod/endpoints/mod_opal)
- 参考
  - 2010 [what happened to iax](https://lists.freeswitch.org/pipermail/freeswitch-users/2010-September/062503.html)

[opal]: http://www.opalvoip.org/

```
originate opal/h323:foo@bar.com &echo
originate opal/iax2:foo@bar.com &echo
```
