"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["60528"],{49808:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>x,assets:()=>o,toc:()=>d,frontMatter:()=>s});var r=JSON.parse('{"id":"ai/ocr/pix2text","title":"Pix2Text","description":"- breezedeus/Pix2Text","source":"@site/../notes/ai/ocr/pix2text.md","sourceDirName":"ai/ocr","slug":"/ai/ocr/pix2text","permalink":"/notes/ai/ocr/pix2text","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ocr/pix2text.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1740927882000,"frontMatter":{"title":"Pix2Text"},"sidebar":"docs","previous":{"title":"OCR Awesome","permalink":"/notes/ai/ocr/awesome"},"next":{"title":"surya","permalink":"/notes/ai/ocr/surya"}}'),l=i("52676"),t=i("79938");let s={title:"Pix2Text"},c="Pix2Text",o={},d=[{value:"Notes",id:"notes",level:2},{value:"table-rec",id:"table-rec",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"pix2text",children:"Pix2Text"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/breezedeus/Pix2Text",children:"breezedeus/Pix2Text"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"MIT"}),"\n",(0,l.jsx)(n.li,{children:"\u56FD\u5185\u5F00\u53D1\u8005\u7EF4\u62A4"}),"\n",(0,l.jsx)(n.li,{children:"\u7B80\u4F53\u4E2D\u6587&\u82F1\u6587 \u4F7F\u7528\u7684 CnOCR, \u5176\u4ED6\u4F7F\u7528\u7684 EasyOCR"}),"\n",(0,l.jsxs)(n.li,{children:["p2t \u547D\u4EE4\u884C ",(0,l.jsx)(n.a,{href:"https://pix2text.readthedocs.io/zh-cn/stable/command/",children:"https://pix2text.readthedocs.io/zh-cn/stable/command/"})]}),"\n",(0,l.jsxs)(n.li,{children:["macOS \u684C\u9762\u5DE5\u5177 ",(0,l.jsx)(n.a,{href:"https://github.com/breezedeus/Pix2Text-Mac",children:"breezedeus/Pix2Text-Mac"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://huggingface.co/breezedeus/pix2text-layout-docyolo",children:"breezedeus/pix2text-layout-docyolo"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u57FA\u4E8E ",(0,l.jsx)(n.a,{href:"https://github.com/opendatalab/DocLayout-YOLO",children:"https://github.com/opendatalab/DocLayout-YOLO"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://huggingface.co/breezedeus/pix2text-mfd",children:"breezedeus/pix2text-mfd"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u6570\u5B66\u516C\u5F0F\u68C0\u6D4B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://huggingface.co/breezedeus/pix2text-mfr",children:"breezedeus/pix2text-mfr"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u6570\u5B66\u516C\u5F0F\u8BC6\u522B"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["reshape\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"224"}),"\n",(0,l.jsx)(n.li,{children:"512"}),"\n",(0,l.jsx)(n.li,{children:"768"}),"\n",(0,l.jsx)(n.li,{children:"1024"}),"\n",(0,l.jsx)(n.li,{children:"1536"}),"\n",(0,l.jsx)(n.li,{children:"2048"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"caution",children:(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["table-ocr \u53EF\u80FD\u4F1A\u9519\u8BEF\u7684\u8BC6\u522B\u51FA table spanning cell\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5BFC\u81F4\u4E00\u5217\u5C11\u4E86\u5185\u5BB9"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'# \u76EE\u524D\u6700\u9AD8\u53EA\u652F\u6301 Python 3.12\n# CnSTD>=1.2.1, CnOCR>=2.2.2.1, transformers>=4.37.0\n# pip install pix2text[multilingual] # \u591A\u8BED\u8A00 - \u9664\u4E86 \u7B80\u4F53\u4E2D\u6587\u548C\u82F1\u6587\u4EE5\u5916\npip install pix2text -i https://mirrors.aliyun.com/pypi/simple\n\n# for GPU\npip uninstall onnxruntime\npip install onnxruntime-gpu\n\n# --file-type [pdf|page|text_formula|formula|text]\n# -i, --img-file-or-dir TEXT\np2t predict \\\n  -l en,ch_sim --disable-formula --enable-table \\\n  --resized-shape 768 \\\n  --file-type pdf \\\n  -i docs/examples/test-doc.pdf \\\n  -o output-md \\\n  --save-debug-res output-debug\n\n# \u542F\u52A8 HTTP \u670D\u52A1\np2t serve -l en,ch_sim -H 0.0.0.0 -p 8503\n\ncurl -X POST \\\n  -F "file_type=page" \\\n  -F "resized_shape=768" \\\n  -F "embed_sep= $,$ " \\\n  -F "isolated_sep=$$\\n, \\n$$" \\\n  -F "image=@docs/examples/page2.png;type=image/jpeg" \\\n  http://0.0.0.0:8503/pix2text\n'})}),"\n",(0,l.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Pix2Text\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"#from_config(total_configs:{layout,text_formula,table},enable_table,enable_formula)"}),"\n",(0,l.jsx)(n.li,{children:"recognize"}),"\n",(0,l.jsx)(n.li,{children:"recognize_pdf"}),"\n",(0,l.jsx)(n.li,{children:"recognize_page"}),"\n",(0,l.jsx)(n.li,{children:"recognize_text"}),"\n",(0,l.jsx)(n.li,{children:"recognize_text_formula"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["TableOCR\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"recognize(out_cells,out_objects,out_html,out_csv,out_markdown)"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'AutoModelForObjectDetection.from_pretrained("$HOME/.pix2text/1.1/table-ocr")'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["DocYoloLayoutParser\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"layout \u8BC6\u522B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["LayoutLMv3LayoutParser\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4E4B\u524D\u7684 layout \u8BC6\u522B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6570\u636E\u76EE\u5F55 - data_dir(), root - PIX2TEXT_HOME=$HOME/.pix2text\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["model \u76EE\u5F55 ",(0,l.jsx)(n.code,{children:"data_dir()/MODEL_VERSION"})," \u4F8B\u5982 ",(0,l.jsx)(n.code,{children:"~/.pix2text/1.1"})]}),"\n",(0,l.jsx)(n.li,{children:"layout-docyolo/"}),"\n",(0,l.jsx)(n.li,{children:"mfd-onnx/"}),"\n",(0,l.jsx)(n.li,{children:"mfr-onnx/"}),"\n",(0,l.jsx)(n.li,{children:"table-rec/"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["~/.cnstd - ",(0,l.jsx)(n.a,{href:"https://github.com/breezedeus/CnSTD",children:"breezedeus/CnSTD"})," - \u57FA\u4E8E RapidOCR \u96C6\u6210 PPOCRv4\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"CN STD - \u4E2D\u6587\u6587\u672C\u68C0\u6D4B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["~/.cnocr - ",(0,l.jsx)(n.a,{href:"https://github.com/breezedeus/CnOCR",children:"breezedeus/CnOCR"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"CN OCR - \u4E2D\u6587\u6587\u672C\u8BC6\u522B"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"PIX2TEXT_DOWNLOAD_SOURCE=HF"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-python",children:"from torchvision import transforms\n\n# TableOCR \u7684\u8F93\u5165\u5904\u7406\nstructure_transform = transforms.Compose(\n    [\n        MaxResize(1000),\n        transforms.ToTensor(),\n        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),\n    ]\n)\n"})}),"\n",(0,l.jsx)(n.h2,{id:"table-rec",children:"table-rec"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u8868\u683C\u7ED3\u6784\u8BC6\u522B"}),"\n",(0,l.jsxs)(n.li,{children:["\u6A21\u578B ",(0,l.jsx)(n.a,{href:"https://huggingface.co/breezedeus/pix2text-table-rec",children:"breezedeus/pix2text-table-rec"})]}),"\n",(0,l.jsxs)(n.li,{children:["fork ",(0,l.jsx)(n.a,{href:"https://huggingface.co/microsoft/table-transformer-structure-recognition-v1.1-all",children:"microsoft/table-transformer-structure-recognition-v1.1-all"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u26A0\uFE0F \u6A21\u578B\u5B8C\u5168\u76F8\u540C\uFF0C\u53EA\u662F fork \u4E86\u4ED3\u5E93"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"TATR - Table Transformer"}),"\n",(0,l.jsxs)(n.li,{children:["classes\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"table"}),"\n",(0,l.jsx)(n.li,{children:"table column"}),"\n",(0,l.jsx)(n.li,{children:"table row"}),"\n",(0,l.jsx)(n.li,{children:"table column header"}),"\n",(0,l.jsx)(n.li,{children:"table projected row header"}),"\n",(0,l.jsx)(n.li,{children:"table spanning cell"}),"\n",(0,l.jsx)(n.li,{children:"no object"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Table Transformer (TATR) ",(0,l.jsx)(n.a,{href:"https://github.com/microsoft/table-transformer",children:"microsoft/table-transformer"})]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://huggingface.co/microsoft/table-transformer-structure-recognition",children:"https://huggingface.co/microsoft/table-transformer-structure-recognition"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h1,{id:"cn-ocr",children:"CN OCR"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# pip install cnocr[ort-gpu]\npip install cnocr[ort-cpu] -i https://mirrors.aliyun.com/pypi/simple\n"})})]})}function x(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return s}});var r=i(75271);let l={},t=r.createContext(l);function s(e){let n=r.useContext(t);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);