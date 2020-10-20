# Tinc FAQ


## Handshake phase not finished yet
* 尝试 `ExperimentalProtocol = no`
* 参考
  * [#203](https://github.com/gsliepen/tinc/issues/203) - too many "Invalid packet seqno" in logs

__关联错误信息__

```
Handshake phase not finished yet from master_1 (192.168.1.2 port 655)
No key from master_1 after 10 seconds, restarting SPTPS
Got REQ_KEY from master_1 while we already started a SPTPS session!
Invalid packet seqno: 0 != 1 from master_1 (192.168.1.2 port 655)
Failed to decrypt and verify packet from master_1 (192.168.1.2 port 655)
```
