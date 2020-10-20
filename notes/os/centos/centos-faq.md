# FAQ

## 使用 alpine 下依赖 musl 的二进制

```bash
cd /etc/yum.repos.d/
wget https://copr.fedorainfracloud.org/coprs/ngompa/musl-libc/repo/epel-7/ngompa-musl-libc-epel-7.repo
yum install musl-libc-static
```
