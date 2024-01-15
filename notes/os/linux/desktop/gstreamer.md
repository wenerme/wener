---
title: gstreamer
---

# gstreamer

- [GStreamer](https://github.com/GStreamer)
  - flexible, fast and multiplatform multimedia framework
- 参考
  - https://gstreamer.freedesktop.org/

| env                    | for                                                |
| ---------------------- | -------------------------------------------------- |
| GST_PLUGIN_SYSTEM_PATH | `.local/share/gstreamer-GST_API_VERSION`           |
| GST_DEBUG              | 1=DEBUG,WARNING,FIXME,INFO,DEBUG,LOG,TRACE,MEMDUMP |
| GST_DEBUG_NO_COLOR     |
| GST_DEBUG_COLOR_MODE   | auto=on,disable=off,unix                           |
| GST_DEBUG_OPTIONS      |
| GST_DEBUG_DUMP_DOT_DIR |

- GST_DEBUG
  - 可以针对组件 `GST_AUTOPLUG:6,GST_ELEMENT_*:4`
- https://gstreamer.freedesktop.org/documentation/gstreamer/running.html
