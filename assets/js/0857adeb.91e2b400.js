"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["82045"],{99167:function(e,n,s){s.r(n),s.d(n,{metadata:()=>a,contentTitle:()=>l,default:()=>o,assets:()=>t,toc:()=>h,frontMatter:()=>i});var a=JSON.parse('{"id":"service/auth/ldap/apacheds","title":"Apache Directory","description":"- Apache Directory\u2122","source":"@site/../notes/service/auth/ldap/apacheds.md","sourceDirName":"service/auth/ldap","slug":"/service/auth/ldap/apacheds","permalink":"/notes/service/auth/ldap/apacheds","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/auth/ldap/apacheds.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1660664456000,"frontMatter":{"title":"Apache Directory"},"sidebar":"docs","previous":{"title":"ApacheDS \u8FD0\u7EF4","permalink":"/notes/service/auth/ldap/apacheds-ops"},"next":{"title":"glauth","permalink":"/notes/service/auth/ldap/glauth"}}'),r=s("52676"),c=s("79938");let i={title:"Apache Directory"},l="Apache DS",t={},h=[{value:"Schema",id:"schema",level:2},{value:"\u624B\u52A8\u5B89\u88C5",id:"\u624B\u52A8\u5B89\u88C5",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,c.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"apache-ds",children:"Apache DS"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"http://directory.apache.org/",children:"Apache Directory\u2122"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"LDAP \u5B9E\u73B0"}),"\n",(0,r.jsx)(n.li,{children:"Kerberos \u5B9E\u73B0"}),"\n",(0,r.jsx)(n.li,{children:"\u540E\u7AEF\u4E3A\u81EA\u5B9A\u4E49 DB - \u9700\u8981\u78C1\u76D8\u7A7A\u95F4\u5B58\u50A8\uFF0C\u4E0D\u652F\u6301 DB"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u963F\u91CC\u4E91\u955C\u50CF\u4E0B\u8F7D ",(0,r.jsx)(n.a,{href:"http://mirrors.aliyun.com/apache/directory/",children:"http://mirrors.aliyun.com/apache/directory/"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u9ED8\u8BA4\u6388\u6743\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"uid=admin,ou=system"}),"\n",(0,r.jsx)(n.li,{children:"secret"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5B50\u9879\u76EE\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"ApacheDS - Directory Server - LDAP \u670D\u52A1\u5668"}),"\n",(0,r.jsx)(n.li,{children:"Apache Directory Studio - \u57FA\u4E8E Eclipse \u7684\u684C\u9762\u7BA1\u7406\u5DE5\u5177"}),"\n",(0,r.jsx)(n.li,{children:"LDAP API 1.x"}),"\n",(0,r.jsx)(n.li,{children:"LDAP API 2.x"}),"\n",(0,r.jsx)(n.li,{children:"Mavibot - \u540E\u7AEF\u7684 KV \u5B58\u50A8 - MVCC+BTree"}),"\n",(0,r.jsx)(n.li,{children:"Fortress - \u57FA\u4E8E\u89D2\u8272\u548C\u5C5E\u6027\u7684\u8BBF\u95EE\u63A7\u5236\u6388\u6743\u7CFB\u7EDF\uFF0C\u5C06\u7BA1\u7406\u548C\u5BC6\u7801\u7B56\u7565\u4EA4\u7531\u540E\u7AEF LDAP \u670D\u52A1"}),"\n",(0,r.jsx)(n.li,{children:"SCIMple"}),"\n",(0,r.jsxs)(n.li,{children:["Kerby - Java Kerberos\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u53EF\u4EE5\u72EC\u7ACB\u8FD0\u884C KDC"}),"\n",(0,r.jsx)(n.li,{children:"\u5305\u542B\u4E0D\u5C11 KDC \u5DE5\u5177"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u9ED8\u8BA4\u7AEF\u53E3\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"10389 - LDAP"}),"\n",(0,r.jsx)(n.li,{children:"10636 - LDAPs"}),"\n",(0,r.jsx)(n.li,{children:"60088 - Kerberos"}),"\n",(0,r.jsx)(n.li,{children:"60464 - Kerberos \u4FEE\u6539\u5BC6\u7801\u670D\u52A1"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u6CE8\u610F\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u65B0\u589E\u57DF\u540D\u9700\u8981\u5148\u6DFB\u52A0\u5206\u7247, \u6DFB\u52A0\u5206\u7247\u540E\u9700\u8981\u91CD\u542F\u540E\u751F\u6548"}),"\n",(0,r.jsxs)(n.li,{children:["\u90E8\u5206 schema \u662F\u7981\u7528\u7684, \u9700\u8981\u5728 ",(0,r.jsx)(n.code,{children:"ou=schema"})," \u4E0B\u542F\u7528\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u4F8B\u5982 posixAccount \u9700\u8981\u542F\u7528 nis , \u5728 ",(0,r.jsx)(n.code,{children:"cn=nis,ou=schema"})," \u4E2D, \u628A ",(0,r.jsx)(n.code,{children:"m-disable"})," \u8BBE\u7F6E\u4E3A false"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/kwart/kerberos-using-apacheds/blob/master/src/main/java/org/jboss/test/kerberos/CreateKeytab.java",children:"CreateKeytab.java"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# Docker \u542F\u52A8\n# \u5982\u679C\u9700\u8981 kerberos -p 60088:60088 -p 60464:60464  -p 60088:60088/udp -p 60464:60464/udp\ndocker run --rm -it -e TZ=Asia/Shanghai \\\n    -p 10389:10389 -p 10636:10636 \\\n    -v $PWD/apacheds:/opt/apacheds/instances \\\n    --name apacheds wener/apacheds\n\n# \u6D4B\u8BD5\u670D\u52A1\u5668\u662F\u5426\u542F\u52A8\u6210\u529F\nldapmodify -H ldap://127.0.0.1:10389\n# \u5907\u4EFD\u73B0\u6709\u6570\u636E\nldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub "(ObjectClass=*)" \'*\' + > backup.ldif\n# \u5224\u65AD\u7528\u6237\u662F\u5426\u5F52\u5C5E\u7EC4\nldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub  "(&(objectClass=person)(uid=wener)(memberof=CN=developer,OU=users,DC=example,DC=com))"\n'})}),"\n",(0,r.jsx)(n.h2,{id:"schema",children:"Schema"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u6240\u6709\u9884\u5B9A\u4E49 ",(0,r.jsx)(n.a,{href:"https://github.com/apache/directory-ldap-api/tree/master/ldap/schema/data/src/main/resources/schema/ou%3Dschema",children:"Schema"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://directory.apache.org/apacheds/basic-ug/2.3.2-enabling-schema.html",children:"Enabling Schema"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'alias ldapsearch=\'ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost\'\n\n# \u67E5\u770B Schema\nldapsearch -b "cn=schema" -s base "(objectclass=subschema)" objectclasses\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ldif",children:"# \u542F\u7528 schema\ndn: cn=nis,ou=schema\nchangetype: modify\ndelete: m-disabled\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u624B\u52A8\u5B89\u88C5",children:"\u624B\u52A8\u5B89\u88C5"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u5F53\u524D\u6700\u65B0\u7248\u4E3A 2.0.0-M26\nver=2.0.0.M26\nwget http://mirrors.aliyun.com/apache/directory/apacheds/dist/$ver/apacheds-$ver.zip\nunzip apacheds-$ver.zip\ncd apacheds-$ver\n\n# apacheds.sh [<instance name>] <action>\n# instance \u9ED8\u8BA4\u4E3A default, action \u4E3A run,start,stop,status,repair\n# \u542F\u52A8\u670D\u52A1\nsh ./bin/apacheds.sh run\n"})})]})}function o(e={}){let{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return i}});var a=s(75271);let r={},c=a.createContext(r);function i(e){let n=a.useContext(c);return a.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(c.Provider,{value:n},e.children)}}}]);