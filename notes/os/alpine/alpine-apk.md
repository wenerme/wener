---
title: apk
---

# apk

- apk - Alpine Package Keeper
- [alpine/apk-tools](https://gitlab.alpinelinux.org/alpine/apk-tools)
- github [mirror](https://github.com/alpinelinux/apk-tools)
- .apk-new
  - apk 升级如果检测到本地修改，则会创建 apk-new 文件
- -a, --available -> 允许 替换和降级

```bash
apk info -r so:libgnutls.so.30.28.0
apk search cmd:blkid
apk version -l '!'

# 版本号
apk policy musl | sed '2!d' | sed 's/[^0-9a-z.-]//g'

# 1.2.3-r4
docker run --rm -it wener/base sh -c 'apk update >/dev/null;apk policy musl | sed "2!d" | sed "s/[^0-9a-z.-]//g"'
# 1.2.3
docker run --rm -it wener/base sh -c 'apk update >/dev/null;apk policy musl | sed "2!d" | sed "s/[^0-9a-z.-]//g"' | cut -d '-' -f 1

# 查看
zcat lib.apk | tar -vtf
tar -vtf lib.apk # 一般 tar 支持 gzip
```

| command      | note                             |
| ------------ | -------------------------------- |
| **包管理**   |
| apk add      | 安装                             |
| apk del      | 卸载                             |
| apk fix      | reinstall/upgrade - 不修改 world |
| apk update   | 更新 index                       |
| apk upgrade  | 升级包                           |
| apk cache    | 缓存管理                         |
| **查询**     |
| apk info     |
| apk list     |
| apk dot      |
| apk policy   |
| apk search   |
| **仓库管理** |
| apk index    | 创建 index                       |
| apk fetch    | 下载 pkg 到本地                  |
| apk manifest | 内容 checksum                    |
| apk verify   | 校验内容和签名                   |
| **其他**     |
| apk audit    |
| apk stats    |
| apk version  |

| flag                         | for                                |
| ---------------------------- | ---------------------------------- |
| **全局**                     |
| -p, --root ROOTFS            | /                                  |
| -X, --repository REPO        | 修改使用的仓库                     |
| --allow-untrusted            | 允许使用未签名的包                 |
| --arch ARCH                  | 指定架构                           |
| --cache-dir CACHEDIR         | 指定缓存目录 /etc/apk/cache        |
| --cache-max-age AGE          | 指定缓存最大时间 min               |
| -U, --update-cache           | 更新缓存 -> `--cache-max-age 1`    |
| --keys-dir KEYSDIR           | 指定密钥目录 /etc/apk/keys/        |
| --no-cache                   | 不使用缓存                         |
| --no-network                 | 不使用网络                         |
| --no-progress                | 不显示进度                         |
| --print-arch                 | 打印架构                           |
| --purge                      | 卸载包时删除配置                   |
| --repositories-file REPOFILE | 指定仓库文件 /etc/apk/repositories |
| **Commit**                   |
| -s, --simulate               | 模拟                               |
| --clean-protected            | 不创建 `.apk-new`                  |
| --no-scripts                 | 不执行脚本                         |
| --no-commit-hooks            | 不执行 commit hook                 |
| **apk add**                  |
| --initdb                     | 初始化数据库                       |
| -l, --latest                 | 使用最新版本                       |
| -u, --upgrade                | 升级包                             |
| -t, --virtual NAME           | 安装虚拟包                         |
| --no-chown                   | 不修改文件所有者                   |
| **apk info**                 |
| -a, --all                    | 所有信息                           |
| -d, --description            | 描述                               |
| -e, --installed              | 安装状态                           |
| -L, --contents               | 包含文件                           |
| -P, --provides               | 提供的包                           |
| -r, --rdepends               | 反向依赖                           |
| -R, --depends                | 依赖                               |
| -s, --size                   | 安装大小                           |
| -w, --webpage                | 网页                               |
| -W, --who-owns               | 文件所属包                         |
| --install-if                 | 安装条件                           |
| --license                    | 许可证                             |
| --replaces                   | 替换                               |
| --rinstall-if                | 安装条件引用                       |
| --triggers                   | 触发器                             |
| **apk audit**                |
| --backup                     | /etc                               |
| --system                     | /                                  |
| --check-permissions          |
| --packages                   | 只输出包名                         |
| -r, --recursive              | 递归目录                           |
| --packages -q                | 无版本号                           |

```bash
apk --print-arch  # x86_64
cat /etc/apk/arch #

apk info -W /sbin/tunctl

apk audit                               # 系统目前变化 - 哪些增加了，哪些删除了
apk audit --system                      #
apk audit --packages -q | xargs apk fix # 修复有修改的包
```

- /etc/apk/repositories
  - `http://`, `https://`, `ftp://`
  - `$repository/$arch/APKINDEX.tar.gz`
  - `$repository/$arch/$pkgname-$pkgver-r$pkgrel.apk`
- /etc/apk/world

## Notes

- apk_name_foreach_matching 核心匹配逻辑

```c
struct apk_hash_ops {
	ptrdiff_t	node_offset;
	apk_blob_t	  (*get_key)(apk_hash_item item);
	unsigned long	(*hash_key)(apk_blob_t key);
	unsigned long	(*hash_item)(apk_hash_item item);
	int		        (*compare)(apk_blob_t itemkey, apk_blob_t key);// 比较包名
	int		        (*compare_item)(apk_hash_item item, apk_blob_t key); // 比较内容
	void		      (*delete_item)(apk_hash_item item);
};

// 包名字列表
struct apk_hash {
	const struct apk_hash_ops *ops;
	struct apk_hash_array *buckets;
	int num_items;
};
```

## APKINDEX

- APKINDEX.tar.gz
  - .SIGN.RSA.alpine-devel@lists.alpinelinux.org-6165ee59.rsa.pub
  - DESCRIPTION
  - APKINDEX

```bash
# APKINDEX.tar.gz 通过签名加未签名归档文件构造
cat signature.tar.gz APKINDEX.unsigned.tar.gz > APKINDEX.tar.gz
# 构造签名
openssl dgst -sha1 -sign privatekeyfile -out .SIGN.RSA.nameofpublickey APKINDEX.unsigned.tar.gz
tar -c .SIGN.RSA.nameofpublickey | abuild-tar --cut | gzip -9 > signature.tar.gz
# 构造 index
apk index -o APKINDEX.unsigned.tar.gz *.apk

# control.tar.gz
#   .PKGINFO
#   .pre-install/upgrade/deinstall
#   .post-install/upgrade/deinstall
cat $controldir/control.tar.gz $controldir/data.tar.gz > mypackage-1.0-r0.apk

tar -c .PKGNIFO .pre-install | abuild-tar --cut | gzip -9 > $controldir/control.tar.gz

# data.tar.gz
cd $pkgdir
tar -c * | abuild-tar --hash | gzip -9 > $controldir/data.tar.gz
```

## Reference

- https://git.alpinelinux.org/apk-tools/
- https://wiki.alpinelinux.org/wiki/Apk_spec
- https://wiki.alpinelinux.org/wiki/Apkindex_format
- https://wiki.alpinelinux.org/wiki/Alpine_package_format
- https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management

## cache

| apk                          | for                        |
| ---------------------------- | -------------------------- |
| apk cache clean              | 移除不在 index 的包        |
| apk cache download [...deps] | 下载到缓存，默认下载 world |
| apk cache purge              | -> `clean --purge`         |
| apk cache sync ...deps       |

| apk cache flags    | for                |
| ------------------ | ------------------ |
| --add-dependencies | 添加 deps 到 world |
| -a, --available    |
| --ignore-conflict  |
| -l, --latest       |
| -u, --upgrade      |
| -s, --simulate     | dry run            |

- /var/cache/apk - apk 默认缓存
  - `apk add`, `apk update`, `apk cache clean`
- /etc/apk/cache - 本地缓存, 离线包
  - `apk add`, `apk upgrade` 会检查这个目录避免下载

```bash
mkdir -p /var/cache/apk++
ln -s /var/cache/apk /etc/apk/cache
```
