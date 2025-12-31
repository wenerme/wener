---
title: Monit
tags:
  - Ops
  - Admin
  - Monitoring
  - Monit
---

# Monit

- [Monit Documentation](https://mmonit.com/monit/documentation/monit.html)
- [Monit Usage Guide](https://www.cnblogs.com/kevingrace/p/6322324.html)

Values:

- daemon processes
- started at system boot time
- act if an error situation should occur
- too many resources
- monitor process characteristics
- how much memory or cpu cycles a process is using.

Monitor:

- files, directories and filesystems
- changes
- timestamps changes, checksum changes or size changes
- d5 or sha1 checksum of files that should not change and get an alert or perform an action if they should change.
- network connections
- TCP, UDP and Unix Domain Sockets
- protocol level
- HTTP, SMTP SIP
- test programs or scripts at certain times - like cron
- test the exit value of a program and perform an action or send an alert
- system resources
- CPU usage, Memory and System Load.

Installation:

```bash
apk add monit
brew install monit
```

```bash
# -I
set init 前台运行
set daemon 后台
# /etc/inittab
# Run Monit in standard run-levels
# mo:2345:respawn:/usr/local/bin/monit -Ic /etc/monitrc
```

check process foo with pidfile /run/foo.pid
stop program = "rc-service foo stop"
start program = "rc-service foo restart"
if 5 restarts within 10 cycles then alert
if 10 restarts within 15 cycles then timeout

check process tincd-wenet with pidfile /run/tinc.wenet.pid
stop program = "/sbin/rc-service tincd stop"
start program = "/sbin/rc-service tincd restart"
if 5 restarts within 10 cycles then alert
if 10 restarts within 15 cycles then timeout

sudo chmod 0700 /etc/monitrc

check program MyProgram with path “/monit/MyProgram.py”
and with timeout 3600 seconds
every 1 cycles
start program = “/monit/MyProgram.py” with timeout 3600 seconds
if status > 200 then restart
if status < 201 then stop
if 2 restart 5 cycles then exec “/monit/custom_script.sh”
if 2 restart 5 cycles then stop

A process is a binary running in the background - a daemon (like an HTTPd, a DB Server, etc.). A process is not run by Monit. Monit does not really control those applications. It can, however, interact with the daemon-izer. Example: systemctl start nginx will not run a nginx in foreground (and block your bash), but will start a daemon in background (that keeps running even after you killed your session).

A program is a binary executed and controlled by Monit. This program should exit after some time and Monit reacts on how all that was going. Example: du -hd1 will run, create an output, and exit. You can then, based on status-code, contents, etc., react to the result/output of the execution.

```conf
set daemon  30
set log syslog
set log /var/log/monit.log

include /etc/monit.d/*

; set httpd port 2812 and
;     use address localhost
;     allow localhost
;     allow admin:monit
```

```conf
###############################################################################
## Monit control file
###############################################################################
##
## Comments begin with a '#' and extend through the end of the line. Keywords
## are case insensitive. All path's MUST BE FULLY QUALIFIED, starting with '/'.
##
## Below you will find examples of some frequently used statements. For
## information about the control file and a complete list of statements and
## options, please have a look in the Monit manual.
##
##
###############################################################################
## Global section
###############################################################################
##
## Start Monit in the background (run as a daemon):
#
set daemon  30              # check services at 30 seconds intervals
#   with start delay 240    # optional: delay the first check by 4-minutes (by
#                           # default Monit check immediately after Monit start)
#
#
## Set syslog logging. If you want to log to a standalone log file instead,
## specify the full path to the log file
#
set log syslog

#
#
## Set the location of the Monit lock file which stores the process id of the
## running Monit instance. By default this file is stored in $HOME/.monit.pid
#
# set pidfile /var/run/monit.pid
#
## Set the location of the Monit id file which stores the unique id for the
## Monit instance. The id is generated and stored on first Monit start. By
## default the file is placed in $HOME/.monit.id.
#
# set idfile /var/.monit.id
#
## Set the location of the Monit state file which saves monitoring states
## on each cycle. By default the file is placed in $HOME/.monit.state. If
## the state file is stored on a persistent filesystem, Monit will recover
## the monitoring state across reboots. If it is on temporary filesystem, the
## state will be lost on reboot which may be convenient in some situations.
#
# set statefile /var/.monit.state
#
#

## Set limits for various tests. The following example shows the default values:
##
# set limits {
#     programOutput:     512 B,      # check program's output truncate limit
#     sendExpectBuffer:  256 B,      # limit for send/expect protocol test
#     fileContentBuffer: 512 B,      # limit for file content test
#     httpContentBuffer: 1 MB,       # limit for HTTP content test
#     networkTimeout:    5 seconds   # timeout for network I/O
#     programTimeout:    300 seconds # timeout for check program
#     stopTimeout:       30 seconds  # timeout for service stop
#     startTimeout:      30 seconds  # timeout for service start
#     restartTimeout:    30 seconds  # timeout for service restart
# }

## Set global SSL options (just most common options showed, see manual for
## full list).
#
# set ssl {
#     verify     : enable, # verify SSL certificates (disabled by default but STRONGLY RECOMMENDED)
#     selfsigned : allow   # allow self signed SSL certificates (reject by default)
# }
#
#
## Set the list of mail servers for alert delivery. Multiple servers may be
## specified using a comma separator. If the first mail server fails, Monit
# will use the second mail server in the list and so on. By default Monit uses
# port 25 - it is possible to override this with the PORT option.
#
# set mailserver mail.bar.baz,               # primary mailserver
#                backup.bar.baz port 10025,  # backup mailserver on port 10025
#                localhost                   # fallback relay
#
#
## By default Monit will drop alert events if no mail servers are available.
## If you want to keep the alerts for later delivery retry, you can use the
## EVENTQUEUE statement. The base directory where undelivered alerts will be
## stored is specified by the BASEDIR option. You can limit the queue size
## by using the SLOTS option (if omitted, the queue is limited by space
## available in the back end filesystem).
#
# set eventqueue
#     basedir /var/monit  # set the base directory where events will be stored
#     slots 100           # optionally limit the queue size
#
#
## Send status and events to M/Monit (for more informations about M/Monit
## see https://mmonit.com/). By default Monit registers credentials with
## M/Monit so M/Monit can smoothly communicate back to Monit and you don't
## have to register Monit credentials manually in M/Monit. It is possible to
## disable credential registration using the commented out option below.
## Though, if safety is a concern we recommend instead using https when
## communicating with M/Monit and send credentials encrypted. The password
## should be URL encoded if it contains URL-significant characters like
## ":", "?", "@". Default timeout is 5 seconds, you can customize it by
## adding the timeout option.
#
# set mmonit http://monit:monit@192.168.1.10:8080/collector
#     # with timeout 30 seconds              # Default timeout is 5 seconds
#     # and register without credentials     # Don't register credentials
#
#
## Monit by default uses the following format for alerts if the mail-format
## statement is missing::
## --8<--
## set mail-format {
##   from:    Monit <monit@$HOST>
##   subject: monit alert --  $EVENT $SERVICE
##   message: $EVENT Service $SERVICE
##                 Date:        $DATE
##                 Action:      $ACTION
##                 Host:        $HOST
##                 Description: $DESCRIPTION
##
##            Your faithful employee,
##            Monit
## }
## --8<--
##
## You can override this message format or parts of it, such as subject
## or sender using the MAIL-FORMAT statement. Macros such as $DATE, etc.
## are expanded at runtime. For example, to override the sender, use:
#
# set mail-format { from: monit@foo.bar }
#
#
## You can set alert recipients whom will receive alerts if/when a
## service defined in this file has errors. Alerts may be restricted on
## events by using a filter as in the second example below.
#
# set alert sysadm@foo.bar                       # receive all alerts
#
## Do not alert when Monit starts, stops or performs a user initiated action.
## This filter is recommended to avoid getting alerts for trivial cases.
#
# set alert your-name@your.domain not on { instance, action }
#
#
## Monit has an embedded HTTP interface which can be used to view status of
## services monitored and manage services from a web interface. The HTTP
## interface is also required if you want to issue Monit commands from the
## command line, such as 'monit status' or 'monit restart service' The reason
## for this is that the Monit client uses the HTTP interface to send these
## commands to a running Monit daemon. See the Monit Wiki if you want to
## enable SSL for the HTTP interface.
#
set httpd port 2812 and
    use address localhost  # only accept connection from localhost (drop if you use M/Monit)
    allow localhost        # allow localhost to connect to the server and
    allow admin:monit      # require user 'admin' with password 'monit'
    #with ssl {            # enable SSL/TLS and set path to server certificate
    #    pemfile: /etc/ssl/certs/monit.pem
    #}

###############################################################################
## Services
###############################################################################
##
## Check general system resources such as load average, cpu and memory
## usage. Each test specifies a resource, conditions and the action to be
## performed should a test fail.
#
#  check system $HOST
#    if loadavg (1min) per core > 2 for 5 cycles then alert
#    if loadavg (5min) per core > 1.5 for 10 cycles then alert
#    if cpu usage > 95% for 10 cycles then alert
#    if memory usage > 75% then alert
#    if swap usage > 25% then alert
#
#
## Check if a file exists, checksum, permissions, uid and gid. In addition
## to alert recipients in the global section, customized alert can be sent to
## additional recipients by specifying a local alert handler. The service may
## be grouped using the GROUP option. More than one group can be specified by
## repeating the 'group name' statement.
#
#  check file apache_bin with path /usr/local/apache/bin/httpd
#    if failed checksum and
#       expect the sum 8f7f419955cefa0b33a2ba316cba3659 then unmonitor
#    if failed permission 755 then unmonitor
#    if failed uid "root" then unmonitor
#    if failed gid "root" then unmonitor
#    alert security@foo.bar on {
#           checksum, permission, uid, gid, unmonitor
#        } with the mail-format { subject: Alarm! }
#    group server
#
#
## Check that a process is running, in this case Apache, and that it respond
## to HTTP and HTTPS requests. Check its resource usage such as cpu and memory,
## and number of children. If the process is not running, Monit will restart
## it by default. In case the service is restarted very often and the
## problem remains, it is possible to disable monitoring using the TIMEOUT
## statement. This service depends on another service (apache_bin) which
## is defined above.
#
#  check process apache with pidfile /usr/local/apache/logs/httpd.pid
#    start program = "/etc/init.d/httpd start" with timeout 60 seconds
#    stop program  = "/etc/init.d/httpd stop"
#    if cpu > 60% for 2 cycles then alert
#    if cpu > 80% for 5 cycles then restart
#    if totalmem > 200.0 MB for 5 cycles then restart
#    if children > 250 then restart
#    if disk read > 500 kb/s for 10 cycles then alert
#    if disk write > 500 kb/s for 10 cycles then alert
#    if failed host www.tildeslash.com port 80 protocol http and request "/somefile.html" then restart
#    if failed port 443 protocol https with timeout 15 seconds then restart
#    if 3 restarts within 5 cycles then unmonitor
#    depends on apache_bin
#    group server
#
#
## Check filesystem permissions, uid, gid, space usage, inode usage and disk I/O.
## Other services, such as databases, may depend on this resource and an automatically
## graceful stop may be cascaded to them before the filesystem will become full and data
## lost.
#
#  check filesystem datafs with path /dev/sdb1
#    start program  = "/bin/mount /data"
#    stop program  = "/bin/umount /data"
#    if failed permission 660 then unmonitor
#    if failed uid "root" then unmonitor
#    if failed gid "disk" then unmonitor
#    if space usage > 80% for 5 times within 15 cycles then alert
#    if space usage > 99% then stop
#    if inode usage > 30000 then alert
#    if inode usage > 99% then stop
#    if read rate > 1 MB/s for 5 cycles then alert
#    if read rate > 500 operations/s for 5 cycles then alert
#    if write rate > 1 MB/s for 5 cycles then alert
#    if write rate > 500 operations/s for 5 cycles then alert
#    if service time > 10 milliseconds for 3 times within 5 cycles then alert
#    group server
#
#
## Check a file's timestamp. In this example, we test if a file is older
## than 15 minutes and assume something is wrong if its not updated. Also,
## if the file size exceed a given limit, execute a script
#
#  check file database with path /data/mydatabase.db
#    if failed permission 700 then alert
#    if failed uid "data" then alert
#    if failed gid "data" then alert
#    if timestamp > 15 minutes then alert
#    if size > 100 MB then exec "/my/cleanup/script" as uid dba and gid dba
#
#
## Check directory permission, uid and gid.  An event is triggered if the
## directory does not belong to the user with uid 0 and gid 0.  In addition,
## the permissions have to match the octal description of 755 (see chmod(1)).
#
#  check directory bin with path /bin
#    if failed permission 755 then unmonitor
#    if failed uid 0 then unmonitor
#    if failed gid 0 then unmonitor
#
#
## Check a remote host availability by issuing a ping test and check the
## content of a response from a web server. Up to three pings are sent and
## connection to a port and an application level network check is performed.
#
#  check host myserver with address 192.168.1.1
#    if failed ping then alert
#    if failed port 3306 protocol mysql with timeout 15 seconds then alert
#    if failed port 80 protocol http
#       and request /some/path with content = "a string"
#    then alert
#
#
## Check a network link status (up/down), link capacity changes, saturation
## and bandwidth usage.
#
#  check network public with interface eth0
#    if failed link then alert
#    if changed link then alert
#    if saturation > 90% then alert
#    if download > 10 MB/s then alert
#    if total uploaded > 1 GB in last hour then alert
#
#
## Check custom program status output.
#
#  check program myscript with path /usr/local/bin/myscript.sh
#    if status != 0 then alert
#
#
###############################################################################
## Includes
###############################################################################
##
## It is possible to include additional configuration parts from other files or
## directories.
#
#  include /etc/monit.d/*
#
```
