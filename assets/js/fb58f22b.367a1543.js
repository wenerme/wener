"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["5605"],{88880:function(e,t,n){n.r(t),n.d(t,{assets:function(){return o},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return a},metadata:function(){return r},toc:function(){return d}});var r=n(1782),s=n(52676),i=n(79938);let a={date:"2016-8-6 23:43",tags:["Game","Android"]},l="Play Titans using shell",o={authorsImageUrls:[]},d=[{value:"Features",id:"features",level:2},{value:"Requirement",id:"requirement",level:2},{value:"Get started",id:"get-started",level:2},{value:"How is works ?",id:"how-is-works-",level:2},{value:"Why fast ?",id:"why-fast-",level:3},{value:"How to detect the screen event ?",id:"how-to-detect-the-screen-event-",level:3},{value:"More",id:"more",level:2}];function c(e){let t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://play.google.com/store/apps/details?id=com.gamehivecorp.taptitans",children:"Tap Titans"})," on Play Store"]}),"\n",(0,s.jsx)(t.h2,{id:"features",children:"Features"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Auto upgrade"}),"\n",(0,s.jsx)(t.li,{children:"Auto spell skill"}),"\n",(0,s.jsx)(t.li,{children:"Auto start challenge"}),"\n",(0,s.jsx)(t.li,{children:"Auto close ad dialog"}),"\n",(0,s.jsx)(t.li,{children:"Verify fast tap (0.03s/tap)"}),"\n"]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"NOTE"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Only tested on Nexus 5, different devices may use different coordinates and event dev."}),"\n",(0,s.jsx)(t.li,{children:"Used to plat tiantis long time ago, may not works in current version.Different version may use different color and coordinates"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"requirement",children:"Requirement"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"ADB"}),"\n",(0,s.jsx)(t.li,{children:"Image Magic"}),"\n",(0,s.jsx)(t.li,{children:"Bash"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"get-started",children:"Get started"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Start game"}),"\n",(0,s.jsxs)(t.li,{children:["Get source ",(0,s.jsx)(t.a,{href:"https://github.com/wenerme/wener/tree/master/story/2016/tap-titans-play.sh",children:"tap-titans-play.sh"})]}),"\n"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chmod +x play.sh\n# Connect through lan, so you don't have to use the usb\n./play.sh use-tcp\n# Push the pre-generated event file\nadb push events /mnt/sdcard\n# Start playing\n./play.sh\n"})}),"\n",(0,s.jsx)(t.h2,{id:"how-is-works-",children:"How is works ?"}),"\n",(0,s.jsx)(t.h3,{id:"why-fast-",children:"Why fast ?"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Because I don't use ",(0,s.jsx)(t.code,{children:"adb shell input tap"}),", instead use a generated file that represent a tap event, then ",(0,s.jsx)(t.code,{children:"cat tap > /dev/input/event1"}),"."]}),"\n",(0,s.jsx)(t.li,{children:"Use generated shell run in android."}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"how-to-detect-the-screen-event-",children:"How to detect the screen event ?"}),"\n",(0,s.jsx)(t.p,{children:"Use screen capture, then use the image magic to check the color,kind of slowly, but works."}),"\n",(0,s.jsx)(t.h2,{id:"more",children:"More"}),"\n",(0,s.jsxs)(t.p,{children:["Check the ",(0,s.jsx)(t.a,{href:"https://github.com/wenerme/wener/tree/master/story/2016/tap-titans-play.sh",children:"source"})]})]})}function h(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return a}});var r=n(75271);let s={},i=r.createContext(s);function a(e){let t=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(i.Provider,{value:t},e.children)}},1782:function(e){e.exports=JSON.parse('{"permalink":"/story/2016/08/06/2016/tap-titans","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2016/2016-08-06-tap-titans.md","source":"@site/../story/2016/2016-08-06-tap-titans.md","title":"Play Titans using shell","description":"Tap Titans on Play Store","date":"2016-08-06T23:43:00.000Z","tags":[{"inline":true,"label":"Game","permalink":"/story/tags/game"},{"inline":true,"label":"Android","permalink":"/story/tags/android"}],"readingTime":0.95,"hasTruncateMarker":false,"authors":[],"frontMatter":{"date":"2016-8-6 23:43","tags":["Game","Android"]},"unlisted":false,"prevItem":{"title":"Go Redis module","permalink":"/story/go-rm"},"nextItem":{"title":"BBVM - BeBasic Virtual Machine","permalink":"/story/bbvm"}}')}}]);