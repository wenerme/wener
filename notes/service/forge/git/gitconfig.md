---
tags:
  - Configuration
---

# gitconfig



```ini
[push]
  default = simple
[user]
	editor = nano
	quotepath = false
	# name = wener
	# email =
	# signingkey = ssh-ed25519 AAAA wener
[alias]
	master = checkout master
	ci = commit
	co = checkout
	wt = worktree
	loggo = log --graph --oneline
	l = log --graph --oneline --decorate
	logg = log --graph
	sti = status --ignored
	st = status
	sts = status -s
  stsb = status -sb
  latest = clone --depth 1 -v --progress
	# svn push
	svnc = !git stash && git svn dcommit && git stash pop
	svnr = !git stash && git svn rebase  && git stash pop
[color]
  diff = auto
  status = auto
  branch = auto
	ui = true
[core]
	autocrlf = input
	safecrlf = false
	quotepath = false
	ignorecase = false
[credential]
	helper = cache --timeout=36000
[pull]
	ff = only
# git init
[init]
  # 使用 main 作为默认分支
	defaultBranch = main
[gpg]
	format = ssh
# git commit
[commit]
  # 提交时自动 sign, -S
	gpgsign = true
```

## crlf

```bash
git config --global core.eol lf
git config --global core.autocrlf input
git add -u --renormalize .
```

```gitattributes title=".gitattributes"
* text=auto eol=lf

*.sln text eol=crlf
*.png binary
*.jpg binary
```

```
core.autocrlf=true:      core.autocrlf=input:     core.autocrlf=false:

     repository               repository               repository
      ^      V                 ^      V                 ^      V
     /        \               /        \               /        \
crlf->lf    lf->crlf     crlf->lf       \             /          \
   /            \           /            \           /            \
```
