---
title: Packer
---

# Packer

- [hashicorp/packer](https://github.com/hashicorp/packer) 是什么？
  - BSL, Go
  - 自动化多平台镜像构建工具
- 使用场景
  - CD
  - Dev/Prod Parity
  - Appliance/Demo Creation
- 核心流程
  - 启动 builder，提供一致的环境
    - vm、docker
  - 执行 provisioners - 服务开通
    - 构建 artifact
    - file provisioner 下载 artifact 到本地
  - 执行 post-processor
    - artifice 验证 产出物 存在
    - 上传到 docker hub、oss 等其他地方
- 注意
  - Builder 不支持依赖
  - 自动加载[变量](https://www.packer.io/guides/hcl/variables) `*.auto.pkrvars.hcl`
  - `PACKER_LOG=1` 开启日志
- 参考
  - [geerlingguy/packer-boxes](https://github.com/geerlingguy/packer-boxes)
- ~/.cache/packer

```bash
# macOS
brew install packer

packer version
# timestamp,target,type,data
packer -machine-readable version

packer -autocomplete-install

packer build template.json

# console
# 实验变量替换
# help exit variables
packer console my_template.json
echo {{timestamp}} | packer console

# hcl2 console - 1.6+
packer console folder/
packer console file.pkr.hcl
echo "1 + 5" | packer console --config-type=hcl2
packer console --config-type=hcl2

packer fix old.json > new.json
packer inspect template.json
packer validate my-template.json

# 使用 JQ 删除评论
jq 'walk(if type == "object" then del(._comment) else . end)' commented_template.json > uncommented_template.json

# 手动安装
# https://packer.io/downloads.html
ver=$(curl -sfL https://api.github.com/repos/hashicorp/packer/releases/latest | jq .tag_name -r)
ver=${ver##v}
curl -LOC- https://releases.hashicorp.com/packer/${ver}/packer_${ver}_linux_amd64.zip
```

## HCL2

- `packer build folder`
  - variables.pkr.hcl
  - locals.pkr.hcl
  - sources.pkr.hcl
  - build.pkr.hcl
- 引号和 heredoc 里使用 `${` `%{`
- [#9176](https://github.com/hashicorp/packer/issues/9176) - HCL2: implementation list

```hcl
# 全局定义可复用的 builder
source "docker" "base" {
  image = "wener/base"
  discard = true
  pull = false
}

# 本地变量
locals {
    # 直接引用
    wee = local.baz
    # 字符串中替换
    baz = "Foo is '${var.foo}' but not '${local.wee}'"
}

# 变量定义
variable "foo" {
    type = string
    default = "the default value of the `foo` variable"
    description = "description of the `foo` variable"
}

# 构建
build {
  name = "test-build"
  # 引用
  source "docker.base" {}
  # 多个
  # source = [ "source.docker.first", "source.docker.second" ]

  provisioner "shell" {
    # 指定 source 执行
    only = ["source.docker.base"]
    # 等待指定时间
    pause_before = "10s"
    max_retries = 5
    timeout = "5m"

    inline = [ "echo Tesing" ]
  }

  post-processor "shell-local" {
    inline = ["echo Down working"]
  }

  post-processor "checksum" {
    checksum_types = [ "md5", "sha512" ]
    keep_input_artifact = true
    only = ["source.amazon-ebs.example"]
  }
}
```

## Template

- [builders](https://www.packer.io/docs/builders)
  - alicloud-ecs - 阿里云 ECS 运行
  - docker - Docker 里运行
  - qemu - 通过 QEMU 运行
  - libvirt - 通过 libvirt 运行
  - tencentcloud-cvm - 腾讯云 CVM 运行
  - file - 基于文件构建 artifact 然后运行 post-processors
  - null - 设置 SSH，运行 provisioners
- [communicator](https://www.packer.io/docs/communicators) - 通信机制
- [post-processors](https://www.packer.io/docs/post-processors)
  - alicloud-import
  - artifice - 指定产出物，之后的 post-processors 能访问到
  - compress
  - checksum
  - docker-import
  - docker-push
  - docker-save
  - docker-tag
  - manifest
  - shell - 本地执行
- [provisioners](https://www.packer.io/docs/provisioners)
  - ansible-local - 本地执行
  - ansible - 远程执行
  - breakpoint - 等待用户确认
  - file - 文件上传
  - powershell
  - shell
  - shell-local
- variables
  - `{{user 'aws_access_key'}}`
  - `{{env 'MY_SECRET'}}`
  - `{{ consul_key 'my_image/softs_versions/next' }}`
  - `{{ vault '/secret/data/hello' 'foo'}}`
  - 数组变量可使用逗号拼接的字符串
  - `-var=name=value`
  - `-var-file=vars.json`

```json
{
  "_comment": "This is a comment",
  // 必须 - 定义一个或多个 builder
  "builders": [{}],
  "description": "",
  // packer 最小版本
  "min_packer_version": "",
  // 后处理步骤
  "post-processors": [{}],
  // 安装配置和包的步骤
  "provisioners": [{}],
  // 错误时执行
  "error-cleanup-provisioner": {
    "type": "shell-local",
    "inline": ["echo 'rubber ducky'> ducky.txt"]
  },
  // 变量定义
  "variables": {
    "my_secret": "{{env `MY_SECRET`}}",
    "not_a_secret": "plaintext",
    "foo": "bar"
  },
  // 定义敏感变量
  "sensitive-variables": ["my_secret", "foo"]
}
```

### 模版语法

- [模板语法](https://www.packer.io/docs/templates/engine)
  - `{{ }}`
  - `{{timestamp}}`
  - `{{.Variable}}`

| func                | desc                                                          |
| ------------------- | ------------------------------------------------------------- |
| build_name          | 构建名                                                        |
| build_type          | 构建类型                                                      |
| clean_resource_name | 干净的资源名字，空格转`-`，小写，截取长度（GCE 63，Azure 80） |
| env                 | 环境变量                                                      |
| build               | 构建时的状态和连接信息                                        |
| `isotime [FORMAT]`  | 时间                                                          |
| lower               |
| packer_version      |
| pwd                 |
| replace             | `( old, new string, n int, s )`                               |
| replace_all         | 全替换                                                        |
| split               | 分割字符串                                                    |
| template_dir        | 模板目录                                                      |
| timestamp           | UNIX 时间戳，建议设置为变量使用，否则会变                     |
| uuid                | UUID                                                          |
| upper               | 大写                                                          |
| user                | 用户变量                                                      |

- build
  - ID - 构建 VM 的 ID - 例如 EC2 的 instance id
  - Host, Port, User, Password - 访问机器的信息，用于 Ansible 或 Inspec
  - ConnType - 通信类型
  - PackerRunUUID - 构建 ID
  - PackerHTTPIP, PackerHTTPPort, PackerHTTPAddr - packer 提供的 http 文件服务 - vm 中的 http 目录
  - SSHPublicKey, SSHPrivateKey - packer 链接的密钥

### 条件变量

```json
{
  "type": "shell-local",
  "command": "if [ ! -z \"{{user `do_nexpose_scan`}}\" ]; then python -u trigger_nexpose_scan.py; fi"
}
```

### HOME

```json
{
  "variables": {
    "home": "{{env `HOME`}}"
  },
  "builders": [
    {
      "type": "google",
      "account_file": "{{ user `home` }}/.secrets/gcp-{{ user `env` }}.json"
    }
  ]
}
```

### communicator

- [communicator](https://www.packer.io/docs/communicators) - 通信机制
  - none - 不设置，不能使用 provisioners
  - ssh
    - ssh_host
    - ssh_port
    - ssh_username
    - ssh_password
    - ssh_keypair_name
    - temporary_key_pair_name
    - ssh_clear_authorized_keys
    - ssh_private_key_file
    - ssh_pty
    - ssh_timeout
    - ssh_agent_auth
    - ssh_disable_agent_forwarding
    - ssh_handshake_attempts
    - ssh_bastion_host
    - ssh_bastion_port
    - ssh_bastion_agent_auth
    - ssh_bastion_username
    - ssh_bastion_password
    - ssh_bastion_interactive
    - ssh_bastion_private_key_file
    - ssh_file_transfer_method
    - ssh_proxy_host
    - ssh_proxy_port
    - ssh_proxy_username
    - ssh_proxy_password
    - ssh_keep_alive_interval
    - ssh_read_write_timeout
    - ssh_remote_tunnels
    - ssh_local_tunnels
    - ssh_public_key
    - ssh_private_key
  - winrm
    - winrm_username
    - winrm_password
    - winrm_host
    - winrm_port
    - winrm_timeout
    - winrm_use_ssl
    - winrm_insecure
    - winrm_use_ntlm
  - docker
    - Docker Builder

```json
{
  "communicator": "ssh",
  "ssh_username": "myuser",
  "pause_before_connecting": "10m"
}
```

### docker

```json
{
  "builders": [
    {
      "type": "docker",
      // 基础镜像
      "image": "ubuntu",
      // 三选一 commit, discard, export_path
      // 提交
      "commit": true,
      // 丢弃
      "discard": true,
      // 导出到文件
      "export_path": "image.tar"
    }
  ],
  "post-processors": [
    [
      {
        "type": "docker-import",
        "repository": "hashicorp/packer",
        "tag": "0.7"
      },
      "docker-push"
    ]
  ]
}
```

### qemu

- 启动参数

```ini
-cdrom /xxx/packer_cache/xxx.iso
-name packer-alpine
-vnc 127.0.0.1:92
-boot once=d
-netdev user,id=user.0,hostfwd=tcp::4287-:22
-device virtio-net,netdev=user.0
# 挂载为 /dev/vda
-drive file=output-alpine/packer-alpine,if=virtio,cache=writeback,discard=ignore,format=qcow2
-m 512M
-machine type=pc,accel=hvf
```
