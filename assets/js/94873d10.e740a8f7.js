"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["33494"],{81675:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>u,assets:()=>c,toc:()=>l,frontMatter:()=>s});var r=JSON.parse('{"id":"platform/azure/azure-oai","title":"Azure OpenAI","description":"- https://oai.azure.com/portal","source":"@site/../notes/platform/azure/azure-oai.md","sourceDirName":"platform/azure","slug":"/platform/azure/oai","permalink":"/notes/platform/azure/oai","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/platform/azure/azure-oai.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693804740000,"frontMatter":{"title":"Azure OpenAI"},"sidebar":"docs","previous":{"title":"Azure","permalink":"/notes/platform/azure/"},"next":{"title":"\u6587\u5FC3\u5343\u5E06","permalink":"/notes/platform/baidu/wenxin"}}'),i=t("52676"),o=t("79938");let s={title:"Azure OpenAI"},a="Azure OpenAI",c={},l=[];function p(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"azure-openai",children:"Azure OpenAI"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://oai.azure.com/portal",children:"https://oai.azure.com/portal"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/",children:"Azure OpenAI Service pricing"})}),"\n",(0,i.jsxs)(n.li,{children:["gpt-3.5-turbo\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"$0.002, 1000 tokens"}),"\n",(0,i.jsx)(n.li,{children:"\u4EF7\u683C\u4E00\u6837"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# DEPLOYMENT \u5BF9\u5E94\u6A21\u578B\n# https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/\n# https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference\n# https://github.com/Azure/azure-rest-api-specs/blob/main/specification/cognitiveservices/data-plane/AzureOpenAI/inference/stable/2023-05-15/inference.json\ncurl https://$RESOURCE.openai.azure.com/openai/deployments/$DEPLOYMENT/completions?api-version=2023-05-15 \\\n  -H "api-key: $AZURE_API_KEY" \\\n  --json \'{"prompt":"Hello","max_tokens":5}\'\n\ncurl https://$RESOURCE.openai.azure.com/openai/deployments/$DEPLOYMENT/chat/completions?api-version=2023-05-15 \\\n  -H "api-key: $AZURE_API_KEY" \\\n  --json \'{"messages":[{"role":"user","content":"Hello"}]}\' | jq\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"/completions"}),"\n",(0,i.jsx)(n.li,{children:"/embeddings"}),"\n",(0,i.jsx)(n.li,{children:"/chat/completions"}),"\n"]})]})}function u(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return s}});var r=t(75271);let i={},o=r.createContext(i);function s(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);