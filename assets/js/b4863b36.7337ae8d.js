"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73861"],{4242:function(n,e,t){t.r(e),t.d(e,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>d,toc:()=>a,frontMatter:()=>o});var r=JSON.parse('{"id":"web/editor/tiptap/tiptap-extension","title":"Tiptap Extension","description":"- \u7C7B\u578B","source":"@site/../notes/web/editor/tiptap/tiptap-extension.md","sourceDirName":"web/editor/tiptap","slug":"/web/editor/tiptap/extension","permalink":"/notes/web/editor/tiptap/extension","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/editor/tiptap/tiptap-extension.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1704307832000,"frontMatter":{"title":"Tiptap Extension"},"sidebar":"docs","previous":{"title":"tiptap","permalink":"/notes/web/editor/tiptap/"},"next":{"title":"Tiptap Inside","permalink":"/notes/web/editor/tiptap/inside"}}'),i=t("52676"),s=t("79938");let o={title:"Tiptap Extension"},l="Tiptap Extension",d={},a=[{value:"Editor",id:"editor",level:2},{value:"Node vs Mark",id:"node-vs-mark",level:2}];function c(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"tiptap-extension",children:"Tiptap Extension"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u7C7B\u578B\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Node.create - \u589E\u52A0 Node"}),"\n",(0,i.jsx)(e.li,{children:"Mark.create - \u589E\u52A0 Mark"}),"\n",(0,i.jsx)(e.li,{children:"Extension.create - \u589E\u52A0 \u6269\u5C55\u73B0\u6709 Node\u3001Mark"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u6269\u5C55 Schema - NodeSpec, MarkSpec\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"extendMarkSchema"}),"\n",(0,i.jsx)(e.li,{children:"extendNodeSchema"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"editor",children:"Editor"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Node + Mark \u7EC4\u6210 ProseMirror \u7684 Schema"}),"\n",(0,i.jsxs)(e.li,{children:["\u65B9\u6CD5\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["chain - \u4E00\u6B21\u6027\u6267\u884C\u591A\u4E2A commands\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5728\u4E00\u6B21 tx \u91CC"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["can - \u5224\u65AD command \u80FD\u5426\u81EA\u4FE1\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u4E0D\u4F1A\u4F20\u9012 dispatch"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"getHTML, getJSON, getText"}),"\n",(0,i.jsx)(e.li,{children:"getAttributes"}),"\n",(0,i.jsx)(e.li,{children:"isActive - \u68C0\u67E5\u9009\u4E2D\u5185\u5BB9\u662F\u5426\u5339\u914D\u6761\u4EF6"}),"\n",(0,i.jsx)(e.li,{children:"registerPlugin, unregisterPlugin"}),"\n",(0,i.jsx)(e.li,{children:"setOptions, setEditable"}),"\n",(0,i.jsx)(e.li,{children:"destroy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u5C5E\u6027\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["commands - \u6240\u6709\u547D\u4EE4\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"focus - focus Editor"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"storage - \u63D2\u4EF6\u989D\u5916\u4FE1\u606F\u5B58\u50A8"}),"\n",(0,i.jsx)(e.li,{children:"state - \u72B6\u6001\u5B58\u50A8"}),"\n",(0,i.jsx)(e.li,{children:"isEditable"}),"\n",(0,i.jsx)(e.li,{children:"isEmpty"}),"\n",(0,i.jsx)(e.li,{children:"isDestroyed"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u4E8B\u4EF6\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"beforeCreate, creaate"}),"\n",(0,i.jsx)(e.li,{children:"update"}),"\n",(0,i.jsx)(e.li,{children:"selectionUpdate"}),"\n",(0,i.jsx)(e.li,{children:"transaction"}),"\n",(0,i.jsx)(e.li,{children:"focus, blur"}),"\n",(0,i.jsx)(e.li,{children:"destroy"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"node-vs-mark",children:"Node vs Mark"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Node\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"block \u5143\u7D20"}),"\n",(0,i.jsx)(e.li,{children:"tag \u6807\u7B7E"}),"\n",(0,i.jsx)(e.li,{children:"atom \u4E3A\u4E0D\u53EF\u76F4\u63A5\u7F16\u8F91 Node - \u4F8B\u5982 Mention"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Mark\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"node \u7684\u5C5E\u6027"}),"\n",(0,i.jsx)(e.li,{children:"tag \u5C5E\u6027\u3001\u6837\u5F0F"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ts",children:"const MyNode = Node.create({\n  name: 'my-node',\n  content: 'block+', // \u5141\u8BB8\u5185\u5BB9 - +,*,?,|,()\n  group: 'block', // node \u5206\u7EC4\n  inline: true,\n  atom: false,\n  selectable: true,\n  draggable: true,\n  code: false,\n  whitespace: 'pre', // \u63A7\u5236\u7A7A\u767D \u5904\u7406 \u903B\u8F91\n  defining: false, // \u7C98\u8D34\u7684\u65F6\u5019\u662F\u5426\u4FDD\u7559\n  allowGapCursor: false,\n  isolating: false, // \u9694\u79BB\u7F16\u8F91\u8303\u56F4 - \u4F8B\u5982 TableCell\n  tableRole: 'cell', //  Table \u6269\u5C55\u5B9A\u4E49\u7684\u89D2\u8272 - table, row, cell, header_cell\n  marks: 'bold', // \u5141\u8BB8 mark - _ \u4EFB\u610F, '' \u4E0D\u5141\u8BB8\n});\nconst MyMark = Node.create({\n  inclusive: false, // \u5149\u6807\u5728\u7ED3\u5C3E\u7684\u65F6\u5019\u662F\u5426\u5305\u542B\u5728\u5F53\u524D mark - \u4F8B\u5982 Link \u4E3A false\n  excludes: 'bold', // \u6392\u4ED6 mark\n  group: 'basic',\n  code: false, // \u5185\u5BB9\u662F\u5426\u4E3A\u4EE3\u7801\n  spanning: false, // \u662F\u5426\u53EF\u4EE5\u8DE8\u591A\u4E2A\u8282\u70B9\n});\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-ts",children:"// typescript \u7C7B\u578B\u4FE1\u606F\n\ninterface CustomExtensionOptions {}\ninterface CustomExtensionStorage {}\n\ndeclare module '@tiptap/core' {\n  interface Commands<ReturnType> {\n    customExtension: {\n      /**\n       * Comments will be added to the autocomplete.\n       */\n      yourCommand: (someProp: any) => ReturnType;\n    };\n  }\n}\n\n// Node.create, Mark.create\nconst CustomExtension = Extension.create<CustomExtensionOptions, CustomExtensionStorage>({\n  name: 'customExtension',\n\n  content: 'paragraph*',\n  draggable: true,\n\n  addAttributes() {\n    // this.{name,editor,type,options,parent,}\n    return {\n      ...this.parent?.(), // \u6269\u5C55\u65F6 \u7EE7\u627F\u4E0A\u7EA7\n      color: {\n        default: 'pink',\n        rendered: true, // \u662F\u5426\u6E32\u67D3\u5C5E\u6027\n        parseHTML: (element) => element.getAttribute('data-color'),\n        renderHTML: (attributes) => {\n          return {\n            'data-color': attributes.color,\n            style: `color: ${attributes.color}`,\n          };\n        },\n      },\n    };\n  },\n\n  addGlobalAttributes() {\n    // \u5168\u5C40\u5C5E\u6027 - \u589E\u5F3A\u5176\u4ED6\u6269\u5C55\n    return [\n      {\n        // \u6269\u5C55\u76EE\u6807\u7C7B\u578B\u5C5E\u6027\n        types: ['heading', 'paragraph'],\n        // \u6DFB\u52A0\u7684\u989D\u5916\u5C5E\u6027\n        attributes: {\n          textAlign: {\n            default: 'left', // \u9ED8\u8BA4\u503C\n            rendered: true, // \u662F\u5426\u8C03\u7528\u6E32\u67D3\n            keepOnSplit: true, // \u5207\u5206\u5143\u7D20\u65F6\u662F\u5426\u4FDD\u7559\n            renderHTML: (attributes) => ({\n              style: `text-align: ${attributes.textAlign}`,\n            }),\n            parseHTML: (element) => element.style.textAlign || 'left',\n          },\n        },\n      },\n    ];\n  },\n\n  // \u5B9A\u4E49\u5982\u4F55\u6E32\u67D3 HTML\n  renderHTML({ HTMLAttributes }) {\n    // tag,\u5C5E\u6027,children\n    // tag,\u5C5E\u6027,0 - 0 \u8868\u793A content \u63D2\u5165\u4F4D\u7F6E\n    return ['pre', ['code', HTMLAttributes, 0]];\n    // import { mergeAttributes } from '@tiptap/core'\n    return ['a', mergeAttributes(HTMLAttributes, { rel: this.options.rel }), 0];\n  },\n  parseHTML() {\n    return [\n      {\n        tag: 'strong',\n      },\n      {\n        tag: 'b',\n        // node.hasAttribute('style')\n        // node.getAttribute('data-color')\n        getAttrs: (node) => node.style.fontWeight !== 'normal' && null,\n      },\n    ];\n  },\n\n  addCommands() {\n    return {\n      paragraph:\n        () =>\n        ({ commands }) => {\n          // \u8BBF\u95EE\u5176\u4ED6 commands\n          return commands.setNode('paragraph');\n        },\n    };\n  },\n\n  addKeyboardShortcuts() {\n    return {\n      'Mod-l': () => this.editor.commands.toggleBulletList(),\n    };\n  },\n\n  addInputRules() {\n    // \u5F53\u8F93\u5165\u6307\u5B9A\u5185\u5BB9\u65F6\u5339\u914D\u4E3A type - \u4F8B\u5982 markdown \u8BED\u6CD5 ~~ -> Strike\n    // \u89C4\u5219\u4E00\u822C\u4EE5 $ \u7ED3\u5C3E\n    // import { markInputRule } from '@tiptap/core'\n    // const inputRegex = /(?:^|\\s)((?:~)((?:[^~]+))(?:~))$/\n    return [\n      markInputRule({\n        find: inputRegex,\n        type: this.type,\n      }),\n    ];\n  },\n  addPasteRules() {\n    // \u89C4\u5219\u4E00\u822C\u4E0D\u4F1A\u4EE5 $ \u7ED3\u5C3E\n    // import { markPasteRule } from '@tiptap/core'\n    // const pasteRegex = /(?:^|\\s)((?:~)((?:[^~]+))(?:~))/g\n    return [\n      markPasteRule({\n        find: pasteRegex,\n        type: this.type,\n      }),\n    ];\n  },\n\n  // \u5408\u5E76\u5230 options\n  addOptions() {\n    return {};\n  },\n\n  // \u5408\u5E76\u5230 storage\n  addStorage() {\n    // \u5B58\u50A8\u5F15\u7528 editor.extensionStorage[extension.name] = extension.storage\n    // \u5916\u90E8\u8BBF\u95EE editor.storage.customExtension.counter\n    return {\n      counter: 100,\n    };\n  },\n\n  // \u4E8B\u4EF6\n  onUpdate() {\n    this.storage.counter += 1;\n  },\n\n  /* \u9AD8\u7EA7\u6269\u5C55 */\n\n  // \u6269\u5C55 ProseMirror\n  addProseMirrorPlugins() {\n    return [\n      history(),\n      // \u2026\n    ];\n  },\n\n  addNodeView() {\n    // \u4E3A\u7F16\u8F91\u5143\u7D20\u589E\u52A0\u4EA4\u4E92\u529F\u80FD\n    // https://tiptap.dev/guide/node-views\n    return ({ editor, node, getPos, HTMLAttributes, decorations, extension }) => {\n      const { view } = editor;\n      // view.dispatch\n\n      const dom = document.createElement('div');\n      dom.innerHTML = 'Node View';\n\n      const button = document.createElement('button');\n      button.innerHTML = `Counter ${node.attrs.count}`;\n\n      button.addEventListener('click', () => {\n        if (typeof getPos === 'function') {\n          view.dispatch(\n            // \u66F4\u65B0 node\n            view.state.tr.setNodeMarkup(getPos(), undefined, {\n              // node.attrs.count \u8BBF\u95EE\u5B9A\u4E49\u7684 \u5C5E\u6027\n              count: node.attrs.count + 1,\n            }),\n          );\n\n          editor.commands.focus();\n        }\n      });\n\n      const content = document.createElement('div');\n\n      dom.append(button, content);\n\n      return {\n        dom: container,\n        // \u53EF\u7F16\u8F91\u5185\u5BB9 - \u7531 tiptap \u6E32\u67D3\n        contentDOM: content,\n      };\n      // React \u7EC4\u4EF6\n      // import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'\n      // \u7EC4\u4EF6\u5185\u8FD4\u56DE NodeViewWrapper\n      // props.node.attrs.count \u8BBF\u95EE node \u5C5E\u6027\n      // props.updateAttributes \u4FEE\u6539 \u5C5E\u6027\n      // \u5185\u5BB9\u4F7F\u7528 NodeViewContent\n      return ReactNodeViewRenderer(Component);\n    };\n  },\n});\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u6269\u5C55\u70B9\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"options, storage - Extension \u672C\u8EAB\u72B6\u6001"}),"\n",(0,i.jsx)(e.li,{children:"schema - Node, Mark"}),"\n",(0,i.jsx)(e.li,{children:"commands"}),"\n",(0,i.jsx)(e.li,{children:"\u4E8B\u4EF6 - beforeCreate, create, update, selectionUpdate, transaction, focus, blur, destroy"}),"\n",(0,i.jsxs)(e.li,{children:["ProseMirror \u63D2\u4EF6\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u987A\u5E8F - inputRules, pasteRules, keymap, \u5176\u4ED6"}),"\n",(0,i.jsx)(e.li,{children:"inputRulesPlugin(InputRules) - \u5408\u5E76\u4E3A\u4E00\u4E2A\u63D2\u4EF6"}),"\n",(0,i.jsx)(e.li,{children:"PasteRules - \u591A\u4E2A\u63D2\u4EF6"}),"\n",(0,i.jsxs)(e.li,{children:["addKeyboardShortcuts\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"prosemirror-keymap"}),"\n",(0,i.jsx)(e.li,{children:"Mod \u6307\u4EE3 Cmd \u6216 Control"}),"\n",(0,i.jsx)(e.li,{children:"Shift, Alt, Control, Cmd"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://keycode.info/",children:"https://keycode.info/"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"ProseMirrorPlugins - \u539F\u751F\u63D2\u4EF6"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["extension \u7684\u6838\u5FC3\u4E0A\u4E0B\u6587\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"name, options, storage, editor, type"}),"\n",(0,i.jsxs)(e.li,{children:["type=getSchemaTypeByName(extension.name, this.schema)\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u7528\u4E8E Node \u548C Mark"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function u(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(c,{...n})}):c(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return l},a:function(){return o}});var r=t(75271);let i={},s=r.createContext(i);function o(n){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:o(n.components),r.createElement(s.Provider,{value:e},n.children)}}}]);