"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["27108"],{91640:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>x,assets:()=>c,toc:()=>h,frontMatter:()=>r});var s=JSON.parse('{"id":"ai/ml/ml-faq","title":"ML FAQ","description":"- .pt, .pth, .pwf, .pkl, .ckpt","source":"@site/../notes/ai/ml/ml-faq.md","sourceDirName":"ai/ml","slug":"/ai/ml/faq","permalink":"/notes/ai/ml/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/ml-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1735615618000,"frontMatter":{"tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Dataset","permalink":"/notes/ai/ml/dataset"},"next":{"title":"ML Glossary","permalink":"/notes/ai/ml/glossary"}}'),l=i("52676"),t=i("79938");let r={tags:["FAQ"]},d="ML FAQ",c={},h=[{value:"Thoughts",id:"thoughts",level:2},{value:"Hardware",id:"hardware",level:2},{value:"Nvidia Arch",id:"nvidia-arch",level:2},{value:"Nvidia Product Series",id:"nvidia-product-series",level:2},{value:"SXM vs PCIe",id:"sxm-vs-pcie",level:2},{value:"TensorFlow vs PyTorch",id:"tensorflow-vs-pytorch",level:2},{value:"VAE vs GAN",id:"vae-vs-gan",level:2},{value:"frames",id:"frames",level:2},{value:"ImportError: cannot import name &#39;packaging&#39; from &#39;pkg_resources&#39; (/usr/local/lib/python3.10/dist-packages/pkg_resources/<strong>init</strong>.py)",id:"importerror-cannot-import-name-packaging-from-pkg_resources-usrlocallibpython310dist-packagespkg_resourcesinitpy",level:2},{value:"ModuleNotFoundError: No module named &#39;packaging&#39;",id:"modulenotfounderror-no-module-named-packaging",level:2},{value:"cannot import name &#39;is_flash_attn_greater_or_equal_2_10&#39; from &#39;transformers.utils&#39;",id:"cannot-import-name-is_flash_attn_greater_or_equal_2_10-from-transformersutils",level:2},{value:"Could not load library libcudnn_cnn_train.so.8",id:"could-not-load-library-libcudnn_cnn_trainso8",level:2},{value:"Placeholder shape mismatches (expected 1 vs got tensorData with 2240) at dimIdx = 0",id:"placeholder-shape-mismatches-expected-1-vs-got-tensordata-with-2240-at-dimidx--0",level:2}];function a(n){let e={a:"a",annotation:"annotation",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",math:"math",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",mtext:"mtext",p:"p",pre:"pre",semantics:"semantics",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"ml-faq",children:"ML FAQ"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[".pt, .pth, .pwf, .pkl, .ckpt\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"checkpointing models in pickle format"}),"\n",(0,l.jsx)(e.li,{children:"\u540C\u6837\u7684\u5185\u5BB9"}),"\n",(0,l.jsx)(e.li,{children:"\u4E0D\u63A8\u8350\u4F7F\u7528 .pth, \u56E0\u4E3A\u548C Python path (.pth) \u914D\u7F6E\u6587\u4EF6\u51B2\u7A81"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u4EE5\u8003\u8651 .pth.tar \u6216 .pt"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[".ptc\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"checkpointing models in pytorch compiled (for JIT)"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["pickle\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://docs.python.org/2/library/pickle.html",children:"https://docs.python.org/2/library/pickle.html"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["flash_attn \u4E0D\u652F\u6301 macOS/Apple Silicon\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/Dao-AILab/flash-attention/issues/977",children:"https://github.com/Dao-AILab/flash-attention/issues/977"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["SafeTensor\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5B58\u50A8\u548C\u4F20\u8F93\u795E\u7ECF\u7F51\u7EDC\u6743\u91CD\u3001\u6570\u636E\u548C\u5176\u4ED6\u5F20\u91CF\u6570\u636E\u7684\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"thoughts",children:"Thoughts"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"ML \u6700\u91CD\u8981\u7684\u662F\u6570\u636E"}),"\n",(0,l.jsxs)(e.li,{children:["CVAT \u76EE\u524D\u7528\u4E0B\u6765\u662F\u6807\u6CE8 \u56FE\u7247/\u89C6\u9891 \u6700\u597D\u7684\u7528\u5177\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E00\u5B9A\u8981\u6CE8\u610F Tracker \u63D2\u5E27\u7684\u95EE\u9898"}),"\n",(0,l.jsx)(e.li,{children:"\u5C3D\u91CF\u4F7F\u7528\u5FEB\u6377\u952E"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"hardware",children:"Hardware"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{children:"Device"}),(0,l.jsx)(e.th,{children:"Arch"}),(0,l.jsx)(e.th,{children:"RAM"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"CUDA"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"Tensor"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"RT"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"FP64"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"FP32"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"FP16"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"INT8"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"INT4"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"Tensor"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"TF32 Tensor"}),(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"FP16 Tensor"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA L4"}),(0,l.jsx)(e.td,{children:"Ada Lovelace"}),(0,l.jsx)(e.td,{children:"24GB"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"30.3 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"120 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"242 TFLOPS"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA Tesla T4"}),(0,l.jsx)(e.td,{children:"Turing"}),(0,l.jsx)(e.td,{children:"16GB"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"2,560"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"320"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"Mix 65 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"8.1 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"130 TOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"260 TOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA GeForce RTX 4090"}),(0,l.jsx)(e.td,{children:"Ada Lovelace"}),(0,l.jsx)(e.td,{children:"24GB"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"16,384"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"1,321"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA Quadro RTX 6000"}),(0,l.jsx)(e.td,{children:"Turing"}),(0,l.jsx)(e.td,{children:"24GB"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"4,608"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"576"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"72"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"16.3 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"130.5 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA Tesla V100"}),(0,l.jsx)(e.td,{children:"Volta"}),(0,l.jsx)(e.td,{children:"32/16G HBM2"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"7 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"14 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"62 TOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA A100 PCIe"}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{children:"40/80G HBM2e"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"9.7 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"19.5 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"156 TFPLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"312 TFLOPS"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA H100 PCIe"}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{children:"80G"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"26 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"51 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"756.5 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"1,513 TFLOPS"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA Tesla P100 PCIe"}),(0,l.jsx)(e.td,{children:"Pascal"}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"3584"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"4.7 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"9.3 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"18.7 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"NVIDIA Tesla P100 SXM"}),(0,l.jsx)(e.td,{children:"Pascal"}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"3584"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"5.3 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"10.6 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"21.2 TFLOPS"}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}}),(0,l.jsx)(e.td,{style:{textAlign:"right"}})]})]})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"A800 \u4E3A A100 \u57FA\u4E8E\u5408\u89C4\u505A\u7684\u8C03\u6574\u7248\u672C\uFF0C\u9650\u5236 GPU \u4E92\u8054\u5E26\u5BBD, 600GB/s -> 400GB/s"}),"\n",(0,l.jsx)(e.li,{children:"H800 vs H100 - 900GB/s -> 400GB/s, FP64 34 -> 1 TFLOPS, FP64 Tensor Flow 67 -> 1 TFLOPS"}),"\n",(0,l.jsx)(e.li,{children:"H200 vs H100 - H200 \u4E3B\u8981\u63D0\u5347\u663E\u5B58\u548C\u5E26\u5BBD\uFF0CHMB3e, \u9762\u5411\u63A8\u7406\u573A\u666F"}),"\n",(0,l.jsx)(e.li,{children:"NVIDIA L4 Tensor Core GPU"}),"\n",(0,l.jsxs)(e.li,{children:["CUDA - Compute Unified Device Architecture - \u7EDF\u4E00\u8BA1\u7B97\u8BBE\u5907\u67B6\u6784\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8F6F\u4EF6\u5C42\u9762"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4E3B\u8981\u6307\u6807\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"CUDA Core - \u6267\u884C\u901A\u7528\u7684\u5E76\u884C\u8BA1\u7B97, FP32"}),"\n",(0,l.jsxs)(e.li,{children:["Tensor Core - NVIDIA Volta+\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"TF32, Bfloat16, FP64"}),"\n",(0,l.jsx)(e.li,{children:"\u6027\u80FD\u53EF\u76F4\u63A5\u6839\u636E\u7CBE\u5EA6\u53D8\u5316"}),"\n",(0,l.jsx)(e.li,{children:"\u4F8B\u5982 TF32 356 TFLOPS -> FP16 712 TFLOPS -> FP8 3,026 TFLOPS"}),"\n",(0,l.jsx)(e.li,{children:"FP8 = INT8"}),"\n",(0,l.jsx)(e.li,{children:"FP16 = BFfloat16"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"RT Core - Ray Tracing Core - \u5149\u7EBF\u8FFD\u8E2A"}),"\n",(0,l.jsx)(e.li,{children:"Shader Cores"}),"\n",(0,l.jsx)(e.li,{children:"GPU \u5185\u5B58\uFF08VRAM\uFF09\u5927\u5C0F"}),"\n",(0,l.jsx)(e.li,{children:"\u5185\u5B58\u5E26\u5BBD"}),"\n",(0,l.jsx)(e.li,{children:"FP16 \u6027\u80FD\u548C\u652F\u6301"}),"\n",(0,l.jsx)(e.li,{children:"GPU \u67B6\u6784\uFF08\u6700\u65B0\u67B6\u6784\u4F18\u5148\uFF09"}),"\n",(0,l.jsx)(e.li,{children:"\u9A71\u52A8\u548C CUDA \u517C\u5BB9\u6027"}),"\n",(0,l.jsx)(e.li,{children:"\u591A GPU \u6269\u5C55\u6027\uFF08\u5982\u9700\uFF09"}),"\n",(0,l.jsx)(e.li,{children:"FP64 - Double-Precision Performance"}),"\n",(0,l.jsx)(e.li,{children:"FP32 - Single-Precision Performance"}),"\n",(0,l.jsx)(e.li,{children:"FP16 - Half-Precision Performance"}),"\n",(0,l.jsx)(e.li,{children:"INT8 - Integer Performance"}),"\n",(0,l.jsxs)(e.li,{children:["FP16 & FP32 - Mixed-Precision - \u63D0\u9AD8\u8BA1\u7B97\u6548\u7387, \u51CF\u5C11\u5185\u5B58\u5360\u7528, \u4FDD\u6301\u6A21\u578B\u7CBE\u5EA6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"2019"}),"\n",(0,l.jsx)(e.li,{children:"Loss Scaling"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/NVIDIA/apex",children:"NVIDIA/apex"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"apex - A PyTorch Extension"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Tensor\xa0Performance - \u77E9\u9635\u4E58\u6CD5\u7D2F\u52A0\u8FD0\u7B97\uFF08Matrix Multiply-Accumulate, MMA\uFF09\u6570\u91CF"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://developer.nvidia.com/tensor-cores",children:"NVIDIA Tensor Cores"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://resources.nvidia.com/l/en-us-gpu",children:"https://resources.nvidia.com/l/en-us-gpu"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/List_of_Nvidia_graphics_processing_units",children:"List of Nvidia graphics processing units"})}),"\n",(0,l.jsxs)(e.li,{children:["SM - Streaming Multiprocessor - \u6D41\u591A\u5904\u7406\u5668\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u529F\u80FD\uFF1A\u5E76\u884C\u8BA1\u7B97\u3001\u5171\u4EAB\u5185\u5B58\u548C\u7F13\u5B58\u3001\u5BC4\u5B58\u5668\u6587\u4EF6\u3001Tensor \u6838\u5FC3\u3001Warp \u8C03\u5EA6"}),"\n",(0,l.jsx)(e.li,{children:"\u67B6\u6784\u548C\u7EC4\u4EF6\uFF1A CUDA \u6838\u5FC3\u3001Tensor \u6838\u5FC3"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"DGX - Deep Learning Supercomputer"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf",children:"https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-datasheet.pdf",children:"https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-datasheet.pdf"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://images.nvidia.com/content/volta-architecture/pdf/volta-architecture-whitepaper.pdf",children:"https://images.nvidia.com/content/volta-architecture/pdf/volta-architecture-whitepaper.pdf"})}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Macbook Pro 2023 16-inch - Apple M2 Max 64G 8+4 CPU 38 GPU 15.8 TOPS"}),"\n",(0,l.jsxs)(e.li,{children:["Apple M2 Max\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"8P+4E CPU"}),"\n",(0,l.jsx)(e.li,{children:"38 GPU 13.6 TFLOPs"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Nvdia RTX 3090"}),"\n",(0,l.jsxs)(e.li,{children:["Nvdia RTX 4906\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Tensor Cores 1321 AI TOPS"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Nvdia Tesla M40\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"7 TFLOPs"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Nvdia V100 Tensor Core\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.nvidia.com/en-us/data-center/v100/",children:"https://www.nvidia.com/en-us/data-center/v100/"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Nvdia H100\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.nvidia.com/en-us/data-center/h100/",children:"https://www.nvidia.com/en-us/data-center/h100/"})}),"\n",(0,l.jsx)(e.li,{children:"Nvdia H100 80G"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["NVIDIA Quadro RTX 6000\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Tensor 1457 TFLOPS"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.nvidia.com/en-us/design-visualization/rtx-6000/",children:"https://www.nvidia.com/en-us/design-visualization/rtx-6000/"})}),"\n",(0,l.jsxs)(e.li,{children:["Linode - ",(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mn,{children:"1000"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"/"}),(0,l.jsx)(e.mtext,{children:"\u6708"}),(0,l.jsx)(e.mo,{separator:"true",children:","})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"1000/\u6708, "})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord",children:"1000/"}),(0,l.jsx)(e.span,{className:"mord cjk_fallback",children:"\u6708"}),(0,l.jsx)(e.span,{className:"mpunct",children:","})]})})]}),"1.50/\u5C0F\u65F6"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["NVIDIA Tesla T4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.nvidia.com/en-us/data-center/tesla-t4/",children:"https://www.nvidia.com/en-us/data-center/tesla-t4/"})}),"\n",(0,l.jsx)(e.li,{children:"GCP - US$255.50/\u6708"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["NVIDIA Tesla L4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"GCP - US$408.83/\u6708"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Cloud TPU v5p $4.2/\u5C0F\u65F6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"459 TFLOP"}),"\n",(0,l.jsx)(e.li,{children:"HBM2e 95GB\u30012765 GBps"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Cloud TPU v5e $1.2/\u5C0F\u65F6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"bf16 197 TFLOP"}),"\n",(0,l.jsx)(e.li,{children:"int8 393 TFLOP"}),"\n",(0,l.jsx)(e.li,{children:"HBM2 16 GB\u3001819 GBps"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u963F\u91CC\u4E91 ecs.gn6v-c8g1.2xlarge - 16G V100 8 vCPU 32 GiB - \xa526/\u5C0F\u65F6"}),"\n",(0,l.jsx)(e.li,{children:"\u963F\u91CC\u4E91 ecs.gn6e-c12g1.3xlarge - 32G V100 12 vCPU 92 GiB - \xa520/\u5C0F\u65F6"}),"\n",(0,l.jsxs)(e.li,{children:["Linode 32 GB + RTX6000 GPUx1 - ",(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mn,{children:"1000"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"/"}),(0,l.jsx)(e.mtext,{children:"\u6708"}),(0,l.jsx)(e.mo,{separator:"true",children:","})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"1000/\u6708, "})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord",children:"1000/"}),(0,l.jsx)(e.span,{className:"mord cjk_fallback",children:"\u6708"}),(0,l.jsx)(e.span,{className:"mpunct",children:","})]})})]}),"1.50/\u5C0F\u65F6"]}),"\n",(0,l.jsx)(e.li,{children:"HBM - High Bandwidth Memory"}),"\n",(0,l.jsx)(e.li,{children:"DLSS - Deep Learning Super Sampling"}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.amd.com/en/products/specifications/graphics.html",children:"https://www.amd.com/en/products/specifications/graphics.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.linode.com/docs/products/compute/compute-instances/plans/choosing-a-plan/#gpu-instances",children:"https://www.linode.com/docs/products/compute/compute-instances/plans/choosing-a-plan/#gpu-instances"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.notebookcheck.net/M2-Max-38-Core-GPU-vs-NVIDIA-GeForce-RTX-4090-Laptop-GPU-vs-M2-Pro-16-Core-GPU_11574_11437_11570.247598.0.html",children:"Apple M2 Max 38-Core GPU vs NVIDIA GeForce RTX 4090 Laptop GPU"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://cloud.google.com/tpu/docs/system-architecture-tpu-vm",children:"https://cloud.google.com/tpu/docs/system-architecture-tpu-vm"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.nvidia.cn/studio/compare-gpus/",children:"https://www.nvidia.cn/studio/compare-gpus/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"nvidia-arch",children:"Nvidia Arch"}),"\n",(0,l.jsxs)(e.blockquote,{children:["\n",(0,l.jsx)(e.p,{children:"microarchitecture"}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"Pascal (2016) > Volta (2017) > Turing (2018) > Ampere (2020) > Hopper (2022) >= Ada Lovelace (2022)"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Pascal - 2016"}),"\n",(0,l.jsxs)(e.li,{children:["Volta - 2017, professional\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6838\u5FC3 80SM, 32 FP64+ 63 Int32 + 64 FP32 + 8 Tensor Cores/SM"}),"\n",(0,l.jsx)(e.li,{children:"\u7279\u70B9 NVLink 2.0, \u7B2C\u4E00\u4EE3 Tensor Cores"}),"\n",(0,l.jsx)(e.li,{children:"\u5236\u7A0B 12nm, 21.1B \u4EBF\u4E2A\u6676\u4F53\u7BA1"}),"\n",(0,l.jsx)(e.li,{children:"\u4EA7\u54C1 V1000TiTan V"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Turning - 2018, consumer\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6838\u5FC3 102\u6838\u5FC3,92SM, 64 FP32 + 64 INT32 + 8 Tensor Cores/SM"}),"\n",(0,l.jsx)(e.li,{children:"\u7279\u70B9 Tensor Core 2.0, \u7B2C\u4E00\u4EE3 RT Core"}),"\n",(0,l.jsx)(e.li,{children:"\u5236\u7A0B 12nm, 18.6B \u4EBF\u4E2A\u6676\u4F53\u7BA1"}),"\n",(0,l.jsx)(e.li,{children:"\u4EA7\u54C1 T4, 2080Ti, RTX 5000"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Ampere - 2020\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6838\u5FC3 108 SM, 64 FP32 + 64 INT32 + 4 Tensor Cores/SM"}),"\n",(0,l.jsx)(e.li,{children:"\u7279\u70B9 Tensor Core 3.0, RT Core 2.0, NVLink 3.0, MIG 1.0"}),"\n",(0,l.jsx)(e.li,{children:"\u5236\u7A0B 7nm, 28.3B \u4EBF\u4E2A\u6676\u4F53\u7BA1"}),"\n",(0,l.jsxs)(e.li,{children:["\u4EA7\u54C1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"A100, A800, A30"}),"\n",(0,l.jsx)(e.li,{children:"\u684C\u9762 GeForce RTX 30 series"}),"\n",(0,l.jsx)(e.li,{children:"\u4E13\u4E1A\u7EA7/\u5DE5\u4F5C\u7AD9 RTX A series"}),"\n",(0,l.jsx)(e.li,{children:"\u670D\u52A1\u5668/\u6570\u636E\u4E2D\u5FC3 A100"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Hopper - 2022, datacenter\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6838\u5FC3 132 SM, 128 FP32 + 64 INT32 + 64 FP64 + 4 Tensor Cores/SM"}),"\n",(0,l.jsx)(e.li,{children:"\u7279\u70B9 Tensor Core 4.0, NVLink 4.0, MIG 2.0"}),"\n",(0,l.jsx)(e.li,{children:"\u5236\u7A0B 4nm, 80B \u4EBF\u4E2A\u6676\u4F53\u7BA1"}),"\n",(0,l.jsxs)(e.li,{children:["\u4EA7\u54C1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Tesla H \u7CFB\u5217"}),"\n",(0,l.jsx)(e.li,{children:"H100, H800"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Ada Lovelace - 2022, consumer, professional\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4EA7\u54C1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u684C\u9762 GeForce RTX 40 \u7CFB\u5217"}),"\n",(0,l.jsx)(e.li,{children:"\u5DE5\u4F5C\u7AD9/\u4E13\u4E1A\u7EA7 RTX Ada Generation"}),"\n",(0,l.jsx)(e.li,{children:"\u670D\u52A1\u5668/\u6570\u636E\u4E2D\u5FC3 Tesla Ada (L4x)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Blackwell - 2024"}),"\n",(0,l.jsx)(e.li,{children:"Rubin - 2026"}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"nvidia-product-series",children:"Nvidia Product Series"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["consumer - \u6D88\u8D39\u7EA7\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Desktop - \u684C\u9762 - GeForce RTX 30"}),"\n",(0,l.jsx)(e.li,{children:"Professional/workstation - \u4E13\u4E1A\u7EA7/\u5DE5\u4F5C\u7AD9 - RTX A/Ada"}),"\n",(0,l.jsx)(e.li,{children:"Server/datacenter - \u670D\u52A1\u5668/\u6570\u636E\u4E2D\u5FC3 - A100"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"datacenter - \u6570\u636E\u4E2D\u5FC3 - Tesla H"}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u66F4\u4E13\u4E1A\u7684\u8BBE\u5907\u652F\u6301\u66F4\u591A\u7684\u7CBE\u5EA6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"CUDA - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16"}),"\n",(0,l.jsx)(e.li,{children:"Tensor - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16"}),"\n",(0,l.jsx)(e.li,{children:"FP32 - Tensor \u90FD\u6CA1\u6709\uFF0CCUDA \u90FD\u6709"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"sxm-vs-pcie",children:"SXM vs PCIe"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["SXM - Server eXternal Module\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E13\u6709\u63A5\u53E3\u3001\u66F4\u9AD8\u5E26\u5BBD\u3001\u66F4\u9AD8\u529F\u7387\u9650\u5236\u3001\u9AD8\u6548\u6563\u70ED\u8BBE\u8BA1"}),"\n",(0,l.jsx)(e.li,{children:"\u5E94\u7528\u573A\u666F - \u6570\u636E\u4E2D\u5FC3\u3001\u9AD8\u6027\u80FD\u8BA1\u7B97\u3001AI \u8BAD\u7EC3"}),"\n",(0,l.jsx)(e.li,{children:"\u5982 NVIDIA Tesla V100, A100"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["PCIe - Peripheral Component Interconnect Express\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u901A\u7528\u63A5\u53E3\u3001\u66F4\u5E7F\u6CDB\u7684\u5E94\u7528\u3001\u66F4\u591A\u7684\u8BBE\u5907\u652F\u6301"}),"\n",(0,l.jsx)(e.li,{children:"\u5E94\u7528\u573A\u666F - \u5DE5\u4F5C\u7AD9\u3001\u670D\u52A1\u5668\u3001\u684C\u9762"}),"\n",(0,l.jsx)(e.li,{children:"\u5982 NVIDIA GeForce, Quadro, Tesla"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"tensorflow-vs-pytorch",children:"TensorFlow vs PyTorch"}),"\n",(0,l.jsxs)(e.blockquote,{children:["\n",(0,l.jsx)(e.p,{children:"\u63A8\u8350 PyTorch"}),"\n"]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["TensorFlow\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5927\u578B\u5E94\u7528"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["PyTorch\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6613\u7528"}),"\n",(0,l.jsx)(e.li,{children:"\u5FEB\u901F\u539F\u578B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://opencv.org/blog/pytorch-vs-tensorflow/",children:"https://opencv.org/blog/pytorch-vs-tensorflow/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"vae-vs-gan",children:"VAE vs GAN"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["GAN\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"generator + discriminator"}),"\n",(0,l.jsx)(e.li,{children:"adversarial training"}),"\n",(0,l.jsx)(e.li,{children:"\u751F\u6210\u9AD8\u8D28\u91CF\u3001\u771F\u5B9E\u7684\u56FE\u7247\u3001\u6570\u636E"}),"\n",(0,l.jsx)(e.li,{children:"\u56FE\u7247\u751F\u6210\u3001\u56FE\u50CF\u5230\u56FE\u50CF\u7684\u8F6C\u6362\u3001\u8D85\u5206\u8FA8\u7387"}),"\n",(0,l.jsx)(e.li,{children:"\u5F31\u70B9: \u8BAD\u7EC3\u4E0D\u7A33\u5B9A\u3001\u6A21\u5F0F\u5D29\u6E83\u3001\u6A21\u5F0F\u574D\u584C\uFF1B\u9700\u8981\u5C0F\u5FC3\u7684\u8C03\u53C2"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["VAE\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"encoder + decoder, probabilistic framework"}),"\n",(0,l.jsx)(e.li,{children:"input data -> latent space - \u6F5C\u5728\u7A7A\u95F4/\u9690\u7A7A\u95F4 - \u538B\u7F29\u540E\u7684\u6570\u636E/PCA\u8868\u793A"}),"\n",(0,l.jsxs)(e.li,{children:["\u8BAD\u7EC3:\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F18\u5316\u4E00\u4E2A\u635F\u5931\u51FD\u6570\u6765\u8FDB\u884C\u8BAD\u7EC3\uFF0C\u8FD9\u4E2A\u635F\u5931\u51FD\u6570\u5305\u542B\u91CD\u6784\u635F\u5931\uFF08\u786E\u4FDD\u8F93\u51FA\u4E0E\u8F93\u5165\u76F8\u4F3C\uFF09\u548C\u6B63\u5219\u5316\u9879\uFF08\u786E\u4FDD\u6F5C\u5728\u7A7A\u95F4\u5177\u6709\u4E00\u5B9A\u7684\u7ED3\u6784\uFF0C\u901A\u5E38\u4E3A\u9AD8\u65AF\u5206\u5E03\uFF09\u3002"}),"\n",(0,l.jsx)(e.li,{children:"\u8FD9\u4E2A\u6B63\u5219\u5316\u9879\u4FC3\u4F7F\u6F5C\u5728\u7A7A\u95F4\u8FDE\u7EED\u4E14\u5E73\u6ED1\uFF0C\u4ECE\u800C\u4F7F\u5F97\u4ECE\u4E2D\u91C7\u6837\u65B0\u7684\u6570\u636E\u70B9\u53D8\u5F97\u5BB9\u6613\u3002"}),"\n",(0,l.jsx)(e.li,{children:"KL-divergence"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u4F18\u70B9: \u751F\u6210\u7684\u6570\u636E\u66F4\u52A0\u5E73\u6ED1\u3001\u8FDE\u7EED\uFF1B\u66F4\u5BB9\u6613\u8BAD\u7EC3\uFF1B\u66F4\u5BB9\u6613\u751F\u6210\u65B0\u6570\u636E"}),"\n",(0,l.jsx)(e.li,{children:"\u7F3A\u70B9: \u751F\u6210\u7684\u6570\u636E\u8D28\u91CF\u4E0D\u5982 GAN"}),"\n",(0,l.jsx)(e.li,{children:"reconstruction loss, regularization term"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.baeldung.com/cs/vae-vs-gan-image-generation",children:"https://www.baeldung.com/cs/vae-vs-gan-image-generation"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://towardsdatascience.com/understanding-variational-autoencoders-vaes-f70510919f73",children:"Understanding Variational Autoencoders"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"frames",children:"frames"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# -q:v 1-31 - 16 \u4E3A\u4E2D\u7B49\uFF0C1 \u4E3A\u6700\u597D\uFF0C31 \u4E3A\u6700\u5DEE\nffmpeg -i video.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 16 images/%d.jpg\n\n# \u63A8\u8350 - \u589E\u52A0\u89C6\u9891\u540D\u79F0\u524D\u7F00\uFF0C\u591A\u4E2A\u89C6\u9891\u53EF\u5408\u5E76\uFF0C\u8D28\u91CF\u8C03\u9AD8\u4E00\u70B9\nffmpeg -i v2.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 4 v2/v2-frame_%06d.jpg\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"10\u5206\u949F, 24fps, \u7EA6 14400 \u5F20"}),"\n",(0,l.jsx)(e.li,{children:"5\u4F4D\u6570\u5B57, 99999, 24fps, \u5927\u7EA6 70 \u5206\u949F"}),"\n",(0,l.jsx)(e.li,{children:"\u63A8\u8350 6 \u4F4D\u6570\u5B57, 999999, 24fps, \u5927\u7EA6 700 \u5206\u949F, 12 \u5C0F\u65F6"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/cvat-ai/cvat/issues/818",children:"https://github.com/cvat-ai/cvat/issues/818"})}),"\n"]}),"\n",(0,l.jsxs)(e.h2,{id:"importerror-cannot-import-name-packaging-from-pkg_resources-usrlocallibpython310dist-packagespkg_resourcesinitpy",children:["ImportError: cannot import name 'packaging' from 'pkg_resources' (/usr/local/lib/python3.10/dist-packages/pkg_resources/",(0,l.jsx)(e.strong,{children:"init"}),".py)"]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"setuptools 70 \u7684\u95EE\u9898"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"python -m pip install setuptools==69.5.1\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"ModuleNotFoundError: No module named 'setuptools'\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-toml",metastring:"title='pyproject.toml'",children:'[tool.poetry.dependencies]\nsetuptools = { version = "<70" }\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/15863#issuecomment-2125026282",children:"https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/15863#issuecomment-2125026282"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"modulenotfounderror-no-module-named-packaging",children:"ModuleNotFoundError: No module named 'packaging'"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pip install wheel\n"})}),"\n",(0,l.jsx)(e.h2,{id:"cannot-import-name-is_flash_attn_greater_or_equal_2_10-from-transformersutils",children:"cannot import name 'is_flash_attn_greater_or_equal_2_10' from 'transformers.utils'"}),"\n",(0,l.jsx)(e.h2,{id:"could-not-load-library-libcudnn_cnn_trainso8",children:"Could not load library libcudnn_cnn_train.so.8"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"/opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8"}),"\n",(0,l.jsx)(e.li,{children:"/opt/conda/lib/python3.10/site-packages/torch/lib"}),"\n",(0,l.jsx)(e.li,{children:"/usr/local/cuda/lib64"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"Could not load library libcudnn_cnn_train.so.8. Error: /usr/local/cuda/lib64/libcudnn_cnn_train.so.8: undefined symbol: _ZN5cudnn3cnn5infer22queryClusterPropertiesERPhS3_, version libcudnn_cnn_infer.so.8\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"ldd /opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8\nldd /usr/local/cuda/lib64/libcudnn_cnn_train.so.8\n\n# \u4FEE\u6539\u540E\u5C31\u53EF\u4EE5\u4E86\nLD_LIBRARY_PATH=/opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/:$LD_LIBRARY_PATH yolo\n\n#LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/conda/lib/python3.10/site-packages/torch/lib\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/pytorch/pytorch/issues/104591",children:"https://github.com/pytorch/pytorch/issues/104591"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"placeholder-shape-mismatches-expected-1-vs-got-tensordata-with-2240-at-dimidx--0",children:"Placeholder shape mismatches (expected 1 vs got tensorData with 2240) at dimIdx = 0"})]})}function x(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return r}});var s=i(75271);let l={},t=s.createContext(l);function r(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:r(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);