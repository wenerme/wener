---
title: Asterisk CDR
---

# Asterisk CDR

- CDR - Call Detail Record - 通话记录

## cdr.conf

```conf
[general]
enable=yes

; 未响应的呼叫是否记录
; 未响应 - 没有设置 B 端通道 例如没有 Dial
; 默认 no
unanswered = yes
; 是否记录 拥塞/congested 呼叫
; 默认 no
congestion = yes

; 默认在运行完 extension 后记录 cdr
;endbeforehexten=no

; billsec=end/hangup time - answer time
; 默认记录为秒，内部记录为 秒+ms，设置为 yes 则 Math.ceil
;initiatedseconds=no

; 批量写入 - 可能会丢失 cdr
;batch=no
; 批量累计大小
;size=100
; 批量累计时间 - 单位 秒
;time=300
; 批量提交方式
; 小批量(size<10) 可设置为 yes 直接在 scheduler 线程提交
; 大批量设置为 no 在新线程提交
;scheduleronly=no
; 停止 asterisk 时先写入 cdr - cdr status 可查看进度
;safeshutdown=yes
```

### 后端

- 支持后端 csv, custom, manager, odbc, pgsql, radius, sqlite, tds, mysql

```conf
; Some of the modules required to provide these backends will not build or install
; unless some dependency requirements are met. Examples of this are pgsql, odbc,
; etc. If you are not getting output as you would expect, the first thing to do
; is to run the command "make menuselect", and check what modules are available,
; by looking in the "2. Call Detail Recording" option in the main menu. If your
; backend is marked with XXX, you know that the "configure" command could not find
; the required libraries for that option.
;
; To get CDRs to be logged to the plain-jane /var/log/asterisk/cdr-csv/Master.csv
; file, define the [csv] category in this file. No database necessary. The example
; config files are set up to provide this kind of output by default.
;
; To get custom csv CDR records, make sure the cdr_custom.conf file
; is present, and contains the proper [mappings] section. The advantage to
; using this backend, is that you can define which fields to output, and in
; what order. By default, the example configs are set up to mimic the cdr-csv
; output. If you don't make any changes to the mappings, you are basically generating
; the same thing as cdr-csv, but expending more CPU cycles to do so!
;
; To get manager events generated, make sure the cdr_manager.conf file exists,
; and the [general] section is defined, with the single variable 'enabled = yes'.
;
; For odbc, make sure all the proper libs are installed, that "make menuselect"
; shows that the modules are available, and the cdr_odbc.conf file exists, and
; has a [global] section with the proper variables defined.
;
; For pgsql, make sure all the proper libs are installed, that "make menuselect"
; shows that the modules are available, and the cdr_pgsql.conf file exists, and
; has a [global] section with the proper variables defined.
;
; For logging to radius databases, make sure all the proper libs are installed, that
; "make menuselect" shows that the modules are available, and the [radius]
; category is defined in this file, and in that section, make sure the 'radiuscfg'
; variable is properly pointing to an existing radiusclient.conf file.
;
; For logging to sqlite databases, make sure the 'cdr.db' file exists in the log directory,
; which is usually /var/log/asterisk. Of course, the proper libraries should be available
; during the 'configure' operation.
;
; For tds logging, make sure the proper libraries are available during the 'configure'
; phase, and that cdr_tds.conf exists and is properly set up with a [global] category.
;
; Also, remember, that if you wish to log CDR info to a database, you will have to define
; a specific table in that databse to make things work! See the doc directory for more details
; on how to create this table in each database.
;

[csv]
usegmtime=yes    ; log date/time in GMT.  Default is "no"
loguniqueid=yes  ; log uniqueid.  Default is "no"
loguserfield=yes ; log user field.  Default is "no"
accountlogs=yes  ; create separate log file for each account code. Default is "yes"
;newcdrcolumns=yes ; Enable logging of post-1.8 CDR columns (peeraccount, linkedid, sequence).
                   ; Default is "no".

;[radius]
;usegmtime=yes    ; log date/time in GMT
;loguniqueid=yes  ; log uniqueid
;loguserfield=yes ; log user field
; Set this to the location of the radiusclient-ng configuration file
; The default is /etc/radiusclient-ng/radiusclient.conf
;radiuscfg => /usr/local/etc/radiusclient-ng/radiusclient.conf
```

## sqlite3

```conf
; /var/log/asterisk/master.db
[master]
table => cdr
columns => calldate, clid, dcontext, channel, dstchannel, lastapp, lastdata, duration, billsec, disposition, amaflags, accountcode, uniqueid, userfield, test
values => '${CDR(start)}','${CDR(clid)}','${CDR(dcontext)}','${CDR(channel)}','${CDR(dstchannel)}','${CDR(lastapp)}','${CDR(lastdata)}','${CDR(duration)}','${CDR(billsec)}','${CDR(disposition)}','${CDR(amaflags)}','${CDR(accountcode)}','${CDR(uniqueid)}','${CDR(userfield)}','${CDR(test)}'
busy_timeout => 1000
```
