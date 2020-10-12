# Domain

## Tips

- [List of Internet top-level domains](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)
- [List of Top-Level Domains](https://www.icann.org/resources/pages/tlds-2012-02-25-en)
  - [tlds-alpha-by-domain.txt](http://data.iana.org/TLD/tlds-alpha-by-domain.txt)
- [google/nomulus](https://github.com/google/nomulus/)
  - Google tld 管理服务
- TLD
  - [registry.google](https://registry.google)
- 推荐 TLD
  - .app
    - Google 所有
    - 目前处于保留阶段, 尚未开发注册
  - .how
  - .name
  - .me
  - .ws
    - Web Service
- 参考
  - [It's official: .corp, .home, .mail will never be top-level domains on the 'net](https://forums.theregister.com/forum/all/2018/02/12/icann_corp_home_mail_gtlds/)
- 注意
  - [er](http://www.iana.org/domains/root/db/er.html) TLD 目前无法注册，但是有
    - https://www.101domain.com/er.htm
  - [.internal](https://tools.ietf.org/html/draft-wkumari-dnsop-internal-00)

domains.google
Google Domains 定价和支持的 TLD
https://support.google.com/domains/answer/6010092

## 本地域名

- [Private DNS Namespaces](https://tools.ietf.org/html/rfc6762#appendix-G)

| TLD        | RFC     | desc                     |
| ---------- | ------- | ------------------------ |
| .internal  | rfc6762 | 内部                     |
| .intranet  | rfc6762 | 内网                     |
| .lan       | rfc6762 | 本地局域网               |
| .corp      | rfc6762 | 企业内部                 |
| .home      | rfc6762 | 家庭                     |
| .private   | rfc6762 | 私有                     |
| .test      |         | 测试使用，不会被注册     |
| .example   |         | 示例站点                 |
| .invalid   |         | 无效域名示例             |
| .localhost |         | 本机                     |
| .local     |         | 本地, LAN, mDNS 发现域名 |
| .mail      |         | 邮件                     |

## 组织性域名

| TLD     | desc                            |
| ------- | ------------------------------- |
| .com    | 商业                            |
| .net    | 类似 .com ， 可区分用于内部系统 |
| .org    | 组织                            |
| .edu    | 教育                            |
| .cn     | 中国                            |
| .google | Google                          |

## 开发相关性域名

| TLD       | desc                  |
| --------- | --------------------- |
| .dev      | 开发站点，必须 HTTPS  |
| .app      | 应用                  |
| .me       | 个人站点              |
| .io       | 技术性项目、产品站点  |
| .rest     | RESTful               |
| .services | 服务                  |
| .ws       | WebService、WebSocket |
| .it       | IT                    |
