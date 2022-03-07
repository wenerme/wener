---
title: fonoster
---

# fonoster

- [fonoster/fonoster](https://github.com/fonoster/fonoster)
  - MIT, JS+TS

```bash
# https://github.com/fonoster/fonoster/blob/main/Dockerfile
# https://github.com/fonoster/fonoster/blob/main/install.sh
docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $PWD/data:/out:rw \
  -p 50051:50051 \
  --entrypoint bash fonoster/fonoster:0.3.3
```

- /work/
  - operator/
    - .env - 主要配置
- [install.sh](https://github.com/fonoster/fonoster/blob/main/install.sh)
  - 配置 /work/operator/.env
  - 复制 /work 到 /out
  - docker volume create
  - docker-compose -f init.yml up service_creds user_creds
  - docker-compose -f init.yml up create_buckets bootstrap_sipnet
- [operator/compose/init.yml](https://github.com/fonoster/fonoster/blob/main/operator/compose/init.yml)

| env               | default       |
| ----------------- | ------------- |
| DOCKER_HOST_IP    |
| DOMAIN            |
| ENABLE_TLS        | false         |
| HTTP_PORT         | 50051         |
| HTTPS_PORT        | 443           |
| LETSENCRYPT_EMAIL | admin@$DOMAIN |
| GLOBAL_SIP_DOMAIN |

## Notes

- https://learn.fonoster.com/docs/overview
