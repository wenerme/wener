"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["84278"],{29274:function(t,e,n){n.r(e),n.d(e,{metadata:()=>r,contentTitle:()=>o,default:()=>p,assets:()=>a,toc:()=>u,frontMatter:()=>l});var r=JSON.parse('{"id":"security/virustotal","title":"virustotal","description":"- https://www.virustotal.com/gui","source":"@site/../notes/security/virustotal.md","sourceDirName":"security","slug":"/security/virustotal","permalink":"/notes/security/virustotal","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/security/virustotal.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1668326649000,"frontMatter":{"title":"virustotal"},"sidebar":"docs","previous":{"title":"VeraCrypt","permalink":"/notes/security/veracrypt"},"next":{"title":"WAF","permalink":"/notes/security/web/waf"}}'),i=n("52676"),s=n("79938");let l={title:"virustotal"},o="virustotal",a={},u=[];function c(t){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"virustotal",children:"virustotal"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.virustotal.com/gui",children:"https://www.virustotal.com/gui"})}),"\n",(0,i.jsxs)(e.li,{children:["Free\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"4 lookups/\u5206\u949F"}),"\n",(0,i.jsx)(e.li,{children:"500 lookups/\u5929"}),"\n",(0,i.jsx)(e.li,{children:"15.50 K lookups/\u6708"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"Premium - $10,000/\u5E74"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"curl -v -X POST \\\n  --url 'https://www.virustotal.com/vtapi/v2/file/report' \\\n  -d apikey=$API_KEY \\\n  -d 'resource=$filehash'\n\ncurl -X POST \\\n  https://www.virustotal.com/vtapi/v2/file/scan \\\n  -F apikey=$API_KEY \\\n  -F file=@/path/to/file\n\ncurl -X POST \\\n  https://www.virustotal.com/vtapi/v2/file/rescan \\\n  -F apikey=$API_KEY \\\n  -F resource=$filehash\n\n# \u626B\u63CF\u7F51\u5740\ncurl -X POST \\\n  https://www.virustotal.com/vtapi/v2/url/scan \\\n  -F apikey=$API_KEY \\\n  -F url=https://wener.me\n\n# \u83B7\u53D6\u626B\u63CF\u7ED3\u679C\n# scan=1 \u5982\u679C\u6CA1\u6709\u5219\u626B\u63CF\ncurl -X POST \\\n  http://www.virustotal.com/vtapi/v2/url/report \\\n  -F apikey=$API_KEY \\\n  -F resource=https://wener.me \\\n  -F scan=1\n\n# \u57DF\u540D\u60C5\u51B5\ncurl -X GET \\\n  'http://www.virustotal.com/vtapi/v2/domain/report?domain=wener.me'\n# IP \u5730\u5740\u60C5\u51B5\ncurl -X GET \\\n  'http://www.virustotal.com/vtapi/v2/ip-address/report?ip=1.1.1.1&apikey=$API_KEY'\n# \u6DFB\u52A0\u8BC4\u8BBA\ncurl -X POST \\\n  https://www.virustotal.com/vtapi/v2/comments/put \\\n  -F apikey=$API_KEY \\\n  -F resource=https://evil-phishing-site.com/secured/login \\\n  -F 'comment=This is a phishing page'\n"})})]})}function p(t={}){let{wrapper:e}={...(0,s.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(c,{...t})}):c(t)}},79938:function(t,e,n){n.d(e,{Z:function(){return o},a:function(){return l}});var r=n(75271);let i={},s=r.createContext(i);function l(t){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:l(t.components),r.createElement(s.Provider,{value:e},t.children)}}}]);