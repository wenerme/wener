# 运维
## Tips

```bash
# 将所有 php 转换为
find . -iname '*.php' | xargs -I % file -i "%" | grep -v 'charset=utf-8' | sed -r 's/:.*//' | xargs -I % sh -c 'iconv -f gbk -t utf-8 "%" > /tmp/conv && mv /tmp/conv "%"'

# us-ascii 也不需要
find . -iname '*.php' | xargs -I % file -i "%" | grep -v 'charset=utf-8' | grep -v 'charset=us-ascii'

find . | xargs -I % file -i "%" | grep 'iso-8859-1' | sed -r 's/:.*//' | xargs -I % sh -c 'iconv -f gbk -t utf-8 "%" > /tmp/conv && mv /tmp/conv "%"'
```
