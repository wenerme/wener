"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["10546"],{38084:function(e,t,o){o.r(t),o.d(t,{metadata:()=>n,contentTitle:()=>s,default:()=>h,assets:()=>a,toc:()=>d,frontMatter:()=>r});var n=JSON.parse('{"id":"ai/ml/pytorch/pytorch-cookbook","title":"Pytorch Cookbook","description":"Auto Set Device","source":"@site/../notes/ai/ml/pytorch/pytorch-cookbook.md","sourceDirName":"ai/ml/pytorch","slug":"/ai/ml/pytorch/cookbook","permalink":"/notes/ai/ml/pytorch/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/pytorch/pytorch-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1718079305000,"frontMatter":{"tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"PyTorch","permalink":"/notes/ai/ml/pytorch/"},"next":{"title":"PyTorch FAQ","permalink":"/notes/ai/ml/pytorch/faq"}}'),c=o("52676"),i=o("79938");let r={tags:["Cookbook"]},s="Pytorch Cookbook",a={},d=[{value:"Auto Set Device",id:"auto-set-device",level:2}];function l(e){let t={code:"code",h1:"h1",h2:"h2",header:"header",pre:"pre",...(0,i.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.header,{children:(0,c.jsx)(t.h1,{id:"pytorch-cookbook",children:"Pytorch Cookbook"})}),"\n",(0,c.jsx)(t.h2,{id:"auto-set-device",children:"Auto Set Device"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-py",children:'import torch\n\nprint(f"Default device: {torch.get_default_device()}")\n\nif torch.backends.mps.is_available():\n    device = torch.device("mps")\n    x = torch.ones(1, device=device)\n    print(f"Using MPS device: {x}")\nelif torch.backends.cuda.is_built():\n    device = torch.device("cuda")\n    x = torch.ones(1, device=device)\n    print(f"Using CUDA device: {x}")\nelse:\n    device = torch.device("cpu")\n    x = torch.ones(1, device=device)\n    print(f"Using CPU device: {x}")\n'})}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-py",children:'device = torch.device((\n    "cuda"\n    if torch.cuda.is_available()\n    else "mps"\n    if torch.backends.mps.is_available()\n    else "cpu"\n))\nprint(f"Using {device} device")\n'})}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-py",children:"# \u4E0D\u63A8\u8350\ntorch.set_default_device(device)\n"})})]})}function h(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},79938:function(e,t,o){o.d(t,{Z:function(){return s},a:function(){return r}});var n=o(75271);let c={},i=n.createContext(c);function r(e){let t=n.useContext(i);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:r(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);