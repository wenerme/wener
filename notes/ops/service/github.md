# Github

* [chrishunt/github-auth](https://github.com/chrishunt/github-auth)
* 参考
  * https://gist.github.com/toolbear/ac62691d6f59812a6710


```bash
curl https://github.com/wenerme.keys >> ~/.ssh/authorized_keys
curl https://api.github.com/users/wenerme/keys
```

## Git LFS 
* [限制](https://docs.github.com/en/github/managing-large-files/about-git-large-file-storage)
  * 单文件最大 2 GB
* [容量和带宽限制](https://docs.github.com/en/github/managing-large-files/about-storage-and-bandwidth-usage)
  * 1G 容量
  * 1G 带宽
* 注意
  * Github pages 不能访问

```
version https://git-lfs.github.com/spec/v1
oid sha256:4cac19622fc3ada9c0fdeadb33f88f367b541f38b89102a3f1261ac81fd5bcb5
size 84977953
```
