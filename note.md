

移除 git 历史
--------------

```
# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp
```