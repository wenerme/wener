"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["33825"],{83693:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>d,assets:()=>o,toc:()=>p,frontMatter:()=>l});var r=JSON.parse('{"id":"service/api/graphql/graphql-spec","title":"GraohQL Spec","description":"- https://spec.graphql.org/","source":"@site/../notes/service/api/graphql/graphql-spec.md","sourceDirName":"service/api/graphql","slug":"/service/api/graphql/spec","permalink":"/notes/service/api/graphql/spec","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/graphql/graphql-spec.md","tags":[{"inline":true,"label":"Spec","permalink":"/notes/tags/spec"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1711354531000,"frontMatter":{"tags":["Spec"]},"sidebar":"docs","previous":{"title":"GraphQL Sofa","permalink":"/notes/service/api/graphql/sofa"},"next":{"title":"graphql-tools","permalink":"/notes/service/api/graphql/tools"}}'),i=t("52676"),s=t("79938");let l={tags:["Spec"]},a="GraohQL Spec",o={},p=[{value:"Directives",id:"directives",level:2},{value:"Introspection",id:"introspection",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"graohql-spec",children:"GraohQL Spec"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://spec.graphql.org/",children:"https://spec.graphql.org/"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"directives",children:"Directives"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5185\u7F6E\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"@skip"}),"\n",(0,i.jsx)(n.li,{children:"@include"}),"\n",(0,i.jsx)(n.li,{children:"@deprecated"}),"\n",(0,i.jsx)(n.li,{children:"@specifiedBy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md",children:"RFC: GraphQL Defer and Stream Directives"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"@defer"}),"\n",(0,i.jsx)(n.li,{children:"@stream"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://the-guild.dev/graphql/yoga-server/docs/features/defer-stream",children:"https://the-guild.dev/graphql/yoga-server/docs/features/defer-stream"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"introspection",children:"Introspection"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-gql",children:"type __Schema {\n  description: String\n  types: [__Type!]!\n  queryType: __Type!\n  mutationType: __Type\n  subscriptionType: __Type\n  directives: [__Directive!]!\n}\n\ntype __Type {\n  kind: __TypeKind!\n  name: String\n  description: String\n  # must be non-null for OBJECT and INTERFACE, otherwise null.\n  fields(includeDeprecated: Boolean = false): [__Field!]\n  # must be non-null for OBJECT and INTERFACE, otherwise null.\n  interfaces: [__Type!]\n  # must be non-null for INTERFACE and UNION, otherwise null.\n  possibleTypes: [__Type!]\n  # must be non-null for ENUM, otherwise null.\n  enumValues(includeDeprecated: Boolean = false): [__EnumValue!]\n  # must be non-null for INPUT_OBJECT, otherwise null.\n  inputFields(includeDeprecated: Boolean = false): [__InputValue!]\n  # must be non-null for NON_NULL and LIST, otherwise null.\n  ofType: __Type\n  # may be non-null for custom SCALAR, otherwise null.\n  specifiedByURL: String\n}\n\nenum __TypeKind {\n  SCALAR\n  OBJECT\n  INTERFACE\n  UNION\n  ENUM\n  INPUT_OBJECT\n  LIST\n  NON_NULL\n}\n\ntype __Field {\n  name: String!\n  description: String\n  args(includeDeprecated: Boolean = false): [__InputValue!]!\n  type: __Type!\n  isDeprecated: Boolean!\n  deprecationReason: String\n}\n\ntype __InputValue {\n  name: String!\n  description: String\n  type: __Type!\n  defaultValue: String\n  isDeprecated: Boolean!\n  deprecationReason: String\n}\n\ntype __EnumValue {\n  name: String!\n  description: String\n  isDeprecated: Boolean!\n  deprecationReason: String\n}\n\ntype __Directive {\n  name: String!\n  description: String\n  locations: [__DirectiveLocation!]!\n  args(includeDeprecated: Boolean = false): [__InputValue!]!\n  isRepeatable: Boolean!\n}\n\nenum __DirectiveLocation {\n  QUERY\n  MUTATION\n  SUBSCRIPTION\n  FIELD\n  FRAGMENT_DEFINITION\n  FRAGMENT_SPREAD\n  INLINE_FRAGMENT\n  VARIABLE_DEFINITION\n  SCHEMA\n  SCALAR\n  OBJECT\n  FIELD_DEFINITION\n  ARGUMENT_DEFINITION\n  INTERFACE\n  UNION\n  ENUM\n  ENUM_VALUE\n  INPUT_OBJECT\n  INPUT_FIELD_DEFINITION\n}\n"})})]})}function d(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return l}});var r=t(75271);let i={},s=r.createContext(i);function l(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);