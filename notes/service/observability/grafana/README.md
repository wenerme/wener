---
title: Grafana
---

# Grafana

- 要求
  - 255 MB，1 CPU
  - 数据库
    - SQLite
    - MySQL
    - PostgreSQL
- [插件列表](https://grafana.com/grafana/plugins)
- 支持授权方式
  - basic、generic oauth、anonymous、azuread、github、gitlab、google、grafana_com、grafananet、ldap、okta、proxy、saml
- 企业版
  - 数据源权限
  - 报表
  - SAML
  - 增强 LDAP
  - 团队同步 - LDAP, GitHub OAuth, Auth Proxy, Okta - Grafana 作为 IdP
  - White labeling
  - 使用统计
  - 面板热门排序
  - 查找未使用面板
  - 企业插件 - Oracle、Splunk、Service Now、Dynatrace、DataDog、AppDynamics

:::caution

- Grafana 8.0 2021年4月20日 Apache-2.0 -> AGPLv3
  - [Grafana, Loki, and Tempo relicensed to AGPLv3](https://grafana.com/blog/2021/04/20/grafana-loki-tempo-relicensing-to-agplv3/)
- Conditional formatting [#11418](https://github.com/grafana/grafana/issues/11418)
- Legend 无法格式化，使用 prometheus 可以修改 label
  - `label_replace(my_vector, "short_hostname", "$1", "hostname", "(.*):.*")`
  - `label_replace(up{instance=~"$instance"}, "instance_ip", "$2", "instance", "(192[.]168[.])?([0-9.+]+|.*).*")`
- 无法隐藏 Table 的 Filter for value [#11170](https://github.com/grafana/grafana/issues/11170)
- OAuth 无法关联 org
- LDAP 可能是唯一多租户登陆方便的方式 - 或者每个租户部署一个
- Dashboard Value Mapping 不支持文本匹配

:::

```bash
brew install grafana

# 手动安装
wget https://dl.grafana.com/oss/release/grafana-7.1.1.darwin-amd64.tar.gz
tar -zxvf grafana-7.1.1.darwin-amd64.tar.gz

# docker
# https://grafana.com/docs/grafana/latest/installation/docker/
# 插件
# -e "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource"
# 可指定版本
# -e "GF_INSTALL_PLUGINS=grafana-clock-panel 1.0.1,grafana-simple-json-datasource 1.3.5"
# 自定义来源
# -e "GF_INSTALL_PLUGINS=http://plugin-domain.com/my-custom-plugin.zip;custom-plugin"
# 默认配置 /usr/share/grafana/conf/defaults.ini /etc/grafana/grafana.ini
# default.paths.data=/var/lib/grafana
# default.paths.logs=/var/log/grafana
# default.paths.plugins=/var/lib/grafana/plugins
# default.paths.provisioning=/etc/grafana/provisioning
# default.log.mode=console
docker run --rm -it -e TZ=Asia/Shanghai \
  -p 3000:3000 \
  -v $PWD/data:/var/lib/grafana \
  --name=grafana grafana/grafana

# 默认服务端配置
grafana-server \
  --config=/opt/grafana/grafana.ini \
  --homepath /usr/local/share/grafana \
  --packaging=brew cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=/usr/local/var/lib/grafana/plugins

# 启动服务
brew services start grafana

code /opt/grafana/grafana.ini
grafana-server --config /opt/grafana/grafana.ini --homepath /usr/local/share/grafana --packaging=brew
```

**基本配置**

```ini
[path]
data = /opt/grafana
logs = /opt/grafana
plugins = /usr/local/var/lib/grafana/plugins

[server]
http_port = 3030

[database]
type=sqlite3

[remote_cache]

[analytics]
# 关闭 telemetry
reporting_enabled = false
```

## FAQ

## reset password

```bash
grafana cli admin reset-admin-password $NEW_PASSWORD
```
