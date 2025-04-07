"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["59861"],{34186:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>h,assets:()=>a,toc:()=>o,frontMatter:()=>l});var r=JSON.parse('{"id":"service/forge/gitea/gitea-faq","title":"Gitea FAQ","description":"- AccessToken \u76EE\u524D\u65E0\u6CD5\u9650\u5B9A org/repo","source":"@site/../notes/service/forge/gitea/gitea-faq.md","sourceDirName":"service/forge/gitea","slug":"/service/forge/gitea/faq","permalink":"/notes/service/forge/gitea/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/gitea/gitea-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1729056347000,"frontMatter":{"tags":["FAQ"]},"sidebar":"docs","previous":{"title":"\u914D\u7F6E","permalink":"/notes/service/forge/gitea/conf"},"next":{"title":"Package","permalink":"/notes/service/forge/gitea/package"}}'),s=i("52676"),t=i("79938");let l={tags:["FAQ"]},c="Gitea FAQ",a={},o=[{value:"OIDC Mapping",id:"oidc-mapping",level:2},{value:"Trigger Mirror Sync / WebHook",id:"trigger-mirror-sync--webhook",level:2},{value:"exit status 128 - fatal: protocol error: bad line length character: 4?",id:"exit-status-128---fatal-protocol-error-bad-line-length-character-4",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"gitea-faq",children:"Gitea FAQ"})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["AccessToken \u76EE\u524D\u65E0\u6CD5\u9650\u5B9A org/repo\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Organization and Repository level access token ",(0,s.jsx)(n.a,{href:"https://github.com/go-gitea/gitea/issues/25900",children:"gitea#25900"})]}),"\n",(0,s.jsxs)(n.li,{children:["Permissions for package repositories ",(0,s.jsx)(n.a,{href:"https://github.com/go-gitea/gitea/issues/20596",children:"gitea#20596"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Action \u76EE\u524D\u4E0D\u80FD\u624B\u52A8\u89E6\u53D1\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Actions - Manually trigger a workflow/action ",(0,s.jsx)(n.a,{href:"https://github.com/go-gitea/gitea/issues/23668",children:"gitea#23668"})]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,s.jsx)(n.h2,{id:"oidc-mapping",children:"OIDC Mapping"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-env",children:"GITEA__service__DISABLE_REGISTRATION=true\nGITEA__service__ALLOW_ONLY_EXTERNAL_REGISTRATION=true\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Keycloak\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u65B0\u5EFA ",(0,s.jsx)(n.code,{children:"gitea"})," Client Mapper\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u6620\u5C04 claims ",(0,s.jsx)(n.code,{children:"gitea_groups"})," -> \u7528\u6237\u5C5E\u6027 ",(0,s.jsx)(n.code,{children:"GITEA_GROUPS"}),", \u503C\u4E3A JSON"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["User\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'GITEA_GROUPS=["admin","wener"]'})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Gitea\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u81EA\u52A8\u53D1\u73B0 ",(0,s.jsx)(n.code,{children:"https://wener.me/realms/wener/.well-known/openid-configuration"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u9644\u52A0\u6388\u6743\u8303\u56F4\uFF08Scopes\uFF09\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"openid email profile gitea"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u7528\u4E8E\u63D0\u4F9B\u7528\u6237\u7EC4\u540D\u79F0\u7684 Claim \u58F0\u660E\u540D\u79F0\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"gitea_groups"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u7BA1\u7406\u5458\u7528\u6237\u7EC4\u7684 Claim \u58F0\u660E\u503C\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"admin"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u6620\u5C04\u58F0\u660E\u7684\u7EC4\u5230\u7EC4\u7EC7\u56E2\u961F\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'{"wener":{"wener":["owners"]}}'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u6620\u5C04 wener \u7EC4\u4E3A wener \u7EC4\u7EC7\u7684 owners \u56E2\u961F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"trigger-mirror-sync--webhook",children:"Trigger Mirror Sync / WebHook"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"curl -X POST https://gitea.com/api/v1/repos/{owner}/{repo}/mirror-sync?token={pta}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"exit-status-128---fatal-protocol-error-bad-line-length-character-4",children:"exit status 128 - fatal: protocol error: bad line length character: 4?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"git push \u65F6\u53D1\u751F"}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return l}});var r=i(75271);let s={},t=r.createContext(s);function l(e){let n=r.useContext(t);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);