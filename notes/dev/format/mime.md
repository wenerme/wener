---
title: MIME
---

# mime

| name          | for                         |
| ------------- | --------------------------- |
| mime          | `text/plain; charset=utf-8` |
| mime type     | `text/plain`                |
| mime encoding | `charset=utf-8`             |

| mime                     | for                  |
| ------------------------ | -------------------- |
| application/octet-stream | 通用 fallback        |
| application/octet-binary | 通用 fallback - 静态 |
| text/plain               | 文本                 |

| extension | mime                                                                      |
| --------- | ------------------------------------------------------------------------- |
| MS Office |
| .doc      | application/msword                                                        |
| .dot      | application/msword                                                        |
| -         | -                                                                         |
| .docx     | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| .dotx     | application/vnd.openxmlformats-officedocument.wordprocessingml.template   |
| .docm     | application/vnd.ms-word.document.macroEnabled.12                          |
| .dotm     | application/vnd.ms-word.template.macroEnabled.12                          |
| -         |
| .xls      | application/vnd.ms-excel                                                  |
| .xlt      | application/vnd.ms-excel                                                  |
| .xla      | application/vnd.ms-excel                                                  |
| -         |
| .xlsx     | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         |
| .xltx     | application/vnd.openxmlformats-officedocument.spreadsheetml.template      |
| .xlsm     | application/vnd.ms-excel.sheet.macroEnabled.12                            |
| .xltm     | application/vnd.ms-excel.template.macroEnabled.12                         |
| .xlam     | application/vnd.ms-excel.addin.macroEnabled.12                            |
| .xlsb     | application/vnd.ms-excel.sheet.binary.macroEnabled.12                     |
| -         |
| .ppt      | application/vnd.ms-powerpoint                                             |
| .pot      | application/vnd.ms-powerpoint                                             |
| .pps      | application/vnd.ms-powerpoint                                             |
| .ppa      | application/vnd.ms-powerpoint                                             |
| -         |
| .pptx     | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| .potx     | application/vnd.openxmlformats-officedocument.presentationml.template     |
| .ppsx     | application/vnd.openxmlformats-officedocument.presentationml.slideshow    |
| .ppam     | application/vnd.ms-powerpoint.addin.macroEnabled.12                       |
| .pptm     | application/vnd.ms-powerpoint.presentation.macroEnabled.12                |
| .potm     | application/vnd.ms-powerpoint.template.macroEnabled.12                    |
| .ppsm     | application/vnd.ms-powerpoint.slideshow.macroEnabled.12                   |
| -         |
| .mdb      | application/vnd.ms-access                                                 |

---

- [Mismatch between Content-Type and file extension on the web](https://github.com/tc39/proposal-import-assertions/blob/master/content-type-vs-file-extension.md)
- [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
- https://www.freeformatter.com/mime-types-list.html
- https://www.iana.org/assignments/media-types/media-types.xhtml
- https://mimetype.io/all-types/
