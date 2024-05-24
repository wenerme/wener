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
  - [exceljs/exceljs](https://github.com/exceljs/exceljs)
    - MIT, JS
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
- Golang
  - [unidoc/unioffice](https://github.com/unidoc/unioffice)
    - .docx, .xlsx, .pptx
- PHP
  - [PHPOffice/PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)
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

- Javascript/TyepScript
  - [mozilla/pdf.js](https://github.com/mozilla/pdf.js)
    - Apache-2.0, Javascript
    - PDF Reader
    - NPM pdfjs-dist @types/pdfjs-dist
    - [ZEISS/react-view-pdf](https://github.com/ZEISS/react-view-pdf)
  - [modesty/pdf2json](https://github.com/modesty/pdf2json)
    - Apache-2.0, JS
    - 使用 @xmldom/xmldom
- React
  - [wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf)
    - MIT, Javascript
    - Viewer
  - [diegomura/react-pdf](https://github.com/diegomura/react-pdf)
    - MIT, Javascript
    - Builder

## Sheet/Excel

- Java
  - [alibaba/easyexcel](https://github.com/alibaba/easyexcel)
- Golang
  - [qax-os/excelize](https://github.com/qax-os/excelize)
- JS/TyepScript
  - [sheetjs](./sheet/sheetjs.md)
  - [dream-num/Luckysheet](./luckysheet.md)
  - [future-architect/cheetah-grid](https://github.com/future-architect/cheetah-grid)
    - Vue, React
  - [handsontable/handsontable](https://github.com/handsontable/handsontable)
    - license 不允许商业产品使用
  - [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)
    - canvas
    - -> [wolf-table/table](https://github.com/wolf-table/table)
  - [jspreadsheet/ce](https://github.com/jspreadsheet/ce)
    - MIT
  - [nhn/tui.grid](https://github.com/nhn/tui.grid)
  - [LesterLyu/fast-formula-parser](https://github.com/LesterLyu/fast-formula-parser)
    - MIT, JS
    - 300kB,83kB
    - Parse and evaluate MS Excel formula in javascript.
  - [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
    - GPLv3, TS
  - [revolist/revogrid](https://github.com/revolist/revogrid)
    - MIT, TS
    - React, Vue
  - [501351981/vue-office](https://github.com/501351981/vue-office)
- React Table
  - [adazzle/react-data-grid](https://github.com/adazzle/react-data-grid)
    - MIT
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
  - [iddan/react-spreadsheet](https://github.com/iddan/react-spreadsheet)
    - MIT, TS
    - npm:react-spreadsheet
    - deps: @linaria/core
    - 40kB/12kB
    - 非常简单易用
    - ⚠️ 注意 - 不推荐使用
      - 功能很少
      - 没有 virtual
    - 依赖的 fast-formula-parser 相对比较大
      - +292kB/83kB
    - 渲染表格内容部分
    - 不支持: Pin, Frozen, Merge, Resize
    - 数据为 matrix - 二维数组
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
