---
title: 企业微信
---

# 企业微信

- 应用类型
  - 基础应用 - 内置
  - 第三方应用
  - 自建应用
  - 硬件开发
  - 服务商
  - [会话存档](./wecom-archive.md)
- 参考
  - [开发文档](https://work.weixin.qq.com/api/doc/)
    - [全局错误码](https://work.weixin.qq.com/api/doc/90001/90148/90455)
  - [Keycloak 集成](https://www.kkzxak47.com/2019/07/30/使用企业微信登录keycloak/)
  - [企业微信开发指南](https://zhuanlan.zhihu.com/p/36320213)

:::caution

- 企业微信会话存档保存最长为 90 天
- 成员
  - ID - 1-64 `[_-@.a-zA-Z0-9]{1,64}`
    - 唯一检查忽略大小写
  - 名称/别名 1-64 utf8 字符
  - 职位、地址 0-128
  - 性别 1表示男性，2表示女性
  - 所属部门最多 100 个
- 部门
  - 跟部门 1
  - ID int32
  - 名称 - 1-64 utf8 字符, 不包含 `\:*?"<>｜`
  - 最大层级 15 层
  - 总数最多 3 万个
  - 部门下下节点最多 3 万个
- 标签
  - 关联应用，是应用维度维护
  - 成员修改需要使用对应应用来进行操作

:::

:::caution

- access_token 是全局的，不能返回到前端
- 授权认证时的 code 只是使用 access_token 去 **校验** 而不是为用户换取属于用户的 access_token
- 默认 scope 为 snsapi_base

:::

:::caution 获取企业信息

- **创建** 成员/部门
  - 使用 `通讯录同步`, `第三方通讯录应用` 操作
- **获取** 成员/部门 ID
  - 使用 `企业管理后台 - 管理工具 - 通讯录同步` 应用进行获取, 能批量获取
  - /cgi-bin/user/list_id
  - /cgi-bin/department/simplelist
- 成员详情 - 用户名
  - **不能** 使用 `通讯录同步` 应用获取
  - 使用 `自建应用`, `服务商代开发应用`, `第三方应用`, `第三方通讯录应用`
  - 读取成员 /cgi-bin/user/get
  - 获取部门成员 /cgi-bin/user/simplelist
  - 获取部门成员详情 /cgi-bin/user/list
  - 获取部门列表 /cgi-bin/department/list
- 成员详情 - 头像、性别、手机、邮箱、企业邮箱、员工个人二维码、地址
  - oauth2 手工授权
- 客户
  - 配置 客户联系 可调用应用

:::

## 授权

- 非标准 OAuth2
- access_token 是全局
  - 默认 7200s
- 换 token 需要 appid 和 agentid
- code 只能用一次

### 网页授权

```title="跳转授权"
https://open.weixin.qq.com/connect/oauth2/authorize?
  appid=wx10101&
  response_type=code&
  scope=snsapi_base&
  redirect_uri=https%3A%2F%2Ftest.example.com%3A3000%2Fapi%2Fmyredirect
  #wechat_redirect
```

```title="换取 Token"
https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?
  access_token=ACCESS_TOKEN&
  code=CODE
```

### Web 扫码授权登录

```title="跳转授权"
https://open.work.weixin.qq.com/wwopen/sso/qrConnect?
  appid=wx10101&
  agentid=1000000&
  redirect_uri=https%3A%2F%2Ftest.example.com%3A3000%2Fapi%2Fmyredirect
```

```title="换取 Token"
https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?
  access_token=ACCESS_TOKEN&
  code=CODE
```

# FAQ

## redirect_uri 与配置的授权完成回调域名不一致

配置 Web 授权回调域名
