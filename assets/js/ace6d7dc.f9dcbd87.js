"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["13184"],{26650:function(n,e,s){s.r(e),s.d(e,{metadata:()=>l,contentTitle:()=>c,default:()=>a,assets:()=>t,toc:()=>h,frontMatter:()=>d});var l=JSON.parse('{"id":"db/kv/redis/redis-acl","title":"ACL","description":"- Redis v6 ACLv1","source":"@site/../notes/db/kv/redis/redis-acl.md","sourceDirName":"db/kv/redis","slug":"/db/kv/redis/acl","permalink":"/notes/db/kv/redis/acl","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/kv/redis/redis-acl.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725936322000,"frontMatter":{"title":"ACL"},"sidebar":"docs","previous":{"title":"Redis","permalink":"/notes/db/kv/redis/"},"next":{"title":"redis-cli","permalink":"/notes/db/kv/redis/cli"}}'),i=s("52676"),r=s("79938");let d={title:"ACL"},c="Redis ACL",t={},h=[];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"redis-acl",children:"Redis ACL"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Redis v6 ACLv1"}),"\n",(0,i.jsxs)(e.li,{children:["Redis v7 ACLv1\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8BFB\u5199\u3001\u547D\u4EE4"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.admonition,{type:"caution",children:(0,i.jsxs)(e.p,{children:["ACL \u662F\u914D\u7F6E\uFF0C\u4E0D\u662F\u6570\u636E\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u540C\u6B65\uFF0C\u4E0D\u4F1A\u6301\u4E45\u3002 ",(0,i.jsx)(e.a,{href:"https://github.com/redis/redis/issues/7988",children:"#7988"})]})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5BA2\u6237\u7AEF ",(0,i.jsx)(e.code,{children:"AUTH <username> <password>"})]}),"\n",(0,i.jsxs)(e.li,{children:["\u9ED8\u8BA4\u7528\u6237 ",(0,i.jsx)(e.code,{children:"AUTH <password>"})]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-txt",metastring:'title="\u9ED8\u8BA4\u914D\u7F6E"',children:"user default on nopass ~* &* +@all\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-txt",children:"# user <username> on <password> ~<pattern> &<pattern> +<command> -<command> +@<category> -@<category>\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5BC6\u7801\u8BBE\u7F6E\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"nopass"})}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:">\u5BC6\u7801"}),"/",(0,i.jsx)(e.code,{children:"<\u5BC6\u7801"})," - \u8BBE\u7F6E/\u79FB\u9664 \u660E\u6587\u5BC6\u7801"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"#<hash>"}),"/",(0,i.jsx)(e.code,{children:"!<hash>"})," - \u8BBE\u7F6E/\u79FB\u9664 SHA-256 \u5BC6\u7801"]}),"\n",(0,i.jsx)(e.li,{children:"resetpass \u91CD\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u547D\u4EE4\u6743\u9650\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"+<command>"}),",",(0,i.jsx)(e.code,{children:"-<command>"}),",",(0,i.jsx)(e.code,{children:"+@<category>"}),",",(0,i.jsx)(e.code,{children:"-@<category>"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["v7.0 \u652F\u6301\u7981\u6B62\u5B50\u547D\u4EE4 - \u4F8B\u5982 ",(0,i.jsx)(e.code,{children:"-config|set"})]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"ACL CAT"})," \u6240\u6709\u5206\u7C7B"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"+<command>|arg"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u4F8B\u5982: ",(0,i.jsx)(e.code,{children:"-SELECT|1"})," \u7981\u6B62 select 1 DB"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"allcommands"})," -> ",(0,i.jsx)(e.code,{children:"+@all"})]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"nocommands"})," -> ",(0,i.jsx)(e.code,{children:"-@all"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Key \u6743\u9650\u9650\u5B9A\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"~<pattern>"})}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"allkeys"})," -> ",(0,i.jsx)(e.code,{children:"~*"})]}),"\n",(0,i.jsx)(e.li,{children:"resetkeys - \u91CD\u7F6E"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"%R~<pattern>"}),",",(0,i.jsx)(e.code,{children:"%W~<pattern>"}),",",(0,i.jsx)(e.code,{children:"%RW~<pattern>"})," - v7.0+ \u9650\u5B9A \u8BFB\u5199"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Pub/Sub \u9650\u5B9A\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"&<pattern>"})," - v6.2+"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"allchannels"})," -> ",(0,i.jsx)(e.code,{children:"&*"})]}),"\n",(0,i.jsx)(e.li,{children:"resetchannels - \u91CD\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"reset - \u91CD\u7F6E\u6240\u6709\u89C4\u5219"}),"\n",(0,i.jsxs)(e.li,{children:["selector - v7.0+\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"(<rule list>)"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"clearselectors"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ini",children:"# user default on nopass ~* &* +@all\n\n# \u4E3A\u9ED8\u8BA4\u7528\u6237\u8BBE\u7F6E\u5BC6\u7801\nACL SETUSER default >PASSWD\n\n# \u5BA2\u6237\u7AEF \u6D4B\u8BD5\u5BC6\u7801\u662F\u5426\u6B63\u786E\nHELLO 3 AUTH default PASSWD\n\n# \u5173\u95ED\u9ED8\u8BA4\u7528\u6237 - \u5982\u679C\u52A0\u4E86\u5176\u4ED6\u7528\u6237\nACL SETUSER default off\n\n# \u91CD\u65B0\u8BBE\u7F6E\nACL SETUSER admin reset on ~* >ADMIN &* +@all\n# \u91CD\u65B0\u8BA4\u8BC1\u4E3A admin\nAUTH admin ADMIN\n# \u4FEE\u6539\u9ED8\u8BA4\u7528\u6237\u6743\u9650\nACL SETUSER default reset on nopass ~* &* +@all -@admin\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u8F93\u51FA \u5BC6\u7801 \u548C sha-256\nuuidgen | tee /dev/fd/2 | tr -d '[:space:]' | sha256sum\n"})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"sentinel"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"ACL SETUSER sentinel-user on >somepassword allchannels +multi +slaveof +ping +exec +subscribe +config|rewrite +role +publish +info +client|setname +client|kill +script|kill\n"})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"replica"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"ACL setuser replica-user on >somepassword +psync +replconf +ping\n"})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u547D\u4EE4\u7C7B\u76EE"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"keyspace"}),"\n",(0,i.jsx)(e.li,{children:"read"}),"\n",(0,i.jsx)(e.li,{children:"write"}),"\n",(0,i.jsx)(e.li,{children:"set"}),"\n",(0,i.jsx)(e.li,{children:"sortedset"}),"\n",(0,i.jsx)(e.li,{children:"list"}),"\n",(0,i.jsx)(e.li,{children:"hash"}),"\n",(0,i.jsx)(e.li,{children:"string"}),"\n",(0,i.jsx)(e.li,{children:"bitmap"}),"\n",(0,i.jsx)(e.li,{children:"hyperloglog"}),"\n",(0,i.jsx)(e.li,{children:"geo"}),"\n",(0,i.jsx)(e.li,{children:"stream"}),"\n",(0,i.jsx)(e.li,{children:"pubsub"}),"\n",(0,i.jsx)(e.li,{children:"admin"}),"\n",(0,i.jsx)(e.li,{children:"fast - O(1)"}),"\n",(0,i.jsx)(e.li,{children:"slow"}),"\n",(0,i.jsx)(e.li,{children:"blocking"}),"\n",(0,i.jsx)(e.li,{children:"dangerous - FLUSHALL, MIGRATE, RESTORE, SORT, KEYS, CLIENT, DEBUG, INFO, CONFIG, SAVE, REPLICAOF"}),"\n",(0,i.jsx)(e.li,{children:"connection"}),"\n",(0,i.jsx)(e.li,{children:"transaction - WATCH, MULTI, EXEC"}),"\n",(0,i.jsx)(e.li,{children:"scripting"}),"\n",(0,i.jsxs)(e.li,{children:["replication\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"keydb"}),"\n",(0,i.jsx)(e.li,{children:"\u547D\u4EE4: ping, replconf, sync, replping, psync,"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://redis.io/topics/acl",children:"ACL"})}),"\n"]})]})}function a(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(o,{...n})}):o(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return c},a:function(){return d}});var l=s(75271);let i={},r=l.createContext(i);function d(n){let e=l.useContext(r);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),l.createElement(r.Provider,{value:e},n.children)}}}]);