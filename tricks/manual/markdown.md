# Markdown

## Tips
* [Makrdown 基础语法](https://daringfireball.net/projects/markdown/syntax)
* [Markdown 语法说明 (简体中文版) ](http://wowubuntu.com/markdown/)
* [Github 流 Markdown 语法指南](https://guides.github.com/features/mastering-markdown/)
* 主题
  * 类 [github](https://github.com/sindresorhus/github-markdown-css)
* 参考
  * [Pandoc](http://pandoc.org/) - Markup Document 互转 Word, HTML, PDF, TeX, EPUB 等
* 编辑器
  * [StackEdit](https://stackedit.io/) 支持云同步和较多扩展语法
  * [Gitbook](gitbook.md) 使用 Markdown 来撰写书籍


## 工具
### Pandoc
[Pandoc](http://pandoc.org/) 可用于直接将 Markdown 转换为 Word 或者 PDF. 也支持将 Word 或者 PDF 转换为 Markdown, 是一款非常强大的文档转换工具.支持的格式有
```
输入格式:  commonmark, docbook, docx, epub, haddock, html, json*, latex,
                markdown, markdown_github, markdown_mmd, markdown_phpextra,
                markdown_strict, mediawiki, native, odt, opml, org, rst, t2t,
                textile, twiki
                [ *only Pandoc's JSON version of native AST]
输出格式: asciidoc, beamer, commonmark, context, docbook, docx, dokuwiki,
                dzslides, epub, epub3, fb2, haddock, html, html5, icml, json*,
                latex, man, markdown, markdown_github, markdown_mmd,
                markdown_phpextra, markdown_strict, mediawiki, native, odt,
                opendocument, opml, org, pdf**, plain, revealjs, rst, rtf, s5,
                slideous, slidy, texinfo, textile
                [**for pdf output, use latex or beamer and -o FILENAME.pdf]
```

```bash
# 在 Mac 下可直接使用 brew 安装
brew install pandoc

# Markdown 转 docx
pandoc makrdown.md -f markdown -t docx -o output.docx

# Markdown 转 pdf
# 依赖于 pdflatex,
# Mac 下可通过安装 maclatex 提供
#   brew cask install mactex # 2.5 G
pandoc makrdown.md -f markdown -t latex -o output.pdf
```

## 基本语法

* 块元素
  * 段落和换行
  * 标题
  * 引用
  * 列表
  * 代码块
  * 分隔线
* Span 元素
  * 链接
  * 强调
  * 代码
  * 图片
* 杂项
  * 转义
  * 自动链接

### 段落和换行
原始 Markdown 中通过在换行结尾添加两个空格来表示换行, 但因为这样不好辨识,建议使用`<br>`来强制换行. Github 流的 Markdown 会将段落中的换行当做真实换行. 通过在两行之间添加一个空行来表示段落.

```
这是一个段落的内容,这是一个段落的内容,这是一个
段落的内容,这是一个段落的内容,这是一个段落的内
容.<br/>
这是下一行,这是下一行.

这是一个段落的内容,这是一个段落的内容,这是一个
段落的内容,这是一个段落的内容,这是一个段落的内
容.
```

### 标题
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

一级标题
=======

二级标题
-------
```

### 引用
```
> 这是一级引用
>> 这是二级引用
>>> 这是三级引用
```

> 这是一级引用
>> 这是二级引用
>>> 这是三级引用

### 列表
列表分为有序列表和无序列表, 列表可嵌套使用.
```
* 无序列表
	1. 有序列表
		换行书写更多的内容
		* 无序列表
	1. 有序列表
* 无序列表

----

0. 有序列表
	1. 有序列表
0. 序号会自动增加
1. 序号无法修改
	* 无序列表
		3. 有序列表
	* 无序列表
2. 有序列表
```

* 无序列表
	1. 有序列表
		换行书写更多的内容
		* 无序列表
	1. 有序列表
* 无序列表

----

0. 有序列表
	1. 有序列表
0. 序号会自动增加
1. 序号无法修改
	* 无序列表
		3. 有序列表
	* 无序列表
2. 有序列表


### 代码块
<pre>
&#96;&#96;&#96;
class Obj{
	int a;
	void method(){}
}
&#96;&#96;&#96;
</pre>

```
class Obj{
    int a;
    void method(){}
}
```

### 分隔线
```
这是

---
分隔线
```
这是

---
分隔线


### 链接
```
[显示的内容](链接的地址)
[显示的内容][定义的链接名]

[Wener](https://github.com/wenerme)
[Wenerme][网站地址]

  [网站地址]: https://github.com/wenerme
```

[Wener](https://github.com/wenerme)
[Wenerme][网站地址]

  [网站地址]: https://github.com/wenerme


### 强调

```
中_二_病__爆__表.
可*互*换**使**用.
```

中_二_病__爆__表.
可*互*换**使**用.

### 代码
用于在段落中引用代码

```
在命令行输入 `echo Hello world` 会看到 `Hello world`
```

在命令行输入 `echo Hello world` 会看到 `Hello world`

### 图片
```
![图片描述](图片地址)
![图片描述][定义的链接名]

  [定义的链接名]:链接地址

![我的头像][头像地址]

  [头像地址]: https://avatars1.githubusercontent.com/u/1777211?v=3&s=40

<!-- 可点击打开网页的图片 -->
[![我的头像][头像地址]](https://github.com/wenerme)
```

![我的头像][头像地址]

  [头像地址]: https://avatars1.githubusercontent.com/u/1777211?v=3&s=40

<!-- 可点击打开网页的图片 -->
[![我的头像][头像地址]](https://github.com/wenerme)

### 转义
```
这个是星号 *\**
HTML 转义的单引号 &#96;
```
这个是星号 *\**
HTML 转义的单引号 &#96;

### 自动连接
所有的连接都会转换为可点击的连接

```
http://github.com/wenerme
```
http://github.com/wenerme

## 扩展语法

* 表格
* 指定代码块语法
* 注解
	* Stackedit 支持
* 数学表达式
	* Stackedit 支持
	* Gitbook 可通过插件支持
* 定义标签 ID
* 数据定义
  * Stackedit 支持
* 目录
  * Stackedit 支持
* Github 引用


### 表格
```
列|列|左对齐列|右对齐列|居中对齐列
----|----|:----|----:|:----:
行|行|行|行|行
行|行|行|行<br/>换行|行<br/>换行<br/>换行
```

列|列|左对齐列|右对齐列|居中对齐列
----|----|:----|----:|:----:
行|行|行|行|行
行|行|行|行<br/>换行|行<br/>换行<br/>换行

### 指定代码块语法
<pre>
&#96;&#96;&#96;java
class Obj{
	int a;
	void method(){}
}
&#96;&#96;&#96;
</pre>

```java
class Obj{
    int a;
    void method(){}
}
```

### 注解

```

传统 SQL[^sql] 数据库均支持 ACID[^acid] 属性.

  [^sql]: 结构化查询语言

  [^acid]: 结构化查询语言
```

传统 SQL[^sql] 数据库均支持 ACID[^acid] 属性.

  [^sql]: 结构化查询语言

  [^acid]: 结构化查询语言

### 数学表达式

```
变量 $A$ 为 $3 \times 2$

$$
A = 3 \times 2
$$
```

变量 $A$ 为 $3 \times 2$

$$
A = 3 \times 2
$$
