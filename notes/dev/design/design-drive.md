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

:::tip

- murmur3,md5,sha1 用来做文件 Hash 是合适的，但不建议做唯一
- 如果要唯一，可以使用 sha256

:::

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

## Object Storage

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

**garage**

- metadata
- data
  - `{2}/{2}/hash.zst`

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

## Web File System API

- Chrome 86+
- FileSystemHandle
- FileSystemFileHandle
- FileSystemDirectoryHandle
- FileSystemSyncAccessHandle
- FileSystemWritableFileStream
- Window.showOpenFilePicker()
- Window.showSaveFilePicker()
- Window.showDirectoryPicker()
- DataTransferItem.getAsFileSystemHandle()
- StorageManager.getDirectory()
- input webkitdirectory - `<input type='file' webkitdirectory multiple>`
  - Chrome 7+, Safari 11.1+
  - 能获取到 webkitEntries - `<input type='file' multiple>`
    - Chrome 22+, Safari 11.1+

```ts
interface FileSystemHandle {
  readonly kind: 'file' | 'directory';
  readonly name: string;

  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;

  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isFile: boolean;

  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isDirectory: boolean;
}
var FileSystemHandle: {
  prototype: FileSystemHandle;
  new (): FileSystemHandle;
};
type FileSystemHandleUnion = FileSystemFileHandle | FileSystemDirectoryHandle;

interface FilePickerAcceptType {
  description?: string | undefined;
  accept: Record<string, string | string[]>;
}

interface FilePickerOptions {
  types?: FilePickerAcceptType[] | undefined;
  excludeAcceptAllOption?: boolean | undefined;
}

interface OpenFilePickerOptions extends FilePickerOptions {
  multiple?: boolean | undefined;
}

interface SaveFilePickerOptions extends FilePickerOptions {
  suggestedName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DirectoryPickerOptions {}

type FileSystemPermissionMode = 'read' | 'readwrite';

interface FileSystemPermissionDescriptor extends PermissionDescriptor {
  handle: FileSystemHandle;
  mode?: FileSystemPermissionMode | undefined;
}

interface FileSystemHandlePermissionDescriptor {
  mode?: FileSystemPermissionMode | undefined;
}

interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean | undefined;
}

interface FileSystemGetFileOptions {
  create?: boolean | undefined;
}

interface FileSystemGetDirectoryOptions {
  create?: boolean | undefined;
}

interface FileSystemRemoveOptions {
  recursive?: boolean | undefined;
}

type WriteParams =
  | { type: 'write'; position?: number | undefined; data: BufferSource | Blob | string }
  | { type: 'seek'; position: number }
  | { type: 'truncate'; size: number };

type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams;

// TODO: remove this once https://github.com/microsoft/TSJS-lib-generator/issues/881 is fixed.
// Native File System API especially needs this method.
interface WritableStream {
  close(): Promise<void>;
}

class FileSystemWritableFileStream extends WritableStream {
  write(data: FileSystemWriteChunkType): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isFile: true;
  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isDirectory: false;
}

var FileSystemFileHandle: {
  prototype: FileSystemFileHandle;
  new (): FileSystemFileHandle;
};

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: 'directory';
  getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
  getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>;
  removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
  resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<FileSystemDirectoryHandle | FileSystemFileHandle>;
  entries(): AsyncIterableIterator<[string, FileSystemDirectoryHandle | FileSystemFileHandle]>;
  [Symbol.asyncIterator]: FileSystemDirectoryHandle['entries'];
  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isFile: false;
  /**
   * @deprecated Old property just for Chromium <=85. Use `kind` property in the new API.
   */
  readonly isDirectory: true;
}

var FileSystemDirectoryHandle: {
  prototype: FileSystemDirectoryHandle;
  new (): FileSystemDirectoryHandle;
};

interface DataTransferItem {
  getAsFileSystemHandle(): Promise<FileSystemHandle | null>;
}

interface StorageManager {
  getDirectory(): Promise<FileSystemDirectoryHandle>;
}

function showOpenFilePicker(
  options?: OpenFilePickerOptions & { multiple?: false | undefined },
): Promise<[FileSystemFileHandle]>;
function showOpenFilePicker(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]>;
function showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
function showDirectoryPicker(options?: DirectoryPickerOptions): Promise<FileSystemDirectoryHandle>;

// Old methods available on Chromium 85 instead of the ones above.

interface ChooseFileSystemEntriesOptionsAccepts {
  description?: string | undefined;
  mimeTypes?: string[] | undefined;
  extensions?: string[] | undefined;
}

interface ChooseFileSystemEntriesFileOptions {
  accepts?: ChooseFileSystemEntriesOptionsAccepts[] | undefined;
  excludeAcceptAllOption?: boolean | undefined;
}

/**
 * @deprecated Old method just for Chromium <=85. Use `showOpenFilePicker()` in the new API.
 */
function chooseFileSystemEntries(
  options?: ChooseFileSystemEntriesFileOptions & {
    type?: 'open-file' | undefined;
    multiple?: false | undefined;
  },
): Promise<FileSystemFileHandle>;
/**
 * @deprecated Old method just for Chromium <=85. Use `showOpenFilePicker()` in the new API.
 */
function chooseFileSystemEntries(
  options: ChooseFileSystemEntriesFileOptions & {
    type?: 'open-file' | undefined;
    multiple: true;
  },
): Promise<FileSystemFileHandle[]>;
/**
 * @deprecated Old method just for Chromium <=85. Use `showSaveFilePicker()` in the new API.
 */
function chooseFileSystemEntries(
  options: ChooseFileSystemEntriesFileOptions & {
    type: 'save-file';
  },
): Promise<FileSystemFileHandle>;
/**
 * @deprecated Old method just for Chromium <=85. Use `showDirectoryPicker()` in the new API.
 */
function chooseFileSystemEntries(options: { type: 'open-directory' }): Promise<FileSystemDirectoryHandle>;

interface GetSystemDirectoryOptions {
  type: 'sandbox';
}

interface FileSystemDirectoryHandle {
  /**
   * @deprecated Old property just for Chromium <=85. Use `.getFileHandle()` in the new API.
   */
  getFile: FileSystemDirectoryHandle['getFileHandle'];

  /**
   * @deprecated Old property just for Chromium <=85. Use `.getDirectoryHandle()` in the new API.
   */
  getDirectory: FileSystemDirectoryHandle['getDirectoryHandle'];

  /**
   * @deprecated Old property just for Chromium <=85. Use `.keys()`, `.values()`, `.entries()`, or the directory itself as an async iterable in the new API.
   */
  getEntries: FileSystemDirectoryHandle['values'];
}

interface FileSystemHandlePermissionDescriptor {
  /**
   * @deprecated Old property just for Chromium <=85. Use `mode: ...` in the new API.
   */
  writable?: boolean | undefined;
}
```

- 参考
  - @types/wicg-file-system-access
    - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wicg-file-system-access/ts5.0/index.d.ts
  - https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

## API

**Homedir**

| Language | Code                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| C        | `const char *homedir = getenv("HOME") ? getenv("HOME") : getpwuid(getuid())->pw_dir;` |
| Node.js  | `const homedir = os.homedir();`                                                       |
| Java     | `String homedir = System.getProperty("user.home");`                                   |
| Python   | `homedir = os.path.expanduser("~")`                                                   |
| Go       | `homedir, _ := os.UserHomeDir()`                                                      |

```go title="golang.org/x/tools/godoc/vfs"
package vfs // import "golang.org/x/tools/godoc/vfs"

import (
	"io"
	"os"
)

// RootType indicates the type of files contained within a directory.
//
// It is used to indicate whether a directory is the root
// of a GOROOT, a GOPATH, or neither.
// An empty string represents the case when a directory is neither.
type RootType string

const (
	RootTypeGoRoot RootType = "GOROOT"
	RootTypeGoPath RootType = "GOPATH"
)

// The FileSystem interface specifies the methods godoc is using
// to access the file system for which it serves documentation.
type FileSystem interface {
	Opener
	Lstat(path string) (os.FileInfo, error)
	Stat(path string) (os.FileInfo, error)
	ReadDir(path string) ([]os.FileInfo, error)
	RootType(path string) RootType
	String() string
}

// Opener is a minimal virtual filesystem that can only open regular files.
type Opener interface {
	Open(name string) (ReadSeekCloser, error)
}

// A ReadSeekCloser can Read, Seek, and Close.
type ReadSeekCloser interface {
	io.Reader
	io.Seeker
	io.Closer
}
```

## libc

- dirent.h
- unistd.h

```c
struct dirent {
  ino_t          d_ino;       /* Inode编号 */
  off_t          d_off;       /* 不是偏移量，详见下文 */
  unsigned short d_reclen;    /* 此记录的长度 */
  unsigned char  d_type;      /* 文件类型，不是所有文件系统都支持 */
  char           d_name[256]; /* 以空字符结尾的文件名 */
};


#define DT_UNKNOWN 0 // Unknown file type
#define DT_FIFO    1 // FIFO (named pipe)
#define DT_CHR     2 // Character device - 字符设备
#define DT_DIR     4 // Directory - 目录
#define DT_BLK     6 // Block device - 块设备
#define DT_REG     8 // Regular file - 文件
#define DT_LNK    10 // Symbolic link - 符号链接
#define DT_SOCK   12 // Socket - 套接字
#define DT_WHT    14 //

int            alphasort(const struct dirent **, const struct dirent **);
int            closedir(DIR *);
int            dirfd(DIR *);
DIR           *fdopendir(int);
DIR           *opendir(const char *);
ssize_t        posix_getdents(int, void *, size_t, int);
struct dirent *readdir(DIR *);
int            readdir_r(DIR *restrict, struct dirent *restrict, struct dirent **restrict);
void           rewinddir(DIR *);
int            scandir(const char *, struct dirent ***, int (*)(const struct dirent *), int (*)(const struct dirent **, const struct dirent **));
void           seekdir(DIR *, long);
long           telldir(DIR *);
```

- https://github.com/davidlazar/musl/blob/master/include/dirent.h
- https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/unistd.h.html
- https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/dirent.h.html

## Explorer

- Explorer 通常会实现一些额外的元数据
  - 例如: 作者、标签、描述、版本、本地化
- 功能
  - macOS Finder 收藏 Favorites
  - Windows Quick Access
  - 书签 Bookmarks / Starred
    - Windows XP
    - nemo
    - Files
  - 快捷方式（Shortcuts）
- File Explorer / File Manager
  - [mucommander/mucommander](https://github.com/mucommander/mucommander)
    - Java
    - 跨平台, Dual-pane file manager
  - [ranger/ranger](https://github.com/ranger/ranger)
    - TUI
  - Midnight Commander (mc)
    - ncurses
  - Windows
    - File Explorer
    - [files-community/files](https://github.com/files-community/files)
      - MIT, C#
      - [Files](https://files.community/)
  - macOS
    - Finder
    - 💵 Commander One
      - $44.98 for Lifetime Upgrades
    - 💵 EasyFind
    - 💵 ForkLift 4
    - 💵 fman
      - Dual-pane file manager
    - ~~[MeanEYE/Sunflower](https://github.com/MeanEYE/Sunflower)~~
  - Linux
    - [Nautilus](https://github.com/GNOME/nautilus)
      - https://apps.gnome.org/Nautilus/
      - GNOME
    - Dolphin
      - KDE Plasma
    - Thunar
      - Xfce
    - PCManFM
      - LXDE, LXQt
    - Caja
      - MATE
    - [linuxmint/nemo](https://github.com/linuxmint/nemo)
      - GPL, C
      - for Cinnamon
      - fork of the GNOME file manager Nautilus v3.4

**Windows**

- desktop.ini
- `attrib +s "C:\path\to\folder"`
- HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions
  - CLSID LocalizedString

```ini title="desktop.ini"
[.ShellClassInfo]
LocalizedResourceName=显示名称
```

```
LocalizedResourceName=@%SystemRoot%\system32\shell32.dll,-21770
```

**macOS**

- 扩展属性 Extended Attributes
  - com.apple.FinderInfo
  - com.apple.metadata
- 本地化目录结构
  - .localized
  - .lproj
    - e.g. `zh-CN.lproj/InfoPlist.strings`
      - CFBundleDisplayName = "显示名称";

**Linux**

- GNOME、KDE、XDG
- .directory
- Desktop Entry
- ~/.config/user-dirs.dirs
- xdg-user-dirs-update ~/.config/user-dirs.locale
  - 语言代码

```ini title=".directory"
[Desktop Entry]
Name=显示名称
Name[zh_CN]=显示名称
```

- [Desktop Entry Specification](https://www.freedesktop.org/wiki/Specifications/desktop-entry-spec/)

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
- stem
  - basename w/o extname

## 参考 {#reference}

- JS
  - [vfile/vfile](https://github.com/vfile/vfile)
    - Virtual file format for text processing used in @unifiedjs
  - [gulpjs/vinyl](https://github.com/gulpjs/vinyl)
    - Virtual file format.
- Golang
  - `io/fs.FS` since Go 1.16
  - `http.FileSystem`, `http.Dir`
  - golang.org/x/tools/godoc/vfs
    - zipfs
  - [bazil/fuse](https://github.com/bazil/fuse)
    - bazil.org/fuse
    - 不需要 CGO
  - [spf13/afero](https://github.com/spf13/afero)
  - [C2FO/vfs](https://github.com/C2FO/vfs)
  - [mandelsoft/vfs](https://github.com/mandelsoft/vfs)
  - [hanwen/go-fuse](https://github.com/hanwen/go-fuse)
    - https://github.com/hanwen/go-fuse/blob/master/fs/api.go
  - ~~[blang/vfs](https://github.com/blang/vfs)~~
  - [psanford/memfs](https://github.com/psanford/memfs)
    - In-memory implementation of Go's `io/fs.FS` interface
- https://github.com/gulpjs/vinyl
- https://en.wikipedia.org/wiki/Filename
- https://github.com/opencurve/curve/blob/master/docs/cn/chunkserver_design.md
  - https://github.com/opencurve/curve/blob/master/docs/en/chunkserver_design_en.md
