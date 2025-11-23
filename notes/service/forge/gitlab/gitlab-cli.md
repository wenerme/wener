---
tags:
  - CLI
---

# Gitlab CLI

- [gitlab-org/cli](https://gitlab.com/gitlab-org/cli)

```bash
glab auth login
glab auth login --hostname gitlab.com
GITLAB_HOST=gitlab.com glab auth login

# --stdin
glab auth login --token GITLAB_TOKEN --hostname gitlab.com

# glab mr list|create|view|checkout|approve [id]
# glab issue list|create|view [id]
# glab ci list|view|retry|trace [branch|id]
# glab repo clone|view|fork [path]
```

| env                      | Description                        |
| ------------------------ | ---------------------------------- |
| `GITLAB_HOST`, `GL_HOST` |
| `GITLAB_TOKEN`           | Personal Access Token              |
| `EDITOR`, `VISUAL`       | e.g., `vim`, `nano`, `code --wait` |
| `BROWSER`                |
| `DEBUG`                  | 详细日志                           |
| `NO_PROMPT`              | 禁用所有交互式提示                 |
| `GLAB_CONFIG_DIR`        |

- GLAB_CONFIG_DIR=~/.config/glab-cli`
- ~/.config/glab-cli/config.yml
