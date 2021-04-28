---
title: expect
---

# expect

```tcl
set username [lindex $argv 0];
set password [lindex $argv 1];

# 显示
send_user "$username $password"

# 默认参数
set argv [lassign $argv username password]
if {$username eq ""} {set username default_user}
if {$password eq ""} {set password default_password}
```
## SSH 输入密码

```bash
#!/usr/local/bin/expect
spawn ssh admin@127.0.0.1
expect "password:"
send "PASSWOPD\n";
interact
```

## SCP 发送文件

```bash
#!/usr/local/bin/expect
set argv [lassign $argv src dst]
if {$dst eq ""} {set dst $src}

spawn  scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -P 22 $src admin@192.168.1.1:/tmp/$dst
expect "password:"
send [exec cat password.txt];
send "\n"
interact
```
