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
  - [octokit/webhooks.js](https://github.com/octokit/webhooks.js)

:::caution

- Gitlab 群组 webhook 是收费的

:::

```yaml
# Gitlab
# ==========================
X-Gitlab-Token:
X-Gitlab-Event:

# hmac
X-Hub-Signature:
X-GitHub-Event:

# bitbucket
# ==========================
X-Hook-UUID:
X-Event-Key:
# bitbucket server
X-Hub-Signature:

# Gitee
# ==========================
User-Agent: git-oschina-hook
# true/false - true 不需要处理
X-Gitee-Ping: true
# Merge Request Hook
X-Gitee-Event: Push Hook
X-Git-Oschina-Event: Push Hook
# uuid
X-Request-ID: 00000000000000000000000000000000
X-Gitee-Timestamp: 1675844156127
# 配置的密码或签名 - 同 payload 里的 password
X-Gitee-Token:

# Gitea
# ==========================
X-Gitea-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473
X-Gitea-Event: push
X-GitHub-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473
X-GitHub-Event: push
X-Gogs-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473
X-Gogs-Event: push
Authorization:
```

## 参考

- [Docker Hub Automated Build webhook](https://docs.docker.com/docker-hub/webhooks/)
  - Docker Trusted Registry webhook
    - https://docs.docker.com/ee/dtr/user/create-and-manage-webhooks/
- [Github](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
- [Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)
- [Gitea](https://docs.gitea.io/en-us/webhooks/)
- [Gitee](https://gitee.com/help/categories/40)
- [coding.net](https://coding.net/help/docs/project-settings/open/webhook.html)
