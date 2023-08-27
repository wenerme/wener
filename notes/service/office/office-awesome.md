---
tags:
  - Awesome
---

# Office Awesome

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

## Library

- Java
  - apache poi
  - [alibaba/easyexcel](https://github.com/alibaba/easyexcel)
- Javascript/NodeJS
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
  - [handsontable/hyperformula](https://github.com/handsontable/hyperformula)
  - [foliojs](https://github.com/foliojs)
    - [foliojs/pdfkit](https://github.com/foliojs/pdfkit)
      - MIT, JavaScript
      - JavaScript PDF generation library for Node and the browser
    - fontkit
    - png.js
    - brotli.js
  - [mgcrea/node-xlsx](https://github.com/mgcrea/node-xlsx)
    - based on sheetjs
- React Table
  - [adazzle/react-data-grid](https://github.com/adazzle/react-data-grid)
    - MIT
  - [nadbm/react-datasheet](https://github.com/nadbm/react-datasheet)
    - MIT, JS
  - [iddan/react-spreadsheet](https://github.com/iddan/react-spreadsheet)
- Golang
  - [qax-os/excelize](https://github.com/qax-os/excelize)
  - [unidoc/unioffice](https://github.com/unidoc/unioffice)
    - .docx, .xlsx, .pptx
- PHP
  - [PHPOffice/PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)
- [FancyGrid/awesome-grid](https://github.com/FancyGrid/awesome-grid)
- PDF
  - [mozilla/pdf.js](https://github.com/mozilla/pdf.js)
    - Apache-2.0, Javascript
    - PDF Reader
    - [ZEISS/react-view-pdf](https://github.com/ZEISS/react-view-pdf)
  - [wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf)
    - MIT, Javascript
    - Viewer
  - [diegomura/react-pdf](https://github.com/diegomura/react-pdf)
    - MIT, Javascript
    - Builder
- 应用
  - [kevinschaich/mintable](https://github.com/kevinschaich/mintable)
    - personal finances

## Sheet

- [dream-num/Luckysheet](./luckysheet.md)
- [ruilisi/fortune-sheet](./fortune-sheet.md)
  - fork Luckysheet
  - rewrite in ts
  - 移除 jQuery，依赖 React/Vue + immer
  - formula fork [handsontable/formula-parser](https://github.com/handsontable/formula-parser)
    - @formulajs/formula-parser
  - @fortune-sheet/core
    - 1.6MB/375kB - @formulajs/formulajs, lodash, jstat
  - @fortune-sheet/react
- [sheetjs](./sheetjs.md)
- [handsontable/handsontable](https://github.com/handsontable/handsontable)
  - license 不允许商业产品使用
- [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)
  - canvas
  - -> [wolf-table/table](https://github.com/wolf-table/table)
- [jspreadsheet/ce](https://github.com/jspreadsheet/ce)
  - MIT
- [nadbm/react-datasheet](https://github.com/nadbm/react-datasheet)
- [nhn/tui.grid](https://github.com/nhn/tui.grid)
- [future-architect/cheetah-grid](https://github.com/future-architect/cheetah-grid)

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
