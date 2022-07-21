---
title: apk
---

# apk

- [alpine/apk-tools](https://gitlab.alpinelinux.org/alpine/apk-tools)
- github [mirror](https://github.com/alpinelinux/apk-tools)

```bash
apk info -r so:libgnutls.so.30.28.0
apk search cmd:blkid
apk version -l '!'

# 版本号
apk policy musl | sed '2!d' | sed 's/[^0-9a-z.-]//g'
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
# 修复有修改的包
apk audit --packages -q | xargs apk fix
```

## Notes

- apk_name_foreach_matching 核心匹配逻辑

```c
struct apk_hash_ops {
	ptrdiff_t	node_offset;
	apk_blob_t	(*get_key)(apk_hash_item item);
	unsigned long	(*hash_key)(apk_blob_t key);
	unsigned long	(*hash_item)(apk_hash_item item);
  // 比较包名
	int		(*compare)(apk_blob_t itemkey, apk_blob_t key);
  // 比较内容
	int		(*compare_item)(apk_hash_item item, apk_blob_t key);
	void		(*delete_item)(apk_hash_item item);
};

// 包名字列表
struct apk_hash {
	const struct apk_hash_ops *ops;
	struct apk_hash_array *buckets;
	int num_items;
};
```