---
title: 搜狗词库 SCEL 格式
---

# 搜狗词库 SCEL 格式

- 字符串编码使用 `UTF-16LE`
- 文件内容分为 头、拼音、词条
- 词条的拼音为拼音索引而不是具体值
- 头内容包括
  - 名字
  - 类型
  - 描述
  - 示例
- 文件魔法数字/MAGIC

## 参考

- 下载词库 https://pinyin.sogou.com/dict/detail/index/1
