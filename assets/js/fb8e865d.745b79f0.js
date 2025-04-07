"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["23842"],{98075:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>h,assets:()=>d,toc:()=>a,frontMatter:()=>t});var r=JSON.parse('{"id":"devops/upgrade","title":"\u7CFB\u7EDF\u5347\u7EA7","description":"- \u907F\u514D\u5E38\u89C1 CVE","source":"@site/../notes/devops/upgrade.md","sourceDirName":"devops","slug":"/devops/upgrade","permalink":"/notes/devops/upgrade","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/upgrade.md","tags":[{"inline":true,"label":"Version","permalink":"/notes/tags/version"},{"inline":true,"label":"Upgrade","permalink":"/notes/tags/upgrade"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"\u7CFB\u7EDF\u5347\u7EA7","tags":["Version","Upgrade"]},"sidebar":"docs","previous":{"title":"Telementry","permalink":"/notes/devops/telementry"},"next":{"title":"Web","permalink":"/notes/devops/web/"}}'),i=s("52676"),l=s("79938");let t={title:"\u7CFB\u7EDF\u5347\u7EA7",tags:["Version","Upgrade"]},o="\u5347\u7EA7",d={},a=[{value:"\u975E\u7CFB\u7EDF\u7EC4\u4EF6",id:"\u975E\u7CFB\u7EDF\u7EC4\u4EF6",level:2},{value:"\u5347\u7EA7 k3s/k0s",id:"\u5347\u7EA7-k3sk0s",level:2}];function c(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u5347\u7EA7",children:"\u5347\u7EA7"})}),"\n",(0,i.jsx)(n.admonition,{title:"\u4E3A\u4EC0\u4E48\u5468\u671F\u6027\u5347\u7EA7",type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u907F\u514D\u5E38\u89C1 CVE\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4F8B\u5982: \u501F\u52A9 quay \u626B\u63CF\u7248\u672C CVE ",(0,i.jsx)(n.a,{href:"https://quay.io/repository/wener/base?tab=tags",children:"https://quay.io/repository/wener/base?tab=tags"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u907F\u514D\u624B\u751F - \u592A\u4E45\u4E0D\u5347\u7EA7\u5C31\u518D\u4E5F\u4E0D\u6562\u5347\u7EA7"}),"\n",(0,i.jsx)(n.li,{children:"\u5C0F\u7248\u672C\u5347\u7EA7\u53EF\u89E3\u51B3\u4E00\u4E9B Bug \u4E5F\u503C\u5F97\u5347\u7EA7"}),"\n",(0,i.jsx)(n.li,{children:"\u7528\u4E0A\u65B0\u529F\u80FD - \u4E0E\u65F6\u4FF1\u8FDB\uFF0C\u4E86\u89E3\u548C\u5B66\u4E60\u65B0\u7684\u7279\u6027\u529F\u80FD"}),"\n",(0,i.jsx)(n.li,{children:"\u5468\u671F\u6027\u89E3\u51B3\u517C\u5BB9\u6027\u95EE\u9898"}),"\n"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Kubernetes \u4E00\u5E74 3 \u7248\u672C\uFF0C\u7248\u672C\u652F\u6301 +/- 1\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u56E0\u6B64\u81F3\u5C11\u534A\u5E74\u5347\u7EA7\u4E00\u6B21"}),"\n",(0,i.jsx)(n.li,{children:"\u5347\u7EA7\u5EFA\u8BAE\u91CD\u542F\u7CFB\u7EDF - \u56E0\u6B64\u4E5F\u53EF\u4EE5\u9644\u5E26\u5347\u7EA7\u7CFB\u7EDF"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["AlpineLinux\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E00\u5E74\u4E24\u4E2A\u7248\u672C - 5 \u6708\u5DE6\u53F3\u4E00\u4E2A\uFF0C11 \u6708\u5DE6\u53F3\u4E00\u4E2A"}),"\n",(0,i.jsx)(n.li,{children:"\u6BCF\u5E74\u5E74\u5E95\u7684 Linux \u7248\u672C\u4E00\u822C\u4E3A LTS - \u56E0\u6B64\u4E0B\u534A\u5E74\u7248\u672C\u4E00\u822C\u4E5F\u4F1A\u66F4\u65B0\u5185\u6838\u7248\u672C"}),"\n",(0,i.jsxs)(n.li,{children:["\u6BCF\u4E2A\u7248\u672C\u7684\u652F\u6301\u5468\u671F\u7EA6\u4E3A\u4E24\u5E74 - \u4E5F\u5C31\u662F\u5171\u8BA1 4 \u4E2A\u6D3B\u8DC3\u652F\u6301\u7248\u672C\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"main \u4ED3\u5E93\u652F\u6301\u4E24\u5E74 - \u53D1\u5E03\u540E\u4EE5\u7A33\u5B9A\u4E3A\u4E3B\uFF0C\u57FA\u672C\u4E0D\u5347\u7EA7"}),"\n",(0,i.jsx)(n.li,{children:"community \u4ED3\u5E93\u652F\u6301\u5230\u4E0B\u4E00\u4E2A\u7A33\u5B9A\u7248 - \u4E00\u822C\u534A\u5E74"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Debian\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E24\u5E74 \u4E00\u7248\u672C, Security \u66F4\u65B0 \u4E09\u5E74, Long-term \u4E94\u5E74"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Ubuntu\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"LTS - 5 \u5E74 \u652F\u6301 - 2 \u5E74 \u53D1\u5E03 - 10 \u5E74 \u6269\u5C55\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Postgres\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E00\u5E74\u4E00\u4E2A\u7248\u672C - \u4E00\u822C\u6BCF\u5E74 Q4 \u53D1\u5E03\u65B0\u7248\u672C\uFF0C\u6700\u8FD1\u5927\u591A\u4E3A 10 \u6708"}),"\n",(0,i.jsx)(n.li,{children:"\u6BCF\u6B21\u5347\u7EA7\u90FD\u9700\u8981\u79BB\u7EBF\u5347\u7EA7 DB \u6570\u636E"}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u4EE5\u9694 1-3 \u5E74\u5347\u7EA7\u4E00\u6B21\u7248\u672C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Alpine ",(0,i.jsx)(n.a,{href:"/notes/os/alpine/version",children:"Version"})]}),"\n",(0,i.jsxs)(n.li,{children:["Kubernetes ",(0,i.jsx)(n.a,{href:"/notes/devops/kubernetes/version",children:"Version"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u975E\u7CFB\u7EDF\u7EC4\u4EF6",children:"\u975E\u7CFB\u7EDF\u7EC4\u4EF6"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5EFA\u8BAE\u5173\u6CE8\u7279\u6027\u548C\u7248\u672C\u517C\u5BB9"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/web/browser/chrome/version",children:"Chrome \u7248\u672C\u53D8\u5316"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/devops/web/haproxy/version",children:"HAProxy \u7248\u672C\u53D8\u5316"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/languages/go/version",children:"Golang \u7248\u672C\u53D8\u5316"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/java/version/",children:"Java \u7248\u672C\u53D8\u5316"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/os/linux/version",children:"Linux \u7248\u672C\u53D8\u5316"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/os/alpine/version",children:"AlpineLinux \u7248\u672C\u53D8\u5316"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5347\u7EA7-k3sk0s",children:"\u5347\u7EA7 k3s/k0s"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/notes/devops/kubernetes/distro/k3s/install#upgrade",children:"K3S \u5347\u7EA7"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# k0s \u624B\u52A8\u5347\u7EA7\n# ===========\ntag=$(curl -sfL https://apis.wener.me/api/github/r/k0sproject/k0s/version?range=1.25 | jq -r .name)\ncurl -Lo k0s-$tag https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/$tag/k0s-$tag-amd64\ncurl -LO https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/$tag/k0s-airgap-bundle-$tag-amd64\nsudo cp k0s-airgap-bundle-$tag-amd64 /var/lib/k0s/images/bundle_file\nchmod +x k0s-$tag\nsudo service k0scontroller stop\nsudo cp k0s-$tag $(which k0s)\nsudo service k0scontroller start\n\n# k3s \u624B\u52A8\u5347\u7EA7\n# ===========\ntag=$(curl -sfL https://apis.wener.me/api/github/r/k3s-io/k3s/version?range=1.25 | jq -r .name)\ncurl -Lo k3s-$tag https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.25.5+k3s2/k3s\nchmod +x k3s-$tag\nsudo cp k3s-$tag $(which k3s)\nsudo service k3s restart\n"})})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return t}});var r=s(75271);let i={},l=r.createContext(i);function t(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);