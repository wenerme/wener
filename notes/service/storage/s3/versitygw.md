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

docker exec -it versitygw sh

ROOT_ACCESS_KEY=myaccess ROOT_SECRET_KEY=mysecret ./versitygw --cert $PWD/cert.pem --key $PWD/cert.key posix /tmp/gw

export ADMIN_REGION=cn-sh-1
export ADMIN_ACCESS_KEY_ID=$ROOT_ACCESS_KEY
export ADMIN_SECRET_ACCESS_KEY=$ROOT_SECRET_KEY
export ADMIN_ENDPOINT_URL=http://localhost:7070
export ADMIN_ALLOW_INSECURE=true

versitygw admin list-buckets
# 多用户模式
versitygw admin list-users


# xattr
apk add attr
# user.policy={}
getfattr -d ./buckets/contents/
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

## Public Read

```bash
# 1. 配置 AWS CLI
aws configure set aws_access_key_id your-root-access-key
aws configure set aws_secret_access_key your-root-secret-key
aws configure set default.region us-east-1
aws configure set default.s3.signature_version s3v4

# 2. 设置 endpoint
export AWS_ENDPOINT_URL=http://your-versitygw-host:port

# 3. 创建 bucket policy 文件
cat > public-read-policy.json << EOF
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
EOF

# 4. 应用 bucket policy
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://public-read-policy.json --endpoint-url $AWS_ENDPOINT_URL

# 5. 或者设置 ACL
aws s3api put-bucket-acl --bucket your-bucket-name --acl public-read --endpoint-url $AWS_ENDPOINT_URL
```
