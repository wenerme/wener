"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["66596"],{14398:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>u,assets:()=>d,toc:()=>o,frontMatter:()=>s});var i=JSON.parse('{"id":"devops/service/linkerd-faq","title":"Linkerd \u5E38\u89C1\u95EE\u9898","description":"\u95EE\u9898\u6392\u67E5","source":"@site/../notes/devops/service/linkerd-faq.md","sourceDirName":"devops/service","slug":"/devops/service/linkerd-faq","permalink":"/notes/devops/service/linkerd-faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/service/linkerd-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1637477347000,"frontMatter":{"title":"Linkerd \u5E38\u89C1\u95EE\u9898","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Kuma","permalink":"/notes/devops/service/kuma"},"next":{"title":"Linkerd Version","permalink":"/notes/devops/service/linkerd-version"}}'),t=r("52676"),l=r("79938");let s={title:"Linkerd \u5E38\u89C1\u95EE\u9898",tags:["FAQ"]},a="Linkerd \u5E38\u89C1\u95EE\u9898",d={},o=[{value:"\u95EE\u9898\u6392\u67E5",id:"\u95EE\u9898\u6392\u67E5",level:2},{value:"error: unable to retrieve the complete list of server APIs: tap.linkerd.io/v1alpha1: the server is currently unable to handle the request",id:"error-unable-to-retrieve-the-complete-list-of-server-apis-taplinkerdiov1alpha1-the-server-is-currently-unable-to-handle-the-request",level:2},{value:"linkerd-proxy-injector - remote error: tls: bad certificate",id:"linkerd-proxy-injector---remote-error-tls-bad-certificate",level:2},{value:"cni",id:"cni",level:2},{value:"Failed to initialize identity service",id:"failed-to-initialize-identity-service",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"linkerd-\u5E38\u89C1\u95EE\u9898",children:"Linkerd \u5E38\u89C1\u95EE\u9898"})}),"\n",(0,t.jsx)(n.h2,{id:"\u95EE\u9898\u6392\u67E5",children:"\u95EE\u9898\u6392\u67E5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u68C0\u67E5 proxy \u662F\u5426\u6B63\u5E38\n# --context default \u6307\u5B9A\u5176\u4ED6\u4E0A\u4E0B\u6587\n# \u786E\u4FDD linkerd \u662F\u6B63\u5E38\u7684\nlinkerd check --proxy -n linkerd\n# \u68C0\u67E5\u5176\u4ED6\u7A7A\u95F4\nlinkerd check --proxy -n ingress-nginx\n\n# config.linkerd.io/enable-debug-sidecar=true\n# --enable-debug-sidecar\nlinkerd inject --enable-debug-sidecar whoami.deploy.yaml | kubectl -n default apply -f -\n"})}),"\n",(0,t.jsx)(n.h2,{id:"error-unable-to-retrieve-the-complete-list-of-server-apis-taplinkerdiov1alpha1-the-server-is-currently-unable-to-handle-the-request",children:"error: unable to retrieve the complete list of server APIs: tap.linkerd.io/v1alpha1: the server is currently unable to handle the request"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u9A8C\u8BC1\u670D\u52A1\u6B63\u5E38\nkubectl get apiservices\nkubectl get pods -n kube-system\n\n# hook \u5B58\u5728\nkubectl get validatingwebhookconfigurations\nkubectl get mutatingwebhookconfigurations\n\nlinkerd -n linkerd tap deploy/web\n# Error: HTTP error, status Code [503] (unexpected API response: Error trying to reach service: 'x509: certificate relies on legacy Common Name field, use SANs or temporarily enable Common Name matching with GODEBUG=x509ignoreCN=0')\n\n# \u91CD\u542F linkerd\nkubectl rollout restart -n linkerd deployment\n\n# \u67E5\u770B\u4E8B\u4EF6\nkubectl get events --field-selector reason=IssuerUpdated -n linkerd\n"})}),"\n",(0,t.jsx)(n.h2,{id:"linkerd-proxy-injector---remote-error-tls-bad-certificate",children:"linkerd-proxy-injector - remote error: tls: bad certificate"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/linkerd/linkerd2/issues/3754",children:"#3754"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"linkerd upgrade --identity-trust-anchors-file=./ca.crt\n"})}),"\n",(0,t.jsx)(n.h2,{id:"cni",children:"cni"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u81EA\u52A8\u91CD\u5199 Pod \u7684 iptables \u89C4\u5219"}),"\n",(0,t.jsx)(n.li,{children:"\u5B89\u88C5\u540E\u5219\u4E0D\u518D\u9700\u8981 init - \u8BE5 Container \u9700\u8981 NET_ADMIN \u6743\u9650"}),"\n",(0,t.jsx)(n.li,{children:"\u9002\u7528\u4E8E\u96C6\u7FA4\u5BF9\u6743\u9650\u9650\u5236\u7684\u6BD4\u8F83\u4E25\u8C28\u7684\u573A\u666F"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5B89\u88C5 CNI\nlinkerd install-cni | kubectl apply -f -\n# \u5B89\u88C5\u540E\nlinkerd install --linkerd-cni-enabled | kubectl apply -f -\n\n# HELM \u5B89\u88C5 CNI\nhelm install linkerd2-cni linkerd2/linkerd2-cni\n# check\nlinkerd check --pre --linkerd-cni-enabled\n"})}),"\n",(0,t.jsx)(n.h2,{id:"failed-to-initialize-identity-service",children:"Failed to initialize identity service"})]})}function u(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return a},a:function(){return s}});var i=r(75271);let t={},l=i.createContext(t);function s(e){let n=i.useContext(l);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);