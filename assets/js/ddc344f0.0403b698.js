"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["80724"],{95504:function(e,n,o){o.r(n),o.d(n,{metadata:()=>s,contentTitle:()=>a,default:()=>h,assets:()=>l,toc:()=>c,frontMatter:()=>i});var s=JSON.parse('{"id":"web/ui/storybook","title":"Storybook","description":"- nextjs/examples/with-storybook","source":"@site/../notes/web/ui/storybook.md","sourceDirName":"web/ui","slug":"/web/ui/storybook","permalink":"/notes/web/ui/storybook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/ui/storybook.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1720762271000,"frontMatter":{"title":"Storybook"},"sidebar":"docs","previous":{"title":"Playroom","permalink":"/notes/web/ui/playroom"},"next":{"title":"svgr","permalink":"/notes/web/ui/svgr"}}'),t=o("52676"),r=o("79938");let i={title:"Storybook"},a="Storybook",l={},c=[{value:"\u914D\u7F6E",id:"configuration",level:2},{value:"docs",id:"docs",level:2},{value:"Meta",id:"meta",level:2},{value:"Invariant failed: No matching indexer found for Loaders.stories.mdx",id:"invariant-failed-no-matching-indexer-found-for-loadersstoriesmdx",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"storybook",children:"Storybook"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/zeit/next.js/tree/canary/examples/with-storybook",children:"nextjs/examples/with-storybook"})}),"\n",(0,t.jsxs)(n.li,{children:["\u63D2\u4EF6 - ",(0,t.jsx)(n.a,{href:"https://github.com/storybookjs/storybook/tree/next/addons",children:"addons"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"actions - \u7EAA\u5F55\u4E8B\u4EF6"}),"\n",(0,t.jsx)(n.li,{children:"links - \u5185\u90E8\u8DF3\u8F6C"}),"\n",(0,t.jsx)(n.li,{children:"storysource - \u67E5\u770B\u6E90\u7801"}),"\n",(0,t.jsx)(n.li,{children:"viewport - \u4E0D\u540C\u8BBE\u5907\u89C6\u56FE"}),"\n",(0,t.jsx)(n.li,{children:"toolbars - \u5DE5\u5177\u680F\u3001\u4E0A\u4E0B\u6587\u53C2\u6570"}),"\n",(0,t.jsxs)(n.li,{children:["docs - \u751F\u6210\u6587\u6863\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4E0D\u652F\u6301\u5916\u90E8\u5E93 ",(0,t.jsx)(n.a,{href:"https://github.com/storybookjs/storybook/issues/10034",children:"#10034"})]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/reactjs/react-docgen/issues/416",children:"reactjs/react-docgen#416"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"essentials - actions, backgrounds, controls, docs, measure, outline, toolbars, viewport"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u95EE\u9898\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["bundle \u8FC7\u5927 - ",(0,t.jsx)(n.a,{href:"https://github.com/storybookjs/storybook/issues/6391#issuecomment-530262331",children:"#6391"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"webpack \u62C6\u5206"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["npm 7+react 17 \u517C\u5BB9\u95EE\u9898 ",(0,t.jsx)(n.a,{href:"https://github.com/storybookjs/storybook/issues/14065",children:"#14065"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Component Story Format (CSF) - Storybook\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://storybook.js.org/docs/react/api/csf",children:"https://storybook.js.org/docs/react/api/csf"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u521D\u59CB\u5316\nnpx sb init\n\n# \u624B\u52A8\u5B89\u88C5\nnpm add -D @storybook/{react,addons,testing-library,builder-vite,react-vite}\n# knob\nnpm add -D @storybook/addon-{actions,links,essential,interactions}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"\u914D\u7F6E"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:".storybook/manager.js - \u63A7\u5236 StoryBook UI"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",metastring:'title=".storybook/preview.js"',children:"// \u5168\u5C40\u6837\u5F0F\nimport '../src/styles/globals.css';\n\nexport const parameters = {\n  actions: { argTypesRegex: '^on[A-Z].*' },\n  controls: {\n    matchers: {\n      color: /(background|color)$/i,\n      date: /Date$/,\n    },\n  },\n\n  // \u5168\u5C40\u53C2\u6570\n  backgrounds: {\n    values: [\n      { name: 'red', value: '#f00' },\n      { name: 'green', value: '#0f0' },\n    ],\n  },\n};\n\nimport React from 'react';\n\nexport const decorators = [\n  (Story) => (\n    <div style={{ margin: '3em' }}>\n      <Story />\n    </div>\n  ),\n];\n\nexport const globalTypes = {};\n"})}),"\n",(0,t.jsx)(n.h2,{id:"docs",children:"docs"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6240\u6709 stories \u90FD\u4F1A\u751F\u6210 DocsPage"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { Meta } from '@storybook/addon-docs';\nimport Changelog from '../CHANGELOG.md';\n\n<Meta title=\"Changelog\" />\n\n<Changelog />\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"\u9690\u85CF Docs"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"export default {\n  title: 'YourTitle',\n  parameters: {\n    previewTabs: {\n      'storybook/docs/panel': { hidden: true },\n    },\n    viewMode: 'canvas',\n  },\n};\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"\u9ED8\u8BA4 Docs"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"export default {\n  title: 'YourTitle',\n  parameters: {\n    previewTabs: {\n      canvas: { hidden: true },\n    },\n    viewMode: 'docs',\n  },\n};\n"})}),"\n",(0,t.jsx)(n.h2,{id:"meta",children:"Meta"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export\nconst meta = {\n  title: 'Example/Button',\n  component: Button,\n  parameters: {\n    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout\n    layout: 'centered',\n  },\n  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs\n  tags: ['autodocs'],\n  // More on argTypes: https://storybook.js.org/docs/api/argtypes\n  argTypes: {\n    backgroundColor: { control: 'color' },\n  },\n} satisfies Meta<typeof Button>;\n\nexport default meta;\ntype Story = StoryObj<typeof meta>;\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"invariant-failed-no-matching-indexer-found-for-loadersstoriesmdx",children:"Invariant failed: No matching indexer found for Loaders.stories.mdx"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Loaders.stories.mdx"})," -> ",(0,t.jsx)(n.code,{children:"Loaders.mdx"})]}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,o){o.d(n,{Z:function(){return a},a:function(){return i}});var s=o(75271);let t={},r=s.createContext(t);function i(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);