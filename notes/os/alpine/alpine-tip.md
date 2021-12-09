---
tags:
  - Tip
---

# Alpine Tip

## 修改 /etc/apk/world 然后 apk fix 可快速调整安装包

```bash
# 添加
echo nginx >> /etc/apk/world
apk fix

# 移除
sed -i '/nginx/d' /etc/apk/world
apk fix
```
