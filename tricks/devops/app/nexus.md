# Nexus

## Tips
* [Release-Notes](https://support.sonatype.com/hc/en-us/sections/203012688-Release-Notes)
* [NEXUS-10471](https://issues.sonatype.org/browse/NEXUS-10471) - 部署到 group 仓库
  * [Nginx 反向代理](https://stackoverflow.com/a/54590014/1870054)
* [Go Repositories](https://help.sonatype.com/repomanager3/formats/go-repositories)
  * [Guide](https://guides.sonatype.com/repo3/technical-guides/go-dependencies-nxrm3/)

```bash
# 环境变量方式
export GOPROXY=https://gonexus.dev
# 配置方式
go env -w GOPROXY=https://gonexus.dev,direct
```
