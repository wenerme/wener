---
title: Minio FAQ
---

# Minio FAQ

## 只允许访问单个 Bucket

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::demo/*"]
    }
  ]
}
```

## 基于 Bucket 前缀限制访问

实现类似多租户能力

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::demo-*"]
    }
  ]
}
```

## writeonly

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}
```

## readonly

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetBucketLocation", "s3:GetObject"],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}
```

## readwrite

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}
```

## ConsoleAdmin

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["admin:*"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}
```

## diagnostics

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "admin:OBDInfo",
        "admin:Profiling",
        "admin:ServerInfo",
        "admin:ServerTrace",
        "admin:TopLocksInfo",
        "admin:ConsoleLog"
      ],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}
```
