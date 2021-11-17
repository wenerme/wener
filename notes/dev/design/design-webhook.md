---
title: Webhook 设计
---

# Webhook 设计

- 一般 POST + 头
- 头包含 事件+Key
- 也有通过 query 传递 key 的
- key 一般为一个 UUID
- 参考
  - [go-playground/webhooks](https://github.com/go-playground/webhooks)

```
X-Gitlab-Token:
X-Gitlab-Event:

# hmac
X-Hub-Signature:
X-GitHub-Event:

# bitbucket
X-Hook-UUID
X-Event-Key
# bitbucket server
X-Hub-Signature
```
