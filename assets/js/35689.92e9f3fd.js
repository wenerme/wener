"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["35689"],{7501:function(e,t,l){l.d(t,{CS:()=>f,wj:()=>s,nO:()=>u,iZ:()=>v,n4:()=>c,Ne:()=>_,ci:()=>k,cH:()=>Z});var n=l("52676"),a=l("75271"),r=l("65988"),i=l("52405");function s(){var e;let t=(0,i.Z)(),l=null==t?void 0:null===(e=t.data)||void 0===e?void 0:e.blogMetadata;if(!l)throw Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return l}let o=a.createContext(null);function c(e){let{children:t,content:l,isBlogPostPage:r=!1}=e,i=function(e){let{content:t,isBlogPostPage:l}=e;return(0,a.useMemo)(()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:l}),[t,l])}({content:l,isBlogPostPage:r});return(0,n.jsx)(o.Provider,{value:i,children:t})}function u(){let e=(0,a.useContext)(o);if(null===e)throw new r.i6("BlogPostProvider");return e}var m=l("15757"),d=l("91646");let h=e=>new Date(e).toISOString();function g(e){let t=e.map(p);return{author:1===t.length?t[0]:t}}function x(e,t,l){return e?{image:function(e){let{imageUrl:t,caption:l}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:l}}({imageUrl:t(e,{absolute:!0}),caption:"title image for the blog post: ".concat(l)})}:{}}function f(e){let{siteConfig:t}=(0,d.Z)(),{withBaseUrl:l}=(0,m.Cg)(),{metadata:{blogDescription:n,blogTitle:a,permalink:r}}=e,i="".concat(t.url).concat(r);return{"@context":"https://schema.org","@type":"Blog","@id":i,mainEntityOfPage:i,headline:a,description:n,blogPost:e.items.map(e=>(function(e,t,l){var n,a;let{assets:r,frontMatter:i,metadata:s}=e,{date:o,title:c,description:u,lastUpdatedAt:m}=s,d=null!==(n=r.image)&&void 0!==n?n:i.image,f=null!==(a=i.keywords)&&void 0!==a?a:[],v="".concat(t.url).concat(s.permalink),p=m?h(m):void 0;return{"@type":"BlogPosting","@id":v,mainEntityOfPage:v,url:v,headline:c,name:c,description:u,datePublished:o,...p?{dateModified:p}:{},...g(s.authors),...x(d,l,c),...f?{keywords:f}:{}}})(e.content,t,l))}}function v(){var e,t;let l=s(),{assets:n,metadata:a}=u(),{siteConfig:r}=(0,d.Z)(),{withBaseUrl:i}=(0,m.Cg)(),{date:o,title:c,description:f,frontMatter:v,lastUpdatedAt:p}=a,j=null!==(e=n.image)&&void 0!==e?e:v.image,b=null!==(t=v.keywords)&&void 0!==t?t:[],w=p?h(p):void 0,N="".concat(r.url).concat(a.permalink);return{"@context":"https://schema.org","@type":"BlogPosting","@id":N,mainEntityOfPage:N,url:N,headline:c,name:c,description:f,datePublished:o,...w?{dateModified:w}:{},...g(a.authors),...x(j,i,c),...b?{keywords:b}:{},isPartOf:{"@type":"Blog","@id":"".concat(r.url).concat(l.blogBasePath),name:l.blogTitle}}}function p(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}var j=l("3225"),b=l("40174"),w=l("45911"),N=l("77975");function Z(e){let{pathname:t}=(0,j.TH)();return(0,a.useMemo)(()=>e.filter(e=>{var l,n;return l=e,n=t,(!l.unlisted||!!(0,N.Mg)(l.permalink,n))&&!0}),[e,t])}function k(e){let t=Object.entries((0,w.vM)(e,e=>"".concat(new Date(e.date).getFullYear())));return t.reverse(),t}function _(e){let{items:t,ulClassName:l,liClassName:a,linkClassName:r,linkActiveClassName:i}=e;return(0,n.jsx)("ul",{className:l,children:t.map(e=>(0,n.jsx)("li",{className:a,children:(0,n.jsx)(b.Z,{isNavLink:!0,to:e.permalink,className:r,activeClassName:i,children:e.title})},e.permalink))})}},60347:function(e,t,l){l.d(t,{Z:()=>I});var n=l("52676"),a=l("75271"),r=l("54461"),i=l("67715"),s=l("17890"),o=l("9356"),c=l("7501"),u=l("47655"),m=l("245");function d(e){let{year:t,yearGroupHeadingClassName:l,children:a}=e;return(0,n.jsxs)("div",{role:"group",children:[(0,n.jsx)(m.Z,{as:"h3",className:l,children:t}),a]})}let h=(0,a.memo)(function(e){let{items:t,yearGroupHeadingClassName:l,ListComponent:a}=e;if(!(0,u.L)().blog.sidebar.groupByYear)return(0,n.jsx)(a,{items:t});{let e=(0,c.ci)(t);return(0,n.jsx)(n.Fragment,{children:e.map(e=>{let[t,r]=e;return(0,n.jsx)(d,{year:t,yearGroupHeadingClassName:l,children:(0,n.jsx)(a,{items:r})},t)})})}}),g="sidebar_eIbT",x="sidebarItemTitle_Ujdu",f="sidebarItemList_Ibem",v="sidebarItem_AmkJ",p="sidebarItemLink_f4u0",j="sidebarItemLinkActive_MTzQ",b="yearGroupHeading_ZPrw",w=e=>{let{items:t}=e;return(0,n.jsx)(c.Ne,{items:t,ulClassName:(0,r.Z)(f,"clean-list"),liClassName:v,linkClassName:p,linkActiveClassName:j})},N=(0,a.memo)(function(e){let{sidebar:t}=e,l=(0,c.cH)(t.items);return(0,n.jsx)("aside",{className:"col col--3",children:(0,n.jsxs)("nav",{className:(0,r.Z)(g,"thin-scrollbar"),"aria-label":(0,o.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,n.jsx)("div",{className:(0,r.Z)(x,"margin-bottom--md"),children:t.title}),(0,n.jsx)(h,{items:l,ListComponent:w,yearGroupHeadingClassName:b})]})})});var Z=l("43208");let k="yearGroupHeading_FkFW",_=e=>{let{items:t}=e;return(0,n.jsx)(c.Ne,{items:t,ulClassName:"menu__list",liClassName:"menu__list-item",linkClassName:"menu__link",linkActiveClassName:"menu__link--active"})};function M(e){let{sidebar:t}=e,l=(0,c.cH)(t.items);return(0,n.jsx)(h,{items:l,ListComponent:_,yearGroupHeadingClassName:k})}let C=(0,a.memo)(function(e){return(0,n.jsx)(Z.Zo,{component:M,props:e})});function y(e){let{sidebar:t}=e,l=(0,s.i)();return(null==t?void 0:t.items.length)?"mobile"===l?(0,n.jsx)(C,{sidebar:t}):(0,n.jsx)(N,{sidebar:t}):null}function I(e){let{sidebar:t,toc:l,children:a,...s}=e,o=t&&t.items.length>0;return(0,n.jsx)(i.Z,{...s,children:(0,n.jsx)("div",{className:"container margin-vert--lg",children:(0,n.jsxs)("div",{className:"row",children:[(0,n.jsx)(y,{sidebar:t}),(0,n.jsx)("main",{className:(0,r.Z)("col",{"col--7":o,"col--9 col--offset-1":!o}),children:a}),l&&(0,n.jsx)("div",{className:"col col--2",children:l})]})})})}},95084:function(e,t,l){l.d(t,{Z:()=>G});var n=l("52676");l("75271");var a=l("54461"),r=l("7501");function i(e){let{children:t,className:l}=e;return(0,n.jsx)("article",{className:l,children:t})}var s=l("40174");let o="title_F2SE";function c(e){let{className:t}=e,{metadata:l,isBlogPostPage:i}=(0,r.nO)(),{permalink:c,title:u}=l;return(0,n.jsx)(i?"h1":"h2",{className:(0,a.Z)(o,t),children:i?u:(0,n.jsx)(s.Z,{to:c,children:u})})}var u=l("9356"),m=l("33708"),d=l("60465");let h="container_iyu4";function g(e){let{readingTime:t}=e,l=function(){let{selectMessage:e}=(0,m.c)();return t=>{let l=Math.ceil(t);return e(l,(0,u.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:l}))}}();return(0,n.jsx)(n.Fragment,{children:l(t)})}function x(e){let{date:t,formattedDate:l}=e;return(0,n.jsx)("time",{dateTime:t,children:l})}function f(){return(0,n.jsx)(n.Fragment,{children:" \xb7 "})}function v(e){let t,{className:l}=e,{metadata:i}=(0,r.nO)(),{date:s,readingTime:o}=i,c=(0,d.P)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,n.jsxs)("div",{className:(0,a.Z)(h,"margin-vert--md",l),children:[(0,n.jsx)(x,{date:s,formattedDate:(t=s,c.format(new Date(t)))}),void 0!==o&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(f,{}),(0,n.jsx)(g,{readingTime:o})]})]})}let p="githubSvg_lU14",j="xSvg_oYpP",b=function(e){return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,n.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,n.jsx)("path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"}),(0,n.jsx)("path",{d:"M3.6 9h16.8"}),(0,n.jsx)("path",{d:"M3.6 15h16.8"}),(0,n.jsx)("path",{d:"M11.5 3a17 17 0 0 0 0 18"}),(0,n.jsx)("path",{d:"M12.5 3a17 17 0 0 1 0 18"})]})},w="authorSocials_Lm0D",N="authorSocialLink_nDX1",Z={twitter:{Icon:function(e){return(0,n.jsx)("svg",{viewBox:"0 0 256 209",width:"1em",height:"1em",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",...e,children:(0,n.jsx)("path",{d:"M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45",fill:"#55acee"})})},label:"Twitter"},github:{Icon:function(e){return(0,n.jsx)("svg",{viewBox:"0 0 256 250",width:"1em",height:"1em",...e,className:(0,a.Z)(e.className,p),xmlns:"http://www.w3.org/2000/svg",style:{"--dark":"#000","--light":"#fff"},preserveAspectRatio:"xMidYMid",children:(0,n.jsx)("path",{d:"M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"})})},label:"GitHub"},stackoverflow:{Icon:function(e){return(0,n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 169.61 200",width:"1em",height:"1em",...e,children:[(0,n.jsx)("path",{d:"M140.44 178.38v-48.65h21.61V200H0v-70.27h21.61v48.65z",fill:"#bcbbbb"}),(0,n.jsx)("path",{d:"M124.24 140.54l4.32-16.22-86.97-17.83-3.78 17.83zM49.7 82.16L130.72 120l7.56-16.22-81.02-37.83zm22.68-40l68.06 57.3 11.35-13.51-68.6-57.3-11.35 13.51zM116.14 0l-14.59 10.81 53.48 71.89 14.58-10.81zM37.81 162.16h86.43v-16.21H37.81z",fill:"#f48024"})]})},label:"Stack Overflow"},linkedin:{Icon:function(e){return(0,n.jsx)("svg",{width:"1em",height:"1em",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid",viewBox:"0 0 256 256",...e,children:(0,n.jsx)("path",{d:"M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453",fill:"#0A66C2"})})},label:"LinkedIn"},x:{Icon:function(e){return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 1200 1227",...e,className:(0,a.Z)(e.className,j),style:{"--dark":"#000","--light":"#fff"},children:(0,n.jsx)("path",{d:"M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"})})},label:"X"}};function k(e){var t,l;let{platform:r,link:i}=e;let{Icon:o,label:c}=null!==(l=Z[t=r])&&void 0!==l?l:{Icon:b,label:t};return(0,n.jsx)(s.Z,{className:N,href:i,title:c,children:(0,n.jsx)(o,{className:(0,a.Z)(N)})})}function _(e){var t;let{author:l}=e,a=Object.entries(null!==(t=l.socials)&&void 0!==t?t:{});return(0,n.jsx)("div",{className:w,children:a.map(e=>{let[t,l]=e;return(0,n.jsx)(k,{platform:t,link:l},t)})})}var M=l("245");let C={authorImage:"authorImage_WmYL","author-as-h1":"author-as-h1_kEb2","author-as-h2":"author-as-h2_d3wS",authorDetails:"authorDetails_JWy6",authorName:"authorName_xGjE",authorTitle:"authorTitle_qDwz",authorBlogPostCount:"authorBlogPostCount_nHJ5"};function y(e){return e.href?(0,n.jsx)(s.Z,{...e}):(0,n.jsx)(n.Fragment,{children:e.children})}function I(e){let{title:t}=e;return(0,n.jsx)("small",{className:C.authorTitle,title:t,children:t})}function P(e){let{name:t,as:l}=e;return l?(0,n.jsx)(M.Z,{as:l,className:C.authorName,children:t}):(0,n.jsx)("span",{className:C.authorName,children:t})}function O(e){let{count:t}=e;return(0,n.jsx)("span",{className:(0,a.Z)(C.authorBlogPostCount),children:t})}function L(e){let{as:t,author:l,className:r,count:i}=e,{name:s,title:o,url:c,imageURL:u,email:m,page:d}=l,h=(null==d?void 0:d.permalink)||c||m&&"mailto:".concat(m)||void 0;return(0,n.jsxs)("div",{className:(0,a.Z)("avatar margin-bottom--sm",r,C["author-as-".concat(t)]),children:[u&&(0,n.jsx)(y,{href:h,className:"avatar__photo-link",children:(0,n.jsx)("img",{className:(0,a.Z)("avatar__photo",C.authorImage),src:u,alt:s})}),(s||o)&&(0,n.jsxs)("div",{className:(0,a.Z)("avatar__intro",C.authorDetails),children:[(0,n.jsxs)("div",{className:"avatar__name",children:[s&&(0,n.jsx)(y,{href:h,children:(0,n.jsx)(P,{name:s,as:t})}),void 0!==i&&(0,n.jsx)(O,{count:i})]}),!!o&&(0,n.jsx)(I,{title:o}),(0,n.jsx)(_,{author:l})]})]})}let A={authorCol:"authorCol_MPgb",imageOnlyAuthorRow:"imageOnlyAuthorRow_YQay",imageOnlyAuthorCol:"imageOnlyAuthorCol_fJZ9"};function B(e){let{className:t}=e,{metadata:{authors:l},assets:i}=(0,r.nO)();if(0===l.length)return null;let s=l.every(e=>{let{name:t}=e;return!t}),o=1===l.length;return(0,n.jsx)("div",{className:(0,a.Z)("margin-top--md margin-bottom--sm",s?A.imageOnlyAuthorRow:"row",t),children:l.map((e,t)=>{var l;return(0,n.jsx)("div",{className:(0,a.Z)(!s&&(o?"col col--12":"col col--6"),s?A.imageOnlyAuthorCol:A.authorCol),children:(0,n.jsx)(L,{author:{...e,imageURL:null!==(l=i.authorsImageUrls[t])&&void 0!==l?l:e.imageURL}})},t)})})}function F(){return(0,n.jsxs)("header",{children:[(0,n.jsx)(c,{}),(0,n.jsx)(v,{}),(0,n.jsx)(B,{})]})}var H=l("15481"),T=l("43505");function R(e){let{children:t,className:l}=e,{isBlogPostPage:i}=(0,r.nO)();return(0,n.jsx)("div",{id:i?H.blogPostContainerID:void 0,className:(0,a.Z)("markdown",l),children:(0,n.jsx)(T.Z,{children:t})})}var U=l("13283"),D=l("33312"),z=l("35972");function E(){return(0,n.jsx)("b",{children:(0,n.jsx)(u.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read more"})})}function S(e){let{blogPostTitle:t,...l}=e;return(0,n.jsx)(s.Z,{"aria-label":(0,u.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...l,children:(0,n.jsx)(E,{})})}function Y(){let{metadata:e,isBlogPostPage:t}=(0,r.nO)(),{tags:l,title:i,editUrl:s,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:u}=e,m=!t&&o,d=l.length>0;if(!(d||m||s))return null;if(!t)return(0,n.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[d&&(0,n.jsx)("div",{className:(0,a.Z)("col",{"col--9":m}),children:(0,n.jsx)(z.Z,{tags:l})}),m&&(0,n.jsx)("div",{className:(0,a.Z)("col text--right",{"col--3":d}),children:(0,n.jsx)(S,{blogPostTitle:i,to:e.permalink})})]});{let e=!!(s||u||c);return(0,n.jsxs)("footer",{className:"docusaurus-mt-lg",children:[d&&(0,n.jsx)("div",{className:(0,a.Z)("row","margin-top--sm",U.k.blog.blogFooterEditMetaRow),children:(0,n.jsx)("div",{className:"col",children:(0,n.jsx)(z.Z,{tags:l})})}),e&&(0,n.jsx)(D.Z,{className:(0,a.Z)("margin-top--sm",U.k.blog.blogFooterEditMetaRow),editUrl:s,lastUpdatedAt:u,lastUpdatedBy:c})]})}}function G(e){let{children:t,className:l}=e,s=function(){let{isBlogPostPage:e}=(0,r.nO)();return e?void 0:"margin-bottom--xl"}();return(0,n.jsxs)(i,{className:(0,a.Z)(s,l),children:[(0,n.jsx)(F,{}),(0,n.jsx)(R,{children:t}),(0,n.jsx)(Y,{})]})}},33708:function(e,t,l){l.d(t,{c:function(){return o}});var n=l(75271),a=l(91646);let r=["zero","one","two","few","many","other"];function i(e){return r.filter(t=>e.includes(t))}let s={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function o(){let e=function(){let{i18n:{currentLocale:e}}=(0,a.Z)();return(0,n.useMemo)(()=>{try{return function(e){let t=new Intl.PluralRules(e);return{locale:e,pluralForms:i(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error('Failed to use Intl.PluralRules for locale "'.concat(e,'".\nDocusaurus will fallback to the default (English) implementation.\nError: ').concat(t.message,"\n")),s}},[e])}();return{selectMessage:(t,l)=>(function(e,t,l){let n=e.split("|");if(1===n.length)return n[0];n.length>l.pluralForms.length&&console.error("For locale=".concat(l.locale,", a maximum of ").concat(l.pluralForms.length," plural forms are expected (").concat(l.pluralForms.join(","),"), but the message contains ").concat(n.length,": ").concat(e));let a=l.select(t);return n[Math.min(l.pluralForms.indexOf(a),n.length-1)]})(l,t,e)}}}}]);