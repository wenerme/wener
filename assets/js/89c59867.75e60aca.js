"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["64491"],{10368:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>d,assets:()=>m,toc:()=>a,frontMatter:()=>s});var i=JSON.parse('{"id":"service/storage/minio/minio-mc","title":"mc","description":"","source":"@site/../notes/service/storage/minio/minio-mc.md","sourceDirName":"service/storage/minio","slug":"/service/storage/minio/mc","permalink":"/notes/service/storage/minio/mc","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/storage/minio/minio-mc.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1684216634000,"frontMatter":{"title":"mc"},"sidebar":"docs","previous":{"title":"MinIO Inside","permalink":"/notes/service/storage/minio/inside"},"next":{"title":"OPA","permalink":"/notes/service/storage/minio/opa"}}'),r=t("52676"),o=t("79938");let s={title:"mc"},c="mc",m={},a=[];function l(e){let n={code:"code",h1:"h1",header:"header",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"mc",children:"mc"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# https://dl.min.io/client/mc/release/\ncurl -LO https://dl.min.io/client/mc/release/linux-amd64/mc\nchmod +x ./mc\nsudo mv mc /usr/local/bin/\n\nmc alias set svr https://s3.example.com $KEY $SECRET\ncat ~/.mc/config.json\n\n# https://min.io/docs/minio/linux/reference/minio-mc/mc-mirror.html\nmc mirror --watch --overwrite --remove\n"})})]})}function d(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return s}});var i=t(75271);let r={},o=i.createContext(r);function s(e){let n=i.useContext(o);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);