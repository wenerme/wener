"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["90900"],{63828:function(e,n,i){i.r(n),i.d(n,{metadata:()=>s,contentTitle:()=>r,default:()=>a,assets:()=>h,toc:()=>c,frontMatter:()=>d});var s=JSON.parse('{"id":"web/dom/dom-faq","title":"DOM FAQ","description":"- FOUC - flash of unstyled content","source":"@site/../notes/web/dom/dom-faq.md","sourceDirName":"web/dom","slug":"/web/dom/faq","permalink":"/notes/web/dom/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dom/dom-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1737304142000,"frontMatter":{"title":"DOM FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"DOM Event","permalink":"/notes/web/dom/event"},"next":{"title":"\u7F16\u8F91\u5668","permalink":"/notes/web/editor/"}}'),l=i("52676"),t=i("79938");let d={title:"DOM FAQ",tags:["FAQ"]},r="DOM FAQ",h={},c=[{value:"size",id:"size",level:2},{value:"ShadowRoot rem &amp; font-size",id:"shadowroot-rem--font-size",level:2},{value:"ShadowRoot.mode",id:"shadowrootmode",level:2},{value:"shadow dom \u91CD\u7F6E host \u6837\u5F0F",id:"shadow-dom-\u91CD\u7F6E-host-\u6837\u5F0F",level:2},{value:"\u521D\u59CB\u5316 style",id:"\u521D\u59CB\u5316-style",level:2},{value:"a \u7684 download \u4E0D\u751F\u6548",id:"a-\u7684-download-\u4E0D\u751F\u6548",level:2},{value:"key vs code",id:"key-vs-code",level:2},{value:"\u5B57\u4F53\u68C0\u6D4B",id:"\u5B57\u4F53\u68C0\u6D4B",level:2},{value:"\u76D1\u542C URL \u53D8\u5316",id:"\u76D1\u542C-url-\u53D8\u5316",level:2},{value:"The target origin provided does not match the recipient window&#39;s origin",id:"the-target-origin-provided-does-not-match-the-recipient-windows-origin",level:2},{value:"idle",id:"idle",level:2},{value:"tabIndex",id:"tabindex",level:2},{value:"HTML attributes vs DOM properties",id:"html-attributes-vs-dom-properties",level:2},{value:"IME",id:"ime",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"dom-faq",children:"DOM FAQ"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["FOUC - flash of unstyled content\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5E94\u7528 style \u65F6"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://w3c.github.io/uievents/tools/main.html",children:"UI Events Testing Tools"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Comparison of Event Targets\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets",children:"https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"size",children:"size"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"width, height"}),"\n",(0,l.jsx)(n.li,{children:"clientWidth, clientHeight"}),"\n",(0,l.jsxs)(n.li,{children:["offsetWidth, offsetHeight\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"size+border+padding"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["scrollWidth, scrollHeight\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"scrollbarWidth = getComputedStyle().width + getComputedStyle().paddingLeft + getComputedStyle().paddingRight - clientWidth"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5728 chrome \u4E0B\u53EF\u80FD\u4E0D\u51C6\u786E"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"element.getBoundingClientRect()"})}),"\n",(0,l.jsxs)(n.li,{children:["naturalWidth, naturalHeight\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u56FE\u7247\u7684\u539F\u59CB\u5927\u5C0F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://stackoverflow.com/questions/21064101",children:"https://stackoverflow.com/questions/21064101"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"shadowroot-rem--font-size",children:"ShadowRoot rem & font-size"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u65E0\u6CD5\u8986\u76D6"}),"\n",(0,l.jsx)(n.li,{children:"\u5BFC\u81F4 rem \u53D7\u5916\u90E8\u5F71\u54CD - html font-size"}),"\n",(0,l.jsx)(n.li,{children:"\u53EF\u8003\u8651\u4F7F\u7528 em"}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/",children:"Why is my Web Component inheriting styles?"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/tailwindlabs/tailwindcss/issues/1232#issuecomment-754804258",children:"\u4FEE\u6539 tailwindcss \u4F7F\u7528 px \u800C\u4E0D\u662F rem"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7",children:"defaultConfig.stub.js"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"shadowrootmode",children:"ShadowRoot.mode"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["open\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u8BB0\u5F55 element.shadowRoot"}),"\n",(0,l.jsx)(n.li,{children:"\u53D7\u5916\u90E8 style \u5F71\u54CD"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["closed\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4E0D\u4F1A\u8BB0\u5F55 root"}),"\n",(0,l.jsx)(n.li,{children:"\u5982\u6709\u9700\u8981\u9700\u8981\u81EA\u5DF1\u4F7F\u7528 WeakMap \u8DDF\u8E2A\u5F15\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"shadow-dom-\u91CD\u7F6E-host-\u6837\u5F0F",children:"shadow dom \u91CD\u7F6E host \u6837\u5F0F"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-css",children:":host {\n  all: initial;\n}\n"})}),"\n",(0,l.jsx)(n.h2,{id:"\u521D\u59CB\u5316-style",children:"\u521D\u59CB\u5316 style"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"// \u65B0\u7684\u65B9\u5F0F - 2019, Chrome 73+\nvar sheet = new CSSStyleSheet();\nsheet.replaceSync(`.color { color: pink }`);\nhost.shadowRoot.adoptedStyleSheets = [sheet];\n\n// \u65E7\u7684\u65B9\u5F0F\nlet style = document.createElement('style');\nstyle.textContent = css;\ncontainer.appendChild(style);\n"})}),"\n",(0,l.jsx)(n.h2,{id:"a-\u7684-download-\u4E0D\u751F\u6548",children:"a \u7684 download \u4E0D\u751F\u6548"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5982\u679C HTTP \u6709 Content-Disposition \u5934 \u5219\u4F18\u5148"}),"\n",(0,l.jsx)(n.li,{children:"\u975E same-origin download \u5C5E\u6027\u65E0\u6548"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"\u53EF\u4EE5\u9009\u62E9\u9884\u5148\u4E0B\u8F7D base64 \u7136\u540E\u4E0B\u8F7D"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'\x3c!-- same orgin --\x3e\n<a href="/wp-content/uploads/file.mp4" download="file.mp4">\n  \x3c!-- pre-download --\x3e\n  <a download href="data:application/octet-stream;base64,PD94ANDSOON">Download Me</a></a\n>\n'})}),"\n",(0,l.jsx)(n.h2,{id:"key-vs-code",children:"key vs code"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["key - \u5B9E\u9645\u8F93\u5165\u5185\u5BB9\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u7528\u4E8E\u6587\u672C\u8F93\u5165"}),"\n",(0,l.jsx)(n.li,{children:"\u53D7\u952E\u76D8\u5E03\u5C40\u5F71\u54CD"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["code - \u8F93\u5165\u7684\u7269\u7406\u5E03\u5C40\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u7528\u4E8E\u64CD\u4F5C\u63A7\u5236"}),"\n",(0,l.jsx)(n.li,{children:"\u4E0D\u53D7\u952E\u76D8\u5E03\u5C40\u5F71\u54CD"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://w3c.github.io/uievents/tools/key-event-viewer.html",children:"Keyboard Event Viewer"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://developers.google.com/web/updates/2016/04/keyboardevent-keys-codes",children:"What\u2019s New with KeyboardEvents? Keys and Codes!"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"key"}),(0,l.jsx)(n.th,{children:"code"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"a"}),(0,l.jsx)(n.td,{children:"KeyA"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"A"}),(0,l.jsx)(n.td,{children:"KeyA"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"1"}),(0,l.jsx)(n.td,{children:"Digit1"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"!"})}),(0,l.jsx)(n.td,{children:"Digit1"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"-"})}),(0,l.jsx)(n.td,{children:"Minus"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"Enter"}),(0,l.jsx)(n.td,{children:"Enter"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"Shift"}),(0,l.jsx)(n.td,{children:"ShiftLeft"})]})]})]}),"\n",(0,l.jsx)(n.h2,{id:"\u5B57\u4F53\u68C0\u6D4B",children:"\u5B57\u4F53\u68C0\u6D4B"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"document.fonts.check('12px ui-serif');\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Safari \u56E0\u4E3A\u9690\u79C1\u539F\u56E0\uFF0C\u4E0D\u652F\u6301\uFF0C\u8FD4\u56DE\u9519\u8BEF\u7ED3\u679C"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u76D1\u542C-url-\u53D8\u5316",children:"\u76D1\u542C URL \u53D8\u5316"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u76EE\u524D\u65E0\u6CD5\u53EF\u9760\u7684\u68C0\u6D4B url \u53D8\u5316"}),"\n",(0,l.jsxs)(n.li,{children:["patch history \u7684\u65B9\u5F0F ",(0,l.jsx)(n.a,{href:"https://github.com/streamich/react-use/blob/master/src/useLocation.ts",children:"https://github.com/streamich/react-use/blob/master/src/useLocation.ts"})]}),"\n",(0,l.jsx)(n.li,{children:"observe \u4EFB\u4F55\u4FEE\u6539\u7136\u540E\u68C0\u6D4B"}),"\n",(0,l.jsx)(n.li,{children:"Chrome 102+ window.navigation \u63A5\u53E3"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"let last = document.location.href;\nconst observer = new MutationObserver(function (mutations) {\n  mutations.forEach(function (mutation) {\n    if (last !== document.location.href) {\n      last = document.location.href;\n      /* Changed */\n    }\n  });\n});\n\nobserver.observe(document.querySelector('body'), {\n  childList: true,\n  subtree: true,\n});\n\n// Chrome 102+\nnavigation.addEventListener('navigate', (e) => {\n  console.log(`navigate ->`, e.destination.url);\n});\n"})}),"\n",(0,l.jsx)(n.h2,{id:"the-target-origin-provided-does-not-match-the-recipient-windows-origin",children:"The target origin provided does not match the recipient window's origin"}),"\n",(0,l.jsx)(n.h2,{id:"idle",children:"idle"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector",children:"IdleDetector"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"API"}),"\n",(0,l.jsx)(n.li,{children:"\u9700\u8981\u6743\u9650"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://web.dev/idle-detection/",children:"Idle Detection"})}),"\n",(0,l.jsx)(n.li,{children:"Chromium 94+"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://stackoverflow.com/a/10126042/1870054",children:"https://stackoverflow.com/a/10126042/1870054"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u901A\u8FC7\u4E8B\u4EF6\u68C0\u6D4B"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"tabindex",children:"tabIndex"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["tabIndex=0\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Tabbable and focusable"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["tabIndex=-1\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Not tabbable, but focusable"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"html-attributes-vs-dom-properties",children:"HTML attributes vs DOM properties"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["HTML attributes\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u53EF\u4EE5\u5E8F\u5217\u5316 - \u5728 HTML \u91CC\u80FD\u8868\u73B0\u51FA\u6765"}),"\n",(0,l.jsx)(n.li,{children:"\u6240\u6709\u7C7B\u578B\u90FD\u662F string - \u56E0\u4E3A\u5E8F\u5217\u5316"}),"\n",(0,l.jsx)(n.li,{children:"\u5927\u5C0F\u5199\u65E0\u5173"}),"\n",(0,l.jsxs)(n.li,{children:["\u8BBF\u95EE\u65B9\u5F0F\u4E0D\u540C\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"div.getAttributeNames()"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"div.getAttribute('id')"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Reflection - property \u53EF\u80FD\u4F1A\u6620\u5C04\u4E3A attribute\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"crossOrigin"})," -> ",(0,l.jsx)(n.code,{children:"crossorigin"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"ariaLabel"})," -> ",(0,l.jsx)(n.code,{children:"aria-label"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"className"})," -> ",(0,l.jsx)(n.code,{children:"class"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"htmlFor"})," -> ",(0,l.jsx)(n.code,{children:"for"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u26A0\uFE0F \u6CE8\u610F ",(0,l.jsx)(n.code,{children:"defaultValue"})," -> ",(0,l.jsx)(n.code,{children:"value"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"value"})," property \u6CA1\u6709\u5BF9\u5E94\u7684 attribute"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["DOM properties\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u5982\u679C\u4E00\u4E2A property \u53CD\u6620\u4E00\u4E2A attribute\uFF0C\u90A3\u4E48 attribute \u4E3A property \u7684 source \u503C\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4E5F\u5C31\u662F\u8BF4\u4EE5 attribute \u4E3A\u51C6"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u6709\u521D\u59CB\u503C\u548C\u6821\u9A8C\u903B\u8F91"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://jakearchibald.com/2024/attributes-vs-properties/",children:"https://jakearchibald.com/2024/attributes-vs-properties/"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"ime",children:"IME"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u4E8B\u4EF6\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"compositionstart"}),"\n",(0,l.jsx)(n.li,{children:"compositionupdate"}),"\n",(0,l.jsx)(n.li,{children:"compositionend"}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return r},a:function(){return d}});var s=i(75271);let l={},t=s.createContext(l);function d(e){let n=s.useContext(t);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:d(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);