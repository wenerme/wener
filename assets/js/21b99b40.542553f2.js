"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["29974"],{96364:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>s,default:()=>d,assets:()=>h,toc:()=>l,frontMatter:()=>c});var t=JSON.parse('{"id":"service/forge/git/git-branch-faq","title":"Git Branch FAQ","description":"\u5207\u6362\u5206\u652F\u4F46\u4E0D\u6361\u51FA\u6587\u4EF6","source":"@site/../notes/service/forge/git/git-branch-faq.md","sourceDirName":"service/forge/git","slug":"/service/forge/git/branch-faq","permalink":"/notes/service/forge/git/branch-faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/git/git-branch-faq.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1627915171000,"frontMatter":{"title":"Git Branch FAQ"},"sidebar":"docs","previous":{"title":"Git Awesome","permalink":"/notes/service/forge/git/awesome"},"next":{"title":"Git Branch","permalink":"/notes/service/forge/git/branch"}}'),a=r("52676"),i=r("79938");let c={title:"Git Branch FAQ"},s="Git Branch FAQ",h={},l=[{value:"\u5207\u6362\u5206\u652F\u4F46\u4E0D\u6361\u51FA\u6587\u4EF6",id:"\u5207\u6362\u5206\u652F\u4F46\u4E0D\u6361\u51FA\u6587\u4EF6",level:2},{value:"\u79FB\u9664\u5206\u652F",id:"\u79FB\u9664\u5206\u652F",level:2},{value:"\u5F00\u59CB\u7A7A\u7684\u65B0\u5206\u652F",id:"\u5F00\u59CB\u7A7A\u7684\u65B0\u5206\u652F",level:2},{value:"\u91CD\u7F6E\u5206\u652F",id:"\u91CD\u7F6E\u5206\u652F",level:2},{value:"\u5207\u6362\u5230\u8FDC\u7A0B\u5206\u652F",id:"\u5207\u6362\u5230\u8FDC\u7A0B\u5206\u652F",level:2},{value:"\u83B7\u53D6\u8FDC\u7A0B\u5206\u652F",id:"\u83B7\u53D6\u8FDC\u7A0B\u5206\u652F",level:2},{value:"\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F",id:"\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F",level:2},{value:"Rename branch",id:"rename-branch",level:2}];function o(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"git-branch-faq",children:"Git Branch FAQ"})}),"\n",(0,a.jsx)(n.h2,{id:"\u5207\u6362\u5206\u652F\u4F46\u4E0D\u6361\u51FA\u6587\u4EF6",children:"\u5207\u6362\u5206\u652F\u4F46\u4E0D\u6361\u51FA\u6587\u4EF6"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# \u6587\u4EF6\u53D8\u4E3A\u6682\u5B58\u72B6\u6001\ngit symbolic-ref HEAD refs/heads/\u5176\u4ED6\u5206\u652F\n# \u53EF\u4EE5\u53D6\u6D88\u6682\u5B58\ngit reset\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u79FB\u9664\u5206\u652F",children:"\u79FB\u9664\u5206\u652F"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"git branch -d the_local_branch"}),"\n",(0,a.jsx)(n.code,{children:"git push origin :the_remote_branch"}),"\n\u63D0\u4EA4\u65B0\u7684\u5206\u652F\n",(0,a.jsx)(n.code,{children:"git push --all"})]}),"\n",(0,a.jsx)(n.h2,{id:"\u5F00\u59CB\u7A7A\u7684\u65B0\u5206\u652F",children:"\u5F00\u59CB\u7A7A\u7684\u65B0\u5206\u652F"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"git checkout --orphan <branchname>\ngit rm --cached -r .\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u91CD\u7F6E\u5206\u652F",children:"\u91CD\u7F6E\u5206\u652F"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# \u5148\u5207\u5230\u975E master \u5206\u652F\ngit checkout -B temp\n\ngit branch -D master\ngit checkout --orphan master\ngit rm -rf *\n\necho '# My Project' > README.md\ngit add README.md\ngit commit -m 'initial commit'\n\ngit branch -D temp\n\ngit push --all -f\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u5207\u6362\u5230\u8FDC\u7A0B\u5206\u652F",children:"\u5207\u6362\u5230\u8FDC\u7A0B\u5206\u652F"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B\u6240\u6709\u5206\u652F\n# -r \u8FDC\u7A0B\ngit branch -a\n\ngit fetch origin\ngit checkout --track origin/3.12-stable\n\n# git fetch <remote> <rbranch>:<lbranch>\ngit fetch origin 3.12-stable:3.12-stable\ngit checkout 3.12-stable\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u83B7\u53D6\u8FDC\u7A0B\u5206\u652F",children:"\u83B7\u53D6\u8FDC\u7A0B\u5206\u652F"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"branch=\ngit ls-remote origin $branch\ngit fetch origin $branch:refs/remotes/$branch/$branch\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F",children:"\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# \u68C0\u51FA\u8FDC\u7A0B\u5206\u652F\ngit clone -b stable <URL>\n\n# \u6216\u68C0\u51FA\u540E\ngit fetch <remote> <rbranch>:<lbranch>\ngit checkout <lbranch>\n"})}),"\n",(0,a.jsx)(n.h2,{id:"rename-branch",children:"Rename branch"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# Rename old-branch-name to a non exists new-branch-name\ngit branch -m old-branch-name new-branch-name\n# Rename current branch to new-branch-name\ngit branch -m new-branch-name\n\n# Rename remote\ngit branch new-branch-name origin/old-branch-name\ngit push origin --set-upstream new-branch-name\ngit push origin :old-branch-name\n"})})]})}function d(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return s},a:function(){return c}});var t=r(75271);let a={},i=t.createContext(a);function c(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:c(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);