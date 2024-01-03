---
title: 支付宝 云
---

# 支付宝 云

- AMPE - Alipay Mini-Program Engine - 支付宝小程序引擎
- https://run.cloud.alipay.com/console
  - 支付宝 小程序云
- https://open.alipay.com/develop/manage
  - 支付宝 开放平台

```bash
APPID=1234
CLOUD_ID=
docker tag mysvr registry.cloudrun.cloudbaseapp.cn/cloudrun-$APPID-prod/mysvr:v1.0.0
```

- callContainer 调用服务

## 费用

| 服务   | 计费         |
| ------ | ------------ |
| CPU    | ¥ 0.052/核/h |
| 内存   | ¥ 0.03/G/h   |
| 持久卷 | ¥ 0.002/G/h  |
| 流量   | ¥ 0.08/G/h   |
| 构建   | ¥ 0.03/分钟  |

- 最低 0.25核心、0.5G ¥ 0.028/H
- https://opendocs.alipay.com/cloud/089gwy

## API

```bash
curl 'https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.open.mini.order.query&app_id=35970&sign_type=RSA2&sign=&version=1.0&charset=GBK&biz_content=AlipayOpenMiniOrderQueryQueryModel'
```

- `alipay.open.app.qrcode.create` -> `alipayOpenAppQrcodeCreate`

| conf                  | for                                   |
| --------------------- | ------------------------------------- |
| ServiceURL            | https://openapi.alipay.com/gateway.do |
| APPID                 |
| PRIVATE_KEY           |
| FORMAT                | JSON                                  |
| CHARSET               |
| ALIPAY_PUBLIC_KEY     |
| SIGN_TYPE             | RSA2                                  |
| app_cert_path         |
| alipay_cert_path      |
| alipay_root_cert_path |

---

- https://openapi.alipay.com/gateway.do
- https://opendocs.alipay.com/mini/03cf6d
- https://opendocs.alipay.com/cloud/089ca9
- https://opendocs.alipay.com/open-v3/065bsc
  - OpenAPI v3
  - https://github.com/alipay/alipay-sdk-java-all/blob/master/v3/api/openapi.yaml
- NPM @alipay/faas-server-sdk

### Sign

- 密钥
- 证书
  - 红包、转账到支付宝账户 必须使用证书加签
- https://opendocs.alipay.com/common/02mriz

## CPT

- CPT - CloudPiloT
  - 迁移和运维
- 全局设置 - 全局管理 - CPT密钥
- cloudbase 云开发
- cloudrun 云托管

```bash
# macOS
curl -LO https://public-hz.oss.cloudrun.cloudbaseapp.cn/cpt/darwin_amd64/cpt
chmod +x cpt
# xattr -d com.apple.quarantine cpt

# Linux
curl -LO https://public-hz.oss.cloudrun.cloudbaseapp.cn/cpt/linux_amd64/cpt

cpt login --appid $APPID --private_key $PRIVATE_KEY

# 持久化登录 Docker - 默认 8h
docker login registry.cloudrun.cloudbaseapp.cn --username cloudrun --password $(cpt cloudrun print-token --quiet)

cpt whoami # APP_ID

cpt cloudrun env list     # 环境列表
cpt cloudrun env list-eip # 获取对外请求的 IP - Egress IP

cpt cloudrun service list # 服务
# 部署
cpt cloudrun deploy --env prod --service server --image registry.cloudrun.cloudbaseapp.cn/cloudrun-$APP_ID-$APP_ENV/$APP_SERVIE:latest
```
