---
title: OPA
---

# Minio OPA

- Minio - https://github.com/minio/minio/blob/master/docs/iam/opa.md

```bash
export MINIO_POLICY_PLUGIN_URL=http://localhost:8181/v1/data/httpapi/authz/allow
```

```json
{
  "input": {
    "account": "minio",
    "groups": null,
    "action": "s3:ListBucket",
    "bucket": "test",
    "conditions": {
      "Authorization": [
        "AWS4-HMAC-SHA256 Credential=minio/20220507/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=62012db6c47d697620cf6c68f0f45f6e34894589a53ab1faf6dc94338468c78a"
      ],
      "CurrentTime": ["2022-05-07T18:31:41Z"],
      "Delimiter": ["/"],
      "EpochTime": ["1651948301"],
      "Prefix": [""],
      "Referer": [""],
      "SecureTransport": ["false"],
      "SourceIp": ["127.0.0.1"],
      "User-Agent": ["MinIO (linux; amd64) minio-go/v7.0.24 mc/DEVELOPMENT.2022-04-20T23-07-53Z"],
      "UserAgent": ["MinIO (linux; amd64) minio-go/v7.0.24 mc/DEVELOPMENT.2022-04-20T23-07-53Z"],
      "X-Amz-Content-Sha256": ["e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"],
      "X-Amz-Date": ["20220507T183141Z"],
      "authType": ["REST-HEADER"],
      "principaltype": ["Account"],
      "signatureversion": ["AWS4-HMAC-SHA256"],
      "userid": ["minio"],
      "username": ["minio"],
      "versionid": [""]
    },
    "owner": true,
    "object": "",
    "claims": {},
    "denyOnly": false
  }
}
```
