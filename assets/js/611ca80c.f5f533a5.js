"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["63313"],{23460:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>i,default:()=>o,assets:()=>l,toc:()=>h,frontMatter:()=>r});var s=JSON.parse('{"id":"db/search/zincsearch","title":"zinc","description":"- zincsearch/zincsearch","source":"@site/../notes/db/search/zincsearch.md","sourceDirName":"db/search","slug":"/db/search/zincsearch","permalink":"/notes/db/search/zincsearch","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/search/zincsearch.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1681042995000,"frontMatter":{"title":"zinc"},"sidebar":"docs","previous":{"title":"typesense","permalink":"/notes/db/search/typesense"},"next":{"title":"Sysbench","permalink":"/notes/db/sysbench"}}'),c=t("52676"),a=t("79938");let r={title:"zinc"},i="zinc",l={},h=[];function d(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.header,{children:(0,c.jsx)(e.h1,{id:"zinc",children:"zinc"})}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.a,{href:"https://github.com/zincsearch/zincsearch",children:"zincsearch/zincsearch"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"Apache-2.0, Golang"}),"\n",(0,c.jsx)(e.li,{children:"\u57FA\u4E8E bluge \u7D22\u5F15"}),"\n",(0,c.jsx)(e.li,{children:"\u90E8\u5206\u517C\u5BB9 Elastic \u7684\u641C\u7D22\u670D\u52A1"}),"\n",(0,c.jsx)(e.li,{children:"zinc -> zincsearch, zincobserve"}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.a,{href:"https://mp.weixin.qq.com/s/g9fcKNSEHqwiK8Tt3MY3GA",children:"https://mp.weixin.qq.com/s/g9fcKNSEHqwiK8Tt3MY3GA"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u4E2D\u6587\u641C\u7D22"}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://github.com/go-ego/gse",children:"go-ego/gse"})}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://github.com/zinclabs/zinc/pull/111",children:"#111"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:'# macOS\ncurl -LO https://github.com/zinclabs/zinc/releases/download/v0.3.5/zinc_0.3.5_Darwin_x86_64.tar.gz\nxattr -r -d com.apple.quarantine ./zinc\n\n# http://localhost:4080\n# ZINC_PLUGIN_GSE_DICT_PATH=./plugins/gse/dict\n# stop.txt, user.txt\n# filter gse_stop\nmkdir -p ./plugins/gse/dict\n\nZINC_FIRST_ADMIN_USER=admin ZINC_FIRST_ADMIN_PASSWORD=admin ZINC_PROMETHEUS_ENABLE=true \\\n  ZINC_PLUGIN_GSE_ENABLE=true ZINC_PLUGIN_GSE_DICT_EMBED=big ./zinc\n\ncurl http://admin:admin@localhost:4080/es/_analyze -d \'{"analyzer":"gse_standard", "text":"\u4ECA\u5929\u5929\u6C14\u771F\u771F\u597D"}\' | jq\ncurl http://admin:admin@localhost:4080/es/_analyze -d \'{"analyzer":"gse_search", "text":"\u4ECA\u5929\u5929\u6C14\u771F\u771F\u597D"}\' | jq\n\n# Docker\ndocker run -v $PWD/data:/data \\\n  -e ZINC_DATA_PATH="/data" \\\n  -p 4080:4080 \\\n  -e ZINC_FIRST_ADMIN_USER=admin \\\n  -e ZINC_FIRST_ADMIN_PASSWORD=admin \\\n  --name zinc public.ecr.aws/zinclabs/zinc\n'})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-http",children:'POST http://admin:admin@localhost:4080/es/_analyze\n\n{"analyzer":"gse_search", "text":"\u4E0A\u6D77\u6587\u96EA\u53D1\u5C55\u79D1\u6280\u6709\u9650\u516C\u53F8"}\n'})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-http",children:'PUT http://admin:admin@localhost:4080/api/index\n\n{\n  "name": "comments",\n  "mappings": {\n    "properties": {\n      "content": {\n        "type": "text",\n        "index": true,\n        "highlightable": true,\n        "analyzer": "gse_search",\n        "search_analyzer": "gse_standard"\n      },\n      "author": {\n        "type": "keyword",\n        "index": true,\n        "store": false\n      },\n      "create_time": {\n        "type":"time"\n      }\n    }\n  }\n}\n'})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-http",children:'PUT http://admin:admin@localhost:4080/api/comments/_doc\n\n{\n  "content": "\u7ED9\u72D7\u6254\u4E00\u5757\u8089\uFF0C\u80AF\u5B9A\u4F1A\u88AB\u53FC\u8D70 \u7ED9\u4EBA\u4E00\u70B9\u6743\u529B\u7684\u8BDD\uFF0C\u4ED6\u4F1A\u53D8\u5F97\u91CE\u86EE",\n  "author": "SITIS",\n  "create_time": "2022-10-29T19:55:40+08:00"\n}\n'})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-http",children:'PUT http://admin:admin@localhost:4080/api/comments/_doc\n\n{\n  "content": "\u653F\u6CBB\u6743\u8C0B\u8005\u4E3A\u4E00\u5DF1\u79C1\u6B32\u53D1\u52A8\u6218\u4E89\uFF0C\u9001\u611A\u6627\u5929\u771F\u7684\u7231\u56FD\u8005\u4E0A\u524D\u7EBF\u5F53\u70AE\u7070\u3002",\n  "author": "SITIS",\n  "create_time": "2022-10-29T19:55:40+08:00"\n}\n'})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-http",children:'POST http://admin:admin@localhost:4080/es/comments/_search\n\n{\n  "size": 10,\n  "query": {\n    "match": {\n      "content": "\u6743\u529B"\n    }\n  }\n}\n'})}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://docs.zincsearch.com/environment-variables/",children:"https://docs.zincsearch.com/environment-variables/"})}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-txt",metastring:'title="user.txt"',children:"word    frequency   property\n"})})]})}function o(n={}){let{wrapper:e}={...(0,a.a)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(d,{...n})}):d(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return r}});var s=t(75271);let c={},a=s.createContext(c);function r(n){let e=s.useContext(a);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),s.createElement(a.Provider,{value:e},n.children)}}}]);