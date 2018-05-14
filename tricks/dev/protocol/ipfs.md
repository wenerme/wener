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
  * 4001
    * Swarm TCP
  * 4002
    * Swarm uTP
  * 5001
    * API
  * `:5001/webui`
    * Web 管理端
  * 8080
    * Gateway
  * 8081
    * Swarm Websockets
* [Is it possible to use IPFS for LIVE video streaming?](https://discuss.ipfs.io/t/is-it-possible-to-use-ipfs-for-live-video-streaming/1115)

```bash
# 容器环境中使用 ipfs
docker run --rm -it -v $PWD:/host --entrypoint sh --workdir /host ipfs/go-ipfs

# 启动服务
# -e IPFS_LOGGING=debug 显示调试日志
docker run -it --rm \
   -v $PWD/repo:/data/ipfs \
   -p 8080:8080 -p 4001:4001 -p 5001:5001 \
   --name ipfs_host ipfs/go-ipfs



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
# 适用于
ipfs --api /ip4/127.0.0.1/tcp/5001 swarm peers

# 觉得操作麻烦可以添加别名
alias ipfs="ipfs -c $IPFS_PATH"
```

## libp2p
* [libp2p/libp2p](https://github.com/libp2p/libp2p)
* [libp2p/go-libp2p](https://github.com/libp2p/go-libp2p)

功能 | 目的 | 实现
----|----|----
使用数据 | applications | IPFS
定义数据 | naming<br>merkledag | IPNS<br>IPLD
移动数据 | exchange<br>routing<br>network | libp2p

https://github.com/ipld/specs/tree/master/ipld

## ipfs --help

```
USAGE
  ipfs - Global p2p merkle-dag filesystem.

SYNOPSIS
  ipfs [--config=<config> | -c] [--debug=<debug> | -D] [--help=<help>] [-h=<h>] [--local=<local> | -L] [--api=<api>] <command> ...

OPTIONS

  -c,   --config string - Path to the configuration file to use.
  -D,   --debug  bool   - Operate in debug mode. Default: false.
  --help         bool   - Show the full command help text. Default: false.
  -h             bool   - Show a short version of the command help text. Default: false.
  -L,   --local  bool   - Run the command locally, instead of using the daemon. Default: false.
  --api          string - Use a specific API instance (defaults to /ip4/127.0.0.1/tcp/5001).

SUBCOMMANDS
  BASIC COMMANDS
    init          Initialize ipfs local configuration
    add <path>    Add a file to IPFS
    cat <ref>     Show IPFS object data
    get <ref>     Download IPFS objects
    ls <ref>      List links from an object
    refs <ref>    List hashes of links from an object

  DATA STRUCTURE COMMANDS
    block         Interact with raw blocks in the datastore
    object        Interact with raw dag nodes
    files         Interact with objects as if they were a unix filesystem
    dag           Interact with IPLD documents (experimental)

  ADVANCED COMMANDS
    daemon        Start a long-running daemon process
    mount         Mount an IPFS read-only mountpoint
    resolve       Resolve any type of name
    name          Publish and resolve IPNS names
    key           Create and list IPNS name keypairs
    dns           Resolve DNS links
    pin           Pin objects to local storage
    repo          Manipulate the IPFS repository
    stats         Various operational stats
    p2p           Libp2p stream mounting
    filestore     Manage the filestore (experimental)

  NETWORK COMMANDS
    id            Show info about IPFS peers
    bootstrap     Add or remove bootstrap peers
    swarm         Manage connections to the p2p network
    dht           Query the DHT for values or peers
    ping          Measure the latency of a connection
    diag          Print diagnostics

  TOOL COMMANDS
    config        Manage configuration
    version       Show ipfs version information
    update        Download and apply go-ipfs updates
    commands      List all available commands

  Use 'ipfs <command> --help' to learn more about each command.

  ipfs uses a repository in the local file system. By default, the repo is
  located at ~/.ipfs. To change the repo location, set the $IPFS_PATH
  environment variable:

    export IPFS_PATH=/path/to/ipfsrepo

  EXIT STATUS

  The CLI will exit with one of the following values:

  0     Successful execution.
  1     Failed executions.

  Use 'ipfs <subcmd> --help' for more information about each command.
```
