"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["23554"],{68596:function(e,n,l){l.r(n),l.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>h,assets:()=>d,toc:()=>c,frontMatter:()=>r});var i=JSON.parse('{"id":"db/relational/sqlite/sqlean","title":"SQLean","description":"- nalgeon/sqlean","source":"@site/../notes/db/relational/sqlite/sqlean.md","sourceDirName":"db/relational/sqlite","slug":"/db/relational/sqlite/sqlean","permalink":"/notes/db/relational/sqlite/sqlean","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/sqlite/sqlean.md","tags":[{"inline":true,"label":"Extension","permalink":"/notes/tags/extension"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1736508300000,"frontMatter":{"tags":["Extension"]},"sidebar":"docs","previous":{"title":"sqlar","permalink":"/notes/db/relational/sqlite/sqlar"},"next":{"title":"SQLite FAQ","permalink":"/notes/db/relational/sqlite/faq"}}'),s=l("52676"),t=l("79938");let r={tags:["Extension"]},a="SQLean",d={},c=[{value:"Install",id:"install",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"sqlean",children:"SQLean"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/nalgeon/sqlean",children:"nalgeon/sqlean"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"MIT, C"}),"\n",(0,s.jsx)(n.li,{children:"\u6269\u5C55\u5408\u96C6"}),"\n",(0,s.jsxs)(n.li,{children:["crypto: \u63D0\u4F9B\u54C8\u5E0C\u3001\u7F16\u7801\u4E0E\u89E3\u7801\u529F\u80FD\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"crypto_{blake3,md5,sha1,sha256,sha384,sha512}"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"crypto_encode('data',base32|base64|base86|hex|url)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"crypto_decode(text, algo)"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["define: \u7528\u6237\u81EA\u5B9A\u4E49\u51FD\u6570\u4E0E\u52A8\u6001 SQL\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"eval, define, undefine, define_free"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"create virtual table NAME using define((BODY))"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"select * from sqlean_define"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["fileio: \u8BFB\u5199\u6587\u4EF6\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"fileio_{read,scan,write,append,mkdir,symlink,ls}"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"fuzzy: \u6A21\u7CCA\u5B57\u7B26\u4E32\u5339\u914D\u4E0E\u97F3\u5F8B\u5206\u6790"}),"\n",(0,s.jsx)(n.li,{children:"ipaddr: IP \u5730\u5740\u64CD\u4F5C"}),"\n",(0,s.jsx)(n.li,{children:"math: \u6570\u5B66\u51FD\u6570"}),"\n",(0,s.jsx)(n.li,{children:"regexp: \u6B63\u5219\u8868\u8FBE\u5F0F\u652F\u6301"}),"\n",(0,s.jsx)(n.li,{children:"stats: \u6570\u5B66\u7EDF\u8BA1"}),"\n",(0,s.jsx)(n.li,{children:"text: \u5B57\u7B26\u4E32\u4E0E Unicode \u51FD\u6570"}),"\n",(0,s.jsxs)(n.li,{children:["time: \u9AD8\u7CBE\u5EA6\u65E5\u671F/\u65F6\u95F4\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"duration, nanosecond precision"}),"\n",(0,s.jsx)(n.li,{children:"time_now(), time_date()"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"time_get_{year,month,day,hour,minute,second,nano,weekday,yearday,isoyear,isoweek}"})}),"\n",(0,s.jsx)(n.li,{children:"time_get, time_unix, time_milli, time_micro, time_nano"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"time_{after,before,compare,equal}"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"time_{add,sub,since,until,trunc,round}"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["uuid: \u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"uuid4, uuid7"}),"\n",(0,s.jsx)(n.li,{children:"uuid7_timestamp_ms, uuid_str, uuid_blob"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"vsv: CSV \u6587\u4EF6\u865A\u62DF\u8868"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/nalgeon/sqlean.js",children:"nalgeon/sqlean.js"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"npm:@antonz/sqlean"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Playground ",(0,s.jsx)(n.a,{href:"https://sqlime.org/",children:"https://sqlime.org/"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"install",children:"Install"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/nalgeon/sqlean/blob/main/docs/install.md",children:"https://github.com/nalgeon/sqlean/blob/main/docs/install.md"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/nalgeon/sqlean/releases",children:"https://github.com/nalgeon/sqlean/releases"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return a},a:function(){return r}});var i=l(75271);let s={},t=i.createContext(s);function r(e){let n=i.useContext(t);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);