---
title: Google Cloud Platform (GCP)
tags:
  - Platform
  - Google
  - GCP
  - Cloud
---

# Google Cloud Platform (GCP)

## Tips

- [gsutil](https://cloud.google.com/storage/docs/gsutil)

```bash
# 安装 bq, gcloud, git-credential-gcloud, gsutil
# https://cloud.google.com/sdk/gcloud/reference/
# brew cask install google-cloud-sdk
curl https://sdk.cloud.google.com | bash
export PATH=~/google-cloud-sdk/bin:$PATH

# 支持的语言
# https://cloud.google.com/vision/docs/languages
# https://cloud.google.com/sdk/gcloud/reference/beta/ml/vision/detect-text

gcloud config set project PROJECT_ID

# `gcloud auth login` no longer writes application default credentials.
# If you need to use ADC, see:
gcloud auth application-default --help

# 交互界面
gcloud beta interactive

#
gcloud config set disable_usage_reporting true

#
```

## Function

- [HTTP Tutorials](https://cloud.google.com/functions/docs/tutorials/http)

## Compute

- [Compute Pricing](https://cloud.google.com/compute/pricing)

## Storage

### Datastore

- [Cloud Datastore](https://cloud.google.com/datastore/)
- Cloud Datastore is a highly-scalable NoSQL database for your web and mobile applications
- [Pricing](https://cloud.google.com/datastore/pricing)
- 免费额度 - 东京
  - 1 G/月 $.23
  - 50000 读/月 $.08/100,000
  - 20000 写/月 $.23/100,000
  - 20000 删/月 $.03/100,000
