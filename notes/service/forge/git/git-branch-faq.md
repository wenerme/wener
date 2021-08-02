---
title: Git Branch FAQ
---

# Git Branch FAQ

## 切换分支但不捡出文件

```bash
# 文件变为暂存状态
git symbolic-ref HEAD refs/heads/其他分支
# 可以取消暂存
git reset
```

## 移除分支

`git branch -d the_local_branch`
`git push origin :the_remote_branch`
提交新的分支
`git push --all`

## 开始空的新分支

```bash
git checkout --orphan <branchname>
git rm --cached -r .
```

## 重置分支

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

## 切换到远程分支

```bash
# 查看所有分支
# -r 远程
git branch -a

git fetch origin
git checkout --track origin/3.12-stable

# git fetch <remote> <rbranch>:<lbranch>
git fetch origin 3.12-stable:3.12-stable
git checkout 3.12-stable
```

## 获取远程分支

```bash
branch=
git ls-remote origin $branch
git fetch origin $branch:refs/remotes/$branch/$branch
```

## 拉取远程分支

```bash
# 检出远程分支
git clone -b stable <URL>

# 或检出后
git fetch <remote> <rbranch>:<lbranch>
git checkout <lbranch>
```

## Rename branch

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
