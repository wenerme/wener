"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87785"],{20447:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>a,default:()=>h,assets:()=>l,toc:()=>c,frontMatter:()=>i});var s=JSON.parse('{"id":"blockchain/eth/tokenlist","title":"Token List","description":"- Uniswap/token-lists","source":"@site/../notes/blockchain/eth/tokenlist.md","sourceDirName":"blockchain/eth","slug":"/blockchain/eth/tokenlist","permalink":"/notes/blockchain/eth/tokenlist","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/blockchain/eth/tokenlist.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659031280000,"frontMatter":{"title":"Token List"},"sidebar":"docs","previous":{"title":"uniswap","permalink":"/notes/blockchain/eth/swap/uniswap"},"next":{"title":"Metamask","permalink":"/notes/blockchain/metamask"}}'),r=t("52676"),o=t("79938");let i={title:"Token List"},a="Token List",l={},c=[];function d(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"token-list",children:"Token List"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/Uniswap/token-lists",children:"Uniswap/token-lists"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://tokenlists.org/",children:"https://tokenlists.org/"})," - Ethereum token list"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://uniswap.org/tokenlist.schema.json",children:"https://uniswap.org/tokenlist.schema.json"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"./eth-awesome.md#swap",children:"Swap Token"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6D41\u52A8\u6C60\u4E5F\u53EF\u80FD\u4F1A\u53D1\u884C\u81EA\u5DF1\u7684 Token \u7528\u6765\u6FC0\u52B1"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"type ExtensionValue = string | number | boolean | null;\n\nexport interface TokenInfo {\n  readonly chainId: number;\n  readonly address: string;\n  readonly name: string;\n  readonly decimals: number;\n  readonly symbol: string;\n  readonly logoURI?: string;\n  readonly tags?: string[];\n  readonly extensions?: {\n    readonly [key: string]: { [key: string]: ExtensionValue } | ExtensionValue;\n  };\n}\n\nexport interface Version {\n  readonly major: number;\n  readonly minor: number;\n  readonly patch: number;\n}\n\nexport interface Tags {\n  readonly [tagId: string]: {\n    readonly name: string;\n    readonly description: string;\n  };\n}\n\nexport interface TokenList {\n  readonly name: string;\n  readonly timestamp: string;\n  readonly version: Version;\n  readonly tokens: TokenInfo[];\n  readonly keywords?: string[];\n  readonly tags?: Tags;\n  readonly logoURI?: string;\n}\n"})})]})}function h(n={}){let{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return a},a:function(){return i}});var s=t(75271);let r={},o=s.createContext(r);function i(n){let e=s.useContext(o);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),s.createElement(o.Provider,{value:e},n.children)}}}]);