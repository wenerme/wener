"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["51673"],{1809:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>o,default:()=>h,assets:()=>c,toc:()=>d,frontMatter:()=>l});var s=JSON.parse('{"id":"web/react/react-faq","title":"React FAQ","description":"- memo \u7EC4\u4EF6\u4E0D\u80FD\u63A5\u53D7\u4E0D\u4E86 Context \u66F4\u65B0","source":"@site/../notes/web/react/react-faq.md","sourceDirName":"web/react","slug":"/web/react/faq","permalink":"/notes/web/react/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/react/react-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731048203000,"frontMatter":{"title":"React FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"ReactDOM","permalink":"/notes/web/react/dom"},"next":{"title":"react-flow","permalink":"/notes/web/react/flow"}}'),r=t("52676"),i=t("79938");let l={title:"React FAQ",tags:["FAQ"]},o="React FAQ",c={},d=[{value:"\u5982\u4F55\u8BBE\u8BA1\u7EC4\u4EF6",id:"\u5982\u4F55\u8BBE\u8BA1\u7EC4\u4EF6",level:2},{value:"React Context",id:"react-context",level:2},{value:"forwardRef Typescript \u6DFB\u52A0\u9759\u6001\u5C5E\u6027",id:"forwardref-typescript-\u6DFB\u52A0\u9759\u6001\u5C5E\u6027",level:2},{value:"StrictMode",id:"strictmode",level:2},{value:"useEffect \u65E0\u4F9D\u8D56 vs. \u76F4\u63A5\u6267\u884C",id:"useeffect-\u65E0\u4F9D\u8D56-vs-\u76F4\u63A5\u6267\u884C",level:2},{value:"\u5982\u4F55\u9009\u62E9\u8FD0\u884C\u65F6\u6846\u67B6",id:"\u5982\u4F55\u9009\u62E9\u8FD0\u884C\u65F6\u6846\u67B6",level:2},{value:"React Class Components vs Function Components",id:"react-class-components-vs-function-components",level:2},{value:"shouldComponentUpdate for Function component",id:"shouldcomponentupdate-for-function-component",level:2},{value:"Cannot update a component while rendering a different component",id:"cannot-update-a-component-while-rendering-a-different-component",level:2},{value:"\u4E0A\u4E0B\u6587\u53D8\u5316\u4F46\u4E0D\u4ECE\u65B0\u6E32\u67D3",id:"\u4E0A\u4E0B\u6587\u53D8\u5316\u4F46\u4E0D\u4ECE\u65B0\u6E32\u67D3",level:2},{value:"\u52A8\u6001\u52A0\u8F7D script",id:"\u52A8\u6001\u52A0\u8F7D-script",level:2},{value:"iframe",id:"iframe",level:2},{value:"CSS in JS",id:"css-in-js",level:2},{value:"\u88AB\u6CE8\u5165 canvas",id:"\u88AB\u6CE8\u5165-canvas",level:2},{value:"Cannot assign to read only property &#39;_status&#39; of object",id:"cannot-assign-to-read-only-property-_status-of-object",level:2},{value:"Typescript \u7C7B\u578B",id:"typescript-\u7C7B\u578B",level:2},{value:"\u7A7A\u5185\u5BB9",id:"\u7A7A\u5185\u5BB9",level:2},{value:"TypeError: Cannot read properties of null (reading &#39;useRef&#39;)",id:"typeerror-cannot-read-properties-of-null-reading-useref",level:2},{value:"Typescript",id:"typescript",level:2},{value:"ref props",id:"ref-props",level:2},{value:"as props",id:"as-props",level:2},{value:"Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.",id:"error-maximum-update-depth-exceeded-this-can-happen-when-a-component-repeatedly-calls-setstate-inside-componentwillupdate-or-componentdidupdate-react-limits-the-number-of-nested-updates-to-prevent-infinite-loops",level:2},{value:"registry",id:"registry",level:2},{value:"NotFoundError: Failed to execute &#39;removeChild&#39; on &#39;Node&#39;: The node to be removed is not a child of this node.",id:"notfounderror-failed-to-execute-removechild-on-node-the-node-to-be-removed-is-not-a-child-of-this-node",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"react-faq",children:"React FAQ"})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["memo \u7EC4\u4EF6\u4E0D\u80FD\u63A5\u53D7\u4E0D\u4E86 Context \u66F4\u65B0\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["RFC ",(0,r.jsx)(n.a,{href:"https://github.com/reactjs/rfcs/pull/119",children:"useContextSelector"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/dai-shi/use-context-selector",children:"use-context-selector"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsx)(n.h2,{id:"\u5982\u4F55\u8BBE\u8BA1\u7EC4\u4EF6",children:"\u5982\u4F55\u8BBE\u8BA1\u7EC4\u4EF6"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u9762\u5411\u7EC4\u4EF6\u8BBE\u8BA1 - \u7EC4\u4EF6\u9A71\u52A8\u5F00\u53D1"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["CSF - Component Story Format\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/ComponentDriven/csf",children:"https://github.com/ComponentDriven/csf"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://storybook.js.org/docs/react/api/csf/",children:"https://storybook.js.org/docs/react/api/csf/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.componentdriven.org/",children:"https://www.componentdriven.org/"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["How to be Component Driven\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Build one component at a time - Avatar, Button, Input, Tooltip"}),"\n",(0,r.jsx)(n.li,{children:"Combine components - Form, Header, List, Table"}),"\n",(0,r.jsx)(n.li,{children:"Assemble pages - Home page, Settings page, Profile page"}),"\n",(0,r.jsx)(n.li,{children:"Integrate pages into your project - Web app, Marketing site, Docs site"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"react-context",children:"React Context"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Context.Provider value \u4FEE\u6539\u9700\u8981 rerender \u7EC4\u4EF6"}),"\n",(0,r.jsx)(n.li,{children:"\u4E00\u822C Provider \u90FD\u5728\u6BD4\u8F83\u4E0A\u5C42\uFF0C\u56E0\u6B64\u53EF\u80FD\u4F1A\u6709\u6027\u80FD\u95EE\u9898"}),"\n",(0,r.jsxs)(n.li,{children:["\u4F7F\u7528\u4E0D\u4F1A\u53D8\u7684 value\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4E0D\u5C06\u72B6\u6001\u5185\u5BB9\u4F5C\u4E3A value"}),"\n",(0,r.jsx)(n.li,{children:"\u4F8B\u5982 \u4F7F\u7528 rxjs BehaviorSubject \u4F5C\u4E3A value \u5219\u53EF\u4EE5\u907F\u514D\u53D8\u5316\uFF0C\u4E5F\u80FD\u8BA2\u9605\u53D8\u5316"}),"\n",(0,r.jsx)(n.li,{children:"\u53EF\u4F7F\u7528 zustand \u66FF\u4EE3"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"forwardref-typescript-\u6DFB\u52A0\u9759\u6001\u5C5E\u6027",children:"forwardRef Typescript \u6DFB\u52A0\u9759\u6001\u5C5E\u6027"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"assign"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"const Layout = forwardRef(() => {\n  return null;\n});\nLayout.displayName = 'MainLayout';\n// \u6DFB\u52A0\u9759\u6001\u5C5E\u6027\uFF0CTS \u4E0D\u4F1A\u51FA\u9519\nexport const MainLayout = Object.assign(Layout, { Slot });\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"\u5B9A\u4E49\u5C5E\u6027"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"export type Props = {};\n\nexport interface CompoundedComponent\n  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>> {\n  yourStaticFunctionOrSomethingLikeThat: () => void;\n}\n\nconst Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => (\n  <input ref={ref} {...props} />\n)) as CompoundedComponent;\n\nComponent.yourStaticFunctionOrSomethingLikeThat = () => {};\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Compound Components"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-894053907",children:"https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-894053907"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"strictmode",children:"StrictMode"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u5728 dev \u65F6\u6E32\u67D3\u4E24\u6B21\u6765\u68C0\u6D4B\u6F5C\u5728\u95EE\u9898 - Detecting unexpected side effects\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"constructor"}),"\n",(0,r.jsx)(n.li,{children:"componentWillMount (or UNSAFE_componentWillMount)"}),"\n",(0,r.jsx)(n.li,{children:"componentWillReceiveProps (or UNSAFE_componentWillReceiveProps)"}),"\n",(0,r.jsx)(n.li,{children:"componentWillUpdate (or UNSAFE_componentWillUpdate)"}),"\n",(0,r.jsx)(n.li,{children:"getDerivedStateFromProps"}),"\n",(0,r.jsx)(n.li,{children:"shouldComponentUpdate"}),"\n",(0,r.jsx)(n.li,{children:"render"}),"\n",(0,r.jsx)(n.li,{children:"setState"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Ensuring reusable state - \u6A21\u62DF umount\u3001remount\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"componentDidMount"}),"\n",(0,r.jsx)(n.li,{children:"componentWillUnmount"}),"\n",(0,r.jsx)(n.li,{children:"useEffect"}),"\n",(0,r.jsx)(n.li,{children:"useLayoutEffect"}),"\n",(0,r.jsx)(n.li,{children:"useInsertionEffect"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://reactjs.org/docs/strict-mode.html",children:"https://reactjs.org/docs/strict-mode.html"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"useeffect-\u65E0\u4F9D\u8D56-vs-\u76F4\u63A5\u6267\u884C",children:"useEffect \u65E0\u4F9D\u8D56 vs. \u76F4\u63A5\u6267\u884C"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const callbackRef = useRef(callback);\n\n// 1. useEffect\nuseEffect(() => {\n  callbackRef.current = callback;\n});\n\n// 2. \u76F4\u63A5\u8D4B\u503C\ncallbackRef.current = callback;\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u6267\u884C\u65F6\u673A\u4E0D\u540C\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["useEffect \u548C\u5176\u4ED6 useEffect \u662F\u987A\u5E8F\u6267\u884C\u7684\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u53EF\u80FD\u4F1A\u5EF6\u8FDF\u6267\u884C"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u76F4\u63A5\u8D4B\u503C\u4F1A\u5728\u6700\u5F00\u59CB\u6267\u884C\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5FC5\u7136\u4F1A\u6267\u884C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u5982\u4F55\u9009\u62E9\u8FD0\u884C\u65F6\u6846\u67B6",children:"\u5982\u4F55\u9009\u62E9\u8FD0\u884C\u65F6\u6846\u67B6"}),"\n",(0,r.jsx)(n.p,{children:"\u6700\u65E9\u7684 React \u5F00\u53D1\u4E00\u822C\u4F7F\u7528 CRA\uFF0C\u4F46 CRA \u57FA\u4E8E webpack\uFF0C\u5F02\u5E38\u7684\u6162\uFF0C\u5728 2021 \u5E74\u4E0D\u518D\u503C\u5F97\u4F7F\u7528\u3002"}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u9009\u62E9\u4F9D\u636E\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u5355\u9875\u9762 - vite, nextjs\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u590D\u6742\u524D\u7AEF"}),"\n",(0,r.jsx)(n.li,{children:"\u52A8\u6001\u6A21\u5757 - systemjs, dynamic import, esm"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u591A\u9875\u9762 - vite, nextjs, remix\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u652F\u6301\u591A\u9875\u9762 export"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5355 HTML \u5165\u53E3 vs. \u591A HTML \u5165\u53E3\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"vitejs \u652F\u6301 \u591A HTMl \u5165\u53E3"}),"\n",(0,r.jsx)(n.li,{children:"nextjs \u53EA\u652F\u6301 \u5355 HTML \u5165\u53E3"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u9700\u8981 SEO/SSR - nextjs, remix"}),"\n",(0,r.jsx)(n.li,{children:"\u5168\u6808 - nextjs, remix"}),"\n",(0,r.jsxs)(n.li,{children:["\u8DEF\u7531\u7C7B\u578B\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5BA2\u6237\u7AEF\u63A7\u5236 - SPA - vite"}),"\n",(0,r.jsx)(n.li,{children:"\u670D\u52A1\u7AEF\u63A7\u5236 - nextjs, remix"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u7F51\u7AD9\u5185\u5BB9\u7C7B\u578B\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7BA1\u7406\u540E\u53F0 - \u5355\u9875\u3001\u590D\u6742\u3001CS \u4EA4\u4E92"}),"\n",(0,r.jsx)(n.li,{children:"\u8425\u9500 - SEO\u3001\u9759\u6001\u3001\u589E\u91CF"}),"\n",(0,r.jsx)(n.li,{children:"\u7535\u5546 - \u6570\u636E\u3001SEO\u3001\u9759\u6001"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u90E8\u7F72\u65B9\u5F0F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u9759\u6001 - \u9700\u8981\u5BFC\u51FA"}),"\n",(0,r.jsxs)(n.li,{children:["\u52A8\u6001 - \u542F\u52A8\u670D\u52A1\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u90E8\u7F72 NodeJS \u4F1A\u6BD4\u8F83\u9EBB\u70E6 - node_modules \u5F88\u5927"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Serverless"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u73B0\u5728 CS \u6DF7\u5408\u6E32\u67D3\u8D8A\u6765\u8D8A\u591A\uFF0C\u503C\u5F97\u5C1D\u8BD5"}),"\n",(0,r.jsxs)(n.li,{children:["React Server Components \u4E5F\u662F\u4E00\u4E2A\u8D8B\u52BF\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7EC4\u5EFA\u7EA7\u52A8\u6001"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"react-class-components-vs-function-components",children:"React Class Components vs Function Components"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",metastring:'title="React.Component"',children:"import React from 'react';\n\nclass Hello extends React.Component<{ name: string }, { name: string }> {\n  static props = {\n    name: 'Wener',\n  };\n\n  static getDerivedStateFromProps({ name }) {\n    return { name };\n  }\n\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    return <h1>Hello, {this.state.name}</h1>;\n  }\n\n  componentDidMount() {\n    console.debug(`componentDidMount`);\n  }\n\n  getSnapshotBeforeUpdate(prevProps: Readonly<{ name: string }>, prevState: Readonly<{ name: string }>): any {\n    return {};\n  }\n\n  componentDidUpdate(prevProps: Readonly<{ name: string }>, prevState: Readonly<{ name: string }>, snapshot?: any) {\n    console.debug(`componentDidUpdate`);\n  }\n\n  componentWillUnmount() {\n    console.debug(`componentWillUnmount`);\n  }\n\n  shouldComponentUpdate(\n    nextProps: Readonly<{ name: string }>,\n    nextState: Readonly<{ name: string }>,\n    nextContext: any,\n  ): boolean {\n    return false;\n  }\n\n  /**\n   * ErrorBoundary - \u4EC5 ClassComponent \u652F\u6301\n   */\n  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {\n    console.log(`componentDidCatch`);\n  }\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",metastring:'title="React.FC"',children:"const HelloFC: React.FC<{ name: string }> = ({ name }) => {\n  const [state, setState] = useState({ name });\n  // getDerivedStateFromProps\n  useEffect(() => {\n    setState({ name });\n  }, [name]);\n  useEffect(() => {\n    console.debug('componentDidMount');\n    return () => {\n      console.debug('componentWillUnmount');\n    };\n  }, []);\n\n  // render\n  return (\n    <h1>\n      Hello, <input value={state.name} onChange={(e) => setState({ name: e.target.name })} />\n    </h1>\n  );\n};\nHelloFC.displayName = 'HelloFC';\nHelloFC.defaultProps = { name: 'Wener' };\n\nconst HelloMemo = React.memo(HelloFC, (a, b) => {\n  // shouldComponentUpdate\n  return a.name === b.name;\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"shouldcomponentupdate-for-function-component",children:"shouldComponentUpdate for Function component"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"const HelloMemo = React.memo(HelloFC, (a, b) => {\n  // shouldComponentUpdate\n  return a.name === b.name;\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"cannot-update-a-component-while-rendering-a-different-component",children:"Cannot update a component while rendering a different component"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u907F\u514D render \u9636\u6BB5\u4FEE\u6539\u72B6\u6001"}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/facebookexperimental/Recoil/issues/12",children:"facebookexperimental/Recoil#12"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// from\nif (storeRef.current && !isEqual(preloadRef.current, props)) {\n  console.debug(`DashboardStoreProvider: update preload`);\n  preloadRef.current = props;\n  storeRef.current.setState(props as any);\n}\n\n// to\nuseDeepCompareEffect(() => {\n  if (storeRef.current) {\n    storeRef.current.setState(props as any);\n  }\n}, [props]);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u4E0A\u4E0B\u6587\u53D8\u5316\u4F46\u4E0D\u4ECE\u65B0\u6E32\u67D3",children:"\u4E0A\u4E0B\u6587\u53D8\u5316\u4F46\u4E0D\u4ECE\u65B0\u6E32\u67D3"}),"\n",(0,r.jsxs)(n.ol,{start:"0",children:["\n",(0,r.jsx)(n.li,{children:"\u4F7F\u7528\u80FD\u591F selector \u7684\u72B6\u6001\u7BA1\u7406\u5E93 - \u5141\u8BB8\u8BFB\u53D6\u90E8\u5206\u72B6\u6001"}),"\n",(0,r.jsx)(n.li,{children:"\u4F7F\u7528\u80FD\u533A\u5206 read \u548C write \u7684\u5E93 - \u5141\u8BB8\u72EC\u7ACB\u66F4\u65B0"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/facebook/react/issues/15156#issuecomment-474590693",children:"Preventing rerenders with React.memo and useContext hook"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u62C6\u5206\u5927\u5BF9\u8C61\u4E0A\u4E0B\u6587 - \u907F\u514D\u76F4\u63A5\u4FEE\u6539\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u533A\u5206\u5E38\u53D8\u5316\u7684\u4E0A\u4E0B\u6587\u548C\u4E0D\u5E38\u53D8\u5316\u7684\u4E0A\u4E0B\u6587"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u62C6\u5206\u7EC4\u4EF6\uFF0C\u4F7F\u7528 memo hoc \u7EC4\u4EF6\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7EC4\u4EF6\u907F\u514D\u4E0D\u5FC5\u8981\u5237\u65B0"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5355\u4E2A\u7EC4\u4EF6\uFF0C\u4F7F\u7528 useMemo \u6784\u5EFA\u7EC4\u4EF6\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u903B\u8F91\u6784\u5EFA\u4E0D\u5237\u65B0\u7EC4\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u5EFA\u8BAE\u4E0D\u7528 context \u6765\u4F20\u9012\u6570\u636E\uFF0C\u4F7F\u7528\u8BA2\u9605"}),"\n",(0,r.jsxs)(n.li,{children:["RFC ",(0,r.jsx)(n.a,{href:"https://github.com/reactjs/rfcs/pull/119",children:"useContextSelector"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/dai-shi/use-context-selector",children:"use-context-selector"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode",children:"Will this React global state work in Concurrent Mode?"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u52A8\u6001\u52A0\u8F7D-script",children:"\u52A8\u6001\u52A0\u8F7D script"}),"\n",(0,r.jsx)(n.p,{children:"react-helmet, next/head \u652F\u6301 script \u6807\u7B7E\uFF0C\u4F46\u65E0\u6CD5\u68C0\u6D4B\u72B6\u6001\u3002\nreact-helmet \u53EF\u4EE5\u652F\u6301\u4E00\u4E2A onChangeClientState \u6765\u68C0\u6D4B\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u53EF\u4EE5\u8003\u8651 ",(0,r.jsx)(n.a,{href:"https://usehooks.com/useScript/",children:"useScript"})," \u81EA\u884C\u5C01\u88C5\u4E00\u4E2A\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"iframe",children:"iframe"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"class A extends React.Component {\n  render() {\n    return <iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />;\n  }\n}\nclass B extends React.Component {\n  render() {\n    return <div dangerouslySetInnerHTML={{ __html: \"<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />\" }} />;\n  }\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"css-in-js",children:"CSS in JS"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"\u52A8\u6001\u6CE8\u5165 CSS"}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"styled, jsx"}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"\u9884\u5B9A\u4E49 Class"}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"tailwind"}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsx)(n.li,{children:"\u52A8\u6001 Class \u6CE8\u5165 CSS"}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/tw-in-js/twind",children:"tw-in-js/twind"})}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://blog.replit.com/rui-eng",children:"Implementing RUI, Replit's Design System"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u88AB\u6CE8\u5165-canvas",children:"\u88AB\u6CE8\u5165 canvas"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<html style="overflow:hidden" lang="en">\n  <canvas\n    style="inset: 0px; pointer-events: none; position: fixed; z-index: 1000000000;"\n    width="1920"\n    height="514"\n  ></canvas>\n  <head></head>\n</html>\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7531 React Developer Tools \u6CE8\u5165"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"cannot-assign-to-read-only-property-_status-of-object",children:"Cannot assign to read only property '_status' of object"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u53EF\u80FD React.lazy \u5BFC\u81F4"}),"\n",(0,r.jsx)(n.li,{children:"\u53EF\u80FD \u9690\u85CF\u4E86\u5B9E\u9645\u5F02\u5E38"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"typescript-\u7C7B\u578B",children:"Typescript \u7C7B\u578B"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"React.JSX.Element"}),"\n",(0,r.jsx)(n.li,{children:"ReactElement"}),"\n",(0,r.jsx)(n.li,{children:"React.Element"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7A7A\u5185\u5BB9",children:"\u7A7A\u5185\u5BB9"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["React.Element\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"<React.Fragment />"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"<></>"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["ReactNode\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"false, null, undefined, true"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"typeerror-cannot-read-properties-of-null-reading-useref",children:"TypeError: Cannot read properties of null (reading 'useRef')"}),"\n",(0,r.jsx)(n.h2,{id:"typescript",children:"Typescript"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"React.ButtonHTMLAttributes<HTMLButtonElement>;\nReact.HTMLProps<HTMLButtonElement>; // \u7C7B\u578B\u8303\u56F4\u88AB\u6269\u5927\uFF0C\u4F8B\u5982 button \u7684 type \u53D8\u6210 string\nReact.HTMLAttributes<HTMLDivElement>; // -> AllHTMLAttributes\nReact.ComponentProps<'div'>; // =ComponentPropsWithRef -> React.JSX.IntrinsicElements\nReact.ComponentPropsWithoutRef<'div'>; // \u63A8\u8350\u7528\u6CD5\nReact.ComponentPropsWithRef<'div'>; //  \u5982\u679C\u9700\u8981 forward\n\nReact.JSX.IntrinsicElements['button'];\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["HTMLProps\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5305\u542B\u66F4\u591A\u7684\u5185\u5BB9\uFF0C\u4F8B\u5982 ref"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/typescript-cheatsheets/react",children:"https://github.com/typescript-cheatsheets/react"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/patterns_by_usecase.md",children:"https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/patterns_by_usecase.md"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"ref-props",children:"ref props"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5C06 ref \u4F5C\u4E3A props \u800C\u4E0D\u662F\u7279\u6B8A\u7684 forwardRef"}),"\n",(0,r.jsx)(n.li,{children:"React 19 \u9ED8\u8BA4\u884C\u4E3A"}),"\n",(0,r.jsx)(n.li,{children:"\u652F\u6301\u8FD9\u6837\u7528"}),"\n",(0,r.jsxs)(n.li,{children:["\u9057\u7559\u95EE\u9898 - ref \u53EF\u80FD\u9700\u8981\u7279\u6B8A\u5904\u7406\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["class component\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"ref \u6307\u5411 class instance"}),"\n",(0,r.jsx)(n.li,{children:"2019 \u540E\u63A8\u8350\u4F7F\u7528\u51FD\u6570\u5199\u7EC4\u5EFA"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"HOC"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"\u90E8\u5206\u573A\u666F\u5B58\u5728 introspect ref \u5E76\u505A\u5408\u5E76\u4FEE\u6539"}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.youtube.com/watch?v=m4QbeS9BTNU",children:"https://www.youtube.com/watch?v=m4QbeS9BTNU"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"as-props",children:"as props"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u7528\u4E8E\u6307\u5B9A\u7EC4\u4EF6\u7C7B\u578B"}),"\n",(0,r.jsxs)(n.li,{children:["\u7C7B\u4F3C\u7684 asChild - \u4E0D\u6E32\u67D3\u7EC4\u4EF6\uFF0C\u53EA\u4F20\u9012 props\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4E5F\u53EF\u4EE5\u8BA4\u4E3A\u662F as=Fragment"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"error-maximum-update-depth-exceeded-this-can-happen-when-a-component-repeatedly-calls-setstate-inside-componentwillupdate-or-componentdidupdate-react-limits-the-number-of-nested-updates-to-prevent-infinite-loops",children:"Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."}),"\n",(0,r.jsx)(n.h2,{id:"registry",children:"registry"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"addReact('YourComponentName', YourComponent);\ndefine('YourComponentName', componentBlueprint);\ngetDefinition('YourComponentName');\ngetInstance('YourComponentName', componentID);\nisDefined('YourComponentName');\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.manageiq.org/docs/guides/ui/register_react_component",children:"https://www.manageiq.org/docs/guides/ui/register_react_component"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/ryansolid/component-register",children:"https://github.com/ryansolid/component-register"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.builder.io/c/docs/custom-components-setup",children:"https://www.builder.io/c/docs/custom-components-setup"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/microsoft/fluentui/tree/master/packages/fluentui/react-component-nesting-registry",children:"https://github.com/microsoft/fluentui/tree/master/packages/fluentui/react-component-nesting-registry"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/lmerotta-zz/react-plugins",children:"https://github.com/lmerotta-zz/react-plugins"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"notfounderror-failed-to-execute-removechild-on-node-the-node-to-be-removed-is-not-a-child-of-this-node",children:"NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u66FF\u4EE3 Fragment \u4E3A div"}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return l}});var s=t(75271);let r={},i=s.createContext(r);function l(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);