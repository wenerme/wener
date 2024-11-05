---
title: POSIX
---

# POSIX

- POSIX - Portable Operating System Interface
  - POSIX.1-2008 - v7
  - 2024-06-14 POSIX.1-2024, IEEE Std 1003.1-2024 - v8
- SUS - Single Unix Specification
- 参考
  - https://pubs.opengroup.org/onlinepubs/9799919799/
  - [POSIX](https://en.wikipedia.org/wiki/POSIX)
  - [What is a POSIX file system?](https://www.quobyte.com/storage-explained/posix-filesystem)
  - 成员 https://reports.opengroup.org/all.shtml
- POSIX Programmer's Manual


---

- dirent.h - Directory Entries - 目录项
- unistd.h - Unix Standard - Standard Symbolic Constants and Types - 标准符号常量和类型

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

- https://github.com/bminor/musl/blob/master/include/dirent.h
- https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/unistd.h.html
- https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/dirent.h.html
