"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66792"],{93823:function(e,r,n){n.r(r),n.d(r,{metadata:()=>s,contentTitle:()=>a,default:()=>u,assets:()=>i,toc:()=>g,frontMatter:()=>o});var s=JSON.parse('{"id":"languages/go/lib/goreleaser","title":"goreleaser","description":"- goreleaser/goreleaser","source":"@site/../notes/languages/go/lib/goreleaser.md","sourceDirName":"languages/go/lib","slug":"/languages/go/lib/goreleaser","permalink":"/notes/languages/go/lib/goreleaser","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/lib/goreleaser.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1634220239000,"frontMatter":{"title":"goreleaser"},"sidebar":"docs","previous":{"title":"go-zero","permalink":"/notes/languages/go/lib/go-zero"},"next":{"title":"GORM","permalink":"/notes/languages/go/lib/gorm"}}'),t=n("52676"),l=n("79938");let o={title:"goreleaser"},a="goreleaser",i={},g=[];function c(e){let r={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"goreleaser",children:"goreleaser"})}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.a,{href:"https://github.com/goreleaser/goreleaser",children:"goreleaser/goreleaser"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"\u65E0 cgo \u65F6\u4EA4\u53C9\u7F16\u8BD1"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["CGO \u95EE\u9898 ",(0,t.jsx)(r.a,{href:"https://github.com/goreleaser/goreleaser/issues/708",children:"goreleaser/goreleaser#708"})]}),"\n"]}),"\n",(0,t.jsx)(r.admonition,{type:"tip",children:(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"monorepo \u4E3A \u6536\u8D39 \u529F\u80FD"}),"\n"]})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:'# go install github.com/goreleaser/goreleaser@latest\nbrew install goreleaser\n\ngoreleaser init\n\ngoreleaser build\ngoreleaser release --snapshot --rm-dist\n\ngoreleaser check\ngoreleaser build --single-target\n\n# \u57FA\u4E8E git tag \u505A github release\n# export GITHUB_TOKEN="YOUR_GH_TOKEN"\n# --skip-publish\ngoreleaser release\n'})})]})}function u(e={}){let{wrapper:r}={...(0,l.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},79938:function(e,r,n){n.d(r,{Z:function(){return a},a:function(){return o}});var s=n(75271);let t={},l=s.createContext(t);function o(e){let r=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(l.Provider,{value:r},e.children)}}}]);