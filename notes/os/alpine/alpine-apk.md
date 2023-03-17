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

```bash
apk audit # 系统目前变化 - 哪些增加了，哪些删除了
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
