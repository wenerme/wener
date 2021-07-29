---
title: fission
---

# fission

- [fission/fission](https://github.com/fission/fission)
  Fast and Simple Serverless Functions
  - 目前支持 NodeJS, Python, Ruby, Go, PHP, Bash, Linux executable
  - 只操作源码不操作容器
  - 内置路由基于 gorilla/mux
    - 支持命名参数 `/guestbook/{name}/{age:[0-9]+}`
    - `X-Fission-Params-Name: <name>` - 注意名字会转换
  - 支持 WebSocket
  - 底层基于 keda
- helm [fission/fission-charts](https://github.com/fission/fission-charts)
  - fission-all - nats, influxdb
  - fission-core
- Function
  - 源码 - 可执行内容
  - Archive - 可以是打包的内容 - zip
  - Package - fission 将 Archive 进行打包 - 实际执行
  - 部分语言需要编译 - 需要创建环境
    - fission 负责构建
- Environment
  - 提供 HTTP 服务
  - 运行 Function
- Trigger - 入口/触发方式
  - HTTP
  - Timer - 定时
  - Message Queue - Kafka, NATS
  - Kubernetes Watch - 当集群变化时
- https://hub.docker.com/u/fission/
  - `<lang>-env` - 执行环境
  - `<lang>-builder` - 构建
- 内置路径映射
  - `/secrets/<namespace>/<name>/<key>`
  - `/configs/<namespace>/<name>/<key>`
- secrets 和 configs 需要启动时允许访问
  - 修改时会导致 pod 重启
  - 如果大量 function 使用相同的，则会瞬间导致
- 执行类型
  - poolmgr
    - 创建 env 自动创建
    - 默认 pool 3
    - 支持 Requests Per Pod - rpp 限定每个 pod 请求量
    - OnceOnly - 一个 pod 只处理一个请求
    - Concurrency - 限定请求并发
  - newdeploy
    - 支持自动扩缩容
    - 配置 min,max
    - `--minscale 0` 可完全缩容 - 冷启动会慢

```bash
fission env create --name nodejs --image fission/node-env
curl https://raw.githubusercontent.com/fission/examples/master/nodejs/hello.js > hello.js
fission function create --name hello --env nodejs --code hello.js

# 创建路由
fission route create --method GET --url /hello --function hello
# 请求
fission function test --name hello


# 添加 Go 环境
fission environment create --name go --image fission/go-env-1.12:1.13.1 --builder fission/go-builder-1.12:1.13.1
```

## Functions

**websocket.js**

```js
module.exports = async function (ws, clients) {
  ws.on('message', function incoming(data) {
    clients.forEach(function each(client) {
      client.send(data);
    });
  });

  ws.on('close', function close() {
    return {
      status: 200,
      message: 'I am done',
    };
  });
};
```

## HTTP

```yaml
X-Fission-Function-Uid: 82c95606-9afa-11e8-bbd1-08002720b796
X-Fission-Function-Resourceversion: 480652
X-Fission-Function-Name: reqpayload
X-Fission-Function-Namespace: default

X-Fission-Params-Name: Alice
X-Fission-Params-Age: 23
```

## Environment

```yaml
apiVersion: fission.io/v1
kind: Environment
metadata:
  creationTimestamp: null
  name: nodejs
  namespace: default
spec:
  builder: {}
  imagepullsecret: ''
  keeparchive: false
  poolsize: 3
  resources: {}
  runtime:
    image: fission/node-env:latest
  version: 2
```

## CanaryConfig

```yaml
apiVersion: fission.io/v1
kind: CanaryConfig
metadata:
  name: canary-1
  namespace: default
spec:
  duration: 1m
  failureType: status-code
  failurethreshold: 10
  newfunction: fn-a-v2
  oldfunction: fn-a-v1
  trigger: route-fn-a
  weightincrement: 30
```
