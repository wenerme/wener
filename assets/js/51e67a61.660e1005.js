"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["17911"],{97229:function(e,s,n){n.r(s),n.d(s,{metadata:()=>t,contentTitle:()=>l,default:()=>p,assets:()=>c,toc:()=>d,frontMatter:()=>a});var t=JSON.parse('{"id":"voip/asterisk/asterisk-debian","title":"Asterisk Debian","description":"- Why ?","source":"@site/../notes/voip/asterisk/asterisk-debian.md","sourceDirName":"voip/asterisk","slug":"/voip/asterisk/debian","permalink":"/notes/voip/asterisk/debian","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/voip/asterisk/asterisk-debian.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1622434864000,"frontMatter":{"title":"Asterisk Debian"},"sidebar":"docs","previous":{"title":"Asterisk \u914D\u7F6E","permalink":"/notes/voip/asterisk/conf"},"next":{"title":"Asterisk \u6743\u5A01\u6307\u5357,\u7B2C\u56DB\u7248","permalink":"/notes/voip/asterisk/the-definitive-guide-4th"}}'),i=n("52676"),r=n("79938");let a={title:"Asterisk Debian"},l="Asterisk Debian",c={},d=[{value:"\u6E90\u7801\u5B89\u88C5",id:"\u6E90\u7801\u5B89\u88C5",level:2}];function o(e){let s={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"asterisk-debian",children:"Asterisk Debian"})}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Why ?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Asterisk \u5BF9 AlpineLinux musl \u517C\u5BB9\u4E0D\u597D - \u5076\u5C14\u4F1A\u51FA\u73B0 segfault"}),"\n",(0,i.jsxs)(s.li,{children:["debian glibc, \u5305\u6301\u7EED\u7EF4\u62A4\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"\u7F3A\u70B9 - \u4E0D\u662F\u6700\u65B0 LTS, debian 10 \u548C 11 \u90FD\u662F asterisk 16"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["debian asterisk ",(0,i.jsx)(s.a,{href:"https://tracker.debian.org/pkg/asterisk",children:"tracker"})]}),"\n",(0,i.jsxs)(s.li,{children:["packages ",(0,i.jsx)(s.a,{href:"https://packages.debian.org/search?keywords=asterisk",children:"asterisk"})]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"\u6E90\u7801\u5B89\u88C5",children:"\u6E90\u7801\u5B89\u88C5"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"apt update && apt upgrade\napt install gcc g++ make patch libedit-dev uuid-dev libxml2-dev libsqlite3-dev libssl-dev\ncd /usr/src/ && wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz\ntar -xzf asterisk-18.*\ncd asterisk-18.*\n\n# contrib \u53EF\u9009\n# \u62C9\u53D6 res_mp3 \u6E90\u7801\n# contrib/scripts/get_mp3_source.sh\n# contrib/scripts/install_prereq install\n\n./configure --with-jansson-bundled\nmake menuselect\n\nmake && make all && make install\n# \u53EF\u9009\nmake samples\nmake progdocs\n\n# init \u811A\u672C\nmake config\n\nsystemctl start asterisk\nsystemctl enable asterisk\n\nasterisk -rvvv\n"})})]})}function p(e={}){let{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},79938:function(e,s,n){n.d(s,{Z:function(){return l},a:function(){return a}});var t=n(75271);let i={},r=t.createContext(i);function a(e){let s=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);