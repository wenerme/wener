---
title: Asterisk Corosync
tags:
  - Asterisk
  - Corosync
  - HA
---

# Asterisk Corosync

`res_corosync.conf`

- [Wiki: Corosync](https://wiki.asterisk.org/wiki/display/AST/Corosync)

Using Corosync together with `res_corosync` allows events to be shared amongst a local cluster of Asterisk servers. Specifically, the types of events that may be shared include:

- Device state
- Message Waiting Indication, or MWI (to allow voicemail to live on a server that is different from where the phones are registered)
