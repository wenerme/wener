---
id: gitbook
title: Gitbook
---

# Gitbook
[Gitbook](https://www.gitbook.com/) 是一个用 Markdown 作为主要语法,使用 Git 作为存储管理的书籍编辑器.可添加目录和术语等扩展内容.

## 使用说明

在[此处](https://www.gitbook.com/editor)下载用于各个操作系统的 Gitbook 编辑器.下载完成后即可安装打开.

> __注意__: Gitbook 依赖于 Git

书籍主要有以下几种形式

* 托管在 Gitbook 云上
* 托管在远程仓库
* 本地 Git 仓库存储

托管在 Gitbook 云上的书籍登陆后,即可进行编辑,这里不做过多讲解,因为在国内访问云速度较慢,一般使用自己搭建的仓库.托管在远程的仓库可直接使用 Gitbook 添加远程仓库地址,会导入到本地的一个仓库.本地的 Git 仓库相对比较常见,可使用 Gitbook 直接打开,但不会记录该路径,需要每次都打开,或者使用 Gitbook 进行导入,导入后会在 Gitbook 内部指定的地方管理该仓库,原本地仓库不受影响.

## 基本元素

所有的章节都是一个 `.md` 文件,其格式均为 Markdown 格式.可以将图片放在仓库中,直接使用 `![](图片相对路径)` 进行引用.

### SUMMARY.md
Gitbook 的目录文件为 `SUMMARY.md`

例如:

```markdown
# Summary

* [简介](README.md)
* [需求](requirement.md)
* [实现方案](impl.md)
   * [接口](impl/api.md)
   * [存储](impl/storage.md)
   * [高可用](impl/ha.md)
* [安装部署](deploy.md)
* [FAQ](faq.md)
```

### GLOSSARY.md
其术语文件名为 `GLOSSARY.md`, 在这里记录后的术语,如果在文档中有出现相关术语则会生成和术语相关的链接

例如:

```markdown
## CAS
Compare and set

## CURD
指数据的增删改查
```

## Gitbook 命令行
Gitbook 可使用 [gitbook](https://github.com/GitbookIO/gitbook) 命令行来生成静态站点或电子书

```bash
# 使用 NPM 安装
npm install gitbook-cli -g
# 在当前目录初始化书籍
gitbook init
# 静态内容生成与 _book
gitbook build
# 在本地启动 HTTP 服务器
gitbook serve
# 生成 PDF, 需要安装额外的程序
# Mac OS 可使用 brew cask install calibre 安装依赖程序
gitbook pdf
```

## Tips
```bash
# 将所有 md 合并为一个文件
# 然后可以使用 pandoc 将其转换为其他格式
cat `cat SUMMARY.md |sed -nr 's/.*?\(([^)]+).*/\1/p'` > all.md
```

## 参考

* [Gitbook](https://www.gitbook.com/)
* [GitbookIO/gitbook](https://github.com/GitbookIO/gitbook)
