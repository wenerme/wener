"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["62898"],{53874:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var n=a(52676);a(75271);var r=a(54461),s=a(27763),l=a(13283),i=a(31082),c=a(66154),u=a(10824),o=a(245);function g(e){let{title:t}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.d,{title:t}),(0,n.jsx)(u.Z,{tag:"doc_tags_list"})]})}function d(e){let{tags:t,title:a}=e;return(0,n.jsx)(s.FG,{className:(0,r.Z)(l.k.page.docsTagsListPage),children:(0,n.jsx)("div",{className:"container margin-vert--lg",children:(0,n.jsx)("div",{className:"row",children:(0,n.jsxs)("main",{className:"col col--8 col--offset-2",children:[(0,n.jsx)(o.Z,{as:"h1",children:a}),(0,n.jsx)(c.Z,{tags:t})]})})})})}function h(e){let t=(0,i.M)();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{...e,title:t}),(0,n.jsx)(d,{...e,title:t})]})}},12684:function(e,t,a){a.d(t,{Z:()=>i});var n=a("52676");a("75271");var r=a("54461"),s=a("40174");let l={tag:"tag_IMqe",tagRegular:"tagRegular_cnjZ",tagWithCount:"tagWithCount_i1V0"};function i(e){let{permalink:t,label:a,count:i,description:c}=e;return(0,n.jsxs)(s.Z,{href:t,title:c,className:(0,r.Z)(l.tag,i?l.tagWithCount:l.tagRegular),children:[a,i&&(0,n.jsx)("span",{children:i})]})}},66154:function(e,t,a){a.d(t,{Z:()=>u});var n=a("52676");a("75271");var r=a("31082"),s=a("12684"),l=a("245");let i="tag_JO5G";function c(e){let{letterEntry:t}=e;return(0,n.jsxs)("article",{children:[(0,n.jsx)(l.Z,{as:"h2",id:t.letter,children:t.letter}),(0,n.jsx)("ul",{className:"padding--none",children:t.tags.map(e=>(0,n.jsx)("li",{className:i,children:(0,n.jsx)(s.Z,{...e})},e.permalink))}),(0,n.jsx)("hr",{})]})}function u(e){let{tags:t}=e,a=(0,r.P)(t);return(0,n.jsx)("section",{className:"margin-vert--lg",children:a.map(e=>(0,n.jsx)(c,{letterEntry:e},e.letter))})}},31082:function(e,t,a){a.d(t,{M:function(){return r},P:function(){return s}});var n=a(9356);let r=()=>(0,n.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function s(e){let t={};return Object.values(e).forEach(e=>{var a;let n=e.label[0].toUpperCase();null!==(a=t[n])&&void 0!==a||(t[n]=[]),t[n].push(e)}),Object.entries(t).sort((e,t)=>{let[a]=e,[n]=t;return a.localeCompare(n)}).map(e=>{let[t,a]=e;return{letter:t,tags:a.sort((e,t)=>e.label.localeCompare(t.label))}})}}}]);