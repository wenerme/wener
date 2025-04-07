"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["40557"],{7768:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>i,default:()=>u,assets:()=>c,toc:()=>d,frontMatter:()=>a});var t=JSON.parse('{"id":"web/react/styled-jsx","title":"styled-jsx","description":"- vercel/styled-jsx","source":"@site/../notes/web/react/styled-jsx.md","sourceDirName":"web/react","slug":"/web/react/styled-jsx","permalink":"/notes/web/react/styled-jsx","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/react/styled-jsx.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1652772118000,"frontMatter":{"title":"styled-jsx"},"sidebar":"docs","previous":{"title":"shadcn","permalink":"/notes/web/react/shadcn"},"next":{"title":"@tanstack/react-router","permalink":"/notes/web/react/tanstack-router"}}'),l=s("52676"),r=s("79938");let a={title:"styled-jsx"},i="styled-jsx",c={},d=[{value:"tailwind",id:"tailwind",level:2}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"styled-jsx",children:"styled-jsx"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/vercel/styled-jsx",children:"vercel/styled-jsx"})}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u9ED8\u8BA4\u4E0D\u652F\u6301\u4F20\u9012\u6837\u5F0F\u5230 children ",(0,l.jsx)(n.a,{href:"https://github.com/vercel/styled-jsx/issues/573",children:"#573"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:".ment-item > a"})," \u5982\u679C a \u662F\u5728\u4E00\u4E2A\u7EC4\u4EF6\u91CC\uFF0C\u65E0\u6CD5\u5F71\u54CD\u5230"]}),"\n",(0,l.jsxs)(n.li,{children:["\u4F7F\u7528 ",(0,l.jsx)(n.code,{children:".menu-item > :global(a)"})]}),"\n",(0,l.jsx)(n.li,{children:"\u6216\u8005\u4F20\u9012 css.resolve \u8FD4\u56DE\u7684 className \u5230\u5B50\u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:"import css from 'styled-jsx/css';\n\n// \u5168\u5C40\u6837\u5F0F - \u4E0D\u4F7F\u7528 className \u9650\u5B9A\nconst body = css.global`\n  body {\n    margin: 0;\n  }\n`;\n\n// babel-plugin-macros \u53EF\u4F5C\u4E3A babel macros\nconst { className, styles } = css.resolve`\n  a {\n    color: green;\n  }\n`;\nexport default () => (\n  <div>\n    <style jsx>{`\n      /* \u901A\u8FC7\u4E0D\u4FEE\u9970 a \u5F71\u54CD\u5B50\u7EC4\u4EF6 */\n      div > :global(a) {\n        // \u901A\u8FC7 styled-jsx-plugin-postcss \u4F7F\u7528 postcss - \u4F7F\u7528 tailwind\n        @apply text-red;\n      }\n    `}</style>\n\n    {/* \u901A\u8FC7\u4F20\u9012 className \u5F71\u54CD\u5B50\u7EC4\u4EF6 */}\n    <Link className={className}>About</Link>\n    {styles}\n\n    {/* \u6E32\u67D3 global */}\n    <style jsx global>\n      {body}\n    </style>\n  </div>\n);\n"})}),"\n",(0,l.jsx)(n.h2,{id:"tailwind",children:"tailwind"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u542F\u7528\u540E\u4E0D\u4F1A\u4F7F\u7528 SWC \u7F16\u8BD1 - \u63A8\u8350\u4F7F\u7528 css module"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-json",metastring:'title=".babelrc"',children:'{\n  "presets": [\n    [\n      "next/babel",\n      {\n        "styled-jsx": {\n          "plugins": ["styled-jsx-plugin-postcss"]\n        }\n      }\n    ]\n  ]\n}\n'})})]})}function u(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return i},a:function(){return a}});var t=s(75271);let l={},r=t.createContext(l);function a(e){let n=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);