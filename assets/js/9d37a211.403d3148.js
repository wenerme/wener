"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73477"],{88767:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>d,default:()=>x,assets:()=>t,toc:()=>h,frontMatter:()=>c});var r=JSON.parse('{"id":"web/framework/vue/README","title":"Vue","description":"\u751F\u547D\u5468\u671F","source":"@site/../notes/web/framework/vue/README.md","sourceDirName":"web/framework/vue","slug":"/web/framework/vue/","permalink":"/notes/web/framework/vue/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/vue/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"Vue"},"sidebar":"docs","previous":{"title":"hbuilderx","permalink":"/notes/web/framework/uniapp/hbuilderx"},"next":{"title":"vuex","permalink":"/notes/web/framework/vue/pinia"}}'),l=i("52676"),s=i("79938");let c={title:"Vue"},d="Vue",t={},h=[{value:"Server Render",id:"server-render",level:2},{value:"Notes",id:"notes",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"vue",children:"Vue"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"\u751F\u547D\u5468\u671F"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{src:"http://vuejs.org/images/lifecycle.png",alt:""})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://mint-ui.github.io/",children:"http://mint-ui.github.io/"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# \u4E4B\u6240\u4EE5\u4F7F\u7528 yarn \u662F\u56E0\u4E3A yran \u66F4\u5FEB\u66F4\u65B9\u4FBF\n# npm i -g yarn # \u5982\u679C\u6CA1\u6709 yarn \u53EF\u5148\u5B89\u88C5 yarn\nyarn global add vue@latest\n# \u521B\u5EFA\u4E00\u4E2A\u9879\u76EE\u76EE\u5F55\nmkdir my-project\ncd my-project\n# \u521D\u59CB\u5316 vue \u9879\u76EE\nvue init webpack .\n# \u6CE8\u610F\u5173\u6389\u6240\u6709\u6D4B\u8BD5 \u548C lint\n\n# \u5E38\u7528\u7684\u4F9D\u8D56\nyarn add font-awesome ionicons moment vue-router\nmkdir -p src/{api,pages}\ntouch src/{api,pages}/index.js src/{router,base,conf}.js\n"})}),"\n",(0,l.jsx)(n.h2,{id:"server-render",children:"Server Render"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u670D\u52A1\u7AEF\u6E32\u67D3\u6846\u67B6 ",(0,l.jsx)(n.a,{href:"https://github.com/nuxt/nuxt.js",children:"https://github.com/nuxt/nuxt.js"})]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Vue \u57FA\u672C\u5143\u7D20\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u6307\u4EE4"}),"\n",(0,l.jsx)(n.li,{children:"\u5C5E\u6027"}),"\n",(0,l.jsx)(n.li,{children:"\u8BA1\u7B97\u5C5E\u6027"}),"\n",(0,l.jsx)(n.li,{children:"\u8FC7\u6EE4\u5668"}),"\n",(0,l.jsx)(n.li,{children:"\u65B9\u6CD5"}),"\n",(0,l.jsx)(n.li,{children:"\u76D1\u89C6 (watch)"}),"\n",(0,l.jsx)(n.li,{children:"\u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6307\u4EE4\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u8BED\u6CD5 ",(0,l.jsx)(n.code,{children:'\u6307\u4EE4:\u53C2\u6570.\u4FEE\u9970\u7B26="\u7ED1\u5B9A\u503C"'})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"v-bind"})," \u6570\u636E\u7ED1\u5B9A\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u8BED\u6CD5 ",(0,l.jsx)(n.code,{children:'v-bind:\u5C5E\u6027="\u5C5E\u6027\u5B57\u6BB5"'})]}),"\n",(0,l.jsx)(n.li,{children:"\u5355\u5411"}),"\n",(0,l.jsxs)(n.li,{children:["\u7F29\u5199 ",(0,l.jsx)(n.code,{children:":\u5C5E\u6027"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"v-model"})," \u6A21\u578B\u7ED1\u5B9A\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u53CC\u5411\u7ED1\u5B9A"}),"\n",(0,l.jsx)(n.li,{children:"\u4E3B\u8981\u7528\u4E8E\u8868\u5355\u5143\u7D20"}),"\n",(0,l.jsxs)(n.li,{children:["\u4FEE\u9970\u7B26\u5305\u62EC\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".lazy"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".number"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".trim"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"v-on"})," \u4E8B\u4EF6\u7ED1\u5B9A\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u8BED\u6CD5 ",(0,l.jsx)(n.code,{children:'v-on:\u4E8B\u4EF6\u7C7B\u578B.\u4FEE\u9970\u7B26="\u4EE3\u7801 | \u65B9\u6CD5\u540D | \u65B9\u6CD5\u8C03\u7528"'})]}),"\n",(0,l.jsx)(n.li,{children:"\u65B9\u6CD5\u8C03\u7528\u65F6\u53EF\u4F7F\u7528 $event \u6765\u8BBF\u95EE\u539F event \u5BF9\u8C61"}),"\n",(0,l.jsxs)(n.li,{children:["\u7F29\u5199 ",(0,l.jsx)(n.code,{children:"@\u4E8B\u4EF6\u540D.\u4FEE\u9970\u7B26"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u4FEE\u9970\u7B26\u5305\u62EC\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".stop"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".prevent"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".capture"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:".self"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u5728\u5904\u7406\u6309\u952E\u4E8B\u4EF6\u65F6\u53EF\u4F7F\u7528\u7684\u4FEE\u9970\u7B26\u8FD8\u5305\u62EC\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"enter"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"tab"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"delete"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4F1A\u540C\u65F6\u6355\u83B7\u5220\u9664\u548C\u5012\u9000\u952E(Backspace)"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"esc"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"space"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"up"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"down"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"left"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"right"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6309\u952E\u4E8B\u4EF6\u53EF\u4F7F\u7528\u8BED\u6CD5 ",(0,l.jsx)(n.code,{children:"@\u6309\u952E\u4E8B\u4EF6.\u952E\u503C"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function x(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return d},a:function(){return c}});var r=i(75271);let l={},s=r.createContext(l);function c(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);