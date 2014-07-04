
:: 实现一个 CMDRC, 每次启动
reg add "hklm\software\Microsoft\Command Processor" /f /v AutoRun /d "C:\cmdrc.cmd" > NUL
:: 还算简单的一个提示符
prompt $P$_$$$S

:: 后台运行 相当于linux下的 xxx &
START /B xxx.exe

:: SC 服务操作 http://support.microsoft.com/kb/251192
sc create svnserve binpath= "\"C:\Program Files\CollabNet Subversion Server\svnserve.exe\" --service -r \"C:\my repositories\"  " displayname= "Subversion Server" depend= Tcpip start= auto

sc create asperacentral binPath= "C:\Program Files\Aspera\Enterprise Server\bin\Debug\asperacentral.exe" DisplayName= "Aspera Central" start= auto

:: CMD 续行符号为 ^ 相当于 linux的 \