"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["56777"],{6729:function(n,r,e){e.r(r),e.d(r,{metadata:()=>s,contentTitle:()=>t,default:()=>p,assets:()=>l,toc:()=>c,frontMatter:()=>a});var s=JSON.parse('{"id":"web/nodejs/yarn","title":"Yarn","description":"- nohoist in Workspaces","source":"@site/../notes/web/nodejs/yarn.md","sourceDirName":"web/nodejs","slug":"/web/nodejs/yarn","permalink":"/notes/web/nodejs/yarn","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/nodejs/yarn.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1642767775000,"frontMatter":{"title":"Yarn"},"sidebar":"docs","previous":{"title":"yarn version","permalink":"/notes/web/nodejs/yarn-version"},"next":{"title":"Open Graph","permalink":"/notes/web/open-graph"}}'),i=e("52676"),o=e("79938");let a={title:"Yarn"},t="Yarn",l={},c=[{value:".yarnrc",id:"yarnrc",level:2},{value:"berry",id:"berry",level:2},{value:"yarnrc.yml",id:"yarnrcyml",level:2},{value:"yarn set version \u6162",id:"yarn-set-version-\u6162",level:2}];function d(n){let r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"yarn",children:"Yarn"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://classic.yarnpkg.com/blog/2018/02/15/nohoist/",children:"nohoist in Workspaces"})}),"\n",(0,i.jsx)(r.li,{children:"\u7F13\u5B58\u4F4D\u7F6E /usr/local/share/.cache/yarn"}),"\n"]}),"\n",(0,i.jsx)(r.admonition,{type:"caution",children:(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["yarn install \u53EF\u80FD\u4E0D\u4F1A\u5B89\u88C5\u4EFB\u4F55\u4E1C\u897F ",(0,i.jsx)(r.a,{href:"https://github.com/yarnpkg/yarn/issues/2240",children:"#2240"})]}),"\n"]})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"# $HOME/.yarn/global\nyarn global dir\n# \u53EF\u5347\u7EA7\u4F9D\u8D56\nyarn outdated\n# \u5347\u7EA7\u4F9D\u8D56\nyarn upgrade\n"})}),"\n",(0,i.jsx)(r.h2,{id:"yarnrc",children:".yarnrc"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"https://npm.taobao.org/mirrors",children:"https://npm.taobao.org/mirrors"})}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:'registry "https://registry.npm.taobao.org"\ndisturl "https://npm.taobao.org/dist"\n\nnetwork-timeout 60000\n\nchromedriver_cdnurl "http://cdn.npm.taobao.org/dist/chromedriver"\nelectron_mirror "http://cdn.npm.taobao.org/dist/electron/"\nELECTRON_BUILDER_BINARIES_MIRROR http://npm.taobao.org/mirrors/electron-builder-binaries/\nfse_binary_host_mirror "https://npm.taobao.org/mirrors/fsevents"\nnode_inspector_cdnurl "https://npm.taobao.org/mirrors/node-inspector"\nNODEJS_ORG_MIRROR "http://npm.taobao.org/mirrors/node"\nnvm_nodejs_org_mirror "http://npm.taobao.org/mirrors/node"\noperadriver_cdnurl "https://npm.taobao.org/mirrors/operadriver"\nphantomjs_cdnurl "https://npm.taobao.org/mirrors/phantomjs"\nprofiler_binary_host_mirror "http://npm.taobao.org/mirrors/node-inspector/"\npuppeteer_download_host "https://npm.taobao.org/mirrors"\nsass_binary_site "http://npm.taobao.org/mirrors/node-sass"\nselenium_cdnurl "http://npm.taobao.org/mirrors/selenium"\nSQLITE3_BINARY_SITE "http://npm.taobao.org/mirrors/sqlite3"\n'})}),"\n",(0,i.jsx)(r.h2,{id:"berry",children:"berry"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u4E3A\u4EC0\u4E48\u7528 yarn2\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u6CA1\u6709 node_moduels"}),"\n",(0,i.jsxs)(r.li,{children:["\u4F9D\u8D56\u4EE5\u538B\u7F29\u5305\u5F62\u5F0F\u5B58\u5728\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5360\u7528\u7A7A\u95F4\u66F4\u5C11"}),"\n",(0,i.jsx)(r.li,{children:"\u6587\u4EF6\u6570\u5C11"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\u4F9D\u8D56\u538B\u7F29\u5305\u4E0D\u53EF\u53D8\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u7F13\u5B58"}),"\n",(0,i.jsx)(r.li,{children:"\u6784\u5EFA\u66F4\u52A0\u5FEB\u901F"}),"\n",(0,i.jsx)(r.li,{children:"\u80FD\u5B9E\u73B0\u79BB\u7EBF\u5B89\u88C5\u6784\u5EFA"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\u8BBF\u95EE\u754C\u9650\u66F4\u52A0\u4E25\u8C28\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u5982\u679C\u6CA1\u6709\u5B9A\u4E49\u4F9D\u8D56\uFF0C\u5219 impor \u4F1A\u5931\u8D25"}),"\n",(0,i.jsx)(r.li,{children:"node_moduels \u65F6\u53EA\u8981\u6709\u90FD\u80FD import"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.li,{children:"\u6784\u5EFA\u901F\u5EA6\u66F4\u5FEB"}),"\n",(0,i.jsx)(r.li,{children:"\u652F\u6301\u63D2\u4EF6"}),"\n",(0,i.jsxs)(r.li,{children:["\u65B0\u589E dlx \u547D\u4EE4 - \u7B49\u540C\u4E8E ",(0,i.jsx)(r.code,{children:"npm dlx"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\u6240\u6709 .yarnrc.yml \u4E2D\u7684\u914D\u7F6E\u90FD\u53EF\u4EE5\u7528\u73AF\u5883\u53D8\u91CF\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u4F8B\u5982 YARN_HTTPS_PROXY - \u4E0D\u4F1A\u4F7F\u7528 HTTPS_PROXY\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u53EA\u652F\u6301 HTTP \u4EE3\u7406"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["\u6CE8\u610F\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["\u914D\u7F6E ",(0,i.jsx)(r.a,{href:"https://yarnpkg.com/configuration/yarnrc#nodeLinker",children:"nodeLinker"})," \u4E3A ",(0,i.jsx)(r.code,{children:"node-modules"})," \u53EF\u4F7F\u7528\u4EE5\u524D\u7684\u65B9\u5F0F"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"# \u5B89\u88C5/\u5347\u7EA7\n# yarn >= 1.22\nyarn set version berry\n# yarn < v1.22\nyarn policies set-version berry\n\nyarn config set enableTelemetry 0\nyarn config set --home enableTelemetry 0\n\n# \u5E38\u7528\u63D2\u4EF6\n# ====================\n# https://github.com/yarnpkg/berry/blob/master/plugins.yml\n# yarn workspaces \u547D\u4EE4 - yarn workspaces foreach -pt run build\nyarn plugin import workspace-tools\nyarn plugin import pnp\n# yarn version \u547D\u4EE4 - \u4FEE\u6539\u7248\u672C\u53F7 - yarn version check\nyarn plugin import version\n# yarn upgrade-interactive - \u4EA4\u4E92\u5347\u7EA7\nyarn plugin import interactive-tools\n# yarn stage - \u5C06 yarn \u76F8\u5173\u6587\u4EF6\u6DFB\u52A0\u5230 git\nyarn plugin import stage\n# \u81EA\u52A8\u6DFB\u52A0 @types \u4F9D\u8D56\nyarn plugin import typescript\n\n# \u5F53\u524D\u63D2\u4EF6\u5217\u8868\nyarn plugin list\n\n# \u5E76\u884C\u6784\u5EFA\u6240\u6709 workspace\nyarn workspaces foreach -pt run build\n\n# plugins \u548C releases \u9700\u8981\u63D0\u4EA4\ngit add .yarn/plugins .yarn/releases\n\n# \u914D\u7F6E IDE - vscode vim emacs\n# https://yarnpkg.com/advanced/editor-sdks\nyarn dlx @yarnpkg/pnpify --sdk\n\n# \u68C0\u67E5\u4F9D\u8D56\nyarn dlx @yarnpkg/doctor .\n\n# \u4EA4\u4E92\u5347\u7EA7\nyarn upgrade-interactive\n\n# \u624B\u52A8\u5B89\u88C5\u65B0\u7248\ncurl -LC- -o .yarn/releases/yarn-berry.js https://github.com/yarnpkg/berry/raw/master/packages/yarnpkg-cli/bin/yarn.js\nyarn -v\n\n# \u624B\u52A8\u5B89\u88C5\u65B0\u7248\u63D2\u4EF6\ncurl -LC- -o .yarn/plugins/@yarnpkg/plugin-version.js https://github.com/yarnpkg/berry/raw/master/packages/plugin-version/bin/@yarnpkg/plugin-version.js\n# \u518D\u6B21 import \u4E5F\u53EF\u4EE5\nyarn plugin import version\n"})}),"\n",(0,i.jsx)(r.h2,{id:"yarnrcyml",children:"yarnrc.yml"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-yaml",children:"packageExtensions:\n  webpack@*:\n    dependencies:\n      lodash: '^4.15.0'\n    peerDependencies:\n      webpack-cli: '*'\n  # \u6CE8\u610F\u5F15\u53F7\n  '@storybook/core@*':\n    dependencies:\n      '@storybook/addon-essentials': '*'\n"})}),"\n",(0,i.jsx)(r.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(r.h2,{id:"yarn-set-version-\u6162",children:"yarn set version \u6162"}),"\n",(0,i.jsx)(r.p,{children:"\u53EF\u4EE5\u4ECE\u73B0\u6709\u9879\u76EE\u62F7\u8D1D\uFF0C\u514D\u5B89\u88C5"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u914C\u60C5\u8003\u8651\u662F\u5426\u9700\u8981\u62F7\u8D1D\u7F13\u5B58 - \u4E00\u822C\u672C\u5730\u6709\u5168\u5C40\u7F13\u5B58\uFF0C\u4E0D\u62F7\u95EE\u9898\u4E0D\u5927"}),"\n"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-bash",children:"PROJ=/other/porject\ncp $PROJ/.yarnrc.yml ./\nrsync -a --include=releases --include=plugins $PROJ/.yarn/ .yarn/\n"})})]})}function p(n={}){let{wrapper:r}={...(0,o.a)(),...n.components};return r?(0,i.jsx)(r,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},79938:function(n,r,e){e.d(r,{Z:function(){return t},a:function(){return a}});var s=e(75271);let i={},o=s.createContext(i);function a(n){let r=s.useContext(o);return s.useMemo(function(){return"function"==typeof n?n(r):{...r,...n}},[r,n])}function t(n){let r;return r=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),s.createElement(o.Provider,{value:r},n.children)}}}]);