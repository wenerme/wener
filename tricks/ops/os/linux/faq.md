# FAQ

## Tips

## 'RTLD_NEXT' undeclared
* gcc 添加 `-D_GNU_SOURCE`
* 因为不是标准的 POSIX 定义

## mmap: Operation not permitted
* 可能是由于内核开启了 `CONFIG_STRICT_DEVMEM` 导致, 出于安全考虑, 在用户空间不允进行超过 1MB 的物理内存操作
* http://blog.sina.com.cn/s/blog_6f5b220601012xbc.html
* 有可能是因为 mmap 包含了 `PROT_EXEC`, 在 PaX 下会失败

```bash
sysctl dev.mem.restricted
# /proc/sys/dev/mem/restricted

# https://stackoverflow.com/a/36507784/1870054
# 该操作会禁用很多 PaX 特性
# https://en.wikibooks.org/wiki/Grsecurity/Appendix/Grsecurity_and_PaX_Configuration_Options#Support_soft_mode
sysctl -w kernel.pax.softmode=1
```

## 查看内核配置
* 常见配置路径
  * `/proc/config.gz`
  * `/boot/config`
  * `/boot/config-$(uname -r)`

```bash
cat /proc/config.gz | gunzip > running.config
zcat /proc/config.gz > running.config

grep CONFIG_IKCONFIG running.config
```

## 没有 /proc/config.gz

```bash
modprobe configs
```
