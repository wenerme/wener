---
tags:
  - FAQ
---

# Office FAQ

## Limits

**Excel**

| 功能                          | 最大限制                                                              |
| ----------------------------- | --------------------------------------------------------------------- |
| 工作表上的行数和列总数        | 1,048,576 行 × 16,384 列 - 1m × 16k                                   |
| 列宽                          | 255 个字符                                                            |
| 行高                          | 409 磅                                                                |
| 分页符                        | 水平和垂直方向各 1,026 个                                             |
| 单元格可包含的字符总数        | 32,767 个字符 ~32k                                                    |
| 页眉或页脚中的字符数          | 255 个字符                                                            |
| 每个单元格的最大换行数        | 253 个                                                                |
| 工作簿中的工作表个数          | 受可用内存限制（默认值为 1 个工作表）                                 |
| 工作簿中的颜色数              | 16,000,000 种颜色（32 位，具有 24 位色谱的完整通道）                  |
| 工作簿中的命名视图个数        | 受可用内存限制                                                        |
| 唯一单元格格式/单元格样式个数 | 65,490 个                                                             |
| 填充样式个数                  | 256 个                                                                |
| 线条粗细和样式个数            | 256 个                                                                |
| 唯一字体类型个数              | 全局 1,024 种字体；每个工作簿 512 种                                  |
| 工作簿中的数字格式数          | 200 至 250 之间，取决于所安装的 Excel 语言版本                        |
| 工作簿中的名称个数            | 受可用内存限制                                                        |
| 工作簿中的窗口个数            | 受可用内存限制                                                        |
| 工作表中的超链接个数          | 65,530 个                                                             |
| 窗口中的窗格个数              | 4 个                                                                  |
| 链接的工作表个数              | 受可用内存限制                                                        |
| 方案个数                      | 受可用内存限制；汇总报表只显示前 251 个方案                           |
| 方案中的可变单元格个数        | 32 个                                                                 |
| 规划求解中的可调单元格个数    | 200 个                                                                |
| 自定义函数个数                | 受可用内存限制                                                        |
| 缩放范围                      | 10% 至 400%                                                           |
| 报表个数                      | 受可用内存限制                                                        |
| 排序引用的个数                | 单个排序中为 64 个；如果使用连续排序，则没有限制                      |
| 撤消级别                      | 100                                                                   |
| 数据窗体中的字段个数          | 32 个                                                                 |
| 工作簿参数个数                | 每个工作簿 255 个参数                                                 |
| 筛选下拉列表中显示的项目个数  | 10,000 个                                                             |
| 可选的非连续单元格个数        | 2,147,483,648 个单元格                                                |
| 处理器核心数                  | 64                                                                    |
| 文件名长度                    | 218 个字符（包括文件路径，例如：C:\Username\Documents\FileName.xlsx） |

**Google Sheets**

| 功能                              | 最大限制                                                          |
| --------------------------------- | ----------------------------------------------------------------- |
| 单个电子表格中的单元格数或列数    | 最多 10,000,000 个单元格或 18,278 列（列 ZZZ）                    |
| 从 Microsoft Excel 导入的电子表格 | 最多 10,000,000 个单元格或 18,278 列，Excel 和 CSV 导入的限制相同 |
| 转换自 Excel 的文档               | 如果单元格字符超过 50,000 个，将会在 Google Sheets 中删除该单元格 |
| Connected Sheets 中的数据透视表   | 最多 100,000 行                                                   |
| Connected Sheets 中的数据提取     | 最多 500,000 行或 5,000,000 个单元格                              |

- https://support.google.com/drive/answer/37603
- https://support.google.com/docs/thread/88183868/google-sheets-limitations
- https://support.microsoft.com/en-us/office/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3

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

## LibreOffice vs Apache OpenOffice

- LibreOffice
  - LGPLv3, MPL-2.0
  - 可读写 OOXML
  - [contributors](https://github.com/LibreOffice/core/graphs/contributors)
- Apache OpenOffice
  - Apache-2.0, C++,Java
  - 可读 OOXML 不可写
  - 开发慢，人员不足
  - [Apache OpenOffice](https://en.wikipedia.org/wiki/Apache_OpenOffice)
  - [contributors](https://github.com/apache/openoffice/graphs/contributors)

---

- [Comparison of Office Open XML and OpenDocument](https://en.wikipedia.org/wiki/Comparison_of_Office_Open_XML_and_OpenDocument)
