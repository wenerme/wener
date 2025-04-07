"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["84766"],{16925:function(e,n,s){s.r(n),s.d(n,{metadata:()=>l,contentTitle:()=>o,default:()=>u,assets:()=>d,toc:()=>c,frontMatter:()=>i});var l=JSON.parse('{"id":"web/dev/bundle/rollup","title":"Rollup","description":"- rollupjs","source":"@site/../notes/web/dev/bundle/rollup.md","sourceDirName":"web/dev/bundle","slug":"/web/dev/bundle/rollup","permalink":"/notes/web/dev/bundle/rollup","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dev/bundle/rollup.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1684216634000,"frontMatter":{"title":"Rollup"},"sidebar":"docs","previous":{"title":"Rollup FAQ","permalink":"/notes/web/dev/bundle/rollup-faq"},"next":{"title":"snowpack","permalink":"/notes/web/dev/bundle/snowpack"}}'),r=s("52676"),t=s("79938");let i={title:"Rollup"},o="Rollup",d={},c=[{value:"Options",id:"options",level:2},{value:"\u914D\u7F6E",id:"\u914D\u7F6E",level:2},{value:"babel+ts",id:"babelts",level:3},{value:"rollup ts",id:"rollup-ts",level:3},{value:"rollup commonjs",id:"rollup-commonjs",level:3},{value:"babel",id:"babel",level:2}];function a(e){let n={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"rollup",children:"Rollup"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rollupjs.org/",children:"rollupjs"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rollupjs.org/repl/",children:"Repl"})}),"\n",(0,r.jsxs)(n.li,{children:["\u6CE8\u610F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"d.ts"})," \u9700\u8981\u4F7F\u7528 tsc \u751F\u6210"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/rollup/awesome",children:"rollup/awesome"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rollupjs.org/repl/",children:"https://rollupjs.org/repl/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/rollup/rollup/issues/2182",children:"#2182"})," \u4E0D\u652F\u6301\u7F13\u5B58"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/rollup/rollup/issues/2072",children:"#2072"})," UMD/IIFE \u4E0D\u652F\u6301 code splitting"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/rollup/rollup/issues/3799",children:"#3799"})," \u4E0D\u652F\u6301 assert\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/calebdwilliams/rollup-plugin-import-assert",children:"rollup-plugin-import-assert"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4E0D\u652F\u6301 dynamic"}),"\n",(0,r.jsxs)(n.li,{children:["\u5BF9\u5E94\u7684 acorn \u63D2\u4EF6 ",(0,r.jsx)(n.a,{href:"https://github.com/xtuc/acorn-import-assertions",children:"xtuc/acorn-import-assertions"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["acron \u53EA\u6DFB\u52A0 stage4 \u7279\u6027 ",(0,r.jsx)(n.a,{href:"https://github.com/acornjs/acorn/issues/1111",children:"acorn#1111"})]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsxs)(n.admonition,{type:"info",children:[(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u4E0D\u652F\u6301 index.js ",(0,r.jsx)(n.a,{href:"https://github.com/rollup/rollup/issues/470#issuecomment-177594250",children:"#470"})]}),"\n"]}),(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\u76F4\u63A5 ",(0,r.jsx)(n.code,{children:"import {abc} from 'abc/index'"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u4F7F\u7528 ",(0,r.jsx)(n.a,{href:"https://github.com/rollup/plugins/tree/master/packages/node-resolve",children:"@rollup/plugin-node-resolve"})]}),"\n"]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Mark dependency as internal? ",(0,r.jsx)(n.a,{href:"https://github.com/rollup/rollup/issues/1906",children:"#1906"})]}),"\n",(0,r.jsxs)(n.li,{children:["CommonJS \u591A\u4E86\u4E00\u5C42 default \u95EE\u9898\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://stackoverflow.com/questions/33505992",children:"Babel 6 changes how it exports default"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.npmjs.com/package/babel-plugin-add-module-exports",children:"babel-plugin-add-module-exports"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4F7F\u5176\u6062\u590D\u539F\u6709\u7684\u65B9\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u7C7B\u4F3C\u95EE\u9898\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/faastjs/faast.js/issues/36",children:"faastjs/faast.js#36"})," - Can't use default import with Babel"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u4E5F\u53EF\u4EE5\u5168\u5C40\u5B89\u88C5 - \u4F46\u662F\u6CA1\u5FC5\u8981\uFF0C\u56E0\u4E3A\u901A\u5E38\u4F9D\u8D56\u5176\u4ED6\u63D2\u4EF6\n# npm install --global rollup\n\n# \u5E38\u7528\u63D2\u4EF6\n# monorepo \u63A8\u8350\u5B89\u88C5\u5728 root \u9879\u76EE\nnpm add -D rollup @rollup/plugin-{commonjs,node-resolve,replace,typescript,teser}\n\n# \u4E0D\u63A8\u8350 Babel\n# Babel + Typescript\n# yarn add -D @babel/preset-env @babel/preset-typescript\n# + React\n# yarn add -D @babel/preset-react\n\n# TS\nyarn add -D typescript tslib @rollup/plugin-typescript\n\n# rollup\n# -f amd, cjs, es, iife, umd, system\nrollup -i in.js -f es -p node-resolve -o out.js\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Format"}),(0,r.jsx)(n.th,{children:"Fullname"}),(0,r.jsx)(n.th,{children:"When"}),(0,r.jsx)(n.th,{children:"package.json"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"amd"}),(0,r.jsx)(n.td,{children:"Asynchronous Module Definition"}),(0,r.jsx)(n.td,{children:"RequireJS"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"cjs,commonjs"}),(0,r.jsx)(n.td,{children:"CommonJS"}),(0,r.jsx)(n.td,{children:"Node"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"main"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"es,esm,module"}),(0,r.jsx)(n.td,{}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"<script type=module>"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"module"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"iife"}),(0,r.jsx)(n.td,{children:"self-executing function"}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.code,{children:"<script>"})," ",(0,r.jsx)(n.br,{})," Application"]}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"umd"}),(0,r.jsx)(n.td,{children:"Universal Module Definition"}),(0,r.jsx)(n.td,{children:"amd, cjs, iife"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"browser"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"system,systemjs"}),(0,r.jsx)(n.td,{children:"SystemJS"}),(0,r.jsx)(n.td,{children:"SystemJS"}),(0,r.jsx)(n.td,{})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"interface Options {\n  // \u5224\u65AD\u662F\u5426\u4E3A \u5916\u90E8 \u4F9D\u8D56\n  external:\n    | (string | RegExp)[]\n    | RegExp\n    // string \u4E3A module id\n    | string\n    // isResolved - id \u662F\u5426\u7531 \u63D2\u4EF6 resolve\n    // \u53EF\u80FD\u8BF7\u6C42\u4E24\u6B21 - resolved=false, resolved=true\n    | ((id: string, parentId: string, isResolved: boolean) => boolean);\n}\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://rollupjs.org/guide/en/#big-list-of-options",children:"https://rollupjs.org/guide/en/#big-list-of-options"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u914D\u7F6E",children:"\u914D\u7F6E"}),"\n",(0,r.jsx)(n.h3,{id:"babelts",children:"babel+ts"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm add -D @babel/core @rollup/plugin-babel rollup-plugin-terser @rollup/plugin-node-resolve\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"export default {\n  output: {\n    // \u9ED8\u8BA4 chunk \u5305\u542B\u540D\u5B57\n    // \u652F\u6301 [format] \u66FF\u6362\n    // [name] \u4E3A manualChunks \u7ED3\u679C\u6216 this.emitFile \u7ED3\u679C\n    chunkFileNames: '[name]-[hash].js',\n    entryFileNames: '[name].js', // \u5165\u53E3 - \u652F\u6301\u76F8\u540C\u7684\u66FF\u4EE3\u903B\u8F91\n\n    // \u81EA\u5B9A\u4E49 chunk - \u591A\u9875\u5206 chunk \u52A0\u8F7D\n    manualChunks: {\n      lodash: ['lodash'], // alias: include \u7684\u5B57\u7B26\n    },\n    // id \u4E3A\u5B8C\u6574\u8DEF\u5F84\n    // \u4F8B\u5982 \u5C06\u76F8\u540C\u8BED\u8A00\u7FFB\u8BD1\u5408\u5E76 foo.strings.en.js,bar.strings.en.js -> shared.en.js\n    manualChunks(id, { getModuleInfo, getModuleIds }) {\n      if (id.includes('@blueprintjs/')) {\n        return 'blueprintjs';\n      }\n      if (id.includes('node_modules')) {\n        return 'vendor';\n      }\n      return undefined;\n    },\n\n    // \u63A7\u5236\u751F\u6210\u4EE3\u7801\n    generatedCode: 'es5', // \u9ED8\u8BA4 es5\n    generatedCode: {\n      preset: 'es2015',\n      arrowFunctions: true,\n      constBindings: true,\n      objectShorthand: true,\n      reservedNamesAsProps: false,\n    },\n\n    // stric, allow-extension, exports-only, false\n    // false - \u4E0D export\n    preserveEntrySignatures: 'strict',\n  },\n};\n"})}),"\n",(0,r.jsx)(n.h3,{id:"rollup-ts",children:"rollup ts"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import typescript from '@rollup/plugin-typescript';\nimport { nodeResolve } from '@rollup/plugin-node-resolve';\nimport commonjs from '@rollup/plugin-commonjs';\n\nexport default [\n  {\n    input: './src/standalone.ts',\n    output: {\n      file: `dist/standalone.umd.js`,\n      sourcemap: true,\n      format: 'umd',\n      name: 'Standalone',\n    },\n    external: [],\n    plugins: [\n      nodeResolve(),\n      commonjs(),\n      typescript({\n        tsconfig: 'tsconfig.json',\n      }),\n    ],\n  },\n];\n"})}),"\n",(0,r.jsx)(n.h3,{id:"rollup-commonjs",children:"rollup commonjs"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import commonjs from '@rollup/plugin-commonjs';\nimport { nodeResolve } from '@rollup/plugin-node-resolve';\nimport babel from '@rollup/plugin-babel';\n\nfunction createConfig(format) {\n  return {\n    input: 'src/index.ts',\n    output: {\n      file: `dist/console-feed.${format}.js`,\n      sourcemap: true,\n      format,\n    },\n    external: ['react'],\n    plugins: [\n      nodeResolve({ browser: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] }),\n      babel({\n        babelHelpers: 'bundled',\n        babelrc: false,\n        presets: [['@babel/preset-typescript', { allowNamespaces: true }], '@babel/preset-react'],\n        plugins: [\n          ['@babel/plugin-proposal-decorators', { legacy: true }],\n          ['@babel/plugin-proposal-class-properties', { loose: true }],\n        ],\n        extensions: ['.js', '.jsx', '.ts', '.tsx'],\n      }),\n      commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),\n    ],\n  };\n}\n\nexport default [createConfig('system'), createConfig('umd')];\n"})}),"\n",(0,r.jsx)(n.h2,{id:"babel",children:"babel"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/rollup/plugins/tree/master/packages/babel",children:"https://github.com/rollup/plugins/tree/master/packages/babel"})}),"\n"]})]})}function u(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return i}});var l=s(75271);let r={},t=l.createContext(r);function i(e){let n=l.useContext(t);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);