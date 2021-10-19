---
id: git
title: Git
---

# Git

## Tips

- 使用 alias 来简化操作
- 使用 IDE 集成的 git 工具
- 避免直接操作主分支
- 避免管理大的二进制文件
- 常提交,早提交,提交以工作任务为单位
- 为提交写上详细的注释
- 谨慎 PUSH
- 相关开发人员统一代码风格
- 使用自动补全
- 在切换分之前使用 stash
- 学会使用 Markdown
- 有问题问谷歌

```bash
# 直接通过 SSH 进行仓库推送
ssh user@host 'git init --bare /repo/my-project'
git push 'ssh://user@host/repo/my-project'
# 在远程使用该仓库
mkdir -p /src/my-project
git clone /repo/my-project /src/my-project


git fetch origin 15:15
git checkout 15
```

## Git 基本使用

使用时首先需要明确使用者身份,邮箱和姓名,例如我自己使用时

```bash
git config --global user.name=wener
git config --global user.email=wenermail@gmail.com
```

基本操作可参考 [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)



## 常用操作

## 分支操作

```bash
git branch --current-branch
git branch --set-upstream-to=origin/branch

git branch -av

# 查看分支引用关系
git rev-parse --abbrev-ref --symbolic-full-name 3.13-stable
git for-each-ref --format='%(upstream:short)' "$(git symbolic-ref -q HEAD)"

git remote show origin
# 修改当前
git branch --set-upstream-to=origin/branch
# 修改其他分支
git branch 3.14-stable --set-upstream-to=origin/branch
```

### 启动 git 服务

- http://git-scm.com/docs/git-daemon
- http://git-scm.com/docs/git-http-backend

```bash
mkdir eddies  # MAKE folder for repo
chown -R eddie:websrv eddies/  # ensure apache (webserver) can access it
cd eddies/
git --bare init --shared
ls
branches  config  description  HEAD  hooks  info  objects  refs
# 如果是已有的项目,可以这样启用 receivepack
git config --file config http.receivepack true
```

```bash
# 启动服务
git daemon --reuseaddr --base-path=. --export-all --verbose --enable=receive-pack
# receive-pack 会允许匿名的push 使用需谨慎
```

```bash
# 转换为 bare 仓库
cd repo
mv .git .. && rm -fr *
mv ../.git .
mv .git/* .
rmdir .git

git config --bool core.bare true # 这个很重要
cd ..; mv repo repo.git # renaming just for clarity

# 或者这样操作方便些
git clone --bare /path/to/repo

```

检出本地

```bash
git clone git://localhost/reponame
```

## 仓库信息

```bash
# 当前分支
git branch --show-current
# 当前 Commit
git rev-parse HEAD

# 最近 tag
git describe --tags --abbrev=0
# 当前 tag
git describe --tags --abbrev=0 --exact-match
# 如果没有当前 tag 则用 dev
git describe --tags --abbrev=0 --exact-match 2>/dev/null || echo dev

git describe --abbrev=0 --tags

git tag --points-at HEAD

# 所有 branch
git describe --tags `git rev-list --tags --max-count=1`

# Commit 时间
git log -1 --format=%cd --date=iso8601

# 生成当前时间
date --iso-8601=seconds

# 当前
# de9733b (HEAD -> master, origin/master, origin/HEAD) minor update
git show --oneline -s

# short hash
git rev-parse --short HEAD
#
git log -1 --pretty=format:%h
```

## Linux & Mac OS

在 Mac 和 Linux 均建议使用 Homebrew 来管理包,当 Homebrew 安装好后

```bash
# 安装 Git
brew install git
# 更新 Git 版本
brew update
brew upgrade git
```

## Windows

建议使用 [Cygwin](http://cygwin.org/)+[Cygwinports](http://cygwinports.org/) 来使用 Git, 避免自己编译或下载一个完整的 MingWin 包.

## Git for SVN

这里只讲解简单的与 SVN 互操作,更复杂的文档,可参考`git svn --help`

```bash
# Clone svn 地址
# 如果是标准 svn 库可使用 --stdlayout
git svn clone svn地址
# 忽略 svn 忽略的内容
git svn show-ignore >> .git/info/exclude
# 完成后能在 git 配置中看到相关信息
cat .git/config
# 当修改本地文件后,先本地提交,再提交到 svn
git add .
git commit -m "描述修改"
git svn dcommit
# 当 SVN 上有比本地更新的内容时,拉取新的内容
git svn rebase
```
