"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["62706"],{37890:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>p,assets:()=>l,toc:()=>c,frontMatter:()=>i});var r=JSON.parse('{"id":"languages/parser/chevrotain","title":"chevrotain","description":"- chevrotain","source":"@site/../notes/languages/parser/chevrotain.md","sourceDirName":"languages/parser","slug":"/languages/parser/chevrotain","permalink":"/notes/languages/parser/chevrotain","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/parser/chevrotain.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731847972000,"frontMatter":{"title":"chevrotain"},"sidebar":"docs","previous":{"title":"Antlr 4","permalink":"/notes/languages/parser/antlr/"},"next":{"title":"JavaCC","permalink":"/notes/languages/parser/javacc"}}'),s=t("52676"),a=t("79938");let i={title:"chevrotain"},o="Chevrotain",l={},c=[];function h(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"chevrotain",children:"Chevrotain"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/Chevrotain/chevrotain",children:"chevrotain"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Apache-2.0, TS"}),"\n",(0,s.jsx)(n.li,{children:"LL(K)"}),"\n",(0,s.jsxs)(n.li,{children:["\u4F7F\u7528\u4EE3\u7801\u7684\u65B9\u5F0F\u5B9A\u4E49 - \u6709\u8FD0\u884C\u65F6\u4F9D\u8D56\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5199\u8D77\u6765\u4F1A\u6709\u70B9\u5197\u957F"}),"\n",(0,s.jsx)(n.li,{children:"\u975E\u5E38\u52A8\u6001"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://chevrotain.io/playground/",children:"https://chevrotain.io/playground/"})}),"\n",(0,s.jsxs)(n.li,{children:["\u6027\u80FD\u597D\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://chevrotain.io/performance/",children:"https://chevrotain.io/performance/"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"CST - Concrete Syntax Tree"}),"\n",(0,s.jsx)(n.li,{children:"AST - Abstract Syntax Tree"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const createToken = chevrotain.createToken;\n// \u6B63\u5219 Token\nonst Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\\w*/ });\n// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.\n// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js\nconst Select = createToken({\n  name: "Select",\n  pattern: /SELECT/,\n  longer_alt: Identifier,\n});\n// \u4E00\u822C Token\nconst From = createToken({\n  name: "From",\n  pattern: /FROM/,\n  longer_alt: Identifier,\n});\nconst Where = createToken({\n  name: "Where",\n  pattern: /WHERE/,\n  longer_alt: Identifier,\n});\n\nconst Comma = createToken({ name: "Comma", pattern: /,/ });\n\nconst Integer = createToken({ name: "Integer", pattern: /0|[1-9]\\d*/ });\nconst GreaterThan = createToken({ name: "GreaterThan", pattern: />/ });\nconst LessThan = createToken({ name: "LessThan", pattern: /</ });\n// \u5FFD\u7565\nconst WhiteSpace = createToken({\n  name: "WhiteSpace",\n  pattern: /\\s+/,\n  group: chevrotain.Lexer.SKIPPED,\n});\n\n// Lexar\nlet allTokens = [\n  WhiteSpace,\n  // "keywords" appear before the Identifier\n  Select,\n  From,\n  Where,\n  Comma,\n  // The Identifier must appear after the keywords because all keywords are valid identifiers.\n  Identifier,\n  Integer,\n  GreaterThan,\n  LessThan,\n];\nlet SelectLexer = new Lexer(allTokens);\n\n// Lexer\nlet inputText = "SELECT column1 FROM table2";\nlet lexingResult = SelectLexer.tokenize(inputText);\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'selectStatement\n   : selectClause fromClause (whereClause)?\n\nselectClause\n   : "SELECT" Identifier ("," Identifier)*\n\nfromClause\n   : "FROM" Identifier\n\nwhereClause\n   : "WHERE" expression\n\nexpression\n   : atomicExpression relationalOperator atomicExpression\n\natomicExpression\n   : Integer | Identifier\n\nrelationalOperator\n   : ">" | "<"\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"CstParser"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"class SelectParser extends CstParser {\n  constructor() {\n    super(allTokens);\n    const $ = this;\n\n    $.RULE('selectStatement', () => {\n      $.SUBRULE($.selectClause);\n      $.SUBRULE($.fromClause);\n      $.OPTION(() => {\n        $.SUBRULE($.whereClause);\n      });\n    });\n\n    $.RULE('selectClause', () => {\n      $.CONSUME(Select);\n      $.AT_LEAST_ONE_SEP({\n        SEP: Comma,\n        DEF: () => {\n          $.CONSUME(Identifier);\n        },\n      });\n    });\n\n    $.RULE('fromClause', () => {\n      $.CONSUME(From);\n      $.CONSUME(Identifier);\n    });\n\n    $.RULE('whereClause', () => {\n      $.CONSUME(Where);\n      $.SUBRULE($.expression);\n    });\n\n    // The \"rhs\" and \"lhs\" (Right/Left Hand Side) labels will provide easy\n    // to use names during CST Visitor (step 3a).\n    $.RULE('expression', () => {\n      $.SUBRULE($.atomicExpression, { LABEL: 'lhs' });\n      $.SUBRULE($.relationalOperator);\n      $.SUBRULE2($.atomicExpression, { LABEL: 'rhs' }); // note the '2' suffix to distinguish\n      // from the 'SUBRULE(atomicExpression)'\n      // 2 lines above.\n    });\n\n    $.RULE('atomicExpression', () => {\n      $.OR([{ ALT: () => $.CONSUME(Integer) }, { ALT: () => $.CONSUME(Identifier) }]);\n    });\n\n    $.RULE('relationalOperator', () => {\n      $.OR([{ ALT: () => $.CONSUME(GreaterThan) }, { ALT: () => $.CONSUME(LessThan) }]);\n    });\n\n    //\n    this.performSelfAnalysis();\n  }\n}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// ONLY ONCE\nconst parser = new SelectParser();\n\nfunction parseInput(text) {\n  const lexingResult = SelectLexer.tokenize(text);\n  // \"input\" is a setter which will reset the parser's state.\n  parser.input = lexingResult.tokens;\n  parser.selectStatement();\n\n  if (parser.errors.length > 0) {\n    throw new Error('sad sad panda, Parsing errors detected');\n  }\n}\n\nconst inputText = 'SELECT column1 FROM table2';\nparseInput(inputText);\n"})})]})}function p(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return i}});var r=t(75271);let s={},a=r.createContext(s);function i(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);