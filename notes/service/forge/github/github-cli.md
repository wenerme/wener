---
title: gh
tags:
  - CLI
---

# gh

- https://github.com/cli/cli
- https://cli.github.com/manual/examples

:::caution

尽量使用 PAT classic，以用户身份，fine-grained 限定 resource owner 不能同时支持操作多个组织。

:::

```bash
# in server auth by PAT
cat token.txt | gh auth login --with-token --skip-ssh-key --insecure-storage --git-protocol https

gh auth status

gh repo clone owner/repo
gh repo create <repo-name> --public
gh repo list <username> --limit 10

gh pr create --base main --head feature-branch --title "My PR title" --body "PR description"
gh pr list
gh pr checkout <pr-number>
gh pr merge <pr-number>

gh issue list
gh issue view <issue-number>

gh issue create --title "Issue title" --body "Issue body"
gh notification list

gh workflow list
gh workflow run <workflow-id or name>
```

## use gh as git credential helper

```bash
gh auth setup-git
```

```ini title="~/.gitconfig"
[credential "https://github.com"]
        helper =
        helper = !/usr/bin/gh auth git-credential
[credential "https://gist.github.com"]
        helper =
        helper = !/usr/bin/gh auth git-credential
```
