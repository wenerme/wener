"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["96000"],{658:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>p,assets:()=>a,toc:()=>o,frontMatter:()=>l});var t=JSON.parse('{"id":"web/framework/single-spa","title":"Single SPA","description":"- single-spa/single-spa","source":"@site/../notes/web/framework/single-spa.md","sourceDirName":"web/framework","slug":"/web/framework/single-spa","permalink":"/notes/web/framework/single-spa","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/single-spa.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666003394000,"frontMatter":{"title":"Single SPA"},"sidebar":"docs","previous":{"title":"inside single-spa","permalink":"/notes/web/framework/single-spa-inside"},"next":{"title":"solid","permalink":"/notes/web/framework/solidjs"}}'),r=s("52676"),i=s("79938");let l={title:"Single SPA"},c="Single SPA",a={},o=[{value:"create-single-spa",id:"create-single-spa",level:2},{value:"root-config",id:"root-config",level:2},{value:"index",id:"index",level:2},{value:"config",id:"config",level:3},{value:"parcel",id:"parcel",level:2},{value:"entry",id:"entry",level:3},{value:"webpack",id:"webpack",level:3},{value:"utility",id:"utility",level:2},{value:"\u63A8\u8350\u8BBE\u7F6E",id:"\u63A8\u8350\u8BBE\u7F6E",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"single-spa",children:"Single SPA"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/single-spa/single-spa",children:"single-spa/single-spa"})}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://single-spa.js.org/docs/recommended-setup/",children:"\u63A8\u8350\u8BBE\u7F6E"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-inspector",children:"single-spa/single-spa-inspector"})," - \u6D4F\u89C8\u5668\u63D2\u4EF6"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/react-microfrontends",children:"react-microfrontends"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://juejin.im/post/5e5ca537e51d4526f16e5065",children:"\u4ECE 0 \u5B9E\u73B0\u4E00\u4E2A single-spa \u7684\u524D\u7AEF\u5FAE\u670D\u52A1"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5BF9\u6BD4\u4E86 qiankun \u548C single-spa"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5EFA\u8BAE\u4F7F\u7528\u5355\u4E2A\u7248\u672C\u6846\u67B6"}),"\n",(0,r.jsx)(n.li,{children:"\u9002\u7528\u4E8E\u8DE8\u6846\u67B6 - \u5982\u679C\u4E0D \u8DE8\u6846\u67B6\uFF0C\u5EFA\u8BAE\u81EA\u884C\u5C01\u88C5\u4E00\u4E2A\u7B80\u5355\u7684\u6302\u8F7D\u903B\u8F91"}),"\n"]})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Topic"}),(0,r.jsx)(n.th,{children:"\u5E94\u7528/application"}),(0,r.jsx)(n.th,{children:"parcel"}),(0,r.jsx)(n.th,{children:"\u5DE5\u5177/utility"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\u8DEF\u7531"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{children:"\u65E0\u8DEF\u7531"}),(0,r.jsx)(n.td,{children:"\u65E0\u8DEF\u7531"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"API"}),(0,r.jsx)(n.td,{children:"\u5B9A\u4E49\u5F0F API"}),(0,r.jsx)(n.td,{children:"\u58F0\u660E\u5F0F API"}),(0,r.jsx)(n.td,{children:"\u2796"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\u6E32\u67D3 UI"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{children:"\u274C"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\u751F\u547D\u5468\u671F"}),(0,r.jsx)(n.td,{children:"single-spa \u7BA1\u7406"}),(0,r.jsx)(n.td,{children:"\u81EA\u884C\u7BA1\u7406"}),(0,r.jsx)(n.td,{children:"\u274C"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"\u4F7F\u7528\u573A\u666F"}),(0,r.jsx)(n.td,{children:"\u6838\u5FC3\u6784\u5EFA\u7EC4\u4EF6"}),(0,r.jsx)(n.td,{children:"\u591A\u4E2A\u6846\u67B6\u7684\u65F6\u5019\u9700\u8981"}),(0,r.jsx)(n.td,{children:"\u516C\u5171\u903B\u8F91"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"create-single-spa",children:"create-single-spa"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://single-spa.js.org/docs/create-single-spa",children:"create-single-spa"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"--moduleType"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["root-config - import \u8DEF\u7531\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u4E3B\u8981\u7528\u4E8E\u914D\u7F6E import map\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.jsdelivr.com/",children:"https://www.jsdelivr.com/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://unpkg.com/browse/@wener/ui/",children:"https://unpkg.com/browse/@wener/ui/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://unpkg.com/browse/react@16.13.1/",children:"https://unpkg.com/browse/react@16.13.1/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u57FA\u7840\u7684 systemjs \u4F9D\u8D56"}),"\n",(0,r.jsx)(n.li,{children:"\u53EF\u4EE5\u5728\u8FD9\u91CC\u6DFB\u52A0\u516C\u5171\u4F9D\u8D56 - \u4F8B\u5982 react\u3001react-dom"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"app-parcel - \u5E94\u7528 - \u9ED8\u8BA4"}),"\n",(0,r.jsx)(n.li,{children:"util-module - \u5DE5\u5177"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/single-spa/create-single-spa/blob/master/packages/ts-config-single-spa/tsconfig.json",children:"ts-config-single-spa"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/single-spa/create-single-spa/blob/master/packages/webpack-config-single-spa-react-ts/lib/webpack-config-single-spa-react-ts.js",children:"webpack-config-single-spa-react-ts.js"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# http://localhost:9000\n# \u9ED8\u8BA4 importmap \u662F\u5728 html \u4E2D\n# \u5F00\u542F importmap \u5F00\u53D1\u5DE5\u5177\n# localStorage.setItem("devtools", true);\nyarn create single-spa --framework react --moduleType root-config --dir root\n\nyarn create single-spa --framework react --dir dash\n# localhost:8500\n# http://single-spa-playground.org/playground/instant-test?name=@wener-dash/spa&url=8500\n# \u9ED8\u8BA4\u4F4D\u7F6E http://localhost:8500/<OrgName>-<ProjectName>.js\n# \u4F8B\u5982 http://localhost:8500/wener-spa-dash.js\nyarn start --port 8500\n\n\nyarn create single-spa --framework react --moduleType util-module --dir utils \\\n  --packageManager yarn --typescript\n\n# react + ts \u4F7F\u7528\u7684\u914D\u7F6E\n# yarn add --dev webpack-config-single-spa-react-ts webpack-merge\n'})}),"\n",(0,r.jsx)(n.h2,{id:"root-config",children:"root-config"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5355\u4E2A html"}),"\n",(0,r.jsx)(n.li,{children:"\u7531\u670D\u52A1\u7AEF\u751F\u6210\u5373\u53EF"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"index",children:"index"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta http-equiv="X-UA-Compatible" content="ie=edge" />\n    <title>Root Config</title>\n    \x3c!-- \u7528\u4E8E\u4E0D\u652F\u6301 async/await \u7684\u6D4F\u89C8\u5668 --\x3e\n    \x3c!-- <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.5/runtime.min.js"><\/script> --\x3e\n\n    \x3c!--\n    This CSP allows any SSL-enabled host, but you should limit these directives further to increase your app\'s security.\n    Learn more about CSP policies at https://content-security-policy.com/#directive\n  --\x3e\n    <meta\n      http-equiv="Content-Security-Policy"\n      content="default-src \'self\' https: localhost:*; script-src \'unsafe-inline\' https: localhost:*; connect-src https: localhost:* ws://localhost:*; style-src \'unsafe-inline\' https:; object-src \'none\';"\n    />\n    <meta name="importmap-type" content="systemjs-importmap" />\n    \x3c!-- \u5168\u5C40\u6837\u5F0F --\x3e\n    <link href="https://unpkg.com/antd/dist/antd.min.css" rel="stylesheet" />\n\n    \x3c!-- \u516C\u5171\u4F9D\u8D56\n\n    1. System.register (preferred when possible) - https://github.com/systemjs/systemjs/blob/master/docs/system-register.md\n    2. UMD - https://github.com/umdjs/umd\n    3. Global variable\n\n    \u53C2\u8003 https://single-spa.js.org/docs/recommended-setup#sharing-with-import-maps.\n  --\x3e\n    <script type="systemjs-importmap">\n      {\n        "imports": {\n          "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.5.0/lib/system/single-spa.min.js",\n          "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",\n          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",\n          "antd": "https://unpkg.com/antd@4.3.5/dist/antd-with-locales.min.js"\n        }\n      }\n    <\/script>\n\n    \x3c!-- \u4F7F\u7528\u5916\u90E8\u5BFC\u5165\u6620\u5C04  --\x3e\n    \x3c!-- <script type="systemjs-importmap" src="/importmap.json"><\/script> --\x3e\n\n    \x3c!-- \u672C\u5730\u5F00\u53D1\u5730\u5740 --\x3e\n    <script type="systemjs-importmap">\n      {\n        "imports": {\n          "@wener-spa/root-config": "//localhost:9000/wener-spa-root-config.js",\n          "@wener-spa/dash": "//localhost:8081/wener-spa-dash.js"\n        }\n      }\n    <\/script>\n\n    \x3c!-- \u672C\u5730\u5F00\u53D1\u4F7F\u7528 --\x3e\n    <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@1.14.6/dist/import-map-overrides.js"><\/script>\n    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/system.js"><\/script>\n    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/amd.js"><\/script>\n    <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/named-exports.js"><\/script>\n\n    \x3c!-- \u751F\u4EA7\u4F7F\u7528\n  <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@1.14.6/dist/import-map-overrides.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/system.min.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/amd.min.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.3.1/dist/extras/named-exports.min.js"><\/script>\n  --\x3e</head>\n  <body>\n    <main></main>\n    <script>\n      // \u542F\u52A8\u8BE5\u6A21\u5757\n      System.import(\'@wener-spa/root-config\');\n    <\/script>\n    \x3c!-- \u5F00\u53D1\u5DE5\u5177 - \u6D4B\u8BD5 importmap --\x3e\n    <import-map-overrides-full show-when-local-storage="devtools" dev-libs></import-map-overrides-full>\n  </body>\n</html>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"config",children:"config"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { registerApplication, start } from 'single-spa';\n\n// \u6CE8\u518C\u5E94\u7528\nregisterApplication({\n  name: '@wener-spa/dash',\n  app: () => System.import('@wener-spa/dash'),\n  // \u524D\u7F00\u5339\u914D\u7684\u6FC0\u6D3B\u8DEF\u5F84\n  activeWhen: ['/'],\n});\n\n// \u542F\u52A8\u5E94\u7528\nstart({\n  urlRerouteOnly: true,\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"parcel",children:"parcel"}),"\n",(0,r.jsx)(n.h3,{id:"entry",children:"entry"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import React from 'react';\nimport ReactDOM from 'react-dom';\n// \u6302\u8F7D\u6839\u7EC4\u4EF6\nimport rootComponent from './path-to-root-component.js';\n// Note that SingleSpaContext is a react@16.3 (if available) context that provides the singleSpa props\nimport singleSpaReact, { SingleSpaContext } from 'single-spa-react';\nconst reactLifecycles = singleSpaReact({\n  React,\n  ReactDOM,\n  rootComponent,\n  errorBoundary(err, info, props) {\n    // https://reactjs.org/docs/error-boundaries.html\n    return <div>This renders when a catastrophic error occurs</div>;\n  },\n});\nexport const bootstrap = reactLifecycles.bootstrap;\nexport const mount = reactLifecycles.mount;\nexport const unmount = reactLifecycles.unmount;\n"})}),"\n",(0,r.jsx)(n.h3,{id:"webpack",children:"webpack"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const webpackMerge = require('webpack-merge');\nconst singleSpaDefaults = require('webpack-config-single-spa-react-ts');\n\nmodule.exports = (webpackConfigEnv) => {\n  const defaultConfig = singleSpaDefaults({\n    orgName: 'wener-spa',\n    projectName: 'dash',\n    webpackConfigEnv,\n  });\n\n  const config = webpackMerge.smart(defaultConfig, {\n    // modify the webpack config however you'd like to by adding to this object\n  });\n  // \u6DFB\u52A0\u989D\u5916\u7684\u5916\u90E8\u4F9D\u8D56 - \u9ED8\u8BA4\u4F1A\u6DFB\u52A0 react\u3001react-dom \u7B49\n  config.externals.push('antd');\n  return config;\n};\n"})}),"\n",(0,r.jsx)(n.h2,{id:"utility",children:"utility"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u6CA1\u6709 entry"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u63A8\u8350\u8BBE\u7F6E",children:"\u63A8\u8350\u8BBE\u7F6E"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://single-spa.js.org/docs/recommended-setup/",children:"The Recommended Setup"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/namecheap/ilc",children:"namecheap/ilc"})," - Isomorphic Layout Compose\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"SSR \u652F\u6301"}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/namecheap/ilc/blob/master/docs/registry.md",children:"\u6CE8\u518C\u4E2D\u5FC3"})," - \u5E94\u7528\u3001\u9875\u9762\u3001\u914D\u7F6E\u3001\u6A21\u677F"]}),"\n"]}),"\n"]}),"\n"]})]})}function p(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return l}});var t=s(75271);let r={},i=t.createContext(r);function l(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);