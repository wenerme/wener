"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81824"],{56564:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>_,assets:()=>i,toc:()=>l,frontMatter:()=>s});var t=JSON.parse('{"id":"devops/infra/terraform/terraform-cookbook","title":"Terraform \u5E38\u7528\u811A\u672C","description":"acme dns challenge","source":"@site/../notes/devops/infra/terraform/terraform-cookbook.md","sourceDirName":"devops/infra/terraform","slug":"/devops/infra/terraform/cookbook","permalink":"/notes/devops/infra/terraform/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/infra/terraform/terraform-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"Terraform \u5E38\u7528\u811A\u672C","tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"cf-terraforming","permalink":"/notes/devops/infra/terraform/cf"},"next":{"title":"Terraform","permalink":"/notes/devops/infra/terraform/faq"}}'),a=r("52676"),o=r("79938");let s={title:"Terraform \u5E38\u7528\u811A\u672C",tags:["Cookbook"]},c="Terraform \u5E38\u7528\u811A\u672C",i={},l=[{value:"acme dns challenge",id:"acme-dns-challenge",level:2},{value:"\u6A21\u677F\u6E32\u67D3\u89E6\u53D1\u547D\u4EE4",id:"\u6A21\u677F\u6E32\u67D3\u89E6\u53D1\u547D\u4EE4",level:2}];function m(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",pre:"pre",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"terraform-\u5E38\u7528\u811A\u672C",children:"Terraform \u5E38\u7528\u811A\u672C"})}),"\n",(0,a.jsx)(n.h2,{id:"acme-dns-challenge",children:"acme dns challenge"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:'variable "alicloud_access_key"{type=string}\nvariable "alicloud_secret_key"{type=string}\n\nprovider "acme" {\n  server_url = "https://acme-v02.api.letsencrypt.org/directory"\n}\n\nresource "tls_private_key" "any_wener_me_private_key" {\n  algorithm = "RSA"\n}\n\nresource "acme_registration" "any_wener_me_reg" {\n  account_key_pem = "${tls_private_key.any_wener_me_private_key.private_key_pem}"\n  email_address   = "admin@wener.me"\n}\n\nresource "acme_certificate" "any_wener_me" {\n  account_key_pem           = "${acme_registration.any_wener_me_reg.account_key_pem}"\n  common_name               = "wener.me"\n  subject_alternative_names = ["*.wener.me"]\n\n  dns_challenge {\n    provider = "alidns"\n\n    config = {\n      ALICLOUD_ACCESS_KEY    = var.alicloud_access_key\n      ALICLOUD_SECRET_KEY    = var.alicloud_secret_key\n    }\n\n    # pdns\n    # PDNS_API_KEY\n    # PDNS_API_URL\n\n    # rfc2136\n    # RFC2136_NAMESERVER - "host" or "host:port".\n    # RFC2136_TSIG_ALGORITHM - \u652F\u6301\u7B97\u6CD5 https://github.com/miekg/dns/blob/master/tsig.go#L18 - \u4E0D\u8BBE\u7F6E TSIG \u76F8\u5173\u53D8\u91CF\u5219\u7981\u7528\n    # RFC2136_TSIG_KEY\n    # RFC2136_TSIG_SECRET\n  }\n}\n\n# write cert and key\nresource "local_file" "any_wener_me_crt" {\n    sensitive_content     = acme_certificate.any_wener_me.certificate_pem\n    filename = "${path.module}/wener.me.crt"\n    file_permission = 0600\n}\nresource "local_file" "any_wener_me_key" {\n    sensitive_content     = acme_certificate.any_wener_me.private_key_pem\n    filename = "${path.module}/wener.me.key"\n    file_permission = 0600\n}\n'})}),"\n",(0,a.jsx)(n.h2,{id:"\u6A21\u677F\u6E32\u67D3\u89E6\u53D1\u547D\u4EE4",children:"\u6A21\u677F\u6E32\u67D3\u89E6\u53D1\u547D\u4EE4"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:'# \u6E32\u67D3\u6A21\u677F\ndata "template_file" "cluster-manifesto" {\n  template = "${file("${path.module}/cluster.yaml.tpl")}"\n  vars {\n    # ....\n  }\n}\n\n# \u5199\u5165\u6587\u4EF6\nresource "local_file" "saved-cluster-manifesto" {\n  content = "${data.template_file.cluster-manifesto.rendered}"\n  filename = "${local.cluster_manifesto_path}"\n}\n\n# \u4F7F\u7528\u6587\u4EF6\u8FDB\u884C\u64CD\u4F5C\nresource "null_resource" "cluster-upload" {\n  triggers {\n    file = "${data.template_file.cluster-manifesto.rendered}"\n  }\n\n  provisioner "local-exec" {\n    command = "kops -v 10 replace -f ${local.cluster_manifesto_path}\n  }\n}\n'})})]})}function _(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return s}});var t=r(75271);let a={},o=t.createContext(a);function s(e){let n=t.useContext(o);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);