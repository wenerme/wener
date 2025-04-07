"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["7761"],{64418:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>r,default:()=>d,assets:()=>l,toc:()=>a,frontMatter:()=>s});var i=JSON.parse('{"id":"dev/chezmoi","title":"chezmoi","description":"- twpayne/chezmoi","source":"@site/../notes/dev/chezmoi.md","sourceDirName":"dev","slug":"/dev/chezmoi","permalink":"/notes/dev/chezmoi","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/chezmoi.md","tags":[{"inline":true,"label":"Golang","permalink":"/notes/tags/golang"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1727602505000,"frontMatter":{"title":"chezmoi","tags":["Golang"]},"sidebar":"docs","previous":{"title":"upx","permalink":"/notes/dev/build/upx"},"next":{"title":"Dapr Kubernetes","permalink":"/notes/dev/cloud/dapr-k8s"}}'),o=t("52676"),c=t("79938");let s={title:"chezmoi",tags:["Golang"]},r="chezmoi",l={},a=[];function h(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"chezmoi",children:"chezmoi"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/twpayne/chezmoi",children:"twpayne/chezmoi"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"MIT, Go"}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://www.chezmoi.io/comparison-table/",children:"https://www.chezmoi.io/comparison-table/"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:"~/.local/share/chezmoi"}),"\n",(0,o.jsxs)(n.li,{children:["~/.config/chezmoi/\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"chezmoi.{json,timl,taml,jsonc}"}),"\n",(0,o.jsx)(n.li,{children:"chezmoistate.boltdb"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"brew install chezmoi\n\n# \u4F7F\u7528\u73B0\u6709\u4ED3\u5E93\u521D\u59CB\u5316\nchezmoi init --source git@github.com:wenerme/dotfiles.git\nchezmoi apply --dry-run --verbose\nchezmoi apply\n\n# \u76F4\u63A5\u521D\u59CB\u5316\nchezmoi init # ~/.local/share/chezmoi\n\n# ~/.local/share/chezmoi/dot_bashrc\nchezmoi add ~/.bashrc\n\nchezmoi managed # \u67E5\u770B\u7BA1\u7406\u7684\u6587\u4EF6\nchezmoi status  # \u67E5\u770B\u72B6\u6001\nchezmoi re-add  # \u91CD\u65B0\u6DFB\u52A0 - \u6DFB\u52A0\u4FEE\u6539\u540E\u7684\u914D\u7F6E\nchezmoi cd      # cd ~/.local/share/chezmoi\n"})})]})}function d(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return r},a:function(){return s}});var i=t(75271);let o={},c=i.createContext(o);function s(e){let n=i.useContext(c);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);