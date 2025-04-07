"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["57984"],{23087:function(e,t,r){r.r(t),r.d(t,{metadata:()=>n,contentTitle:()=>a,default:()=>u,assets:()=>l,toc:()=>c,frontMatter:()=>i});var n=JSON.parse('{"id":"ai/service/openrouter","title":"openrouter","description":"- https://openrouter.ai/models","source":"@site/../notes/ai/service/openrouter.md","sourceDirName":"ai/service","slug":"/ai/service/openrouter","permalink":"/notes/ai/service/openrouter","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/service/openrouter.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1739157197000,"frontMatter":{"title":"openrouter"},"sidebar":"docs","previous":{"title":"ChatGPT","permalink":"/notes/ai/service/openai/chatgpt"},"next":{"title":"\u89C6\u89C9","permalink":"/notes/ai/vision/"}}'),o=r("52676"),s=r("79938");let i={title:"openrouter"},a="openrouter",l={},c=[];function p(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"openrouter",children:"openrouter"})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://openrouter.ai/models",children:"https://openrouter.ai/models"})}),"\n"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'curl https://openrouter.ai/api/v1/models\n\n TOKEN=\ncurl -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/auth/key\n\ntime curl -sf -X POST -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/chat/completions \\\n  --json \'{"model":"deepseek/deepseek-r1:free","prompt":"Hello"}\' | jq\n\ncurl -sf -X POST -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/chat/completions \\\n  --json \'{"model":"deepseek/deepseek-r1:free","messages":[{"role":"user","content":"What is the meaning of life?"}]}\' | jq\n'})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"HTTP-Referer \u7AD9\u70B9 URL"}),"\n",(0,o.jsx)(t.li,{children:"X-Title"}),"\n",(0,o.jsxs)(t.li,{children:["Search\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://openrouter.ai/docs/web-search",children:"https://openrouter.ai/docs/web-search"})}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},79938:function(e,t,r){r.d(t,{Z:function(){return a},a:function(){return i}});var n=r(75271);let o={},s=n.createContext(o);function i(e){let t=n.useContext(s);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);