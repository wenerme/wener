"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81093"],{30476:function(e,l,s){s.r(l),s.d(l,{metadata:()=>n,contentTitle:()=>i,default:()=>q,assets:()=>c,toc:()=>d,frontMatter:()=>a});var n=JSON.parse('{"id":"db/relational/sqlite/sqlar","title":"sqlar","description":"- sqlar - \u81EA 2014 \u5E74 3.22.0 \u7248\u672C","source":"@site/../notes/db/relational/sqlite/sqlar.md","sourceDirName":"db/relational/sqlite","slug":"/db/relational/sqlite/sqlar","permalink":"/notes/db/relational/sqlite/sqlar","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/sqlite/sqlar.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1678453938000,"frontMatter":{"title":"sqlar"},"sidebar":"docs","previous":{"title":"litestream","permalink":"/notes/db/relational/sqlite/litestream"},"next":{"title":"SQLean","permalink":"/notes/db/relational/sqlite/sqlean"}}'),r=s("52676"),t=s("79938");let a={title:"sqlar"},i="sqlar",c={},d=[{value:"sqlarfs",id:"sqlarfs",level:2}];function o(e){let l={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.header,{children:(0,r.jsx)(l.h1,{id:"sqlar",children:"sqlar"})}),"\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsxs)(l.li,{children:[(0,r.jsx)(l.a,{href:"https://www.sqlite.org/sqlar.html",children:"sqlar"})," - \u81EA 2014 \u5E74 3.22.0 \u7248\u672C\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:(0,r.jsx)(l.a,{href:"https://www.sqlite.org/src/tarball/sqlite.tar.gz?t=version-3.31.1",children:"https://www.sqlite.org/src/tarball/sqlite.tar.gz?t=version-3.31.1"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(l.li,{children:[(0,r.jsx)(l.a,{href:"https://sqlite.org/sqlar/doc/trunk/README.md",children:"sqlar"})," \u72EC\u7ACB\u7A0B\u5E8F\n",(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"sqlarfs \u652F\u6301\u6302\u8F7D\u4E3A fuse - \u53EA\u8BFB"}),"\n",(0,r.jsxs)(l.li,{children:["2018-01-07 ",(0,r.jsx)(l.a,{href:"https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f",children:"https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(l.admonition,{type:"tip",children:(0,r.jsxs)(l.ul,{children:["\n",(0,r.jsx)(l.li,{children:"\u76EE\u5F55 data \u4E3A null, sz=0"}),"\n",(0,r.jsxs)(l.li,{children:["\u5982\u679C ",(0,r.jsx)(l.code,{children:"length(sqlar.blob) < sqlar.sz"})," \u90A3\u4E48\u6570\u636E\u5219\u662F\u538B\u7F29\u8FC7"]}),"\n",(0,r.jsxs)(l.li,{children:["\u5982\u679C ",(0,r.jsx)(l.code,{children:"length(sqlar.blob) == sqlar.sz"})," \u90A3\u4E48\u6570\u636E\u5219\u662F\u6CA1\u538B\u7F29\u8FC7\u7684"]}),"\n",(0,r.jsxs)(l.li,{children:["\u7B26\u53F7\u8FDE\u63A5 ",(0,r.jsx)(l.code,{children:"sz = -1"}),", \u8FDE\u63A5\u76EE\u6807\u4F7F\u7528\u660E\u6587\u5B58\u50A8\u5728 data"]}),"\n",(0,r.jsxs)(l.li,{children:["\u538B\u7F29\u4F7F\u7528 deflate - \u5305\u542B\u5934 ",(0,r.jsx)(l.code,{children:"789c"})," \u548C\u7ED3\u5C3E 4 \u5B57\u8282\u7684 checksum"]}),"\n"]})}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-sql",children:"-- \u521B\u5EFA sqlar \u4F7F\u7528\u7684\u8868\nCREATE TABLE sqlar(\n  name TEXT PRIMARY KEY,  -- name of the file\n  mode INT,               -- access permissions\n  mtime INT,              -- last modification time\n  sz INT,                 -- original file size\n  data BLOB               -- compressed content\n);\n"})}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-bash",children:'# \u521B\u5EFA\nsqlite3 alltxt.sqlar -Ac *.txt\n# \u66F4\u65B0\nsqlite3 example.sqlar -Au *.md\n# \u663E\u793A\u6587\u4EF6\nsqlite3 example.sqlar -Atv\n# \u63D0\u53D6\nsqlite3 example.sqlar -Ax\n\n# -A \u7B49\u540C\u4E8E .ar\nsqlite3 my.sqlar -Acv file1 file2 file3\nsqlite3 my.sqlar ".ar -cv file1 file2 file3"\n\n# \u7C7B\u4F3C\u4E8E -Atv\nsqlite3 my.sqlar "select name,mode,sz,mtime from sqlar"\n'})}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-sql",children:"-- \u6587\u4EF6 33188 = 0100644\n-- \u76EE\u5F55 16877 = 040755\n\n-- \u7EDF\u4E00\u4FEE\u6539 mode\n-- \u6587\u4EF6\nupdate sqlar set mode=33188 where data is not null;\n-- \u76EE\u5F55\nupdate sqlar set mode=16877 where data is null;\n"})}),"\n",(0,r.jsx)(l.h2,{id:"sqlarfs",children:"sqlarfs"}),"\n",(0,r.jsx)(l.pre,{children:(0,r.jsx)(l.code,{className:"language-bash",children:"# \u4F7F\u7528 archive\ncurl https://www.sqlite.org/sqlar/tarball/sqlar.tar.gz?c=4824e7389653a46f -o sqlar-v20180107.tar.gz\n\n# \u6216\u8005\u5355\u6587\u4EF6\ncurl https://sqlite.org/sqlar/raw/sqlar.c?name=bbef7d188353c00bd2144b1d37e64991a62ef062 -o sqlar.c\ncurl https://sqlite.org/sqlar/raw/sqlarfs.c?name=b624195c04067a762ecf16693592d0a263140c63 -o sqlarfs.c\n\n# \u4F9D\u8D56 - \u5982\u679C\u4F7F\u7528\u5D4C\u5165\u7684 sqlite3.c \u5219\u4E0D\u9700\u8981 sqlite-dev\napk add zlib-dev fuse-dev sqlite-dev\n\n# \u7F16\u8BD1\ngcc sqlarfs.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lfuse -lz -o sqlarfs\ngcc sqlar.c -D_FILE_OFFSET_BITS=64 -lsqlite3 -lz -o sqlar\n"})})]})}function q(e={}){let{wrapper:l}={...(0,t.a)(),...e.components};return l?(0,r.jsx)(l,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},79938:function(e,l,s){s.d(l,{Z:function(){return i},a:function(){return a}});var n=s(75271);let r={},t=n.createContext(r);function a(e){let l=n.useContext(t);return n.useMemo(function(){return"function"==typeof e?e(l):{...l,...e}},[l,e])}function i(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(t.Provider,{value:l},e.children)}}}]);