"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73040"],{48807:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>i,default:()=>g,assets:()=>c,toc:()=>p,frontMatter:()=>o});var r=JSON.parse('{"id":"service/forge/gitea/gitea-package","title":"Package","description":"NPM","source":"@site/../notes/service/forge/gitea/gitea-package.md","sourceDirName":"service/forge/gitea","slug":"/service/forge/gitea/package","permalink":"/notes/service/forge/gitea/package","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/gitea/gitea-package.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1696577752000,"frontMatter":{"title":"Package"},"sidebar":"docs","previous":{"title":"Gitea FAQ","permalink":"/notes/service/forge/gitea/faq"},"next":{"title":"Gitea Runner","permalink":"/notes/service/forge/gitea/runner"}}'),a=t("52676"),s=t("79938");let o={title:"Package"},i="Package",c={},p=[{value:"NPM",id:"npm",level:2},{value:"Composer",id:"composer",level:2}];function l(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",pre:"pre",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"package",children:"Package"})}),"\n",(0,a.jsx)(n.h2,{id:"npm",children:"NPM"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"npm config set -L project @wener:registry //code.wener.me/api/packages/wener/npm/           # Registry for scope\nnpm config set -L project //code.wener.me/api/packages/wener/npm/:_authToken PAT # Access token for registry\n\n# token - PAT\n# npm config set {scope}:registry https://gitea.example.com/api/packages/{owner}/npm/\n# npm config set -- '//gitea.example.com/api/packages/{owner}/npm/:_authToken' \"{token}\"\n\n# for global auth\nnpm publish --registry https://gitea.example.com/api/packages/wener/npm/\n# for scope auth\nnpm publish\n"})}),"\n",(0,a.jsx)(n.h2,{id:"composer",children:"Composer"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",metastring:'title="<user-home-dir>/.composer/config.json"',children:'{\n  "repositories": [\n    {\n      "type": "composer",\n      "url": "https://gitea.example.com/api/packages/{owner}/composer"\n    }\n  ]\n}\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",metastring:'title="auth.json"',children:'{\n  "http-basic": {\n    "gitea.example.com": {\n      "username": "{username}",\n      "password": "{password}"\n    }\n  }\n}\n'})})]})}function g(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return o}});var r=t(75271);let a={},s=r.createContext(a);function o(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);