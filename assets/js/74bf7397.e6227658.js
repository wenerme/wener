"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["19172"],{92239:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>a,frontMatter:()=>l});var t=JSON.parse('{"id":"web/dev/hmr","title":"hmr","description":"- live reload - \u68C0\u6D4B\u5230\u53D8\u5316\u5237\u65B0\u9875\u9762","source":"@site/../notes/web/dev/hmr.md","sourceDirName":"web/dev","slug":"/web/dev/hmr","permalink":"/notes/web/dev/hmr","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dev/hmr.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1666003394000,"frontMatter":{"title":"hmr"},"sidebar":"docs","previous":{"title":"eslint","permalink":"/notes/web/dev/eslint"},"next":{"title":"Hono","permalink":"/notes/web/dev/hono"}}'),s=r("52676"),i=r("79938");let l={title:"hmr"},d="hmr",c={},a=[{value:"Vite HMR",id:"vite-hmr",level:2},{value:"react refresh",id:"react-refresh",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"hmr",children:"hmr"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["live reload - \u68C0\u6D4B\u5230\u53D8\u5316\u5237\u65B0\u9875\u9762\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u901A\u5E38\u4F7F\u7528\u4E00\u4E2A EventSource - SSE"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/evanw/esbuild/issues/802#issuecomment-819578182",children:"esbuild#802"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["HMR - Hot Module Replacement - Hot Module Reload\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5F3A\u8C03\u4FDD\u7559\u72B6\u6001"}),"\n",(0,s.jsxs)(n.li,{children:["Webpack\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://webpack.js.org/concepts/hot-module-replacement/",children:"Concept"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://webpack.js.org/api/hot-module-replacement",children:"API"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Vite ",(0,s.jsx)(n.a,{href:"https://vitejs.dev/guide/api-hmr.html",children:"HMR API"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u63A5\u53E3\u4E0E Webpack \u7C7B\u4F3C\u4F46\u4E0D\u76F8\u540C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["React Fast Refresh\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"HMR \u66F4\u8FDB\u4E00\u6B65 - \u7EC4\u4EF6\u7EAC\u5EA6"}),"\n",(0,s.jsxs)(n.li,{children:["\u652F\u6301\u7684 bundler\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"rn, parcel2, webpack, cra, nextjs, vite"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u68C0\u6D4B\u5230\u53D8\u5316\uFF0C\u66F4\u65B0\u7EC4\u4EF6\uFF0Cre-render"}),"\n",(0,s.jsx)(n.li,{children:"\u5982\u679C exports \u4E0D\u6B62 react \u7EC4\u4EF6\uFF0C\u8FD8\u4F1A\u66F4\u65B0\u5176\u4ED6 import \u4F9D\u8D56"}),"\n",(0,s.jsxs)(n.li,{children:["prevExports\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4E0A\u6B21\u7684\u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://reactnative.dev/docs/fast-refresh",children:"https://reactnative.dev/docs/fast-refresh"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/gaearon/react-hot-loader",children:"react-hot-loader"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"fast refresh \u4E4B\u524D\u7684\u65B9\u6848"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"vite-hmr",children:"Vite HMR"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface ImportMeta {\n  // \u5224\u65AD\u5F53\u524D\u662F\u5426\u4E3A HMR \u73AF\u5883\n  readonly hot?: ViteHotContext;\n}\n\ntype ModuleNamespace = Record<string, any> & {\n  [Symbol.toStringTag]: 'Module';\n};\n\ninterface ViteHotContext {\n  // \u6301\u4E45\u5316\u6570\u636E\n  readonly data: any;\n\n  // \u63A5\u53D7\u65B0\u7684\u6A21\u5757 - HMR boundary\n  accept(): void;\n  accept(cb: (mod: ModuleNamespace | undefined) => void): void;\n  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void;\n  accept(deps: readonly string[], cb: (mods: Array<ModuleNamespace | undefined>) => void): void;\n\n  // \u9500\u6BC1\u524D\u56DE\u8C03\n  dispose(cb: (data: any) => void): void;\n  // \u4E0D\u53EF HMR\n  decline(): void;\n  invalidate(): void;\n\n  // vite:beforeUpdate, vite:beforeFullReload, vite:beforePrune, vite:invalidate, vite:error\n  // `InferCustomEventPayload` provides types for built-in Vite events\n  on<T extends string>(event: T, cb: (payload: InferCustomEventPayload<T>) => void): void;\n  send<T extends string>(event: T, data?: InferCustomEventPayload<T>): void;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"react-refresh",children:"react refresh"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/facebook/react/tree/main/packages/react-refresh",children:"react/packages/react-refresh"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/facebook/react/issues/16604#issuecomment-528663101",children:"react#16604"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$RefreshReg$"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$RefreshSig$"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/pmmmwh/react-refresh-webpack-plugin",children:"pmmmwh/react-refresh-webpack-plugin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"$RefreshHelpers$"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"// reload\n/* @refresh reset */\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return d},a:function(){return l}});var t=r(75271);let s={},i=t.createContext(s);function l(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);