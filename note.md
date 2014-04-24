
请不要猜测这里有什么
==================

移除 git 历史
--------------

```
# $sha 为需要移除的历史位置
git checkout --orphan temp $sha
git commit -m "Truncated history"
git rebase --onto temp $sha master
git branch -D temp
```

福利
----


MXGS-153
推荐理由：最有教育意义的影片。

IESP-144
推荐理由：最多华人明星出演。

KRMV-440
推荐理由：女主角被坑得最惨的影片。

ONSD-340
推荐理由：演员表最豪华的贺岁片。

SDDE-225
推荐理由：可能是最好的校园题材片。

SDMS-604
推荐理由：口袋里只有零钱、喜欢自动售货机的人一定会喜欢的……励志影片。

SOE-121
推荐理由：深入讨论医患关系。

BOBB-073
推荐理由：被用作签名表情的次数最多。

FDD-2408
推荐理由：一个时代的终结。