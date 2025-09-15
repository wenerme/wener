---
title: 腾讯云
---

# 腾讯云

| abbr.  | stand for                                | meaning  | notes |
| ------ | ---------------------------------------- | -------- | ----- |
| TKE    | Tencent Kubernetes Engine                |
| CLS    | Cloud Log Service                        |
|        | Ad-hoc analysis                          | 即席分析 |
| COS    | Cloud Object Storage                     |
| TCADP  | Tencent Cloud Agent Development Platform |
| CKafka | Cloud Kafka                              |
| DLC    | Data Lake Compute                        |

- tccli
- SDK https://cloud.tencent.com/document/sdk
- https://tencent-cloud.com/
  - 国际
- `<Region>.cls.tencentyun.com`

## API

| 参数名称         | 类型    | 必须 | 描述                                                                                                    |
| :--------------- | :------ | :--- | :------------------------------------------------------------------------------------------------------ |
| `X-TC-Action`    | String  | 是   | 接口名称，例如 `DescribeInstances`。                                                                    |
| `X-TC-Region`    | String  | 是   | 地域参数，标识数据所属地域。部分 API 无需此参数。                                                       |
| `X-TC-Timestamp` | Integer | 是   | 当前 UNIX 时间戳，与服务器时间相差超过5分钟可能导致签名过期错误。                                       |
| `X-TC-Version`   | String  | 是   | API 版本号，例如 CVM 的版本为 `2017-03-12`。                                                            |
| `Authorization`  | String  | 是   | HTTP 认证请求头，包含签名信息。格式：`TC3-HMAC-SHA256 Credential=..., SignedHeaders=..., Signature=...` |
| `X-TC-Token`     | String  | 否   | 临时证书所用的 Token，需与临时密钥一起使用。长期密钥无需此参数。                                        |

- Signature Algorithm v1
- https://www.tencentcloud.com/zh/document/api/1108/45843
- `<name>.tencentcloudcr.com`
  - Registry

# FAQ

- 金融云
  - https://cloud.tencent.com/document/product/304/2766
