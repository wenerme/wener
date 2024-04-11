---
tags:
  - Reference
---

# Markdown 语法参考

## 基本语法

- 块元素
  - 段落和换行
  - 标题
  - 引用
  - 列表
  - 代码块
  - 分隔线
- Span 元素
  - 链接
  - 强调
  - 代码
  - 图片
- 杂项
  - 转义
  - 自动链接

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
>
> > 这是二级引用
> >
> > > 这是三级引用

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

- 无序列表
  1. 有序列表
     换行书写更多的内容
     - 无序列表
  1. 有序列表
- 无序列表

---

0. 有序列表
   1. 有序列表
1. 序号会自动增加
2. 序号无法修改
   - 无序列表 3. 有序列表
   - 无序列表
3. 有序列表

### 代码块

    ```
    class Obj{
    	int a;
    	void method(){}
    }
    ```

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

中*二*病**爆**表.
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

这个是星号 \*\*\*
HTML 转义的单引号 &#96;

### 自动连接

所有的连接都会转换为可点击的连接

```
http://github.com/wenerme
```

http://github.com/wenerme

## 扩展语法 {#extended}

- 表格
- 指定代码块语法
- 注解
  - Stackedit 支持
- 数学表达式
  - Stackedit 支持
  - Gitbook 可通过插件支持
- 定义标签 ID
- 数据定义
  - Stackedit 支持
- 目录
  - Stackedit 支持
- Github 引用

### 表格

```
列|列|左对齐列|右对齐列|居中对齐列
----|----|:----|----:|:----:
行|行|行|行|行
行|行|行|行<br/>换行|行<br/>换行<br/>换行
```

| 列  | 列  | 左对齐列 |    右对齐列 |      居中对齐列      |
| --- | --- | :------- | ----------: | :------------------: |
| 行  | 行  | 行       |          行 |          行          |
| 行  | 行  | 行       | 行<br/>换行 | 行<br/>换行<br/>换行 |

### 指定代码块语法

    ```java
    class Obj{
    	int a;
    	void method(){}
    }
    ```

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

### Table span

```md
| Head 1 | Head 2 | Head 3 | Head 4 | Head 4 |
| :----: | :----: | :----: | :----: | :----: |
| (2x1)  |   <    |  Cell  |  Cell  |  Cell  |
| (1x3)  | (2x2)  |   <    | (2x2)  |   <    |
|   ^    |   ^    |   <    |  Cell  |  Cell  |
|   ^    | (3x1)  |   <    |   <    |  Cell  |
```

| Head 1 | Head 2 | Head 3 | Head 4 | Head 4 |
| :----: | :----: | :----: | :----: | :----: |
| (2x1)  |   <    |  Cell  |  Cell  |  Cell  |
| (1x3)  | (2x2)  |   <    | (2x2)  |   <    |
|   ^    |   ^    |   <    |  Cell  |  Cell  |
|   ^    | (3x1)  |   <    |   <    |  Cell  |

## 脚注 {#footnote}

```md
这是一个脚注[^1]

[^1]: 这是一个脚注
```

## 缩写 {#abbr}

```md
_[HTML]: Hyper Text Markup Language
_[W3C]: World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```

## 参考

- https://shd101wyy.github.io/markdown-preview-enhanced/
