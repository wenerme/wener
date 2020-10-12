# Proxy

## Tips
* https://scrapinghub.com/crawlera



__Crawlera__

                   |C10  |C50  |C100 |C200 |ENTERPRISE
-------------------|-----|-----|-----|-----|------
PRICE              |$25  |$100 |$250 |$500 |Custom
MONTHLY REQUESTS   |150K |1M	 |3M   |9M	 |Custom
CONCURRENT REQUESTS|10	 |50	 |100  |200	 |Custom


https://github.com/scrapinghub/splash


## Luminati
http://luminati.io/

* 分为住宅 IP
  * 按流量收费, 不限 IP
* 数据中心 IP
  * 可租赁 IP
  * 30 IP 1$/天 不限流量
* Super Proxy
  * 统一代理点
* Proxy Peer
  * 代理终端
  * 代理出口
  * http://zproxy.luminati.io:22225
* session-id
  * 是一个任意的数字和字符串
  * 使用同样的值会尽可能的使用同样的代理点
  * 但要保证使用同样的 Super Proxy
  * 有一分钟的空闲时间, 超时后会回到池中
  * 加 `glob_` 前缀来使用全局 session, 忽略客户端 IP
* 常见被屏蔽的状态码 403, 429, 502, 503


```yaml
# 返回的头
# 出口地址
x-hola-ip: 66.78.39.151
x-hola-timeline-debug: ztun 958ms z007 66.78.39.151 xx zgc xx.pool_route z007
x-luminati-timeline: init:0,auth:0,dns_resolve:0,ext_conn:1,ext_proxy_connect:650,response:307
# 错误返回
X-Hola-Error: Bad Port
```

http://lumtest.com/myip.json

```json
{
    "asn": {
        "asnum": 21769,
        "org_name": "Colocation America Corporation"
    },
    "country": "CN",
    "geo": {
        "city": "Beijing",
        "latitude": 39.9289,
        "longitude": 116.3883,
        "postal_code": "",
        "region": "11",
        "tz": "Asia/Shanghai"
    },
    "ip": "66.78.39.151"
}
```

```bash
# 可使用的环境变量 HTTP_PROXY,HTTPS_PROXY,NO_PROXY
export NO_PROXY=localhost,example.com

SUPER_PROXY=servercountry-cn.zproxy.luminati.io:22225
PROXY_USER=username:password
curl -v --proxy $SUPER_PROXY --proxy-user $PROXY_USER "http://lumtest.com/myip.json" | jq
# 对所有协议都使用同样的代理
http --proxy all:$PROXY_USER@$SUPER_PROXY http://lumtest.com/myip.json

# Super Proxy
# 默认会返回最快的, 每次返回的可能不一样, 但是在中国还是建议使用单个国家的
dig zproxy.luminati.io
# 单个国家
# servercountry-{country}.zproxy.luminati.io
dig servercountry-cn.zproxy.luminati.io
# 刷新
# customer-{customer-id}-session-{session-id}.zproxy.luminati.io
# 该操作可结合 servercountry-{country} 使用
# customer-{customer-id}-session-{session-id}-servercountry-{country}.zproxy.luminati.io

# 如果要保证每次都是使用同样的 IP, 则可以在启动时生成代理名, 如果想要更换 IP 了, 则从新生成
# lum-customer-{customer-id}-zone-{zone-id}-session-{session-id}
# DNS 有 SP 解析缓存
# -dns-local
# DNS 由 PP 解析, 可确保得到在指定国家解析获取到的地址
# -dns-remote
# 指定国家
# -country-{country-code}
# 指定城市
# -country-us-city-losangeles
# 指定 ASN
# http://bgp.potaroo.net/cidr/autnums.html
# https://www.quaxio.com/bgp/
# https://en.wikipedia.org/wiki/Autonomous_system_(Internet)
# 4812 CHINANET-SH-AP China Telecom (Group), CN
# -asn-4812
# 移动设备 IP
# -mobile-true, -mobile
# -mobile-false
```
