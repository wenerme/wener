"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["30980"],{49617:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>a,assets:()=>d,toc:()=>h,frontMatter:()=>t});var s=JSON.parse('{"id":"dev/design/design-ui","title":"Design UI","description":"- \u5C3D\u91CF\u662F Headless + Style","source":"@site/../notes/dev/design/design-ui.md","sourceDirName":"dev/design","slug":"/dev/design/ui","permalink":"/notes/dev/design/ui","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/design/design-ui.md","tags":[{"inline":true,"label":"UI","permalink":"/notes/tags/ui"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1741576659000,"frontMatter":{"title":"Design UI","tags":["UI"]},"sidebar":"docs","previous":{"title":"\u4EFB\u52A1\u7BA1\u7406","permalink":"/notes/dev/design/task"},"next":{"title":"Webhook \u8BBE\u8BA1","permalink":"/notes/dev/design/webhook"}}'),l=i("52676"),r=i("79938");let t={title:"Design UI",tags:["UI"]},c="Design UI",d={},h=[{value:"Chip",id:"chip",level:2},{value:"Pick vs Select",id:"pick-vs-select",level:2},{value:"React as vs asChild",id:"react-as-vs-aschild",level:2}];function o(n){let e={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"design-ui",children:"Design UI"})}),"\n",(0,l.jsx)(e.admonition,{type:"tip",children:(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5C3D\u91CF\u662F Headless + Style"}),"\n",(0,l.jsxs)(e.li,{children:["Headless - \u65E0\u6837\u5F0F\uFF0C\u53EA\u6709\u903B\u8F91\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"@radix-ui/react"}),"\n",(0,l.jsx)(e.li,{children:"@react-aria"}),"\n",(0,l.jsx)(e.li,{children:"@react-stately"}),"\n",(0,l.jsx)(e.li,{children:"@headlessui/react"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Style\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"tailwindcss"}),"\n",(0,l.jsx)(e.li,{children:"daisyui"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Design Token\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Design Token \u662F\u4E00\u79CD\u5728\u8BBE\u8BA1\u548C\u5F00\u53D1\u4E2D\u7528\u4E8E\u5B9A\u4E49\u548C\u7BA1\u7406\u89C6\u89C9\u6837\u5F0F\u7684\u6807\u51C6\u5316\u65B9\u5F0F\uFF0C\u80FD\u591F\u5C06\u8BBE\u8BA1\u7CFB\u7EDF\u4E2D\u7684\u5173\u952E\u6837\u5F0F\u4FE1\u606F\uFF08\u5982\u989C\u8272\u3001\u5B57\u4F53\u3001\u95F4\u8DDD\u7B49\uFF09\u62BD\u8C61\u4E3A\u5C0F\u7684\u3001\u53EF\u91CD\u7528\u7684\u3001\u8DE8\u5E73\u53F0\u7684\u503C\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u8FD9\u4E9B Token \u4EE5\u901A\u7528\u683C\u5F0F\uFF08\u5982 JSON \u6216 YAML\uFF09\u8868\u793A\uFF0C\u53EF\u4EE5\u5728\u4E0D\u540C\u5DE5\u5177\u548C\u6280\u672F\u6808\u4E4B\u95F4\u5171\u4EAB\u548C\u4E00\u81F4\u5730\u5E94\u7528\u3002"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/amzn/style-dictionary",children:"amzn/style-dictionary"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Apache-2.0, JS"}),"\n",(0,l.jsx)(e.li,{children:"build system for creating cross-platform styles."}),"\n",(0,l.jsxs)(e.li,{children:["Playground ",(0,l.jsx)(e.a,{href:"https://www.style-dictionary-play.dev/",children:"https://www.style-dictionary-play.dev/"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/sturobson/Awesome-Design-Tokens",children:"sturobson/Awesome-Design-Tokens"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://m3.material.io/foundations/design-tokens/overview",children:"https://m3.material.io/foundations/design-tokens/overview"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://spectrum.adobe.com/page/design-tokens/",children:"https://spectrum.adobe.com/page/design-tokens/"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://atlassian.design/tokens/design-tokens",children:"https://atlassian.design/tokens/design-tokens"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Profile\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"banner image"}),"\n",(0,l.jsx)(e.li,{children:"avatar/logo"}),"\n",(0,l.jsx)(e.li,{children:"title/full name"}),"\n",(0,l.jsx)(e.li,{children:"email"}),"\n",(0,l.jsx)(e.li,{children:"job title/org"}),"\n",(0,l.jsx)(e.li,{children:"website/url"}),"\n",(0,l.jsx)(e.li,{children:"location"}),"\n",(0,l.jsxs)(e.li,{children:["bio/description/tagline/summary\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"atom:subtitle"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"stats"}),"\n",(0,l.jsx)(e.li,{children:"contact"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Combobox\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8F93\u5165+\u9009\u62E9"}),"\n",(0,l.jsx)(e.li,{children:"typeahead\u3001\u641C\u7D22\u3001\u5F02\u6B65"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["HoverCard\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Profile + Action/Quick Action"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://indieweb.org/hovercard",children:"https://indieweb.org/hovercard"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.radix-ui.com/primitives/docs/components/hover-card",children:"https://www.radix-ui.com/primitives/docs/components/hover-card"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Popover"}),"\n",(0,l.jsxs)(e.li,{children:["The Atom Syndication Format ",(0,l.jsx)(e.a,{href:"https://datatracker.ietf.org/doc/html/rfc4287",children:"rfc4287"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"type - text, html, xhtml"}),"\n",(0,l.jsxs)(e.li,{children:["person\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"atom:name"}),"\n",(0,l.jsx)(e.li,{children:"atom:url"}),"\n",(0,l.jsx)(e.li,{children:"atom:email"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://m3.material.io/components",children:"https://m3.material.io/components"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://m2.material.io/components",children:"https://m2.material.io/components"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"chip",children:"Chip"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7C7B\u4F3C badge\uFF0C\u4F46\u662F\u53EF\u4EE5\u64CD\u4F5C"}),"\n",(0,l.jsx)(e.li,{children:"\u5FEB\u6377\u7684\u663E\u793A\u5173\u8054\u5173\u7CFB"}),"\n",(0,l.jsxs)(e.li,{children:["\u7279\u70B9\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u7D27\u51D1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Chips \u662F\u7D27\u51D1\u7684\u7EC4\u4EF6\uFF0C\u4EE3\u8868\u79BB\u6563\u7684\u4FE1\u606F\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u76F8\u5173\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Chips \u5E94\u8BE5\u4E0E\u5B83\u4EEC\u4EE3\u8868\u7684\u5185\u5BB9\u6216\u4EFB\u52A1\u6709\u660E\u786E\u4E14\u6709\u5E2E\u52A9\u7684\u5173\u7CFB\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4E13\u6CE8\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Chips \u5E94\u8BE5\u4F7F\u4EFB\u52A1\u66F4\u5BB9\u6613\u5B8C\u6210\uFF0C\u6216\u4F7F\u5185\u5BB9\u66F4\u5BB9\u6613\u5206\u7C7B\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"\u53C2\u8003"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://m3.material.io/components/chips",children:"https://m3.material.io/components/chips"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://m2.material.io/components/chips",children:"https://m2.material.io/components/chips"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Assist chip"}),"\n",(0,l.jsx)(e.li,{children:"Filter chip"}),"\n",(0,l.jsx)(e.li,{children:"Input chip"}),"\n",(0,l.jsx)(e.li,{children:"Suggestion chip"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://designsystem.line.me/LDSG/components/inputs/chip-en",children:"https://designsystem.line.me/LDSG/components/inputs/chip-en"})}),"\n"]}),"\n",(0,l.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(e.h2,{id:"pick-vs-select",children:"Pick vs Select"}),"\n",(0,l.jsxs)(e.blockquote,{children:["\n",(0,l.jsx)(e.p,{children:"Picker vs Selector"}),"\n"]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Pick - \u6311\u9009\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66F4\u52A0\u968F\u610F - \u9009\u62E9\u7684\u5185\u5BB9\u4E0D\u4E00\u5B9A\u56FA\u5B9A"}),"\n",(0,l.jsxs)(e.li,{children:["\u4F7F\u7528\u573A\u666F\uFF1A\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u914D\u8272\u5668\uFF08Color Picker\uFF09\uFF1A\u7528\u6237\u53EF\u4EE5\u4ECE\u8C03\u8272\u677F\u4E2D\u6311\u9009\u4EFB\u610F\u989C\u8272\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u56FE\u6807\u9009\u62E9\u5668\uFF08Icon Picker\uFF09\uFF1A\u7528\u6237\u53EF\u4EE5\u4ECE\u56FE\u6807\u5E93\u4E2D\u6311\u9009\u4EFB\u610F\u56FE\u6807\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u65E5\u671F\u9009\u62E9\u5668\uFF08Date Picker\uFF09\uFF1A\u7528\u6237\u53EF\u4EE5\u4ECE\u65E5\u5386\u4E2D\u6311\u9009\u4EFB\u610F\u65E5\u671F\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Select - \u9009\u62E9\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66F4\u52A0\u6B63\u5F0F - \u9009\u9879\u56FA\u5B9A"}),"\n",(0,l.jsxs)(e.li,{children:["\u4F7F\u7528\u573A\u666F\uFF1A\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E0B\u62C9\u83DC\u5355\uFF08Dropdown\uFF09\uFF1A\u7528\u6237\u4ECE\u9884\u5B9A\u4E49\u7684\u9009\u9879\u4E2D\u9009\u62E9\u4E00\u4E2A\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u7EC4\u5408\u6846\uFF08Combobox\uFF09\uFF1A\u7528\u6237\u53EF\u4EE5\u4ECE\u9884\u5B9A\u4E49\u7684\u9009\u9879\u4E2D\u9009\u62E9\u4E00\u4E2A\u6216\u8F93\u5165\u65B0\u7684\u9009\u9879\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u5355\u9009\u6309\u94AE\uFF08Radio\uFF09\uFF1A\u7528\u6237\u4ECE\u4E00\u7EC4\u5355\u9009\u6309\u94AE\u4E2D\u9009\u62E9\u4E00\u4E2A\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u590D\u9009\u6846\uFF08Checkbox\uFF09\uFF1A\u7528\u6237\u53EF\u4EE5\u4ECE\u4E00\u7EC4\u590D\u9009\u6846\u4E2D\u9009\u62E9\u591A\u4E2A\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"react-as-vs-aschild",children:"React as vs asChild"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["as\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66FF\u4EE3\u7EC4\u4EF6"}),"\n",(0,l.jsxs)(e.li,{children:["\u4F18\u52BF \uD83D\uDC4D\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66F4\u652F\u6301\u66F4\u590D\u6742\u7684\u7ED3\u6784"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u52A3\u52BF \uD83D\uDC4E\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u5B9A\u4E49 props \u7C7B\u578B\u76F8\u5BF9\u9EBB\u70E6\uFF0C\u7279\u522B\u662F\u6709 ",(0,l.jsx)(e.del,{children:"forwardRef"})," \u7684\u65F6\u5019"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.del,{children:"forwardRef"})," \u4E0D\u80FD\u4F7F\u7528 arrow function \u5B9A\u4E49 - \u65E0\u6CD5\u6307\u5B9A\u6CDB\u578B, \u53EA\u80FD\u5F3A\u5236 cast"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["asChild\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F7F\u7528\u5B50\u7EC4\u4EF6"}),"\n",(0,l.jsxs)(e.li,{children:["\u4F18\u52BF \uD83D\uDC4D\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u66F4\u7B80\u5355"}),"\n",(0,l.jsx)(e.li,{children:"\u66F4\u597D\u7684\u7C7B\u578B\u652F\u6301 - \u7C7B\u578B\u5904\u7406\u66F4\u7B80\u5355\uFF0C\u4E0D\u9700\u8981\u8003\u8651\u5B9E\u9645\u7EC4\u4EF6\u7684 props"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u52A3\u52BF \uD83D\uDC4E\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u591A\u4E00\u5C42\u7ED3\u6784"}),"\n",(0,l.jsx)(e.li,{children:"\u65E0\u6CD5\u652F\u6301\u590D\u6742\u7684\u7ED3\u6784"}),"\n",(0,l.jsx)(e.li,{children:"\u9700\u8981 merge props"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["@radix-ui/react-slot - ",(0,l.jsx)(e.a,{href:"https://www.radix-ui.com/primitives/docs/utilities/slot",children:"https://www.radix-ui.com/primitives/docs/utilities/slot"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Slot, Slottable"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:"export type AsProps<E extends React.ElementType> = Omit<React.ComponentProps<E>, 'as'> & {\n  as?: E;\n};\n\nexport type WithAsProps<E extends React.ElementType, P extends {} = {}> = P & AsProps<E>;\n\n//\nexport type LayoutProps<E extends React.ElementType> = WithAsProps<E>;\nconst Layout = ({ as, children }) => {\n  const As = as || 'div';\n  // \u8FD9\u79CD\u65F6\u5019\u60F3\u8981\u7528 asChild \u9700\u8981\u5C06 header \u63D0\u53D6\u4E3A\u72EC\u7ACB\u7EC4\u4EF6\uFF0C\u4F7F\u7528\u7C7B\u4F3C Layout.Root, Layout.Header \u65B9\u5F0F\u6765\u5C01\u88C5\u66F4\u7EC6\u7C92\u5EA6\u7EC4\u4EF6\n  return (\n    <As>\n      <header>...</header>\n      {children}\n    </As>\n  );\n};\n"})})]})}function a(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);