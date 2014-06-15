Undo a commit and redo
-----------------------

git commit ...
git reset --soft 'HEAD^'
edit                       
git add ....
git commit -c ORIG_HEAD

from [here](http://stackoverflow.com/questions/927358)

显示 不同
---------

git diff
	--cached
	--staged
	HEAD 尚未暂存的,当前正在编辑的

from [here](http://stackoverflow.com/questions/1587846)
	
移除 git 历史
--------------

# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp

push tags
-----
```
git push --tags
# 只 push 一个
git push origin <tag_name>
```

强制 pull
------

git fetch --all
git reset --hard origin/master

