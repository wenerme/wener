"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["16609"],{78613:function(n,e,l){l.r(e),l.d(e,{metadata:()=>r,contentTitle:()=>o,default:()=>u,assets:()=>c,toc:()=>d,frontMatter:()=>i});var r=JSON.parse('{"id":"web/dom/dom-event","title":"DOM Event","description":"- Phase - eventPhase","source":"@site/../notes/web/dom/dom-event.md","sourceDirName":"web/dom","slug":"/web/dom/event","permalink":"/notes/web/dom/event","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/dom/dom-event.md","tags":[{"inline":true,"label":"Event","permalink":"/notes/tags/event"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1726657654000,"frontMatter":{"tags":["Event"]},"sidebar":"docs","previous":{"title":"DOM","permalink":"/notes/web/dom/"},"next":{"title":"DOM FAQ","permalink":"/notes/web/dom/faq"}}'),s=l("52676"),t=l("79938");let i={tags:["Event"]},o="DOM Event",c={},d=[{value:"onClick vs onFocus",id:"onclick-vs-onfocus",level:2},{value:"focus",id:"focus",level:2},{value:"React.SyntheticEvent",id:"reactsyntheticevent",level:2}];function a(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"dom-event",children:"DOM Event"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Phase - eventPhase\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Event.CAPTURING_PHASE - 1 - \u6355\u83B7"}),"\n",(0,s.jsx)(e.li,{children:"Event.AT_TARGET - 2 - \u76EE\u6807"}),"\n",(0,s.jsx)(e.li,{children:"Event.BUBBLING_PHASE - 3 - \u5192\u6CE1"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u4E0D\u5192\u6CE1\u4E8B\u4EF6\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"mouseeneter"}),"\n",(0,s.jsx)(e.li,{children:"mouseleave"}),"\n",(0,s.jsx)(e.li,{children:"focus"}),"\n",(0,s.jsx)(e.li,{children:"blur"}),"\n",(0,s.jsx)(e.li,{children:"load, unload"}),"\n",(0,s.jsx)(e.li,{children:"scroll, resize, contextmenu, error"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u5192\u6CE1\u4E8B\u4EF6\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"focusin"}),"\n",(0,s.jsx)(e.li,{children:"focusout"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Mouse \u7684\u5750\u6807\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"x,y -> clientX, clientY"}),"\n",(0,s.jsxs)(e.li,{children:["clientX, clientY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u4E8E viewport"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["pageX, pageY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u4E8E document"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["offsetX, offsetY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u4E8E\u4E0A\u4E00\u6B21\u4E8B\u4EF6 clientX,clientY \u7684\u5750\u6807"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["screenX, screenY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u4E8E\u5C4F\u5E55"}),"\n",(0,s.jsx)(e.li,{children:"\u591A\u4E2A\u5C4F\u5E55\u7684\u65F6\u5019\u4F1A\u53E0\u52A0 - \u4E3B\u5C4F\u5E55\u7684 top,left \u4E3A 0,0"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["movementX, movementY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u76F8\u5BF9\u4E8E\u4E0A\u4E00\u6B21\u4E8B\u4EF6 screenX,screenY \u7684\u5750\u6807"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["layerX, layerY\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5305\u542B scroll \u7684\u5750\u6807"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["window.event\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5F53\u524D\u4E8B\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["react \u7684 focus & blur \u4F1A bubble\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u56E0\u6B64\u5B9E\u9645\u5E94\u8BE5\u7C7B\u4F3C onFocus -> onFocusIn, onBlur -> onFocusOut"}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/facebook/react/issues/6410#issuecomment-207064994",children:"facebook/react#6410"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"// if (e.pageX || pageY) -> MouseEvent\n// if (e.locale || location) -> KeyboardEvent\n\ninterface UIEvent {\n  /**\n   * \u5F53\u524D\u70B9\u51FB\u6570\n   * click,dbclick - n\n   * mousedown, mouseup - detail+1\n   */\n  readonly detail: number;\n  /**\n   * =document.defaultView\n   */\n  readonly view: Window | null;\n  /**\n   * keyCode \u7684 charCode\n   *\n   * @deprecated\n   */\n  readonly which: number;\n\n  /**\n   * \u8BBE\u5907\u64CD\u4F5C\u80FD\u529B\n   */\n  sourceCapabilities: InputDeviceCapabilities | null;\n}\n\n// Mouse \u548C Keyboard \u90FD\u6709\u7684\u5C5E\u6027\ninterface CommonEvent extends UIEvent {\n  /**\n   * Windows alt, macOS option\n   */\n  readonly altKey: boolean;\n  readonly ctrlKey: boolean;\n  /**\n   * Wdinwos \u229E Win, macOS \u2318 Command\n   */\n  readonly metaKey: boolean;\n  readonly shiftKey: boolean;\n}\n\ninterface KeyboardEvent extends CommonEvent {\n  /**\n   * \u5224\u65AD\u6309\u952E\u8F93\u5165\u4F4D\u7F6E - \u6807\u51C6\u3001\u5DE6\u3001\u53F3\u3001\u6570\u5B57\u952E\u76D8\u3001\u79FB\u52A8\u8BBE\u5907\u3001\u6447\u6746\n   */\n  readonly location: number;\n  readonly repeat: boolean;\n  readonly code: string;\n  /**\n   * \u5728 compositionstart \u548C compositionend \u4E4B\u95F4 - \u8F93\u5165\u6CD5\u6B63\u5728\u8F93\u5165\u7684\u8FC7\u7A0B\n   */\n  readonly isComposing: boolean;\n  readonly key: string;\n  /**\n   * @deprecated\n   */\n  readonly charCode: number;\n  /**\n   * @deprecated\n   */\n  readonly keyCode: number;\n}\ninterface MouseEvent extends CommonEvent {\n  /**\n   * 0 - main,left, 1 - auxiliary,middle, 2 - secondary,right\n   * 3 - back, 4 - forward\n   */\n  readonly button: number;\n  /**\n   * button \u7EC4\u5408\uFF0C\u4F7F\u7528 bit mask\n   */\n  readonly buttons: number;\n\n  readonly clientX: number;\n  readonly clientY: number;\n  /**\n   * \u975E\u6807\u51C6\u5C5E\u6027\uFF0C\u4F46\u6240\u6709\u6D4F\u89C8\u5668\u90FD\u652F\u6301\n   * \u503C\u4F1A\u8003\u8651 scrolling\n   */\n  readonly layerX: number;\n  readonly layerY: number;\n\n  readonly movementX: number;\n  readonly movementY: number;\n  readonly offsetX: number;\n  readonly offsetY: number;\n  readonly pageX: number;\n  readonly pageY: number;\n  readonly screenX: number;\n  readonly screenY: number;\n  readonly x: number;\n  readonly y: number;\n\n  // secondary target\n  // \u7528\u4E8E MouseEvent - \u4E0E target \u5BF9\u5E94\n  // \u4E8B\u4EF6: mouseenter, mouseleave, mouseout, mouseover, dragenter, dragleave\n  // mouseenter - \u8FDB\u5165 target \u9000\u51FA relatedTarget\n  // mouseleave - \u9000\u51FA target \u8FDB\u5165 relatedTarget\n  relatedTarget: EventTarget | null;\n}\n"})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"onclick-vs-onfocus",children:"onClick vs onFocus"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["onClick\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u7528\u6237\u70B9\u51FB"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["onFocus\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u53EF\u901A\u8FC7 .focus, ",(0,s.jsx)(e.code,{children:"Tab"}),", click \u7B49\u65B9\u5F0F\u89E6\u53D1"]}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u914D\u5408 tabIndex"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5148\u89E6\u53D1 onFocus \u518D\u89E6\u53D1 onClick"}),"\n"]}),"\n",(0,s.jsx)(e.h1,{id:"ondoubleclick",children:"onDoubleClick"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u4F1A\u5BFC\u81F4 click delay\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"80 - 100ms"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"focus",children:"focus"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"onFocus"}),"\n",(0,s.jsx)(e.li,{children:"onBlur"}),"\n",(0,s.jsx)(e.li,{children:"onFocusIn"}),"\n",(0,s.jsx)(e.li,{children:"onFocusOut"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"reactsyntheticevent",children:"React.SyntheticEvent"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u989D\u5916\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"isDefaultPrevented()"}),"\n",(0,s.jsx)(e.li,{children:"isPropagationStopped()"}),"\n",(0,s.jsxs)(e.li,{children:["persist()\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u5728\u4E8B\u4EF6\u7ED3\u675F\u540E\u8FD8\u80FD\u8BBF\u95EE\u4E8B\u4EF6\u5BF9\u8C61"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"isPersistent()"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"interface SyntheticEvent<E = object, C = any, T = any> {\n  nativeEvent: E;\n  currentTarget: C;\n  target: T;\n  bubbles: boolean;\n  cancelable: boolean;\n  defaultPrevented: boolean;\n  eventPhase: number;\n  isTrusted: boolean;\n  preventDefault(): void;\n  //\n  isDefaultPrevented(): boolean;\n  stopPropagation(): void;\n  isPropagationStopped(): boolean;\n  // ReactDOM v17 \u73B0\u5728\u65E0\u6548\n  persist(): void;\n  timeStamp: number;\n  type: string;\n}\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://legacy.reactjs.org/docs/events.html",children:"https://legacy.reactjs.org/docs/events.html"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://react.dev/reference/react-dom/components/common#react-event-object",children:"https://react.dev/reference/react-dom/components/common#react-event-object"})}),"\n"]})]})}function u(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return o},a:function(){return i}});var r=l(75271);let s={},t=r.createContext(s);function i(n){let e=r.useContext(t);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),r.createElement(t.Provider,{value:e},n.children)}}}]);