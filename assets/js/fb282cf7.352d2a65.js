"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["98472"],{22571:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>i,default:()=>a,assets:()=>c,toc:()=>d,frontMatter:()=>l});var r=JSON.parse('{"id":"web/browser/chrome/chrome-headless","title":"Headless","description":"- DevToolsActivePort","source":"@site/../notes/web/browser/chrome/chrome-headless.md","sourceDirName":"web/browser/chrome","slug":"/web/browser/chrome/headless","permalink":"/notes/web/browser/chrome/headless","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/browser/chrome/chrome-headless.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1714210316000,"frontMatter":{"title":"Headless"},"sidebar":"docs","previous":{"title":"Chrome for testing","permalink":"/notes/web/browser/chrome/for-testing"},"next":{"title":"Chrome Insight","permalink":"/notes/web/browser/chrome/inside"}}'),t=s("52676"),o=s("79938");let l={title:"Headless"},i="Chrome Headless",c={},d=[{value:"playwright vs puppeteer",id:"playwright-vs-puppeteer",level:2},{value:"New Headless",id:"new-headless",level:2},{value:"Debugging connection was closed. Reason: WebSocket disconnected",id:"debugging-connection-was-closed-reason-websocket-disconnected",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"chrome-headless",children:"Chrome Headless"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["DevToolsActivePort\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u7B2C\u4E00\u884C\u4E3A\u7AEF\u53E3"}),"\n",(0,t.jsxs)(n.li,{children:["\u7B2C\u4E8C\u884C\u4E3A \u8DEF\u5F84 ",(0,t.jsx)(n.code,{children:"/devtools/browser/UUID"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"chrome --headless --remote-debugging-port=9222 --disable-gpu --no-sandbox\n\n# /devtools/inspector.html?ws=127.0.0.1:9222/devtools/page/6BD1FB9A428F479750451F5E652F544F\ncurl http://localhost:9222/json\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"--enable-blink-features=SomeNewFeature,SomeOtherNewFeature\n--disable-blink-features=SomeOldFeature\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"playwright-vs-puppeteer",children:"playwright vs puppeteer"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://blog.logrocket.com/playwright-vs-puppeteer/",children:"https://blog.logrocket.com/playwright-vs-puppeteer/"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"new-headless",children:"New Headless"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Chrome 112+"}),"\n",(0,t.jsxs)(n.li,{children:["\u652F\u6301\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"--dump-dom"}),"\n",(0,t.jsx)(n.li,{children:"--screenshot --window-size=412,892"}),"\n",(0,t.jsx)(n.li,{children:"--print-to-pdf --no-pdf-header-footer"}),"\n",(0,t.jsx)(n.li,{children:"--timeout=5000"}),"\n",(0,t.jsxs)(n.li,{children:["--virtual-time-budget\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u865A\u62DF\u65F6\u95F4 - setTimeout/setInterval"}),"\n",(0,t.jsx)(n.li,{children:"\u4EE5\u5C3D\u53EF\u80FD\u5FEB\u7684\u901F\u5EA6\u6267\u884C\u4EFB\u610F\u7F51\u9875\u4EE3\u7801\uFF0C\u540C\u65F6\u4F7F\u7F51\u9875\u76F8\u4FE1\u65F6\u95F4\u5B9E\u9645\u4E0A\u662F\u8FC7\u53BB\u7684\u65F6\u95F4\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developer.chrome.com/docs/chromium/new-headless",children:"https://developer.chrome.com/docs/chromium/new-headless"})}),"\n",(0,t.jsxs)(n.li,{children:["\u5B9E\u65F6\u89C6\u56FE\u76EE\u524D\u4EC5\u5B9E\u73B0\u89E6\u6478\u4E8B\u4EF6\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://bugs.chromium.org/p/chromium/issues/detail?id=1410433",children:"https://bugs.chromium.org/p/chromium/issues/detail?id=1410433"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"debugging-connection-was-closed-reason-websocket-disconnected",children:"Debugging connection was closed. Reason: WebSocket disconnected"})]})}function a(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return i},a:function(){return l}});var r=s(75271);let t={},o=r.createContext(t);function l(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);