---
title: Thanos 版本
---

# Thanos 版本

## 0.18
* 查询性能优化
* `thanos tools bucket rewrite`
  * 重写删除序列
* `thanos tools bucket replicate`
  * 支持基于 block ID 复制
* Query Frontend 代理 labels 和 series
* [v0.18.0](https://github.com/thanos-io/thanos/releases/tag/v0.18.0)

## 0.17

* BlockViewer 支持下载 meta.json - Compact/Web UI
* `thanos query-frontend` - 支持 label 名字和值 查询分片、重试
* `thanos tools bucket replicate` - 支持通过 ID 和时间段 复制
* `thanos query` - using dynamic lookback delta when downsampled data is used by default
* Compactor 会注意 64GB 索引限制，会避免进行压缩 - 通过上传 no-compact-mark.json 也能控制不压缩
* `thanos tools bucket mark` 标记不压缩或删除
* `--store.enable-index-header-lazy-reader` - 启用后 store 只会 mmap 部分必要信息，下一个版本为默认开启
