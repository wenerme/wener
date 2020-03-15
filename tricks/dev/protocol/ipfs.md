---
id: ipfs
title: IPFS
---

# IPFS

## Tips
* the InterPlanetary File System
* [ipfs](https://github.com/ipfs)
* [ipfs.pics](https://github.com/ipfspics/ipfspics-server)
  * Distributed image hosting
* [ipfstube](https://github.com/download13/ipfstube)
* Why
  * 提供块级去重, 使得总体数据量得到压缩
  * 参考
    * [Comparison of IPFS and BitTorrent for Archives](https://github.com/ipfs/notes/issues/208)
    * [How does IPFS compare with X?](https://discuss.ipfs.io/t/how-does-ipfs-compare-with-x/465)
* 端口
  * 4001 - Swarm TCP
  * 4002 - Swarm uTP
  * 5001 - API
    * `/webui` Web 管理端
  * 8080 - Gateway
  * 8081 - Swarm Websockets
* 参考
  * [Is it possible to use IPFS for LIVE video streaming?](https://discuss.ipfs.io/t/is-it-possible-to-use-ipfs-for-live-video-streaming/1115)
* [IPFS公共网关检测](https://apis.wener.me/ipfs/gateway/checker)
* 优势
  * 支持 gateway - 可以通过 HTTP 直接访问
  * 支持 MFS/虚拟目录
  * 目标是替代 internet 而不是单纯的 P2P 文件共享
  * ipns 替代 dns，ipfs 替代 internet
* 劣势
  * IPFS 网络相对 torrent 没那么成熟
    * 意味着节点少
    * 资源少
  * 文件分发较慢
  * 开发公司重心转向 filecoin

```bash
# macOS
brew install ipfs

# https://docs.ipfs.io/reference/api/cli/
# 生成配置文件
# 默认位于 $HOME/.ipfs 可通过 IPFS_PATH 更改
export IPFS_PATH=$PWD/repo
# 也可以使用 --config 或 -c 指定
ipfs init

# 获取配置
ipfs config -c $PWD/repo --json Addresses.API
# 修改配置
# 默认只监听 127.0.0.1
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001

# 启动服务端
ipfs daemon

# 可使用 --api 指定远程接口
# 查看节点
ipfs --api /ip4/127.0.0.1/tcp/5001 swarm peers

# 容器环境中使用 ipfs
docker run --rm -it -v $PWD:/host --entrypoint sh --workdir /host ipfs/go-ipfs

# 启动服务
# -e IPFS_LOGGING=debug 显示调试日志
docker run -it --rm \
   -v $PWD/repo:/data/ipfs \
   -p 8080:8080 -p 4001:4001 -p 5001:5001 \
   --name ipfs_host ipfs/go-ipfs


# 生成 hash 不添加文件 - HASH 对应 IPLD file data
echo 'Hello IPFS!' | ipfs add -nq

# MFS 里文件的 hash - 是一个 LINK - HASH 对应 IPLD 多个 file block - 最后的一个 block 对应 raw 数据 - 相同数据但不同 hsah
ipfs files stat /myfile

# cp 可以支持从 add 的复制到 mfs
ipfs files cp /ipfs/$(echo 'Hello IPFS!' | ipfs add -q) /hello.txt
ipfs files read /hello.txt
```

## libp2p
* [libp2p/libp2p](https://github.com/libp2p/libp2p)
* [libp2p/go-libp2p](https://github.com/libp2p/go-libp2p)

功能 | 目的 | 实现
----|----|----
使用数据 | applications | IPFS
定义数据 | naming<br/>merkledag | IPNS<br/>IPLD
移动数据 | exchange<br/>routing<br/>network | libp2p

https://github.com/ipld/specs/tree/master/ipld
https://blog.cloudflare.com/distributed-web-gateway/
https://developers.cloudflare.com/distributed-web/ipfs-gateway/

## filestore

```bash
# 启用特性
ipfs config --json Experimental.FilestoreEnabled true
```

## gateway
* https://github.com/ipfs/go-ipfs/blob/master/docs/gateway.md
* https://github.com/ipfs/infra/blob/master/ipfs/gateway/nginx.conf
* https://rklaehn.github.io/2018/06/08/running-ipfs-gateway/


```bash
ipfs swarm connect $peer
ipfs bootstrap add $peer
```
