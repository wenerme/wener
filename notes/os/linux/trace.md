# Trace

```bash
# file
strace -f -e open ls 2>&1 | grep ^open\( | grep “[[:digit:]]\+$” | cut -d\” -f2
# syscall
ltrace -c ls
```
