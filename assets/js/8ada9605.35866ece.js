"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["98478"],{60995:function(e,n,r){r.r(n),r.d(n,{metadata:()=>i,contentTitle:()=>c,default:()=>u,assets:()=>o,toc:()=>a,frontMatter:()=>s});var i=JSON.parse('{"id":"os/linux/shell/terminal","title":"Terminal","description":"screen","source":"@site/../notes/os/linux/shell/terminal.md","sourceDirName":"os/linux/shell","slug":"/os/linux/shell/terminal","permalink":"/notes/os/linux/shell/terminal","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/shell/terminal.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1627915171000,"frontMatter":{"title":"Terminal"},"sidebar":"docs","previous":{"title":"sudo","permalink":"/notes/os/linux/shell/sudo"},"next":{"title":"Tmux","permalink":"/notes/os/linux/shell/tmux/"}}'),t=r("52676"),l=r("79938");let s={title:"Terminal"},c="Terminal",o={},a=[{value:"screen",id:"screen",level:2},{value:"minicom",id:"minicom",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"terminal",children:"Terminal"})}),"\n",(0,t.jsx)(n.h2,{id:"screen",children:"screen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://aperiodic.net/screen/quick_reference",children:"Screen quick reference"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://www.gnu.org/software/screen/manual/screen.html",children:"Screen manual"})}),"\n",(0,t.jsxs)(n.li,{children:["FAQ\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5F53\u8FDE\u63A5\u4E32\u53E3, \u5F3A\u5236\u628A screen kill \u540E, screen \u53EF\u80FD\u51FA\u73B0 100% CPU \u5360\u7528, \u6B64\u65F6\u53EA\u80FD\u91CD\u542F\u4E86"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u67E5\u770B\u6240\u6709\u7684\u4F1A\u8BDD\nscreen -ls\n# \u9000\u51FA\nscreen -X -S ${SESSION} quit\n# \u8FDE\u4E0A screen \u4F1A\u8BDD\nscreen -r ${SESSION}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"minicom",children:"minicom"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u9ED8\u8BA4 Meta \u4E3A ESC"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"+-------------------------------------------------------------------+\n|                      Minicom Command Summary                      |\n|                                                                   |\n|               Commands can be called by Meta-<key>                |\n|                                                                   |\n|               Main Functions                  Other Functions     |\n|                                                                   |\n| Dialing directory..D  run script (Go)....G | Clear Screen.......C |\n| Send files.........S  Receive files......R | cOnfigure Minicom..O |\n| comm Parameters....P  Add linefeed.......A | Suspend minicom....J |\n| Capture on/off.....L  Hangup.............H | eXit and reset.....X |\n| send break.........F  initialize Modem...M | Quit with no reset.Q |\n| Terminal settings..T  run Kermit.........K | Cursor key mode....I |\n| lineWrap on/off....W  local Echo on/off..E | Help screen........Z |\n| Paste file.........Y  Timestamp toggle...N | scroll Back........B |\n| Add Carriage Ret...U                                              |\n|                                                                   |\n|             Select function or press Enter for none.              |\n+-------------------------------------------------------------------+\n"})})]})}function u(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return s}});var i=r(75271);let t={},l=i.createContext(t);function s(e){let n=i.useContext(l);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);