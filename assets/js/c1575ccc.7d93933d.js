"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["58931"],{25437:function(e,n,i){i.r(n),i.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>h,assets:()=>o,toc:()=>d,frontMatter:()=>l});var t=JSON.parse('{"id":"service/forge/git/gitflow","title":"gitflow","description":"- petervanderdoes/gitflow-avh","source":"@site/../notes/service/forge/git/gitflow.md","sourceDirName":"service/forge/git","slug":"/service/forge/git/gitflow","permalink":"/notes/service/forge/git/gitflow","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/git/gitflow.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1682315301000,"frontMatter":{"title":"gitflow"},"sidebar":"docs","previous":{"title":"gitconfig","permalink":"/notes/service/forge/git/gitconfig"},"next":{"title":".gitignore","permalink":"/notes/service/forge/git/gitignore"}}'),r=i("52676"),s=i("79938");let l={title:"gitflow"},c="gitflow",o={},d=[{value:"standard",id:"standard",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",mermaid:"mermaid",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"gitflow",children:"gitflow"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/petervanderdoes/gitflow-avh",children:"petervanderdoes/gitflow-avh"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"2019 \u505C\u6B62\u7EF4\u62A4"}),"\n",(0,r.jsx)(n.li,{children:"a collection of Git extensions to provide high-level repository operations for Vincent Driessen's branching model."}),"\n",(0,r.jsx)(n.li,{children:"adds more functionality to the existing git-flow and several of the internal commands have been rewritten to speed up the software."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/nvie/gitflow",children:"nvie/gitflow"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"2012 \u505C\u6B62\u7EF4\u62A4"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://nvie.com/posts/a-successful-git-branching-model",children:"A successful Git branching model"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow",children:"git-flow \u5DE5\u4F5C\u6D41\u7A0B"})}),"\n",(0,r.jsxs)(n.li,{children:["branches\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"bugfix hotfix release feature support"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["actions\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"delete finish list publish rename start track"}),"\n",(0,r.jsx)(n.li,{children:"rebase"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew install git-flow-avh\n\ngit flow init -d\ngit push --set-upstream origin develop\n\ngit checkout develop\ngit flow release start v2021.1.1\ngit flow release finish v2021.1.1\ngit push --tags\n"})}),"\n",(0,r.jsx)(n.h2,{id:"standard",children:"standard"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u5355\u5206\u652F - GitHub flow\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"master"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u529F\u80FD\u5206\u652F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["master, ",(0,r.jsx)(n.code,{children:"feature/*"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"feature/*"})," -> master"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["gitflow\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["master, develop, ",(0,r.jsx)(n.code,{children:"feature/*"}),", ",(0,r.jsx)(n.code,{children:"release/*"}),",",(0,r.jsx)(n.code,{children:"hotfix/*"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"release/*"}),", ",(0,r.jsx)(n.code,{children:"hotfix/*"})," -> master"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"feature/*"}),", ",(0,r.jsx)(n.code,{children:"release/*"}),", ",(0,r.jsx)(n.code,{children:"hotfix/*"})," -> develop"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["GitLab\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["master, ",(0,r.jsx)(n.code,{children:"feature/*"}),", ",(0,r.jsx)(n.code,{children:"*-stable"}),", ",(0,r.jsx)(n.code,{children:"env/*"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"feature/*"})," -> master"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.mermaid,{value:'---\ntitle: GitFlow\n---\ngitGraph\n   commit id: "\u521D\u59CB\u5316"\n   commit id: "\u57FA\u7840\u4E3B\u7EBF"\n   branch develop\n   commit id: "\u57FA\u7840\u529F\u80FD"\n   branch feature/a\n\n   checkout feature/a\n   commit id: "\u529F\u80FD A"\n   checkout develop\n   merge feature/a\n   commit id: "Merge A"\n\n   branch release/v1\n   checkout release/v1\n   commit id: "V1"\n   checkout develop\n   merge release/v1\n   checkout main\n   merge release/v1\n   commit id: "v1"\n\n   checkout main\n   branch hotfix/x\n   commit id: "fix x"\n   checkout main\n   merge hotfix/x\n   checkout develop\n   merge hotfix/x'}),"\n",(0,r.jsx)(n.mermaid,{value:'---\ntitle: GitLab\n---\ngitGraph\n   commit id: "\u521D\u59CB\u5316"\n   commit id: "\u57FA\u7840\u4E3B\u7EBF"\n   branch develop\n   commit id: "\u57FA\u7840\u529F\u80FD"\n   branch feature/a\n\n   checkout feature/a\n   commit id: "\u529F\u80FD A"\n   checkout develop\n   merge feature/a\n   commit id: "Merge A"\n\n   branch env/staging\n   commit\n   commit id: "fixing A"\n   branch env/pre-prod\n   commit id: "v1"\n   branch env/production\n   commit'}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://docs.github.com/en/get-started/quickstart/github-flow",children:"https://docs.github.com/en/get-started/quickstart/github-flow"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"frequently deploying"}),"\n",(0,r.jsx)(n.li,{children:"minimize the amount of unreleased code"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://docs.gitlab.com/ee/topics/gitlab_flow.html",children:"https://docs.gitlab.com/ee/topics/gitlab_flow.html"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Feature-driven_development",children:"https://en.wikipedia.org/wiki/Feature-driven_development"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://martinfowler.com/bliki/FeatureBranch.html",children:"https://martinfowler.com/bliki/FeatureBranch.html"})}),"\n",(0,r.jsxs)(n.li,{children:["\u64CD\u4F5C\u89C4\u8303\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"rebase"}),"\n",(0,r.jsx)(n.li,{children:"squash"}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return l}});var t=i(75271);let r={},s=t.createContext(r);function l(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);