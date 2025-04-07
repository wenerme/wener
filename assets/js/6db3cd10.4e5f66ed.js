"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20210"],{15506:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>u,assets:()=>i,toc:()=>c,frontMatter:()=>o});var s=JSON.parse('{"id":"devops/kubernetes/ops/kubectl-faq","title":"kubectl FAQ","description":"- secret \u7684 stringData \u4F1A\u8FDB\u884C\u5408\u5E76\uFF0C\u5220\u9664 stringData \u5B57\u6BB5\u4E0D\u4F1A\u5220\u9664\u5B9E\u9645 secret \u5B57\u6BB5","source":"@site/../notes/devops/kubernetes/ops/kubectl-faq.md","sourceDirName":"devops/kubernetes/ops","slug":"/devops/kubernetes/ops/kubectl-faq","permalink":"/notes/devops/kubernetes/ops/kubectl-faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/kubernetes/ops/kubectl-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1675652392000,"frontMatter":{"title":"kubectl FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"krew","permalink":"/notes/devops/kubernetes/ops/krew"},"next":{"title":"Kubectl","permalink":"/notes/devops/kubernetes/ops/kubectl"}}'),r=t("52676"),l=t("79938");let o={title:"kubectl FAQ",tags:["FAQ"]},a="kubectl FAQ",i={},c=[{value:"\u5220\u9664 Evicted \u7684 Pod",id:"\u5220\u9664-evicted-\u7684-pod",level:2},{value:"\u5F53\u524D\u96C6\u7FA4\u540D\u5B57",id:"\u5F53\u524D\u96C6\u7FA4\u540D\u5B57",level:2},{value:"\u7AEF\u53E3\u8F6C\u53D1\u8D85\u65F6/\u7AEF\u53E3\u8F6C\u53D1\u91CD\u8054",id:"\u7AEF\u53E3\u8F6C\u53D1\u8D85\u65F6\u7AEF\u53E3\u8F6C\u53D1\u91CD\u8054",level:2},{value:"Kubernetes configuration file is group/world-readable",id:"kubernetes-configuration-file-is-groupworld-readable",level:2}];function d(e){let n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"kubectl-faq",children:"kubectl FAQ"})}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"secret \u7684 stringData \u4F1A\u8FDB\u884C\u5408\u5E76\uFF0C\u5220\u9664 stringData \u5B57\u6BB5\u4E0D\u4F1A\u5220\u9664\u5B9E\u9645 secret \u5B57\u6BB5"}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"\u5220\u9664-evicted-\u7684-pod",children:"\u5220\u9664 Evicted \u7684 Pod"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"status.phase=Fialed & state.reason=Evicted"}),"\n",(0,r.jsx)(n.li,{children:"Terminating -> Pending"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'kubectl get pods | grep Evicted | awk \'{print $1}\' | xargs kubectl delete pod\n\n# \u7B5B\u9009\u67E5\u770B\n# reason Evicted\nkubectl get pods --all-namespaces --field-selector="status.phase=Failed"\n# \u786E\u8BA4\u5220\u9664\nkubectl delete pods --all-namespaces --field-selector="status.phase=Failed"\n\n# kubectl get pods --all-namespaces --field-selector="status.phase=Pending" | awk \'{print "-n " $1 " " $2}\' | tail -n+2 | xargs kubectl delete pod --force\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\u5F53\u524D\u96C6\u7FA4\u540D\u5B57",children:"\u5F53\u524D\u96C6\u7FA4\u540D\u5B57"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"kubectl config view --minify -o=jsonpath='{.contexts[0].context.cluster}'\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u7AEF\u53E3\u8F6C\u53D1\u8D85\u65F6\u7AEF\u53E3\u8F6C\u53D1\u91CD\u8054",children:"\u7AEF\u53E3\u8F6C\u53D1\u8D85\u65F6/\u7AEF\u53E3\u8F6C\u53D1\u91CD\u8054"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u9ED8\u8BA4 5 \u5206\u949F \u8D85\u65F6"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5173\u95ED\u8D85\u65F6\nkubectl port-forward -n postgres-operator svc/postgres-operator-ui 8080:80 --request-timeout 0\n"})}),"\n",(0,r.jsx)(n.p,{children:"Shell \u5FAA\u73AF"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"while :;do kubectl port-forward -n postgres-operator svc/postgres-operator-ui 8080:80; done\n"})}),"\n",(0,r.jsx)(n.p,{children:"Windows BAT \u5FAA\u73AF"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bat",children:":1\noc port-forward PODNAME 8003:8080\ngoto 1\n"})}),"\n",(0,r.jsx)(n.h2,{id:"kubernetes-configuration-file-is-groupworld-readable",children:"Kubernetes configuration file is group/world-readable"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"chmod go-r ~/.kube/config\n# or\nchmod 600 ~/.kube/config\n"})})]})}function u(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return o}});var s=t(75271);let r={},l=s.createContext(r);function o(e){let n=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);