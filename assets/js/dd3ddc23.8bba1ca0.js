"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81577"],{83548:function(n,e,s){s.r(e),s.d(e,{metadata:()=>r,contentTitle:()=>d,default:()=>o,assets:()=>h,toc:()=>t,frontMatter:()=>i});var r=JSON.parse('{"id":"db/relational/postgresql/hasura","title":"Hasura","description":"- hasura/graphql-engine","source":"@site/../notes/db/relational/postgresql/hasura.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/hasura","permalink":"/notes/db/relational/postgresql/hasura","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/hasura.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1726657654000,"frontMatter":{"title":"Hasura"},"sidebar":"docs","previous":{"title":"cstore_fdw","permalink":"/notes/db/relational/postgresql/cstore_fdw"},"next":{"title":"libpq","permalink":"/notes/db/relational/postgresql/libpq"}}'),l=s("52676"),a=s("79938");let i={title:"Hasura"},d="Hasura",h={},t=[{value:"JWT \u9274\u6743",id:"jwt-\u9274\u6743",level:2},{value:"\u6388\u6743\u8BBF\u95EE\u63A7\u5236",id:"\u6388\u6743\u8BBF\u95EE\u63A7\u5236",level:2},{value:"Server",id:"server",level:2},{value:"Hasura CLI",id:"hasura-cli",level:2},{value:"Endpoints",id:"endpoints",level:2},{value:"Auth",id:"auth",level:2},{value:"Hasura v2",id:"hasura-v2",level:2},{value:"&quot;Query&quot; has to be an object type",id:"query-has-to-be-an-object-type",level:2},{value:"schema \u53D8\u66F4\u6D41\u7A0B",id:"schema-\u53D8\u66F4\u6D41\u7A0B",level:2}];function c(n){let e={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"hasura",children:"Hasura"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine",children:"hasura/graphql-engine"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Apache-2.0, MIT, Haskell"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://blog.hasura.io/574a1ee2e87f",children:"Working with schemaless data using GraphQL on Postgres"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://docs.hasura.io/1.0/graphql/manual/deployment/graphql-engine-flags/reference.html",children:"\u914D\u7F6E"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"--unauthorized-role"}),"/",(0,l.jsx)(e.code,{children:"HASURA_GRAPHQL_UNAUTHORIZED_ROLE"})," - \u533F\u540D\u89D2\u8272\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4F8B\u5982\u914D\u7F6E\u4E3A ",(0,l.jsx)(e.code,{children:"anonymous"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"--admin-secret"}),"/",(0,l.jsx)(e.code,{children:"HASURA_GRAPHQL_ADMIN_SECRET"})," - \u7BA1\u7406\u5458\u5BC6\u94A5"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"--cors-domain <DOMAINS>"}),"/",(0,l.jsx)(e.code,{children:"HASURA_GRAPHQL_CORS_DOMAIN"})," - CORS \u57DF\u540D"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"--disable-cors"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"--enable-telemetry <true|false>"}),"/",(0,l.jsx)(e.code,{children:"HASURA_GRAPHQL_ENABLE_TELEMETRY"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://docs.hasura.io/1.0/graphql/manual/api-reference/index.html",children:"\u63A5\u53E3\u6587\u6863"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"/v1/graphql"})," - \u4E3B\u8981\u7684 GraphQL \u5165\u53E3 - \u751F\u4EA7\u53EF\u4EE5\u53EA\u66B4\u9732\u8FD9\u4E00\u4E2A"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Hasura \u7684\u7CFB\u7EDF\u4FE1\u606F\u5B58\u50A8\u5728 ",(0,l.jsx)(e.code,{children:"hdb_catalog"})," \u548C ",(0,l.jsx)(e.code,{children:"hdb_view"})," \u4E2D"]}),"\n",(0,l.jsx)(e.li,{children:"HGE - Hasura GraphQL Engine"}),"\n"]}),"\n",(0,l.jsx)(e.admonition,{type:"info",children:(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u552F\u4E00\u7D22\u5F15 \u67E5\u8BE2 ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/519",children:"#519"})]}),"\n",(0,l.jsxs)(e.li,{children:["\u547D\u540D\u8F6C\u6362 ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/3320",children:"#3320"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["v2.8.0+ ",(0,l.jsx)(e.a,{href:"https://hasura.io/docs/latest/schema/postgres/naming-convention/",children:"Postgres: Naming Conventions"})]}),"\n",(0,l.jsx)(e.li,{children:"\u9ED8\u8BA4\u90FD\u662F\u6570\u636E\u5E93\u547D\u540D\u65B9\u5F0F, snake_case, \u524D\u7AEF\u4F7F\u7528\u975E\u5E38\u522B\u626D"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 gql union type ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/2311",children:"#2311"})]}),"\n",(0,l.jsxs)(e.li,{children:["pg array \u4E0D\u662F array ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/348",children:"#348"})]}),"\n",(0,l.jsxs)(e.li,{children:["\u4E0D\u652F\u6301 rate limit ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/2151",children:"#2151"})]}),"\n",(0,l.jsxs)(e.li,{children:["remote schema \u4E0D\u652F\u6301 subscribe ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/1599",children:"#1599"})]}),"\n",(0,l.jsxs)(e.li,{children:["deprecate field ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/2695",children:"#2695"})]}),"\n",(0,l.jsxs)(e.li,{children:["persists query ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/273",children:"#273"})]}),"\n",(0,l.jsxs)(e.li,{children:["uuid -> ID ",(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/3578",children:"#3578"})]}),"\n"]})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u521B\u5EFA\u4E00\u4E2A\u6570\u636E\u5E93\nUSERNAME=hasura\nPASSWORD=hasura\nDATABASE=hasura\n# \u767B\u9646 console \u4F7F\u7528\u7684 token\nTOKEN=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32 | tee -)\n\ndocker run -d \\\n  -e POSTGRES_USER=$USERNAME -e POSTGRES_PASSWORD=$PASSWORD -e POSTGRES_DB=$DATABASE \\\n  -v $PWD/postgres/data:/var/lib/postgresql/data -p 5432:5432 \\\n  --name postgres postgres:12-alpine\n\n# \u4F7F\u7528\u5DF2\u6709\u6570\u636E\u5E93\n# \u63A7\u5236\u53F0 http://localhost:8080/console\n# https://hub.docker.com/r/hasura/graphql-engine\ndocker run -it --rm -p 8080:8080 \\\n  --link postgres:db \\\n  -e HASURA_GRAPHQL_DATABASE_URL=postgres://$USERNAME:$PASSWORD@db:5432/$DATABASE \\\n  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \\\n  -e HASURA_GRAPHQL_ADMIN_SECRET=$TOKEN \\\n  -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \\\n  -e HASURA_GRAPHQL_ENABLE_TELEMETRY=false \\\n  --name hasura hasura/graphql-engine:latest\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"-- Hasura \u751F\u6210 UUID \u9700\u8981 pgcrypto\nCREATE EXTENSION IF NOT EXISTS pgcrypto;\n"})}),"\n",(0,l.jsx)(e.h2,{id:"jwt-\u9274\u6743",children:"JWT \u9274\u6743"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u901A\u8FC7 ",(0,l.jsx)(e.code,{children:"--jwt-secret"})," \u542F\u7528 - \u9700\u8981\u914D\u7F6E ",(0,l.jsx)(e.code,{children:"HASURA_GRAPHQL_JWT_SECRET"})]}),"\n",(0,l.jsxs)(e.li,{children:["\u901A\u8FC7\u5934\u4F20\u9012 JWT \u4FE1\u606F ",(0,l.jsx)(e.code,{children:"Authorization: Bearer <JWT>"})]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"X-Hasura-Role"})," \u5F53\u524D\u89D2\u8272"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"HASURA_GRAPHQL_JWT_SECRET"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-json",children:'{\n  // \u52A0\u5BC6\u7B97\u6CD5 - \u4F8B\u5982 \u5BF9\u79F0\u52A0\u5BC6 HS* \u6216 \u975E\u5BF9\u79F0\u52A0\u5BC6 RS*\n  "type": "<standard-JWT-algorithms>",\n  // \u5BF9\u79F0\u52A0\u5BC6\u4F7F\u7528\u5BC6\u7801 - HMAC\n  // \u975E\u5BF9\u79F0\u5219\u4E3A\u516C\u94A5 - \u53EF\u4EE5\u4F7F\u7528 JWKs \u800C\u4E0D\u914D\u7F6E\n  "key": "<optional-key-as-string>",\n  // well known \u7684 url - \u5305\u542B\u516C\u94A5\u7B49\u4FE1\u606F\n  "jwk_url": "<optional-url-to-refresh-jwks>",\n  // \u547D\u540D\u7A7A\u95F4 - \u9ED8\u8BA4 https://hasura.io/jwt/claims\n  "claims_namespace": "https://hasura.io/jwt/claims",\n  // jwt claims \u4E2D\u7684\u683C\u5F0F - JSON \u5BF9\u8C61\u6216\u5B57\u7B26\u4E32\u7F16\u7801\u7684 JSON\n  "claims_format": "json|stringified_json",\n  // jwt \u76EE\u6807\u5BF9\u8C61 - \u4F8B\u5982\u6307\u5B9A myapp-1 - \u4E00\u822C\u7528\u4E8E\u591A\u79DF\u6237\u6216\u591A\u5E94\u7528\n  "audience": "<optional-string-or-list-of-strings-to-verify-audience>",\n  // \u5728\u6821\u9A8C\u65F6\u9A8C\u8BC1\u53D1\u9001\u65B9\n  "issuer": "<optional-string-to-verify-issuer>"\n}\n'})}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"JWT \u5185\u5BB9"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-json",children:'{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true,\n  "iat": 1516239022,\n  "https://hasura.io/jwt/claims": {\n    "x-hasura-allowed-roles": ["user", "anonymous"],\n    "x-hasura-default-role": "user",\n    "x-hasura-user-id": "1234567890",\n    "x-hasura-org-id": "123",\n    "x-hasura-custom": "custom-value"\n  }\n}\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["x-hasura-default-role\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u9ED8\u8BA4\u89D2\u8272 - \u53EF\u4EE5\u76F4\u63A5\u5934\u90E8\u6307\u5B9A x-hasura-role"}),"\n",(0,l.jsx)(e.li,{children:"\u6743\u9650\u5224\u65AD\u4F1A\u4F7F\u7528\u8BE5\u89D2\u8272"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["x-hasura-allowed-roles\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5141\u8BB8\u7684\u89D2\u8272 - \u81EA\u5B9A\u4E49 - \u5BF9\u5E94\u540E\u53F0\u914D\u7F6E\u7684\u6743\u9650"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://hasura.io/jwt/claims",children:"https://hasura.io/jwt/claims"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"claims_namespace"}),"\n",(0,l.jsx)(e.li,{children:"claims_namespace_path"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u6388\u6743\u8BBF\u95EE\u63A7\u5236",children:"\u6388\u6743\u8BBF\u95EE\u63A7\u5236"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"X-Hasura-Admin-Secret"})," \u5934\u7528\u4E8E\u4F20\u9012\u7BA1\u7406\u5458\u5BC6\u94A5 - admin \u89D2\u8272"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"Authorization: Bearer <JWT>"})," JWT \u9274\u6743"]}),"\n",(0,l.jsxs)(e.li,{children:["\u57FA\u4E8E\u89D2\u8272\u7684\u6743\u9650\u63A7\u5236 - \u4E0D\u652F\u6301\u7EA7\u8054\u89D2\u8272 - \u89D2\u8272\u5FC5\u987B\u5E73\u5766\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"X-Hasura-Role"}),"\n",(0,l.jsx)(e.li,{children:"X-Hasura-Allowed-Roles"}),"\n",(0,l.jsxs)(e.li,{children:["X-Hasura-Allowed-Ids\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u652F\u6301\u6570\u7EC4"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5217\u63A7\u5236\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53EF\u89C1\u6027"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u884C\u63A7\u5236\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u81EA\u5B9A\u4E49\u8868\u8FBE\u5F0F\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:'{"user_id":{"_eq":"X-Hasura-User-Id"}}'})," - \u5176\u4E2D\u7684 ",(0,l.jsx)(e.code,{children:"X-Hasura-*"})," \u4F1A\u88AB\u66FF\u6362"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u64CD\u4F5C\u63A7\u5236\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"CRUD"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u9488\u5BF9\u4E0D\u540C\u89D2\u8272\u4F1A\u751F\u6210\u4E0D\u540C schema"}),"\n",(0,l.jsxs)(e.li,{children:["JWT\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5FC5\u987B\u5305\u542B\u5B57\u6BB5 x-hasura-default-role, x-hasura-allowed-roles"}),"\n",(0,l.jsx)(e.li,{children:"\u5934\u91CC\u53EF\u6307\u5B9A x-hasura-role \u6765\u9009\u5B9A\u89D2\u8272"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["x-hasura-use-backend-only-permissions: true\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u9488\u5BF9 backend_only \u89D2\u8272"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-json",children:'{ "user_id": { "_eq": "X-Hasura-User-Id" } }\n'})}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"\u4E2D\u95F4\u5173\u7CFB"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-json",children:'{\n  "_or": [\n    { "owners": { "user_id": { "_eq": "X-Hasura-User-Id" } } },\n    { "editors": { "user_id": { "_eq": "X-Hasura-User-Id" } } },\n    { "viewers": { "user_id": { "_eq": "X-Hasura-User-Id" } } }\n  ]\n}\n'})}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"\u7EE7\u627F"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-json",children:'{\n  "_exists": {\n    "_table": {\n      "table": "flattened_user_roles",\n      "schema": "public"\n    },\n    "_where": {\n      "_and": [{ "user_id": { "_eq": "X-Hasura-User-Id" } }, { "role_id": { "_eq": "manager" } }]\n    }\n  }\n}\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"flattened_user_roles \u4E3A\u89C6\u56FE"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"CREATE OR REPLACE VIEW flattened_user_roles AS\nWITH RECURSIVE sub_tree AS (\n  SELECT\n    roles.id AS role_id,\n    user_roles.user_id AS user_id\n  FROM\n    user_roles,\n    roles\n  WHERE\n    roles.id = user_roles.role_id\n  UNION ALL\n  SELECT\n    r.id AS role_id,\n    st.user_id AS user_id\n  FROM\n    roles r,\n    sub_tree st\n  WHERE\n    r.parent_role_id = st.role_id\n)\nSELECT\n  *\nFROM\n  sub_tree;\n"})}),"\n",(0,l.jsx)(e.h2,{id:"server",children:"Server"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-ini",children:'# \u5E94\u7528\u76F8\u5173\nHASURA_GRAPHQL_ADMIN_SECRET=$(uuidgen)\nHASURA_GRAPHQL_JWT_SECRET=\'{"type": "HS256", "key": "$(uuidgen | tr -d -)","claims_namespace": "hasura"}\'\n# \u6570\u636E\u5E93\nHASURA_GRAPHQL_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura?connect_timeout=10&application_name=hasura"\n# \u9ED8\u8BA4 HASURA_GRAPHQL_DATABASE_URL\nHASURA_GRAPHQL_METADATA_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura"\nHASURA_GRAPHQL_CORS_DOMAIN="https://*.wener.me,http://localhost:9695"\n# \u53EF\u4EE5\u5728\u521B\u5EFA\u6570\u636E\u6E90\u65F6\u5F15\u7528\nAPP_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura?connect_timeout=10&application_name=hasura"\n\n# \u516C\u5171\nHASURA_GRAPHQL_METADATA_DATABASE_EXTENSIONS_SCHEMA=hasura\nHASURA_GRAPHQL_DEV_MODE=false\nHASURA_GRAPHQL_ENABLE_MAINTENANCE_MODE=false\nHASURA_GRAPHQL_ENABLE_METADATA_QUERY_LOGGING=false\nHASURA_GRAPHQL_LOG_LEVEL=info\nHASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS=true\nHASURA_GRAPHQL_EXPERIMENTAL_FEATURES=naming_convention\nHASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION=graphql-default\nHASURA_GRAPHQL_ENABLE_CONSOLE=true\nHASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous\nHASURA_GRAPHQL_ENABLE_TELEMETRY=false\n\n# \u5176\u4ED6\nHASURA_GRAPHQL_AUTH_HOOK=\nHASURA_GRAPHQL_AUTH_HOOK_MODE=GET # POST\nHASURA_GRAPHQL_AUTH_HOOK_SEND_REQUEST_BODY=true\n\nHASURA_GRAPHQL_DISABLE_CORS=false\nHASURA_GRAPHQL_ENABLE_ALLOWLIST=false # \u9884\u5148\u914D\u7F6E\u7684 Query/Mutation\nHASURA_GRAPHQL_ENABLE_MAINTENANCE_MODE=false # \u7EF4\u62A4\u6A21\u5F0F - \u4E0D\u4F1A\u66F4\u65B0 metadata\nHASURA_GRAPHQL_ENABLE_METADATA_QUERY_LOGGING=false # \u8BB0\u5F55 metadata \u67E5\u8BE2\n\n\n# \u8FD8\u652F\u6301 metrics\nHASURA_GRAPHQL_ENABLED_APIS=metadata,graphql,pgdump,config\nHASURA_GRAPHQL_ENABLED_LOG_TYPES=startup,http-log,webhook-log,websocket-log\nHASURA_GRAPHQL_EVENTS_HTTP_POOL_SIZE=10\nHASURA_GRAPHQL_EVENTS_FETCH_BATCH_SIZE=100\nHASURA_GRAPHQL_EVENTS_FETCH_INTERVAL=\n\n# inherited_roles, optimise_permission_filters, naming_convention, streaming_subscriptions, apollo_federation, hide_update_many_fields, bigquery_string_numeric_input, hide_aggregation_predicates, hide_stream_fields\nHASURA_GRAPHQL_EXPERIMENTAL_FEATURES=\nHASURA_GRAPHQL_GRACEFUL_SHUTDOWN_TIMEOUT=60\nHASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_REFETCH_INTERVAL=1000\nHASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_BATCH_SIZE=100\n\nHASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS=true\nHASURA_GRAPHQL_ENABLE_APOLLO_FEDERATION=false\n\nHASURA_GRAPHQL_SCHEMA_SYNC_POLL_INTERVAL=1000\nHASURA_GRAPHQL_SERVER_HOST=*\nHASURA_GRAPHQL_SERVER_PORT=8080\nHASURA_GRAPHQL_STREAMING_QUERIES_MULTIPLEXED_BATCH_SIZE=100\nHASURA_GRAPHQL_STREAMING_QUERIES_MULTIPLEXED_REFETCH_INTERVAL=1000\nHASURA_GRAPHQL_STRINGIFY_NUMERIC_TYPES=false\nHASURA_GRAPHQL_CONNECTION_COMPRESSION=false\nHASURA_GRAPHQL_WEBSOCKET_CONNECTION_INIT_TIMEOUT=3\nHASURA_GRAPHQL_WEBSOCKET_KEEPALIVE=5\nHASURA_GRAPHQL_WS_READ_COOKIE=false\n\nHASURA_GRAPHQL_MAX_CACHE_SIZE=15 # MB - EE \u7248\u672C\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://hasura.io/docs/latest/deployment/graphql-engine-flags/reference/",children:"https://hasura.io/docs/latest/deployment/graphql-engine-flags/reference/"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"hasura-cli",children:"Hasura CLI"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[".env\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"--envfile"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://hasura.io/docs/latest/hasura-cli/config-reference/#environment-variables",children:"https://hasura.io/docs/latest/hasura-cli/config-reference/#environment-variables"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'curl -Lo hasura https://github.com/hasura/graphql-engine/releases/download/v2.19.0/cli-hasura-$(go env GOOS)-$(go env GOARCH)\nchmod +x hasura\nmv hasura ~/bin\n\nmkdir ~/.hasura\necho \'{"enable_telemetry": false,"show_update_notification": false}\' > ~/.hasura/config.json\n\nhasura init --endpoint http://localhost:8080 --admin-secret $TOKEN hasura\ncd hasura\n# http://localhost:9695/console\nhasura console\n'})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-ini",metastring:'title=".env"',children:"HASURA_GRAPHQL_ENDPOINT=\nHASURA_GRAPHQL_ADMIN_SECRET=\n\nHASURA_GRAPHQL_METADATA_DIRECTORY=\nHASURA_GRAPHQL_ACTIONS_HANDLER_WEBHOOK_BASEURL=\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-txt",children:"\uD83D\uDCC2 metadata\n\u251C\u2500 \uD83D\uDCC2 databases\n\u2502  \u251C\u2500 \uD83D\uDCC2 default\n\u2502  \u2502  \u2514\u2500 \uD83D\uDCC2 tables\n\u2502  \u2502     \u251C\u2500 \uD83D\uDCC4 <schema>_<table>.yaml\n\u2502  \u2502     \u2514\u2500 \uD83D\uDCC4 tables.yaml\n\u2502  \u2514\u2500\u2500 \uD83D\uDCC4 databases.yaml\n\u251C\u2500 \uD83D\uDCC4 actions.graphql\n\u251C\u2500 \uD83D\uDCC4 actions.yaml\n\u251C\u2500 \uD83D\uDCC4 allow_list.yaml\n\u251C\u2500 \uD83D\uDCC4 api_limits.yaml\n\u251C\u2500 \uD83D\uDCC4 cron_triggers.yaml\n\u251C\u2500 \uD83D\uDCC4 graphql_schema_introspection.yaml\n\u251C\u2500 \uD83D\uDCC4 inherited_roles.yaml\n\u251C\u2500 \uD83D\uDCC4 network.yaml\n\u251C\u2500 \uD83D\uDCC4 query_collections.yaml\n\u251C\u2500 \uD83D\uDCC4 remote_schemas.yaml\n\u251C\u2500 \uD83D\uDCC4 rest_endpoints.yaml\n\u2514\u2500 \uD83D\uDCC4 version.yaml\n\uD83D\uDCC2 migrations\n\u2514\u2500 \uD83D\uDCC2 default\n   \u2514\u2500 \uD83D\uDCC2 <timestamp>_<name>\n      \u251C\u2500 \uD83D\uDCC4 down.sql\n      \u2514\u2500 \uD83D\uDCC4 up.sql\n\uD83D\uDCC2 seeds\n\uD83D\uDCC4 config.yaml\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'hasura migrate status\n\nhasura migrate create "init" --from-server\nhasura migrate apply --version 1550925483858 --type down --database-name <database-name>\n\nhasura migrate squash --name AFTER --from FROM_VER --database-name DB\n\nhasura migrate delete --all --server --database-name DB\n'})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Metadata\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://hasura.io/docs/latest/migrations-metadata-seeds/metadata-format/",children:"https://hasura.io/docs/latest/migrations-metadata-seeds/metadata-format/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"endpoints",children:"Endpoints"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{children:"Endpoint"}),(0,l.jsx)(e.th,{children:"API"}),(0,l.jsx)(e.th,{children:"Access"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1/version"}),(0,l.jsx)(e.td,{children:"Version"}),(0,l.jsx)(e.td,{children:"Public"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/healthz"}),(0,l.jsx)(e.td,{children:"Health"}),(0,l.jsx)(e.td,{children:"Public"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1/graphql"}),(0,l.jsx)(e.td,{children:"GraphQL"}),(0,l.jsx)(e.td,{children:"Permission rules"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1beta1/relay"}),(0,l.jsx)(e.td,{children:"Relay"}),(0,l.jsx)(e.td,{children:"Permission rules"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1alpha1/graphql"}),(0,l.jsxs)(e.td,{children:[(0,l.jsx)(e.strong,{children:"Legacy"})," GraphQL"]}),(0,l.jsx)(e.td,{children:"Permission rules"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/api/rest"}),(0,l.jsx)(e.td,{children:"Restified GQL"}),(0,l.jsx)(e.td,{children:"GQL REST Routes"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v2/query"}),(0,l.jsx)(e.td,{children:"Schema - v2.0+"}),(0,l.jsx)(e.td,{children:"Admin only"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1/metadata"}),(0,l.jsx)(e.td,{children:"Metadata - v2.0+"}),(0,l.jsx)(e.td,{children:"Admin only"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1/query"}),(0,l.jsx)(e.td,{children:(0,l.jsx)(e.del,{children:"Schema/Metadata"})}),(0,l.jsx)(e.td,{children:"Admin only"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1alpha1/pg_dump"}),(0,l.jsx)(e.td,{children:"PG Dump"}),(0,l.jsx)(e.td,{children:"Admin only"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1alpha1/config"}),(0,l.jsx)(e.td,{children:"Config"}),(0,l.jsx)(e.td,{children:"Admin only"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"/v1/graphql/explain"}),(0,l.jsx)(e.td,{children:"Explain"}),(0,l.jsx)(e.td,{children:"Admin only"})]})]})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://hasura.io/docs/latest/api-reference/index/",children:"https://hasura.io/docs/latest/api-reference/index/"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"auth",children:"Auth"}),"\n",(0,l.jsx)(e.h1,{id:"version",children:"Version"}),"\n",(0,l.jsx)(e.h2,{id:"hasura-v2",children:"Hasura v2"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"2021-02-23"}),"\n",(0,l.jsxs)(e.li,{children:["\u591A\u6570\u636E\u6E90 - \u540C\u65F6\u8FDE\u591A\u4E2A\u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u76F8\u540C\u6570\u636E\u5E93\u7C7B\u578B Remote Join"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u591A\u6570\u636E\u5E93 - PG -> PG, MS SQL, MySQL"}),"\n",(0,l.jsxs)(e.li,{children:["\u652F\u6301 REST\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"REST -> GraphQL Query"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u589E\u5F3A AuthZ"}),"\n",(0,l.jsx)(e.li,{children:"HA"}),"\n",(0,l.jsx)(e.li,{children:"Metadata API"}),"\n"]}),"\n",(0,l.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(e.h2,{id:"query-has-to-be-an-object-type",children:'"Query" has to be an object type'}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/hasura/graphql-engine/issues/9399",children:"https://github.com/hasura/graphql-engine/issues/9399"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"schema-\u53D8\u66F4\u6D41\u7A0B",children:"schema \u53D8\u66F4\u6D41\u7A0B"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsx)(e.li,{children:"\u4FEE\u6539 SQL\uFF0C\u8C03\u6574 schema\uFF0Calter table"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"hasura md reload"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"hasura md ic list"})," - \u786E\u8BA4\u662F\u5426\u6709\u4E0D\u4E00\u81F4\u7684\u5730\u65B9"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"hasura md ic drop"})," - \u79FB\u9664\u4E0D\u4E00\u81F4\u7684\u5730\u65B9 - \u6CE8\u610F\u4E5F\u9700\u8981\u5230 console \u4FEE\u590D\u56DE\u6765"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"hasura md export"})," - \u66F4\u65B0 meta \u5230\u4ED3\u5E93"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"pnpm graphql-codegen --config codegen.ts"})," - \u751F\u6210\u65B0\u7684 graphql schema"]}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,a.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(c,{...n})}):c(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return i}});var r=s(75271);let l={},a=r.createContext(l);function i(n){let e=r.useContext(a);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:i(n.components),r.createElement(a.Provider,{value:e},n.children)}}}]);