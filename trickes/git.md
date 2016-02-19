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
