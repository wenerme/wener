---
title: Git FAQ
tags:
  - FAQ
---

# Git FAQ

## 修正用户名 {#amend-author}

```bash
git commit --amend --author="Author Name <email@address.com>"
```

## 设置当前用户信息

> 提交时的 commitor

```bash
# 确认当前用户信息
git config --global user.name
git config --global user.email

# 如果不正确可以修改
git config --global user.name "Author Name"
git config --global user.email "email@address.com"
```

- --local 针对当前仓库修改

## git+ssh proxy

- 默认支持 http_proxy 和 https_proxy
- 使用 git+ssh 代理需要额外配置

```txt title="$HOME/.ssh/config"
Host github.com
    ProxyCommand socat - PROXY:your.proxy.ip:%h:%p,proxyport=1080,proxyauth=user:pwd
```

- 替换 your.proxy.ip
- 替换 1080
- 无认证可删除 proxyauth

## 获取仓库目录

```bash
git rev-parse --show-toplevel
```

## 子模块初始化

```bash
git pull --recurse-submodules
# 或者递归拉取
git clone --recursive <URL>
```

## 统计

- https://github.com/arzzen/git-quick-stats

```bash
# 统计所有分支的用户提交数
git shortlog -s -n --all --no-merges

# 统计 LOC
git ls-files | xargs -n1 git blame --line-porcelain | sed -n 's/^author //p' | sort -f | uniq -ic | sort -nr
```

## 移除历史文件和敏感数据

- [Removing sensitive data from a repository](https://help.github.com/articles/removing-sensitive-data-from-a-repository/)
- https://rtyley.github.io/bfg-repo-cleaner/

```bash
# BFG
# 比 git-filter-branch 快 10 - 720x
brew install bfg

# 在删除前先做一次把文件删除的提交
git rm id_{dsa,rsa}
git commit -m 'remove files'
# 清理历史
bfg --delete-files id_{dsa,rsa} my-repo.git
bfg --strip-blobs-bigger-than 50M my-repo.git
bfg --delete-folders dirname my-repo.git

# 清理
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

## 文件太大

如果服务器限制了文件大小, 则当推送一个较大的仓库时会失败, 如果无法修改服务器参数, 则可以考虑分批推送

```bash
# 获取总得有多少个提交
gut log --pretty=format:"%h" | wc -l
# 获取第一千个提交
git log --reverse --pretty=format:"%h" | sed '1000!d'
# 推送前一千个提交
git push origin $(git log --reverse --pretty=format:"%h" | sed '1000!d'):master
# 如果出现该错误
# The destination refspec neither matches an existing ref on the remote nor
# begins with refs/, and we are unable to guess a prefix based on the source ref.
# 则使用
git push origin $(git log --reverse --pretty=format:"%h" | sed '1000!d'):refs/heads/master
```

## 自定义配置

- 配置定义 [git-config](https://git-scm.com/docs/git-config)
- 配置参考 [pksunkara/.gitconfig](https://gist.github.com/pksunkara/988716)

Git 不允许直接引用仓库中的文件作为配置, 但可以通过修改本地配置来 include 仓库中的配置文件.

```bash
# 创建仓库中共享的配置
touch .gitconfig
# 修改 .git/config 来引入仓库中的 .gitconfig, 这个命令会添加一下内容到配置文件中
# [include]
#  path = ../.gitconfig
git config --local include.path ../.gitconfig
```

## 将另外一个仓库合并为当前仓库的一个子目录

```bash
git subtree add -P <prefix> <repo> <rev>
```

## Undo a commit and redo

```bash
git commit ...
git reset --soft 'HEAD^'
edit
git add ....
git commit -c ORIG_HEAD
```

from [here](http://stackoverflow.com/questions/927358)

## 显示 不同

```bash
git diff \
  --cached \
  --staged \
  HEAD # 尚未暂存的,当前正在编辑的
```

from [here](http://stackoverflow.com/questions/1587846)

## 移除 git 历史

```bash
# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp
```

## git push tags

```bash
git push --tags
# 只 push 一个
git push origin <tag_name>
```

## git clone tag

```bash
git clone --branch <tag_name> <repo_url>
```

## 生成 patch

```bash
# git diff --cached
git diff > my.patch
```

## 检测是否发生变化

## 认证缓存

- https://stackoverflow.com/questions/5343068

```bash
# 默认 15m
git config --global credential.helper "cache --timeout=3600"

# macOS 可以使用 keychain
# git config --global credential.helper osxkeychain

# 或者 ~/.netrc
# machine <hostname> login <username> password <password>
chmod 600 ~/.netrc
```

## 强制 pull

```bash
git fetch --all
git reset --hard origin/master
```

## 部分克隆转完整克隆

```bash
git fetch --unshallow
```

## signoff

```bash
git commit --amend --no-edit --signoff
git push --force-with-lease origin $(git rev-parse --abbrev-ref HEAD)
```

## 为什么需要 signoff

signoff 是在 commit 消息最后添加一行表示提交作者。

```bash
Signed-off-by: wener <wener@wener.me>
```

用于跟踪谁的提交，如果 review 时做了修改，也可以继续暴力 signoff 以跟踪原始提交人。

- 最初是因为避免法律纠纷引入
  - [developer certificate](https://developercertificate.org/)
    - 明确 sign-off 身份
  - [What is the Sign Off feature in Git for?](https://stackoverflow.com/a/1962112/1870054)

## 迁移子目录为仓库

- [Detach (move) subdirectory into separate Git repository](https://stackoverflow.com/questions/359424)

```bash
# git filter-branch --prune-empty --subdirectory-filter FOLDER-NAME  BRANCH-NAME

git subtree split -P <name-of-folder> -b <name-of-new-branch>
```

## 迁移分支为仓库

```bash
mkdir /path/to/new/repo && cd "$@"
git config receive.denyCurrentBranch warn
cd -
git push /path/to/new/repo:optional-new-branch-name branch-name
```

from [Here](http://stackoverflow.com/a/2227571/1870054)

## 取第一个 commit

```bash
git rev-list --max-parents=0 HEAD
```

## 搜索文件

```bash
git log --all -- '*.wmv'
# 只显示 hash
git rev-list --all -- '*.wmv'
```

## ci env var

| env                     | form                        |
| ----------------------- | --------------------------- |
| CI_COMMIT_BRANCH        | `git branch --show-current` |
| CI_COMMIT_MESSAGE       |
| CI_COMMIT_DESCRIPTION   |
| CI_COMMIT_AUTHOR        |
| CI_COMMIT_TAG           |
| CI_COMMIT_TAG_MESSAGE   |
| CI_COMMIT_SHA           |
| CI_COMMIT_SHORT_SHA     |
| CI_COMMIT_REF_SLUG      |
| CI_COMMIT_REF_PROTECTED |
| CI_COMMIT_REF_NAME      |
| CI_DEFAULT_BRANCH       |
| CI_COMMIT_TITLE         |
| CI_COMMIT_TIMESTAMP     |

```bash
# 获取 tag 的方式
git describe --tags
git describe --exact-match --tags $(git log -n1 --pretty='%h')
git tag --points-at HEAD
git describe --tags --abbrev=0
```

- https://docs.gitlab.com/ee/ci/variables/predefined_variables.html

## skip ci

- 一般都支持 message 包含 `[ci skip]`, `[skip ci]`
- git 2.10 支持选项 git push -o ci.skip
- 参考
  - gitlab [Push Options](https://docs.gitlab.com/ee/user/project/push_options.html#push-options-for-gitlab-cicd)
  - jetbrain 暂不支持 git option [IDEA-202210](https://youtrack.jetbrains.com/issue/IDEA-202210)
  - [git push -o](https://git-scm.com/docs/git-push#Documentation/git-push.txt--oltoptiongt)

```bash
git push -o ci.skip
git push -o ci.variable="MAX_RETRIES=10" -o ci.variable="MAX_TIME=600"
```

## git ci info

- https://docs.gitlab.com/ee/ci/variables/predefined_variables.html

```bash
# 最近 tag + rev
# v1.0-COMMIT_COUNT-COMMIT_ID
git describe --tags
# 最近 tag
# v1.0
git describe --tags --abbrev=0
# most recent annotated tag
git describe --abbrev=0
# 当前 tag
git tag --points-at HEAD
# 7 位 commitid
git rev-parse --short HEAD
```

## annotated tag vs. unannotated tag

- `git tag <tagname>`
  - 无 -a -s -m
  - 无消息
- `git tag -a <tagname> -m '<message>'`
  - 包含 tagger/auther, date 信息
  - 包含 message

## svn export

```bash
git archive master | tar -x -C /somewhere/else
git archive --format zip --output /full/path/to/zipfile.zip master

svn export https://github.com/username/repo-name/trunk/
svn export https://github.com/username/repo-name/trunk/src/lib/folder

git checkout-index --prefix=git-export-dir/ -af
```

## 大型 monorepo

- FSMonitor

```bash
git config core.fsmonitor true
git config core.untrackedcache true

git status # 第一次慢
git status # 第二次命中大量缓存，非常快
```

## master to main

```bash
git branch -m master main

# owner
git push -u origin main
git push origin --delete master

# user
git fetch origin main
git branch --unset-upstream
git branch -u origin/main

# 或修改 .git/config fetch
```

## fetch remote branch

```bash
git fetch origin 3.16-stable:3.16-stable
git switch 3.16-stable
```

## user.signingkey

```bash
# GPG
gpg --list-secret-keys --keyid-format=long
git config --global user.signingkey KEY
git config --global user.signingkey SUBKEY!

# SSH - Git 2.34+
git config --global gpg.format ssh
git config --global user.signingkey "$(cat ~/.ssh/id_ed25519.pub)"
# ssh-agent 如果没有则会出现 Load key git_signing_key invalid format
# ssh-add ~/.ssh/id_ed25519

# X.509
git config --global gpg.x509.program smimesign
git config --global gpg.format x509
smimesign --list-keys
git config --global user.signingkey KEY

# 提交自动签名
git config --global commit.gpgsign true
```

## git Load key git_signing_key invalid format

先执行 ssh-add

```
unsupported value for gpg.format: ssh
```

## fatal: detected dubious ownership in repository

目录权限不为当前 user

```bash
# 报错
git status

# 1. 修改 owner 可解决
chown -R $(id -u):$(id -g) $PWD
# 2. 允许单个目录
git config --global --add safe.directory $PWD
# 3. 忽略 - 允许所有
git config --global --add safe.directory '*'
```

- https://github.com/git/git/commit/8959555cee7ec045958f9b6dd62e541affb7e7d9
- https://github.com/actions/runner/issues/2033

## 如何在仓库里存储明文密钥

1. 非 git 相关方案

- sops
  - 字段维度
  - argocd vault plugin 支持
  - 支持很多后端，可以用 age
- age - 比 gpg 简单，功能单一
  - 文件维度
  - 可以用 ssh key
  - 不支持 ssh agent - 可以为 gitops 的应用创建无密码 key
- sealed-secrets - 没有解决存储明文的问题，解决了密钥放到 kube 的问题

1. git 相关方案

- git-secret
- git-crypt
- blackbox

1. 外部服务方案 - KMS, Vaulr

- 维护额外进程
- 不方便自动化 - 涉及人工配置
- 还是需要解决 SSOT - Single Source Of Truth 问题

## merge branch without checkout

**develop -> main**

```bash
git push . develop:main
```
