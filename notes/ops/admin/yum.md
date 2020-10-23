# yum

## Tips

```bash
# Update
yum list available java\*
yum list updates
yum check-update
yum upgrade java\*

# 安装 Oracle JDK
# http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
wget --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.rpm

yum localinstall jdk-8u131-linux-x64.rpm


```

## 忽略依赖
```bash
yum install -y yum-utils
rpm -Uvh --nodeps $(repoquery --location kernel-core)
```

## Download only

```bash
# (RHEL5)
yum install yum-downloadonly
# (RHEL6)
yum install yum-plugin-downloadonly

yum install --downloadonly --downloaddir=<directory> <package>

```

* [How to use yum to download a package without installing it](https://access.redhat.com/solutions/10154)
