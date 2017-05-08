# SSL

## Tips
* PEM - Privacy Enhanced Mail
* DER - Distinguished Encoding Rules,
  * `-inform der`

```bash
# 生成 CSR
# https://support.rackspace.com/how-to/generate-a-csr-with-openssl/
# 生成 Key
openssl genrsa -out wener.me.key 4096
# 生成新的 CSR
penssl req -new -sha256 -key wener.me.key -out wener.me.csr
# 然后提交 wener.me.csr 即可
# 拿到分发的 x509 可生成 pem 以供 nginx 使用
openssl x509 -in wener.me.x509 -out wener.me.pem -outform PEM
# 查看证书信息
openssl x509 -in wener.me.pem -text -noout
```
