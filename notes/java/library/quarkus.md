---
id: quarkus
title: Quarkus
---

# Quarkus

## Tips

- [Quarkus](https://quarkus.io/) - Kubernetes Native Java stack tailored for GraalVM & OpenJDK HotSpot
- [code.quarkus.io](https://code.quarkus.io/) 项目生成，类似于 spring 的 start
- RedHat 团队 - 依赖的主要是 RH 相关的中间件
- 主要优势
  - 快速启动
  - 内存占用少
  - quarkus-maven-plugin 对开发友好
  - cdi+resteasy = 20mb 二进制
- 主要依赖
  - quarkus arc - CDI
    - 非反射 - 因为 Graalvm 不支持大部分反射
    - 在部署时生成元数据类
      - META-INF/jandex.idx
      - `*.zig` - Jvm IR
      - quarkus.index-dependency 配置项
  - Substrate VM
  - undertow - 默认 servlet 容器
  - resteasy - jaxrs 实现
  - quarkus-hibernate-orm-panache - 类似于 ActiveRecord 的扩展
  - MicroProfile - 微服务相关能力

## quarkus-maven-plugin

| 命令                          | 说明               |
| ----------------------------- | ------------------ |
| mvn quarkus:add-extension     | 添加扩展           |
| mvn quarkus:add-extensions    | 添加扩展           |
| mvn quarkus:analyze-call-tree | 分析调用树         |
| mvn quarkus:build             | 构建               |
| mvn quarkus:create            | 创建项目，生成文件 |
| mvn quarkus:create-extension  | 创建扩展           |
| mvn quarkus:dev               | 启动开发服务       |
| mvn quarkus:generate-config   | 生成示例配置       |
| mvn quarkus:help              | 帮助               |
| mvn quarkus:list-extensions   | 查看扩展           |
| mvn quarkus:native-image      | 构建本地镜像       |
| mvn quarkus:remote-dev        | 远程开发           |

```bash
# 启动开发服务
mvn compile quarkus:dev

# 构建 native 镜像
mvn package -Pnative
# 如果没有设置 GRAALVM_HOME 可以手动设置
GRAALVM_HOME=~/jdk/graalvm/Contents/Home/ mvn package -Pnative
# 如果失败，尝试安装 native-image


# 创建项目
mvn io.quarkus:quarkus-maven-plugin:0.22.0:create \
    -DprojectGroupId=org.acme \
    -DprojectArtifactId=application-lifecycle-events \
    -DclassName="org.acme.events.GreetingResource" \
    -Dpath="/hello"
```
