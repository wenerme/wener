"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["38038"],{40670:function(e,n,l){l.r(n),l.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>d,assets:()=>r,toc:()=>p,frontMatter:()=>s});var t=JSON.parse('{"id":"ai/llm/llama.cpp","title":"llama.cpp","description":"- ggerganov/llama.cpp","source":"@site/../notes/ai/llm/llama.cpp.md","sourceDirName":"ai/llm","slug":"/ai/llm/llama.cpp","permalink":"/notes/ai/llm/llama.cpp","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/llm/llama.cpp.md","tags":[{"inline":true,"label":"Engine","permalink":"/notes/tags/engine"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717134008000,"frontMatter":{"title":"llama.cpp","tags":["Engine"]},"sidebar":"docs","previous":{"title":"ChatGPT-Next-Web","permalink":"/notes/ai/llm/chatgpt-next-web"},"next":{"title":"LLaMa","permalink":"/notes/ai/llm/llama"}}'),a=l("52676"),i=l("79938");let s={title:"llama.cpp",tags:["Engine"]},c="llama.cpp",r={},p=[{value:"nodejs",id:"nodejs",level:2},{value:"quantization",id:"quantization",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"llamacpp",children:"llama.cpp"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://github.com/ggerganov/llama.cpp",children:"ggerganov/llama.cpp"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"MIT, C++"}),"\n",(0,a.jsx)(n.li,{children:"LLM inference in C/C++"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://github.com/withcatai/node-llama-cpp",children:"withcatai/node-llama-cpp"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'# AlpineLinux py for ML\napk add \\\n  gcc g++ python3 py3-pip musl-dev cmake make pkgconf build-base \\\n  git openssh-client binutils coreutils util-linux findutils sed grep tar wget curl neofetch \\\n  rust cargo python3-dev openssl-dev linux-headers\n\n# llama.cpp\n# =========\ngit clone https://github.com/ggerganov/llama.cpp.git\ncd llama.cpp\nmake -j\n\n./main -m ./models/7B/ggml-model-q4_0.bin -p "Building a website can be done in 10 simple steps:" -n 512\n./main -m ./models/7B/ggml-model-q4_0.bin --file prompts/alpaca.txt --instruct --ctx_size 2048 --keep -1\n\n./main -m ./models/ggml-alpaca-7b-q4.bin --color -f ./prompts/alpaca.txt -ins -b 256 --top_k 10000 --temp 0.2 --repeat_penalty 1 -t 7\n'})}),"\n",(0,a.jsx)(n.h2,{id:"nodejs",children:"nodejs"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"NODE_LLAMA_CPP_SKIP_DOWNLOAD=1 pnpm add node-llama-cpp\n"})}),"\n",(0,a.jsx)(n.h2,{id:"quantization",children:"quantization"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Q3_K_M"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Q3"})," - 3 bits"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"K"})," - 1024"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"M"})," - 256"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.li,{children:"gguf"}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return c},a:function(){return s}});var t=l(75271);let a={},i=t.createContext(a);function s(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);