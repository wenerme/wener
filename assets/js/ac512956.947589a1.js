"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["46479"],{37827:function(n,e,t){t.r(e),t.d(e,{metadata:()=>i,contentTitle:()=>l,default:()=>u,assets:()=>d,toc:()=>c,frontMatter:()=>o});var i=JSON.parse('{"id":"os/linux/posix","title":"POSIX","description":"- POSIX - Portable Operating System Interface","source":"@site/../notes/os/linux/posix.md","sourceDirName":"os/linux","slug":"/os/linux/posix","permalink":"/notes/os/linux/posix","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/posix.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1730783995000,"frontMatter":{"title":"POSIX"},"sidebar":"docs","previous":{"title":"Nix","permalink":"/notes/os/linux/pm/nix"},"next":{"title":"ACL","permalink":"/notes/os/linux/security/chmod"}}'),r=t("52676"),s=t("79938");let o={title:"POSIX"},l="POSIX",d={},c=[];function a(n){let e={a:"a",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"posix",children:"POSIX"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["POSIX - Portable Operating System Interface\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"POSIX.1-2008 - v7"}),"\n",(0,r.jsx)(e.li,{children:"2024-06-14 POSIX.1-2024, IEEE Std 1003.1-2024 - v8"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"SUS - Single Unix Specification"}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://pubs.opengroup.org/onlinepubs/9799919799/",children:"https://pubs.opengroup.org/onlinepubs/9799919799/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/POSIX",children:"POSIX"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.quobyte.com/storage-explained/posix-filesystem",children:"What is a POSIX file system?"})}),"\n",(0,r.jsxs)(e.li,{children:["\u6210\u5458 ",(0,r.jsx)(e.a,{href:"https://reports.opengroup.org/all.shtml",children:"https://reports.opengroup.org/all.shtml"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"POSIX Programmer's Manual"}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"dirent.h - Directory Entries - \u76EE\u5F55\u9879"}),"\n",(0,r.jsx)(e.li,{children:"unistd.h - Unix Standard - Standard Symbolic Constants and Types - \u6807\u51C6\u7B26\u53F7\u5E38\u91CF\u548C\u7C7B\u578B"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-c",children:"struct dirent {\n  ino_t          d_ino;       /* Inode\u7F16\u53F7 */\n  off_t          d_off;       /* \u4E0D\u662F\u504F\u79FB\u91CF\uFF0C\u8BE6\u89C1\u4E0B\u6587 */\n  unsigned short d_reclen;    /* \u6B64\u8BB0\u5F55\u7684\u957F\u5EA6 */\n  unsigned char  d_type;      /* \u6587\u4EF6\u7C7B\u578B\uFF0C\u4E0D\u662F\u6240\u6709\u6587\u4EF6\u7CFB\u7EDF\u90FD\u652F\u6301 */\n  char           d_name[256]; /* \u4EE5\u7A7A\u5B57\u7B26\u7ED3\u5C3E\u7684\u6587\u4EF6\u540D */\n};\n\n\n#define DT_UNKNOWN 0 // Unknown file type\n#define DT_FIFO    1 // FIFO (named pipe)\n#define DT_CHR     2 // Character device - \u5B57\u7B26\u8BBE\u5907\n#define DT_DIR     4 // Directory - \u76EE\u5F55\n#define DT_BLK     6 // Block device - \u5757\u8BBE\u5907\n#define DT_REG     8 // Regular file - \u6587\u4EF6\n#define DT_LNK    10 // Symbolic link - \u7B26\u53F7\u94FE\u63A5\n#define DT_SOCK   12 // Socket - \u5957\u63A5\u5B57\n#define DT_WHT    14 //\n\nint            alphasort(const struct dirent **, const struct dirent **);\nint            closedir(DIR *);\nint            dirfd(DIR *);\nDIR           *fdopendir(int);\nDIR           *opendir(const char *);\nssize_t        posix_getdents(int, void *, size_t, int);\nstruct dirent *readdir(DIR *);\nint            readdir_r(DIR *restrict, struct dirent *restrict, struct dirent **restrict);\nvoid           rewinddir(DIR *);\nint            scandir(const char *, struct dirent ***, int (*)(const struct dirent *), int (*)(const struct dirent **, const struct dirent **));\nvoid           seekdir(DIR *, long);\nlong           telldir(DIR *);\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/bminor/musl/blob/master/include/dirent.h",children:"https://github.com/bminor/musl/blob/master/include/dirent.h"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/unistd.h.html",children:"https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/unistd.h.html"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/dirent.h.html",children:"https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/basedefs/dirent.h.html"})}),"\n"]})]})}function u(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return l},a:function(){return o}});var i=t(75271);let r={},s=i.createContext(r);function o(n){let e=i.useContext(s);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:o(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);