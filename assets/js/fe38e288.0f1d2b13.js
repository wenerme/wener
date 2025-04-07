"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["61670"],{22712:function(e,n,r){r.r(n),r.d(n,{metadata:()=>l,contentTitle:()=>a,default:()=>h,assets:()=>d,toc:()=>c,frontMatter:()=>i});var l=JSON.parse('{"id":"web/script/js/js-io","title":"IO","description":"- File, Blob, FileReader, ArrayBuffer, URL.createObjectURL","source":"@site/../notes/web/script/js/js-io.md","sourceDirName":"web/script/js","slug":"/web/script/js/io","permalink":"/notes/web/script/js/io","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/script/js/js-io.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1725247213000,"frontMatter":{"title":"IO"},"sidebar":"docs","previous":{"title":"Intl","permalink":"/notes/web/script/js/intl"},"next":{"title":"ESM","permalink":"/notes/web/script/js/module"}}'),s=r("52676"),t=r("79938");let i={title:"IO"},a="JavaScript IO",d={},c=[{value:"Stream",id:"stream",level:2},{value:"Stream to ReadableStream",id:"stream-to-readablestream",level:2},{value:"ReadableStream to Buffer",id:"readablestream-to-buffer",level:2},{value:"ReadableStream to String",id:"readablestream-to-string",level:2},{value:"Buffer to ReadableStream",id:"buffer-to-readablestream",level:2},{value:"multipart/form-data \u5E8F\u5217\u5316\u4E3A\u5B57\u7B26\u4E32",id:"multipartform-data-\u5E8F\u5217\u5316\u4E3A\u5B57\u7B26\u4E32",level:2},{value:"data url to Blob",id:"data-url-to-blob",level:2},{value:"application/x-www-form-urlencoded",id:"applicationx-www-form-urlencoded",level:2},{value:"NodeJS",id:"nodejs",level:2},{value:"TextEncoder byteOffset",id:"textencoder-byteoffset",level:2},{value:"BufferSource vs ArrayBuffer",id:"buffersource-vs-arraybuffer",level:2}];function o(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"javascript-io",children:"JavaScript IO"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface Blob {\n  readonly size: number;\n  readonly type: string;\n  arrayBuffer(): Promise<ArrayBuffer>;\n  slice(start?: number, end?: number, contentType?: string): Blob;\n  stream(): ReadableStream<Uint8Array>;\n  text(): Promise<string>;\n}\n\ninterface File extends Blob {\n  readonly lastModified: number;\n  readonly name: string;\n  readonly webkitRelativePath: string;\n}\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["File, Blob, FileReader, ArrayBuffer, URL.createObjectURL\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Chrome 76+, NodeJS 16+"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"BigInt - Chrome 67, Firefox 68, Safari 14"}),"\n",(0,s.jsx)(n.li,{children:"Buffer - NodeJS - \u4E3A Uint8Array"}),"\n",(0,s.jsxs)(n.li,{children:["SharedArrayBuffer\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u7528\u4E8E\u5171\u4EAB\u5185\u5B58\uFF0C\u4F46\u4E0D\u662F transferable"}),"\n",(0,s.jsx)(n.li,{children:"WebAssembly.Memory"}),"\n",(0,s.jsx)(n.li,{children:"WebGLRenderingContext.bufferData()"}),"\n",(0,s.jsx)(n.li,{children:"WebGLRenderingContext.bufferSubData()"}),"\n",(0,s.jsx)(n.li,{children:"WebGL2RenderingContext.getBufferSubData()"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Blob - \u4E0D\u53EF\u53D8\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u7C7B\u4F3C\u6587\u4EF6 - \u53EF\u7528\u4E8E\u5904\u7406"}),"\n",(0,s.jsx)(n.li,{children:"\u53EF\u8F6C\u4E3A ReadableStream"}),"\n",(0,s.jsx)(n.li,{children:"File \u57FA\u4E8E Blob"}),"\n",(0,s.jsx)(n.li,{children:"arrayBuffer() -> ArrayBuffer"}),"\n",(0,s.jsx)(n.li,{children:"stream() -> ReadableStream"}),"\n",(0,s.jsx)(n.li,{children:"text() -> string"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"URL.createObjectURL(blob)"})}),"\n",(0,s.jsx)(n.li,{children:"FileReader \u53EF\u8BFB\u53D6 Blob"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"new Response(blob)"})," - \u53EF\u7528\u4E8E\u6784\u9020 Response"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u64CD\u4F5C\u5904\u7406\u76F8\u5173"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Atomics\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u539F\u5B50\u5316\u64CD\u4F5C SharedArrayBuffer, ArrayBuffer"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["ArrayBufferView - ",(0,s.jsx)(n.code,{children:"ArrayBuffer.isView"})," - \u5E38\u89C1\u7684\u63A5\u53E3\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"buffer"}),"\n",(0,s.jsx)(n.li,{children:"byteLength"}),"\n",(0,s.jsx)(n.li,{children:"byteOffset"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["DataView\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u63D0\u4F9B\u64CD\u4F5C ",(0,s.jsx)(n.code,{children:"{get,set}{BigInt,BigUint,Float,Int,Uint}{32,64,8}"})]}),"\n",(0,s.jsx)(n.li,{children:"\u652F\u6301 endian \u8BBE\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["TypedArray\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Uint8Array"}),"\n",(0,s.jsx)(n.li,{children:"Uint8ClampedArray"}),"\n",(0,s.jsx)(n.li,{children:"Uint16Array"}),"\n",(0,s.jsx)(n.li,{children:"Uint32Array"}),"\n",(0,s.jsx)(n.li,{children:"Int8Array"}),"\n",(0,s.jsx)(n.li,{children:"Int16Array"}),"\n",(0,s.jsx)(n.li,{children:"Int32Array"}),"\n",(0,s.jsx)(n.li,{children:"BigUint64Array"}),"\n",(0,s.jsx)(n.li,{children:"BigInt64Array"}),"\n",(0,s.jsx)(n.li,{children:"Float32Array"}),"\n",(0,s.jsx)(n.li,{children:"Float64Array"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects",children:"TransferableObject"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u53EF\u5728 Worker \u4E4B\u95F4\u4F20\u9012 - \u5185\u5B58\u5171\u4EAB"}),"\n",(0,s.jsx)(n.li,{children:"ArrayBuffer"}),"\n",(0,s.jsx)(n.li,{children:"MessagePort"}),"\n",(0,s.jsx)(n.li,{children:"ReadableStream"}),"\n",(0,s.jsx)(n.li,{children:"WritableStream"}),"\n",(0,s.jsx)(n.li,{children:"TransformStream"}),"\n",(0,s.jsx)(n.li,{children:"AudioData"}),"\n",(0,s.jsx)(n.li,{children:"ImageBitmap"}),"\n",(0,s.jsx)(n.li,{children:"VideoFrame"}),"\n",(0,s.jsx)(n.li,{children:"OffscreenCanvas"}),"\n",(0,s.jsx)(n.li,{children:"RTCDataChannel"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["TextDecoder, TextEncoder, TextDecoderStream, TextEncoderStream\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"UTF8 \u7F16\u7801\u89E3\u7801"}),"\n",(0,s.jsx)(n.li,{children:"Encoder \u53EA\u652F\u6301 UTF-8"}),"\n",(0,s.jsx)(n.li,{children:"\u89E3\u7801\u652F\u6301 UTF-8, ISO-8859-2, KOI8-R, GBK"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"new TextDecoder('windows-1251')"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://w3c.github.io/FileAPI/",children:"https://w3c.github.io/FileAPI/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://encoding.spec.whatwg.org/",children:"https://encoding.spec.whatwg.org/"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/sindresorhus/file-type",children:"sindresorhus/file-type"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Detect the file type of a Buffer/Uint8Array/ArrayBuffer"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"stream",children:"Stream"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"\u5904\u7406\u5927\u6587\u4EF6"}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Streams/WebStream - ",(0,s.jsx)(n.code,{children:"node:stream/web"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"ReadableStream"}),"\n",(0,s.jsx)(n.li,{children:"WritableStream"}),"\n",(0,s.jsx)(n.li,{children:"TransformStream"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://streams.spec.whatwg.org/",children:"https://streams.spec.whatwg.org/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://nodejs.org/api/webstreams.html",children:"https://nodejs.org/api/webstreams.html"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://nodejs.org/api/stream.html",children:"https://nodejs.org/api/stream.html"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/lovell/sharp/issues/179",children:"lovell/sharp#179"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"stream-to-readablestream",children:"Stream to ReadableStream"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Readable.toWeb"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"readablestream-to-buffer",children:"ReadableStream to Buffer"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"async function readStreamToBuffer(rs) {\n  const reader = rs.getReader();\n  const chunks = [];\n  while (true) {\n    const { done, value } = await reader.read();\n    if (done) break;\n    chunks.push(value);\n  }\n  return Buffer.concat(chunks);\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"readablestream-to-string",children:"ReadableStream to String"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"async function readStreamToString(rs) {\n  const reader = rs.getReader();\n  const decoder = new TextDecoder();\n  const chunks = [];\n  while (true) {\n    const { done, value } = await reader.read();\n    if (done) break;\n    chunks.push(decoder.decode(value));\n  }\n  return chunks.join('');\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"buffer-to-readablestream",children:"Buffer to ReadableStream"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function bufferToStream(buffer) {\n  return new ReadableStream({\n    start(controller) {\n      controller.enqueue(buffer);\n      controller.close();\n    },\n  });\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"multipartform-data-\u5E8F\u5217\u5316\u4E3A\u5B57\u7B26\u4E32",children:"multipart/form-data \u5E8F\u5217\u5316\u4E3A\u5B57\u7B26\u4E32"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function formDataToString(formData) {\n  const r = new Request('http://127.0.0.1', { method: 'POST', body: formData });\n  return readStreamToString(r.body);\n}\n\nconst data = new FormData();\ndata.append('a', '1');\ndata.append('file', new Blob([new Uint8Array([97, 98, 99, 100])], { type: 'application/octet-stream' }), 'c.bin');\nconsole.log(await formDataToString(data));\n\n// FormData \u4F5C\u4E3A Response\nconst fd = await new Response(data).formData();\nconsole.log(Object.fromEntries(fd.entries()));\n"})}),"\n",(0,s.jsx)(n.h2,{id:"data-url-to-blob",children:"data url to Blob"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const blob = await fetch(\n  'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',\n).then((r) => r.blob());\n\nconst url = URL.createObjectURL(blob);\nwindow.open(url);\n"})}),"\n",(0,s.jsx)(n.h2,{id:"applicationx-www-form-urlencoded",children:"application/x-www-form-urlencoded"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const p = new URLSearchParams({ b: 2, a: 1 });\np.sort();\np.toString();\n"})}),"\n",(0,s.jsx)(n.h2,{id:"nodejs",children:"NodeJS"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"NodeJS \u6CA1\u6709 mmap"}),"\n",(0,s.jsx)(n.li,{children:"fs.readFile \u4F1A\u5C06\u6574\u4E2A\u6587\u4EF6\u52A0\u8F7D\u5230\u5185\u5B58"}),"\n",(0,s.jsx)(n.li,{children:"fs.open \u80FD\u6253\u5F00 URL"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Stream"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"fs.ReadStream extends stream.Readable implements NodeJS.ReadableStream"}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"textencoder-byteoffset",children:"TextEncoder byteOffset"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"NodeJS \u5FFD\u7565 byteOffset"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"var buf = new Uint8Array(new TextEncoder().encode('wrong hello').buffer, 6);\nconsole.assert(new TextDecoder().decode(buf) === 'hello', 'should be hello');\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/anonyco/FastestSmallestTextEncoderDecoder/issues/17",children:"https://github.com/anonyco/FastestSmallestTextEncoderDecoder/issues/17"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"buffersource-vs-arraybuffer",children:"BufferSource vs ArrayBuffer"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"Helper types for ArrayBufferView and related Typed Arrays."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"/**\n * Allowed ArrayBuffer types for the buffer of an ArrayBufferView and related Typed Arrays.\n */\ninterface ArrayBufferTypes {\n  ArrayBuffer: ArrayBuffer;\n}\ntype ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];\n\ntype BufferSource = ArrayBufferView | ArrayBuffer;\n\ntype BinaryData = ArrayBuffer | ArrayBufferView;\n\ntype AllowSharedBufferSource = ArrayBuffer | ArrayBufferView;\n"})})]})}function h(e={}){let{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return a},a:function(){return i}});var l=r(75271);let s={},t=l.createContext(s);function i(e){let n=l.useContext(t);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);