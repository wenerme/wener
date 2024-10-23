---
title: msys2
---

# msys2

- https://www.msys2.org/
- msys -> Minimal System
- MinGW -> Minimalist GNU for Windows
- mingw/cygwin+包
- pacman 包管理器
- 提供类似 sudo
- 推荐本地 bin 位置 `C:\msys64\usr\local\bin`
- 参考
  - [VSC 集成](https://stackoverflow.com/questions/45836650)
  - [imachug/win-sudo](https://github.com/imachug/win-sudo)
  - [包索引](https://packages.msys2.org/package/)
  - archlinux [Pacman](https://wiki.archlinux.org/title/Pacman)
  - archlinux [Pacman tips](https://wiki.archlinux.org/title/Pacman/Tips_and_tricks)
- MSYS2 requires 64 bit Windows 10 or newer.
- `~` -> `cygpath -w ~` -> `C:\msys64\home\$USER`
- `C:\Users\$USER` -> `/c/Users/$USER`
  - Windows 正常的用户目录

:::tip

- 建议将 `C:\msys64` 目录从安全扫描排除
- 推荐使用 ucrt64

:::

| cmd                           | for                |
| ----------------------------- | ------------------ |
| `pacman -S PACKAGE`           | 安装               |
| `pacman -R PACKAGE`           | 卸载               |
| `pacman -Q PACKAGE`           | 查询               |
| `pacman -Syu PACKAGE`         | 安装 & 更新        |
| `pacman -Syu`                 | 更新所有           |
| **查询**                      |
| `pacman -Qe`                  | 查询所有安装的包   |
| `pacman -Ql PACKAGE`          | 查询包内容         |
| `pacman -Qii PACKAGE`         | 查询包信息         |
| `pacman -Qo FILE`             | 查询文件归属包     |
| `pacman -Qs PACKAGE`          | 搜索 已经安装 的包 |
| **MISC**                      |
| `pacman -Qdt`                 | 查询孤立的包       |
| `pacman -Rns $(pacman -Qdtq)` | 删除孤立的包       |
| `pactree PACKAGE`             | 包依赖树           |
| `pactree -r PACKAGE`          | 谁依赖这个包       |

- https://wiki.archlinux.org/title/pacman

```bash
# 更新 index
pacman -Syu
# 从新启动再更新
pacman -Su

# 基础开发工具
# 前缀 mingw-w64-SUBSYSTEM-ARCH
# 前缀 mingw-w64-${MSYSTEM,,}-$(uname -m)
pacman -Sy --needed base-devel git mingw-w64-x86_64-toolchain mingw-w64-x86_64-gcc
pacman -Sy gcc unzip zip rsync
pacman -Sy procps-ng # provide top

# Go
# ==========
pacman -S mingw-w64-ucrt-x86_64-go
# export GOROOT=/mingw64/lib/go
# export GOPATH=/mingw64
# 注意不是 ~/go 是 C:\Users\$USER\go
ls $(go env GOPATH)/bin
export PATH="$PATH:$(go env GOPATH)/bin"

# mingw-w64-x86_64-nsis - nsis 脚本安装工具

# 安装 win-sudo
curl -s https://raw.githubusercontent.com/imachug/win-sudo/master/install.sh | sh

pacman -S mingw-w64-ucrt-x86_64-fastfetch
fastfetch
```

```bash
# Explorer 打开目录
start "$(cygpath -d $PWD)"
```

## env

```bash
echo $MSYSTEM
# 查看 gcc 搜索路径  - 影响构建环境
gcc --print-search-dirs
```

> 推荐 UCRT64

| Name    | Prefix   | Toolchain | Architecture | C Library | C++ Library |
| ------- | -------- | --------- | ------------ | --------- | ----------- |
| MSYS    | /usr     | gcc       | x86_64       | cygwin    | libstdc++   |
| MINGW64 | /mingw64 | gcc       | x86_64       | msvcrt    | libstdc++   |
| UCRT64  | /ucrt64  | gcc       | x86_64       | ucrt      | libstdc++   |
| CLANG64 | /clang64 | llvm      | x86_64       | ucrt      | libc++      |
| MINGW32 | /mingw32 | gcc       | i686         | msvcrt    | libstdc++   |
| CLANG32 | /clang32 | llvm      | i686         | ucrt      | libc++      |

- MSYS
  - 包含一些 unix-like/cygwin 的工具
  - 所有其他环境继承 MSYS
- target - infix
  - ucrt64 - ucrt-x86_64
  - clang64 - clang-x86_64
  - clangarm64 - clang-aarch64
  - mingw64 - x86_64
  - mingw32 - i686
  - clang32 - clang-i686
- https://www.msys2.org/docs/environments/

**针对 SSHd 修改**

```bash
if [ -n "$SSH_CONNECTION" ]; then
  export MSYSTEM=MINGW32
  source /etc/profile
fi
```

**手动修改**

```bash
export MSYSTEM=UCRT64
source /etc/profile
echo $PATH
```

```bash
export MSYSTEM=MINGW64
source /etc/profile
echo $PATH
```

## pacman 常用命令

```bash
pacman -Ss nano     # 搜索
pacman -Qs nano     # 搜索已经安装的包
pacman -S nano      # 安装
pacman -R nano      # 卸载
pacman -Ql nano     # 显示包内容
pactree nano        # 包依赖树
pacman -Qi nano     # 直接依赖
pacman -Qo nano.exe # 文件归属包
pacman -F vim.exe   # 包含文件的包 - 会下载数据库
```

## 镜像

- mirror https://mirrors.tuna.tsinghua.edu.cn/help/msys2/
  - /etc/pacman.d/mirrorlist.mingw32 - i686
  - /etc/pacman.d/mirrorlist.mingw64 - x86_64
  - /etc/pacman.d/mirrorlist.msys

> 目前官方仓库速度还可以

```bash
# backup
mv -t . /etc/pacman.d/mirrorlist.mingw32 /etc/pacman.d/mirrorlist.mingw64 /etc/pacman.d/mirrorlist.msys
echo "Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/i686" > /etc/pacman.d/mirrorlist.mingw32
echo "Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/x86_64" > /etc/pacman.d/mirrorlist.mingw64
echo 'Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch' > /etc/pacman.d/mirrorlist.msys
```

## .profile

```bash
# /c/GO/bin 看情况 - pacman go 和官方差距不大
# export GOPATH=$HOME/go
export PATH="$PATH:$HOME/.local/bin:$HOME/go/bin"
export GO111MODULE=on
export GOPROXY=https://goproxy.io

function o() {
  if [ $# -eq 0 ]; then
    local opath=.
  else
    local opath="$@"
  fi
  # Windows
  command -v cygstart > /dev/null && cygstart "$opath" && return
  command -v cygpath > /dev/null && start "$(cygpath -d $opath)" && return
}
```

## 修改 Home 目录

- 默认 home 为
  - `/home/$USER`
  - `/msys64/home/$USER`
  - `/msys32/home/$USER`

**/etc/nsswitch.conf**

```ini
db_home: windows
```

如果不行则尝试

```
db_home: windows cygwin desc
db_home: env windows /c/User/Administrator
```

## SSHd

- [Setting up SSHd](https://www.msys2.org/wiki/Setting-up-SSHd/)
- 参考
  - https://gist.github.com/samhocevar/00eec26d9e9988d080ac

```bash
pacman -Sy openssh cygrunsrv mingw-w64-x86_64-editrights

# 创建 sshd 用户需要管理员权限
# win-sudo
sudo sh ./msys2-sshd-setup.sh
```

**msys2-sshd-setup.sh**

```bash
#!/bin/sh
# from https://www.msys2.org/wiki/Setting-up-SSHd/

set -e

UNPRIV_USER=sshd # DO NOT CHANGE; this username is hardcoded in the openssh code
UNPRIV_NAME="Privilege separation user for sshd"

EMPTY_DIR=/var/empty

if ! /mingw64/bin/editrights -h > /dev/null; then
  echo "ERROR: Missing 'editrights'. Try: pacman -S mingw-w64-x86_64-editrights."
  exit 1
fi

if ! cygrunsrv -v > /dev/null; then
  echo "ERROR: Missing 'cygrunsrv'. Try: pacman -S cygrunsrv."
  exit 1
fi

if ! ssh-keygen -A; then
  echo "ERROR: Missing 'ssh-keygen'. Try: pacman -S openssh."
  exit 1
fi

#
# The unprivileged sshd user (for privilege separation)
#
add="$(if ! net user "${UNPRIV_USER}" > /dev/null; then echo "//add"; fi)"
if ! net user "${UNPRIV_USER}" ${add} //fullname:"${UNPRIV_NAME}" \
  //homedir:"$(cygpath -w ${EMPTY_DIR})" //active:no; then
  echo "ERROR: Unable to create Windows user ${UNPRIV_USER}"
  exit 1
fi

#
# Add or update /etc/passwd entries
#
if test -f /etc/passwd; then
  sed -i -e '/^'"${UNPRIV_USER}"':/d' /etc/passwd
  SED='/^'"${UNPRIV_USER}"':/s?^\(\([^:]*:\)\{5\}\).*?\1'"${EMPTY_DIR}"':/bin/false?p'
  mkpasswd -l -u "${UNPRIV_USER}" | sed -e 's/^[^:]*+//' | sed -ne "${SED}" \
    >> /etc/passwd
  mkgroup.exe -l > /etc/group
fi

#
# Finally, register service with cygrunsrv and start it
#
cygrunsrv -R msys2_sshd || true
cygrunsrv -I msys2_sshd -d "MSYS2 sshd" -p /usr/bin/sshd.exe -a "-D -e" -y tcpip

# The SSH service should start automatically when Windows is rebooted. You can
# manually restart the service by running `net stop msys2_sshd` + `net start msys2_sshd`
if ! net start msys2_sshd; then
  echo "ERROR: Unable to start msys2_sshd service"
  exit 1
fi
```

## Gitlab Runner

```bash
# --create-file-mode 0744
curl -LO https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-windows-amd64.exe
chmod +x gitlab-runner-windows-amd64.exe

mkdir -p /opt/bin
mv gitlab-runner-windows-amd64.exe /opt/bin/gitlab-runner.exe

mkdir -p runner && cd runner
# gitlab token env
REGISTRATION_TOKEN=
gitlab-runner register \
  --non-interactive \
  --executor shell \
  --shell bash \
  --url "https://gitlab.com/" \
  --registration-token "$REGISTRATION_TOKEN" \
  --description windows-shell-runner \
  --tag-list "windows,shell,bash" \
  --run-untagged=false \
  --locked=false \
  --access-level=not_protected \
  --builds-dir ./build \
  --cache-dir ./cache
# 生成的配置
cat config.toml
# 不能通过 SSH 执行 - FATAL: Failed to start gitlab-runner: The specified service does not exist as an installed service.
gitlab-runner run -c ./config.toml -d .

# service
cygrunsrv -R gitlab_shell_runner
cygrunsrv -I gitlab_shell_runner -d "Gitlab Shell Runner" -p /opt/bin/gitlab-runner.exe -c $PWD -a "run -c ./config.toml -d ." -y tcpip
```

## Python

- 应该只有 mingw 好用
- 避免 `python3 -m pip install --upgrade pip`

```bash
# mingw-w64-ucrt-x86_64-python
# mingw-w64-x86_64-python
# python
pacman -Q | grep "python"

# ucrt
# mingw-w64-ucrt-x86_64-python mingw-w64-ucrt-x86_64-python-pip

# mingw
# libpython3.11.dll libgcc_s_seh-1.dll libwinpthread-1.dll
# mingw-w64-x86_64-python-poetry mingw-w64-x86_64-python-pip

# msys
# 依赖 msys-*.dll
# python python3-pip
```

## CI

- https://www.msys2.org/docs/ci/

# FAQ

```bash
cygpath -w '/'

# 从 Windows Defender 排除目录
powershell.exe -Command "Add-MpPreference -ExclusionPath $(cygpath -w '/')"
# 当前的排除列表
powershell.exe -Command "Get-MpPreference | Select-Object -ExpandProperty ExclusionPath"
powershell.exe -Command 'Set-MpPreference -DisableRealtimeMonitoring $true'
```

## GCC vs LLVM/Clang

- GCC
  - 使用更多
  - 支持 Fortran
  - 包可能使用 Clang 构建
- LLVM/Clang
  - 只使用 LLVM 工具 - LLD linker, LIBC++
  - Clang 支持 ASAN
  - 原生支持 TLS/Thread-local storage
  - LLD 比 LD 更快 但功能特性更少
  - 缺少部分 GNU 下工具
  - Windows 10 支持 ARM64/AArch64 架构

## MSVCRT vs UCRT

- MSVCRT - Microsoft Visual C++ Runtime
  - Windows 默认，后向兼容，非 C99 兼容
  - 不支持 UTF-8 locale
- UCRT - Universal C Runtime
  - 新版本 Microsoft Visual Studio 默认
  - Windows 10 默认带
- vcruntime
  - CRT 分为 vcruntime 和 UCRT
  - ucrt for non-Microsoft compiler - Clang / GCC
  - vcruntime for Microsoft compiler - MSVC

---

- https://learn.microsoft.com/en-us/cpp/porting/upgrade-your-code-to-the-universal-crt

## Node Must load N-API bindings

```
Must load N-API bindings
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

```bash
pacman -S mingw-w64-ucrt-x86_64-rust
```

- swc.win32-x64-msvc.node 和 msys 不兼容
- https://github.com/napi-rs/napi-rs/pull/2026
- https://github.com/msys2/MINGW-packages/issues/17782
- https://github.com/msys2/MINGW-packages/issues/20407

## static nodejs

```bash
ldd /ucrt64/bin/node.exe | grep -vi 'Windows/SYSTEM32'
```

```
libstdc++-6.dll => /ucrt64/bin/libstdc++-6.dll
libgcc_s_seh-1.dll => /ucrt64/bin/libgcc_s_seh-1.dll
libwinpthread-1.dll => /ucrt64/bin/libwinpthread-1.dll
libnode.dll => /ucrt64/bin/libnode.dll
libcares-2.dll => /ucrt64/bin/libcares-2.dll
libcrypto-3-x64.dll => /ucrt64/bin/libcrypto-3-x64.dll
libicuin75.dll => /ucrt64/bin/libicuin75.dll
libicuuc75.dll => /ucrt64/bin/libicuuc75.dll
libssl-3-x64.dll => /ucrt64/bin/libssl-3-x64.dll
libicudt75.dll => /ucrt64/bin/libicudt75.dll
zlib1.dll => /ucrt64/bin/zlib1.dll
```

```bash
curl -LO https://nodejs.org/download/release/latest-v20.x/win-x64/node.exe
# 没有外部依赖
ldd node.exe | grep -vi 'Windows/SYSTEM32'
```

## pacman hang on GPG

```bash
pstree -lp
```

- https://github.com/msys2/setup-msys2/issues/358
- https://github.com/msys2/MSYS2-packages/issues/2752
