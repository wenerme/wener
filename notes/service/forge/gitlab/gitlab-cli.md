---
tags:
  - CLI
---

# Gitlab CLI

- [gitlab-org/cli](https://gitlab.com/gitlab-org/cli)
- 参考
  - 以前是 [profclems/glab](https://github.com/profclems/glab)

```bash
brew install glab # macOS
apk add glab      # Alpine

glab --version

# Auth
glab auth status
glab auth login
glab auth login --hostname gitlab.com
GITLAB_HOST=gitlab.com glab auth login

# login via stdin
# api, write_repository
# https://gitlab.com/-/profile/personal_access_tokens
echo "YOUR_GITLAB_TOKEN" | glab auth login --stdin
glab auth login --token GITLAB_TOKEN --hostname gitlab.com

# Repository Status Check
glab repo view
glab ci status
glab issue list --assignee me
glab mr list --assignee me
glab release list

# Token Management
# glab token rotate <token-name|token-id> [flags]
glab token rotate --user @me --duration 168h my-personal-token # Rotate personal token, extend 7 days
glab token rotate my-project-token                             # Rotate project token
glab token rotate --group my-group my-group-token              # Rotate group token

# Commands
# glab mr list|create|view|checkout|approve [id]
# glab issue list|create|view [id]
# glab ci list|view|retry|trace [branch|id]
# glab repo clone|view|fork [path]
```

| 变量                     | 说明                                                            |
| :----------------------- | :-------------------------------------------------------------- |
| `GITLAB_HOST`, `GL_HOST` | 默认 GitLab 实例地址（如 `https://gitlab.example.com`）         |
| `GITLAB_TOKEN`           | GitLab 个人访问令牌，用于非交互认证（如脚本、CI 使用）          |
| `EDITOR`, `VISUAL`       | 撰写描述等时用的命令行编辑器（如 `vim`, `nano`, `code --wait`） |
| `BROWSER`                | 打开链接用的网页浏览器                                          |
| `DEBUG`                  | 设为 `true` 显示调试日志                                        |
| `NO_PROMPT`              | 设为 `true` 禁用全部交互提示                                    |
| `GLAB_CONFIG_DIR`        | 配置文件目录，覆盖默认 `~/.config/glab-cli`                     |

- Default Config Dir: `~/.config/glab-cli`
- Config File: `~/.config/glab-cli/config.yml`

```yaml
# Git protocol ssh, https
git_protocol: ssh
editor:
browser:
# Markdown theme dark, light, notty https://github.com/charmbracelet/glamour#styles
glamour_style: dark
check_update: false
last_update_check_timestamp: 2025-10-29T19:19:19+08:00
# FORCE_HYPERLINKS=1
display_hyperlinks: false
host: gitlab.com
no_prompt: false
telemetry: false
hosts:
  gitlab.com:
    api_protocol: https
    api_host: gitlab.com
    token:
```
