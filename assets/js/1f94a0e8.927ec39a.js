"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["10119"],{78164:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>s,default:()=>a,assets:()=>l,toc:()=>f,frontMatter:()=>c});var r=JSON.parse('{"id":"service/document/libreoffice","title":"LibreOffice","description":"\u5F00\u6E90\u7684\u529E\u516C\u5957\u4EF6\u3002","source":"@site/../notes/service/document/libreoffice.md","sourceDirName":"service/document","slug":"/service/document/libreoffice","permalink":"/notes/service/document/libreoffice","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/document/libreoffice.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1712816934000,"frontMatter":{"title":"LibreOffice"},"sidebar":"docs","previous":{"title":"LibreOffice Online","permalink":"/notes/service/document/libreoffice-online"},"next":{"title":"uniluckysheetver","permalink":"/notes/service/document/luckysheet"}}'),i=t("52676"),o=t("79938");let c={title:"LibreOffice"},s="LibreOffice",l={},f=[{value:"soffice",id:"soffice",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"libreoffice",children:"LibreOffice"})}),"\n",(0,i.jsx)(n.p,{children:"\u5F00\u6E90\u7684\u529E\u516C\u5957\u4EF6\u3002"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/LibreOffice/core",children:"LibreOffice/core"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"GPL-3.0, MPL-2.0, LPL-3.0"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/unoconv/unoconv",children:"unoconv/unoconv"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"GPLv2, Python"}),"\n",(0,i.jsx)(n.li,{children:"Universal Office Converter"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u963F\u91CC\u4E91\u955C\u50CF - ",(0,i.jsx)(n.a,{href:"https://mirrors.aliyun.com/tdf/libreoffice/stable/7.3.3/mac/x86_64/",children:"https://mirrors.aliyun.com/tdf/libreoffice/stable/7.3.3/mac/x86_64/"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"soffice",children:"soffice"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'soffice --headless --nologo --norestore --nofirststartwizard -- accept="socket,host=0,port=8100;urp"\n# PID\nps ax | grep "soffice.bin --headless" | grep -v grep | cut -d \\  -f 1\n\nloffice "--accept=socket,host=localhost,port=2002;urp;" --writer\n\n# by running urp\nsoffice "--accept=socket,host=localhost,port=2083;urp;StarOffice.ServiceManager"\ncat << HTML\n<!DOCTYPE html>\n<html>\n<body>\n<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>\n</body>\n</html>\nHTML\nunoconv --connection \'socket,host=127.0.0.1,port=2220,tcpNoDelay=1;urp;StarOffice.ComponentContext\' -f pdf test.html\n\n#\nsoffice \\\n  --headless \\\n  "-env:UserInstallation=file:///tmp/LibreOffice_Conversion_${USER}" \\\n  --convert-to pdf:writer_pdf_Export \\\n  --outdir pdfs \\\n  test.docx\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'--infilter="Microsoft Word 2007/2010/2013 XML"\n--infilter="Microsoft Word 2007-2013 XML"\n--infilter="Microsoft Word 2007-2013 XML Template"\n--infilter="Microsoft Word 95 Template"\n--infilter="MS Word 95 Vorlage"\n--infilter="Microsoft Word 97/2000/XP Template"\n--infilter="MS Word 97 Vorlage"\n--infilter="Microsoft Word 2003 XML"\n--infilter="MS Word 2003 XML"\n--infilter="Microsoft Word 2007 XML Template"\n--infilter="MS Word 2007 XML Template"\n--infilter="Microsoft Word 6.0"\n--infilter="MS WinWord 6.0"\n--infilter="Microsoft Word 95"\n--infilter="MS Word 95"\n--infilter="Microsoft Word 97/2000/XP"\n--infilter="MS Word 97"\n--infilter="Microsoft Word 2007 XML"\n--infilter="MS Word 2007 XML"\n--infilter="Microsoft WinWord 5"\n--infilter="MS WinWord 5"\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'--infilter="HTML Document"                      # for HTML input\n--infilter="MediaWiki"                          # for MediaWiki input\n--infilter="Text CSV"                           # for CSV spreadsheet input\n--infilter="Microsoft PowerPoint 2007/2010 XML" # for PPTX input\n--infilter="Microsoft PowerPoint 97/2000/XP"    # for PPT input\n--infilter="Windows Metafile"                   # for WMF input\n--infilter="Enhanced Metafile"                  # for EMF input\n--infilter="Scalable Vector Graphics"           # for SVG input\n--infilter="Microsoft Excel 2007/2010 XML"      # for XLSX input\n--infilter="Microsoft Excel 97/2000/XP"         # for XLS input\n--infilter="Microsoft Excel 95"                 # for some XLS input\n--infilter="Microsoft Excel 5.0"                # for some XLS input\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"--convert-to pdf:writer_pdf_Export\n--convert-to pdf:calc_pdf_Export\n--convert-to pdf:draw_pdf_Export\n--convert-to pdf:impress_pdf_Export\n--convert-to pdf:writer_web_pdf_Export\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'--convert-to html:HTML\n--convert-to html:draw_html_Export                 # force "Draw" to generate the HTML\n--convert-to mediawiki:MediaWiki_Web               # generate MediaWiki output\n--convert-to csv:"Text - txt - csv (StarCalc)"     # generate CSV spreadsheet output\n--convert-to pptx:"Impress MS PowerPoint 2007 XML" # generate PPTX\n--convert-to ppt:"MS PowerPoint 97"                # generate PPT\n--convert-to wmf:impress_wmf_Export                # force "Impress" to generate the WMF\n--convert-to wmf:draw_wmf_Export                   # force "Draw" to generate the WMF\n--convert-to emf:impress_emf_Export                # force "Impress" to generate the EMF\n--convert-to emf:draw_emf_Export                   # force "Draw" to generate the EMF\n--convert-to svg:impress_svg_Export                # force "Impress" to generate the SVG\n--convert-to svg:draw_svg_Export                   # force "Draw" to generate the SVG\n--convert-to xlsx:"Calc MS Excel 2007 XML"         # generate XLSX\n--convert-to xls:"MS Excel 97"                     # generate XLS like Excel 97\n--convert-to xls:"MS Excel 95"                     # generate XLS like Excel 95\n--convert-to xls:"MS Excel 5.0/95"                 # generate XLS like Excel 5.0/95\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["URP - UNO Remote Protocol\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.libreoffice.org/binaryurp.html",children:"https://docs.libreoffice.org/binaryurp.html"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.systutorials.com/docs/linux/man/1-soffice/",children:"https://www.systutorials.com/docs/linux/man/1-soffice/"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://stackoverflow.com/a/30465397/1870054",children:"https://stackoverflow.com/a/30465397/1870054"})}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return s},a:function(){return c}});var r=t(75271);let i={},o=r.createContext(i);function c(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);