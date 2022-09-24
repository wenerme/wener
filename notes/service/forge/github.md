---
title: Github
---

# Github

- [chrishunt/github-auth](https://github.com/chrishunt/github-auth)
- 参考
  - https://gist.github.com/toolbear/ac62691d6f59812a6710
    GitHub as an authority for SSH public keys
  - https://codeload.github.com/bufbuild/buf/tar.gz/refs/tags/v1.3.0

```bash
curl https://github.com/wenerme.keys >> ~/.ssh/authorized_keys
curl https://api.github.com/users/wenerme/keys

# .diff .patch
curl -LO https://github.com/electron-react-boilerplate/electron-react-boilerplate/pull/2875.diff
git am 2875.diff
```

## Git LFS

- [限制](https://docs.github.com/en/github/managing-large-files/about-git-large-file-storage)
  - 单文件最大 2 GB
- [容量和带宽限制](https://docs.github.com/en/github/managing-large-files/about-storage-and-bandwidth-usage)
  - 1G 容量
  - 1G 带宽
- 注意
  - Github pages 不能访问

```
version https://git-lfs.github.com/spec/v1
oid sha256:4cac19622fc3ada9c0fdeadb33f88f367b541f38b89102a3f1261ac81fd5bcb5
size 84977953
```

## 快速添加 License

- https://github.com/wenerme/wener/community/license/new?template=CC-BY-SA-4.0

## 获取最新版本

- https://docs.github.com/en/rest/reference/repos#get-the-latest-release
- https://gist.github.com/lukechilds/a83e1d7127b78fef38c2914c4ececc3c

```bash
github-latest-version() {
  set -o pipefail
  curl -sfL https://api.github.com/repos/$1/releases/latest | jq .tag_name -r
  local r=$?
  set +o pipefail
  return $r
}
```

```bash
# 但这种有多个 tag 的无解
github-latest-version kubernetes-sigs/nfs-subdir-external-provisioner
```

## Socialify

- [wei/socialify](https://github.com/wei/socialify)
- [matchai/waka-box](https://github.com/matchai/waka-box)

## Search

- in:path
- in:file
- user:USERNAME
- org:ORGNAME
- repo:USERNAME/REPOSITORY
- path:DIRECTORY
- language:LANGUAGE
  - https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
- size:n
- filename:FILENAME
- extension:EXT

## Markdown

<img src="https://render.githubusercontent.com/render/math?math=\begin{equation}\sum_{n=0}^\infty\frac{1}{2^n}\end{equation}"/>

## Sign

```bash
# GPG
gpg --list-secret-keys --keyid-format=long
git config --global user.signingkey KEY
git config --global user.signingkey SUBKEY!

# SSH
git config --global gpg.format ssh
git config --global user.signingkey $(cat ~/.ssh/id_ed25519.pub)

# X.509
git config --global gpg.x509.program smimesign
git config --global gpg.format x509
smimesign --list-keys
git config --global user.signingkey KEY
```
