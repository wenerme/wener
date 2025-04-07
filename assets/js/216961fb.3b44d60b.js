"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["31334"],{8108:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>l,toc:()=>o,frontMatter:()=>t});var i=JSON.parse('{"id":"service/file/samba","title":"Samba","description":"- samba-team/samba","source":"@site/../notes/service/file/samba.md","sourceDirName":"service/file","slug":"/service/file/samba","permalink":"/notes/service/file/samba","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/file/samba.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1733281920000,"frontMatter":{"title":"Samba"},"sidebar":"docs","previous":{"title":"PhotoPrism","permalink":"/notes/service/file/photoprism"},"next":{"title":"Forge","permalink":"/notes/service/forge/"}}'),a=s("52676"),r=s("79938");let t={title:"Samba"},d="Samba",l={},o=[{value:"Quick start",id:"quick-start",level:2},{value:"smb.conf",id:"smbconf",level:2},{value:"smbd --help",id:"smbd---help",level:2},{value:"FAQ",id:"faq",level:2},{value:"NT_STATUS_BAD_NETWORK_NAME",id:"nt_status_bad_network_name",level:3},{value:"MacOS \u4E0B\u65E0\u6CD5\u4F7F\u7528",id:"macos-\u4E0B\u65E0\u6CD5\u4F7F\u7528",level:3},{value:"NT_STATUS_INVALID_NETWORK_RESPONSE",id:"nt_status_invalid_network_response",level:3},{value:"NTLMv1 NT_STATUS_WRONG_PASSWORD",id:"ntlmv1-nt_status_wrong_password",level:2}];function c(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"samba",children:"Samba"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://github.com/samba-team/samba",children:"samba-team/samba"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/Samba3-ByExample.pdf",children:"Samba3 by Example"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/Samba3-HOWTO.pdf",children:"Samba3 How to"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Server_Message_Block",children:"Server Message Block"})}),"\n",(0,a.jsxs)(e.li,{children:[(0,a.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/CIFSD",children:"CIFSD"})," - in-kernel CIFS/SMB server\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://github.com/namjaejeon/cifsd",children:"namjaejeon/cifsd"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["Wikipedia ",(0,a.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Samba_(software)",children:"Samba"})]}),"\n",(0,a.jsxs)(e.li,{children:["\u6DFB\u52A0\u7684\u7528\u6237\u540D\u5FC5\u987B\u8981\u5148\u5B58\u5728\u4E8E\u7CFB\u7EDF\u4E2D,\u5373\u9700\u8981\u5148 ",(0,a.jsx)(e.code,{children:"useradd"})]}),"\n",(0,a.jsx)(e.li,{children:"\u7981\u7528\u6253\u5370\u673A\u670D\u52A1"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-ini",children:"load printers = no\nprinting = bsd\nprintcap name = /dev/null\n"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["\u5141\u8BB8\u8BBF\u5BA2\u767B\u9646\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.code,{children:"guest ok = yes"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.code,{children:"smbclient //127.0.0.1/public -U guest"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["smb.conf\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/using_samba/ch06.html",children:"Using samba ch06"})}),"\n",(0,a.jsxs)(e.li,{children:["man ",(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/man/manpages/smb.conf.5.html",children:"smb.conf"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u9ED8\u8BA4\u7AEF\u53E3\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"137 netbios-ns NETBIOS Name Service"}),"\n",(0,a.jsx)(e.li,{children:"138 netbios-dgm NETBIOS Datagram Service"}),"\n",(0,a.jsx)(e.li,{children:"139/udp/tcp netbios-ssn NETBIOS Session Service"}),"\n",(0,a.jsx)(e.li,{children:"445/tcp NetBIOS was moved to 445 after 2000 and beyond, (CIFS)"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u76F8\u5173\u7AEF\u53E3\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"901 SWAT service (not related to client communication)"}),"\n",(0,a.jsx)(e.li,{children:"445 microsoft-ds \u57DF\u63A7"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u7EC4\u4EF6\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"smbd"}),"\n",(0,a.jsx)(e.li,{children:"nmbd"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u5DE5\u5177\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["smbstatus - \u67E5\u770B\u670D\u52A1\u72B6\u6001\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u5F53\u524D\u6587\u4EF6\u9501"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.li,{children:"eventlogadm"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["samba-dc\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"samba-tool"}),"\n",(0,a.jsx)(e.li,{children:"samba - gpupdate dnsupdate downgrade_db kcc spnupdate upgradedns"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["samba-winbind\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"winbindd"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"# \u5E26 samba \u7684\u955C\u50CF\ndocker run --rm -it \\\n  -p 139:139 -p 139:139/udp -p 445:445 \\\n  -v $PWD:/share \\\n  --name samba wener/samba\n\n# debug\ndocker run --rm -it -p 139:139 -p 445:445 -v $PWD:/share -w /share wener/samba sh\n\n# \u6216\u8005 APK \u5B89\u88C5\napk add samba samba-dc\n\n# Linux\nmount -t cifs -o username=username,password=password,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 //192.168.1.120/storage /mnt/storage\nmount -t cifs -o credentials=/root/.the-creds-file,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 //192.168.1.120/storage /mnt/storage\n# this-creds-file\n# username=winuser\n# password=winpass\n\n# fstab\n# //192.168.1.120/storage /mnt/storage        cifs    credentials=/root/.smbcredentials,uid=33,gid=33,rw,nounix,iocharset=utf8,file_mode=0777,dir_mode=0777 0 0\n\n# Windows\nnet use Z: \\\\computer_name\\share_name /PERSISTENT:YES\n# \u65AD\u5F00\u8FDE\u63A5\nnet use  Z: /delete\n\nsmbcontrol all reload-config\n# killall -HUP smbd nmbd\n"})}),"\n",(0,a.jsx)(e.h2,{id:"quick-start",children:"Quick start"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["guest \u9700\u8981 ",(0,a.jsx)(e.code,{children:"map to guest = Bad User"})]}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"# Debian: apt-get install samba samba-client\n\nmkdir -p ~/temp/share && cd $_\nmkdir private state usershare public\nchmod 755 public\ncat <<CONF > smbd.ini\n[global]\nlog file = $PWD/log.%m\nidmap config * : backend = tdb\nstate directory = $PWD/state\nusershare path = $PWD/usershare\nprivate dir = $PWD/private\nsmb passwd file = $PWD/private/smbpasswd\n\n[public]\ncomment = Public share\npath = $PWD/public\nvalid users = wener\nread only = No\nCONF\n# \u65B0\u5EFA\u7528\u6237, \u5BC6\u7801\u4E0D\u9700\u8981\u548C\u7CFB\u7EDF\u5BC6\u7801\u76F8\u540C, \u4F46\u9700\u8981\u5B58\u5728\u8BE5\u7528\u6237\n# -s /sbin/nologin -d /dev/null\n# \u9ED8\u8BA4 state \u8DEF\u5F84\u4E3A /var/lib/samba/ \u540E\u7AEF\u9ED8\u8BA4\u4E3A tdb\nadduser wener -DH\nsmbpasswd -L -c smbd.ini -a wener\n\n# \u68C0\u6D4B\u914D\u7F6E\u6B63\u786E\ntestparm smbd.ini\n# \u8F93\u51FA\u6700\u7EC8\u914D\u7F6E\ntestparm -v smbd.ini\n\n# \u542F\u52A8\u670D\u52A1\nsmbd -s smbd.ini\n\n# \u4F8B\u4E3E\u6240\u6709\u5171\u4EAB\nsmbclient  -L //127.0.0.1/public -U wener\n# \u8FDE\u63A5\nsmbclient  //127.0.0.1/public -U wener\n# Linux: smb://<HOST_IP_OR_NAME>/<folder_name>/\n# Windows: \\\\<HOST_IP_OR_NAME>\\<folder_name>\\\n\n# \u6302\u8F7D smb, \u4FEE\u6539\u5BC6\u7801\u4E3A\u4E4B\u524D\u8F93\u5165\u7684\u5BC6\u7801\nmount -t smbfs //wener:wener@localhost/public ~/mnt/smb/\nmount \u2013t smbfs //localhost/public ~/mnt/smb/ \u2013o username=wener\n\nmount -t cifs -o user=luke //192.168.1.1/share /mnt\n"})}),"\n",(0,a.jsx)(e.p,{children:(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html",children:"https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html"})}),"\n",(0,a.jsx)(e.h2,{id:"smbconf",children:"smb.conf"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html",children:"smb.conf.5"})}),"\n",(0,a.jsxs)(e.li,{children:["\u7279\u6B8A section\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["global\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u5168\u5C40\u914D\u7F6E\u6216\u9ED8\u8BA4\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["homes\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u5982\u679C\u914D\u7F6E\u4E86\uFF0C\u5219\u652F\u6301\u81EA\u52A8\u521B\u5EFA HOME \u76EE\u5F55"}),"\n",(0,a.jsxs)(e.li,{children:[(0,a.jsx)(e.code,{children:"%S"})," \u7528\u6237\u5B8F ",(0,a.jsx)(e.code,{children:"path = /data/users/%S"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["printers\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u7C7B\u4F3C\u4E8E homes\uFF0C\u4F46\u662F\u7528\u4E8E\u6253\u5370\u673A"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.p,{children:"tdb (idmap_tdb(8)), tdb2 (idmap_tdb2(8)), ldap (idmap_ldap(8)), rid (idmap_rid(8)), hash (idmap_hash(8)), autorid (idmap_autorid(8)), ad (idmap_ad(8)), nss (idmap_nss(8)), and rfc2307 (idmap_rfc2307(8))."}),"\n",(0,a.jsx)(e.p,{children:"idmap_tdb\nSamba's idmap_tdb Backend for Winbind"}),"\n",(0,a.jsx)(e.p,{children:"The idmap_tdb plugin is the default backend used by winbindd for storing SID/uid/gid mapping tables."}),"\n",(0,a.jsx)(e.p,{children:"In contrast to read only backends like idmap_rid, it is an allocating backend: This means that it needs to allocate new user and group IDs in order to create new mappings."}),"\n",(0,a.jsx)(e.p,{children:"range = low - high\nDefines the available matching uid and gid range for which the backend is authoritative."}),"\n",(0,a.jsx)(e.p,{children:"idmap_tdb2 \u2014 Samba's idmap_tdb2 Backend for Winbind\nThe idmap_tdb2 plugin is a substitute for the default idmap_tdb backend used by winbindd for storing SID/uid/gid mapping tables in clustered environments with Samba and CTDB."}),"\n",(0,a.jsx)(e.p,{children:"script\nThis option can be used to configure an external program for performing id mappings instead of using the tdb counter. The mappings are then stored int tdb2 idmap database. For details see the section on IDMAP SCRIPT below."}),"\n",(0,a.jsx)(e.p,{children:"idmap config * : script = /usr/local/samba/bin/idmap_script.sh"}),"\n",(0,a.jsx)(e.p,{children:"\u4E0D\u5EFA\u8BAE\u4F7F\u7528 hash"}),"\n",(0,a.jsx)(e.p,{children:"The idmap_ad plugin provides a way for Winbind to read id mappings from an AD server that uses RFC2307/SFU schema extensions."}),"\n",(0,a.jsx)(e.p,{children:"\"map to guest = Bad User\" will reject a user if that user is in the server's samba password database but has the wrong password. But if the client user name doesn't exist in the samba password database he is converted to the guest account and then it's up to a given share definition to determine if he can gain access."}),"\n",(0,a.jsx)(e.p,{children:"\"map to guest = Never\" makes the exact same comparison to the database but if it doesn't find that user it doesn't convert the user to the guest account it just rejects him and that user isn't even allowed to view the share list."}),"\n",(0,a.jsx)(e.p,{children:"Don't pass a username and the \"map to guest\" logic is never used at the browse level and that's what a Linux client does unless you force it.."}),"\n",(0,a.jsx)(e.p,{children:"Starting with v4.0, Samba is (or can be):"}),"\n",(0,a.jsx)(e.p,{children:"a file server\na DNS server\nan LDAP server\na Kerberos server\nan AD server"}),"\n",(0,a.jsx)(e.p,{children:(0,a.jsx)(e.a,{href:"https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller",children:"https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller"})}),"\n",(0,a.jsxs)(e.p,{children:["Create an Active Directory Infrastructure with Samba4 on Ubuntu\n",(0,a.jsx)(e.a,{href:"https://www.tecmint.com/install-samba4-active-directory-ubuntu/",children:"https://www.tecmint.com/install-samba4-active-directory-ubuntu/"})]}),"\n",(0,a.jsxs)(e.p,{children:["Windows 7 Service Pack 1 (SP1) \u8FDC\u7A0B\u670D\u52A1\u5668\u7BA1\u7406\u5DE5\u5177\n",(0,a.jsx)(e.a,{href:"https://www.microsoft.com/zh-cn/download/details.aspx?id=7887",children:"https://www.microsoft.com/zh-cn/download/details.aspx?id=7887"})]}),"\n",(0,a.jsxs)(e.p,{children:["Alpine Linux based container (aka Docker) for Samba 4 Active Directory\n",(0,a.jsx)(e.a,{href:"https://github.com/tkaefer/alpine-samba-ad-container",children:"https://github.com/tkaefer/alpine-samba-ad-container"})]}),"\n",(0,a.jsx)(e.p,{children:(0,a.jsx)(e.a,{href:"https://github.com/dperson/samba",children:"https://github.com/dperson/samba"})}),"\n",(0,a.jsx)(e.p,{children:(0,a.jsx)(e.a,{href:"https://github.com/cptactionhank/docker-netatalk",children:"https://github.com/cptactionhank/docker-netatalk"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-ini",children:"# \u5168\u5C40\u914D\u7F6E\n# \u5176\u4ED6 sestion \u7684\u9ED8\u8BA4\u914D\u7F6E\n[global]\nsecurity = domain\nworkgroup = MAIN\n\nstate directory = ${prefix}/var/locks\n\nusershare path = ${prefix}/var/locks/usershares\n\n# \u670D\u52A1\u8FD4\u56DE\u4FE1\u606F\nserver string = server %h\n# \u4E0D\u8D77\u540D\u533F\u540D\nmap to guest = never\n\nidmap config * : backend        = tdb\nidmap config * : range          = 1000000-1999999\n\nidmap config MAIN : backend     = rid\nidmap config MAIN : range       = 5000000-5999999\n\nidmap config TRUSTED : backend  = rid\nidmap config TRUSTED : range    = 6000000-6999999\n\n# \u670D\u52A1\u4F1A\u5728\u94FE\u63A5\u662F\u521B\u5EFA\u4E3B\u76EE\u5F55\n[homes]\npath = /data/pchome/%S\n\n# \u548C [homes] \u7C7B\u4F3C, \u4F46\u662F\u9488\u5BF9\u6253\u5370\u673A\u7684\n[printers]\npath = /usr/spool/public\nguest ok = yes\nprintable = yes\n\n[foo]\n# \u5907\u6CE8\ncomment = Public share\n# \u8DEF\u5F84\npath = /data/share/public\n# \u7528\u6237\nvalid users = wener\n# \u662F\u5426\u53EA\u8BFB\nread only = No\n"})}),"\n",(0,a.jsx)(e.p,{children:"socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=65536 SO_SNDBUF=65536"}),"\n",(0,a.jsx)(e.p,{children:"docker run --rm -it --cap-add SYS_ADMIN --cap-add DAC_READ_SEARCH -v $PWD:/share -w /share wener/samba sh"}),"\n",(0,a.jsx)(e.p,{children:"mount -t cifs //10.88.2.202/share $PWD/mnt -o user=user,password=pass"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-ini",children:"[global]\nworkgroup = MYGROUP\nserver string = Samba Server\nserver role = standalone server\nlog file = /usr/local/samba/var/log.%m\nmax log size = 50\ndns proxy = no\n\nidmap config * : backend = tdb\n\nhosts allow = 192.168.0.\n\n[public]\ncomment = Public share\npath = /data/share\nread only = No\nvalid users = share\n\nbrowsable = yes\nwritable = yes\ncreate mask = 0775\ndirectory mask = 0755\n"})}),"\n",(0,a.jsx)(e.h2,{id:"smbd---help",children:"smbd --help"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{children:"Usage: smbd [OPTION...]\n  -D, --daemon                            Become a daemon (default)\n  -i, --interactive                       Run interactive (not a daemon) and log to stdout\n  -F, --foreground                        Run daemon in foreground (for daemontools, etc.)\n      --no-process-group                  Don't create a new process group\n  -S, --log-stdout                        Log to stdout\n  -b, --build-options                     Print build options\n  -p, --port=STRING                       Listen on the specified ports\n  -P, --profiling-level=PROFILE_LEVEL     Set profiling level\n\nHelp options:\n  -?, --help                              Show this help message\n      --usage                             Display brief usage message\n\nCommon samba options:\n  -d, --debuglevel=DEBUGLEVEL             Set debug level\n  -s, --configfile=CONFIGFILE             Use alternate configuration file\n  -l, --log-basename=LOGFILEBASE          Base name for log files\n  -V, --version                           Print version\n      --option=name=value                 Set smb.conf option from command line\n"})}),"\n",(0,a.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,a.jsx)(e.h3,{id:"nt_status_bad_network_name",children:"NT_STATUS_BAD_NETWORK_NAME"}),"\n",(0,a.jsx)(e.p,{children:"\u53EF\u80FD\u662F\u56E0\u4E3A\u76EE\u5F55\u6CA1\u6709\u6743\u9650"}),"\n",(0,a.jsx)(e.h3,{id:"macos-\u4E0B\u65E0\u6CD5\u4F7F\u7528",children:"MacOS \u4E0B\u65E0\u6CD5\u4F7F\u7528"}),"\n",(0,a.jsx)(e.p,{children:(0,a.jsx)(e.a,{href:"https://community.spiceworks.com/topic/2085366-can-samba-active-directory-and-afp-run-simultaneously",children:"https://community.spiceworks.com/topic/2085366-can-samba-active-directory-and-afp-run-simultaneously"})}),"\n",(0,a.jsx)(e.h3,{id:"nt_status_invalid_network_response",children:"NT_STATUS_INVALID_NETWORK_RESPONSE"}),"\n",(0,a.jsxs)(e.p,{children:["\u53EF\u80FD\u662F min protocol \u5BFC\u81F4\u7684\n",(0,a.jsx)(e.a,{href:"https://www.linuxquestions.org/questions/linux-networking-3/samba-min-protocol-%3D-smb2-causes-protocol-negotiation-failed-nt_status_invalid_network_response-4175597669/",children:"https://www.linuxquestions.org/questions/linux-networking-3/samba-min-protocol-%3D-smb2-causes-protocol-negotiation-failed-nt_status_invalid_network_response-4175597669/"})]}),"\n",(0,a.jsx)(e.h2,{id:"ntlmv1-nt_status_wrong_password",children:"NTLMv1 NT_STATUS_WRONG_PASSWORD"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["Samba \u9ED8\u8BA4\u53EA\u5141\u8BB8 NTLMv2\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["\u4FEE\u6539\u4E3A\u5141\u8BB8 v1 ",(0,a.jsx)(e.code,{children:"ntlm auth = ntlmv1-permitted"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u6216\u8005 Windows \u4FEE\u6539\u4E3A\u4F7F\u7528 v2\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.code,{children:"secpol.msc"})}),"\n",(0,a.jsx)(e.li,{children:"NTLMv2 response only/refuse LM and NTLM."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.li,{children:"Windows 7 \u5F00\u59CB\u9ED8\u8BA4 NTLMv2 \u4F46\u6709\u53EF\u80FD\u5F00\u542F\u5171\u4EAB\u65F6\u88AB\u914D\u7F6E\u6210\u4E86 v1"}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(c,{...n})}):c(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return t}});var i=s(75271);let a={},r=i.createContext(a);function t(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);