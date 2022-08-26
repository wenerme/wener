---
title: Nexus
---

# Nexus

- [Release-Notes](https://support.sonatype.com/hc/en-us/sections/203012688-Release-Notes)
- [NEXUS-10471](https://issues.sonatype.org/browse/NEXUS-10471) - 部署到 group 仓库
  - [Nginx 反向代理](https://stackoverflow.com/a/54590014/1870054)
- [Go Repositories](https://help.sonatype.com/repomanager3/formats/go-repositories)
  - [Guide](https://guides.sonatype.com/repo3/technical-guides/go-dependencies-nxrm3/)
- 开发集成
  - `$URL/swagger-ui/` Swagger 界面
- [系统要求](https://help.sonatype.com/repomanager3/installation/system-requirements)
  - 瓶颈是 IO, Java 应用 尽量确保内存足够
  - 4 Core 8 G
- 参考
  - [创建仓库只能是 Groovy 脚本 - 可通过 REST 上传](https://community.sonatype.com/t/creating-repositories-groups-etc-via-rest-api-in-nexus-3/814/3)
    - [simple-shell-example](https://github.com/sonatype-nexus-community/nexus-scripting-examples/tree/master/simple-shell-example)
  - [Trying to use REST API to create repositories in sonatype Nexus](https://stackoverflow.com/questions/41450338)
  - [仓库接口](https://help.sonatype.com/repomanager3/rest-and-integration-api/repositories-api)

```bash
# 环境变量方式
export GOPROXY=https://gonexus.dev
# 配置方式
go env -w GOPROXY=https://gonexus.dev,direct
```
