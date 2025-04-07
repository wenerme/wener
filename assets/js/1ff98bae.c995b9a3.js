"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["27916"],{67739:function(e,t,n){n.r(t),n.d(t,{metadata:()=>i,contentTitle:()=>a,default:()=>m,assets:()=>c,toc:()=>u,frontMatter:()=>l});var i=JSON.parse('{"id":"culture/game/luanti","title":"Luanti","description":"- luanti-org/luanti","source":"@site/../notes/culture/game/luanti.md","sourceDirName":"culture/game","slug":"/culture/game/luanti","permalink":"/notes/culture/game/luanti","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/culture/game/luanti.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1743997463000,"frontMatter":{"title":"Luanti"},"sidebar":"docs","previous":{"title":"Ingress","permalink":"/notes/culture/game/ingress"},"next":{"title":"\u5C0F\u59D0\u724C","permalink":"/notes/culture/game/maid-card"}}'),s=n("52676"),r=n("79938");let l={title:"Luanti"},a="Luanti",c={},u=[{value:"Games",id:"games",level:2}];function h(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"luanti",children:"Luanti"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/luanti-org/luanti",children:"luanti-org/luanti"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"LGPLv2.1, C++, Lua"}),"\n",(0,s.jsx)(t.li,{children:"minetest -> Luanti"}),"\n",(0,s.jsxs)(t.li,{children:["\u7531\u4E8E (L)GPL License \u539F\u56E0\uFF0C\u6CA1\u6709 iOS/iPad \u7248\u672C\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/minetest/minetest/issues/12176",children:"https://github.com/minetest/minetest/issues/12176"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/MultiCraft/MultiCraft",children:"MultiCraft/MultiCraft"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"\u57FA\u4E8E Minetest"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"user/minetest.conf"}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"mkdir data conf\nchown -R 30000 data conf\n# https://github.com/minetest/minetest/blob/master/doc/docker_server.md\n# https://github.com/minetest/minetest/pkgs/container/minetest\ndocker run -d \\\n  -p 30000:30000/udp \\\n  -v $PWD/minetest/data:/var/lib/minetest \\\n  -v $PWD/minetest/conf:/etc/minetest \\\n  --name minetest ghcr.io/minetest/minetest\n"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/minetest/minetest/blob/master/minetest.conf.example",children:"https://github.com/minetest/minetest/blob/master/minetest.conf.example"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://wiki.minetest.net/minetest.conf",children:"https://wiki.minetest.net/minetest.conf"})}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"games",children:"Games"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"minetestserver --gameid list\n"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:'STATIC_SHAREDIR="/usr/local/share/minetest"'}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://content.minetest.net/",children:"https://content.minetest.net/"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://wiki.minetest.net/Games",children:"https://wiki.minetest.net/Games"})}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return l}});var i=n(75271);let s={},r=i.createContext(s);function l(e){let t=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);