"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["5002"],{5488:function(e,n,s){s.r(n),s.d(n,{metadata:()=>a,contentTitle:()=>c,default:()=>h,assets:()=>r,toc:()=>o,frontMatter:()=>i});var a=JSON.parse('{"id":"service/network/vpn/headscale","title":"Headscale","description":"- juanfont/headscale","source":"@site/../notes/service/network/vpn/headscale.md","sourceDirName":"service/network/vpn","slug":"/service/network/vpn/headscale","permalink":"/notes/service/network/vpn/headscale","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/vpn/headscale.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"Headscale"},"sidebar":"docs","previous":{"title":"VPN","permalink":"/notes/service/network/vpn/"},"next":{"title":"IKEv2","permalink":"/notes/service/network/vpn/ikev2"}}'),t=s("52676"),l=s("79938");let i={title:"Headscale"},c="Headscale",r={},o=[{value:"conf",id:"conf",level:2},{value:"Notes",id:"notes",level:2},{value:"Offcial Client/IPN",id:"offcial-clientipn",level:2},{value:"headscale now requires a new <code>noise.private_key_path</code> field in the config file for the Tailscale v2 protocol",id:"headscale-now-requires-a-new-noiseprivate_key_path-field-in-the-config-file-for-the-tailscale-v2-protocol",level:2},{value:"register request: Post &quot;https://host/machine/register&quot;: all connection attempts failed (HTTP: unexpected HTTP response: 301 Moved Permanently, HTTPS: unexpected HTTP response: 404 Not Found)",id:"register-request-post-httpshostmachineregister-all-connection-attempts-failed-http-unexpected-http-response-301-moved-permanently-https-unexpected-http-response-404-not-found",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"headscale",children:"Headscale"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/juanfont/headscale",children:"juanfont/headscale"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"BSD-3, Go"}),"\n",(0,t.jsx)(n.li,{children:"tailscale control server"}),"\n",(0,t.jsx)(n.li,{children:"\u57FA\u4E8E Wireguard \u7684 Mesh \u65B9\u6848"}),"\n",(0,t.jsxs)(n.li,{children:["SQLite driver \u4F7F\u7528 - ",(0,t.jsx)(n.a,{href:"https://github.com/glebarez/go-sqlite",children:"glebarez/go-sqlite"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E0D\u9700\u8981 CGO"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["endpoint\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"/api/v1"}),"\n",(0,t.jsx)(n.li,{children:"/swagger"}),"\n",(0,t.jsx)(n.li,{children:"/windows"}),"\n",(0,t.jsx)(n.li,{children:"/windows/tailscale.reg"}),"\n",(0,t.jsx)(n.li,{children:"/apple"}),"\n",(0,t.jsx)(n.li,{children:"/apple/ios"}),"\n",(0,t.jsx)(n.li,{children:"/apple/macos"}),"\n",(0,t.jsx)(n.li,{children:"/metrics"}),"\n",(0,t.jsx)(n.li,{children:"/machine/:id/map"}),"\n",(0,t.jsx)(n.li,{children:"/register"}),"\n",(0,t.jsx)(n.li,{children:"/key"}),"\n",(0,t.jsx)(n.li,{children:"/derp"}),"\n",(0,t.jsx)(n.li,{children:"/bootstrap-dns"}),"\n",(0,t.jsxs)(n.li,{children:["\u6682\u65F6\u65E0\u6CD5\u5173\u95ED - ",(0,t.jsx)(n.a,{href:"https://github.com/juanfont/headscale/issues/503",children:"#503"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u53EF\u8003\u8651\u53EA\u66B4\u9732 /api,/machine,/key"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/gurucomputing/headscale-ui",children:"gurucomputing/headscale-ui"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"headscale apikeys create"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Namespace -> User"}),"\n",(0,t.jsx)(n.li,{children:"Tailscale iOS & Android \u4E0D\u652F\u6301\u4FEE\u6539 control server \u5730\u5740"}),"\n",(0,t.jsxs)(n.li,{children:["WebUI ",(0,t.jsx)(n.a,{href:"https://github.com/juanfont/headscale/issues/234",children:"#234"})]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="\u542F\u52A8 control \u670D\u52A1"',children:"curl -Lo config.yaml https://raw.githubusercontent.com/juanfont/headscale/main/config-example.yaml\ncurl -Lo headscale https://github.com/juanfont/headscale/releases/download/v0.14.0/headscale_0.14.0_linux_amd64\nchmod +x headscale\nmkdir -p /var/lib/headscale\n./headscale serve\n./headscale namespaces create myns\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="\u5BA2\u6237\u7AEF \u52A0\u5165"',children:"# AlpineLinux tailscale\napk add tailscale\nservice tailscale start\n# macOS tailscale\nbrew install tailscale\n\ntailscale up --login-server http://192.168.1.2:8080\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="control \u540C\u610F\u52A0\u5165"',children:"# @Server \u540C\u610F\n./headscale -n myns nodes register --key $KEY\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="\u5BA2\u6237\u7AEF\u72B6\u6001"',children:"tailscale ip\ntailscale status\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="\u9884\u751F\u6210 authkey \u51CF\u5C11\u540C\u610F\u73AF\u8282"',children:"# \u670D\u52A1\u7AEF\u9884\u751F\u6210 - \u51CF\u5C11\u540C\u610F\u8FD9\u4E2A\u73AF\u8282\nheadscale --namespace myns preauthkeys create --reusable --expiration 24h\n\n# \u5BA2\u6237\u7AEF\u52A0\u5165\ntailscale up --login-server http://192.168.1.2:8080 --authkey $KE\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"headscale nodes list              # \u8282\u70B9\u5217\u8868\n# headscale nodes share -i 1 -n ns2 # \u4E0D\u518D\u652F\u6301\uFF0C\u4F7F\u7528 ACL \u63A7\u5236 - \u5C06\u8282\u70B9 1 \u5171\u4EAB\u7ED9 ns2 \u79DF\u6237\n\nheadscale nodes routes list -i 1  # \u67E5\u770B\u8282\u70B9\u7533\u8BF7\u7684 subnet routes\nheadscale routes enable -i 1 -r 192.168.1.0/24 # \u5141\u8BB8 routes\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Docker\n# 8080 http\n# 9090 metrics\n# https://github.com/juanfont/headscale/blob/main/docs/running-headscale-container.md\ndocker run --rm -it \\\n  -v $PWD/headscale/etc:/etc/headscale/ \\\n  -v $PWD/headscale/var:/var/lib/headscale/ \\\n  -p 127.0.0.1:8080:8080 \\\n  -p 127.0.0.1:9090:9090 \\\n  --name headscale headscale/headscale:0-alpine \\\n  headscale serve\n"})}),"\n",(0,t.jsx)(n.h2,{id:"conf",children:"conf"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/juanfont/headscale/blob/main/config-example.yaml",children:"config-example.yaml"})}),"\n",(0,t.jsxs)(n.li,{children:["config.yaml,config.json\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"/etc/headscale"}),"\n",(0,t.jsx)(n.li,{children:"~/.headscale"}),"\n",(0,t.jsx)(n.li,{children:"./"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# \u5BA2\u6237\u7AEF\u8FDE\u63A5\u4F7F\u7528\u7684\u5730\u5740\nserver_url: http://127.0.0.1:8080\n\n# \u670D\u52A1\u7AEF\u76D1\u542C\nlisten_addr: 0.0.0.0:8080\n\n# /metrics\nmetrics_listen_addr: 127.0.0.1:9090\n\n# gRPC API - \u901A\u8FC7 cert \u8BA4\u8BC1\ngrpc_listen_addr: 0.0.0.0:50443\ngrpc_allow_insecure: false\n\n# \u4E0D\u5B58\u5728\u4F1A\u751F\u6210\nprivate_key_path: /var/lib/headscale/private.key\n\n# IP \u6BB5\nip_prefixes:\n  - fd7a:115c:a1e0::/48\n  - 100.64.0.0/10\n\n# DERP - \u4E2D\u7EE7\n# https://tailscale.com/blog/how-tailscale-works/#encrypted-tcp-relays-derp\nderp:\n  server:\n    # \u8FD0\u884C\u5185\u7F6E\u7684 DERP - HTTPS\n    enabled: false\n    # \u5185\u7F6E DERP \u7684 Region ID\n    region_id: 999\n\n    # Region \u4FE1\u606F\n    region_code: 'headscale'\n    region_name: 'Headscale Embedded DERP'\n\n    # \u76D1\u542C\u8F85\u52A9 NAT\n    # https://tailscale.com/blog/how-tailscale-works/\n    stun:\n      enabled: false\n      listen_addr: '0.0.0.0:3478'\n\n  # \u5916\u90E8 DERP\n  urls:\n    - https://controlplane.tailscale.com/derpmap/default\n\n  # \u672C\u5730 DERP \u914D\u7F6E\u6587\u4EF6 - YAML - \u7528\u4E8E selfhost DERP\n  # https://tailscale.com/kb/1118/custom-derp-servers/\n  paths: []\n\n  # \u5237\u65B0 derpmap\n  auto_update_enabled: true\n  update_frequency: 24h\n\ndisable_check_updates: true\nephemeral_node_inactivity_timeout: 30m\n\ndb_type: sqlite3\ndb_path: /var/lib/headscale/db.sqlite\n\n# # Postgres config\n# db_type: postgres\n# db_host: localhost\n# db_port: 5432\n# db_name: headscale\n# db_user: foo\n# db_pass: bar\n\n### TLS configuration\n#\n## Let's encrypt / ACME\n#\n# headscale supports automatically requesting and setting up\n# TLS for a domain with Let's Encrypt.\n#\n# URL to ACME directory\nacme_url: https://acme-v02.api.letsencrypt.org/directory\n\n# Email to register with ACME provider\nacme_email: ''\n\n# Domain name to request a TLS certificate for:\ntls_letsencrypt_hostname: ''\n\n# Client (Tailscale/Browser) authentication mode (mTLS)\n# Acceptable values:\n# - disabled: client authentication disabled\n# - relaxed: client certificate is required but not verified\n# - enforced: client certificate is required and verified\ntls_client_auth_mode: relaxed\n\n# Path to store certificates and metadata needed by\n# letsencrypt\ntls_letsencrypt_cache_dir: /var/lib/headscale/cache\n\ntls_letsencrypt_challenge_type: HTTP-01\ntls_letsencrypt_listen: ':http'\n\ntls_cert_path: ''\ntls_key_path: ''\n\nlog_level: info\n\n# ACL - YAML or HUJSON\n# https://tailscale.com/kb/1018/acls/\n# https://github.com/juanfont/headscale/blob/main/docs/acls.md\nacl_policy_path: ''\n\n## DNS\n#\n# headscale supports Tailscale's DNS configuration and MagicDNS.\n# Please have a look to their KB to better understand the concepts:\n#\n# - https://tailscale.com/kb/1054/dns/\n# - https://tailscale.com/kb/1081/magicdns/\n# - https://tailscale.com/blog/2021-09-private-dns-with-magicdns/\n#\ndns_config:\n  # List of DNS servers to expose to clients.\n  nameservers:\n    - 1.1.1.1\n\n  # Split DNS (see https://tailscale.com/kb/1054/dns/),\n  # list of search domains and the DNS to query for each one.\n  #\n  # restricted_nameservers:\n  #   foo.bar.com:\n  #     - 1.1.1.1\n  #   darp.headscale.net:\n  #     - 1.1.1.1\n  #     - 8.8.8.8\n\n  # Search domains to inject.\n  domains: []\n\n  # Whether to use [MagicDNS](https://tailscale.com/kb/1081/magicdns/).\n  # Only works if there is at least a nameserver defined.\n  magic_dns: true\n\n  # Defines the base domain to create the hostnames for MagicDNS.\n  # `base_domain` must be a FQDNs, without the trailing dot.\n  # The FQDN of the hosts will be\n  # `hostname.namespace.base_domain` (e.g., _myhost.mynamespace.example.com_).\n  base_domain: example.com\n\n# Unix socket used for the CLI to connect without authentication\n# Note: for local development, you probably want to change this to:\n# unix_socket: ./headscale.sock\nunix_socket: /var/run/headscale.sock\nunix_socket_permission: '0770'\n#\n# headscale supports experimental OpenID connect support,\n# it is still being tested and might have some bugs, please\n# help us test it.\n# OpenID Connect\n# oidc:\n#   issuer: \"https://your-oidc.issuer.com/path\"\n#   client_id: \"your-oidc-client-id\"\n#   client_secret: \"your-oidc-client-secret\"\n#\n#   If `strip_email_domain` is set to `true`, the domain part of the username email address will be removed.\n#   This will transform `first-name.last-name@example.com` to the namespace `first-name.last-name`\n#   If `strip_email_domain` is set to `false` the domain part will NOT be removed resulting to the following\n#   namespace: `first-name.last-name.example.com`\n#\n#   strip_email_domain: true\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="acls.yaml"',children:'Groups:\n  # group user\n  group:wener: [ wener ]\nTagOwners:\n  # who can adertise tag\n  tag:internal: [ group:wener ]\n  tag:public: [ group:wener ]\n  tag:derp: [ group:wener ]\nACLs:\n- { Action: accept, Users: [ wener ], Ports: [ "*:*" ] }\n- { Action: accept, Users: [ tag:derp ], Ports: [ "*:*" ] }\n- { Action: accept, Users: [ "*" ], Ports: [ tag:public:* ] }\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="derp.yaml"',children:"regions:\n  999:\n    regionid: 999\n    regioncode: sha\n    regionname: Shanghai\n    nodes:\n      - name: 999a\n        regionid: 999\n        hostname: derp.example.com\n        ipv4: 1.1.1.1\n        stunport: 3478\n        stunonly: false\n        derpport: 443\n"})}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["/var/lib/headscale/\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"private.key"}),"\n",(0,t.jsxs)(n.li,{children:["db.sqlite\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"api_keys"}),"\n",(0,t.jsx)(n.li,{children:"kvs"}),"\n",(0,t.jsx)(n.li,{children:"machines"}),"\n",(0,t.jsx)(n.li,{children:"namespaces"}),"\n",(0,t.jsx)(n.li,{children:"pre_auth_keys"}),"\n",(0,t.jsx)(n.li,{children:"shared_machines"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"offcial-clientipn",children:"Offcial Client/IPN"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4E0B\u8F7D ",(0,t.jsx)(n.a,{href:"https://tailscale.com/download/",children:"https://tailscale.com/download/"})]}),"\n",(0,t.jsxs)(n.li,{children:["macOS GUI - \u4ECE ",(0,t.jsx)(n.code,{children:"http://<headscale>/apple/macos"})," \u4E0B\u8F7D\u5B89\u88C5 mobileconfig"]}),"\n"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["windows \u4ECE ",(0,t.jsx)(n.code,{children:"http://<headscale>/windows/tailscale.reg"})," \u4E0B\u8F7D\u6267\u884C\u6CE8\u518C\u8868"]}),"\n",(0,t.jsx)(n.li,{children:"\u542F\u52A8\u5BA2\u6237\u7AEF\u5373\u53EF"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# macOS \u4E5F\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539 ControlURL\ndefaults write io.tailscale.ipn.macos ControlURL https://127.0.0.1:8080\n\n# GUI \u7248 cli \u4F4D\u7F6E\n/Applications/Tailscale.app/Contents/MacOS/Tailscale --help\n\n# /Library/LaunchDaemons/com.tailscale.tailscaled.plist\n# \u547D\u4EE4\u884C\u7248\u672C\u914D\u7F6E \u5F00\u673A\u542F\u52A8\nsudo tailscaled install-system-daemon\n# \u5378\u8F7D\nsudo tailscaled uninstall-system-daemon\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bat",children:': Windows \u4E5F\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\nREG ADD "HKLM\\Software\\Tailscale IPN" /v UnattendedMode /t REG_SZ /d always\nREG ADD "HKLM\\Software\\Tailscale IPN" /v LoginURL /t REG_SZ /d "https://127.0.0.1:8080"\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Windows \u72B6\u6001\u76EE\u5F55\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"%LocalAppData%\\Tailscale"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"C:\\WINDOWS\\system32\\config\\systemprofile\\AppData\\Local\\Tailscale"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["macOS GUI\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u72B6\u6001\u4F7F\u7528 keychain\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"tailscale-daemon"}),"\n",(0,t.jsx)(n.li,{children:"tailscale-logdata"}),"\n",(0,t.jsx)(n.li,{children:"tailscale-machinekey"}),"\n",(0,t.jsx)(n.li,{children:"tailscale-preferences"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u4F7F\u7528 Apple Network Extension API - tailscaled \u4F7F\u7528 utun\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u7528\u6237\u7A7A\u95F4\uFF0CVPN \u7684\u5F62\u5F0F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["macOS tailscaled\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u72B6\u6001\u76EE\u5F55\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"root /Library/Tailscale/tailscaled.state"}),"\n",(0,t.jsx)(n.li,{children:"user $HOME/.local/share/tailscale/tailscaled.state"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.h2,{id:"headscale-now-requires-a-new-noiseprivate_key_path-field-in-the-config-file-for-the-tailscale-v2-protocol",children:["headscale now requires a new ",(0,t.jsx)(n.code,{children:"noise.private_key_path"})," field in the config file for the Tailscale v2 protocol"]}),"\n",(0,t.jsxs)(n.h2,{id:"register-request-post-httpshostmachineregister-all-connection-attempts-failed-http-unexpected-http-response-301-moved-permanently-https-unexpected-http-response-404-not-found",children:['register request: Post "',(0,t.jsx)(n.a,{href:"https://host/machine/register",children:"https://host/machine/register"}),'": all connection attempts failed (HTTP: unexpected HTTP response: 301 Moved Permanently, HTTPS: unexpected HTTP response: 404 Not Found)']}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E0D\u80FD cloudflare \u53CD\u5411\u4EE3\u7406"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/juanfont/headscale/issues/775",children:"https://github.com/juanfont/headscale/issues/775"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return i}});var a=s(75271);let t={},l=a.createContext(t);function i(e){let n=a.useContext(l);return a.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),a.createElement(l.Provider,{value:n},e.children)}}}]);