"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87954"],{37112:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>a,default:()=>u,assets:()=>l,toc:()=>d,frontMatter:()=>o});var t=JSON.parse('{"id":"web/react/react-grid-layout","title":"react-grid-layout","description":"- react-grid-layout/react-grid-layout","source":"@site/../notes/web/react/react-grid-layout.md","sourceDirName":"web/react","slug":"/web/react/grid-layout","permalink":"/notes/web/react/grid-layout","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/react/react-grid-layout.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1638525380000,"frontMatter":{"title":"react-grid-layout"},"sidebar":"docs","previous":{"title":"react-flow","permalink":"/notes/web/react/flow"},"next":{"title":"React Hook Form","permalink":"/notes/web/react/hook-form"}}'),i=r("52676"),s=r("79938");let o={title:"react-grid-layout"},a="react-grid-layout",l={},d=[{value:"Notes",id:"notes",level:2},{value:"Resize based on container",id:"resize-based-on-container",level:2}];function c(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"react-grid-layout",children:"react-grid-layout"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/react-grid-layout/react-grid-layout",children:"react-grid-layout/react-grid-layout"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5B50\u9879\u76EE\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/react-grid-layout/react-draggable",children:"react-draggable"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/react-grid-layout/react-resizable",children:"react-resizable"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Responsive\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"lg,md,sm,xs,xxs"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"memo children \u53EF\u4EE5\u63D0\u5347\u6027\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"\u81EA\u5B9A\u4E49 child \u8981\u6C42 React.forwardRef \u4E14\u63A5\u53D7 style, className"}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["ResponsiveGridLayout \u5728 container \u4E2D\uFF0C\u5F53 container resize \u7684\u65F6\u5019\u4E0D\u4F1A\u53D8\u5316\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/react-grid-layout/react-grid-layout/blob/master/lib/components/WidthProvider.jsx",children:"WidthProvide"})," \u9ED8\u8BA4\u53EA\u76D1\u542C\u4E86 window resize"]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'// \u57FA\u4E8E\u73AF\u5883\u81EA\u52A8\u68C0\u6D4B width\nconst ResponsiveGridLayout = WidthProvider(Responsive);\n\nconst Demo = () => {\n  return (\n    <ResponsiveGridLayout\n      layouts={{}}\n      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}\n      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}\n    >\n      <div key="1">1</div>\n      <div key="2">2</div>\n      <div key="3">3</div>\n    </ResponsiveGridLayout>\n  );\n};\n'})}),"\n",(0,i.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["resize handle \u4F1A\u4F5C\u4E3A children \u4F20\u5165 \u5B50\u5143\u7D20\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u56E0\u6B64 children \u4F1A\u53D8\u4E3A\u6570\u7EC4"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u81EA\u5B9A\u4E49\u5143\u7D20\u9700\u8981\u6CE8\u610F\u5904\u7406\u597D \u900F\u4F20 props"}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(n.h2,{id:"resize-based-on-container",children:"Resize based on container"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import useResizeObserver from 'use-resize-observer';\nimport { Responsive, ResponsiveProps } from 'react-grid-layout';\nconst ResponsiveGridLayout: React.FC<ResponsiveProps> = (props) => {\n  const { ref, width } = useResizeObserver();\n  const realWidth = useDebounce(width, 200);\n  // measureBeforeMount\n  const w = realWidth ?? width;\n  return (\n    <div className={classNames('h-full w-full')} ref={ref}>\n      {w && <Responsive width={w} {...props} />}\n    </div>\n  );\n};\n"})})]})}function u(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return a},a:function(){return o}});var t=r(75271);let i={},s=t.createContext(i);function o(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);