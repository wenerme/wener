Undo a commit and redo
-----------------------
```
git commit ...
git reset --soft 'HEAD^'
edit                       
git add ....
git commit -c ORIG_HEAD
```
from [here](http://stackoverflow.com/questions/927358)

显示 不同
---------
```
git diff
	--cached
	--staged
	HEAD 尚未暂存的,当前正在编辑的
```
from [here](http://stackoverflow.com/questions/1587846)

移除 git 历史
--------------
```
# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp
```

push tags
-----
```
git push --tags
# 只 push 一个
git push origin <tag_name>
```

强制 pull
------
```
git fetch --all
git reset --hard origin/master
```

启动git服务
-----------

* http://git-scm.com/docs/git-daemon
* http://git-scm.com/docs/git-http-backend

```
mkdir eddies  # MAKE folder for repo
chown -R eddie:websrv eddies/  # ensure apache (webserver) can access it
cd eddies/
git --bare init --shared
ls
branches  config  description  HEAD  hooks  info  objects  refs
# 如果是已有的项目,可以这样启用 receivepack
git config --file config http.receivepack true
```

```
# 启动服务
git daemon --reuseaddr --base-path=. --export-all --verbose --enable=receive-pack
# receive-pack 会允许匿名的push 使用需谨慎
```

```
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
```
git clone git://localhost/reponame
```

移除分支
---------
`git branch -d the_local_branch`
`git push origin :the_remote_branch`
提交新的分支
`git push --all`

开始空的新分支
--------------
```
git checkout --orphan <branchname>
git rm --cached -r .
```

Migrate git branch to a new repository
--------------------
```
mkdir /path/to/new/repo && cd "$@"
git config receive.denyCurrentBranch warn
cd -
git push /path/to/new/repo:optional-new-branch-name branch-name
```

from [Here](http://stackoverflow.com/a/2227571/1870054)

## Rename branch
```
# Rename old-branch-name to a non exists new-branch-name
git branch -m old-branch-name new-branch-name
# Rename current branch to new-branch-name
git branch -m new-branch-name

# Rename remote
git branch new-branch-name origin/old-branch-name
git push origin --set-upstream new-branch-name
git push origin :old-branch-name
```

------

## Linux & Mac OS
在 Mac 和 Linux 均建议使用 Homebrew 来管理包,当 Homebrew 安装好后
```
# 安装 Git
brew install git
# 更新 Git 版本
brew update
brew upgrade git
```
## Windows
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

# Tips
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
