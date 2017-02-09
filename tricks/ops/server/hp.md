# HP

* [保修查询](http://h20564.www2.hp.com/hpsc/wc/public/find)

## Tips

* Hewlett-Packard [设备列表](https://en.wikipedia.org/wiki/List_of_Hewlett-Packard_products)
* HP ProLiant BL685c G7
* HP ProLiant BL685c G6
* HP ProLiant BL680c G7
* HPE ProLiant BL660c Gen9
* HP ProLiant BL660c Gen8
* HP ProLiant BL620c G7
* HP ProLiant BL490c G7
* HP ProLiant BL490c G6
* HP ProLiant BL465c Gen8
* HP ProLiant BL465c G7
* HPE ProLiant BL460c Gen9
* HP ProLiant BL460c Gen8
* HP ProLiant BL460c G7
* HP ProLiant BL460c G6
* HP ProLiant BL420c Gen8
* HP ProLiant BL280c G6
* HP ProLiant BL2x220c G7
* HP ProLiant BL2x220c G6
* HPE ProLiant WS460c Gen9
* Graphics Server Blade
* HP ProLiant WS460c Gen8
* Graphics Server Blade



* [ProLiant](https://en.wikipedia.org/wiki/ProLiant)
  * 字母代号
    * ML Modular Line 直立型的服务器
    * DL Density Line 代表可收纳于19吋宽机架的机型
    * BL Blade Line 刀片服务器规格
    * SL Scalable Line 堆栈式服务器
  * 数字代号
    * 区别 CPU
    * 数字越高性能越好
    * 100,200,300,400 两个 CPU
    * 500,600 四个 CPU
    * 700 八个CPU
    * 900 八个 CPU, 可以使用 80 核心,支持 4TB



## SPP
* [Service Pack for ProLiant](http://h17007.www1.hpe.com/us/en/enterprise/servers/products/service_pack/spp/index.aspx)
* [支持文档](http://www.hpe.com/servers/spp/documentation)
* [SPP 定制](https://spp.hpe.com/custom/)
* 2016.10
  * [下载](http://h30537.www3.hpe.com/prdownloads/871790_001_spp-2016.10.0-SPP2016100.2016_1015.191.iso?downloadid=ZngxrLJbrIfzbkhKG5qkwlAbtXPD8Mj43YYvUi04oH_CpalGib3oorrxZIW2dgOvr1E5b3qxgFb-94eE4cs_8zAdbwJRZP_TT2FbFZ7ANVrwG2ddEHSpYw_Ep-vsDSA7wICvJWw6q8gaxtOZabSyQZwDpwC7KstvKJqWHZZU73iqUg79QJLMnA==&merchantId=SPPHPSC_KIOSK&dlm=ON&rnid=1.0&bpid=ISS&egid=F&__dlk__=1477463496_b95a3584ceceed54131873e687af498a)
  * [FTP](http://ftp.hp.com/pub/softlib2/software1/cd/p1450150448/v108035/HPIP163.2016_0720.i192.227.iso)
  * MD5 3e93873632c5758666c5b1c305d557ea
  * 最后一个支持 G6 的版本
* 2016.4
  * [下载](http://h30537.www3.hpe.com/prdownloads/864794_001_spp-2016.04.0-SPP2016040.2016_0317.20.iso?downloadid=qmlXmP36x_qflRBA0l4VslAbtXPD8Mj43YYvUi04oH9NqAtYvv4z92f1msUWKG9a89uzrwRLZILRrv6dZbsxKt8wHKPDV-xQroWAHhdGg7ziVFo5zZ2g4m6vQtrj1UX2GcOSkUSOFt_JS4y3d9cNnwJHD_eYTPx6SVNrm9FeyZw=&merchantId=SPPHPSC_KIOSK&dlm=ON&rnid=1.0&bpid=ISS&egid=F&__dlk__=1459656111_99f8fe320600eca474f39f04e135db51)

  * MD5

## SDR
  * 惠普提供很多软件来控制服务器
  * https://downloads.linux.hpe.com/
  * https://downloads.linux.hpe.com/SDR/repo/
  * 注意
    * 固件升级只支持 RPM 类的系统,不支持 DEB 系列系统
    * 国内需要通过代理使用

__mcp__

包 | 描述
----|----
hp-health	         | HPE System Health Application and Command line Utilities
hponcfg	           | HPE RILOE II/iLO online configuration utility
hp-ams             | HPE Agentless Management Service
hp-snmp-agents	   | Insight Management SNMP Agents for HPE ProLiant Systems
hpsmh	             | HPE System Management Homepage
hp-smh-templates	 | HPE System Management Homepage Templates
hpssacli	         | HPE Command Line Smart Storage Administration Utility
hpssaducli	       | HPE Command Line Smart Storage Administration Diagnostics
hpssa	             | HPE Array Smart Storage Administration Service

```bash
#########
# DEB
#########
# 添加 Key
# https://downloads.linux.hpe.com/SDR/keys.html
curl http://downloads.linux.hpe.com/SDR/hpPublicKey1024.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048_key1.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpePublicKey2048_key1.pub | apt-key add -

# 添加仓库
# 能在 DEB 类系统下使用的主要有 mcp,minnow,stk
wget https://downloads.linux.hpe.com/SDR/add_repo.sh
# -n 参数可以不添加仓库,而输出会添加的仓库
sh ./add_repo.sh -v mcp
sh ./add_repo.sh -v minnow
sh ./add_repo.sh -v stk
# 更新索引
apt update
# 安装包
apt install -y hp-health hpssacli hp-snmp-agents hpssa hpssacli hp-smh-templates hpsmh hponcfg
# 部分内容会安装到 /opt/hp


#########
# mcp - Management Component Pack
#########

```


## iLO
* 固件升级下载
  * [iLO2](http://h20564.www2.hpe.com/hpsc/swd/public/readIndex?sp4ts.oid=1135772)
  * iLO3

* [HP iLO 2 脚本和命令行指南](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03351064)
* [HP iLO 3 脚本和命令行指南](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c02774508)
* [HPE iLO 4 脚本和命令行指南](http://h20566.www2.hpe.com/hpsc/doc/public/display?docId=c03334060)
* [HPE iLO 4 Scripting and Command Line Guide](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=c03334058)


## iLO2

* 远程控制回退删除可能映射为 <Ctrl-H>

```bash
################
# 挂载远程 ISO
################
# 由于 iLO2 虚拟媒介只能通过 Java Applet 选择,并且很难用,不能直接指定 URL,所以有了以下方法
# 进入 iLO2 命令行
ssh admin@ilo2 -vvv -o HostKeyAlgorithms=ssh-rsa
# 进入到虚拟设备
cd /map1/oemhp_vm1/cddr1
# 设置挂载地址, URL 最长 80 个字符
set oemhp_image=http://192.168.11.240:2015/spp-2016.10.0.iso
# 从该设备启动一次
set oemhp_boot=connect
set oemhp_boot=once
# 查看当前状态
show
# 重启
reset
# 弹出
set /map1/oemhp_vm1/cddr1 oemhp_boot=disconnect
```

### FAQ
#### iLO2 访问出现 SSL 错误
尝试使用 Safari 或者 IE 访问, Chrome 出现该错误

#### SSH 无法登陆 iLO2
```bash
# 添加 HostKeyAlgorithms 选项
ssh yky@ilo2 -vvv -o HostKeyAlgorithms=ssh-rsa
```

## FAQ
### HP 部分机型出现硬盘不兼容问题,会导致错误的过热检测,提升风扇转速,噪音很大
* 兼容的磁盘说明 http://dascomputerconsultants.com/HPCompaqServerDrives.htm
* 可能的原因
  * 磁盘没有温度传感,导致检测不到问题使得风扇转速不停提升
  * 选择硬盘是选择有温度传感的硬盘
* 新版的固件有对该问题进行修复
