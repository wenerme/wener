"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["30482"],{52826:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>d,default:()=>a,assets:()=>c,toc:()=>h,frontMatter:()=>t});var s=JSON.parse('{"id":"web/dev/bundle/esbuild","title":"ESBuild","description":"- evanw/esbuild","source":"@site/../notes/web/dev/bundle/esbuild.md","sourceDirName":"web/dev/bundle","slug":"/web/dev/bundle/esbuild","permalink":"/notes/web/dev/bundle/esbuild","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dev/bundle/esbuild.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717134008000,"frontMatter":{"title":"ESBuild"},"sidebar":"docs","previous":{"title":"Bundle FAQ","permalink":"/notes/web/dev/bundle/faq"},"next":{"title":"ncc","permalink":"/notes/web/dev/bundle/ncc"}}'),l=i("52676"),r=i("79938");let t={title:"ESBuild"},d="ESBuild",c={},h=[{value:"analyze",id:"analyze",level:2},{value:"\u53EA bundle \u5185\u90E8\u6587\u4EF6",id:"\u53EA-bundle-\u5185\u90E8\u6587\u4EF6",level:2},{value:"Plugins",id:"plugins",level:2},{value:"Spliting",id:"spliting",level:2},{value:"Dynamic require of &quot;fs&quot; is not supported",id:"dynamic-require-of-fs-is-not-supported",level:2},{value:"<code>__dirname</code> and <code>__filename</code>",id:"__dirname-and-__filename",level:2},{value:"The presence of &quot;exports&quot; here makes importing a directory forbidden:",id:"the-presence-of-exports-here-makes-importing-a-directory-forbidden",level:2},{value:"transpiling external modules",id:"transpiling-external-modules",level:2},{value:"Transforming JavaScript decorators to the configured target environment (&quot;node18.16.0&quot;) is not supported yet",id:"transforming-javascript-decorators-to-the-configured-target-environment-node18160-is-not-supported-yet",level:2}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"esbuild",children:"ESBuild"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild",children:"evanw/esbuild"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"MIT, Go"}),"\n",(0,l.jsx)(n.li,{children:"bundler & minifier"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"used by Vite, Snowpack"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/faq/#upcoming-roadmap",children:"roadmap"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://esbuild.github.io/api/",children:"https://esbuild.github.io/api/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://esbuild.github.io/",children:"https://esbuild.github.io/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5305\u542B\u6027\u80FD\u5BF9\u6BD4"}),"\n",(0,l.jsxs)(n.li,{children:["\u76EE\u524D\u6682\u65E0 swc\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/762",children:"https://github.com/evanw/esbuild/issues/762"})}),"\n",(0,l.jsx)(n.li,{children:"swc not ready"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/try/",children:"Playground"})}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"tip",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u53EF\u7528\u6765 Bundle ESM"}),"\n",(0,l.jsx)(n.li,{children:"\u53EF\u7528\u6765 Dev \u65F6\u672C\u5730\u4F7F\u7528"}),"\n",(0,l.jsx)(n.li,{children:"\u63A8\u8350\u751F\u4EA7 Rollup - Vite"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301 iife, esm, cjs"}),"\n"]})}),"\n",(0,l.jsx)(n.admonition,{type:"info",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"ES5+"}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 decorator\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/104",children:"https://github.com/evanw/esbuild/issues/104"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 emitDecoratorMetadata\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/257",children:"#257"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/thomaschaaf/esbuild-plugin-tsc",children:"thomaschaaf/esbuild-plugin-tsc"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4F1A\u6162"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"reflect-metadata"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u652F\u6301 \u4EE3\u7801\u5207\u5206"}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u652F\u6301 HTML, CSS"}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 TLA - WIP, iife\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"--banner:js='(async () => {' --footer:js='})()'"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/253",children:"#253"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 systemjs, amd\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/192",children:"#192"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 umd - ",(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/507",children:"#507"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 Bundle CSS Module ",(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/20",children:"#20"})]}),"\n",(0,l.jsxs)(n.li,{children:["tsconfig.paths \u4E0D bundled \u65F6\u4E0D\u4F1A\u5904\u7406 ",(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/394",children:"#394"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5199\u5E93\u53EA\u80FD\u7528\u76F8\u5BF9\u8DEF\u5F84"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Support dynamic imports ",(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/700",children:"#700"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["dynamic import ",(0,l.jsx)(n.strong,{children:"\u4E0D\u4F1A"})," \u88AB bundle"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Support jsx automatic runtime ",(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/334",children:"#334"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u76EE\u524D\u5FC5\u987B ",(0,l.jsx)(n.code,{children:"import React"}),", \u9700\u8981\u8C03\u6574 lint \u914D\u7F6E"]}),"\n",(0,l.jsxs)(n.li,{children:["Bundle \u53EF\u8003\u8651\u4E00\u6B21 inject ",(0,l.jsx)(n.a,{href:"https://esbuild.github.io/content-types/#jsx",children:"https://esbuild.github.io/content-types/#jsx"})]}),"\n",(0,l.jsxs)(n.li,{children:["eslint ",(0,l.jsx)(n.code,{children:"'react/react-in-jsx-scope': 'error'"})]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"watch \u4F7F\u7528 polling \u5B9E\u73B0 - \u65E0\u4EFB\u4F55\u64CD\u4F5C\u4E5F\u4F1A\u6D88\u8017\u4E00\u70B9 CPU"}),"\n",(0,l.jsx)(n.li,{children:"watch \u65E0\u6CD5\u68C0\u6D4B\u5230\u65B0\u6587\u4EF6"}),"\n"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"esbuild example.js --outfile=out.js\nesbuild --bundle main.ts --outdir=dist --minify --sourcemap\n\n# bundle mutiple files\npnpm esbuild --outdir=dist $(jq '.bundle.input | join (\" \")' package.json -r) --format=esm --charset=utf8 --target=chrome90 --sourcemap --bundle\n\n# transform\nesbuild `find src \\( -name '*.ts' -o -name '*.tsx' \\)` --outdir=out\n\nesbuild src/modules/*/{index.tsx,manifest.json} --serve=8000 --splitting --outdir=out --format=esm --bundle --charset=utf8 --target=chrome90 --sourcemap --minify\n\n# stdin -> stdout\necho 'export const OK = process.env.NODE_ENV === \"producation\"' | pnpm exec esbuild --format=esm\n"})}),"\n",(0,l.jsxs)(n.p,{children:["| flag                            |\n| ------------------------------- | ------------------------- |\n| --bundle                        | \u5305\u542B\u6240\u6709\u4F9D\u8D56              |\n| --loader:.js=jsx                | \u5141\u8BB8 js \u5305\u542B jsx \u8BED\u6CD5     |\n| --define:DEBUG=true             | \u66FF\u4EE3 DEBUG                |\n| --platform=browser,node,neutral | \u9ED8\u8BA4 browser              |\n| --external:@strapi              | \u4F5C\u4E3A\u5916\u90E8\u4F9D\u8D56              |\n| --splitting                     | \u62C6\u5206 chunk - \u62BD\u53D6\u516C\u5171\u90E8\u5206 |\n| --charset=utf8                  | \u907F\u514D\u7F16\u7801                  |\n| --target                        |\n| --sourcemap=linked              |\n| ",(0,l.jsx)(n.code,{children:"--servedir <dir>"}),"              |\n| ",(0,l.jsx)(n.code,{children:"--format <format>"}),"             | iife, cjs, esm            |"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["--platform\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["browser\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:'\u9690\u542B: --format=iife --condition=browser --define:process.env.NODE_ENV="production" --main-fields=browser,module,main'}),"\n",(0,l.jsxs)(n.li,{children:["\u4F7F\u7528 package.json \u4E2D\u7684 ",(0,l.jsx)(n.a,{href:"https://gist.github.com/defunctzombie/4339901/49493836fb873ddaa4b8a7aa0ef2352119f69211",children:"browser"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4F8B\u5982: path -> path-browserify"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"main - \u5982\u679C\u6CA1\u6709 browser \u6709 main \u548C module \u5219\u4F1A\u5148\u7528 main - cjs \u66F4\u517C\u5BB9"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["node\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u9690\u542B: --format=cjs --condition=node --main-fields=module,main --external=fs,url,http"}),"\n",(0,l.jsx)(n.li,{children:"\u81EA\u52A8 external node \u7684\u5185\u5EFA api"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["neutral\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u9690\u542B: --format=esm"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--minify\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"--minify-whitespace"}),"\n",(0,l.jsx)(n.li,{children:"--minify-identifiers"}),"\n",(0,l.jsx)(n.li,{children:"--minify-syntax - \u79FB\u9664 if(false) \u4EE3\u7801"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/api/#minify-considerations",children:"Considerations"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--external:\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"/assets/*.png"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@foo/bar"})," \u9690\u542B ",(0,l.jsx)(n.code,{children:"@foo/bar/*"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--target\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"chrome, edge, firefox, hermes, ie, ios, node, opera, rhino, safari"}),"\n",(0,l.jsxs)(n.li,{children:["\u53EF\u4EE5\u66F4\u8BE6\u7EC6\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"esnext, es2020, es5, es5, node12, node19"}),"\n",(0,l.jsx)(n.li,{children:"chrome90"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u4E5F\u53EF\u4EE5\u4F7F\u7528 supported \u63A7\u5236\u7279\u6027"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--supported - ",(0,l.jsx)(n.a,{href:"https://esbuild.github.io/api/#supported",children:"https://esbuild.github.io/api/#supported"})]}),"\n",(0,l.jsxs)(n.li,{children:["--sourcemap\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["linked - ",(0,l.jsx)(n.code,{children:"//# sourceMappingURL="})]}),"\n",(0,l.jsx)(n.li,{children:"external - \u65E0 sourceMappingURL"}),"\n",(0,l.jsx)(n.li,{children:"inline"}),"\n",(0,l.jsx)(n.li,{children:"both"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--servedir\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u914D\u5408 script \u4F7F\u7528"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'<script src="js/app.js"><\/script>'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["--loader\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"js - .js, .cjs, .mjs"}),"\n",(0,l.jsx)(n.li,{children:"ts - .ts, .tsx, .mts, .cts"}),"\n",(0,l.jsx)(n.li,{children:"jsx/tsx - .jsx"}),"\n",(0,l.jsx)(n.li,{children:"json - .json"}),"\n",(0,l.jsx)(n.li,{children:"css - .css"}),"\n",(0,l.jsx)(n.li,{children:"text - .txt"}),"\n",(0,l.jsxs)(n.li,{children:["binary\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Uint8Array"}),"\n",(0,l.jsx)(n.li,{children:"uint8array.buffer -> ArrayBuffer"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"base64"}),"\n",(0,l.jsx)(n.li,{children:"dataurl"}),"\n",(0,l.jsx)(n.li,{children:"file"}),"\n",(0,l.jsxs)(n.li,{children:["copy\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u590D\u5236\u6587\u4EF6\u5230 outdir - \u4FEE\u6539 import \u8DEF\u5F84"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["cdn url\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://unpkg.com",children:"https://unpkg.com"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/egoist/play-esbuild/blob/main/src/lib/esbuild.ts#L34",children:"https://github.com/egoist/play-esbuild/blob/main/src/lib/esbuild.ts#L34"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"tip",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["chrome90 \u4F1A\u5904\u7406 ",(0,l.jsx)(n.code,{children:"?."})]}),"\n",(0,l.jsxs)(n.li,{children:["chrome70 \u4F1A\u5904\u7406 ",(0,l.jsx)(n.code,{children:"??"})]}),"\n"]})}),"\n",(0,l.jsx)(n.h2,{id:"analyze",children:"analyze"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/analyze/",children:"https://esbuild.github.io/analyze/"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u53EA-bundle-\u5185\u90E8\u6587\u4EF6",children:"\u53EA bundle \u5185\u90E8\u6587\u4EF6"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",metastring:'title="build.cjs"',children:"const path = require('path');\nconst pkg = require(path.resolve('./package.json'));\n\nconst external = [\n  ...Object.keys(pkg.dependencies || {}),\n  ...Object.keys(pkg.peerDependencies || {}),\n  'react-is',\n  'shallowequal',\n  'hoist-non-react-statics',\n].sort();\n\nconsole.log(`externals`, external);\n\nrequire('esbuild').buildSync({\n  entryPoints: ['admin/src/components/Wysiwyg/index.js'],\n  loader: { '.js': 'jsx' },\n  format: 'esm',\n  bundle: true,\n  minify: false,\n  sourcemap: false,\n  target: ['esnext'],\n  outfile: 'dist/Wysiwyg.esm.js',\n  external,\n  logLevel: 'info',\n});\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"grep '^// ' ./dist/Wysiwyg.esm.js                     # bundled\ngrep '^// ' ./dist/Wysiwyg.esm.js | grep node_modules # bundled externals\n"})}),"\n",(0,l.jsx)(n.h2,{id:"plugins",children:"Plugins"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/esbuild/community-plugins",children:"https://github.com/esbuild/community-plugins"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/plugins",children:"https://esbuild.github.io/plugins"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://mdxjs.com/packages/esbuild/",children:"https://mdxjs.com/packages/esbuild/"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"@mdx-js/esbuild"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"spliting",children:"Spliting"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u8BD5\u9A8C\u9636\u6BB5"}),"\n",(0,l.jsx)(n.li,{children:"\u63D0\u53D6\u591A\u4E2A entrypoint \u7684 common \u90E8\u5206"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://esbuild.github.io/api/#splitting",children:"https://esbuild.github.io/api/#splitting"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"esbuild home.ts about.ts --bundle --splitting --outdir=out --format=esm\n"})}),"\n",(0,l.jsx)(n.h2,{id:"dynamic-require-of-fs-is-not-supported",children:'Dynamic require of "fs" is not supported'}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/1921",children:"https://github.com/evanw/esbuild/issues/1921"})}),"\n"]}),"\n",(0,l.jsxs)(n.h2,{id:"__dirname-and-__filename",children:[(0,l.jsx)(n.code,{children:"__dirname"})," and ",(0,l.jsx)(n.code,{children:"__filename"})]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"format \u4E3A esm \u7684\u65F6\u5019\u53EF\u80FD\u51FA\u73B0"}),"\n",(0,l.jsx)(n.li,{children:"\u6DFB\u52A0 banner \u89E3\u51B3"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# __dirname, __filename \u7528\u52A8\u6001 import \u6784\u5EFA\uFF0C\u907F\u514D\u51B2\u7A81\nnpx esbuild --banner:js=\"import { createRequire } from 'module';const require = createRequire(import.meta.url);var __filename;var __dirname;{const {fileURLToPath} = await import('url');const {dirname} = await import('path');var __filename = fileURLToPath(import.meta.url); __dirname = dirname(__filename)};\"\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\nimport path from 'path';\nimport { fileURLToPath } from 'url';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/1921",children:"https://github.com/evanw/esbuild/issues/1921"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"the-presence-of-exports-here-makes-importing-a-directory-forbidden",children:'The presence of "exports" here makes importing a directory forbidden:'}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u9700\u8981\u6DFB\u52A0 index.js"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"transpiling-external-modules",children:"transpiling external modules"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/remix-run/remix/issues/1423",children:"https://github.com/remix-run/remix/issues/1423"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"transforming-javascript-decorators-to-the-configured-target-environment-node18160-is-not-supported-yet",children:'Transforming JavaScript decorators to the configured target environment ("node18.16.0") is not supported yet'}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/104",children:"https://github.com/evanw/esbuild/issues/104"})}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return d},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);