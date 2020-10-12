# FTP

## Tips
* [goftp/server](https://github.com/goftp/server)
  * A FTP server framework written by Golang
* [CrossFTP](http://www.crossftp.com/)
  * FTP & Amazon S3 Client
* [pkg/sftp](https://github.com/pkg/sftp)

```bash
```

http://www.slacksite.com/other/ftp.html

https://stackoverflow.com/questions/15022629/lftp-active-mode-with-servers-that-do-not-recognize-the-port-command

lftp -e 'debug 10;set ftp:passive-mode off; set ftp:auto-passive-mode no; ls; bye;' -u user,password ftp://ftp.site.com

lftp -e 'debug 10;set ftp:passive-mode off; set ftp:auto-passive-mode no; ls; bye;' -u user,password ftp://ftp.site.com

lftp -e 'debug 10;set ftp:passive-mode on; set ftp:auto-passive-mode no'  ftp://shyqmes009.w263.cndns5.com -u 'shyqmes009,shiui^&23'


telnet shyqmes009.w263.cndns5.com 21


## 530 User cannot log in, home directory inaccessible.

一般是权限问题
