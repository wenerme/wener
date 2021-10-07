---
title: 词汇
---

# Auth Glossary

## IdP - Identity Provider

- 提供认证信息
  - 例如 用户可以使用账号密码登陆
- 实际存放用户信息

## IdM - Identity Management - 身份管理

- [Identity management](https://en.wikipedia.org/wiki/Identity_management)

## IdAM - IAM - Identity and Access Management - 身份访问管理

## SAML - Security Assertion Markup Language - 安全断言标记语言

- 支持认证和授权
- principal - 例如 终端用户
- service provider - 例如 网站，principal 尝试访问
- identity provider - 持有 principal 认证和授权信息的服务

## bearer token - 不记名令牌

bearer (who hold the access token) can access authorized resources without further identification

access token 为 bearer token

## id token - 身份令牌

contains Claims(claims are name/value pairs that contain information about a user) about the Authentication of an End-User by an Authorization Server
