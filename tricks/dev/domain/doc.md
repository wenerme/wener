# Document

## Tips
* libreoffice
  * Java UNO API
  * https://hub.docker.com/r/libreoffice/online/
  * [5.3 ReleaseNotes](https://wiki.documentfoundation.org/ReleaseNotes/5.3/zh-hans)
* docx4j
  * 转 PDF
    * 页眉页脚支持的不太好
    * 表格内容可垂直居中
* xdocreport
  * 支持从 ODT, ODS, ODP, DOCX, PPTX 转为 PDF, FO, XHTML 可使用  ODFDOM, DOCX4J, XWPF 进行转换
  * 转 PDF
    * via XWPF
      * 页眉页脚支持的不太好
  * 支持模板
  * 支持直接将 POI 转换为 PDF
* apache poi
  * [changes](https://poi.apache.org/changes.html)
* apache fop
* apache pdfbox
* itext
* NOTE
  * 转换 PDF 时一定要注意有 SumSun 字体


组件 | 应用类型
----|----
POIFS	     | OLE2 Filesystem
HPSF	     | OLE2 Property Sets
HSSF	     | Excel XLS
HSLF	     | PowerPoint PPT
HWPF	     | Word DOC
HDGF	     | Visio VSD
HPBF	     | Publisher PUB
HSMF	     | Outlook MSG
DDF	       | Escher common drawings
HWMF	     | WMF drawings
OpenXML4J	 | OOXML
XSSF	     | Excel XLSX
XSLF	     | PowerPoint PPTX
XWPF	     | Word DOCX
XDGF	     | Visio VSDX
Common SL	 | PowerPoint PPT and PPTX
Common SS	 | Excel XLS and XLSX


```java
/**
 * Docx4J
 */
// 添加字体
new FontFileFinder()
    .find("/Applications/Microsoft Word.app/Contents/Resources/Fonts/")
    .forEach(v -> PhysicalFonts.addPhysicalFont((URL) v));
// 映射字体名字
PhysicalFonts.put("宋体", checkNotNull(PhysicalFonts.get("SimSun")));
PhysicalFonts.put("黑体", checkNotNull(PhysicalFonts.get("SimHei")));

// 转换为 PDF
WordprocessingMLPackage wordMLPackage = Docx4J.load(new java.io.File("./test.docx"));
Docx4J.toPDF(wordMLPackage, new FileOutputStream("./test.pdf"));

/**
 * xdocreport
 */
// itext2 添加字体
com.lowagie.text.FontFactory.registerDirectory("/Applications/Microsoft Word.app/Contents/Resources/Fonts/");
// 使用 IConverter 进行转换
Options options = Options.getFrom(DocumentKind.DOCX).to(ConverterTypeTo.PDF).via("ODFOM");
IConverter converter = ConverterRegistry.getRegistry().findConverter(options);
converter.convert(new FileInputStream("./test.docx"), new FileOutputStream("./test.pdf"), options);

// 直接转换 POI
XWPFDocument doc = new XWPFDocument(new FileInputStream("./test.docx"));
PdfOptions options = PdfOptions.create();
PdfConverter converter = new PdfConverter();
converter.convert(doc, new FileOutputStream("./test.pdf"), options);
```
