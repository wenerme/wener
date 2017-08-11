
## 术语

[DOT](https://zh.wikipedia.org/wiki/DOT%E8%AF%AD%E8%A8%80)
: DOT语言是一种文本图形描述语言。它提供了一种简单的描述图形的方法，并且可以为人类和计算机程序所理解。

[Graphviz](https://zh.wikipedia.org/wiki/Graphviz)
: Graphviz 是用于绘制使用 DOT 语言书写图形内容的工具.

* [族谱布局](https://stackoverflow.com/q/2271704/1870054)
* [How do you create a family tree in d3.js?](https://stackoverflow.com/q/31245751/1870054)

## Dot

### Tips

* 隐藏边
```
a -> b [style=invis]
```
* 增加边长度
```
a -> b [label="       "]
```

## Graphviz

## Plantuml

### Plantuml Server
[Plantuml Server](http://plantuml.com/plantuml/form) 可将 DOT 语言转为为 PNG/SVG/ASCII 图形,可通过链接引用.在书写 Markdown 等类型的文档时,非常有用.例如:

```dot
digraph G {
    rankdir=LR

    node [shape=box];
    edge [len=1]
	log[color="#FFC736",style=filled,label=<<font>Logstash<br/><font POINT-SIZE="8">收集,解析,清理,时间序列化</font></font>>]
	search[color="#C7FF36",style=filled,label=<<font>Elasticsearch<br/><font POINT-SIZE="8">存储,搜索,分析</font></font>>]
	web[color="#36C7FF",style=filled,label=<<font>Kibana<br/><font POINT-SIZE="8">呈现</font></font>>]

    log->search->web

    labelloc="t"
    label="ELK Process"
}
```
可在 Markdown 里直接引用该服务提供的地址显示图片.

![](http://plantuml.com:80/plantuml/svg/IybCBqeio51mLwZcKW22eiIyx9JC8bkV82umFoy_9LKXkZWZiI3LDYc_8jOQB9gQaWuKpKdDipMCvUBCoK-FJixFoI-oLL9sStCsDpPJqYakgSn9jKtBpCb9JT79IKnApR6riKdBpoknyybFBov9BCwmIIhIjmCBAGJuU_g5w0PxHhdQAbaesJsRiktbx3QT5yiNFvitGUVPZjRd4zfqdatVzdBwbgUx-fzsJ7_QCyr67smObB83kg8uDR4eEGFk46TpDpVy3d7DIImkoKo6wCFjcgThPpnjMg7pRCASvriMwJpjQ0Cw2jFsyjGakDN6PY3ByLdjdPcKc9U8nyw97S_xDc3O0WvxO6Zhsa4ShMi7j1Og2Z8-9p_PLgb42I5Wg-JguwqGK9IVd5fShCHL2m00)

也可以使用该服务将一个链接转换为代码.
