---
tags:
  - Awesome
---

# Document Awesome

- WOPI - Web Application Open Platform Interface Protocol
  - https://docs.microsoft.com/en-us/microsoft-365/cloud-storage-partner-program/rest/
- [Office Open XML](https://en.wikipedia.org/wiki/Office_Open_XML)
- LibreOffice running natively in the browser via WebAssembly
  - [HN](https://news.ycombinator.com/item?id=30356020)

| Project                                                                                     | License |
| ------------------------------------------------------------------------------------------- | ------- |
| [nextcloud/server](https://github.com/nextcloud/server)                                     | AGPL    |
| [nextcloud/documentserver_community](https://github.com/nextcloud/documentserver_community) | AGPL    |
| [ONLYOFFICE/CommunityServer](https://github.com/ONLYOFFICE/CommunityServer)                 | GPL     |
| [ONLYOFFICE/onlyoffice-owncloud](https://github.com/ONLYOFFICE/onlyoffice-owncloud)         | AGPL    |
| [ONLYOFFICE/DocumentServer](https://github.com/ONLYOFFICE/DocumentServer)                   | AGPL    |
| [LibreOffice/core](https://github.com/LibreOffice/core)                                     | GPL     |

## mime

- Doc -> Word, Document, Doc, Writer, Pages
- Sheet -> Excel, Table, Spreadsheet, Sheet, Calc, Numbers
- Slice -> PPT, PowerPoint, Slide, Presentation, Impress, Keynote

| .ext             | mime                                                                      | notes |
| ---------------- | ------------------------------------------------------------------------- | ----- |
| .pdf             | application/pdf                                                           |
| **Office**       |
| .docx            | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| .xlsx            | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         |
| .pptx            | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| .doc             | application/msword                                                        |
| .xls             | application/vnd.ms-excel                                                  |
| .ppt             | application/vnd.ms-powerpoint                                             |
| **OpenDocument** |
| .odt, .fodt      | application/vnd.oasis.opendocument.text                                   |
| .ods, .fods      | application/vnd.oasis.opendocument.spreadsheet                            |
| .odp, .fodp      | application/vnd.oasis.opendocument.presentation                           |
| .odg, .fodg      | application/vnd.oasis.opendocument.graphics                               |
| .odf             |
| **iWork**        |
| .numbers         | application/x-iwork-numbers-sffnumbers                                    |
| .keynote         | application/x-iwork-keynote-sffkey                                        |
| .pages           | application/x-iwork-pages-sffpages                                        |
| _2021_           |
| .numbers         | application/vnd.apple.numbers                                             |
| .pages           | application/vnd.apple.pages                                               |
| .keynote         | application/vnd.apple.keynote                                             |

- wikipedia [OpenDocument](https://en.wikipedia.org/wiki/OpenDocument)
- https://www.iana.org/assignments/media-types/media-types.xhtml

## Library

- Java
  - [apache/poi](https://github.com/apache/poi)
    - Apache-2.0, Java
    - reading and writing Microsoft Office binary and OOXML file formats
- Javascript/NodeJS
  - [xmldom/xmldom](https://github.com/xmldom/xmldom)
    - 用于解析 各种文档
  - [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
    - GPLv3
  - [mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js)
    - .docx to HTML
  - [alalic/docx2html](https://github.com/lalalic/docx2html)
  - [lalalic/docx4js](https://github.com/lalalic/docx4js)
    - 解析 docx, pptx, xlsx
  - [dolanmiu/docx](https://github.com/dolanmiu/docx)
    - 生成 docx
  - [dbashford/textract](https://github.com/dbashford/textract)
    - 文本提取
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs)
    - Apache-2.0, JS
    - 不在 npm https://github.com/SheetJS/sheetjs/issues/2667
    - 开发也不在 Github 上了
  - [foliojs](https://github.com/foliojs)
    - [foliojs/pdfkit](https://github.com/foliojs/pdfkit)
      - MIT, JavaScript
      - npm:pdfkit
      - PDF 生成
    - fontkit
    - png.js
    - brotli.js
  - [alafr/SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit)
  - [mgcrea/node-xlsx](https://github.com/mgcrea/node-xlsx)
    - based on sheetjs
  - [harshankur/officeParser](https://github.com/harshankur/officeParser)
    - MIT, JS
    - parse text out of any office file
    - docx, pptx, xlsx and odt, odp, ods
  - [cantoo-scribe/pdf-lib](https://github.com/cantoo-scribe/pdf-lib)
    - npm @cantoo/pdf-lib
    - fork of [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib)
- Golang
  - [unidoc/unioffice](https://github.com/unidoc/unioffice)
    - .docx, .xlsx, .pptx
- PHP
  - [PHPOffice/PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)
- Convert/Parse
  - pandoc
  - [VikParuchuri/marker](https://github.com/VikParuchuri/marker)
    - GPLv3, Python
    - PDF to markdown quickly with high accuracy
  - [opengovsg/pdf2md](https://github.com/opengovsg/pdf2md)
    - by Open Government Products for open.gov.sg
    - fork [jzillmann/pdf-to-markdown](https://github.com/jzillmann/pdf-to-markdown)
  - [benbalter/word-to-markdown](https://github.com/benbalter/word-to-markdown)
    - MIT, Ruby
    - based on LibreOffice
  - [opendatalab/magic-doc](https://github.com/opendatalab/magic-doc)
    - Apache-2.0, Python
    - based on libreoffice
- [FancyGrid/awesome-grid](https://github.com/FancyGrid/awesome-grid)
- 应用
  - [kevinschaich/mintable](https://github.com/kevinschaich/mintable)
    - personal finances
- 商业
  - https://docxtemplater.com/
    - [open-xml-templating/docxtemplater](https://github.com/open-xml-templating/docxtemplater)
      - 开源版本功能有限
      - https://docxtemplater.com/pricing/

## PDF

- [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)
  - GPLv3, Java
  - Locally hosted web application that allows you to perform various operations on PDF files
- Reader
  - [sumatrapdfreader/sumatrapdf](https://github.com/sumatrapdfreader/sumatrapdf)
    - GPLv3, C++, Windows
    - PDF, EPUB, MOBI, CBZ, CBR, FB2, CHM, XPS, DjVu
- Javascript/TyepScript
  - [mozilla/pdf.js](https://github.com/mozilla/pdf.js)
    - Apache-2.0, Javascript
    - PDF Reader
    - NPM pdfjs-dist @types/pdfjs-dist
    - [ZEISS/react-view-pdf](https://github.com/ZEISS/react-view-pdf)
  - [modesty/pdf2json](https://github.com/modesty/pdf2json)
    - Apache-2.0, JS
    - 使用 @xmldom/xmldom
  - [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake)
    - MIT, JS
    - structure JSON to PDF
    - http://pdfmake.org/playground.html
  - pdfkit
- React
  - [wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf)
    - MIT, Javascript
    - Viewer
  - [diegomura/react-pdf](https://github.com/diegomura/react-pdf)
    - MIT, Javascript
    - Builder
    - for React PDF
      - https://react-pdf-repl.vercel.app/
      - [aanckar/react-pdf-tailwind](https://github.com/aanckar/react-pdf-tailwind)

## Sheet/Excel

:::tip 两种 sheet 数据格式

- 1. `object[]` - 贴近 Table/数据表/DataGrid
  - 适用于有逻辑处理
  - 支持 schema 逻辑
  - 支持 业务
  - Header 为 key/title
- 2. `any[][]` - AoA
  - 适用于简单数据展示、数据导入导出 - 贴近 Excel/Sheet
  - 适用于通用数据
  - 适用于数据中间处理
  - Header 为 Index(A-Z), 第一行数据可能为 Header

:::

- Java
  - [alibaba/easyexcel](https://github.com/alibaba/easyexcel)
- Golang
  - [qax-os/excelize](https://github.com/qax-os/excelize)
- Formula
  - [formulajs/formulajs](https://github.com/formulajs/formulajs)
    - MIT, JS
    - forked from handsontable/formula.js
  - [LesterLyu/fast-formula-parser](https://github.com/LesterLyu/fast-formula-parser)
    - MIT, JS
    - ⚠️ 开发不活跃
    - npm:fast-formula-parser
    - 300kB,83kB
    - Parse and evaluate MS Excel formula in javascript.
  - [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
    - **GPLv3**, TS
  - ~~[handsontable/formula-parser](https://github.com/handsontable/formula-parser)~~
  - Excel Formula Beautifier https://www.excelformulabeautifier.com/
- JS/TyepScript
  - [exceljs/exceljs](https://github.com/exceljs/exceljs)
    - MIT, JS
    - Excel Workbook Manager
    - vs sheetjs
      - 完整样式支持
      - 支持的格式更少
  - [sheetjs](./sheet/sheetjs.md)
    - CE 版本功能限制
      - 不支持 style, image, table, chart
      - 不支持 i18n
      - 不支持 Data Validations, Conditional Formatting
      - 不会对 formula 求值
  - [dream-num/Luckysheet](./luckysheet.md)
  - [future-architect/cheetah-grid](https://github.com/future-architect/cheetah-grid)
    - MIT, JS, TS, Vue, React
  - [VisActor/VTable](https://github.com/VisActor/VTable)
    - MIT, TS, React, Vue
    - by 字节跳动
    - 1.6MB, 400kB
    - npm:@visactor/vtable
  - [antvis/S2](https://github.com/antvis/S2)
    - MIT, TS, React, Vue
    - by AntV
    - npm:@antv/s2
    - 926kB, 256kB
    - deps: gl-matrix, @antv/g
  - [handsontable/handsontable](https://github.com/handsontable/handsontable)
    - license 不允许商业产品使用
  - ~~[myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)~~
    - MIT, JS
    - ⚠️ 开发不活跃
    - canvas
    - -> [wolf-table/table](https://github.com/wolf-table/table)
  - [jspreadsheet/ce](https://github.com/jspreadsheet/ce)
    - MIT
  - [nhn/tui.grid](https://github.com/nhn/tui.grid)
  - [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
    - GPLv3, TS
  - [revolist/revogrid](https://github.com/revolist/revogrid)
    - MIT, TS, React, Vue, Svelte, Angular
    - `object[]` 数据结构
  - [501351981/vue-office](https://github.com/501351981/vue-office)
- React Table/Grid/Speadsheet
  - [react-data-grid](https://github.com/adazzle/react-data-grid)
    - MIT, TS
    - 42kB, 14kB
    - 适用于 object[]
    - 自身功能非常简洁轻量
    - 🌟 首选
    - formula 功能可选
  - [react-spreadsheet](https://github.com/iddan/react-spreadsheet)
    - MIT, TS
    - npm:react-spreadsheet
    - 40kB/12kB
    - 支持 formula
    - 适用于二维数组 - AoA
    - fast-formula-parser, jstat, es-abstract, @linaria/core
    - fast-formula-parser -> chevrotain, jstat - 体积比较大
    - ~~hot-formula-parser~~ -> ~~@handsontable/formulajs~~ - 弃用 迁移为 hyperformula
    - 非常简单易用
    - ⚠️ 注意 - 不推荐使用
      - 功能很少
      - 没有 virtual
    - 依赖的 fast-formula-parser 相对比较大
      - +292kB/83kB
    - 渲染表格内容部分
    - 不支持: Pin, Frozen, Merge, Resize, Span
    - 数据为 matrix - 二维数组
  - [glideapps/glide-data-grid](https://github.com/glideapps/glide-data-grid)
    - MIT, TS
  - ~~[nadbm/react-datasheet](https://github.com/nadbm/react-datasheet)~~
    - MIT, JS
  - [nick-keller/react-datasheet-grid](https://github.com/nick-keller/react-datasheet-grid)
    - MIT, TS
    - npm:react-datasheet-grid
    - 84kB/22kB
    - 数据为 对象数组
    - 只支持 sticky right 列
    - 不支持 sticky left
    - 使用 @tanstack/react-virtual 作为虚拟滚动
    - deps: react-resize-detector
  - [blueprintjs/table](https://blueprintjs.com/docs/#table)
  - [ruilisi/fortune-sheet](./fortune-sheet.md)
    - fork Luckysheet
    - rewrite in ts
    - 移除 jQuery，依赖 React/Vue + immer
    - formula fork [handsontable/formula-parser](https://github.com/handsontable/formula-parser)
      - @formulajs/formula-parser
    - @fortune-sheet/core
      - 1.6MB/375kB - @formulajs/formulajs, lodash, jstat
    - @fortune-sheet/react
  - [silevis/reactgrid](https://github.com/silevis/reactgrid)
    - MIT, TS
    - npm:@silevis/reactgrid
    - 260kB/70kB
    - 支持: 多人、填充、多选、Column Resize、Column Reorder、Sticky columns and rows、Group
- https://en.wikipedia.org/wiki/Topological_sorting
- 商业
  - 葡萄城

## Word/Doc

- NodeJS/Browser
  - [docxjs](./docxjs.md)
- 商业

## LowCode DataTable

- [apitable/apitable](https://github.com/apitable/apitable)
  - AGPLv3, JS, Java
- supabase
- baserow
- nocodb
- [rowyio/rowy](https://github.com/rowyio/rowy)
  - for Firestore
- [gristlabs/grist-core](https://github.com/gristlabs/grist-core)
  - Apache-2.0, TS
  - SQLite

## 商业

- https://www.grapecity.com.cn/developer/spreadjs
  - adopted by https://yunnzhangfanng.com/
  - [@grapecity/spread-excelio](https://www.npmjs.com/package/@grapecity/spread-excelio)
    - SpreadJS JSON <-> XLSX
  - https://www.grapecity.com.cn/developer/spreadjs/price
    - ￥29, 400+￥22, 000
- onlyoffice

## 协议

- 打印
  - TCP/IP, IPX/SPX(支持 NDS), SMB(NetBEUI), LPD, IPP1.1, SNMP, Apple Talk
- 扫描
  - TCP/IP (FTP, SMB, SMTP, WebDAV) (IPv4/IPv6)
  - 邮件、FTP、BOX/硬盘、SMB、TWAIN、WebDAV、USB、Scan Server、Web Service/WSD-Scan、Device Profile for Web Service(DPWS)
- 互联网传真
  - SMTP, POP
- 传真
  - Super G3
  - PTSN
- 参考
  - [bizhub C458 A3 彩色多功能复合机](https://www.konicaminolta.com.cn/office-printing/copier/2018-11-30/159.html)
  - https://github.com/percx/Praeda/blob/master/jobs/MP0020.pl
  - https://www.konicaminolta.eu/eu-en/software
  - Bye CUPS: Printing with Netcat
    - [HN](https://news.ycombinator.com/item?id=28054789)
