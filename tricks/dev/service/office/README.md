---
id: office
title: 办公套件
---

# Office

## Tips

| Project                                                                                     | License |
| ------------------------------------------------------------------------------------------- | ------- |
| [nextcloud/server](https://github.com/nextcloud/server)                                     | AGPL    |
| [nextcloud/documentserver_community](https://github.com/nextcloud/documentserver_community) | AGPL    |
| [ONLYOFFICE/CommunityServer](https://github.com/ONLYOFFICE/CommunityServer)                 | GPL     |
| [ONLYOFFICE/onlyoffice-owncloud](https://github.com/ONLYOFFICE/onlyoffice-owncloud)         | AGPL    |
| [ONLYOFFICE/DocumentServer](https://github.com/ONLYOFFICE/DocumentServer)                   | AGPL    |
| [LibreOffice/core](https://github.com/LibreOffice/core)                                     | GPL     |

# FAQ

## Onlyoffice vs Collabora

- ONLYOFFICE
  - 主要支持格式 docx, xlsx, pptx
    - 对 LibreOffice 格式支持不友好，但不影响办公
  - 从头开发
    - 通信的内容是 JSON
    - 前端更加现代化 - 移动端界面友好
    - 更容易集成
    - 架构更为复杂
  - 会使用客户端资源 - 会在前端处理 - 更快响应
  - 支持 Strict 模式 - 编辑的内容不会在多端实时显示，保存时显示
  - 支持聊天
- Collabora
  - 原生格式 odt, ods, odp - 所有 LibreOffice 文档格式
  - 基于 LibreOffice
    - LibreOffice 的网页端，服务端运行嵌入式 LibreOffice
    - 支持 VBA
    - 更多开发
  - 主要在服务端处理
    - 编辑体验可能有一定延时
    - WOPI
    - 部署结构简单
    - 文档不会离开服务端
    - 因此没有个人偏好设置
    - 当修改某样编辑设置时多端生效
    - 资源占用可能是 ONLYOFFICE 的 10 倍 - 2 核心，Collabora 8-10 人，ONLYOFFICE 可能 150 人
  - 服务端渲染传输到前端
    - 多端效果统一
    - 启动更快
    - 重服务端轻客户端 - 因此对移动端更友好
    - 通讯的内容是绘制页面 - 占用更多网络
- Nextcloud
  - Nextcloud Hub 开始默认为 Collabora Online 而不是 ONLYOFFICE
  - Collabora 集成会更好
  - Onlyoffice 官方无法投入更多精力到集成上
  - [OO 在 NC 集成后移除了所需功能](https://help.nextcloud.com/t/onlyoffice-or-collabora/12262/62)
    - https://github.com/ONLYOFFICE/DocumentServer/issues/805
- 参考
  - [ONLYOFFICE, the best Collabora Online alternative](https://www.onlyoffice.com/en/best-collabora-alternative.aspx)
  - [ONLYOFFICE or Collabora: who proves better in collaboration](https://www.onlyoffice.com/blog/2018/08/onlyoffice-or-collabora-who-proves-better-in-collaboration/)
  - [Collabora vs ONLYOFFICE](https://webcache.googleusercontent.com/search?q=cache:sbLUff9T1UoJ:https://blog.jospoortvliet.com/2020/06/collabora-vs-onlyoffice.html+&cd=10&hl=zh-CN&ct=clnk)
  - [Comparing Collabora with OnlyOffice](https://www.collaboraoffice.com/comparing-collabora-with-onlyoffice/)
  - [ONLYOFFICE vs. Collabora: why we are sure that our solution is better](https://weekly-geekly.github.io/articles/341522/index.html)
