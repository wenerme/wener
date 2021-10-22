---
title: C Cookbook
---

# C Cookbook

- [git/banned.h](https://github.com/git/git/blob/master/banned.h)
  - 不推荐用这些接口
  - 因为容易有歧义，经常踩坑
  - 看[提交历史](https://github.com/git/git/commits/master/banned.h)有原因说明

| banned                         | alt                              | reason                                             |
| ------------------------------ | -------------------------------- | -------------------------------------------------- |
| ctime_r, asctime_r             | strftime,strbuf_addftime         | reentrant, but no check the buffer is long enough  |
| gmtime,localtime,ctime,asctime |                                  | return pointers to shared storage, not thread-safe |
| sprintf,vsprintf               | strbuf,xstrfmt,xsnprintf         | buffer overflow                                    |
| strcpy,strcat,                 | strbuf,xstrfmt,xsnprintf         | 越界                                               |
| strncpy                        | strlcpy,strbuf,xstrfmt,xsnprintf | NUL terminator                                     |
| strncat                        |                                  | quadratic behavior                                 |

## 定义宏移除方法

```c
#define	assert(x) (void)0
```
