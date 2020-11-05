---
title: Mysy2
---

# msys2
* 建议直接使用 mingw64
* /
  * /mingw64 - 启动 mingw64 会添加该目录下的内容作为 root
  * /mingw32
* mirror https://mirrors.tuna.tsinghua.edu.cn/help/msys2/
  * /etc/pacman.d/mirrorlist.mingw32 - i686
  * /etc/pacman.d/mirrorlist.mingw64 - x86_64
  * /etc/pacman.d/mirrorlist.msys
* https://www.msys2.org/docs/package-management/
* [Packages](https://packages.msys2.org/package)
  * git
  * nano
  * gcc
  * mingw-w64-x86_64-nsis
* 参考
  * [VSC 集成](https://stackoverflow.com/questions/45836650)

```bash
# backup
mv -t . /etc/pacman.d/mirrorlist.mingw32 /etc/pacman.d/mirrorlist.mingw64 /etc/pacman.d/mirrorlist.msys
echo "Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/i686" > /etc/pacman.d/mirrorlist.mingw32
echo "Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/x86_64" > /etc/pacman.d/mirrorlist.mingw64
echo 'Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch' > /etc/pacman.d/mirrorlist.msys

# 更新索引
pacman -Sy
# 升级
pacman -Su

# 搜索
pacman -Ss nano
# 安装
pacman -S nano
# 常用依赖
pacman -S git make mingw-w64-x86_64-go mingw-w64-x86_64-gcc
```

## .profile
```bash
export GOPATH=$HOME/go
# /c/GO/bin 看情况 - pacman go 版本落后官方
export PATH="$PATH:$HOME/.local/bin:/c/GO/bin:$HOME/go/bin"
export GO111MODULE=on
export GOPROXY=https://goproxy.io

function o()
{
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
* 默认 home 为
  * `/home/$USER`
  * `/msys64/home/$USER`
  * `/msys32/home/$USER`

__/etc/nsswitch.conf__

```ini
db_home: windows
```

如果不行则尝试

```
db_home: windows cygwin desc
db_home: env windows /c/User/Administrator
```
