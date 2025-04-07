"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["21422"],{99721:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>r,default:()=>c,assets:()=>l,toc:()=>o,frontMatter:()=>d});var s=JSON.parse('{"id":"dev/design/design-breakpoint","title":"\u54CD\u5E94\u5F0F\u65AD\u70B9","description":"- breakpoints","source":"@site/../notes/dev/design/design-breakpoint.md","sourceDirName":"dev/design","slug":"/dev/design/breakpoint","permalink":"/notes/dev/design/breakpoint","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/design/design-breakpoint.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1637943795000,"frontMatter":{"title":"\u54CD\u5E94\u5F0F\u65AD\u70B9"},"sidebar":"docs","previous":{"title":"Auth","permalink":"/notes/dev/design/auth"},"next":{"title":"Design Builder","permalink":"/notes/dev/design/builder"}}'),i=t("52676"),a=t("79938");let d={title:"\u54CD\u5E94\u5F0F\u65AD\u70B9"},r="\u54CD\u5E94\u5F0F\u65AD\u70B9",l={},o=[{value:"tailwindcss",id:"tailwindcss",level:2},{value:"bootstrap",id:"bootstrap",level:2}];function p(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u54CD\u5E94\u5F0F\u65AD\u70B9",children:"\u54CD\u5E94\u5F0F\u65AD\u70B9"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"breakpoints"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title="react grid - my prefer"',children:'{\n  "breakpoints": { "lg": 1200, "md": 996, "sm": 768, "xs": 480, "xxs": 0 },\n  "columns": { "lg": 24, "md": 12, "sm": 6, "xs": 4, "xxs": 2 }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"tailwindcss",children:"tailwindcss"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://tailwindcss.com/docs/breakpoints",children:"https://tailwindcss.com/docs/breakpoints"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",metastring:'title="tailwind.config.js"',children:"module.exports = {\n  theme: {\n    screens: {\n      // default\n      // ==========\n      sm: '640px',\n      // => @media (min-width: 640px) { ... }\n\n      md: '768px',\n      // => @media (min-width: 768px) { ... }\n\n      lg: '1024px',\n      // => @media (min-width: 1024px) { ... }\n\n      xl: '1280px',\n      // => @media (min-width: 1280px) { ... }\n\n      '2xl': '1536px',\n      // => @media (min-width: 1536px) { ... }\n\n      // can do\n      // ==========\n      tablet: '640px',\n      // => @media (min-width: 640px) { ... }\n\n      laptop: '1024px',\n      // => @media (min-width: 1024px) { ... }\n\n      desktop: '1280px',\n      // => @media (min-width: 1280px) { ... }\n    },\n  },\n};\n"})}),"\n",(0,i.jsx)(n.h2,{id:"bootstrap",children:"bootstrap"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"xs, sm, md, lg, xl"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints",children:"https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scss",metastring:'title="min"',children:"// Extra small devices (portrait phones, less than 576px)\n// No media query for `xs` since this is the default in Bootstrap\n\n// Small devices (landscape phones, 576px and up)\n@media (min-width: 576px) {\n}\n\n// Medium devices (tablets, 768px and up)\n@media (min-width: 768px) {\n}\n\n// Large devices (desktops, 992px and up)\n@media (min-width: 992px) {\n}\n\n// Extra large devices (large desktops, 1200px and up)\n@media (min-width: 1200px) {\n}\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scss",metastring:'title="max"',children:"// Extra small devices (portrait phones, less than 576px)\n@media (max-width: 575.98px) {\n}\n\n// Small devices (landscape phones, less than 768px)\n@media (max-width: 767.98px) {\n}\n\n// Medium devices (tablets, less than 992px)\n@media (max-width: 991.98px) {\n}\n\n// Large devices (desktops, less than 1200px)\n@media (max-width: 1199.98px) {\n}\n// Extra large devices (large desktops)\n// No media query since the extra-large breakpoint has no upper bound on its width\n"})})]})}function c(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return r},a:function(){return d}});var s=t(75271);let i={},a=s.createContext(i);function d(e){let n=s.useContext(a);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);