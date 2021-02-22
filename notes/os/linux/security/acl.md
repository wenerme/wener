# ACL

## acl fix

```bash
find . -type d -exec chmod 0755 {} \;
find . -type f -exec chmod 0644 {} \;

# 修改用户
sudo find . -type d -user root -exec chown admin {} \;
```
