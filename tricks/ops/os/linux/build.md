# Build

## Tips


## 获取动态链接的库

Be aware that ldd actually runs the executable with a special environment variable, and the Linux dynamic linker recognizes this flag and just outputs the libraries rather than running the executable. Look at the source to ldd; on my system, it's a bash script. If the executable is statically linked and uses syscalls, and specifies a different loader, it can do arbitrary evil things. So don't use ldd on an executable you don't trust.

```bash

ldd exec

objdump -p exec
lsof -P -T -p $(pidof exec)
readelf -d /bin/ls | grep 'NEEDED'
```
