"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36903"],{93147:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>l,default:()=>j,assets:()=>c,toc:()=>h,frontMatter:()=>d});var s=JSON.parse('{"id":"service/forge/git/git-message","title":"Git Message","description":"Semantic Commit","source":"@site/../notes/service/forge/git/git-message.md","sourceDirName":"service/forge/git","slug":"/service/forge/git/message","permalink":"/notes/service/forge/git/message","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/git/git-message.md","tags":[{"inline":true,"label":"Guideline","permalink":"/notes/tags/guideline"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1734410758000,"frontMatter":{"tags":["Guideline"]},"sidebar":"docs","previous":{"title":"Git Internal","permalink":"/notes/service/forge/git/internal"},"next":{"title":"git-secret","permalink":"/notes/service/forge/git/secret"}}'),r=i("52676"),t=i("79938");let d={tags:["Guideline"]},l="Git Message",c={},h=[{value:"Semantic Commit",id:"semantic-commit",level:2},{value:"Message",id:"message",level:2},{value:"\u7279\u6B8A",id:"\u7279\u6B8A",level:2},{value:"Issue Labels",id:"issue-labels",level:2},{value:"\u53C2\u8003",id:"\u53C2\u8003",level:2}];function x(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"git-message",children:"Git Message"})}),"\n",(0,r.jsx)(e.h2,{id:"semantic-commit",children:"Semantic Commit"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"<type>[optional scope]: <description>\n\n[optional body]\n\n[optional footer(s)]\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"<type>(<scope>): <subject>\n<BLANK LINE>\n<body>\n<BLANK LINE>\n<footer>\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["type\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"fix: \u4FEE\u590D bug - \u4E3A\u7528\u6237\u4FEE\u590D\u7684\u9519\u8BEF\uFF0C\u800C\u4E0D\u662F\u6784\u5EFA\u811A\u672C\u7684\u4FEE\u590D\u3002\u6B64\u7C7B\u63D0\u4EA4\u5C06\u89E6\u53D1\u8865\u4E01\u7248\u672C\u7684\u53D1\u5E03\u3002"}),"\n",(0,r.jsx)(e.li,{children:"feat: \u65B0\u529F\u80FD - \u4E3A\u7528\u6237\u63D0\u4F9B\u7684\u65B0\u529F\u80FD\uFF0C\u800C\u4E0D\u662F\u6784\u5EFA\u811A\u672C\u7684\u65B0\u529F\u80FD\u3002\u6B64\u7C7B\u63D0\u4EA4\u5C06\u89E6\u53D1\u6B21\u8981\u7248\u672C\u7684\u53D1\u5E03\u3002"}),"\n",(0,r.jsx)(e.li,{children:"chore: \u6784\u5EFA\u8FC7\u7A0B\u3001\u8F85\u52A9\u5DE5\u5177\u3001\u6587\u6863\u751F\u6210\u3001\u5347\u7EA7"}),"\n",(0,r.jsx)(e.li,{children:"refactor: \u91CD\u6784"}),"\n",(0,r.jsx)(e.li,{children:"style: \u91CD\u6784\u751F\u4EA7\u4EE3\u7801\uFF0C\u4F8B\u5982\u91CD\u547D\u540D\u53D8\u91CF\u3002"}),"\n",(0,r.jsx)(e.li,{children:"docs: \u6587\u6863"}),"\n",(0,r.jsx)(e.li,{children:"ci: \u6301\u7EED\u96C6\u6210"}),"\n",(0,r.jsx)(e.li,{children:"perf: \u6027\u80FD\u4F18\u5316 - \u6027\u80FD\u6539\u8FDB\u3002\u6B64\u7C7B\u63D0\u4EA4\u5C06\u89E6\u53D1\u8865\u4E01\u7248\u672C\u7684\u53D1\u5E03\u3002"}),"\n",(0,r.jsx)(e.li,{children:"test: \u6D4B\u8BD5 - \u6DFB\u52A0\u7F3A\u5931\u7684\u6D4B\u8BD5\u3001\u91CD\u6784\u6D4B\u8BD5\uFF1B\u6CA1\u6709\u751F\u4EA7\u4EE3\u7801\u7684\u66F4\u6539\u3002"}),"\n",(0,r.jsx)(e.li,{children:"revert: \u64A4\u9500"}),"\n",(0,r.jsx)(e.li,{children:"localize: \u672C\u5730\u5316"}),"\n",(0,r.jsx)(e.li,{children:"build: \u66F4\u65B0\u6784\u5EFA\u914D\u7F6E\u3001\u5F00\u53D1\u5DE5\u5177\u6216\u5176\u4ED6\u4E0E\u7528\u6237\u65E0\u5173\u7684\u66F4\u6539\u3002"}),"\n",(0,r.jsx)(e.li,{children:"style: \u683C\u5F0F\u66F4\u6539\u3001\u7F3A\u5C11\u5206\u53F7\u7B49\u3002"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"feat(xyz)!"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"!"})," for BREAKING CHANGE"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["footer\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"BREAKING CHANGE:"}),"\n",(0,r.jsxs)(e.li,{children:["trailers - ",(0,r.jsx)(e.a,{href:"https://git-scm.com/docs/git-interpret-trailers",children:"https://git-scm.com/docs/git-interpret-trailers"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Signed-off-by:"}),"\n",(0,r.jsx)(e.li,{children:"Reviewed-by:"}),"\n",(0,r.jsx)(e.li,{children:"Refs: #123"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"Created By:"}),"\n",(0,r.jsx)(e.li,{children:"Approved By:"}),"\n",(0,r.jsx)(e.li,{children:"Accepted By:"}),"\n",(0,r.jsx)(e.li,{children:"URL:"}),"\n",(0,r.jsx)(e.li,{children:"Closes #123, #245, #992"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const r = /^(feat|fix|docs|style|perf|merge|build|localize|revert|refactor|test|chore|ci)([(].+\uFF1F[)])?!?: .{1,120}/;\n"})}),"\n",(0,r.jsx)(e.h2,{id:"message",children:"Message"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Angular \u793E\u533A\u63D0\u4EA4\u89C4\u8303\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"^(feat|fix|docs|style|refactor|test|chore|ci)((.+))?: .{1,100}"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["jQuery \u793E\u533A\u63D0\u4EA4\u89C4\u8303\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"^(Fixes|Closes|Ref)? .{1,100}"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Atom \u793E\u533A\u63D0\u4EA4\u89C4\u8303\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"^(:.*:)? .{1,72}"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["JSHint \u793E\u533A\u63D0\u4EA4\u89C4\u8303\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"^([[(FIX|FEAT|DOCS|TEST|CHORE)]])? .{1,100}"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["ESLint \u793E\u533A\u63D0\u4EA4\u89C4\u8303\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"^(Fix|Update|New|Breaking|Docs|Build|Upgrade|Chore)?: .{1,72}"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"\u7279\u6B8A",children:"\u7279\u6B8A"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"Github"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"[skip ci]\n[ci skip]\n[no ci]\n[skip actions]\n[actions skip]\n"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"footer"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"skip-checks:true\nskip-checks: true\n"})}),"\n",(0,r.jsx)(e.h2,{id:"issue-labels",children:"Issue Labels"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Issue \u7BA1\u7406 vs \u4EFB\u52A1\u7BA1\u7406\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Issue - \u95EE\u9898\u9A71\u52A8 - \u89E3\u51B3\u95EE\u9898\u3001\u6539\u8FDB\u4EA7\u54C1\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53D1\u73B0\u95EE\u9898 - \u5206\u7C7B - \u4F18\u5148\u7EA7 - \u6307\u6D3E - \u5904\u7406 - \u9A8C\u8BC1 - \u5173\u95ED"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u4EFB\u52A1 - \u5B8C\u6210\u7279\u5B9A\u76EE\u6807\u6216\u4EA4\u4ED8\u7269\u4E3A\u5BFC\u5411 - \u5B8C\u6210\u5177\u4F53\u5DE5\u4F5C\u76EE\u6807\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u76EE\u6807\u5206\u89E3 - \u4EFB\u52A1\u5206\u6D3E- \u8FDB\u5EA6\u8DDF\u8E2A - \u4EFB\u52A1\u5B8C\u6210"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"feat \u7C7B Issue \u53EF\u770B\u4F5C\u662F\u4EFB\u52A1"}),"\n",(0,r.jsx)(e.li,{children:"wip \u2192 ready for review \u2192 ready for release \u2192 closed/released"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"\u6807\u7B7E"}),(0,r.jsx)(e.th,{children:"\u63CF\u8FF0"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"bug"}),(0,r.jsx)(e.td,{children:"\u9519\u8BEF\u62A5\u544A"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"duplicate"}),(0,r.jsx)(e.td,{children:"\u91CD\u590D\u95EE\u9898"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"enhancement"}),(0,r.jsx)(e.td,{children:"\u529F\u80FD\u589E\u5F3A"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"help wanted"}),(0,r.jsx)(e.td,{children:"\u9700\u8981\u5E2E\u52A9"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"invalid"}),(0,r.jsx)(e.td,{children:"\u65E0\u6548\u95EE\u9898"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"question"}),(0,r.jsx)(e.td,{children:"\u95EE\u9898"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"wontfix"}),(0,r.jsx)(e.td,{children:"\u4E0D\u4E88\u89E3\u51B3"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.strong,{children:"Extra"})}),(0,r.jsx)(e.td,{children:"---"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"wip"}),(0,r.jsx)(e.td,{children:"\u8FDB\u884C\u4E2D"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"ready for review"}),(0,r.jsx)(e.td,{children:"\u5F85\u5BA1\u67E5"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"ready for merge"}),(0,r.jsx)(e.td,{children:"\u5F85\u5408\u5E76"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"ready for test"}),(0,r.jsx)(e.td,{children:"\u5F85\u6D4B\u8BD5"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"ready for release"}),(0,r.jsx)(e.td,{children:"\u5F85\u53D1\u5E03"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"P1, P2, P3, P4, P5"}),(0,r.jsx)(e.td,{children:"\u4F18\u5148\u7EA7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.strong,{children:"Advanced"})}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Bug"}),(0,r.jsx)(e.td,{children:"\u9519\u8BEF"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Feature"}),(0,r.jsx)(e.td,{children:"\u65B0\u529F\u80FD"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Enhancement"}),(0,r.jsx)(e.td,{children:"\u589E\u5F3A"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Security"}),(0,r.jsx)(e.td,{children:"\u5B89\u5168\u95EE\u9898"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Testing"}),(0,r.jsx)(e.td,{children:"\u6D4B\u8BD5"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Kind/Documentation"}),(0,r.jsx)(e.td,{children:"\u6587\u6863"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Compat/Breaking"}),(0,r.jsx)(e.td,{children:"\u91CD\u5927\u53D8\u66F4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Reviewed/Duplicate"}),(0,r.jsx)(e.td,{children:"\u5DF2\u5BA1\u67E5\u91CD\u590D"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Reviewed/Invalid"}),(0,r.jsx)(e.td,{children:"\u5DF2\u5BA1\u67E5\u65E0\u6548"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Reviewed/Confirmed"}),(0,r.jsx)(e.td,{children:"\u5DF2\u786E\u8BA4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Reviewed/Won't Fix"}),(0,r.jsx)(e.td,{children:"\u5DF2\u5BA1\u67E5\u4E0D\u4E88\u89E3\u51B3"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Status/Need More Info"}),(0,r.jsx)(e.td,{children:"\u9700\u8981\u66F4\u591A\u4FE1\u606F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Status/Blocked"}),(0,r.jsx)(e.td,{children:"\u963B\u585E"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Status/Abandoned"}),(0,r.jsx)(e.td,{children:"\u5DF2\u653E\u5F03"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Priority/Critical"}),(0,r.jsx)(e.td,{children:"\u5173\u952E\u4F18\u5148\u7EA7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Priority/High"}),(0,r.jsx)(e.td,{children:"\u9AD8\u4F18\u5148\u7EA7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Priority/Medium"}),(0,r.jsx)(e.td,{children:"\u4E2D\u4F18\u5148\u7EA7"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Priority/Low"}),(0,r.jsx)(e.td,{children:"\u4F4E\u4F18\u5148\u7EA7"})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://karma-runner.github.io/6.4/dev/git-commit-msg.html",children:"https://karma-runner.github.io/6.4/dev/git-commit-msg.html"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit",children:"https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/fteem/git-semantic-commits",children:"https://github.com/fteem/git-semantic-commits"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://sparkbox.com/foundry/semantic_commit_messages",children:"https://sparkbox.com/foundry/semantic_commit_messages"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://git-scm.com/docs/git-interpret-trailers",children:"https://git-scm.com/docs/git-interpret-trailers"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.conventionalcommits.org/",children:"https://www.conventionalcommits.org/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/",children:"https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(x,{...n})}):x(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return l},a:function(){return d}});var s=i(75271);let r={},t=s.createContext(r);function d(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:d(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);