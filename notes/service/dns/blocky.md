---
title: blocky
---

# Blocky

- [0xERR0R/blocky](https://github.com/0xERR0R/blocky)
  - Apache-2.0, Go
  - Blocking
  - 支持自定义规则
  - 支持多协议
    - DNS over UDP and TCP
    - DNS over HTTPS (aka DoH)
    - DNS over TLS (aka DoT)
  - 支持 DNSSEC, eDNS
  - 多节点可使用 Redis 缓存
  - queryLog 可写入数据库 - mysql, postgresql, csv, csv-client, console

```bash
curl -L -o blocky.tar.gz https://github.com/0xERR0R/blocky/releases/download/v0.24/blocky_v0.24_$(uname -o)_$(uname -m).tar.gz
tar zxvf blocky.tar.gz

./blocky version
mv blocky ~/bin/

curl -LO https://0xerr0r.github.io/blocky/latest/config.yml
# 注释掉 redis.address
./blocky serve -c config.yaml
```

- https://0xerr0r.github.io/blocky/v0.24/configuration/
- https://0xerr0r.github.io/blocky/v0.24/config.yml


```ts
type logEntry struct {
	RequestTS     *time.Time `gorm:"index"`
	ClientIP      string
	ClientName    string `gorm:"index"`
	DurationMs    int64
	Reason        string
	ResponseType  string `gorm:"index"`
	QuestionType  string
	QuestionName  string
	EffectiveTLDP string
	Answer        string
	ResponseCode  string
	Hostname      string
}
```

- https://github.com/0xERR0R/blocky/blob/main/querylog/database_writer.go
