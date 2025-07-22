---
title: versitygw
---

# versitygw

- [versity/versitygw](https://github.com/versity/versitygw)
  - Apache-2.0, Go
  - S3 Gateway
  - Local -> S3
  - S3 -> S3
- Backend
  - posix
    - metadata
      - xattrs
      - --sidecar/VGW_META_SIDECAR - 存储到一个额外目录
    - `<bucket>/.sgwtmp/multipart/<obj-hash>/<uploadid>`
    - `<bucket>/.sgwtmp/multipart/<obj-hash>/<uploadid>/<part>.<random>`
    - `<bucket>/.sgwtmp/<obj-hash>.<random>`
  - ScoutFS
  - S3
  - Azure

```bash
docker run --rm -it \
  -e ROOT_ACCESS_KEY=KEY \
  -e ROOT_SECRET_KEY=SECRET \
  -v ./versitygw/data:/data \
  -v ./versitygw/meta:/meta \
  -p 7070:7070 \
  --name versitygw versity/versitygw posix /data --sidecar /meta/metadata --versioning-dir /meta/versioning --bucketlinks

ROOT_ACCESS_KEY=myaccess ROOT_SECRET_KEY=mysecret ./versitygw --cert $PWD/cert.pem --key $PWD/cert.key posix /tmp/gw
```

```
VGW_BACKEND=posix
VGW_BACKEND_ARG=<gateway_root_path>
ROOT_ACCESS_KEY_ID=<access_key>
ROOT_SECRET_ACCESS_KEY=<secret_key>
```
