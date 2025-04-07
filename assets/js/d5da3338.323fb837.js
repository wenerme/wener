"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["99293"],{98082:function(t,e,n){n.r(e),n.d(e,{metadata:()=>r,contentTitle:()=>c,default:()=>m,assets:()=>a,toc:()=>i,frontMatter:()=>o});var r=JSON.parse('{"id":"platform/vultr","title":"vultr","description":"- https://www.vultr.com/vultr-vs-linode/","source":"@site/../notes/platform/vultr.md","sourceDirName":"platform","slug":"/platform/vultr","permalink":"/notes/platform/vultr","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/platform/vultr.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680629704000,"frontMatter":{"title":"vultr"},"sidebar":"docs","previous":{"title":"\u706B\u5C71\u5F15\u64CE","permalink":"/notes/platform/volcengine"},"next":{"title":"WeChat","permalink":"/notes/platform/wechat/"}}'),l=n("52676"),s=n("79938");let o={title:"vultr"},c="vultr",a={},i=[{value:"Regions",id:"regions",level:2}];function u(t){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...t.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"vultr",children:"vultr"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.vultr.com/vultr-vs-linode/",children:"https://www.vultr.com/vultr-vs-linode/"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"regions",children:"Regions"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'cat << EOF > curl-format.txt\n     time_namelookup:  %{time_namelookup}s\\n\n        time_connect:  %{time_connect}s\\n\n     time_appconnect:  %{time_appconnect}s\\n\n    time_pretransfer:  %{time_pretransfer}s\\n\n       time_redirect:  %{time_redirect}s\\n\n  time_starttransfer:  %{time_starttransfer}s\\n\n      speed_download:  %{speed_download}s\\n\n                      ----------\\n\n          time_total:  %{time_total}s\\n\nEOF\n\n# -r -10000000\ncurl -o /dev/null -w "@curl-format.txt" https://sgp-ping.vultr.com/vultr.com.100MB.bin > sgp.txt\ncurl -o /dev/null -w "@curl-format.txt" https://sel-kor-ping.vultr.com/vultr.com.100MB.bin > sel-kor.txt\ncurl -o /dev/null -w "@curl-format.txt" https://bom-in-ping.vultr.com/vultr.com.100MB.bin > bom-in.txt\ntime curl -o /dev/null -w "@curl-format.txt" https://hnd-jp-ping.vultr.com/vultr.com.100MB.bin > hnd-jp.txt\ntime curl -o /dev/null -w "@curl-format.txt" https://osk-jp-ping.vultr.com/vultr.com.100MB.bin > osk-jp.txt\ntime curl -o /dev/null -w "@curl-format.txt" https://lax-ca-us-ping.vultr.com/vultr.com.100MB.bin > lax-ca-us.txt\ntime curl -o /dev/null -w "@curl-format.txt" https://sjo-ca-us-ping.vultr.com/vultr.com.100MB.bin > lax-ca-us.txt\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.vultr.com/features/datacenter-locations/",children:"https://www.vultr.com/features/datacenter-locations/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"Array.from(new Set($$('[data-category]').map(v=>v.href))).sort()"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"Array.from(new Set($$('[data-category]').map(v=>v.href))).sort().map(v=>new URL(v).hostname).join(' ')"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.cloudping.cloud/vultr",children:"https://www.cloudping.cloud/vultr"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://cloudpingtest.com/vultr",children:"https://cloudpingtest.com/vultr"})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"fping -ac 60 {ams-nl,blr-in,bom-in,del-in,fl-us,fra-de,ga-us,hnd-jp,hon-hi-us,il-us,jnb-za,lax-ca-us,lon-gb,mad-es,mel-au,mex-mx,nj-us,osk-jp,par-fr,sao-br,scl-cl,sel-kor,sgp,sjo-ca-us,sto-se,syd-au,tor-ca,tx-us,wa-us,waw-pl}-ping.vultr.com\n"})})]})}function m(t={}){let{wrapper:e}={...(0,s.a)(),...t.components};return e?(0,l.jsx)(e,{...t,children:(0,l.jsx)(u,{...t})}):u(t)}},79938:function(t,e,n){n.d(e,{Z:function(){return c},a:function(){return o}});var r=n(75271);let l={},s=r.createContext(l);function o(t){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(l):t.components||l:o(t.components),r.createElement(s.Provider,{value:e},t.children)}}}]);