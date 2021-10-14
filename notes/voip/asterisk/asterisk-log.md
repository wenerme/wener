---
title: Asterisk Log
---

# Asterisk Log

```bash
logger reload
```

## logger.conf

```conf
[general]
; 自定义日期格式
; strftime 格式
;dateformat=%F %T       ; ISO 8601 date format yyyy-mm-dd HH:MM:SS
;dateformat=%F %T.%3q   ; with milliseconds

; 记录 callids
use_callids = yes
; 记录 hostname
;appendhostname = yes

; log queue events to a file
queue_log = yes
; queue_log always goes to a file, even when a realtime backend is present (defaults to no).
queue_log_to_file = no
; queue_log filename
queue_log_name = queue_log
; queue log 使用 realtime 时 时间戳记录为 GMT 而不是 localtime
queue_log_realtime_use_gmt = no

; 日志滚动策略
; none:         不处理，由外部引用处理.
; sequential:  Rename archived logs in order, such that the newest
;              has the highest sequence number [default].  When
;              exec_after_rotate is set, ${filename} will specify
;              the new archived logfile.
; rotate:  Rotate all the old files, such that the oldest has the
;          highest sequence number [this is the expected behavior
;          for Unix administrators].  When exec_after_rotate is
;          set, ${filename} will specify the original root filename.
; timestamp:  Rename the logfiles using a timestamp instead of a
;             sequence number when "logger rotate" is executed.
;             When exec_after_rotate is set, ${filename} will
;             specify the new archived logfile.
;rotatestrategy = rotate

; 日志滚动后执行命令
; 以下命令保持最近两个不压缩，之前的压缩
; exec_after_rotate=gzip -9 ${filename}.2
;
;
; For each file, specify what to log.
;
; For console logging, you set options at start of
; Asterisk with -v for verbose and -d for debug
; See 'asterisk -h' for more information.
;
; Directory for log files is configures in asterisk.conf
; option astlogdir
;
; All log messages go to a queue serviced by a single thread
; which does all the IO.  This setting controls how big that
; queue can get (and therefore how much memory is allocated)
; before new messages are discarded.
; The default is 1000
;logger_queue_limit = 250
;
;
[logfiles]
;
; Format is:
;
; logger_name => [formatter]levels
;
; The name of the logger dictates not only the name of the logging
; channel, but also its type. Valid types are:
;   - 'console'  - The root console of Asterisk
;   - 'syslog'   - Linux syslog, with facilities specified afterwards with
;                  a period delimiter, e.g., 'syslog.local0'
;   - 'filename' - The name of the log file to create. This is the default
;                  for log channels.
;
; Filenames can either be relative to the standard Asterisk log directory
; (see 'astlogdir' in asterisk.conf), or absolute paths that begin with
; '/'.
;
; An optional formatter can be specified prior to the log levels sent
; to the log channel. The formatter is defined immediately preceeding the
; levels, and is enclosed in square brackets. Valid formatters are:
;   - [default] - The default formatter, this outputs log messages using a
;                 human readable format.
;   - [plain]   - The plain formatter, this outputs log messages using a
;                 human readable format with the addition of function name
;                 and line number. No color escape codes are ever printed
;                 nor are verbose messages treated specially.
;   - [json]    - Log the output in JSON. Note that JSON formatted log entries,
;                 if specified for a logger type of 'console', will be formatted
;                 per the 'default' formatter for log messages of type VERBOSE.
;                 This is due to the remote consoles intepreting verbosity
;                 outside of the logging subsystem.
;
; Log levels include the following, and are specified in a comma delineated
; list:
;    debug
;    trace
;    notice
;    warning
;    error
;    verbose(<level>)
;    dtmf
;    fax
;    security
;
; Verbose takes an optional argument, in the form of an integer level. The
; verbose level can be set per logfile. Verbose messages with higher levels
; will not be logged to the file.  If the verbose level is not specified, it
; will log verbose messages following the current level of the root console.
;
; Debug has multiple levels like verbose. However, it is a system wide setting
; and cannot be specified per logfile. You specify the debug level elsewhere
; such as the CLI 'core set debug 3', starting Asterisk with '-ddd', or in
; asterisk.conf 'debug=3'.
;
; Special level name "*" means all levels, even dynamic levels registered
; by modules after the logger has been initialized (this means that loading
; and unloading modules that create/remove dynamic logger levels will result
; in these levels being included on filenames that have a level name of "*",
; without any need to perform a 'logger reload' or similar operation).
; Note that there is no value in specifying both "*" and specific level names
; for a filename; the "*" level means all levels.  The only exception is if
; you need to specify a specific verbose level. e.g, "verbose(3),*".
;
; We highly recommend that you DO NOT turn on debug mode if you are simply
; running a production system.  Debug mode turns on a LOT of extra messages,
; most of which you are unlikely to understand without an understanding of
; the underlying code.  Do NOT report debug messages as code issues, unless
; you have a specific issue that you are attempting to debug.  They are
; messages for just that -- debugging -- and do not rise to the level of
; something that merit your attention as an Asterisk administrator.  Both
; debug and trace messages are also very verbose and can and do fill up
; logfiles quickly.  This is another reason not to have debug or trace
; modes on a production system unless you are in the process of debugging
; a specific issue.
;
;debug.log => error,warning,notice,verbose,debug
;trace.log => trace
;security.log => security
console => notice,warning,error
;console => notice,warning,error,debug
messages.log => notice,warning,error
;full.log => notice,warning,error,debug,verbose,dtmf,fax
;
;full-json.log => [json]debug,verbose,notice,warning,error,dtmf,fax
;
;syslog keyword : This special keyword logs to syslog facility
;
;syslog.local0 => notice,warning,error
;
```
