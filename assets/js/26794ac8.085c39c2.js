"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["27430"],{85178:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>h,assets:()=>d,toc:()=>l,frontMatter:()=>i});var r=JSON.parse('{"id":"languages/c/c-cookbook","title":"C Cookbook","description":"- git/banned.h","source":"@site/../notes/languages/c/c-cookbook.md","sourceDirName":"languages/c","slug":"/languages/c/cookbook","permalink":"/notes/languages/c/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/c/c-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1636785414000,"frontMatter":{"title":"C Cookbook","tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"C Build","permalink":"/notes/languages/c/build"},"next":{"title":"C FAQ","permalink":"/notes/languages/c/faq"}}'),s=t("52676"),o=t("79938");let i={title:"C Cookbook",tags:["Cookbook"]},c="C Cookbook",d={},l=[{value:"\u5B9A\u4E49\u5B8F\u79FB\u9664\u65B9\u6CD5",id:"\u5B9A\u4E49\u5B8F\u79FB\u9664\u65B9\u6CD5",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"c-cookbook",children:"C Cookbook"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/git/git/blob/master/banned.h",children:"git/banned.h"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4E0D\u63A8\u8350\u7528\u8FD9\u4E9B\u63A5\u53E3"}),"\n",(0,s.jsx)(n.li,{children:"\u56E0\u4E3A\u5BB9\u6613\u6709\u6B67\u4E49\uFF0C\u7ECF\u5E38\u8E29\u5751"}),"\n",(0,s.jsxs)(n.li,{children:["\u770B",(0,s.jsx)(n.a,{href:"https://github.com/git/git/commits/master/banned.h",children:"\u63D0\u4EA4\u5386\u53F2"}),"\u6709\u539F\u56E0\u8BF4\u660E"]}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"banned"}),(0,s.jsx)(n.th,{children:"alt"}),(0,s.jsx)(n.th,{children:"reason"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"ctime_r, asctime_r"}),(0,s.jsx)(n.td,{children:"strftime,strbuf_addftime"}),(0,s.jsx)(n.td,{children:"reentrant, but no check the buffer is long enough"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"gmtime,localtime,ctime,asctime"}),(0,s.jsx)(n.td,{}),(0,s.jsx)(n.td,{children:"return pointers to shared storage, not thread-safe"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"sprintf,vsprintf"}),(0,s.jsx)(n.td,{children:"strbuf,xstrfmt,xsnprintf"}),(0,s.jsx)(n.td,{children:"buffer overflow"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"strcpy,strcat,"}),(0,s.jsx)(n.td,{children:"strbuf,xstrfmt,xsnprintf"}),(0,s.jsx)(n.td,{children:"\u8D8A\u754C"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"strncpy"}),(0,s.jsx)(n.td,{children:"strlcpy,strbuf,xstrfmt,xsnprintf"}),(0,s.jsx)(n.td,{children:"NUL terminator"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"strncat"}),(0,s.jsx)(n.td,{}),(0,s.jsx)(n.td,{children:"quadratic behavior"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"\u5B9A\u4E49\u5B8F\u79FB\u9664\u65B9\u6CD5",children:"\u5B9A\u4E49\u5B8F\u79FB\u9664\u65B9\u6CD5"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-c",children:"#define	assert(x) (void)0\n"})})]})}function h(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return c},a:function(){return i}});var r=t(75271);let s={},o=r.createContext(s);function i(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);