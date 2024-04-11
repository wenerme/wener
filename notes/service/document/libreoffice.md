---
title: LibreOffice
---

# LibreOffice

开源的办公套件。

- [LibreOffice/core](https://github.com/LibreOffice/core)
  - GPL-3.0, MPL-2.0, LPL-3.0
- [unoconv/unoconv](https://github.com/unoconv/unoconv)
  - GPLv2, Python
  - Universal Office Converter
- 阿里云镜像 - https://mirrors.aliyun.com/tdf/libreoffice/stable/7.3.3/mac/x86_64/

## soffice

```bash
soffice --headless --nologo --norestore --nofirststartwizard -- accept="socket,host=0,port=8100;urp"
# PID
ps ax | grep "soffice.bin --headless" | grep -v grep | cut -d \  -f 1

loffice "--accept=socket,host=localhost,port=2002;urp;" --writer

# by running urp
soffice "--accept=socket,host=localhost,port=2083;urp;StarOffice.ServiceManager"
cat << HTML
<!DOCTYPE html>
<html>
<body>
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
</body>
</html>
HTML
unoconv --connection 'socket,host=127.0.0.1,port=2220,tcpNoDelay=1;urp;StarOffice.ComponentContext' -f pdf test.html

#
soffice \
  --headless \
  "-env:UserInstallation=file:///tmp/LibreOffice_Conversion_${USER}" \
  --convert-to pdf:writer_pdf_Export \
  --outdir pdfs \
  test.docx
```

```
--infilter="Microsoft Word 2007/2010/2013 XML"
--infilter="Microsoft Word 2007-2013 XML"
--infilter="Microsoft Word 2007-2013 XML Template"
--infilter="Microsoft Word 95 Template"
--infilter="MS Word 95 Vorlage"
--infilter="Microsoft Word 97/2000/XP Template"
--infilter="MS Word 97 Vorlage"
--infilter="Microsoft Word 2003 XML"
--infilter="MS Word 2003 XML"
--infilter="Microsoft Word 2007 XML Template"
--infilter="MS Word 2007 XML Template"
--infilter="Microsoft Word 6.0"
--infilter="MS WinWord 6.0"
--infilter="Microsoft Word 95"
--infilter="MS Word 95"
--infilter="Microsoft Word 97/2000/XP"
--infilter="MS Word 97"
--infilter="Microsoft Word 2007 XML"
--infilter="MS Word 2007 XML"
--infilter="Microsoft WinWord 5"
--infilter="MS WinWord 5"
```

```
--infilter="HTML Document"                      # for HTML input
--infilter="MediaWiki"                          # for MediaWiki input
--infilter="Text CSV"                           # for CSV spreadsheet input
--infilter="Microsoft PowerPoint 2007/2010 XML" # for PPTX input
--infilter="Microsoft PowerPoint 97/2000/XP"    # for PPT input
--infilter="Windows Metafile"                   # for WMF input
--infilter="Enhanced Metafile"                  # for EMF input
--infilter="Scalable Vector Graphics"           # for SVG input
--infilter="Microsoft Excel 2007/2010 XML"      # for XLSX input
--infilter="Microsoft Excel 97/2000/XP"         # for XLS input
--infilter="Microsoft Excel 95"                 # for some XLS input
--infilter="Microsoft Excel 5.0"                # for some XLS input
```

```
--convert-to pdf:writer_pdf_Export
--convert-to pdf:calc_pdf_Export
--convert-to pdf:draw_pdf_Export
--convert-to pdf:impress_pdf_Export
--convert-to pdf:writer_web_pdf_Export
```

```
--convert-to html:HTML
--convert-to html:draw_html_Export                 # force "Draw" to generate the HTML
--convert-to mediawiki:MediaWiki_Web               # generate MediaWiki output
--convert-to csv:"Text - txt - csv (StarCalc)"     # generate CSV spreadsheet output
--convert-to pptx:"Impress MS PowerPoint 2007 XML" # generate PPTX
--convert-to ppt:"MS PowerPoint 97"                # generate PPT
--convert-to wmf:impress_wmf_Export                # force "Impress" to generate the WMF
--convert-to wmf:draw_wmf_Export                   # force "Draw" to generate the WMF
--convert-to emf:impress_emf_Export                # force "Impress" to generate the EMF
--convert-to emf:draw_emf_Export                   # force "Draw" to generate the EMF
--convert-to svg:impress_svg_Export                # force "Impress" to generate the SVG
--convert-to svg:draw_svg_Export                   # force "Draw" to generate the SVG
--convert-to xlsx:"Calc MS Excel 2007 XML"         # generate XLSX
--convert-to xls:"MS Excel 97"                     # generate XLS like Excel 97
--convert-to xls:"MS Excel 95"                     # generate XLS like Excel 95
--convert-to xls:"MS Excel 5.0/95"                 # generate XLS like Excel 5.0/95
```

- URP - UNO Remote Protocol
  - https://docs.libreoffice.org/binaryurp.html
- https://www.systutorials.com/docs/linux/man/1-soffice/
- https://stackoverflow.com/a/30465397/1870054
