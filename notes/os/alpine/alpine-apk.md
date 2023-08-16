---
title: apk
---

# apk

- [alpine/apk-tools](https://gitlab.alpinelinux.org/alpine/apk-tools)
- github [mirror](https://github.com/alpinelinux/apk-tools)
- .apk-new
  - apk 升级如果检测到本地修改，则会创建 apk-new 文件

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
```

| command      | note                             |
| ------------ | -------------------------------- |
| add          | 安装                             |
| del          | 卸载                             |
| fix          | reinstall/upgrade - 不修改 world |
| update       | 更新 index                       |
| upgrade      | 升级包                           |
| cache        | 缓存管理                         |
| **查询**     |
| info         |
| list         |
| dot          |
| policy       |
| search       |
| **仓库管理** |
| index        | 创建 index                       |
| fetch        | 下载 pkg 到本地                  |
| manifest     | 内容 checksum                    |
| verify       | 校验内容和签名                   |
| **其他**     |
| audit        |
| stats        |
| version      |

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
