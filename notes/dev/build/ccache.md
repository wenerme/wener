---
id: ccache
---

# ccache
* 是什么？
  * 缓存编译单个文件 C/C++/Objective-C/Objective-C++
    * 不处理多文件编译和链接
  * 需要进行小修改然后重复编译的场景非常有用
* man [ccache](https://ccache.dev/manual/latest.html)

```bash
# 安装使用 - 通过包安装的一般会自己做这一步
cp ccache /usr/local/bin/
ln -s ccache /usr/local/bin/gcc
ln -s ccache /usr/local/bin/g++
ln -s ccache /usr/local/bin/cc
ln -s ccache /usr/local/bin/c++
```

```bash
# 查看统计
# 默认配置 ~/.ccache/ccache.conf
ccache -s
```
## 配置
* ～/.ccache/ccache.conf
* /etc/ccache.conf

```ini
# 缓存大小
max_size = 10.0G
```
