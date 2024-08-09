---
title: 网盘设计
date: 2021-11-30
---

# 网盘设计

> 如何设计实现网盘？

<!-- more -->

- 网盘几个部分
  - 前端协议
    - 面向客户端
    - 提供统一接口
    - 有用户概念
    - 支持元信息
    - 最小单位为文件
  - 服务
    - 文件 <-> 对象 映射
    - 元信息维护
    - 权限控制
    - 协议适配
  - 后端存储
    - 解决数据实际存储问题
    - 一般为对象
    - 一般没有用户概念
    - 最小单位为 block、chunk、object
    - 一般支持多副本
- 常见协议 S3、POSIX、WebDAV、SFTP、FTPS

---

**考虑点**

- Storage as a Service
  - 要求后端能力强
- Bring Your Own Storage
  - 要求能适配不同后端
- Selfhosted
  - 要求能简单运维部署
- 文件大小
  - 小文件
  - 图片
  - 大文件
  - 文档
- 使用场景
  - POSIX - 完整的 fs 功能
  - 对象存储
  - 在线协同
  - 群件
    - ToB、共享、租户
  - 网盘
    - ToC、共享
  - 基于 Web 的文件管理器
    - 单机
- WebDAV - CardDAV、CalDAV
  - [natelindev/tsdav](https://github.com/natelindev/tsdav)
    - WebDAV, CALDAV, and CARDDAV client for Nodejs and the Browser

---

**实现方向**

- 围绕协议展开 - WebDAV
- 围绕功能展开
  - 产品功能要求
  - 前端接口要求
  - 后端存储要求
- 围绕服务展开
  - 现有服务提供的能力进行封装
- Metadata+Chunk
  - 通常是底层存储的实现
  - 例如: seaweedfs, juicefs, garage
- FS Meta+Object+Metadata
  - 在对象存储之上实现文件系统
  - FS Meta 可以存储在 DB
  - Object Key 为 sha
  - Metadata 记录关于 Object 的信息 - 便于不依赖 fs meta 直接访问操作

## S3 API

- [Amazon S3 REST API Introduction](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
- Actions
  - {Copy,Get,Delete,Put,Restore,List}Object
    - Acl
    - Attributes
    - LegalHold
    - LockConfiguration
    - Retention
    - Tagging
    - Torrent
    -
  - {Create,Delete,Head,Get,List}Bucket
    - Acl
    - Policy
    - Cors
    - Encruption
    - Lifecycle
    - Replication
    - Tagging
    - Website
    - 少用
      - LifecycleConfiguration
      - Location
      - NotificationConfiguration
      - Logging
      - Versioning
      - RequestPayment
      - Notification
      - PolicyStatus
      - AnalyticsConfiguration
      - IntelligentTieringConfiguration
      - InventoryConfiguration
      - MetricsConfiguration
      - OwnershipControls
      - AccelerateConfiguration
  - {Abort,Complete,Create,List}MultipartUpload
  - GetPublicAccessBlock
  - ListParts
  - SelectObjectContent
  - UploadPart
  - UploadPartCopy
  - WriteGetObjectResponse
- Amazon S3 Control Actions
  - {Create,Delete,Get,List}AccessPoint
  - {Create,Describe,List}Job
    - Tagging

# 实现方案分析

## local

- 简单的网盘就是将本地 fs 暴露到 网络
- 直接使用本地文件系统非常灵活，但是还是需要做元数据的处理
- 好处
  - 运维直观
  - 实现简单
  - 可直接使用现有的协议服务暴露存储
  - 单机存储容量可以非常高
  - 利用本地文件系统特性 - zfs
- 坏处
  - 需要维护一致性 - 但如果只有一个入口相对容易
  - 不能水平扩容
  - 不容易处理加密
  - 副本、备份需要其他方案
  - 还是需要实现服务维护元数据
  - 元数据服务与协议服务分离存在一致性问题

## seaweedfs

- master+volume 提供 分布式对象存储
- filer 实现 fs 接口
- 支持暴露 s3 服务接口
- 好处
  - 水平扩容
  - 副本、备份
- 坏处
  - 运维
  - 依赖较多服务

## mime

- directory
  - inode/directory
    - mimetype, xdg
  - application/x-directory; charset=binary
    - file
- [Shared MIME-info Database](https://specifications.freedesktop.org/shared-mime-info-spec/shared-mime-info-spec-latest.html)
  - inode/blockdevice
  - inode/chardevice
  - inode/directory
  - inode/fifo
  - inode/mount-point
  - inode/socket
  - inode/symlink

```bash
# application/x-directory; charset=binary
file --mime-type --mime-encoding $PWD
```

## layout

- 面向个人
- 面向企业
- 参考
  - xdg base dir
  - linux [fhs](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

## meta

- https://www.freedesktop.org/wiki/Specifications/shared-filemetadata-spec/
- https://www.freedesktop.org/wiki/CommonExtendedAttributes/
- http://0pointer.de/lennart/projects/mod_mime_xattr/
- https://man7.org/linux/man-pages/man1/setfattr.1.html
- https://man7.org/linux/man-pages/man7/xattr.7.html

```
namespace.attribute
user.mime_type
trusted.md5sum,
system.posix_acl_access
security.selinux
```

- namespaces
  - security - SELinux
  - system - ACL
  - trusted
  - user
- 255 bytes and values of up to 64 KiB
- https://en.wikipedia.org/wiki/Extended_file_attributes

## file manager

- Windows Explorer
- macOS Finder
- Nemo
- Nautilus
- [File manager](https://en.wikipedia.org/wiki/File_manager)
- [xfce/thunar](https://gitlab.xfce.org/xfce/thunar)

## thumb

- https://en.wikipedia.org/wiki/Windows_thumbnail_cache
  - [Windows Explorer Thumbnail Cache database file format specification](https://github.com/libyal/libwtcdb/blob/main/documentation/Windows%20Explorer%20Thumbnail%20Cache%20database%20format.asciidoc)
- WebDAV REPORT
  - https://lists.w3.org/Archives/Public/w3c-dist-auth/2009AprJun/0012.html
- https://specifications.freedesktop.org/thumbnail-spec/thumbnail-spec-latest.html#SHARED
- https://github.com/jesjimher/genthumbs/blob/master/genthumbs.sh

## filemeta

- https://elixir.bootlin.com/linux/latest/source/include/linux/fs.h#L623
- The Inode Object
  - http://books.gigatux.nl/mirror/kerneldevelopment/0672327201/ch12lev1sec6.html
- https://en.wikipedia.org/wiki/Fork_(file_system)
  - alternate data streams - ADS
- https://en.wikipedia.org/wiki/Sidecar_file

```c
struct inode {
    struct hlist_node       i_hash;              /* hash list */
    struct list_head        i_list;              /* list of inodes */
    struct list_head        i_dentry;            /* list of dentries */
    unsigned long           i_ino;               /* inode number */
    atomic_t                i_count;             /* reference counter */
    umode_t                 i_mode;              /* access permissions */
    unsigned int            i_nlink;             /* number of hard links */
    uid_t                   i_uid;               /* user id of owner */
    gid_t                   i_gid;               /* group id of owner */
    kdev_t                  i_rdev;              /* real device node */
    loff_t                  i_size;              /* file size in bytes */
    struct timespec         i_atime;             /* last access time */
    struct timespec         i_mtime;             /* last modify time */
    struct timespec         i_ctime;             /* last change time */
    unsigned int            i_blkbits;           /* block size in bits */
    unsigned long           i_blksize;           /* block size in bytes */
    unsigned long           i_version;           /* version number */
    unsigned long           i_blocks;            /* file size in blocks */
    unsigned short          i_bytes;             /* bytes consumed */
    spinlock_t              i_lock;              /* spinlock */
    struct rw_semaphore     i_alloc_sem;         /* nests inside of i_sem */
    struct semaphore        i_sem;               /* inode semaphore */
    struct inode_operations *i_op;               /* inode ops table */
    struct file_operations  *i_fop;              /* default inode ops */
    struct super_block      *i_sb;               /* associated superblock */
    struct file_lock        *i_flock;            /* file lock list */
    struct address_space    *i_mapping;          /* associated mapping */
    struct address_space    i_data;              /* mapping for device */
    struct dquot            *i_dquot[MAXQUOTAS]; /* disk quotas for inode */
    struct list_head        i_devices;           /* list of block devices */
    struct pipe_inode_info  *i_pipe;             /* pipe information */
    struct block_device     *i_bdev;             /* block device driver */
    unsigned long           i_dnotify_mask;      /* directory notify mask */
    struct dnotify_struct   *i_dnotify;          /* dnotify */
    unsigned long           i_state;             /* state flags */
    unsigned long           dirtied_when;        /* first dirtying time */
    unsigned int            i_flags;             /* filesystem flags */
    unsigned char           i_sock;              /* is this a socket? */
    atomic_t                i_writecount;        /* count of writers */
    void                    *i_security;         /* security module */
    __u32                   i_generation;        /* inode version number */
    union {
            void            *generic_ip;         /* filesystem-specific info */
    } u;
};

struct inode_operations {
    int (*create) (struct inode *, struct dentry *,int);
    struct dentry * (*lookup) (struct inode *, struct dentry *);
    int (*link) (struct dentry *, struct inode *, struct dentry *);
    int (*unlink) (struct inode *, struct dentry *);
    int (*symlink) (struct inode *, struct dentry *, const char *);
    int (*mkdir) (struct inode *, struct dentry *, int);
    int (*rmdir) (struct inode *, struct dentry *);
    int (*mknod) (struct inode *, struct dentry *, int, dev_t);
    int (*rename) (struct inode *, struct dentry *,
                    struct inode *, struct dentry *);
    int (*readlink) (struct dentry *, char *, int);
    int (*follow_link) (struct dentry *, struct nameidata *);
    int (*put_link) (struct dentry *, struct nameidata *);
    void (*truncate) (struct inode *);
    int (*permission) (struct inode *, int);
    int (*setattr) (struct dentry *, struct iattr *);
    int (*getattr) (struct vfsmount *, struct dentry *, struct kstat *);
    int (*setxattr) (struct dentry *, const char *,
                      const void *, size_t, int);
    ssize_t (*getxattr) (struct dentry *, const char *, void *, size_t);
    ssize_t (*listxattr) (struct dentry *, char *, size_t);
    int (*removexattr) (struct dentry *, const char *);
};
```

- create - 创建一个新的磁盘索引节点
- lookup - 查找索引节点所在的目录
- unlink - 从 dir 目录删除 dentry 目录项所指文件的硬链接

## Entity

- File
  - 不建议使用
  - File 含义太过宽泛
  - File 可能和系统里对象冲突
- FileMeta - 文件的基本元数据
  - 用于快速检索和显示文件列表时的基本信息
  - name, size, type
- FileMetadata - 文件的详细元数据
  - 显示文件的详细信息和管理文件的权限、版本等
  - author, tags, description, version, permissions
- FileRef - 文件引用信息
  - 指向实际存储位置的引用或链接
  - path, object_url
- FileContent - 文件内容
  - 实际存储的文件内容
  - 用于 dedup
  - content, hash
- FileInfo
- FileEntry - 文件记录
  - 包含 **path** 信息
  - 用于表示文件在系统中的位置
  - path, parent, children
- DirectoryEntry - 目录记录
  - 包含 **path** 信息
  - 用于表示目录在系统中的位置
  - path, parent, children

---

- 常见配对关系
  - FileEntry & DirectoryEntry - 目录结构
  - FilePath & FileMeta
  - FileRef & FileContent - 存储分离

## PHP

- https://github.com/nextcloud/server/blob/master/lib/private/Files/Storage/Storage.php
- https://flysystem.thephpleague.com/
  - filesystem abstraction for PHP
  - https://flysystem.thephpleague.com/docs/advanced/creating-an-adapter/
- https://laravel.com/docs/master/filesystem
  - [Illuminate\Support\Facades\Storage](https://laravel.com/api/master/Illuminate/Support/Facades/Storage.html)

## flystorage

```ts
export type CommonStatInfo = Readonly<{
  path: string;
  lastModifiedMs?: number;
  visibility?: string;
}>;

export type FileInfo = Readonly<
  {
    type: 'file';
    size?: number;
    isFile: true;
    isDirectory: false;
    mimeType?: string;
  } & CommonStatInfo
>;

export type DirectoryInfo = Readonly<
  {
    type: 'directory';
    isFile: false;
    isDirectory: true;
  } & CommonStatInfo
>;

export type StatEntry = FileInfo | DirectoryInfo;

export type FileContents = Iterable<any> | AsyncIterable<any> | NodeJS.ReadableStream | Readable | string;

export interface StorageAdapter {
  write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
  read(path: string): Promise<FileContents>;
  deleteFile(path: string): Promise<void>;
  createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
  copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
  moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
  stat(path: string): Promise<StatEntry>;
  list(path: string, options: { deep: boolean }): AsyncGenerator<StatEntry>;
  changeVisibility(path: string, visibility: string): Promise<void>;
  visibility(path: string): Promise<string>;
  deleteDirectory(path: string): Promise<void>;
  fileExists(path: string): Promise<boolean>;
  directoryExists(path: string): Promise<boolean>;
  publicUrl(path: string, options: PublicUrlOptions): Promise<string>;
  temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
  checksum(path: string, options: ChecksumOptions): Promise<string>;
  mimeType(path: string, options: MimeTypeOptions): Promise<string>;
  lastModified(path: string): Promise<number>;
  fileSize(path: string): Promise<number>;
}

export type MiscellaneousOptions = {
  [option: string]: any;
};

export type MimeTypeOptions = MiscellaneousOptions & {
  disallowFallback?: boolean;
  fallbackMethod?: 'contents' | 'path';
};

export type VisibilityOptions = {
  visibility?: string;
  directoryVisibility?: string;
};
export type WriteOptions = VisibilityOptions &
  MiscellaneousOptions & {
    mimeType?: string;
    size?: number;
    cacheControl?: string;
  };

export type CreateDirectoryOptions = MiscellaneousOptions & Pick<VisibilityOptions, 'directoryVisibility'> & {};
export type PublicUrlOptions = MiscellaneousOptions & {};
export type CopyFileOptions = MiscellaneousOptions &
  VisibilityOptions & {
    retainVisibility?: boolean;
  };
export type MoveFileOptions = MiscellaneousOptions &
  VisibilityOptions & {
    retainVisibility?: boolean;
  };
export type ListOptions = { deep?: boolean };
export type TemporaryUrlOptions = MiscellaneousOptions & {
  expiresAt: ExpiresAt;
};
```

- https://github.com/duna-oss/flystorage/blob/main/packages/file-storage/src/file-storage.ts
- [duna-oss/flystorage](https://github.com/duna-oss/flystorage)
  - by the maintainer of Flysystem
  - File storage abstraction for Node / TypeScript
  - [flystorage.dev](https://flystorage.dev/)
- https://flystorage.dev/architecture/

## Object

- Hash 分层
- CAS (Content Addressable Storage) 内容可寻址存储系统
  - hash -> object
  - kv
- FCS - fixed content storage

**git**

- .git/objects
- .git/objects/pack - 已打包的对象文件 - .pack+.idx
- .git/objects/info - 对象的附加信息
- `.git/objects/[0-9a-f]{2}` - 对象的哈希前两位
- `.git/objects/[0-9a-f]{2}/[0-9a-f]{38}` - 对象的剩余哈希值
- git-annex
  - .git/annex/objects/12/34/SHA256E-s1024--1234567890abcdef
    - `HASH-sSIZE--FILENAME`
    - 对象为 symlink / pointer
  - 参考
    - https://git-annex.branchable.com/internals/
    - https://git-annex.branchable.com/internals/hashing/

**juicefs**

- chunk 64 MiB
- slice -> object 4 MiB
  - sliceId 为 int
- meta - 以 Redis 为例
  - setting - string
  - allSessions - sset
  - sessionInfos - hash
  - Node `i${inode}` - string
  - Edge/Dir `d${inode}` - hash{fn,binary}
  - LinkParent `p${inode}` - hash
  - Chunk `c${inode}_${index}` - list
  - SliceRef `k${sliceId}_${size}` - hash
  - Symlink `s${inode}` - string
  - Xattr `x${inode}` - hash
  - Flock `lockf${inode}` - hash{`${sid}_${owner}`,R/W}
  - Plock `lockp${inode}` - hash
  - DelFiles - `delfiles` - sset
  - DelSlices - `delSlices` - hash
  - Sustained - `session${sid}` - list
- data
  - `${fsname}/chunks/${hash}/${basename}`
    - hash
      - 有Prefix -> `fmt.Sprintf("%02X/%d", sliceId%256, sliceId/1000/1000)`
      - 无Prefix -> `fmt.Sprintf("%d/%d", sliceId/1000/1000, sliceId/1000)`
    - basename -> `${sliceId}_${index}_${size}`
- 参考
  - https://juicefs.com/docs/community/internals/

```go
type setting struct {
    Name  string `xorm:"pk"`
    Value string `xorm:"varchar(4096) notnull"`
}
type counter struct {
    Name  string `xorm:"pk"`
    Value int64  `xorm:"notnull"`
}
type node struct {
    Inode  Ino    `xorm:"pk"`
    Type   uint8  `xorm:"notnull"`
    Flags  uint8  `xorm:"notnull"`
    Mode   uint16 `xorm:"notnull"`
    Uid    uint32 `xorm:"notnull"`
    Gid    uint32 `xorm:"notnull"`
    Atime  int64  `xorm:"notnull"`
    Mtime  int64  `xorm:"notnull"`
    Ctime  int64  `xorm:"notnull"`
    Nlink  uint32 `xorm:"notnull"`
    Length uint64 `xorm:"notnull"`
    Rdev   uint32
    Parent Ino
    AccessACLId  uint32 `xorm:"'access_acl_id'"`
    DefaultACLId uint32 `xorm:"'default_acl_id'"`
}
type edge struct {
    Id     int64  `xorm:"pk bigserial"`
    Parent Ino    `xorm:"unique(edge) notnull"`
    Name   []byte `xorm:"unique(edge) varbinary(255) notnull"`
    Inode  Ino    `xorm:"index notnull"`
    Type   uint8  `xorm:"notnull"`
}
type chunk struct {
    Id     int64  `xorm:"pk bigserial"`
    Inode  Ino    `xorm:"unique(chunk) notnull"`
    Indx   uint32 `xorm:"unique(chunk) notnull"`
    Slices []byte `xorm:"blob notnull"`
}
type sliceRef struct {
    Id   uint64 `xorm:"pk chunkid"`
    Size uint32 `xorm:"notnull"`
    Refs int    `xorm:"notnull"`
}
type symlink struct {
    Inode  Ino    `xorm:"pk"`
    Target []byte `xorm:"varbinary(4096) notnull"`
}
type xattr struct {
    Id    int64  `xorm:"pk bigserial"`
    Inode Ino    `xorm:"unique(name) notnull"`
    Name  string `xorm:"unique(name) notnull"`
    Value []byte `xorm:"blob notnull"`
}
type flock struct {
    Id    int64  `xorm:"pk bigserial"`
    Inode Ino    `xorm:"notnull unique(flock)"`
    Sid   uint64 `xorm:"notnull unique(flock)"`
    Owner int64  `xorm:"notnull unique(flock)"`
    Ltype byte   `xorm:"notnull"`
}
type plock struct {
    Id      int64  `xorm:"pk bigserial"`
    Inode   Ino    `xorm:"notnull unique(plock)"`
    Sid     uint64 `xorm:"notnull unique(plock)"`
    Owner   int64  `xorm:"notnull unique(plock)"`
    Records []byte `xorm:"blob notnull"`
}
type delfile struct {
    Inode  Ino    `xorm:"pk notnull"`
    Length uint64 `xorm:"notnull"`
    Expire int64  `xorm:"notnull"`
}
type delslices struct {
    Id      uint64 `xorm:"pk chunkid"`
    Deleted int64  `xorm:"notnull"`
    Slices  []byte `xorm:"blob notnull"`
}
type sustained struct {
    Id    int64  `xorm:"pk bigserial"`
    Sid   uint64 `xorm:"unique(sustained) notnull"`
    Inode Ino    `xorm:"unique(sustained) notnull"`
}
```

## Glossory

- path - 完整路径 `/home/user/documents/report.pdf`
  - path=dirname+basename
- filename - 文件名 `report.pdf`
  - name+extname
    - extname 包含 `.`
  - `^[^\\/:*?"<>|]+(\.[a-zA-Z0-9]+)?$`
  - reserved
    - Windows
      - 保留文件名 CON, PRN, AUX, NUL, COM{1..9}, LPT{1..9} - 大小写不敏感
        - `NUL.txt` `NUL.tar.gz` 也等同于 `NUL`
        - https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file
      - 保留字符 `/\:*?"<>|`
      - 特殊文件名 `Thumbs.db`, `desktop.ini`
    - macOS
      - `:` - HFS 分隔符
- dirname - 目录名 `/home/user/documents`
- basename - 指路径中最后一部分的名称，无论它是文件还是目录

## 参考 {#reference}

- https://en.wikipedia.org/wiki/Filename
- https://github.com/opencurve/curve/blob/master/docs/cn/chunkserver_design.md
  - https://github.com/opencurve/curve/blob/master/docs/en/chunkserver_design_en.md
