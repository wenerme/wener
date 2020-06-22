---
id: minio
title: Minio
---

# Minio

## Tips

* 集群
  * 至少需要 4 个节点
  * 启动需要双数磁盘
  * 最多 16 个磁盘,  erasure code
  * 在 (n/2 + 1) 磁盘有效时, 集群有效, 可写
  * 只有 n/2 磁盘有效时, 只读
  * 一个节点可以包含多个磁盘
* Reed-Solomon code
* [minio/awesome-minio](https://github.com/minio/awesome-minio)
* https://play.minio.io:9000
  * Q3AM3UQ867SPQQA43P2F
  * zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG
* [config.json](https://docs.minio.io/docs/minio-server-configuration-guide)
  * 默认配置目录为 `${HOME}/.minio`
  * 启动时可通过 `--config-dir` 指定
* [Minio Bucket Notification Guide](https://docs.minio.io/docs/minio-bucket-notification-guide)
* [Minio Server Limits Per Tenant](https://docs.minio.io/docs/minio-server-limits-per-tenant)
  * 不支持的 S3 接口
    * BucketACL (Use bucket policies instead)
    * BucketCORS (CORS enabled by default on all buckets for all HTTP verbs)
    * BucketLifecycle (Not required for Minio erasure coded backend)
    * BucketReplication (Use mc mirror instead)
    * BucketVersions, BucketVersioning (Use s3git)
    * BucketWebsite (Use caddy or nginx)
    * BucketAnalytics, BucketMetrics, BucketLogging (Use bucket notification APIs)
    * BucketRequestPayment
    * BucketTagging
    * ObjectACL (Use bucket policies instead)
    * ObjectTorrent
* Cyberduck s3 http https://svn.cyberduck.io/trunk/profiles/S3%20(HTTP).cyberduckprofile

限制 | 值
----|----
最多磁盘数    |	16
最小磁盘数    |	4
Read quorum	 | N/2
Write quorum | N/2+1
浏览器上传限制 | 5GiB
最大对象      | 5TiB
块大小       | 5 MiB - 5 GiB


```bash
brew install minio/stable/minio
brew install minio/stable/mc

docker pull minio/minio
# 单节点启动
docker run -p 9000:9000 --name minio -v /mnt/data:/data -v /mnt/config:/root/.minio minio/minio server /data

# 集群启动需要指定 MINIO_ACCESS_KEY 和 MINIO_SECRET_KEY
MINIO_ACCESS_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)
MINIO_SECRET_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)

docker network create minio-net
for i in {1..4}; do 
docker run -d -p 900$i:9000 --network minio-net --name m$i \
  -e "MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}" \
  -e "MINIO_SECRET_KEY=${MINIO_SECRET_KEY}" \
  -v $PWD/m$i/data:/data \
  -v $PWD/m$i/config:/root/.minio \
  minio/minio server http://m1:9000/data http://m2:9000/data http://m3:9000/data http://m4:9000/data
done

# 可以使用 docker 作为客户端
docker pull minio/mc
alias mc='docker run -v ~/.mc:/root/.mc -v $PWD:/pwd --workdir /pwd --rm -it minio/mc'
# 配置文件位于 ~/.mc/
mc config host add m1 http://$(docker-machine ip):9001 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY S3v4
bash
# 简化使用
alias ls='mc ls'
alias cp='mc cp'
alias cat='mc cat'
alias mkdir='mc mb'
alias pipe='mc pipe'

mc mb m1/test
echo Hello Minio ! | mc pipe m1/test/test.txt
mc cat m1/test/test.txt

mc cp m1/test/test.txt m1/test/bk.txt
mc cat m1/test/bk.txt
mc rm m1/test/bk.txt

# download/upload/list
mc share download m1/test/test.txt

# 类似于 rsync
# --force 强制覆写 --watch, -w 监控变更 --remove 删除目的的其余内容 --fake
mc mb m1/test-m
mc mirror m1/test m1/test-m -w --remove --force
echo One more | mc pipe m1/test/more.txt
mc rm m1/test/more.txt
# 只有之前的 test.txt
mc ls m1/test-m

docker stop m4
# 依然能创建文件
echo Touch| mc pipe m1/test/$(date +"%Y-%m-%d.%H-%M-%S").txt
docker stop m3
# 能读
mc cat m1/test/test.txt
# 不能写入, 会一直等待
echo Touch| mc pipe m1/test/$(date +"%Y-%m-%d.%H-%M-%S").txt
# 此时无法启动 m3, 因为 m4 未启动
docker start m3
# 两个节点都启动成功, 之前的操作继续进行
docker start m4

# Stop all
docker rm -f m{1,2,3,4}


# https://github.com/minio/minfs

# rclone 
echo "
[oss]
type=s3
env_auth=false
access_key_id=${MINIO_ACCESS_KEY}
secret_access_key=${MINIO_SECRET_KEY}
region=us-east-1
endpoint=http://127.0.0.1:9000
location_constraint=
server_side_encryption=
" >> ~/.rclone.conf
rclone lsd oss:

```

## Docker

```bash
docker run -p 9000:9000 --name minio1 \
  -e "MINIO_ACCESS_KEY=changeme" \
  -e "MINIO_SECRET_KEY=changeme" \
  -v /mnt/data:/data \
  minio/minio server /data
```

## KMS
* https://docs.min.io/docs/minio-kms-quickstart-guide.html
* https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template#L355

## ACL
* https://docs.min.io/docs/minio-admin-complete-guide.html

```bash
# 创建一个 sites 的 bucket
mc mb myminio/sites
# 创建一个 sites 来管理
mc admin user add myminio/ sites $(uuidgen | tee)
# 添加策略
echo '{"Version":"2012-10-17","Statement":[{"Action":["s3:*"],"Effect":"Allow","Resource":["arn:aws:s3:::crm/*"],"Sid":""}]}' > minio-sites-admin-policy.json
mc admin policy add myminio/ sites-admin minio-sites-admin-policy.json
# 给用户赋权
mc admin policy set myminio sites-admin user=sites
```

## FAQ
### Unsupported backend format
* [#4104](https://github.com/minio/minio/issues/4104)
* 删除旧的启动文件

### Let's Encrypt Certbot

```bash
brew install certbot
```

