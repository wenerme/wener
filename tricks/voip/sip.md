# SIP

## Tips
* [SIPit](https://www.sipit.net)
  * Session Initiation Protocol Interoperability Test
  * A weeklong event where people bring their SIP implementations to ensure they work together
* [pjsip](http://www.pjsip.org/)
  * Multimedia communication library written in C language implementing standard based protocols such as SIP, SDP, RTP, STUN, TURN, and ICE
* [OverSIP](http://oversip.net/)
  * A powerful and flexible SIP proxy & server

* DNS SRV
  * https://www.voip-info.org/wiki/view/DNS+SRV


## PJSIP
* http://www.pjsip.org/
* [pjproject/APKBUILD](https://git.alpinelinux.org/cgit/aports/tree/main/pjproject/APKBUILD)
* Asterisk 14 使用的是 2.5.5
* Asterisk 15 可以选择使用封装的 pjsip
* [2.6](http://trac.pjsip.org/repos/milestone/release-2.6)
  * [#1946](https://trac.pjsip.org/repos/ticket/1946)
    * Assertion in deinitializing client auth session when dialog creation fails
    * 在之前版本中导致了大量异常
* 2.5.5

### FAQ
#### How can I apply a fix from a particular ticket ?
* https://trac.pjsip.org/repos/wiki/FAQ#afix
* 找到对应的 Ticket
* 找到所有 Ticket 的 Change Set
* 下载 Change Set 为 Unified Diff
  * `curl 'https://trac.pjsip.org/repos/changeset/5401?format=diff' -o changeset_r5401.patch`
* 应用补丁
  * `patch -p4 --dry-run < changeset_r3743.diff`


## FAQ
### Call ID vs
