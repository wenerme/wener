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
- IAM
  - 内置 IAM
    - --iam-dir, 存储用户到 users.json
  - S3 - 使用外部 S3 存储用户信息
  - Vault - 使用 vault kv-v2 存储用户信息
  - LDAP
  - FreeIPA

```bash
docker run --rm -it \
  -e ROOT_ACCESS_KEY=KEY \
  -e ROOT_SECRET_KEY=SECRET \
  -v ./versitygw/data:/data \
  -v ./versitygw/meta:/meta \
  -p 7070:7070 \
  --name versitygw versity/versitygw posix /data --sidecar /meta/metadata --versioning-dir /meta/versioning --bucketlinks

ROOT_ACCESS_KEY=myaccess ROOT_SECRET_KEY=mysecret ./versitygw --cert $PWD/cert.pem --key $PWD/cert.key posix /tmp/gw

ADMIN_ACCESS_KEY_ID=$ROOT_ACCESS_KEY
ADMIN_SECRET_ACCESS_KEY=$ROOT_SECRET_KEY
ADMIN_REGION=cn-sh-1
ADMIN_ENDPOINT_URL=http://localhost:7070
ADMIN_ALLOW_INSECURE=true

/app/versitygw admin list-buckets
# 多用户模式
/app/versitygw admin list-users
```

```
VGW_BACKEND=posix
VGW_BACKEND_ARG=<gateway_root_path>
ROOT_ACCESS_KEY_ID=<access_key>
ROOT_SECRET_ACCESS_KEY=<secret_key>
```

IAM users.json

```json
{
  "accessAccounts": {
    "admin": {
      "access": "KEY_ID",
      "secret": "ACCESS_KEY",
      "role": "admin",
      "userID": 0,
      "groupID": 0
    }
  }
}
```

# FAQ

## api error XAdminMethodNotSupported: The method is not supported in single root user mode.
