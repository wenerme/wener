---
title: Nginx 调优
---

# Nginx 调优

- [Performance Tuning – Tips & Tricks](https://www.nginx.com/blog/performance-tuning-tips-tricks/)
- listen 80 reuseport

## proxy_buffer

- Disabling response buffering is necessary only for applications that need immediate access to the data stream.
