"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["48871"],{32421:function(n,s,e){e.r(s),e.d(s,{metadata:()=>t,contentTitle:()=>l,default:()=>a,assets:()=>c,toc:()=>h,frontMatter:()=>i});var t=JSON.parse('{"id":"security/crypto/sops","title":"SOPS","description":"- mozilla/sops","source":"@site/../notes/security/crypto/sops.md","sourceDirName":"security/crypto","slug":"/security/crypto/sops","permalink":"/notes/security/crypto/sops","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/security/crypto/sops.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"SOPS"},"sidebar":"docs","previous":{"title":"rsa","permalink":"/notes/security/crypto/rsa"},"next":{"title":"CVE","permalink":"/notes/security/cve"}}'),r=e("52676"),d=e("79938");let i={title:"SOPS"},l="SOPS",c={},h=[{value:"spawnSync sops ENOENT",id:"spawnsync-sops-enoent",level:2},{value:"vsc",id:"vsc",level:2}];function x(n){let s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"sops",children:"SOPS"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"https://github.com/mozilla/sops",children:"mozilla/sops"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["sops \u662F\u4E2A ",(0,r.jsx)(s.strong,{children:"\u7F16\u8F91\u5668"})]}),"\n",(0,r.jsx)(s.li,{children:"\u52A0\u5BC6 yaml, json \u5B57\u6BB5\u800C\u975E\u6574\u4E2A\u6587\u4EF6"}),"\n",(0,r.jsx)(s.li,{children:"\u652F\u6301 yaml, json, dotenv, plaintext, ini"}),"\n",(0,r.jsxs)(s.li,{children:["\u652F\u6301\u540E\u7AEF: ",(0,r.jsx)(s.a,{href:"/notes/security/crypto/age",children:"age"}),", ",(0,r.jsx)(s.a,{href:"/notes/security/crypto/gpg",children:"pgp"}),", vault"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["\u52A0\u5BC6\u540E\u5B57\u6BB5 ",(0,r.jsx)(s.code,{children:"ENC[\u7B97\u6CD5\u540D\u5B57,data:,iv:,add:,tag:]"})]}),"\n"]}),"\n",(0,r.jsx)(s.admonition,{type:"caution",children:(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["\u6682\u4E0D\u652F\u6301 SSH keys + age\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"https://github.com/mozilla/sops/pull/1134",children:"#1134"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"SOPS_AGE_SSH_PRIVATE_KEY"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://github.com/mozilla/sops/pull/898",children:"#898"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["\u6682\u4E0D\u652F\u6301 SSH keys ",(0,r.jsx)(s.a,{href:"https://github.com/mozilla/sops/issues/692",children:"sops#692"})]}),"\n"]})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"brew install sops # macOS\n# \u76F4\u63A5\u4E0B\u8F7D\ncurl -Lo ~/bin/sops https://github.com/mozilla/sops/releases/download/v3.7.3/sops-v3.7.3.darwin.amd64\nchmod 755 ~/bin/sops\n\n# \u914D\u7F6E git diff \u5904\u7406 sops \u52A0\u5BC6\u6587\u4EF6\ngit config diff.sopsdiffer.textconv \"sops -d\"\n\n# \u52A0\u5BC6\u90E8\u5206\u6587\u4EF6\nsops --encrypt --encrypted-regex '^(data|stringData)$' k8s-secrets.yaml\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["age\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"--age,SOPS_AGE_RECIPIENTS"}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"$XDG_CONFIG_HOME/sops/age/keys.txt"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"$HOME/Library/Application Support/sops/age/keys.txt"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.code,{children:"%AppData%\\sops\\age\\keys.txt"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="\u52A0\u5BC6\u540E\u7684\u6570\u636E"',children:"# \u6570\u636E\na: 1\n\n# \u9644\u52A0\u6570\u636E\nsops:\n  kms: []\n  gcp_kms: []\n  azure_kv: []\n  hc_vault: []\n  age: []\n  lastmodified: '2022-11-08T01:41:42Z'\n  mac:\n  pgp:\n    - created_at: '2022-11-08T01:40:45Z'\n      enc: |-\n        -----BEGIN PGP MESSAGE-----\n        -----END PGP MESSAGE-----\n      fp:\n  unencrypted_suffix: _unencrypted\n  version: 3.7.3\n"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:".sops.yaml"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"creation_rules:\n  - path_regex:\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"env"}),(0,r.jsx)(s.th,{children:"for"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"SOPS_GPG_EXEC"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"EDITOR"}),(0,r.jsx)(s.td,{children:"vim"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"flag"}),(0,r.jsx)(s.th,{children:"for"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-d,--decrypt"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-e,--encrypt"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-r,--rotate"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-p,--pgp SOPS_PGP_FP"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-a,--age SOPS_AGE_RECIPIENTS"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-i,--in-place"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--extract PATH"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--input-type TYPE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--output-type TYPE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"-s,--show-master-keys"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--add-hc-vault-transit VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--rm-hc-vault-transit VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--add-age VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--rm-age VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--add-pgp VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--rm-pgp VALUE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--ignore-mac"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--unencrypted-suffix SUFFIX"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--unencrypted-regex REGEX"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--cofig FILE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:'--set "PATH VALUE"'}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--shamir-secret-sharing-threshold 0"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--output FILE"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--enable-local-keyservice"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--keyservice PATH"}),(0,r.jsx)(s.td,{})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:"--verbose"}),(0,r.jsx)(s.td,{})]})]})]}),"\n",(0,r.jsx)(s.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(s.h2,{id:"spawnsync-sops-enoent",children:"spawnSync sops ENOENT"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://github.com/signageos/vscode-sops/issues/4",children:"https://github.com/signageos/vscode-sops/issues/4"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"vsc",children:"vsc"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'EDITOR="code --wait" sops values.yaml\n'})})]})}function a(n={}){let{wrapper:s}={...(0,d.a)(),...n.components};return s?(0,r.jsx)(s,{...n,children:(0,r.jsx)(x,{...n})}):x(n)}},79938:function(n,s,e){e.d(s,{Z:function(){return l},a:function(){return i}});var t=e(75271);let r={},d=t.createContext(r);function i(n){let s=t.useContext(d);return t.useMemo(function(){return"function"==typeof n?n(s):{...s,...n}},[s,n])}function l(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),t.createElement(d.Provider,{value:s},n.children)}}}]);