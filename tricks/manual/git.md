---
slug: git
title: Git
---

# Git

## Tips
* 使用 alias 来简化操作
* 使用 IDE 集成的 git 工具
* 避免直接操作主分支
* 避免管理大的二进制文件
* 常提交,早提交,提交以工作任务为单位
* 为提交写上详细的注释
* 谨慎 PUSH
* 相关开发人员统一代码风格
* 使用自动补全
* 在切换分之前使用 stash
* 学会使用 Markdown
* 有问题问谷歌

# 参考
* [Pro Git（中文版）](http://git.oschina.net/progit/)
* [Git for beginners: The definitive practical guide](http://stackoverflow.com/questions/315911/)
* [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
* [git 与 svn 命令比较](http://git.or.cz/course/svn.html)
* [我的 .gitconfig](https://github.com/wenerme/dotfiles/blob/master/.gitconfig)


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

## gitflow
* [nvie/gitflow](https://github.com/nvie/gitflow)
* [petervanderdoes/gitflow-avh](https://github.com/petervanderdoes/gitflow-avh)
  * a collection of Git extensions to provide high-level repository operations for Vincent Driessen's branching model.
  * adds more functionality to the existing git-flow and several of the internal commands have been rewritten to speed up the software.
* [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model)
* [git-flow 工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)


```bash
brew install git-flow-avh
```

## FAQ

## 切换分支但不捡出文件

```bash
# 文件变为暂存状态
git symbolic-ref HEAD refs/heads/其他分支
# 可以取消暂存
git reset
```

## 修正用户名
```bash
git commit --amend --author="Author Name <email@address.com>"
```

## 修改当前仓库关联的用户

```bash
git config --local user.name "Author Name"
git config --local user.email "email@address.com"
```

### 子模块初始化

```bash
git pull --recurse-submodules
# 或者递归拉取
git clone --recursive <URL>
```

### 拉取远程分支

```bash
# 检出远程分支
git clone -b stable <URL>

# 或检出后
git fetch <remote> <rbranch>:<lbranch>
git checkout <lbranch>
```

### 统计
* https://github.com/arzzen/git-quick-stats

```bash
# 统计所有分支的用户提交数
git shortlog -s -n --all --no-merges

# 统计 LOC
git ls-files | xargs -n1 git blame --line-porcelain | sed -n 's/^author //p' | sort -f | uniq -ic | sort -nr
```

### 移除历史文件和敏感数据
* [Removing sensitive data from a repository](https://help.github.com/articles/removing-sensitive-data-from-a-repository/)
* https://rtyley.github.io/bfg-repo-cleaner/

```bash
# BFG
# 比 git-filter-branch 快 10 - 720x
brew install bfg

# 在删除前先做一次把文件删除的提交
bfg --delete-files id_{dsa,rsa}  my-repo.git
bfg --strip-blobs-bigger-than 50M  my-repo.git
bfg --delete-folders dirname  my-repo.git

# 清理
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### 文件太大
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

### 自定义配置
* 配置定义 [git-config](https://git-scm.com/docs/git-config)
* 配置参考
	* [pksunkara/.gitconfig](https://gist.github.com/pksunkara/988716)

Git 不允许直接引用仓库中的文件作为配置, 但可以通过修改本地配置来 include 仓库中的配置文件.

```bash
# 创建仓库中共享的配置
touch .gitconfig
# 修改 .git/config 来引入仓库中的 .gitconfig, 这个命令会添加一下内容到配置文件中
# [include]
#  path = ../.gitconfig
git config --local include.path ../.gitconfig
```

### 将另外一个仓库合并为当前仓库的一个子目录
```
git subtree add -P <prefix> <repo> <rev>
```

### Undo a commit and redo

```
git commit ...
git reset --soft 'HEAD^'
edit
git add ....
git commit -c ORIG_HEAD
```
from [here](http://stackoverflow.com/questions/927358)

### 显示 不同

```bash
git diff \
	--cached \
	--staged \
	HEAD # 尚未暂存的,当前正在编辑的
```
from [here](http://stackoverflow.com/questions/1587846)

### 移除 git 历史

```bash
# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp
```

### push tags

```bash
git push --tags
# 只 push 一个
git push origin <tag_name>
```

### clone tag

```bash
git clone --branch <tag_name> <repo_url>
```

### 生成 patch

```bash
# git diff --cached
git diff > my.patch
```

### 授权缓存
* https://stackoverflow.com/questions/5343068

```bash
# 默认 15m
git config --global credential.helper "cache --timeout=3600"

# macOS 可以使用 keychain
# git config --global credential.helper osxkeychain

# 或者 ~/.netrc
# machine <hostname> login <username> password <password>
chmod 600 ~/.netrc
```

### 强制 pull
```
git fetch --all
git reset --hard origin/master
```

### 启动git服务

* http://git-scm.com/docs/git-daemon
* http://git-scm.com/docs/git-http-backend

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

### 移除分支

`git branch -d the_local_branch`
`git push origin :the_remote_branch`
提交新的分支
`git push --all`

### 开始空的新分支

```bash
git checkout --orphan <branchname>
git rm --cached -r .
```

### 重置分支

```bash
# 先切到非 master 分支
git checkout -B temp

git branch -D master
git checkout --orphan master
git rm -rf *

echo '# My Project' > README.md
git add README.md
git commit -m 'initial commit'

git branch -D temp

git push --all -f
```


### 迁移子目录为仓库
* [Detach (move) subdirectory into separate Git repository](https://stackoverflow.com/questions/359424)

```bash
# git filter-branch --prune-empty --subdirectory-filter FOLDER-NAME  BRANCH-NAME

git subtree split -P <name-of-folder> -b <name-of-new-branch>
```

### 迁移分支为仓库

```bash
mkdir /path/to/new/repo && cd "$@"
git config receive.denyCurrentBranch warn
cd -
git push /path/to/new/repo:optional-new-branch-name branch-name
```

from [Here](http://stackoverflow.com/a/2227571/1870054)

### 取第一个 commit

```bash
git rev-list --max-parents=0 HEAD
```

## 搜索文件
```bash
git log --all -- '*.wmv'
# 只显示 hash
git rev-list --all -- '*.wmv'
```

### Rename branch
```bash
# Rename old-branch-name to a non exists new-branch-name
git branch -m old-branch-name new-branch-name
# Rename current branch to new-branch-name
git branch -m new-branch-name

# Rename remote
git branch new-branch-name origin/old-branch-name
git push origin --set-upstream new-branch-name
git push origin :old-branch-name
```

### Linux & Mac OS
在 Mac 和 Linux 均建议使用 Homebrew 来管理包,当 Homebrew 安装好后
```bash
# 安装 Git
brew install git
# 更新 Git 版本
brew update
brew upgrade git
```
### Windows
建议使用 [Cygwin](http://cygwin.org/)+[Cygwinports](http://cygwinports.org/) 来使用 Git, 避免自己编译或下载一个完整的 MingWin 包.

# Git 基本使用
使用时首先需要明确使用者身份,邮箱和姓名,例如我自己使用时
```
git config --global user.name=wener
git config --global user.email=wenermail@gmail.com
```

基本操作可参考 [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)

# Git & SVN
这里只讲解简单的与 SVN 互操作,更复杂的文档,可参考`git svn --help`
```
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
