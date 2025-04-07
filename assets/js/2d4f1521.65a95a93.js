"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["46617"],{15346:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>d,assets:()=>a,toc:()=>h,frontMatter:()=>t});var i=JSON.parse('{"id":"network/application/ssl","title":"SSL","description":"Tips","source":"@site/../notes/network/application/ssl.md","sourceDirName":"network/application","slug":"/network/application/ssl","permalink":"/notes/network/application/ssl","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/network/application/ssl.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1645033829000,"frontMatter":{"id":"ssl","title":"SSL"},"sidebar":"docs","previous":{"title":"SNMP","permalink":"/notes/network/application/snmp"},"next":{"title":"IEEE 802","permalink":"/notes/network/ieee-802"}}'),r=s("52676"),l=s("79938");let t={id:"ssl",title:"SSL"},c="SSL",a={},h=[{value:"Tips",id:"tips",level:2},{value:"Convert",id:"convert",level:2},{value:"CA",id:"ca",level:2},{value:"CFSSL",id:"cfssl",level:2},{value:"FAQ",id:"faq",level:2},{value:"SSL/TLS mutual authentication",id:"ssltls-mutual-authentication",level:3},{value:"Revoke",id:"revoke",level:3},{value:"Java \u542F\u52A8\u65F6 ssl \u76F8\u5173\u53C2\u6570",id:"java-\u542F\u52A8\u65F6-ssl-\u76F8\u5173\u53C2\u6570",level:3},{value:"Server Cert vs Client Cert",id:"server-cert-vs-client-cert",level:3}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"ssl",children:"SSL"})}),"\n",(0,r.jsx)(n.h2,{id:"tips",children:"Tips"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Comparison_of_TLS_implementations",children:"https://en.wikipedia.org/wiki/Comparison_of_TLS_implementations"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://curl.haxx.se/docs/ssl-compared.html",children:"https://curl.haxx.se/docs/ssl-compared.html"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://www.cyberciti.biz/faq/test-ssl-certificates-diagnosis-ssl-certificate/",children:"https://www.cyberciti.biz/faq/test-ssl-certificates-diagnosis-ssl-certificate/"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u8D2D\u4E70"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.sslshopper.com/certificate-authority-reviews.html",children:"https://www.sslshopper.com/certificate-authority-reviews.html"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"FAQ"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Java \u662F\u4E0D\u652F\u6301\u6CDB\u57DF\u540D\u7684, \u4F46\u662F\u652F\u6301 SAN"}),"\n",(0,r.jsx)(n.li,{children:"\u4E2D\u95F4\u8BC1\u4E66\u4E0D\u80FD\u88AB\u9650\u5236\u5BF9\u54EA\u4E9B\u57DF\u540D\u8FDB\u884C\u5206\u53D1\u8BC1\u4E66, \u56E0\u6B64\u53EA\u6709\u771F\u6B63\u503C\u5F97\u4FE1\u4EFB\u7684\u673A\u6784\u624D\u4F1A\u6709\u4E2D\u95F4\u8BC1\u4E66"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"\u5728\u7EBF\u68C0\u6D4B"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.sslchecker.com/sslchecker",children:"https://www.sslchecker.com/sslchecker"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.sslshopper.com/ssl-checker.html",children:"https://www.sslshopper.com/ssl-checker.html"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://sslanalyzer.comodoca.com",children:"https://sslanalyzer.comodoca.com"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet",children:"https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Java Keystore"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://portecle.sourceforge.net/",children:"http://portecle.sourceforge.net/"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://keystore-explorer.org/",children:"http://keystore-explorer.org/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Let's Encrypt"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://letsencrypt.org/docs/rate-limits/",children:"Rate Limits"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"SAN \u6700\u591A 100"}),"\n",(0,r.jsx)(n.li,{children:"\u4E00\u5468\u8BC1\u4E66\u6700\u591A\u91CD\u590D 5 \u6B21"}),"\n",(0,r.jsx)(n.li,{children:"\u5B50\u57DF\u540D\u8BC1\u4E66, \u7B2C\u4E00\u5468 20, \u7B2C\u4E8C\u5468 40, \u4EE5\u6B64\u7C7B\u63A8"}),"\n",(0,r.jsx)(n.li,{children:"\u9A8C\u8BC1\u5931\u8D25\u9650\u5236, 5\u6B21 \u6BCF\u8D26\u53F7 \u6BCF\u4E3B\u673A\u540D \u6BCF\u5C0F\u65F6"}),"\n",(0,r.jsx)(n.li,{children:"new-reg, new-authz, new-cert \u5171\u4EAB 20rps \u7684\u9650\u5236"}),"\n",(0,r.jsx)(n.li,{children:"/directory, /acme \u5171\u4EAB 40rps \u9650\u5236"}),"\n",(0,r.jsx)(n.li,{children:"\u6BCF IP \u6BCF\u5C0F\u65F6 \u6700\u591A\u521B\u5EFA 10 \u4E2A\u8D26\u53F7"}),"\n",(0,r.jsx)(n.li,{children:"\u6BCF 3 \u5C0F\u65F6 \u6BCF IP \u6BB5 \u6700\u591A\u521B\u5EFA 500 \u4E2A\u8D26\u53F7"}),"\n",(0,r.jsx)(n.li,{children:"\u5EFA\u8BAE\u53EA\u4F7F\u7528\u4E00\u4E2A\u8D26\u53F7"}),"\n",(0,r.jsx)(n.li,{children:"\u6700\u591A 300 Pending Authorizations"}),"\n",(0,r.jsx)(n.li,{children:"\u53EF\u4EE5\u7533\u8BF7\u63D0\u5347\u9650\u989D"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Tools"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://crt.sh/",children:"crt.sh"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u67E5\u8BE2\u5206\u53D1\u7684\u8BC1\u4E66"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/shred/acme4j",children:"shred/acme4j"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Java client for ACME (Let's Encrypt)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Automatic Certificate Management Environment (ACME)"}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"PEM - Privacy Enhanced Mail"}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"DER - Distinguished Encoding Rules,"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"-inform der"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"SNI"}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://shansing.com/read/355/",children:"https://shansing.com/read/355/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# \u663E\u793A\u8BC1\u4E66\nopenssl s_client -showcerts -connect wener.me:443\n# SNI\nopenssl s_client -showcerts -servername wener.me -connect 104.28.26.88:443\n\n# \u622A\u53D6\u8BC1\u4E66\u90E8\u5206\necho "" | openssl s_client -connect dm-101.data.aliyun.com:443 -prexit 2>/dev/null | sed -n -e \'/BEGIN\\ CERTIFICATE/,/END\\ CERTIFICATE/ p\'\n\ncert_fetch(){\n  mkdir -p ~/.cert/$1;cd ~/.cert/$1;\n  echo "" | openssl s_client -connect $1:443 -prexit 2>/dev/null | \\\n    sed -n -e \'/BEGIN\\ CERTIFICATE/,/END\\ CERTIFICATE/ p\' > $1.pem\n}\n\n# https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning\nopenssl s_client -servername www.example.com -connect www.example.com:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64\n\n# \u4E0B\u8F7D crt\nopenssl x509 -in <(openssl s_client -connect example.com:443 -prexit 2>/dev/null) -out example.crt\n# \u5BFC\u5165 crt\nsudo keytool -importcert -file example.crt -alias example -keystore $(/usr/libexec/java_home)/jre/lib/security/cacerts -storepass changeit\n# \u5BFC\u5165 cer\nkeytool -importcert -file certificate.cer -keystore keystore.jks -alias "Alias"\n\n# \u751F\u6210 CSR\n# https://support.rackspace.com/how-to/generate-a-csr-with-openssl/\n# \u751F\u6210 Key\nopenssl genrsa -out wener.me.key 4096\n# \u751F\u6210\u65B0\u7684 CSR\npenssl req -new -sha256 -key wener.me.key -out wener.me.csr\n# \u7136\u540E\u63D0\u4EA4 wener.me.csr \u5373\u53EF\n# \u62FF\u5230\u5206\u53D1\u7684 x509 \u53EF\u751F\u6210 pem \u4EE5\u4F9B nginx \u4F7F\u7528\nopenssl x509 -in wener.me.x509 -out wener.me.pem -outform PEM\n# \u67E5\u770B\u8BC1\u4E66\u4FE1\u606F\nopenssl x509 -in wener.me.pem -text -noout\n\n# Let\'s Encrypt certbot\nbrew install certbot\ncertbot certonly --standalone --preferred-challenges tls-sni -d example.com --staple-ocsp -m example@example.com --agree-tos --work-dir . --config-dir ./config --logs-dir ./logs\n'})}),"\n",(0,r.jsx)(n.h2,{id:"convert",children:"Convert"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://stackoverflow.com/q/13732826/1870054",children:"https://stackoverflow.com/q/13732826/1870054"})}),"\n",(0,r.jsx)(n.h2,{id:"ca",children:"CA"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://jamielinux.com/docs/openssl-certificate-authority/",children:"https://jamielinux.com/docs/openssl-certificate-authority/"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"cfssl",children:"CFSSL"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/cloudflare/cfssl",children:"https://github.com/cloudflare/cfssl"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://cfssl.org/scan",children:"https://cfssl.org/scan"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/jason-riddle/generating-certs/wiki",children:"https://github.com/jason-riddle/generating-certs/wiki"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5B89\u88C5\ngo get -u github.com/cloudflare/cfssl/cmd/...\n"})}),"\n",(0,r.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(n.h3,{id:"ssltls-mutual-authentication",children:"SSL/TLS mutual authentication"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u540C\u65F6\u9A8C\u8BC1\u8BC1\u4E66, \u56E0\u6B64\u8981\u6C42\u5BA2\u6237\u7AEF\u914D\u7F6E cert \u548C key"}),"\n",(0,r.jsxs)(n.li,{children:["Golang ClientAuthType\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"NoClientCert"}),"\n",(0,r.jsx)(n.li,{children:"RequestClientCert"}),"\n",(0,r.jsx)(n.li,{children:"RequireAnyClientCert"}),"\n",(0,r.jsx)(n.li,{children:"VerifyClientCertIfGiven"}),"\n",(0,r.jsx)(n.li,{children:"RequireAndVerifyClientCert"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"revoke",children:"Revoke"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://jamielinux.com/docs/openssl-certificate-authority/certificate-revocation-lists.html",children:"Certificate revocation lists"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"[ server_cert ]\n# \u5728\u670D\u52A1\u914D\u7F6E\u4E2D\u6307\u5B9A crl\ncrlDistributionPoints = URI:http://example.com/intermediate.crl.pem\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u751F\u6210 CLR\nopenssl ca -config intermediate/openssl.cnf \\\n      -gencrl -out intermediate/crl/intermediate.crl.pem\n# \u68C0\u67E5 crl \u4E2D\u7684\u5185\u5BB9\nopenssl crl -in intermediate/crl/intermediate.crl.pem -noout -text\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"crl.pem"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"R 160420124740Z 150411125310Z 1001 unknown ... /CN=bob@example.com\n"})}),"\n",(0,r.jsx)(n.h3,{id:"java-\u542F\u52A8\u65F6-ssl-\u76F8\u5173\u53C2\u6570",children:"Java \u542F\u52A8\u65F6 ssl \u76F8\u5173\u53C2\u6570"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"http://docs.oracle.com/javase/1.5.0/docs/guide/security/jsse/JSSERefGuide.html#Debug",children:"http://docs.oracle.com/javase/1.5.0/docs/guide/security/jsse/JSSERefGuide.html#Debug"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"java -Djavax.net.debug=all -Djavax.net.ssl.trustStore=trustStore ...\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["debug \u53C2\u6570\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"all            turn on all debugging"}),"\n",(0,r.jsx)(n.li,{children:"ssl            turn on ssl debugging"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"ssl \u76F8\u5173\u53C2\u6570"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"record       enable per-record tracing\nhandshake    print each handshake message\nkeygen       print key generation data\nsession      print session activity\ndefaultctx   print default SSL initialization\nsslctx       print SSLContext tracing\nsessioncache print session cache tracing\nkeymanager   print key manager tracing\ntrustmanager print trust manager tracing\npluggability print pluggability tracing\n\nhandshake debugging can be widened with:\ndata         hex dump of each handshake message\nverbose      verbose handshake message printing\n\nrecord debugging can be widened with:\nplaintext    hex dump of record plaintext\npacket       print raw SSL/TLS packets\n"})}),"\n",(0,r.jsx)(n.h3,{id:"server-cert-vs-client-cert",children:"Server Cert vs Client Cert"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://stackoverflow.com/q/24752105/1870054",children:"https://stackoverflow.com/q/24752105/1870054"})}),"\n",(0,r.jsxs)(n.li,{children:["Server\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Signing\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8BC1\u4E66\u4E2D\u7684\u79D8\u94A5\u80FD\u7528\u4E8E\u6807\u8BC6 CN \u4E2D\u8BF4\u660E\u7684\u670D\u52A1, \u5B9E\u4F53\u8BA4\u8BC1"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Key Encipherment\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u8BC1\u4E66\u4E2D\u7684\u79D8\u94A5\u53EF\u4EE5\u7528\u4E8E\u52A0\u5BC6\u4ECE\u4F1A\u8BDD\u4E2D\u884D\u751F\u7684\u4F1A\u8BDD\u79D8\u94A5(\u5BF9\u7B49\u79D8\u94A5)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Client\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Signing"}),"\n"]}),"\n"]}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return t}});var i=s(75271);let r={},l=i.createContext(r);function t(e){let n=i.useContext(l);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);