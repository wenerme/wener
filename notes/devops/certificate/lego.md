# LEGO

## Tips
* [LEGO](https://go-acme.github.io/lego/) - Let’s Encrypt client and ACME library written in Go.
  * `--accept-tos` - 接受条款，避免询问
  * `--cert.timeout` - 获取证书的超时时间，默认 30s
  * `--dns-timeout` - DNS AS 查询的超时时间，默认 10s
  * `--http-timeout` - HTTP 验证的超时时间，默认 0
  * `--dns.disable-cp` - 不等待 TXT 被传播到所有 AS 服务器
    * 相对耗时，如果直接指定的正确的 DNS，则不需要等待传播
  * `--path` - 指定工作目录，默认为 `./.lego`

```bash
lego --email="foo@bar.com" --domains="example.com" --http run
lego --email="foo@bar.com" --domains="example.com" --http renew

# expires within 45
lego --email="foo@bar.com" --domains="example.com" --http renew --days 45

# callback
lego --email="foo@bar.com" --domains="example.com" --http renew --renew-hook="./myscript.sh"

# DNS provider
AWS_REGION=us-east-1 \
AWS_ACCESS_KEY_ID=my_id \
AWS_SECRET_ACCESS_KEY=my_key \
lego --email="foo@bar.com" --domains="example.com" --dns="route53" run

# CF DNS
CLOUDFLARE_EMAIL=foo@bar.com \
CLOUDFLARE_API_KEY=api-key \
lego --dns cloudflare --domains my.domain.com --email my@email.com run
# CF DNS Token
# 权限 Zone:Read, DNS:Edit
CLOUDFLARE_DNS_API_TOKEN=api-token \
lego --dns cloudflare --domains my.domain.com --email my@email.com run

# 阿里云 DNS
ALICLOUD_ACCESS_KEY=access-key \
ALICLOUD_SECRET_KEY=secret-key \
lego --dns alidns --domains my.domain.com --email my@email.com run

# PDNS
# https://go-acme.github.io/lego/dns/pdns/
PDNS_API_KEY=api-key \
PDNS_API_URL=http://127.0.0.1:8080 \
lego --dns pdns --domains my.domain.com --email my@email.com run

# custom csr
lego --email="foo@bar.com" --http --csr=/path/to/csr.pem run
```


