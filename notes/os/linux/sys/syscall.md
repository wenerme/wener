---
title: syscall
---

# syscall

- Ring 0 - 内核态
  - 初始化中断或异常处理机制
  - 代码可以直接访问硬件、管理内存和执行CPU的所有指令集
  - 内核和驱动程序
- Ring 1 & Ring 2 - 很少使用 - 例如 驱动程序
- Ring 3 - 用户态
  - 不能直接访问硬件或执行某些敏感的CPU指令
  - 通过 系统调用/syscall 访问内核态

---

- 汇编指令
  - x86 `int 0x80`
    - IDT - Interrupt Descriptor Table - 中断描述符表
    - 0x80 - 0x85
    - `lidt` - load IDT
  - x86-64 `syscall`
    - MSR - Model Specific Register - 模型特定寄存器
    - `rdmsr` - read MSR
    - `wrmsr` - write MSR
  - arm `swi 0` - software interrupt
  - aaarch64 `svc #0` - supervisor call
- 当 linux 完成 init 之后 syscall 就是唯一的用户态和内核态交互方式
  - 设置系统调用表
    - `arch/x86/include/generated/uapi/asm/unistd_64.h` - 调用号
    - `arch/x86/entry/syscalls/syscall_64.tbl`
  - 初始化中断或异常处理机制
  - 配置用户空间到内核空间的切换

:::tip

- 大多数应用通过 libc 的封装调用 syscall
  - 例如 `write`, `read` 而不是 `syscall(SYS_write, 1, "Hello, world!\n", 14)`
  - 大多动态依赖 libc - 引入环境依赖
  - 不少应用可通过静态链接 musl 来避免依赖 libc
- Golang 是直接调用 syscall - https://pkg.go.dev/syscall
  - 不依赖 libc - 跨平台
  - 静态编译

:::

```c
// SYS_write=1
syscall(SYS_write, 1, "Hello, world!\n", 14);
```

```bash
ausyscall 2 # open
ausyscall --dump
```

|   N | `SYS_name`              | api                                                                                                                                                                      |
| --: | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
|   0 | read                    | `ssize_t read(int fd, void *buf, size_t count)`                                                                                                                          |
|   1 | write                   | `ssize_t write(int fd, const void *buf, size_t count)`                                                                                                                   |
|   2 | open                    | `int open(const char *pathname, int flags, mode_t mode)`                                                                                                                 |
|   3 | close                   | `int close(int fd)`                                                                                                                                                      |
|   4 | stat                    | `int stat(const char *pathname, struct stat *statbuf)`                                                                                                                   |
|   5 | fstat                   | `int fstat(int fd, struct stat *statbuf)`                                                                                                                                |
|   6 | lstat                   | `int lstat(const char *pathname, struct stat *statbuf)`                                                                                                                  |
|   7 | poll                    | `int poll(struct pollfd *fds, nfds_t nfds, int timeout)`                                                                                                                 |
|   8 | lseek                   | `off_t lseek(int fd, off_t offset, int whence)`                                                                                                                          |
|   9 | mmap                    | `void *mmap(void *addr, size_t len, int prot, int flags, int fd, off_t offset)`                                                                                          |
|  10 | mprotect                | `int mprotect(void *addr, size_t len, int prot)`                                                                                                                         |
|  11 | munmap                  | `int munmap(void *addr, size_t len)`                                                                                                                                     |
|  12 | brk                     | `int brk(void *addr)`, `void *sbrk(intptr_t increment)`                                                                                                                  |
|  13 | rt_sigaction            | `int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact)`                                                                                       |
|  14 | rt_sigprocmask          | `int sigprocmask(int how, const sigset_t *set, sigset_t *oldset)`                                                                                                        |
|  15 | rt_sigreturn            | (internal)                                                                                                                                                               |
|  16 | ioctl                   | `int ioctl(int fd, unsigned long request, ...)`                                                                                                                          |
|  17 | pread                   | `ssize_t pread(int fd, void *buf, size_t count, off_t offset)`                                                                                                           |
|  18 | pwrite                  | `ssize_t pwrite(int fd, const void *buf, size_t count, off_t offset)`                                                                                                    |
|  19 | readv                   | `ssize_t readv(int fd, const struct iovec *iov, int iovcnt)`                                                                                                             |
|  20 | writev                  | `ssize_t writev(int fd, const struct iovec *iov, int iovcnt)`                                                                                                            |
|  21 | access                  | `int access(const char *pathname, int mode)`                                                                                                                             |
|  22 | pipe                    | `int pipe(int pipefd[2])`                                                                                                                                                |
|  23 | select                  | `int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout)`                                                                    |
|  24 | sched_yield             | `int sched_yield(void)`                                                                                                                                                  |
|  25 | mremap                  | `void *mremap(void *old_addr, size_t old_len, size_t new_len, int flags, ...)`                                                                                           |
|  26 | msync                   | `int msync(void *addr, size_t len, int flags)`                                                                                                                           |
|  27 | mincore                 | `int mincore(void *addr, size_t len, unsigned char *vec)`                                                                                                                |
|  28 | madvise                 | `int madvise(void *addr, size_t len, int advice)`                                                                                                                        |
|  29 | shmget                  | `int shmget(key_t key, size_t size, int shmflg)`                                                                                                                         |
|  30 | shmat                   | `void *shmat(int shmid, const void *shmaddr, int shmflg)`                                                                                                                |
|  31 | shmctl                  | `int shmctl(int shmid, int cmd, struct shmid_ds *buf)`                                                                                                                   |
|  32 | dup                     | `int dup(int oldfd)`                                                                                                                                                     |
|  33 | dup2                    | `int dup2(int oldfd, int newfd)`                                                                                                                                         |
|  34 | pause                   | `int pause(void)`                                                                                                                                                        |
|  35 | nanosleep               | `int nanosleep(const struct timespec *req, struct timespec *rem)`                                                                                                        |
|  36 | getitimer               | `int getitimer(int which, struct itimerval *curr_value)`                                                                                                                 |
|  37 | alarm                   | `unsigned int alarm(unsigned int seconds)`                                                                                                                               |
|  38 | setitimer               | `int setitimer(int which, const struct itimerval *new_value, struct itimerval *old_value)`                                                                               |
|  39 | getpid                  | `pid_t getpid(void)`                                                                                                                                                     |
|  40 | sendfile                | `ssize_t sendfile(int out_fd, int in_fd, off_t *offset, size_t count)`                                                                                                   |
|  41 | socket                  | `int socket(int domain, int type, int protocol)`                                                                                                                         |
|  42 | connect                 | `int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen)`                                                                                                |
|  43 | accept                  | `int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen)`                                                                                                      |
|  44 | sendto                  | `ssize_t sendto(int sockfd, const void *buf, size_t len, int flags, const struct sockaddr *dest_addr, socklen_t addrlen)`                                                |
|  45 | recvfrom                | `ssize_t recvfrom(int sockfd, void *buf, size_t len, int flags, struct sockaddr *src_addr, socklen_t *addrlen)`                                                          |
|  46 | sendmsg                 | `ssize_t sendmsg(int sockfd, const struct msghdr *msg, int flags)`                                                                                                       |
|  47 | recvmsg                 | `ssize_t recvmsg(int sockfd, struct msghdr *msg, int flags)`                                                                                                             |
|  48 | shutdown                | `int shutdown(int sockfd, int how)`                                                                                                                                      |
|  49 | bind                    | `int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen)`                                                                                                   |
|  50 | listen                  | `int listen(int sockfd, int backlog)`                                                                                                                                    |
|  51 | getsockname             | `int getsockname(int sockfd, struct sockaddr *addr, socklen_t *addrlen)`                                                                                                 |
|  52 | getpeername             | `int getpeername(int sockfd, struct sockaddr *addr, socklen_t *addrlen)`                                                                                                 |
|  53 | socketpair              | `int socketpair(int domain, int type, int protocol, int sv[2])`                                                                                                          |
|  54 | setsockopt              | `int setsockopt(int sockfd, int level, int optname, const void *optval, socklen_t optlen)`                                                                               |
|  55 | getsockopt              | `int getsockopt(int sockfd, int level, int optname, void *optval, socklen_t *optlen)`                                                                                    |
|  56 | clone                   | `long clone(unsigned long flags, void *child_stack, int *ptid, int *ctid, unsigned long newtls)`                                                                         |
|  57 | fork                    | `pid_t fork(void)`                                                                                                                                                       |
|  58 | vfork                   | `pid_t vfork(void)`                                                                                                                                                      |
|  59 | execve                  | `int execve(const char *pathname, char *const argv[], char *const envp[])`                                                                                               |
|  60 | exit                    | `void exit(int status)`, `void _exit(int status)`                                                                                                                        |
|  61 | wait4                   | `pid_t wait4(pid_t pid, int *wstatus, int options, struct rusage *rusage)`                                                                                               |
|  62 | kill                    | `int kill(pid_t pid, int sig)`                                                                                                                                           |
|  63 | uname                   | `int uname(struct utsname *buf)`                                                                                                                                         |
|  64 | semget                  | `int semget(key_t key, int nsems, int semflg)`                                                                                                                           |
|  65 | semop                   | `int semop(int semid, struct sembuf *sops, size_t nsops)`                                                                                                                |
|  66 | semctl                  | `int semctl(int semid, int semnum, int cmd, ...)`                                                                                                                        |
|  67 | shmdt                   | `int shmdt(const void *shmaddr)`                                                                                                                                         |
|  68 | msgget                  | `int msgget(key_t key, int msgflg)`                                                                                                                                      |
|  69 | msgsnd                  | `int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg)`                                                                                                      |
|  70 | msgrcv                  | `ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp, int msgflg)`                                                                                           |
|  71 | msgctl                  | `int msgctl(int msqid, int cmd, struct msqid_ds *buf)`                                                                                                                   |
|  72 | fcntl                   | `int fcntl(int fd, int cmd, ...)`                                                                                                                                        |
|  73 | flock                   | `int flock(int fd, int operation)`                                                                                                                                       |
|  74 | fsync                   | `int fsync(int fd)`                                                                                                                                                      |
|  75 | fdatasync               | `int fdatasync(int fd)`                                                                                                                                                  |
|  76 | truncate                | `int truncate(const char *path, off_t len)`                                                                                                                              |
|  77 | ftruncate               | `int ftruncate(int fd, off_t len)`                                                                                                                                       |
|  78 | getdents                | `ssize_t posix_getdents(int fd, void *buf, size_t len, int flags)`,readdir                                                                                               |
|  79 | getcwd                  | `char *getcwd(char *buf, size_t size)`                                                                                                                                   |
|  80 | chdir                   | `int chdir(const char *path)`                                                                                                                                            |
|  81 | fchdir                  | `int fchdir(int fd)`                                                                                                                                                     |
|  82 | rename                  | `int rename(const char *old, const char *new)`                                                                                                                           |
|  83 | mkdir                   | `int mkdir(const char *pathname, mode_t mode)`                                                                                                                           |
|  84 | rmdir                   | `int rmdir(const char *pathname)`                                                                                                                                        |
|  85 | creat                   | `int creat(const char *pathname, mode_t mode)`                                                                                                                           |
|  86 | link                    | `int link(const char *oldpath, const char *newpath)`                                                                                                                     |
|  87 | unlink                  | `int unlink(const char *pathname)`                                                                                                                                       |
|  88 | symlink                 | `int symlink(const char *target, const char *linkpath)`                                                                                                                  |
|  89 | readlink                | `ssize_t readlink(const char *pathname, char *buf, size_t bufsiz)`                                                                                                       |
|  90 | chmod                   | `int chmod(const char *pathname, mode_t mode)`                                                                                                                           |
|  91 | fchmod                  | `int fchmod(int fd, mode_t mode)`                                                                                                                                        |
|  92 | chown                   | `int chown(const char *pathname, uid_t owner, gid_t group)`                                                                                                              |
|  93 | fchown                  | `int fchown(int fd, uid_t owner, gid_t group)`                                                                                                                           |
|  94 | lchown                  | `int lchown(const char *pathname, uid_t owner, gid_t group)`                                                                                                             |
|  95 | umask                   | `mode_t umask(mode_t mask)`                                                                                                                                              |
|  96 | gettimeofday            | `int gettimeofday(struct timeval *tv, struct timezone *tz)`                                                                                                              |
|  97 | getrlimit               | `int getrlimit(int resource, struct rlimit *rlim)`                                                                                                                       |
|  98 | getrusage               | `int getrusage(int who, struct rusage *usage)`                                                                                                                           |
|  99 | sysinfo                 | `int sysinfo(struct sysinfo *info)`                                                                                                                                      |
| 100 | times                   | `clock_t times(struct tms *buf)`                                                                                                                                         |
| 101 | ptrace                  | `long ptrace(enum __ptrace_request request, pid_t pid, void *addr, void *data)`                                                                                          |
| 102 | getuid                  | `uid_t getuid(void)`                                                                                                                                                     |
| 103 | syslog                  | `int syslog(int type, char *bufp, int len)`                                                                                                                              |
| 104 | getgid                  | `gid_t getgid(void)`                                                                                                                                                     |
| 105 | setuid                  | `int setuid(uid_t uid)`                                                                                                                                                  |
| 106 | setgid                  | `int setgid(gid_t gid)`                                                                                                                                                  |
| 107 | geteuid                 | `uid_t geteuid(void)`                                                                                                                                                    |
| 108 | getegid                 | `gid_t getegid(void)`                                                                                                                                                    |
| 109 | setpgid                 | `int setpgid(pid_t pid, pid_t pgid)`                                                                                                                                     |
| 110 | getppid                 | `pid_t getppid(void)`                                                                                                                                                    |
| 111 | getpgrp                 | `pid_t getpgrp(void)`                                                                                                                                                    |
| 112 | setsid                  | `pid_t setsid(void)`                                                                                                                                                     |
| 113 | setreuid                | `int setreuid(uid_t ruid, uid_t euid)`                                                                                                                                   |
| 114 | setregid                | `int setregid(gid_t rgid, gid_t egid)`                                                                                                                                   |
| 115 | getgroups               | `int getgroups(int size, gid_t list[])`                                                                                                                                  |
| 116 | setgroups               | `int setgroups(size_t size, const gid_t *list)`                                                                                                                          |
| 117 | setresuid               | `int setresuid(uid_t ruid, uid_t euid, uid_t suid)`                                                                                                                      |
| 118 | getresuid               | `int getresuid(uid_t *ruid, uid_t *euid, uid_t *suid)`                                                                                                                   |
| 119 | setresgid               | `int setresgid(gid_t rgid, gid_t egid, gid_t sgid)`                                                                                                                      |
| 120 | getresgid               | `int getresgid(gid_t *rgid, gid_t *egid, gid_t *sgid)`                                                                                                                   |
| 121 | getpgid                 | `pid_t getpgid(pid_t pid)`                                                                                                                                               |
| 122 | setfsuid                | `int setfsuid(uid_t fsuid)`                                                                                                                                              |
| 123 | setfsgid                | `int setfsgid(gid_t fsgid)`                                                                                                                                              |
| 124 | getsid                  | `pid_t getsid(pid_t pid)`                                                                                                                                                |
| 125 | capget                  | `int capget(cap_user_header_t hdrp, cap_user_data_t datap)`                                                                                                              |
| 126 | capset                  | `int capset(cap_user_header_t hdrp, const cap_user_data_t datap)`                                                                                                        |
| 127 | rt_sigpending           | `int sigpending(sigset_t *set)`                                                                                                                                          |
| 128 | rt_sigtimedwait         | `int sigtimedwait(const sigset_t *set, siginfo_t *info, const struct timespec *timeout)`                                                                                 |
| 129 | rt_sigqueueinfo         | `int sigqueue(pid_t pid, int sig, const union sigval value)`                                                                                                             |
| 130 | rt_sigsuspend           | `int sigsuspend(const sigset_t *mask)`                                                                                                                                   |
| 131 | sigaltstack             | `int sigaltstack(const stack_t *ss, stack_t *old_ss)`                                                                                                                    |
| 132 | utime                   | `int utime(const char *filename, const struct utimbuf *times)`                                                                                                           |
| 133 | mknod                   | `int mknod(const char *pathname, mode_t mode, dev_t dev)`                                                                                                                |
| 134 | uselib                  | (obsolete)                                                                                                                                                               |
| 135 | personality             | `int personality(unsigned long persona)`                                                                                                                                 |
| 136 | ustat                   | `int ustat(dev_t dev, struct ustat *ubuf)`                                                                                                                               |
| 137 | statfs                  | `int statfs(const char *path, struct statfs *buf)`                                                                                                                       |
| 138 | fstatfs                 | `int fstatfs(int fd, struct statfs *buf)`                                                                                                                                |
| 139 | sysfs                   | (obsolete)                                                                                                                                                               |
| 140 | getpriority             | `int getpriority(int which, id_t who)`                                                                                                                                   |
| 141 | setpriority             | `int setpriority(int which, id_t who, int prio)`                                                                                                                         |
| 142 | sched_setparam          | `int sched_setparam(pid_t pid, const struct sched_param *param)`                                                                                                         |
| 143 | sched_getparam          | `int sched_getparam(pid_t pid, struct sched_param *param)`                                                                                                               |
| 144 | sched_setscheduler      | `int sched_setscheduler(pid_t pid, int policy, const struct sched_param *param)`                                                                                         |
| 145 | sched_getscheduler      | `int sched_getscheduler(pid_t pid)`                                                                                                                                      |
| 146 | sched_get_priority_max  | `int sched_get_priority_max(int policy)`                                                                                                                                 |
| 147 | sched_get_priority_min  | `int sched_get_priority_min(int policy)`                                                                                                                                 |
| 148 | sched_rr_get_interval   | `int sched_rr_get_interval(pid_t pid, struct timespec *tp)`                                                                                                              |
| 149 | mlock                   | `int mlock(const void *addr, size_t len)`                                                                                                                                |
| 150 | munlock                 | `int munlock(const void *addr, size_t len)`                                                                                                                              |
| 151 | mlockall                | `int mlockall(int flags)`                                                                                                                                                |
| 152 | munlockall              | `int munlockall(void)`                                                                                                                                                   |
| 153 | vhangup                 | `int vhangup(void)`                                                                                                                                                      |
| 154 | modify_ldt              | `int modify_ldt(int func, void *ptr, unsigned long bytecount)`                                                                                                           |
| 155 | pivot_root              | `int pivot_root(const char *new_root, const char *put_old)`                                                                                                              |
| 156 | \_sysctl                | (obsolete)                                                                                                                                                               |
| 157 | prctl                   | `int prctl(int option, unsigned long arg2, unsigned long arg3, unsigned long arg4, unsigned long arg5)`                                                                  |
| 158 | arch_prctl              | `int arch_prctl(int code, unsigned long addr)`                                                                                                                           |
| 159 | adjtimex                | `int adjtimex(struct timex *buf)`                                                                                                                                        |
| 160 | setrlimit               | `int setrlimit(int resource, const struct rlimit *rlim)`                                                                                                                 |
| 161 | chroot                  | `int chroot(const char *path)`                                                                                                                                           |
| 162 | sync                    | `void sync(void)`                                                                                                                                                        |
| 163 | acct                    | `int acct(const char *filename)`                                                                                                                                         |
| 164 | settimeofday            | `int settimeofday(const struct timeval *tv, const struct timezone *tz)`                                                                                                  |
| 165 | mount                   | `int mount(const char *source, const char *target, const char *filesystemtype, unsigned long mountflags, const void *data)`                                              |
| 166 | umount2                 | `int umount2(const char *target, int flags)`                                                                                                                             |
| 167 | swapon                  | `int swapon(const char *path, int swapflags)`                                                                                                                            |
| 168 | swapoff                 | `int swapoff(const char *path)`                                                                                                                                          |
| 169 | reboot                  | `int reboot(int magic, int magic2, int cmd, void *arg)`                                                                                                                  |
| 170 | sethostname             | `int sethostname(const char *name, size_t len)`                                                                                                                          |
| 171 | setdomainname           | `int setdomainname(const char *name, size_t len)`                                                                                                                        |
| 172 | iopl                    | `int iopl(int level)`                                                                                                                                                    |
| 173 | ioperm                  | `int ioperm(unsigned long from, unsigned long num, int turn_on)`                                                                                                         |
| 174 | create_module           | (obsolete)                                                                                                                                                               |
| 175 | init_module             | `int init_module(void *module_image, unsigned long len, const char *param_values)`                                                                                       |
| 176 | delete_module           | `int delete_module(const char *name, int flags)`                                                                                                                         |
| 177 | get_kernel_syms         | (obsolete)                                                                                                                                                               |
| 178 | query_module            | (obsolete)                                                                                                                                                               |
| 179 | quotactl                | `int quotactl(int cmd, const char *special, int id, caddr_t addr)`                                                                                                       |
| 180 | nfsservctl              | (obsolete)                                                                                                                                                               |
| 181 | getpmsg                 | (not implemented)                                                                                                                                                        |
| 182 | putpmsg                 | (not implemented)                                                                                                                                                        |
| 183 | afs_syscall             | (not implemented)                                                                                                                                                        |
| 184 | tuxcall                 | (not implemented)                                                                                                                                                        |
| 185 | security                | (not implemented)                                                                                                                                                        |
| 186 | gettid                  | `pid_t gettid(void)`                                                                                                                                                     |
| 187 | readahead               | `ssize_t readahead(int fd, off64_t offset, size_t count)`                                                                                                                |
| 188 | setxattr                | `int setxattr(const char *path, const char *name, const void *value, size_t size, int flags)`                                                                            |
| 189 | lsetxattr               | `int lsetxattr(const char *path, const char *name, const void *value, size_t size, int flags)`                                                                           |
| 190 | fsetxattr               | `int fsetxattr(int fd, const char *name, const void *value, size_t size, int flags)`                                                                                     |
| 191 | getxattr                | `ssize_t getxattr(const char *path, const char *name, void *value, size_t size)`                                                                                         |
| 192 | lgetxattr               | `ssize_t lgetxattr(const char *path, const char *name, void *value, size_t size)`                                                                                        |
| 193 | fgetxattr               | `ssize_t fgetxattr(int fd, const char *name, void *value, size_t size)`                                                                                                  |
| 194 | listxattr               | `ssize_t listxattr(const char *path, char *list, size_t size)`                                                                                                           |
| 195 | llistxattr              | `ssize_t llistxattr(const char *path, char *list, size_t size)`                                                                                                          |
| 196 | flistxattr              | `ssize_t flistxattr(int fd, char *list, size_t size)`                                                                                                                    |
| 197 | removexattr             | `int removexattr(const char *path, const char *name)`                                                                                                                    |
| 198 | lremovexattr            | `int lremovexattr(const char *path, const char *name)`                                                                                                                   |
| 199 | fremovexattr            | `int fremovexattr(int fd, const char *name)`                                                                                                                             |
| 200 | tkill                   | `int tkill(int tid, int sig)`                                                                                                                                            |
| 201 | time                    | `time_t time(time_t *tloc)`                                                                                                                                              |
| 202 | futex                   | `int futex(int *uaddr, int futex_op, int val, const struct timespec *timeout, int *uaddr2, int val3)`                                                                    |
| 203 | sched_setaffinity       | `int sched_setaffinity(pid_t pid, size_t cpusetsize, const cpu_set_t *mask)`                                                                                             |
| 204 | sched_getaffinity       | `int sched_getaffinity(pid_t pid, size_t cpusetsize, cpu_set_t *mask)`                                                                                                   |
| 205 | set_thread_area         | `int set_thread_area(struct user_desc *u_info)`                                                                                                                          |
| 206 | io_setup                | `int io_setup(unsigned nr_events, aio_context_t *ctx_idp)`                                                                                                               |
| 207 | io_destroy              | `int io_destroy(aio_context_t ctx_id)`                                                                                                                                   |
| 208 | io_getevents            | `int io_getevents(aio_context_t ctx_id, long min_nr, long nr, struct io_event *events, struct timespec *timeout)`                                                        |
| 209 | io_submit               | `int io_submit(aio_context_t ctx_id, long nr, struct iocb **iocbpp)`                                                                                                     |
| 210 | io_cancel               | `int io_cancel(aio_context_t ctx_id, struct iocb *iocb, struct io_event *result)`                                                                                        |
| 211 | get_thread_area         | `int get_thread_area(struct user_desc *u_info)`                                                                                                                          |
| 212 | lookup_dcookie          | `int lookup_dcookie(u64 cookie, char *buffer, size_t len)`                                                                                                               |
| 213 | epoll_create            | `int epoll_create(int size)`                                                                                                                                             |
| 214 | epoll_ctl_old           | (obsolete)                                                                                                                                                               |
| 215 | epoll_wait_old          | (obsolete)                                                                                                                                                               |
| 216 | remap_file_pages        | `int remap_file_pages(void *addr, size_t size, int prot, size_t pgoff, int flags)`                                                                                       |
| 217 | getdents64              | (no direct libc wrapper, use readdir)                                                                                                                                    |
| 218 | set_tid_address         | `long set_tid_address(int *tidptr)`                                                                                                                                      |
| 219 | restart_syscall         | (internal)                                                                                                                                                               |
| 220 | semtimedop              | `int semtimedop(int semid, struct sembuf *sops, size_t nsops, const struct timespec *timeout)`                                                                           |
| 221 | fadvise64               | `int posix_fadvise(int fd, off_t offset, off_t len, int advice)`                                                                                                         |
| 222 | timer_create            | `int timer_create(clockid_t clockid, struct sigevent *sevp, timer_t *timerid)`                                                                                           |
| 223 | timer_settime           | `int timer_settime(timer_t timerid, int flags, const struct itimerspec *new_value, struct itimerspec *old_value)`                                                        |
| 224 | timer_gettime           | `int timer_gettime(timer_t timerid, struct itimerspec *curr_value)`                                                                                                      |
| 225 | timer_getoverrun        | `int timer_getoverrun(timer_t timerid)`                                                                                                                                  |
| 226 | timer_delete            | `int timer_delete(timer_t timerid)`                                                                                                                                      |
| 227 | clock_settime           | `int clock_settime(clockid_t clockid, const struct timespec *tp)`                                                                                                        |
| 228 | clock_gettime           | `int clock_gettime(clockid_t clockid, struct timespec *tp)`                                                                                                              |
| 229 | clock_getres            | `int clock_getres(clockid_t clockid, struct timespec *res)`                                                                                                              |
| 230 | clock_nanosleep         | `int clock_nanosleep(clockid_t clockid, int flags, const struct timespec *request, struct timespec *remain)`                                                             |
| 231 | exit_group              | `void exit_group(int status)`                                                                                                                                            |
| 232 | epoll_wait              | `int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout)`                                                                                       |
| 233 | epoll_ctl               | `int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)`                                                                                                     |
| 234 | tgkill                  | `int tgkill(int tgid, int tid, int sig)`                                                                                                                                 |
| 235 | utimes                  | `int utimes(const char *filename, const struct timeval times[2])`                                                                                                        |
| 236 | vserver                 | (not implemented)                                                                                                                                                        |
| 237 | mbind                   | `long mbind(void *addr, unsigned long len, int mode, const unsigned long *nodemask, unsigned long maxnode, unsigned flags)`                                              |
| 238 | set_mempolicy           | `long set_mempolicy(int mode, const unsigned long *nodemask, unsigned long maxnode)`                                                                                     |
| 239 | get_mempolicy           | `long get_mempolicy(int *mode, unsigned long *nodemask, unsigned long maxnode, void *addr, unsigned long flags)`                                                         |
| 240 | mq_open                 | `mqd_t mq_open(const char *name, int oflag, mode_t mode, struct mq_attr *attr)`                                                                                          |
| 241 | mq_unlink               | `int mq_unlink(const char *name)`                                                                                                                                        |
| 242 | mq_timedsend            | `int mq_timedsend(mqd_t mqdes, const char *msg_ptr, size_t msg_len, unsigned int msg_prio, const struct timespec *abs_timeout)`                                          |
| 243 | mq_timedreceive         | `ssize_t mq_timedreceive(mqd_t mqdes, char *msg_ptr, size_t msg_len, unsigned int *msg_prio, const struct timespec *abs_timeout)`                                        |
| 244 | mq_notify               | `int mq_notify(mqd_t mqdes, const struct sigevent *sevp)`                                                                                                                |
| 245 | mq_getsetattr           | `int mq_getattr(mqd_t mqdes, struct mq_attr *attr)`, `int mq_setattr(mqd_t mqdes, const struct mq_attr *newattr, struct mq_attr *oldattr)`                               |
| 246 | kexec_load              | `long kexec_load(unsigned long entry, unsigned long nr_segments, struct kexec_segment *segments, unsigned long flags)`                                                   |
| 247 | waitid                  | `int waitid(idtype_t idtype, id_t id, siginfo_t *infop, int options)`                                                                                                    |
| 248 | add_key                 | `key_serial_t add_key(const char *type, const char *description, const void *payload, size_t plen, key_serial_t keyring)`                                                |
| 249 | request_key             | `key_serial_t request_key(const char *type, const char *description, const char *callout_info, key_serial_t dest_keyring)`                                               |
| 250 | keyctl                  | `long keyctl(int operation, ...)`                                                                                                                                        |
| 251 | ioprio_set              | `int ioprio_set(int which, int who, int ioprio)`                                                                                                                         |
| 252 | ioprio_get              | `int ioprio_get(int which, int who)`                                                                                                                                     |
| 253 | inotify_init            | `int inotify_init(void)`                                                                                                                                                 |
| 254 | inotify_add_watch       | `int inotify_add_watch(int fd, const char *pathname, uint32_t mask)`                                                                                                     |
| 255 | inotify_rm_watch        | `int inotify_rm_watch(int fd, int wd)`                                                                                                                                   |
| 256 | migrate_pages           | `long migrate_pages(int pid, unsigned long maxnode, const unsigned long *old_nodes, const unsigned long *new_nodes)`                                                     |
| 257 | openat                  | `int openat(int dirfd, const char *pathname, int flags, mode_t mode)`                                                                                                    |
| 258 | mkdirat                 | `int mkdirat(int dirfd, const char *pathname, mode_t mode)`                                                                                                              |
| 259 | mknodat                 | `int mknodat(int dirfd, const char *pathname, mode_t mode, dev_t dev)`                                                                                                   |
| 260 | fchownat                | `int fchownat(int dirfd, const char *pathname, uid_t owner, gid_t group, int flags)`                                                                                     |
| 261 | futimesat               | `int futimesat(int dirfd, const char *pathname, const struct timeval times[2])`                                                                                          |
| 262 | newfstatat              | `int fstatat(int dirfd, const char *pathname, struct stat *statbuf, int flags)`                                                                                          |
| 263 | unlinkat                | `int unlinkat(int dirfd, const char *pathname, int flags)`                                                                                                               |
| 264 | renameat                | `int renameat(int oldfd, const char *old, int newfd, const char *new)`                                                                                                   |
| 265 | linkat                  | `int linkat(int olddirfd, const char *oldpath, int newdirfd, const char *newpath, int flags)`                                                                            |
| 266 | symlinkat               | `int symlinkat(const char *target, int newdirfd, const char *linkpath)`                                                                                                  |
| 267 | readlinkat              | `ssize_t readlinkat(int dirfd, const char *pathname, char *buf, size_t bufsiz)`                                                                                          |
| 268 | fchmodat                | `int fchmodat(int dirfd, const char *pathname, mode_t mode, int flags)`                                                                                                  |
| 269 | faccessat               | `int faccessat(int dirfd, const char *pathname, int mode, int flags)`                                                                                                    |
| 270 | pselect6                | `int pselect(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, const struct timespec *timeout, const sigset_t *sigmask)`                                   |
| 271 | ppoll                   | `int ppoll(struct pollfd *fds, nfds_t nfds, const struct timespec *tmo_p, const sigset_t *sigmask)`                                                                      |
| 272 | unshare                 | `int unshare(int flags)`                                                                                                                                                 |
| 273 | set_robust_list         | `long set_robust_list(struct robust_list_head *head, size_t len)`                                                                                                        |
| 274 | get_robust_list         | `long get_robust_list(int pid, struct robust_list_head **head_ptr, size_t *len_ptr)`                                                                                     |
| 275 | splice                  | `ssize_t splice(int fd_in, loff_t *off_in, int fd_out, loff_t *off_out, size_t len, unsigned int flags)`                                                                 |
| 276 | tee                     | `ssize_t tee(int fd_in, int fd_out, size_t len, unsigned int flags)`                                                                                                     |
| 277 | sync_file_range         | `int sync_file_range(int fd, off64_t offset, off64_t nbytes, unsigned int flags)`                                                                                        |
| 278 | vmsplice                | `ssize_t vmsplice(int fd, const struct iovec *iov, unsigned long nr_segs, unsigned int flags)`                                                                           |
| 279 | move_pages              | `long move_pages(int pid, unsigned long count, void **pages, const int *nodes, int *status, int flags)`                                                                  |
| 280 | utimensat               | `int utimensat(int dirfd, const char *pathname, const struct timespec times[2], int flags)`                                                                              |
| 281 | epoll_pwait             | `int epoll_pwait(int epfd, struct epoll_event *events, int maxevents, int timeout, const sigset_t *sigmask)`                                                             |
| 282 | signalfd                | `int signalfd(int fd, const sigset_t *mask, int flags)`                                                                                                                  |
| 283 | timerfd_create          | `int timerfd_create(int clockid, int flags)`                                                                                                                             |
| 284 | eventfd                 | `int eventfd(unsigned int initval, int flags)`                                                                                                                           |
| 285 | fallocate               | `int fallocate(int fd, int mode, off_t offset, off_t len)`                                                                                                               |
| 286 | timerfd_settime         | `int timerfd_settime(int fd, int flags, const struct itimerspec *new_value, struct itimerspec *old_value)`                                                               |
| 287 | timerfd_gettime         | `int timerfd_gettime(int fd, struct itimerspec *curr_value)`                                                                                                             |
| 288 | accept4                 | `int accept4(int sockfd, struct sockaddr *addr, socklen_t *addrlen, int flags)`                                                                                          |
| 289 | signalfd4               | `int signalfd4(int fd, const sigset_t *mask, size_t sizemask, int flags)`                                                                                                |
| 290 | eventfd2                | `int eventfd2(unsigned int initval, int flags)`                                                                                                                          |
| 291 | epoll_create1           | `int epoll_create1(int flags)`                                                                                                                                           |
| 292 | dup3                    | `int dup3(int oldfd, int newfd, int flags)`                                                                                                                              |
| 293 | pipe2                   | `int pipe2(int pipefd[2], int flags)`                                                                                                                                    |
| 294 | inotify_init1           | `int inotify_init1(int flags)`                                                                                                                                           |
| 295 | preadv                  | `ssize_t preadv(int fd, const struct iovec *iov, int iovcnt, off_t offset)`                                                                                              |
| 296 | pwritev                 | `ssize_t pwritev(int fd, const struct iovec *iov, int iovcnt, off_t offset)`                                                                                             |
| 297 | rt_tgsigqueueinfo       | `int rt_tgsigqueueinfo(pid_t tgid, pid_t tid, int sig, siginfo_t *info)`                                                                                                 |
| 298 | perf_event_open         | `int perf_event_open(struct perf_event_attr *attr, pid_t pid, int cpu, int group_fd, unsigned long flags)`                                                               |
| 299 | recvmmsg                | `int recvmmsg(int sockfd, struct mmsghdr *msgvec, unsigned int vlen, int flags, struct timespec *timeout)`                                                               |
| 300 | fanotify_init           | `int fanotify_init(unsigned int flags, unsigned int event_f_flags)`                                                                                                      |
| 301 | fanotify_mark           | `int fanotify_mark(int fanotify_fd, unsigned int flags, uint64_t mask, int dirfd, const char *pathname)`                                                                 |
| 302 | prlimit64               | `int prlimit(pid_t pid, int resource, const struct rlimit64 *new_limit, struct rlimit64 *old_limit)`                                                                     |
| 303 | name_to_handle_at       | `int name_to_handle_at(int dirfd, const char *pathname, struct file_handle *handle, int *mount_id, int flags)`                                                           |
| 304 | open_by_handle_at       | `int open_by_handle_at(int mount_fd, struct file_handle *handle, int flags)`                                                                                             |
| 305 | clock_adjtime           | `int clock_adjtime(clockid_t clk_id, struct timex *buf)`                                                                                                                 |
| 306 | syncfs                  | `int syncfs(int fd)`                                                                                                                                                     |
| 307 | sendmmsg                | `int sendmmsg(int sockfd, struct mmsghdr *msgvec, unsigned int vlen, int flags)`                                                                                         |
| 308 | setns                   | `int setns(int fd, int nstype)`                                                                                                                                          |
| 309 | getcpu                  | `int getcpu(unsigned *cpu, unsigned *node, struct getcpu_cache *tcache)`                                                                                                 |
| 310 | process_vm_readv        | `ssize_t process_vm_readv(pid_t pid, const struct iovec *local_iov, unsigned long liovcnt, const struct iovec *remote_iov, unsigned long riovcnt, unsigned long flags)`  |
| 311 | process_vm_writev       | `ssize_t process_vm_writev(pid_t pid, const struct iovec *local_iov, unsigned long liovcnt, const struct iovec *remote_iov, unsigned long riovcnt, unsigned long flags)` |
| 312 | kcmp                    | `int kcmp(pid_t pid1, pid_t pid2, int type, unsigned long idx1, unsigned long idx2)`                                                                                     |     |
| 313 | finit_module            | `int finit_module(int fd, const char *param_values, int flags)`                                                                                                          |
| 314 | sched_setattr           | `int sched_setattr(pid_t pid, struct sched_attr *attr, unsigned int flags)`                                                                                              |
| 315 | sched_getattr           | `int sched_getattr(pid_t pid, struct sched_attr *attr, unsigned int size, unsigned int flags)`                                                                           |
| 316 | renameat2               | `int renameat2(int oldfd, const char *old, int newfd, const char *new, unsigned flags)`                                                                                  |
| 317 | seccomp                 | `int seccomp(unsigned int operation, unsigned int flags, void *args)`                                                                                                    |     |
| 318 | getrandom               | `ssize_t getrandom(void *buf, size_t buflen, unsigned int flags)`                                                                                                        |
| 319 | memfd_create            | `int memfd_create(const char *name, unsigned int flags)`                                                                                                                 |
| 320 | kexec_file_load         | `long kexec_file_load(int kernel_fd, int initrd_fd, unsigned long cmdline_len, const char *cmdline, unsigned long flags)`                                                |
| 321 | bpf                     | `int bpf(int cmd, union bpf_attr *attr, unsigned int size)`                                                                                                              |
| 322 | execveat                | `int execveat(int dirfd, const char *pathname, char *const argv[], char *const envp[], int flags)`                                                                       |
| 323 | userfaultfd             | `int userfaultfd(int flags)`                                                                                                                                             |
| 324 | membarrier              | `int membarrier(int cmd, unsigned int flags, int cpu_id)`                                                                                                                |
| 325 | mlock2                  | `int mlock2(const void *addr, size_t len, unsigned int flags)`                                                                                                           |
| 326 | copy_file_range         | `ssize_t copy_file_range(int fd_in, loff_t *off_in, int fd_out, loff_t *off_out, size_t len, unsigned int flags)`                                                        |
| 327 | preadv2                 | `ssize_t preadv2(int fd, const struct iovec *iov, int iovcnt, off_t offset, int flags)`                                                                                  |
| 328 | pwritev2                | `ssize_t pwritev2(int fd, const struct iovec *iov, int iovcnt, off_t offset, int flags)`                                                                                 |
| 329 | pkey_mprotect           | `int pkey_mprotect(void *addr, size_t len, int prot, int pkey)`                                                                                                          |
| 330 | pkey_alloc              | `int pkey_alloc(unsigned int flags, unsigned int access_rights)`                                                                                                         |
| 331 | pkey_free               | `int pkey_free(int pkey)`                                                                                                                                                |
| 332 | statx                   | `int statx(int dirfd, const char *pathname, int flags, unsigned int mask, struct statx *statxbuf)`                                                                       |
| 333 | io_pgetevents           | `int io_pgetevents(aio_context_t ctx_id, long min_nr, long nr, struct io_event *events, struct timespec *timeout, const sigset_t *sigmask)`                              |
| 334 | rseq                    | `int rseq(struct rseq *rseq, uint32_t rseq_len, int flags, uint32_t sig)`                                                                                                |
| 424 | pidfd_send_signal       | `int pidfd_send_signal(int pidfd, int sig, siginfo_t *info, unsigned int flags)`                                                                                         |
| 425 | io_uring_setup          | `int io_uring_setup(u32 entries, struct io_uring_params *params)`                                                                                                        |
| 426 | io_uring_enter          | `int io_uring_enter(unsigned int fd, u32 to_submit, u32 min_complete, u32 flags, const sigset_t *sig, size_t sigsz)`                                                     |
| 427 | io_uring_register       | `int io_uring_register(unsigned int fd, unsigned int opcode, void *arg, unsigned int nr_args)`                                                                           |
| 428 | open_tree               | `int open_tree(int dirfd, const char *pathname, unsigned int flags)`                                                                                                     |
| 429 | move_mount              | `int move_mount(int from_dfd, const char *from_pathname, int to_dfd, const char *to_pathname, unsigned int flags)`                                                       |
| 430 | fsopen                  | `int fsopen(const char *fsname, unsigned int flags)`                                                                                                                     |
| 431 | fsconfig                | `int fsconfig(int fd, unsigned int cmd, const char *key, const void *value, int aux)`                                                                                    |
| 432 | fsmount                 | `int fsmount(int fd, unsigned int flags, unsigned int attr_flags)`                                                                                                       |
| 433 | fspick                  | `int fspick(int dirfd, const char *pathname, unsigned int flags)`                                                                                                        |
| 434 | pidfd_open              | `int pidfd_open(pid_t pid, unsigned int flags)`                                                                                                                          |
| 435 | clone3                  | `long clone3(struct clone_args *cl_args, size_t size)`                                                                                                                   |
| 436 | close_range             | `int close_range(unsigned int fd, unsigned int max_fd, unsigned int flags)`                                                                                              |
| 437 | openat2                 | `long openat2(int dirfd, const char *pathname, struct open_how *how, size_t size)`                                                                                       |
| 438 | pidfd_getfd             | `int pidfd_getfd(int pidfd, int fd, unsigned int flags)`                                                                                                                 |
| 439 | faccessat2              | `int faccessat2(int dirfd, const char *pathname, int mode, int flags)`                                                                                                   |
| 440 | process_madvise         | `ssize_t process_madvise(int pidfd, const struct iovec *iovec, size_t vlen, int advice, unsigned int flags)`                                                             |
| 441 | epoll_pwait2            | `int epoll_pwait2(int epfd, struct epoll_event *events, int maxevents, const struct timespec *timeout, const sigset_t *sigmask)`                                         |
| 442 | mount_setattr           | `int mount_setattr(int dirfd, const char *pathname, unsigned int flags, struct mount_attr *attr, size_t size)`                                                           |
| 443 | quotactl_fd             | `int quotactl_fd(unsigned int fd, unsigned int cmd, int id, void *addr)`                                                                                                 |
| 444 | landlock_create_ruleset | `int landlock_create_ruleset(const struct landlock_ruleset_attr *attr, size_t size, __u32 flags)`                                                                        |
| 445 | landlock_add_rule       | `int landlock_add_rule(int ruleset_fd, enum landlock_rule_type rule_type, const void *rule_attr, __u32 flags)`                                                           |
| 446 | landlock_restrict_self  | `int landlock_restrict_self(int ruleset_fd, __u32 flags)`                                                                                                                |
| 447 | memfd_secret            | `int memfd_secret(unsigned int flags)`                                                                                                                                   |
| 448 | process_mrelease        | `int process_mrelease(int pidfd, unsigned int flags)`                                                                                                                    |
| 449 | futex_waitv             | `int futex_waitv(struct futex_waitv *waiters, unsigned int nr_futexes, unsigned int flags, struct timespec *timeout, clockid_t clockid)`                                 |
| 450 | set_mempolicy_home_node | `long set_mempolicy_home_node(unsigned long start, unsigned long len, unsigned long home_node, unsigned long flags)`                                                     |
| 451 | cachestat               | `int cachestat(unsigned int fd, struct cachestat_range *cstat_range, struct cachestat *cstat, unsigned int flags)`                                                       |
| 452 | fchmodat2               | `int fchmodat2(int dirfd, const char *pathname, mode_t mode, int flags)`                                                                                                 |
| 453 | map_shadow_stack        | `void *map_shadow_stack(void *addr, size_t size, unsigned int flags)`                                                                                                    |
| 454 | futex_wake              | `int futex_wake(void *uaddr, unsigned int nr_wake, unsigned int flags)`                                                                                                  |
| 455 | futex_wait              | `int futex_wait(void *uaddr, unsigned int val, unsigned int flags, struct timespec *timeout, clockid_t clockid)`                                                         |
| 456 | futex_requeue           | `int futex_requeue(void *uaddr, void *uaddr2, unsigned int nr_wake, unsigned int nr_requeue, unsigned int cmpval, unsigned int flags)`                                   |
| 457 | statmount               | `int statmount(const struct mnt_id_req *req, struct statmount *buf, size_t bufsize, unsigned int flags)`                                                                 |
| 458 | listmount               | `int listmount(const struct mnt_id_req *req, u64 *mnt_ids, size_t nr_mnt_ids, unsigned int flags)`                                                                       |
| 459 | lsm_get_self_attr       | `int lsm_get_self_attr(unsigned int attr, struct lsm_ctx *ctx, size_t *size, unsigned int flags)`                                                                        |
| 460 | lsm_set_self_attr       | `int lsm_set_self_attr(unsigned int attr, struct lsm_ctx *ctx, size_t size, unsigned int flags)`                                                                         |
| 461 | lsm_list_modules        | `int lsm_list_modules(u64 *ids, size_t *cnt, unsigned int flags)`                                                                                                        |
| 462 | mseal                   | `int mseal(void *addr, size_t len, unsigned long flags)`                                                                                                                 |

- 101-150: 进程管理、信号处理、调度器
- ptrace, getuid/setuid, 各种进程组和权限管理函数
- 信号处理函数 (sigpending, sigtimedwait, sigsuspend)
- 调度器函数 (sched_setparam, sched_getscheduler)
- 内存锁定 (mlock, munlock, mlockall)
- 151-200: 系统管理、文件系统、扩展属性
- 系统管理 (pivot_root, prctl, mount, umount2, reboot)
- 模块管理 (init_module, delete_module)
- 扩展属性 (setxattr, getxattr, listxattr, removexattr)
- 内核日志 (syslog)
- 201-250: 定时器、epoll、消息队列
- POSIX 定时器 (timer_create, timer_settime, clock_gettime)
- epoll 事件机制 (epoll_create, epoll_ctl, epoll_wait)
- 异步 I/O (io_setup, io_submit, io_getevents)
- POSIX 消息队列 (mq_open, mq_send, mq_receive)
- 251-300: 现代 Linux 特性
- inotify 文件监控 (inotify_init, inotify_add_watch)
- 新的文件操作 (openat, mkdirat, fchownat, unlinkat)
- 高级 I/O (splice, tee, vmsplice, fallocate)
- 事件通知 (eventfd, timerfd, signalfd)
- 301-450: 最新系统调用
- 命名空间 (setns, unshare)
- cgroups 和容器技术 (clone3)
- 现代文件系统 (syncfs, copy_file_range, statx)
- io_uring 异步 I/O (io_uring_setup, io_uring_enter)
- 安全特性 (`landlock_*`, seccomp, memfd_secret)
- 进程文件描述符 (pidfd_open, pidfd_getfd)
- 451-462 - 最新系统调用:
- cachestat: 获取文件缓存统计信息
- fchmodat2: fchmodat 的增强版本，支持更多标志位
- map_shadow_stack: Intel CET 影子栈支持
- futex_wake/wait/requeue: 新的 futex API，替代旧的 futex 系统调用
- statmount/listmount: 新的挂载点查询 API
- `lsm_*`: Linux 安全模块 (LSM) 属性管理
- mseal: 内存密封，防止内存区域被修改

```c
int rename(const char *old, const char *new);
syscall(SYS_rename, old, new);
syscall(SYS_renameat, AT_FDCWD, old, AT_FDCWD, new);
syscall(SYS_renameat2, AT_FDCWD, old, AT_FDCWD, new, 0);
```

- kcm -> Kernel Samepage Merging
- seccmp -> Secure Computing Mode
- [seccomp.2](https://man7.org/linux/man-pages/man2/seccomp.2.html)
  - 一种沙箱机制
  - SECCOMP_MODE_FILTER
    - 通过回调函数过滤 syscall
    - 过滤器适用 `BPF` 语言
- [google/gvisor](https://github.com/google/gvisor)
  - 拦截 syscall 实现容器隔离
- https://github.com/linux-audit/audit-userspace/blob/master/lib/x86_64_table.h
- https://github.com/kraj/musl/blob/master/src/internal/syscall.h

# FAQ

## BPF vs eBPF

- BPF - Berkeley Packet Filter
  - 1992年由Steven McCanne和Van Jacobson在BSD上实现
  - 用于过滤网络数据包
- eBPF - extended Berkeley Packet Filter
  - 2014年由Alexei Starovoitov在Linux内核中实现
  - 用于过滤系统调用
  - 提升内核监控和分析能力
