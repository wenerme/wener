# CC

## Tips

```bash
# 检测某个库是否存在, 如果不存在会显示 
# ld: cannot find -luv
gcc -luv

ldconfig -p | grep libjpeg
pkg-config --cflags jpeg
pkg-config --libs jpeg
```
