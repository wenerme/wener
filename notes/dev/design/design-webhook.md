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

- https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads

## coding

- https://coding.net/help/docs/project-settings/service-hook/intro.html

```
212.129.144.0/24
212.64.105.0/24
49.234.127.0/24
49.235.224.0/24
49.234.65.0/24
81.69.101.0/24
```

| code                                 | for                       |
| ------------------------------------ | ------------------------- |
| ITERATION_CREATED                    | 创建迭代                  |
| ITERATION_DELETED                    | 删除迭代                  |
| ITERATION_UPDATED                    | 更新迭代                  |
| ITERATION_PLANNED                    | 规划迭代                  |
| ISSUE_CREATED                        | 创建事项                  |
| ISSUE_DELETED                        | 删除事项                  |
| ISSUE_STATUS_UPDATED                 | 状态变更                  |
| ISSUE_ASSIGNEE_CHANGED               | 分配处理人                |
| ISSUE_ITERATION_CHANGED              | 规划迭代                  |
| ISSUE_RELATIONSHIP_CHANGED           | 关联关系变更              |
| ISSUE_UPDATED                        | 更新事项信息              |
| ISSUE_COMMENT_CREATED                | 增加评论                  |
| ISSUE_HOUR_RECORD_UPDATED            | 更新工时信息              |
| GIT_MR_CREATED                       | 合并请求创建              |
| GIT_MR_UPDATED                       | 合并请求更新              |
| GIT_MR_MERGED                        | 合并请求合并              |
| GIT_MR_CLOSED                        | 合并请求关闭              |
| GIT_MR_NOTE                          | 合并请求评论              |
| GIT_PUSHED                           | 代码推送                  |
| CI_JOB_CREATED                       | 创建构建计划              |
| CI_JOB_UPDATED                       | 修改构建计划              |
| CI_JOB_DELETED                       | 删除构建计划              |
| CI_JOB_STARTED                       | 启动构建计划              |
| CI_JOB_FINISHED                      | 构建计划执行结束          |
| ARTIFACTS_VERSION_CREATED            | 推送制品                  |
| ARTIFACTS_VERSION_UPDATED            | 更新制品                  |
| ARTIFACTS_VERSION_DOWNLOADED         | 下载制品                  |
| ARTIFACTS_VERSION_DELETED            | 删除制品                  |
| ARTIFACTS_VERSION_RELEASED           | 发布制品                  |
| ARTIFACTS_VERSION_DOWNLOAD_FORBIDDEN | 禁止下载制品              |
| ARTIFACTS_VERSION_DOWNLOAD_ALLOWED   | 恢复下载制品              |
| ARTIFACTS_VERSION_DOWNLOAD_BLOCKED   | 下载制品阻断              |
| ARTIFACTS_REPO_CREATED               | 创建制品仓库              |
| ARTIFACTS_REPO_UPDATED               | 更新制品仓库配置          |
| ARTIFACTS_REPO_DELETED               | 删除制品仓库              |
| WIKI_CREATED                         | 文档新建                  |
| WIKI_UPDATED                         | 文档更新                  |
| WIKI_MOVED                           | 文档移动                  |
| WIKI_SHARE_UPDATED                   | 文档更改分享状态          |
| WIKI_ACCESS_UPDATED                  | 文档更改访问设置          |
| WIKI_COPIED                          | 文档 / 文档树复制         |
| WIKI_MOVED_TO_RECYCLE_BIN            | 文档移动到回收站          |
| WIKI_RESTORED_FROM_RECYCLE_BIN       | 文档从回收站恢复          |
| WIKI_DELETED                         | 文档彻底删除              |
| FILE_CREATED                         | 文件新建                  |
| FILE_UPDATED                         | 文件更新                  |
| FILE_RENAMED                         | 文件重命名                |
| FILE_SHARE_UPDATED                   | 文件更改分享状态          |
| FILE_MOVED                           | 文件 / 文件夹移动         |
| FILE_COPIED                          | 文件 / 文件夹复制         |
| FILE_MOVED_TO_RECYCLE_BIN            | 文件 / 文件夹移动到回收站 |
| FILE_RESTORED_FROM_RECYCLE_BIN       | 文件 / 文件夹从回收站恢复 |
| FILE_DELETED                         | 文件 / 文件夹彻底删除     |
| WIKI_DELETED                         | 添加项目成员              |
| MEMBER_DELETED                       | 移除项目成员              |
| MEMBER_ROLE_UPDATED                  | 更新项目成员用户组        |

| header                       | for                                  |
| ---------------------------- | ------------------------------------ |
| X-Coding-Service-Hook-Event  | 事件标识                             |
| X-Coding-Service-Hook-Id     | Service Hook 编号                    |
| X-Coding-Service-Hook-Action | 发送行为，如：wecom_group_chat_robot |
| X-Coding-Delivery            | 发送送达编号                         |

## 参考

- [Docker Hub Automated Build webhook](https://docs.docker.com/docker-hub/webhooks/)
  - Docker Trusted Registry webhook
    - https://docs.docker.com/ee/dtr/user/create-and-manage-webhooks/
- [Github](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
- [Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)
- [Gitea](https://docs.gitea.io/en-us/webhooks/)
- [Gitee](https://gitee.com/help/categories/40)
- [coding.net](https://coding.net/help/docs/project-settings/open/webhook.html)
