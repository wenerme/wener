"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["21951"],{40931:function(n,e,s){s.r(e),s.d(e,{metadata:()=>r,contentTitle:()=>l,default:()=>x,assets:()=>c,toc:()=>h,frontMatter:()=>d});var r=JSON.parse('{"id":"security/crypto/gpg","title":"GPG","description":"- GNU Privacy Guard","source":"@site/../notes/security/crypto/gpg.md","sourceDirName":"security/crypto","slug":"/security/crypto/gpg","permalink":"/notes/security/crypto/gpg","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/security/crypto/gpg.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"GPG"},"sidebar":"docs","previous":{"title":"Crypto Glossary","permalink":"/notes/security/crypto/glossary"},"next":{"title":"hashcat","permalink":"/notes/security/crypto/hashcat"}}'),i=s("52676"),t=s("79938");let d={title:"GPG"},l="GPG",c={},h=[{value:"gpg.conf",id:"gpgconf",level:3},{value:"gpg-agent",id:"gpg-agent",level:2},{value:"gpg-agent.conf",id:"gpg-agentconf",level:3},{value:"rsa2048",id:"rsa2048",level:2},{value:"ssh",id:"ssh",level:2},{value:"backup &amp; restore",id:"backup--restore",level:2},{value:"uid unknown",id:"uid-unknown",level:2},{value:"fingerprint",id:"fingerprint",level:2},{value:"\u5931\u6548\u540E\u64CD\u4F5C",id:"\u5931\u6548\u540E\u64CD\u4F5C",level:2},{value:"gpg: lookup_hashtable failed: Unknown system error",id:"gpg-lookup_hashtable-failed-unknown-system-error",level:3},{value:"A locale function failed",id:"a-locale-function-failed",level:2},{value:"subkeys",id:"subkeys",level:2},{value:"No pinentry",id:"no-pinentry",level:2},{value:"gpg --help",id:"gpg---help",level:2}];function g(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"gpg",children:"GPG"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/GNU_Privacy_Guard",children:"GNU Privacy Guard"})}),"\n",(0,i.jsxs)(e.li,{children:["Cheatsheet\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"http://stuff.imeos.org/persistent/gpg-cheatsheet.pdf",children:"http://stuff.imeos.org/persistent/gpg-cheatsheet.pdf"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://devhints.io/gnupg",children:"https://devhints.io/gnupg"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/",children:"http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["Public keyservers\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"pgp.mit.edu"}),"\n",(0,i.jsx)(e.li,{children:"keys.gnupg.net"}),"\n",(0,i.jsx)(e.li,{children:"sks-keyservers.net"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"~/.gnupg/pubring.gpg"})}),"\n",(0,i.jsx)(e.li,{children:"RFC 4880"}),"\n",(0,i.jsxs)(e.li,{children:["KEYID\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u90AE\u7BB1"}),"\n",(0,i.jsx)(e.li,{children:"641CA51175E65BF5F319443E1D0D06BE9E196B37"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://gnupg.org/documentation/manuals/gnupg/GPG-Commands.html",children:"https://gnupg.org/documentation/manuals/gnupg/GPG-Commands.html"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnupg.org/documentation/manuals.html",children:"https://www.gnupg.org/documentation/manuals.html"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["GnuPG\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"gpg - OpenPGP Protocol"}),"\n",(0,i.jsx)(e.li,{children:"gpgsm - S/MIME Protocol"}),"\n",(0,i.jsx)(e.li,{children:"gpg-card - Smartcards"}),"\n",(0,i.jsx)(e.li,{children:"dirmgr - crl, ocsp"}),"\n",(0,i.jsx)(e.li,{children:"gpg-agent"}),"\n",(0,i.jsx)(e.li,{children:"gpg-wks-client - Web Key Directory, Web Key Service"}),"\n",(0,i.jsx)(e.li,{children:"gpg-wks-server"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"libgcrypt"}),"\n",(0,i.jsx)(e.li,{children:"libksba"}),"\n",(0,i.jsx)(e.li,{children:"libassuan"}),"\n",(0,i.jsx)(e.li,{children:"GPGME"}),"\n",(0,i.jsx)(e.li,{children:"Scute"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'# macOS\n# pinentry-mac \u5BF9\u8BDD\u6846\u8F93\u5165 \u5BC6\u7801\nbrew install gpg pinentry-mac\n\n# \u751F\u6210\u79D8\u94A5 - RSA \u63A8\u8350\u81F3\u5C11 4096\ngpg --default-new-key-algo rsa4096 --gen-key\n# \u63A8\u8350 ECC\ngpg --default-new-key-algo "ed25519/cert,sign+cv25519/encr" --quick-generate-key "wener@wener.me"\n# \u5B8C\u6574\u751F\u6210\u903B\u8F91\ngpg --full-generate-key\n\ngpg --list-keys --keyid-format=long # \u5B8C\u6574\u7684 keyid\ngpg --list-secret-keys\ngpg --export --armor 0000000000000000 # \u5BFC\u51FA\u4E3A PEM \u683C\u5F0F\n\n# \u63D0\u4EA4\u5230\u670D\u52A1\u5668\ngpg --keyserver hkp://pgp.mit.edu --send-keys $KEYID\n# \u9A8C\u8BC1\u662F\u5426\u6210\u529F\ngpg --keyserver hkp://pgp.mit.edu --recv-keys $KEYID\n\n# \u5BFC\u51FA\ngpg --export-secret-keys $KEYID > private.key\n# \u5BFC\u5165\ngpg --import private.key\n\n# \u914D\u7F6E\u4FE1\u606F\ngpgconf --list-components\n# check password\ngpg --dry-run --passwd $KEYID\n'})}),"\n",(0,i.jsx)(e.h1,{id:"gnupg",children:"GnuPG"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["GNUPGHOME, ",(0,i.jsx)(e.code,{children:"--homedir"})]}),"\n",(0,i.jsxs)(e.li,{children:["~/.gnupg\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"S.gpg-agent"}),"\n",(0,i.jsxs)(e.li,{children:["S.gpg-agent.ssh - ",(0,i.jsx)(e.code,{children:"--enable-ssh-support"}),", ",(0,i.jsx)(e.code,{children:"--enable-putty-support"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5B9E\u73B0 ssh-agent"}),"\n",(0,i.jsx)(e.li,{children:"SSH_AUTH_SOCK"}),"\n",(0,i.jsx)(e.li,{children:"ssh 8.2 \u624D\u652F\u6301 FIDO2/U2F"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["S.gpg-agent.browser\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"keychain"}),"\n",(0,i.jsx)(e.li,{children:"\u8BF7\u6C42\u548C\u7F13\u5B58\u5BC6\u7801"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["S.gpg-agent.extra\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5141\u8BB8\u8FDC\u7A0B gpg \u4F7F\u7528\u672C\u5730 key"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["pubring.kbx\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"new public keyring using keybox format"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["pubring.gpg\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"legacy public keyring"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"trustdb.gpg"}),"\n",(0,i.jsxs)(e.li,{children:["openpgp-revocs.d/\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"revocation certificates"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"<ID>.rev"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["private-keys-v1.d/\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.code,{children:"<ID>.key"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"GPG_AGENT_INFO"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u5B8C\u6574\u4FE1\u606F\ngpg --with-colons --list-keys --with-fingerprint --with-fingerprint\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Field 1 - Type of record"}),"\n",(0,i.jsx)(e.li,{children:"Field 2 - Validity"}),"\n",(0,i.jsx)(e.li,{children:"Field 3 - Key length"}),"\n",(0,i.jsx)(e.li,{children:"Field 4 - Public key algorithm"}),"\n",(0,i.jsx)(e.li,{children:"Field 5 - KeyID"}),"\n",(0,i.jsx)(e.li,{children:"Field 6 - Creation date"}),"\n",(0,i.jsx)(e.li,{children:"Field 7 - Expiration date"}),"\n",(0,i.jsx)(e.li,{children:"Field 8 - Certificate S/N, UID hash, trust signature info"}),"\n",(0,i.jsx)(e.li,{children:"Field 9 - Ownertrust"}),"\n",(0,i.jsx)(e.li,{children:"Field 10 - User-ID"}),"\n",(0,i.jsx)(e.li,{children:"Field 11 - Signature class"}),"\n",(0,i.jsx)(e.li,{children:"Field 12 - Key capabilities"}),"\n",(0,i.jsx)(e.li,{children:"Field 13 - Issuer certificate fingerprint or other info"}),"\n",(0,i.jsx)(e.li,{children:"Field 14 - Flag field"}),"\n",(0,i.jsx)(e.li,{children:"Field 15 - S/N of a token"}),"\n",(0,i.jsx)(e.li,{children:"Field 16 - Hash algorithm"}),"\n",(0,i.jsx)(e.li,{children:"Field 17 - Curve name"}),"\n",(0,i.jsx)(e.li,{children:"Field 18 - Compliance flags"}),"\n",(0,i.jsx)(e.li,{children:"Field 19 - Last update"}),"\n",(0,i.jsx)(e.li,{children:"Field 20 - Origin"}),"\n",(0,i.jsx)(e.li,{children:"Field 21 - Comment"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"abbr."}),(0,i.jsx)(e.th,{children:"for"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"sec"}),(0,i.jsx)(e.td,{children:"SECret key"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ssb"}),(0,i.jsx)(e.td,{children:"Secret SuBkey"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"pub"}),(0,i.jsx)(e.td,{children:"PUBlic key"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"sub"}),(0,i.jsx)(e.td,{children:"public SUBkey - secondary key"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"uid"}),(0,i.jsx)(e.td,{children:"user id"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"sig"}),(0,i.jsx)(e.td,{children:"key signature"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"crt"}),(0,i.jsx)(e.td,{children:"X.509 certificate"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"crs"}),(0,i.jsx)(e.td,{children:"X.509 certificate and private key available"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"uat"}),(0,i.jsx)(e.td,{children:"User attribute (same as user id except for field 10)."})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"rev"}),(0,i.jsx)(e.td,{children:"Revocation signature"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"fpr"}),(0,i.jsx)(e.td,{children:"Fingerprint (fingerprint is in field 10)"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"pkd"}),(0,i.jsx)(e.td,{children:"Public key data"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"grp"}),(0,i.jsx)(e.td,{children:"Keygrip"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"rvk"}),(0,i.jsx)(e.td,{children:"Revocation key"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"tru"}),(0,i.jsx)(e.td,{children:"Trust database information"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"spk"}),(0,i.jsx)(e.td,{children:"Signature subpacket"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cfg"}),(0,i.jsx)(e.td,{children:"Configuration data"})]})]})]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["subkeys\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5728 master key \u4E4B\u4E0B"}),"\n",(0,i.jsx)(e.li,{children:"revoked independently"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://dev.gnupg.org/source/gnupg/browse/master/doc/DETAILS",children:"https://dev.gnupg.org/source/gnupg/browse/master/doc/DETAILS"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"abbr."}),(0,i.jsx)(e.th,{children:"for"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"rsa2048"}),(0,i.jsx)(e.td,{children:"RSA 2048"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"4096R"}),(0,i.jsx)(e.td,{children:"RSA 4096"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cv25519"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ed25519"}),(0,i.jsx)(e.td,{})]})]})]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"\u64CD\u4F5C"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"flag"}),(0,i.jsx)(e.th,{children:"for"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Signarure"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-s,--sign"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--clearsign,--clear-sign"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-b,--detach-sign"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--check-sigs,--check-signatures"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Enc/Dec"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-e,--encrypt"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-c,--symmetric"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--store"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-d,--decrypt"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--verify"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Multi"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--multifile"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--verify-files"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"--multifile --verify"})})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--encrypt-files"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"--multifile --encrypt"})})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--decrypt-files"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"--multifile --decrypt"})})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Keys"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-k,--list-keys,--list-pub-keys"}),(0,i.jsx)(e.td,{children:"\u516C\u94A5\u5217\u8868"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"-K,--list-secret-keys"}),(0,i.jsx)(e.td,{children:"\u79C1\u94A5\u5217\u8868"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--delete-keys NAME"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--delete-secret-keys NAME"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--delete-secret-and-public-key NAME"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--locate-keys,--locate-external-keys"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--show-keys"}),(0,i.jsx)(e.td,{children:"\u663E\u793A\u7ED9\u7684 Key \u7684\u4FE1\u606F"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--fingerprint"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Smartcard"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--edit-card,--card-edit"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--card-status"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--change-pin"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Export/Restore"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--export"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--export-secret-keys,--export-secret-subkeys"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--export-ssh-key"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--import,--fast-import"}),(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"--import-options merge-only"})})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--export-ownertrust"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--import-ownertrust"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Key Server"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--send-keys KEYIDS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--recv-keys,--receive-keys KEYIDS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--refresh-keys"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--search-keys NAMES"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--fetch-keys URL"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--update-trustdb"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--check-trustdb"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--rebuild-keydb-caches"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.strong,{children:"Misc"})}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--list-packets"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--print-md algo"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--print-mds"}),(0,i.jsx)(e.td,{children:"\u8BA1\u7B97\u6587\u4EF6\u6240\u6709\u6458\u8981"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--gen-random 0|1|2|16|30 COUNT"}),(0,i.jsx)(e.td,{children:"\u751F\u6210\u968F\u673A\u6570\u636E"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--gen-prime MODE BITS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"--enarmor,--dearmor"}),(0,i.jsx)(e.td,{})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"cap"}),(0,i.jsx)(e.th,{children:"create"}),(0,i.jsx)(e.th,{children:"for"}),(0,i.jsx)(e.th,{children:"note"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"s"}),(0,i.jsx)(e.td,{children:"sign"}),(0,i.jsx)(e.td,{children:"sign"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"e"}),(0,i.jsx)(e.td,{children:"encr"}),(0,i.jsx)(e.td,{children:"encrypt,decrypt"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"a"}),(0,i.jsx)(e.td,{children:"auth"}),(0,i.jsx)(e.td,{children:"authenticate"}),(0,i.jsx)(e.td,{children:"ssh login"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"c"}),(0,i.jsx)(e.td,{children:"cert"}),(0,i.jsx)(e.td,{children:"certify"}),(0,i.jsx)(e.td,{children:"\u7B7E\u540D\u53E6\u5916\u4E00\u4E2A key"})]})]})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u751F\u6210 base64 \u968F\u673A\ngpg -a --gen-random 1 20\n"})}),"\n",(0,i.jsx)(e.h3,{id:"gpgconf",children:"gpg.conf"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/drduh/config/blob/master/gpg.conf",children:"https://github.com/drduh/config/blob/master/gpg.conf"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"gpg-agent",children:"gpg-agent"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"for gpg, gpgsm"}),"\n",(0,i.jsx)(e.li,{children:"\u4F1A\u81EA\u52A8\u542F\u52A8"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'# \u4E3B\u52A8\u9000\u51FA\ngpg-connect-agent /bye\ngpgconf --kill gpg-agent\n\npidof gpg-agent\n\n# \u5E38\u7528\u8BBE\u7F6E\nGPG_TTY=$(tty)\nexport GPG_TTY\n\n# .bashrc\nexport GPG_TTY="$(tty)"\nexport SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)\ngpgconf --launch gpg-agent\n\n# \u67E5\u770B\u7F13\u5B58\u7684 Key\ngpg-connect-agent \'keyinfo --list\' /bye\ngpg-connect-agent "keyinfo --ssh-list --ssh-fpr" /bye\ngpg-connect-agent "keyinfo --ssh-list --ssh-fpr=sha1" /bye\n'})}),"\n",(0,i.jsx)(e.h3,{id:"gpg-agentconf",children:"gpg-agent.conf"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"~/.gnupg/gpg-agent.conf"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# https://www.gnupg.org/documentation/manuals/gnupg/Agent-Options.html\nenable-ssh-support\nttyname $GPG_TTY\npinentry-program /usr/local/bin/pinentry-mac\n\ndefault-cache-ttl 60\nmax-cache-ttl 120\n# pinentry-program /usr/bin/pinentry-curses\n#pinentry-program /usr/bin/pinentry-tty\n#pinentry-program /usr/bin/pinentry-gtk-2\n#pinentry-program /usr/bin/pinentry-x11\n#pinentry-program /usr/bin/pinentry-qt\n#pinentry-program /usr/local/bin/pinentry-curses\n#pinentry-program /usr/local/bin/pinentry-mac\n#pinentry-program /opt/homebrew/bin/pinentry-mac\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/drduh/config",children:"https://github.com/drduh/config"})}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(e.h2,{id:"rsa2048",children:"rsa2048"}),"\n",(0,i.jsx)(e.p,{children:"GPG \u9ED8\u8BA4 RSA2048\uFF0C\u4F46\u73B0\u5728\u5DF2\u7ECF\u4E0D\u63A8\u8350\u4E86\uFF0C\u5EFA\u8BAE\u81F3\u5C11 4096 bit\u3002"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["NIST Special Publication 800-57 - July 2012\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8BA4\u4E3A rsa2048 \u5728 2030 \u5E74\u524D\u8FD8\u662F\u5B89\u5168\u7684"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"Github \u8981\u6C42 RSA4096+"}),"\n",(0,i.jsx)(e.li,{children:"\u65B0 key \u63A8\u8350 ECC/elliptical-curve"}),"\n",(0,i.jsxs)(e.li,{children:["Github \u652F\u6301\u7684 Key \u7B97\u6CD5\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"RSA"}),"\n",(0,i.jsx)(e.li,{children:"ElGamal"}),"\n",(0,i.jsx)(e.li,{children:"DSA"}),"\n",(0,i.jsx)(e.li,{children:"ECDH"}),"\n",(0,i.jsx)(e.li,{children:"ECDSA"}),"\n",(0,i.jsx)(e.li,{children:"EdDSA"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"ssh",children:"ssh"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"gpg-agent \u652F\u6301\u4F5C\u4E3A ssh-agent"}),"\n",(0,i.jsxs)(e.li,{children:["ssh key \u53EF\u5BFC\u5165\u5230 gpg \u4F46 ",(0,i.jsx)(e.strong,{children:"\u4E0D\u63A8\u8350"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://github.com/dkg/monkeysphere",children:"dkg/monkeysphere"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"pem2openpgp"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u521B\u5EFA\u7528\u4E8E SSH \u767B\u9646\u7684 keu\ngpg --quick-add-key $KEYID ed25519 auth 1y\ngpg -k --with-keygrip $KEYID\n\ngpg --export-ssh-key $KEYID\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'echo enable-ssh-support >> $HOME/.gnupg/gpg-agent.conf\n\n# \u542F\u52A8\nunset SSH_AGENT_PID\nif [ "${gnupg_SSH_AUTH_SOCK_by:-0}" -ne $$ ]; then\n  export SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"\nfi\nexport GPG_TTY=$(tty)\ngpg-connect-agent updatestartuptty /bye > /dev/null\n\n# \u901A\u8FC7 gpgconf \u542F\u52A8\n# gpgconf --launch gpg-agent\n\ngpg --list-keys --with-keygrip\necho $KEYGRIP >> ~/.gnupg/sshcontrol\nssh-add -l\n\n# ssh-ed25519 XXXX openpgp:0xABCD\ngpg --export-ssh-key $KEYID\n\n# \u5982\u679C\u914D\u7F6E\u4E86 github \u53EF\u4EE5\u6D4B\u8BD5\nssh -T git@github.com\n'})}),"\n",(0,i.jsx)(e.h2,{id:"backup--restore",children:"backup & restore"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"KEYID=$(gpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]')\ngpg -a --export-secret-keys $KEYID > private.gpg\ngpg -a --export-secret-subkeys $KEYID >> private.gpg\ngpg --batch --yes --delete-secret-and-public-key $KEYID\ngpg --show-keys private.gpg\ngpg --import private.gpg\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# \u5907\u4EFD secret master key\n# -a \u4F7F\u7528 PEM \u683C\u5F0F\ngpg -a -o secrets.gpg --export-secret-keys wener@wener.me\ngpg -a -o subkeys.gpg --export-secret-subkeys wener@wener.me\n\ngpg --show-keys secrets.gpg subkeys.gpg\ngpg --list-packets secrets.gpg\ngpg --list-packets subkeys.gpg\n\nKEYID=$(gpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]')\n# --batch --yes \u9700\u8981\u7528 fingerprint\ngpg --batch --yes --delete-secret-and-public-key $KEYID\ngpg -K\ngpg -k\n\n# \u5BFC\u5165\n# key \u540E\u9762\u663E\u793A # \u8868\u793A key \u975E\u672C\u5730\u5B58\u50A8\ngpg --import subkeys.gpg\ngpg -K\ngpg --import secrets.gpg\ngpg -K\ngpg -k\n\n# \u53EF\u4EE5\u5408\u5E76\u4E3A\u5355\u4E2A\u6587\u4EF6\n# cat subkeys.gpg secrets.gpg > backup.gpg\n\n# \u4FE1\u4EFB\necho -e \"5\\ny\\n\" | gpg --command-fd 0 --expert --edit-key $KEYID trust\n"})}),"\n",(0,i.jsx)(e.h2,{id:"uid-unknown",children:"uid unknown"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u91CD\u65B0 trust \u5373\u53EF"}),"\n",(0,i.jsx)(e.li,{children:"~/.gnupg/trustdb.gpg"}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:'gpg --edit-key $KEYID\ntrust\n5\nsave\n\n# \u6279\u5904\u7406\necho -e "5\\ny\\n" | gpg --command-fd 0 --expert --edit-key wener@wener.me trust\n'})}),"\n",(0,i.jsx)(e.h2,{id:"fingerprint",children:"fingerprint"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"gpg -k wener@wener.me | head -n 2 | tail -n 1 | tr -d '[:blank:]'\ngpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]'\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u5931\u6548\u540E\u64CD\u4F5C",children:"\u5931\u6548\u540E\u64CD\u4F5C"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"gpg --edit-key $KEYID\nlist\n\nkey 0\nexpire\n\nkey 1\nexpire\n\nlist # \u786E\u8BA4\nsave # \u4FDD\u5B58\u9000\u51FA\n"})}),"\n",(0,i.jsx)(e.h3,{id:"gpg-lookup_hashtable-failed-unknown-system-error",children:"gpg: lookup_hashtable failed: Unknown system error"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"gpg --fix-trustdb\n\ncd ~/.gnupg\ngpg --export-ownertrust > otrust.tmp\nrm trustdb.gpg\ngpg --import-ownertrust < otrust.tmp\n"})}),"\n",(0,i.jsx)(e.h2,{id:"a-locale-function-failed",children:"A locale function failed"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"--batch --yes"})," \u907F\u514D"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=866023",children:"https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=866023"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"subkeys",children:"subkeys"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://wiki.debian.org/Subkeys",children:"https://wiki.debian.org/Subkeys"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"no-pinentry",children:"No pinentry"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"gpgconf --kill gpg-agent\n"})}),"\n",(0,i.jsx)(e.h2,{id:"gpg---help",children:"gpg --help"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"gpg (GnuPG) 2.2.5\nlibgcrypt 1.8.2\nCopyright (C) 2018 Free Software Foundation, Inc.\nLicense GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>\nThis is free software: you are free to change and redistribute it.\nThere is NO WARRANTY, to the extent permitted by law.\n\nHome: /Users/user/.gnupg\n\u652F\u6301\u7684\u7B97\u6CD5\uFF1A\n\u516C\u94A5\uFF1ARSA, ELG, DSA, ECDH, ECDSA, EDDSA\n\u5BF9\u79F0\u52A0\u5BC6\uFF1AIDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256,\n     TWOFISH, CAMELLIA128, CAMELLIA192, CAMELLIA256\n\u6563\u5217\uFF1ASHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224\n\u538B\u7F29\uFF1A\u4E0D\u538B\u7F29, ZIP, ZLIB, BZIP2\n\nSyntax: gpg [options] [files]\nSign, check, encrypt or decrypt\nDefault operation depends on the input data\n\n\u6307\u4EE4\uFF1A\n\n -s, --sign                  make a signature\n     --clear-sign            make a clear text signature\n -b, --detach-sign           \u751F\u6210\u4E00\u4EFD\u5206\u79BB\u7684\u7B7E\u540D\n -e, --encrypt               \u52A0\u5BC6\u6570\u636E\n -c, --symmetric             \u4EC5\u4F7F\u7528\u5BF9\u79F0\u52A0\u5BC6\n -d, --decrypt               \u89E3\u5BC6\u6570\u636E(\u9ED8\u8BA4)\n     --verify                \u9A8C\u8BC1\u7B7E\u540D\n -k, --list-keys             \u5217\u51FA\u5BC6\u94A5\n     --list-signatures       \u5217\u51FA\u5BC6\u94A5\u548C\u7B7E\u540D\n     --check-signatures      \u5217\u51FA\u5E76\u68C0\u67E5\u5BC6\u94A5\u7B7E\u540D\n     --fingerprint           \u5217\u51FA\u5BC6\u94A5\u548C\u6307\u7EB9\n -K, --list-secret-keys      \u5217\u51FA\u79C1\u94A5\n     --generate-key          \u751F\u6210\u4E00\u526F\u65B0\u7684\u5BC6\u94A5\u5BF9\n     --quick-generate-key    quickly generate a new key pair\n     --quick-add-uid         quickly add a new user-id\n     --quick-revoke-uid      quickly revoke a user-id\n     --quick-set-expire      quickly set a new expiration date\n     --full-generate-key     full featured key pair generation\n     --generate-revocation   \u751F\u6210\u4E00\u4EFD\u540A\u9500\u8BC1\u4E66\n     --delete-keys           \u4ECE\u516C\u94A5\u94A5\u5319\u73AF\u91CC\u5220\u9664\u5BC6\u94A5\n     --delete-secret-keys    \u4ECE\u79C1\u94A5\u94A5\u5319\u73AF\u91CC\u5220\u9664\u5BC6\u94A5\n     --quick-sign-key        quickly sign a key\n     --quick-lsign-key       quickly sign a key locally\n     --sign-key              \u4E3A\u67D0\u628A\u5BC6\u94A5\u6DFB\u52A0\u7B7E\u540D\n     --lsign-key             \u4E3A\u67D0\u628A\u5BC6\u94A5\u6DFB\u52A0\u672C\u5730\u7B7E\u540D\n     --edit-key              \u7F16\u8F91\u67D0\u628A\u5BC6\u94A5\u6216\u4E3A\u5176\u6DFB\u52A0\u7B7E\u540D\n     --change-passphrase     change a passphrase\n     --export                \u5BFC\u51FA\u5BC6\u94A5\n     --send-keys             \u628A\u5BC6\u94A5\u5BFC\u51FA\u5230\u67D0\u4E2A\u516C\u94A5\u670D\u52A1\u5668\u4E0A\n     --receive-keys          \u4ECE\u516C\u94A5\u670D\u52A1\u5668\u4E0A\u5BFC\u5165\u5BC6\u94A5\n     --search-keys           \u5728\u516C\u94A5\u670D\u52A1\u5668\u4E0A\u641C\u5BFB\u5BC6\u94A5\n     --refresh-keys          \u4ECE\u516C\u94A5\u670D\u52A1\u5668\u66F4\u65B0\u6240\u6709\u7684\u672C\u5730\u5BC6\u94A5\n     --import                \u5BFC\u5165/\u5408\u5E76\u5BC6\u94A5\n     --card-status           \u6253\u5370\u5361\u72B6\u6001\n     --edit-card             \u66F4\u6539\u5361\u4E0A\u7684\u6570\u636E\n     --change-pin            \u66F4\u6539\u5361\u7684 PIN\n     --update-trustdb        \u66F4\u65B0\u4FE1\u4EFB\u5EA6\u6570\u636E\u5E93\n     --print-md              print message digests\n     --server                run in server mode\n     --tofu-policy VALUE     set the TOFU policy for a key\n\n\u9009\u9879\uFF1A\n\n -a, --armor                 \u8F93\u51FA\u7ECF ASCII \u5C01\u88C5\n -r, --recipient USER-ID     encrypt for USER-ID\n -u, --local-user USER-ID    use USER-ID to sign or decrypt\n -z N                        set compress level to N (0 disables)\n     --textmode              \u4F7F\u7528\u6807\u51C6\u7684\u6587\u672C\u6A21\u5F0F\n -o, --output FILE           write output to FILE\n -v, --verbose               \u8BE6\u7EC6\u6A21\u5F0F\n -n, --dry-run               \u4E0D\u505A\u4EFB\u4F55\u6539\u53D8\n -i, --interactive           \u8986\u76D6\u524D\u5148\u8BE2\u95EE\n     --openpgp               \u884C\u4E3A\u4E25\u683C\u9075\u5FAA OpenPGP \u5B9A\u4E49\n\n(\u8BF7\u53C2\u8003\u5728\u7EBF\u8BF4\u660E\u4EE5\u83B7\u5F97\u6240\u6709\u547D\u4EE4\u548C\u9009\u9879\u7684\u5B8C\u6574\u6E05\u5355)\n\nExamples:\n\n -se -r Bob [file]          sign and encrypt for user Bob\n --clear-sign [file]        make a clear text signature\n --detach-sign [file]       make a detached signature\n --list-keys [names]        show keys\n --fingerprint [names]      show fingerprints\n\n\u8BF7\u5411 <https://bugs.gnupg.org> \u62A5\u544A\u7A0B\u5E8F\u7F3A\u9677\u3002\n\u8BF7\u5411 <zuxyhere@eastday.com> \u53CD\u6620\u7B80\u4F53\u4E2D\u6587\u7FFB\u8BD1\u7684\u95EE\u9898\u3002\n"})})]})}function x(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(g,{...n})}):g(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return l},a:function(){return d}});var r=s(75271);let i={},t=r.createContext(i);function d(n){let e=r.useContext(t);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),r.createElement(t.Provider,{value:e},n.children)}}}]);