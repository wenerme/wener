"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43264"],{18565:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>h,assets:()=>l,toc:()=>o,frontMatter:()=>r});var s=JSON.parse('{"id":"os/macos/keychian","title":"macOS Keychain","description":"- key","source":"@site/../notes/os/macos/keychian.md","sourceDirName":"os/macos","slug":"/os/macos/keychian","permalink":"/notes/os/macos/keychian","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/macos/keychian.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1706956646000,"frontMatter":{"title":"macOS Keychain"},"sidebar":"docs","previous":{"title":"iTerm2","permalink":"/notes/os/macos/iterm2"},"next":{"title":"launchd","permalink":"/notes/os/macos/launchd"}}'),i=t("52676"),c=t("79938");let r={title:"macOS Keychain"},a="Keychain",l={},o=[];function d(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"keychain",children:"Keychain"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# /usr/bin/security\n# /Library/Keychains/System.keychain\n# $HOME/Library/Keychains/login.keychain-db\nsecurity list-keychains\n\n# -d decrypt\nsecurity dump-keychain\n\n# DataGrip\nsecurity find-generic-password -s 'IntelliJ Platform DB \u2014 c0adc4b7-1cff-44f1-ac52-65d5a133f7bc'\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["key\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["cap\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"derive"}),"\n",(0,i.jsx)(n.li,{children:"sign"}),"\n",(0,i.jsx)(n.li,{children:"unwrap"}),"\n",(0,i.jsx)(n.li,{children:"verify"}),"\n",(0,i.jsx)(n.li,{children:"wrap"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["type\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"symmetric, public, private"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://apple.stackexchange.com/q/137250/103557",children:"https://apple.stackexchange.com/q/137250/103557"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return r}});var s=t(75271);let i={},c=s.createContext(i);function r(e){let n=s.useContext(c);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);