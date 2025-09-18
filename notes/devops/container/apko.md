---
title: apko
---

# apko

- [chainguard-dev/apko](https://github.com/chainguard-dev/apko)
  - Apache-2.0, Go
  - Build OCI images using APK directly without Dockerfile
  - 使用 apk 构建 OCI image
- 参考
  - [chainguard-dev/melange](https://github.com/chainguard-dev/melange)
    - 生成 apk 用于 apko 构建
  - https://github.com/distroless/apko
  - https://github.com/chainguard-dev/apko/blob/main/mac/lima/apko-playground.yaml
- 一些 apk base 包
  - alpine-baselayout-data - /etc 下基础文件
  - alpine-baselayout - alpine-baselayout-data+musl+busybox
    - /etc/profile.d
    - /etc/crontabs/root
  - busybox
  - apk-tools - ca-certificates-bundle+libcrypto1.1+libssl1.1+musl+zlib
  - alpine-base
    - alpine-{baselayout,keys,conf}
    - apk-tools
    - busybox,busybox-{initscripts,suid}
    - openrc
    - libc-utils -> musl-utils - scanelf
      - ldconfig, getconf, getent, iconv, ldd
    - /etc/os-release
  - 兼容 - libc6-compat gcompat
  - 工具
    - curl
    - file
    - nano
    - bash
    - busybox-extras
      - arch, dnsd, dumpleases, fakeidentd, ftpd, ftpget, ftpput, httpd, inetd, readahead, telnet, telnetd, tftp, tftpd, udhcpd
      - telnet 比较有用

:::tip

- apko - apk -> oci image - rootless, daemonless, reproducable, declarative
- melange - source -> apk - chroot, multi-arch, pipeline
- apk-tools v3 支持 macOS
  - 支持 macOS [#239](https://github.com/chainguard-dev/apko/issues/239)
- 不能直接添加文件 - 需要先构建 apk 再添加

:::

```yaml title="alpine-base.yaml"
contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/edge/main
  packages:
    - alpine-base

entrypoint:
  command: /bin/sh -l

# optional environment configuration
environment:
  PATH: /usr/sbin:/sbin:/usr/bin:/bin
```

```bash
# build tar - 单 arch
apko build alpine-base.yaml apko-alpine:test apko-alpine.tar
# publish 到仓库 - 支持多 arch
apko publish alpine-base.yaml <registry_ref>

# build-arch 默认 GOARCH
apko build --use-proot base.yaml wener/base:latest base.tar --build-arch aarch64

# docker 环境使用
docker run distroless.dev/apko version
docker run --rm -it -v $PWD:/work distroless.dev/apko build alpine-base.yaml apko-alpine:edge apko-alpine.tar
```

## apko.yaml

```yaml
contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/edge/main
    # - @local /github/workspace/packages # 本地
  packages:
    - alpine-baselayout
    - nginx
  # keyring:

entrypoint:
  type: service-bundle # 使用 s6 https://skarnet.org/software/s6/index.html
  services:
    nginx: /usr/sbin/nginx -c /etc/nginx/nginx.conf -g "daemon off;"
  # 非 service-bundle 使用 command
  command: /bin/sh -l
  # 类似 command
  shell-fragment:

# WORKDIR
work-dir: /usr/share/nginx

accounts:
  groups:
    - groupname: nginx
      gid: 10000
  users:
    - username: nginx
      uid: 10000
  # 运行用户
  run-as: nginx

# 环境变量
environment:
  PATH: /usr/sbin:/sbin:/usr/bin:/bin

# 操作文件
paths:
  - path: /run/nginx
    # directory,empty-file,hardlink,symlink,permissions
    type: directory
    uid: 10000
    gid: 10000
    permissions: 0o755
    # source: # hardlink, symlink
  - path: /etc/nginx/http.d/default.conf
    type: hardlink
    source: /usr/share/nginx/http-default_server.conf
    uid: 10000
    gid: 10000
    permissions: 0o644

# docker image arch
# 386, amd64, arm64, arm/v6, arm/v7, ppc64le, riscv64, s390x
archs:
  - amd64
  - 386

# 类似 Dockerfile 的 FROM
include: github.com/chainguard-dev/apko/examples/alpine-base.yaml@main
```

- x86
- x86_64
- aarch64
- armv7
- ppc64le
- s390x
- riscv64


## melange

- [chainguard-dev/melange](https://github.com/chainguard-dev/melange)
- use
  - https://github.com/chainguard-dev/melange/tree/main/pipelines

| Substitution             | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `${{package.name}}`      | Package name                                      |
| `${{package.version}}`   | Package version                                   |
| `${{package.epoch}}`     | Package epoch                                     |
| `${{targets.destdir}}`   | Directory where targets will be stored            |
| `${{targets.subpkgdir}}` | Directory where subpackage targets will be stored |

## lima

```bash
limactl start --tty=false apko.yaml
limactl shell apko sudo su -c "HOME=\"${HOME}\" ash"
```

```yaml
images:
  - location: https://echo.wener.cc/https://github.com/lima-vm/alpine-lima/releases/download/v0.2.18/alpine-lima-std-3.16.0-x86_64.iso
    arch: x86_64
    digest: sha512:234e407867a8955b9835b08e605b38583815dbd63c5690b558fbbd7b519af115c53694ddc3ff498cddb112f113e350c9f8b2a3351be038aa443399a39eff6007

cpus: 1
memory: 2GiB
disk: 10GiB
firmware:
  legacyBIOS: true
containerd:
  system: false
  user: false
mounts:
  - location: '~'
  - location: '/tmp/lima'
    writable: true

provision:
  - mode: system
    script: |
      #!/bin/ash
      set -eux -o pipefail
      cat << EOF > /etc/apk/repositories
      https://mirrors.sjtug.sjtu.edu.cn/alpine/v3.16/main/
      https://mirrors.sjtug.sjtu.edu.cn/alpine/v3.16/community/
      @testing https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing/
      EOF

      apk update
      apk add apko@testing
      apk add nano file curl


      arch="$(uname -m)"
      if [[ "${arch}" != "x86_64" ]] && [[ "${arch}" != "aarch64" ]]; then
        echo "Unsupported arch: ${arch}. Exiting."
        exit 1
      fi

      # docker-credential-osxkeychain (mac system)
      # Add a dummy version of docker-credential-osxkeychain typically found
      # in mac ~/.docker/config.json
      echo '#!/bin/ash' > /usr/bin/docker-credential-osxkeychain
      echo 'echo "{\"ServerURL\":\"${1}\",\"Username\":\"\",\"Secret\":\"\"}"' \
        >> /usr/bin/docker-credential-osxkeychain
      chmod +x /usr/bin/docker-credential-osxkeychain
      # Get the examples/ dir from GitHub release, place at /examples
      wget https://echo.wener.cc/github.com/chainguard-dev/apko/archive/refs/heads/main.zip
      unzip main.zip "apko-main/examples/*" -d /examples -j
      rm -f main.zip
message: |-
  ---
  Run the following to get a root shell (needed to run apko build):
    limactl shell apko-playground sudo su -c "HOME=\"${HOME}\" ash"

  Try building an image:
    apko build /examples/nginx.yaml tag /tmp/output.tar
  Try publishing an image:
    apko publish /examples/nginx.yaml <registry_ref>
  ---
```
