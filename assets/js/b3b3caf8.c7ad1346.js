"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["46430"],{84314:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>a,frontMatter:()=>t});var s=JSON.parse('{"id":"platform/wecom/wecom-archive","title":"\u4F1A\u8BDD\u5185\u5BB9\u5B58\u6863","description":"1. \u4F1A\u8BDD\u5B58\u6863\u4FDD\u5B58 5 \u5929","source":"@site/../notes/platform/wecom/wecom-archive.md","sourceDirName":"platform/wecom","slug":"/platform/wecom/archive","permalink":"/notes/platform/wecom/archive","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/platform/wecom/wecom-archive.md","tags":[{"inline":true,"label":"Backup","permalink":"/notes/tags/backup"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1730187174000,"frontMatter":{"tags":["Backup"]},"sidebar":"docs","previous":{"title":"\u4F01\u4E1A\u5FAE\u4FE1","permalink":"/notes/platform/wecom/"},"next":{"title":"\u4F01\u4E1A\u5FAE\u4FE1\u5F00\u53D1","permalink":"/notes/platform/wecom/dev"}}'),r=i("52676"),l=i("79938");let t={tags:["Backup"]},d="\u4F1A\u8BDD\u5185\u5BB9\u5B58\u6863",c={},a=[{value:"message",id:"message",level:2},{value:"SDK \u4F9D\u8D56",id:"sdk-\u4F9D\u8D56",level:2},{value:"libWeWorkFinanceSdk_C",id:"libweworkfinancesdk_c",level:2},{value:"10006: \u89E3\u5BC6\u5931\u8D25 GetMediaData",id:"10006-\u89E3\u5BC6\u5931\u8D25-getmediadata",level:2},{value:"Quote",id:"quote",level:2}];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"\u4F1A\u8BDD\u5185\u5BB9\u5B58\u6863",children:"\u4F1A\u8BDD\u5185\u5BB9\u5B58\u6863"})}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4F1A\u8BDD\u5B58\u6863\u4FDD\u5B58 ",(0,r.jsx)(e.strong,{children:"5"})," \u5929"]}),"\n",(0,r.jsx)(e.li,{children:"\u4ECE Sequence+1 \u62C9\u53D6\uFF0C\u4E0D\u5305\u542B Sequence"}),"\n",(0,r.jsx)(e.li,{children:"GetChat limit \u6700\u5927 1000"}),"\n",(0,r.jsx)(e.li,{children:"\u56FE\u7247 jpg, \u97F3\u9891 amr, \u89C6\u9891 mp4"}),"\n",(0,r.jsx)(e.li,{children:"\u53EF\u80FD\u5B58\u5728 MD5 \u4E3A\u7A7A\u5B57\u7B26\u4E32"}),"\n",(0,r.jsx)(e.li,{children:"MediaData \u7684 MD5 \u53EF\u80FD\u5339\u914D\u4E0D\u4E0A\uFF0C\u53EF\u4EE5\u591A\u6B21\u91CD\u8BD5"}),"\n",(0,r.jsx)(e.li,{children:"MediaData \u5355\u6B21\u6700\u591A\u8FD4\u56DE 512K"}),"\n",(0,r.jsx)(e.li,{children:"NewSDK, InitSDK \u53EA\u9700\u8981\u8C03\u7528\u4E00\u6B21"}),"\n",(0,r.jsx)(e.li,{children:"switch \u5207\u6362\u4F01\u4E1A\u65E5\u5FD7\u4E0D\u662F\u771F\u6B63\u7684\u6D88\u606F\uFF0C\u4E0E\u4E0A\u8FF0\u6D88\u606F\u7ED3\u6784\u4E0D\u5B8C\u5168\u76F8\u540C\u3002"}),"\n",(0,r.jsx)(e.li,{children:"\u9519\u8BEF 10001-10003 \u53EF\u4EE5\u91CD\u8BD5"}),"\n",(0,r.jsx)(e.li,{children:"\u63A5\u6536\u4E8B\u4EF6\u56DE\u8C03 \u6700\u5C0F\u95F4\u9694 15s"}),"\n"]})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["libWeWorkFinanceSdk_C.so\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F9D\u8D56 GLIBC"}),"\n",(0,r.jsxs)(e.li,{children:["\u4F7F\u7528\u4E86 libcurl\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"https_proxy \u80FD\u751F\u6548"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u5B9E\u9645\u8BF7\u6C42 qyapi.weixin.qq.com"}),"\n",(0,r.jsxs)(e.li,{children:["\u300C\u4F1A\u8BDD\u5185\u5BB9\u5B58\u6863\u300DSecret \u6743\u9650\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7FA4\u4FE1\u606F\uFF1A\u7FA4\u540D\u3001\u7FA4\u4E3B\u3001\u7FA4\u516C\u544A\u3001\u7FA4\u6210\u5458\u5165\u7FA4\u65F6\u95F4"}),"\n",(0,r.jsx)(e.li,{children:"\u4F1A\u8BDD\u4FE1\u606F\uFF1A\u4F1A\u8BDD\u53D1\u9001\u65B9\u3001\u4F1A\u8BDD\u53D1\u9001\u65F6\u95F4\u3001\u4F1A\u8BDD\u63A5\u6536\u65B9\u3001\u4F1A\u8BDD\u5185\u5BB9"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://developer.work.weixin.qq.com/document/path/91774",children:"https://developer.work.weixin.qq.com/document/path/91774"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# RSA2048 key\nopenssl genrsa -out wecom.pri.pem 2048\nopenssl rsa -in wecom.pri.pem -pubout -out wecom.pub.pem\n"})}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"\u83B7\u53D6 wr \u548C wm \u4FE1\u606F"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u5185\u90E8\u7FA4 - inner room\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["POST /cgi-bin/msgaudit/groupchat/get ",(0,r.jsx)(e.code,{children:'{"roomid":""}'})]}),"\n",(0,r.jsx)(e.li,{children:"\u4F1A\u8BDD\u5B58\u6863 Secret \u53EF\u8C03\u7528"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u5916\u90E8\u5BA2\u6237\u7FA4 - external contact group\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["POST /cgi-bin/externalcontact/groupchat/get ",(0,r.jsx)(e.code,{children:'{"chat_id":""}'})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u5916\u90E8\u5BA2\u6237\u7FA4\u5217\u8868\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"POST /cgi-bin/externalcontact/groupchat/list"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.strong,{children:"\u6CE8\u610F"})," \u6709\u7684\u7FA4\u662F\u65E0\u6CD5\u53D6\u5230\u4FE1\u606F\u7684\uFF0C\u7531\u5FAE\u4FE1\u62C9\u8D77\u7684\u7FA4"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"message",children:"message"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["action\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"send \u53D1\u9001\u6D88\u606F"}),"\n",(0,r.jsx)(e.li,{children:"recall \u64A4\u56DE\u6D88\u606F"}),"\n",(0,r.jsx)(e.li,{children:"switch \u5207\u6362\u4F01\u4E1A\u65E5\u5FD7"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["proxy \u683C\u5F0F socks5://10.0.0.1:8081, ",(0,r.jsx)(e.a,{href:"http://10.0.0.1:8081",children:"http://10.0.0.1:8081"})]}),"\n",(0,r.jsx)(e.li,{children:"proxy credentials \u683C\u5F0F username:password"}),"\n",(0,r.jsxs)(e.li,{children:["\u5355\u804A\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"from \u53D1\u9001\u65B9, tolist \u53EA\u6709\u4E00\u4E2A\u63A5\u6536\u65B9"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u7FA4\u804A\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"from \u53D1\u9001\u65B9, tolist \u7FA4\u5185\u5176\u4ED6\u6210\u5458, roomid \u975E\u7A7A"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"\u56FE\u7247 jpg, \u8BED\u97F3 amr, \u89C6\u9891 mp4"}),"\n",(0,r.jsxs)(e.li,{children:['\u673A\u5668\u4EBA\u4E0E\u5916\u90E8\u8054\u7CFB\u4EBA\u7684\u8D26\u53F7\u90FD\u662F external_userid \uFF0C\u5176\u4E2D\u673A\u5668\u4EBA\u7684external_userid\u662F\u4EE5"wb"\u5F00\u5934\n',(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u83B7\u53D6\u673A\u5668\u4EBA\u4FE1\u606F ",(0,r.jsx)(e.code,{children:"GET /cgi-bin/msgaudit/get_robot_info?access_token&robot_id"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"data: robot_id, name, creator_userid"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://developer.work.weixin.qq.com/document/path/91774#%E8%8E%B7%E5%8F%96%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%BF%A1%E6%81%AF",children:"https://developer.work.weixin.qq.com/document/path/91774#%E8%8E%B7%E5%8F%96%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%BF%A1%E6%81%AF"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:'\u5916\u90E8\u8054\u7CFB\u4EBA\u7684 external_userid \u4EE5"wo"\u6216"wm"\u5F00\u5934'}),"\n",(0,r.jsxs)(e.li,{children:["msgid\u4EE5 ",(0,r.jsx)(e.code,{children:"_external"})," \u7ED3\u5C3E\u7684\u6D88\u606F\uFF0C\u8868\u660E\u8BE5\u6D88\u606F\u662F\u4E00\u6761\u5916\u90E8\u6D88\u606F\u3002msgid\u4EE5 ",(0,r.jsx)(e.code,{children:"_updown_stream"})," \u7ED3\u5C3E\u7684\u6D88\u606F\uFF0C\u8868\u660E\u8BE5\u6D88\u606F\u662F\u4E00\u6761\u4E0A\u4E0B\u6E38\u6D88\u606F\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:["roomid\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53EF\u80FD\u4E3A\u5185\u90E8\u7FA4"}),"\n",(0,r.jsx)(e.li,{children:"\u53EF\u80FD\u4E3A\u5916\u90E8\u7FA4"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["mediadata\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"index \u683C\u5F0F\u4E3A Range:bytes=524288-655711"}),"\n",(0,r.jsx)(e.li,{children:"dataLen \u9ED8\u8BA4 524288, 512k"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://developer.work.weixin.qq.com/document/path/91774",children:"https://developer.work.weixin.qq.com/document/path/91774"})}),"\n",(0,r.jsxs)(e.li,{children:["FAQ ",(0,r.jsx)(e.a,{href:"https://developer.work.weixin.qq.com/document/path/91552",children:"https://developer.work.weixin.qq.com/document/path/91552"})]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"sdk-\u4F9D\u8D56",children:"SDK \u4F9D\u8D56"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"apt install gcc g++\n"})}),"\n",(0,r.jsx)(e.h2,{id:"libweworkfinancesdk_c",children:"libWeWorkFinanceSdk_C"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5185\u90E8\u4F7F\u7528\u4E86 protobuf"}),"\n",(0,r.jsx)(e.li,{children:"MediaData 20byte"}),"\n",(0,r.jsx)(e.li,{children:"wwmsgauditsdk::SdkKeyInfo::SdkKeyInfo"}),"\n",(0,r.jsx)(e.li,{children:"google::protobuf::MessageLite"}),"\n",(0,r.jsxs)(e.li,{children:["DecryptData\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"EVP AES-256-CBC"}),"\n",(0,r.jsx)(e.li,{children:"\u5206\u4E3A\u591A\u4E2A\u6B65\u9AA4"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"wwmsgauditsdk.proto"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-protobuf",children:'syntax = "proto3";\n\npackage wwmsgauditsdk;\n\n// Access Token \u4FE1\u606F\nmessage AccessTokenInfo {\n    string token = 1;                // \u8BBF\u95EE\u4EE4\u724C\n    int64 expiration_time = 2;       // \u4EE4\u724C\u8FC7\u671F\u65F6\u95F4\uFF08Unix \u65F6\u95F4\u6233\uFF09\n}\n\n// \u804A\u5929\u8BB0\u5F55\u8BF7\u6C42\nmessage GetChatReq {\n    string chat_id = 1;              // \u8BF7\u6C42\u7684\u804A\u5929\u8BB0\u5F55 ID\n    int64 start_timestamp = 2;       // \u5F00\u59CB\u65F6\u95F4\u6233\n    int64 end_timestamp = 3;         // \u7ED3\u675F\u65F6\u95F4\u6233\n}\n\n// \u804A\u5929\u6570\u636E\u7684\u4FE1\u606F\nmessage WwOpenMsgAuditGetChatDataInfo {\n    string chat_id = 1;              // \u804A\u5929 ID\n    string msg_type = 2;             // \u6D88\u606F\u7C7B\u578B\n    int64 timestamp = 3;             // \u6D88\u606F\u7684\u65F6\u95F4\u6233\n}\n\n// \u804A\u5929\u6570\u636E\u54CD\u5E94\nmessage WwOpenMsgAuditGetChatDataRsp {\n    int32 status_code = 1;           // \u54CD\u5E94\u72B6\u6001\u7801\n    string response_data = 2;        // \u54CD\u5E94\u6570\u636E\uFF0C\u5305\u542B\u804A\u5929\u8BB0\u5F55\n}\n\n// \u5A92\u4F53\u6587\u4EF6\u8BF7\u6C42\nmessage GetMediaReq {\n    string media_id = 1;             // \u5A92\u4F53\u6587\u4EF6 ID\n    int32 media_type = 2;            // \u5A92\u4F53\u7C7B\u578B\n}\n\n// \u6587\u4EF6 ID\nmessage MsgSdkFileId {\n    string file_id = 1;              // \u6587\u4EF6 ID\n}\n\n// \u5355\u6761\u6D88\u606F\u5185\u5BB9\nmessage MsgAuditSdkMsg {\n    string msg_id = 1;               // \u6D88\u606F ID\n    string sender_id = 2;            // \u53D1\u9001\u8005 ID\n    string receiver_id = 3;          // \u63A5\u6536\u8005 ID\n    int64 timestamp = 4;             // \u6D88\u606F\u65F6\u95F4\u6233\n    string msg_content = 5;          // \u6D88\u606F\u5185\u5BB9\n}\n\n// \u5BA1\u8BA1\u6570\u636E\nmessage MsgAuditSdkData {\n    repeated MsgAuditSdkMsg messages = 1; // \u6D88\u606F\u5217\u8868\n    int32 audit_result = 2;               // \u5BA1\u8BA1\u7ED3\u679C\u4EE3\u7801\n}\n\n// \u83B7\u53D6\u5A92\u4F53\u6587\u4EF6\u7684\u54CD\u5E94\nmessage GetAuditMediaRsp {\n    int32 status_code = 1;           // \u54CD\u5E94\u72B6\u6001\u7801\n    bytes media_data = 2;            // \u5A92\u4F53\u6587\u4EF6\u6570\u636E\n}\n\n// \u7248\u672C 2 \u79C1\u94A5\u4FE1\u606F\nmessage Version2PriKeyInfo {\n    string prikey_id = 1;            // \u79C1\u94A5 ID\n    int32 key_version = 2;           // \u79C1\u94A5\u7248\u672C\u53F7\n}\n\n// \u7248\u672C 2 \u79C1\u94A5\u96C6\u5408\nmessage Version2PriKeys {\n    repeated Version2PriKeyInfo keys = 1;  // \u591A\u4E2A\u79C1\u94A5\n}\n\n// SDK \u5BC6\u94A5\u4FE1\u606F\nmessage SdkKeyInfo {\n    string key_id = 1;               // \u5BC6\u94A5 ID\n    bytes key_value = 2;             // \u5BC6\u94A5\u503C\n    int64 expiration_time = 3;       // \u5BC6\u94A5\u8FC7\u671F\u65F6\u95F4\n}\n'})}),"\n",(0,r.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h2,{id:"10006-\u89E3\u5BC6\u5931\u8D25-getmediadata",children:"10006: \u89E3\u5BC6\u5931\u8D25 GetMediaData"}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5C31\u662F\u53EF\u80FD\u51FA\u73B0\u4E2A\u522B \u6587\u4EF6 \u89E3\u5BC6\u5931\u8D25\u7684\u60C5\u51B5"}),"\n"]})}),"\n",(0,r.jsx)(e.p,{children:"\u8BF7\u68C0\u67E5\u662F\u5426\u5148\u8FDB\u884C base64decode \u518D\u8FDB\u884C rsa \u79C1\u94A5\u89E3\u5BC6\uFF0C\u518D\u8FDB\u884C DecryptMsg \u8C03\u7528\u3002"}),"\n",(0,r.jsx)(e.h2,{id:"quote",children:"Quote"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'/^(\u8FD9\u662F\u4E00\u6761\u5F15\u7528\\/\u56DE\u590D\u6D88\u606F\uFF1A|This is a quote\\/reply:)\\n["\u201C](?<user>[^\\n]+)[\uFF1A:]\\s?\\n(?<quote>.*?)[\u201D"]\\n-{6}\\n(?<content>.*)$/s\n'})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"/^\u300C(?<user>[^\\n]+)\uFF1A\\n?(?<quote>.*?)\u300D\\n-( -){14}\\n(?<content>.+)$/s\n"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u6D88\u606F\u5F52\u6863"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'\u8FD9\u662F\u4E00\u6761\u5F15\u7528/\u56DE\u590D\u6D88\u606F\uFF1A\n"USER:\nQUOTE"\n------\nCONTENT\n'})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5FAE\u4FE1"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"\u300CUSER\uFF1AQUOTE\u300D\n- - - - - - - - - - - - - - -\nCONTENT\n"})})]})}function h(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(o,{...n})}):o(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return t}});var s=i(75271);let r={},l=s.createContext(r);function t(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:t(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);