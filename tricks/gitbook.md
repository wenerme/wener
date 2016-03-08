# Gitbook
[Gitbook](https://www.gitbook.com/) 是一个用 Markdown 作为主要语法,使用 Git 作为存储管理的书籍编辑器.可添加目录和术语等扩展内容.

## 基本使用说明

在[此处](https://www.gitbook.com/editor)下载用于个个操作系统的 Gitbook 编辑器.下载完成后即可安装打开.

书籍主要有以下几种形式

* 托管在 Gitbook 云上
* 托管在远程仓库
* 本地 Git 仓库存储

托管在 Gitbook 云上的书籍登陆后,即可进行编辑,这里不做过多讲解,因为在国内访问云速度较慢,一般使用自己搭建的仓库.托管在远程的仓库可直接使用 Gitbook 添加远程仓库地址,会导入到本地的一个仓库.本地的 Git 仓库相对比较常见,可使用 Gitbook 直接打开,但不会记录该路径,需要每次都打开,或者使用 Gitbook 进行导入,导入后会在 Gitbook 内部指定的地方管理该仓库,原本地仓库不受影响.

## 基本元素
Gitbook 的目录文件为 `SUMMARY.md`

例如:

```
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

其术语文件名为 `GLOSSARY.md`, 在这里记录后的术语,如果在文档中有出现相关术语则会生成和术语相关的链接

例如:

```
## CAS
Compare and set

## CURD
指数据的增删改查
```
