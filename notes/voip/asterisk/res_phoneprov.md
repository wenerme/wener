---
title: phoneprov
---

# phoneprov

## phoneprov.conf

```conf
; sip.conf/users.conf provider 的默认值
[general]
;serveraddr=192.168.1.1
;serveriface=eth0
;serverport=5060
default_profile=polycom

; profile
[example]
;mime_type => application/octet-stream
;static_file => example/firmware
;static_file => example/default.cfg,text/xml
;${TOUPPER(${MAC})}.cfg => templates/example-mac.cfg
;setvar => DB_CIDNAME=${ODBC_CID_NAME_LOOKUP(${USERNAME})}

; 默认 provider 使用 users.conf 进行生成

; users.conf 内建变量和选项
;   MAC (macaddress)
;   USERNAME (username)
;   DISPLAY_NAME (fullname)
;   SECRET (secret)
;   LABEL (label)
;   CALLERID (cid_number)
;   VOCIEMAIL_EXTEN (vmexten)
;   EXTENSION_LENGTH (localextenlength)
;   LINE
;   LINEKEYS

; phoneprov.conf 内建变量和选项
;   SERVER (server)
;   SERVER_PORT (serverport)


; Built-in variables for managing timezones and daylight savings time.
;   TZOFFSET
;   DST_ENABLE
;   DST_START_MONTH
;   DST_START_MDAY
;   DST_START_HOUR
;   DST_END_MONTH
;   DST_END_MDAY
;   DST_END_HOUR
;   TIMEZONE

```

## users.conf
- 统一管理用户 - 方便
- 但功能和选项没有 sip.conf 和 iax.conf 完善

```conf
[general]
fullname = New User
; 分机号
userbase = 6000
; 创建语音邮箱 - 用于 macro-stdexten
hasvoicemail = yes
; 语音邮箱密钥
vmsecret = 1234
; SIP Peer
hassip = yes
; IAX friend
hasiax = yes
; H.323 friend
;hash323 = yes
; 创建 manager entry
hasmanager = no
; manager 权限 - 默认 all
;managerread = system,call,log,verbose,command,agent,user,config
;managerwrite = system,call,log,verbose,command,agent,user,config

; MAC Address for res_phoneprov
;macaddress = 112233445566
; Auto provision the phone with res_phoneprov
;autoprov = yes
;
; Line Keys for hardphone
;
;LINEKEYS = 1
;
; Line number for hardphone
;
;linenumber = 1
;
; Local Caller ID number used with res_phoneprov and Asterisk GUI
;
;cid_number = 6000
;
; Remaining options are not specific to users.conf entries but are general.
;
callwaiting = yes
threewaycalling = yes
callwaitingcallerid = yes
transfer = yes
canpark = yes
cancallforward = yes
callreturn = yes
callgroup = 1
pickupgroup = 1
;nat = no
```
