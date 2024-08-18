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

## cfb

- application/x-cfb
  - .doc、.xls、.ppt
  - .ole
  - [[MS-CFB]: Compound File Binary File Format](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-cfb/53989ce4-7b05-4f8d-829b-d08d6148375b)
- https://www.loc.gov/preservation/digital/formats/fdd/fdd000380.shtml - cfb
- https://www.loc.gov/preservation/digital/formats/fdd/fdd000510.shtml - .xls
- https://www.loc.gov/preservation/digital/formats/fdd/fdd000511.shtml - .ppt
- https://www.loc.gov/preservation/digital/formats/fdd/fdd000509.shtml - .doc

## file-type

- NodeJS filte-type 只能检测到 cfb
  - cfb 为 .doc, .xls, .ppt, .msi 的 supertype
- 通过调用 ffprobe 来获取音频长度 [caffco/get-audio-duration](https://github.com/caffco/get-audio-duration)

## metadata

- probe -> 探测
- audio, video
  - ffprobe
- pdf
  - nodejs
    - [cantoo-scribe/pdf-lib](https://github.com/cantoo-scribe/pdf-lib)
      - npm @cantoo/pdf-lib
      - fork of [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib)
  - pdfinfo
  - exiftool

## exif

- exif - Exchangeable image file format
- iptc - International Press Telecommunications Council
- xmp - Extensible Metadata Platform
- icc - International Color Consortium
- mpf - Multi-Picture Format
- exiftool
- NodeJS
  - [mattiasw/ExifReader](https://github.com/mattiasw/ExifReader)
    - npm:exifreader
    - jpeg, tiff, png, heic, avif, webp
