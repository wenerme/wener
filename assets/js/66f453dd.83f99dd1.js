"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["62614"],{54344:function(e,t,r){r.r(t),r.d(t,{metadata:()=>n,contentTitle:()=>l,default:()=>d,assets:()=>o,toc:()=>a,frontMatter:()=>c});var n=JSON.parse('{"id":"service/forge/git/git-secret","title":"git-secret","description":"- sobolevn/git-secret","source":"@site/../notes/service/forge/git/git-secret.md","sourceDirName":"service/forge/git","slug":"/service/forge/git/secret","permalink":"/notes/service/forge/git/secret","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/git/git-secret.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1667318353000,"frontMatter":{"title":"git-secret"},"sidebar":"docs","previous":{"title":"Git Message","permalink":"/notes/service/forge/git/message"},"next":{"title":"Git Submodule","permalink":"/notes/service/forge/git/submodule"}}'),s=r("52676"),i=r("79938");let c={title:"git-secret"},l="git-secret",o={},a=[];function g(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"git-secret",children:"git-secret"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/sobolevn/git-secret",children:"sobolevn/git-secret"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"MIT, Shell"}),"\n",(0,s.jsx)(t.li,{children:"\u4F9D\u8D56: bash 3.2+, gawk 4+, git 1.8+, gpg 1.4-2.x, sha256sum 8.21+"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.li,{children:"\u9ED8\u8BA4 gpg"}),"\n",(0,s.jsx)(t.li,{children:"\u914D\u7F6E SECRETS_GPG_COMMAND \u53EF\u4F7F\u7528\u517C\u5BB9\u7684\u547D\u4EE4"}),"\n",(0,s.jsx)(t.li,{children:"\u5B58\u50A8\u4E8E .gitsecret/ - SECRETS_DIR"}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"brew install git-secret # macOS\n\ngit secret init # .gitsecret/\ngit secret tell -m\necho SECREY > secret.txt     # \u5E0C\u671B\u9690\u85CF\u7684\u5BC6\u94A5\u4FE1\u606F\necho secret.txt > .gitignore # \u907F\u514D git \u5904\u7406\ngit secret add secret.txt    # \u52A0\u5BC6\ngit secret hide              # \u9690\u85CF\nrm secret.txt                # \u5220\u9664\u539F\u59CB\ngit secret reveal            # \u6062\u590D\n"})})]})}function d(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(g,{...e})}):g(e)}},79938:function(e,t,r){r.d(t,{Z:function(){return l},a:function(){return c}});var n=r(75271);let s={},i=n.createContext(s);function c(e){let t=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);