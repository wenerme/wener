"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["76369"],{61117:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>p,assets:()=>o,toc:()=>h,frontMatter:()=>l});var s=JSON.parse('{"id":"service/forge/github/github-faq","title":"Github FAQ","description":"- .nojekyll \u6587\u4EF6\u63D0\u793A \u4E0D\u542F\u7528 jekyll","source":"@site/../notes/service/forge/github/github-faq.md","sourceDirName":"service/forge/github","slug":"/service/forge/github/faq","permalink":"/notes/service/forge/github/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/github/github-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"Github FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Copilot","permalink":"/notes/service/forge/github/copilot"},"next":{"title":"Gitlab","permalink":"/notes/service/forge/gitlab/"}}'),i=t("52676"),r=t("79938");let l={title:"Github FAQ",tags:["FAQ"]},a="Github FAQ",o={},h=[{value:"Github Pages CNAME",id:"github-pages-cname",level:2},{value:"SPA Pages",id:"spa-pages",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"github-faq",children:"Github FAQ"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:".nojekyll \u6587\u4EF6\u63D0\u793A \u4E0D\u542F\u7528 jekyll"}),"\n",(0,i.jsxs)(n.li,{children:["\u4E0D\u652F\u6301\u5BF9\u522B\u4EBA\u7684 repo \u52A0 webhook\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u53EF\u4EE5\u8003\u8651 gitea mirror \u522B\u4EBA\u53C2\u8003\u7136\u540E\u52A0 webhook"}),"\n",(0,i.jsx)(n.li,{children:"\u6216\u8005\u62C9 releases/tags \u5224\u65AD"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# \u63D0\u4EA4\u7684\u884C\u6570\u91CF\u7EDF\u8BA1\ngit log --pretty=format:"%h %an %ad %s" --shortstat\n\ngit log --pretty=format:"%h %an %ad %s" --shortstat -- :^graphql.schema.json :^pnpm-lock.yaml\n\n# --numstat COMMIT \u6765 debug\ngit log --pretty=format:"%h %an %ad %s" --shortstat -- :^*/{graphql.schema.json,graphql.ts,manifest.json,manifest.md} :^pnpm-lock.yaml\n'})}),"\n",(0,i.jsx)(n.h2,{id:"github-pages-cname",children:"Github Pages CNAME"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E00\u4E2A\u4ED3\u5E93\u53EA\u652F\u6301\u4E00\u4E2A CNAME"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"185.199.108.153\n185.199.109.153\n185.199.110.153\n185.199.111.153\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"2606:50c0:8000::153\n2606:50c0:8001::153\n2606:50c0:8002::153\n2606:50c0:8003::153\n"})}),"\n",(0,i.jsx)(n.h2,{id:"spa-pages",children:"SPA Pages"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9ED8\u8BA4\u8FD4\u56DE 404.html\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5728\u8FD9\u91CC\u6DFB\u52A0\u8DF3\u8F6C"}),"\n",(0,i.jsx)(n.li,{children:"\u5728 index \u68C0\u6D4B\u8DF3\u8F6C\u643A\u5E26\u7684\u53C2\u6570"}),"\n",(0,i.jsx)(n.li,{children:"\u7136\u540E window.history.replaceState"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/rafgraph/spa-github-pages",children:"rafgraph/spa-github-pages"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>Single Page Apps for GitHub Pages</title>\n    <script type=\"text/javascript\">\n      // \u975E\u81EA\u5B9A\u4E49\u57DF\u540D\u8BBE\u7F6E\u4E3A 1\n      // https://username.github.io/repo-name\n      // \u81EA\u5B9A\u4E49\u57DF\u540D\u8BBE\u7F6E\u4E3A 0\n      var pathSegmentsToKeep = 1;\n\n      var l = window.location;\n      l.replace(\n        l.protocol +\n          '//' +\n          l.hostname +\n          (l.port ? ':' + l.port : '') +\n          l.pathname\n            .split('/')\n            .slice(0, 1 + pathSegmentsToKeep)\n            .join('/') +\n          '/?/' +\n          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +\n          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +\n          l.hash,\n      );\n    <\/script>\n  </head>\n  <body></body>\n</html>\n"})})]})}function p(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return l}});var s=t(75271);let i={},r=s.createContext(i);function l(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);