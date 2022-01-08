---
title: Thanos 版本
---

# Thanos 版本

- https://github.com/thanos-io/thanos/blob/main/CHANGELOG.md

## 0.21

- api 添加 tls 和 basic auth
- ui 支持 暗黑主题
- label matcher

## 0.20

- query 联邦 exemplars 接口
- ui 默认 react 版

## 0.19

- frontend 添加 --query-range.request-downsampled
  - 响应为空或不完整时请求下采样的数据
- cache 支持内存缓存 bucket
- receiver 添加 --tsdb.allow-overlapping-blocks
  - 支持上传有交叉的数据块

## 0.18

- 查询性能优化
- `thanos tools bucket rewrite`
  - 重写删除序列
- `thanos tools bucket replicate`
  - 支持基于 block ID 复制
- Query Frontend 代理 labels 和 series
- [v0.18.0](https://github.com/thanos-io/thanos/releases/tag/v0.18.0)

## 0.17

- BlockViewer 支持下载 meta.json - Compact/Web UI
- `thanos query-frontend` - 支持 label 名字和值 查询分片、重试
- `thanos tools bucket replicate` - 支持通过 ID 和时间段 复制
- `thanos query` - using dynamic lookback delta when downsampled data is used by default
- Compactor 会注意 64GB 索引限制，会避免进行压缩 - 通过上传 no-compact-mark.json 也能控制不压缩
- `thanos tools bucket mark` 标记不压缩或删除
- `--store.enable-index-header-lazy-reader` - 启用后 store 只会 mmap 部分必要信息，下一个版本为默认开启
