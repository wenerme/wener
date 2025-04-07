"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48069"],{6409:function(e,n,l){l.r(n),l.d(n,{metadata:()=>s,contentTitle:()=>c,default:()=>a,assets:()=>d,toc:()=>o,frontMatter:()=>t});var s=JSON.parse('{"id":"web/framework/svelte","title":"svelte","description":"- sveltejs/svelte","source":"@site/../notes/web/framework/svelte.md","sourceDirName":"web/framework","slug":"/web/framework/svelte","permalink":"/notes/web/framework/svelte","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/svelte.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1630662479000,"frontMatter":{"title":"svelte"},"sidebar":"docs","previous":{"title":"stencil","permalink":"/notes/web/framework/stencil"},"next":{"title":"taro","permalink":"/notes/web/framework/taro/"}}'),i=l("52676"),r=l("79938");let t={title:"svelte"},c="svelte",d={},o=[{value:"Rollup",id:"rollup",level:2},{value:"typescript",id:"typescript",level:2},{value:"@tsconfig/svelte",id:"tsconfigsvelte",level:2},{value:"\u8BED\u6CD5",id:"\u8BED\u6CD5",level:2}];function h(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"svelte",children:"svelte"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/sveltejs/svelte",children:"sveltejs/svelte"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u54CD\u5E94\u5F0F\u3001\u975E VDOM"}),"\n",(0,i.jsx)(n.li,{children:"\u6709\u70B9\u50CF React+Vue \u7684\u7ED3\u5408\u4F53"}),"\n",(0,i.jsxs)(n.li,{children:["\u65E0 Runtime - \u65E0\u4F9D\u8D56\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"bundle \u540E 11k - \u5DF2\u5305\u542B\u57FA\u7840 svelte \u7EC4\u4EF6"}),"\n",(0,i.jsx)(n.li,{children:"min \u540E 3k"}),"\n",(0,i.jsx)(n.li,{children:"svelte/internal \u53EF\u4EE5\u4F5C\u4E3A\u5916\u90E8\u4F9D\u8D56 - bundle - 9k, min -2k"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7C7B Vue\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5355\u6587\u4EF6\u6A21\u5F0F"}),"\n",(0,i.jsx)(n.li,{children:"\u4E8B\u4EF6\u5C5E\u6027\u7ED1\u5B9A\u65B9\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7C7B React\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u72B6\u6001\u5904\u7406"}),"\n",(0,i.jsx)(n.li,{children:"\u7C7B JSX \u8BED\u6CD5"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["compiler \u80FD\u529B\u975E\u5E38\u5F3A - \u5927\u90E8\u5206 svelte \u7684\u80FD\u529B\u662F\u7F16\u8BD1\u5668\u5E95\u5C42\u652F\u6301\u7684\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B9E\u9645\u4EE3\u7801\u987A\u5E8F\u4E0D\u4E00\u5B9A\u662F\u6267\u884C\u7684\u4EE3\u7801\u987A\u5E8F"}),"\n",(0,i.jsx)(n.li,{children:"\u8BED\u6CD5\u76F4\u89C2"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"\u5185\u7F6E\u72B6\u6001\u7BA1\u7406"}),"\n",(0,i.jsx)(n.li,{children:"\u5185\u7F6E motion \u5904\u7406 - tweend, spring"}),"\n",(0,i.jsx)(n.li,{children:"\u5185\u7F6E\u8F6C\u6362\u5904\u7406 - fade, fly, slide, crossfade"}),"\n",(0,i.jsx)(n.li,{children:"\u5185\u7F6E\u52A8\u753B - flip"}),"\n",(0,i.jsx)(n.li,{children:"CSS \u6837\u5F0F\u96C6\u6210\u5EA6\u5F88\u9AD8"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$:"})," label \u4F1A watch \u8BE5\u8BED\u53E5\u7528\u5230\u7684\u53D8\u91CF - \u53D8\u5316\u4F1A\u4ECE\u65B0\u6267\u884C - reactive - \u6838\u5FC3\u7279\u6027"]}),"\n",(0,i.jsxs)(n.li,{children:["\u652F\u6301 context \u6982\u5FF5 - ",(0,i.jsx)(n.code,{children:"setContext(key,{})"}),", ",(0,i.jsx)(n.code,{children:"getContext(key)"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u975E reactive - \u53EF\u4EE5\u5305\u542B store \u6765\u5B9E\u73B0"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u901A\u8FC7 ",(0,i.jsx)(n.code,{children:"export let prop"})," \u66B4\u9732\u7EC4\u4EF6\u5C5E\u6027"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/sveltejs/kit",children:"sveltejs/kit"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u7C7B\u4F3C NextJS \u4E4B\u4E8E React"}),"\n",(0,i.jsx)(n.li,{children:"\u5E95\u5C42\u57FA\u4E8E Vite"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/matyunya/smelte",children:"matyunya/smelte"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"material components + Tailwind CSS"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u96C6\u6210\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"webstorm \u6709 svelte \u63D2\u4EF6"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script>\n  $: name = 'world';\n<\/script>\n\n<input bind:value=\"{name}\" />\n<h1>Hello {name}!</h1>\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import App from './index.svelte';\n\n// \u6302\u8F7D\u5230 Dom\nnew App({\n  target: document.body,\n  props: {\n    name: 'Wener',\n  },\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# typescript check\nnpx svelte-check\n"})}),"\n",(0,i.jsx)(n.h2,{id:"rollup",children:"Rollup"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn add -D svelte rollup-plugin-svelte svelte-preprocess rollup rollup-plugin-terser @rollup/plugin-{typescript,node-resolve,commonjs}\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",metastring:'title="rollup.config.ts"',children:"import svelte from 'rollup-plugin-svelte';\nimport resolve from '@rollup/plugin-node-resolve';\nimport typescript from '@rollup/plugin-typescript';\nimport sveltePreprocess from 'svelte-preprocess';\nimport commonjs from '@rollup/plugin-commonjs';\nimport { terser } from 'rollup-plugin-terser';\n\nconst production = !process.env.ROLLUP_WATCH;\n\nexport default {\n  input: 'src/main.ts',\n  output: [\n    {\n      file: 'public/build/bundle.js',\n      format: 'iife',\n      name: 'app',\n      sourcemap: true,\n    },\n    {\n      file: 'public/build/bundle.min.js',\n      format: 'iife',\n      name: 'app',\n      sourcemap: true,\n      plugins: [terser()],\n    },\n  ],\n  // external:['svelte/internal'],\n  plugins: [\n    svelte({\n      preprocess: sveltePreprocess(),\n      include: 'src/**/*.svelte',\n    }),\n    resolve({ browser: true, dedupe: ['svelte'] }),\n    commonjs(),\n    typescript(),\n  ],\n};\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u66F4\u590D\u6742\u7684 ",(0,i.jsx)(n.a,{href:"https://github.com/sveltejs/language-tools/issues/161#issuecomment-642120838",children:"rollup.config"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"typescript",children:"typescript"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="src/typings/svelte.d.ts"',children:"declare module '*.svelte' {\n  const value: any;\n  export default value;\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"tsconfigsvelte",children:"@tsconfig/svelte"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/tsconfig/bases",children:"tsconfig/bases"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "$schema": "https://json.schemastore.org/tsconfig",\n  "display": "Svelte",\n  "_version": "2.0.0",\n\n  "compilerOptions": {\n    "moduleResolution": "node",\n    "target": "es2017",\n    /**\n      Svelte Preprocess cannot figure out whether you have a value or a type, so tell TypeScript\n      to enforce using `import type` instead of `import` for Types.\n     */\n    "importsNotUsedAsValues": "error",\n    "isolatedModules": true,\n    /**\n      To have warnings/errors of the Svelte compiler at the correct position,\n      enable source maps by default.\n     */\n    "sourceMap": true,\n\n    "strict": false,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"\u8BED\u6CD5",children:"\u8BED\u6CD5"}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["inline \u7684\u4E8B\u4EF6\u5904\u7406\u5199\u6210 string \u65B9\u5F0F - \u540C vue\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B98\u65B9\u4E0D\u6392\u65A5 inline \u4E8B\u4EF6\u5904\u7406 - \u7F16\u8BD1\u5668\u4F1A\u5904\u7406"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"inline style \u4E3A\u5B57\u7B26\u4E32 - \u800C\u4E0D\u662F react \u90A3\u6837\u7684\u5BF9\u8C61"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$"})," \u524D\u7F00\u53D8\u91CF\u4E3A\u8BA2\u9605 store \u7684\u53D8\u91CF - \u4E0D\u80FD\u81EA\u5DF1\u4F7F\u7528\u8BE5\u524D\u7F00\u53D8\u91CF"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$$"})," \u524D\u7F00\u4E3A\u5185\u7F6E\u7279\u6B8A\u53D8\u91CF - slot, props, restProps"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5C5E\u6027\u533A\u5206\u4E00\u822C\u5C5E\u6027\u548C dom - \u4F7F\u7528 slot - \u7C7B\u4F3C vue \u4E0D\u540C\u4E8E react\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u53EF\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"<svelte:component this={component}/>"})," \u4F20\u9012\u52A8\u6001\u7EC4\u4EF6"]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$:"})," \u8868\u793A\u72B6\u6001 reactive"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$<\u53D8\u91CF\u540D>"})," \u83B7\u53D6 reactive \u53D8\u91CF\u503C - \u7C7B\u4F3C\u8BA2\u9605\u72B6\u6001\u53D8\u5316"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$$props"})," \u6240\u6709 props"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$$restProps"})," \u5904\u7406\u5269\u4E0B\u7684 props"]}),"\n",(0,i.jsxs)(n.li,{children:["\u63A7\u5236\u6D41\u8BED\u6CD5 ",(0,i.jsx)(n.code,{children:"{#if }{:else}{/if}"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"if(:else), each, await(:then,:cache), key"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"{#each things as thing (thing.key)}"})," \u6DFB\u52A0 key \u7684\u65B9\u5F0F - key \u53EF\u4EE5\u4E3A\u6574\u4E2A\u5BF9\u8C61 - \u5185\u90E8\u4F7F\u7528 Map"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"{@html }"})," - \u6CE8\u5165 html \u5185\u5BB9"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"{@debug }"})," - console.log"]}),"\n",(0,i.jsxs)(n.li,{children:["on:eventname\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"forward \u4E8B\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["on:eventname={handler}\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4E8B\u4EF6\u53EF\u591A\u6B21\u76D1\u542C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["on:eventname|modifers={handler}\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"preventDefault"}),"\n",(0,i.jsx)(n.li,{children:"stopPropagation"}),"\n",(0,i.jsx)(n.li,{children:"passive"}),"\n",(0,i.jsx)(n.li,{children:"nonpassive"}),"\n",(0,i.jsx)(n.li,{children:"capture"}),"\n",(0,i.jsx)(n.li,{children:"once"}),"\n",(0,i.jsx)(n.li,{children:"self"}),"\n",(0,i.jsx)(n.li,{children:"trusted"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["bind:property={variable}\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"bind:value - \u76F4\u63A5\u7ED1\u5B9A value \u5230 value"}),"\n",(0,i.jsx)(n.li,{children:"bind:group={variable}"}),"\n",(0,i.jsx)(n.li,{children:"bind:this={dom_node}"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"class:name={value}"}),"\n",(0,i.jsx)(n.li,{children:"use:action"}),"\n",(0,i.jsxs)(n.li,{children:["use:action={parameters}\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u7ED1\u5B9A\u751F\u547D\u5468\u671F\u5230 action \u51FD\u6570\u8FD4\u56DE\u5BF9\u8C61"}),"\n",(0,i.jsx)(n.li,{children:"destroy"}),"\n",(0,i.jsx)(n.li,{children:"update"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["transition:fn\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"in/out:fn"}),"\n",(0,i.jsx)(n.li,{children:"in/out:fn={params}"}),"\n",(0,i.jsx)(n.li,{children:"in/out:fn|local"}),"\n",(0,i.jsxs)(n.li,{children:["in/out:fn|local={params}\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["fn\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"introstart"}),"\n",(0,i.jsx)(n.li,{children:"introend"}),"\n",(0,i.jsx)(n.li,{children:"outrostart"}),"\n",(0,i.jsx)(n.li,{children:"outroend"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"transition:fn={params}"}),"\n",(0,i.jsx)(n.li,{children:"transition:fn|local"}),"\n",(0,i.jsx)(n.li,{children:"transition:fn|local={params}"}),"\n",(0,i.jsx)(n.li,{children:"animate:name"}),"\n",(0,i.jsx)(n.li,{children:"animate:name={params}"}),"\n",(0,i.jsxs)(n.li,{children:['--style-props="anycssvalue"\n',(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4F20\u9012 css \u53D8\u91CF"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:'<slot name="" prop={value}>\x3c!-- optional fallback --\x3e</slot>'})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"$$slots"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<svelte:window on:keydown={handleKeydown}/>"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"body"}),"\n",(0,i.jsx)(n.li,{children:"head"}),"\n",(0,i.jsx)(n.li,{children:"options - compiler options"}),"\n",(0,i.jsx)(n.li,{children:"fragment"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7279\u6B8A\u7ED1\u5B9A\u5C5E\u6027\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"clientWidth, clientHeight, offsetWidth, offsetHeight"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u751F\u547D\u5468\u671F\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"onMount, onDestroy, beforeUpdate, afterUpdate"}),"\n",(0,i.jsx)(n.li,{children:"tick - resolve pendding state change"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["store - \u5168\u5C40\uFF0C\u7C7B\u4F3C ",(0,i.jsx)(n.a,{href:"https://github.com/pmndrs/zustand",children:"pmndrs/zustand"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u6784\u9020\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"writable"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"readable(initial,(set)=>{return ()=>{/*cleanup*/}})"})}),"\n",(0,i.jsx)(n.li,{children:"derived($store,selector)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u65B9\u6CD5\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"update, set, subscribe"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u8BED\u6CD5\u7CD6\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$count"})," - \u7B49\u540C\u4E8E\u9488\u5BF9 count store \u521B\u5EFA\u4E00\u4E2A\u53D8\u91CF ",(0,i.jsx)(n.code,{children:"$count"}),", \u5E76 subscribe \u66F4\u65B0"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7279\u6B8A\u5143\u7D20\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"slot"}),"\n",(0,i.jsx)(n.li,{children:"svelte:self - \u4F7F\u7528\u5F53\u524D\u7EC4\u4EF6 - \u7C7B\u4F3C\u9012\u5F52\u8C03\u7528 - \u56E0\u4E3A svelte \u7EC4\u4EF6\u6CA1\u6709\u540D\u5B57\uFF0C\u9700\u8981\u4F7F\u7528\u7279\u6B8A\u65B9\u6CD5\u5F15\u7528"}),"\n",(0,i.jsx)(n.li,{children:"svelte:component - \u52A8\u6001\u7EC4\u4EF6"}),"\n",(0,i.jsx)(n.li,{children:"svelte:window - \u76D1\u542C\u7A97\u53E3\u4E8B\u4EF6"}),"\n",(0,i.jsx)(n.li,{children:"svelte:body"}),"\n",(0,i.jsx)(n.li,{children:"svelte:head - \u6DFB\u52A0 \u989D\u5916 head \u5143\u7D20"}),"\n",(0,i.jsxs)(n.li,{children:["svelte:options - \u7F16\u8BD1\u5668\u9009\u9879\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"immutable"}),"\n",(0,i.jsx)(n.li,{children:"accessors"}),"\n",(0,i.jsx)(n.li,{children:"namespace"}),"\n",(0,i.jsx)(n.li,{children:"tag"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"svelte:fragment"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { onDestroy } from 'svelte';\n\nexport function onInterval(callback, milliseconds) {\n  const interval = setInterval(callback, milliseconds);\n\n  onDestroy(() => {\n    clearInterval(interval);\n  });\n}\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'\x3c!-- module \u7EF4\u5EA6\u4EE3\u7801 - \u7C7B\u4F3C react \u7EC4\u4EF6\u91CC\u7684\u5168\u5C40\u4EE3\u7801 --\x3e\n<script context="module">\n	let current;\n  export function stopAll(){}\n<\/script>\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-svelte",children:"\x3c!-- \u5F53 user \u53D8\u5316\u7684\u65F6\u5019\u89E6\u53D1 debugger --\x3e\n{@debug user}\n"})})]})}function a(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},79938:function(e,n,l){l.d(n,{Z:function(){return c},a:function(){return t}});var s=l(75271);let i={},r=s.createContext(i);function t(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);