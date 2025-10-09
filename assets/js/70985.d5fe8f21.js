"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["70985"],{19341:function(t,e,i){i.d(e,{o:()=>n});var n=(0,i(23141).K2)(()=>`
  /* Font Awesome icon styling - consolidated */
  .label-icon {
    display: inline-block;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }
  
  .node .label-icon path {
    fill: currentColor;
    stroke: revert;
    stroke-width: revert;
  }
`,"getIconStyles")},56067:function(t,e,i){i.d(e,{CP:()=>h,HT:()=>p,PB:()=>u,aC:()=>c,lC:()=>l,m:()=>o,tk:()=>s});var n=i(68970),r=i(23141),a=i(85955),s=(0,r.K2)((t,e)=>{let i=t.append("rect");if(i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),e.name&&i.attr("name",e.name),e.rx&&i.attr("rx",e.rx),e.ry&&i.attr("ry",e.ry),void 0!==e.attrs)for(let t in e.attrs)i.attr(t,e.attrs[t]);return e.class&&i.attr("class",e.class),i},"drawRect"),l=(0,r.K2)((t,e)=>{s(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,stroke:e.stroke,class:"rect"}).lower()},"drawBackgroundRect"),o=(0,r.K2)((t,e)=>{let i=e.text.replace(n.H1," "),r=t.append("text");r.attr("x",e.x),r.attr("y",e.y),r.attr("class","legend"),r.style("text-anchor",e.anchor),e.class&&r.attr("class",e.class);let a=r.append("tspan");return a.attr("x",e.x+2*e.textMargin),a.text(i),r},"drawText"),c=(0,r.K2)((t,e,i,n)=>{let r=t.append("image");r.attr("x",e),r.attr("y",i);let s=(0,a.sanitizeUrl)(n);r.attr("xlink:href",s)},"drawImage"),h=(0,r.K2)((t,e,i,n)=>{let r=t.append("use");r.attr("x",e),r.attr("y",i);let s=(0,a.sanitizeUrl)(n);r.attr("xlink:href",`#${s}`)},"drawEmbeddedImage"),u=(0,r.K2)(()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),"getNoteRect"),p=(0,r.K2)(()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0}),"getTextObj")},33072:function(t,e,i){i.d(e,{diagram:()=>Y});var n=i(56067),r=i(19341),a=i(68970),s=i(23141),l=i(4086),o=function(){var t=(0,s.K2)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],n=[1,10],r=[1,11],a=[1,12],l=[1,13],o=[1,14],c={trace:(0,s.K2)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,s.K2)(function(t,e,i,n,r,a,s){var l=a.length-1;switch(r){case 1:return a[l-1];case 2:case 6:case 7:this.$=[];break;case 3:a[l-1].push(a[l]),this.$=a[l-1];break;case 4:case 5:this.$=a[l];break;case 8:n.setDiagramTitle(a[l].substr(6)),this.$=a[l].substr(6);break;case 9:this.$=a[l].trim(),n.setAccTitle(this.$);break;case 10:case 11:this.$=a[l].trim(),n.setAccDescription(this.$);break;case 12:n.addSection(a[l].substr(8)),this.$=a[l].substr(8);break;case 13:n.addTask(a[l-1],a[l]),this.$="task"}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:n,14:r,16:a,17:l,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:n,14:r,16:a,17:l,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,s.K2)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,s.K2)(function(t){var e=this,i=[0],n=[],r=[null],a=[],l=this.table,o="",c=0,h=0,u=0,p=a.slice.call(arguments,1),y=Object.create(this.lexer),d={};for(var f in this.yy)Object.prototype.hasOwnProperty.call(this.yy,f)&&(d[f]=this.yy[f]);y.setInput(t,d),d.lexer=y,d.parser=this,void 0===y.yylloc&&(y.yylloc={});var g=y.yylloc;a.push(g);var x=y.options&&y.options.ranges;function m(){var t;return"number"!=typeof(t=n.pop()||y.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof d.parseError?this.parseError=d.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,s.K2)(function(t){i.length=i.length-2*t,r.length=r.length-t,a.length=a.length-t},"popStack"),(0,s.K2)(m,"lex");for(var k,_,b,v,w,K,$,M,T,S={};;){if(b=i[i.length-1],this.defaultActions[b]?v=this.defaultActions[b]:(null==k&&(k=m()),v=l[b]&&l[b][k]),void 0===v||!v.length||!v[0]){var E="";for(K in T=[],l[b])this.terminals_[K]&&K>2&&T.push("'"+this.terminals_[K]+"'");E=y.showPosition?"Parse error on line "+(c+1)+":\n"+y.showPosition()+"\nExpecting "+T.join(", ")+", got '"+(this.terminals_[k]||k)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==k?"end of input":"'"+(this.terminals_[k]||k)+"'"),this.parseError(E,{text:y.match,token:this.terminals_[k]||k,line:y.yylineno,loc:g,expected:T})}if(v[0]instanceof Array&&v.length>1)throw Error("Parse Error: multiple actions possible at state: "+b+", token: "+k);switch(v[0]){case 1:i.push(k),r.push(y.yytext),a.push(y.yylloc),i.push(v[1]),k=null,_?(k=_,_=null):(h=y.yyleng,o=y.yytext,c=y.yylineno,g=y.yylloc,u>0&&u--);break;case 2:if($=this.productions_[v[1]][1],S.$=r[r.length-$],S._$={first_line:a[a.length-($||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-($||1)].first_column,last_column:a[a.length-1].last_column},x&&(S._$.range=[a[a.length-($||1)].range[0],a[a.length-1].range[1]]),void 0!==(w=this.performAction.apply(S,[o,h,c,d,v[1],r,a].concat(p))))return w;$&&(i=i.slice(0,-1*$*2),r=r.slice(0,-1*$),a=a.slice(0,-1*$)),i.push(this.productions_[v[1]][0]),r.push(S.$),a.push(S._$),M=l[i[i.length-2]][i[i.length-1]],i.push(M);break;case 3:return!0}}return!0},"parse")};function h(){this.yy={}}return c.lexer={EOF:1,parseError:(0,s.K2)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,s.K2)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,s.K2)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,s.K2)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,s.K2)(function(){return this._more=!0,this},"more"),reject:(0,s.K2)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,s.K2)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,s.K2)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,s.K2)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,s.K2)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,s.K2)(function(t,e){var i,n,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var a in r)this[a]=r[a];return!1},"test_match"),next:(0,s.K2)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,r=this._currentRules(),a=0;a<r.length;a++)if((i=this._input.match(this.rules[r[a]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=a,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,r[a])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,s.K2)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,s.K2)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,s.K2)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,s.K2)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,s.K2)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,s.K2)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,s.K2)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,s.K2)(function(t,e,i,n){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}},(0,s.K2)(h,"Parser"),h.prototype=c,c.Parser=h,new h}();o.parser=o;var c="",h=[],u=[],p=[],y=(0,s.K2)(function(){h.length=0,u.length=0,c="",p.length=0,(0,a.IU)()},"clear"),d=(0,s.K2)(function(t){c=t,h.push(t)},"addSection"),f=(0,s.K2)(function(){return h},"getSections"),g=(0,s.K2)(function(){let t=_(),e=0;for(;!t&&e<100;)t=_(),e++;return u.push(...p),u},"getTasks"),x=(0,s.K2)(function(){let t=[];return u.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},"updateActors"),m=(0,s.K2)(function(t,e){let i=e.substr(1).split(":"),n=0,r=[];1===i.length?(n=Number(i[0]),r=[]):(n=Number(i[0]),r=i[1].split(","));let a=r.map(t=>t.trim()),s={section:c,type:c,people:a,task:t,score:n};p.push(s)},"addTask"),k=(0,s.K2)(function(t){let e={section:c,type:c,description:t,task:t,classes:[]};u.push(e)},"addTaskOrg"),_=(0,s.K2)(function(){let t=(0,s.K2)(function(t){return p[t].processed},"compileTask"),e=!0;for(let[i,n]of p.entries())t(i),e=e&&n.processed;return e},"compileTasks"),b=(0,s.K2)(function(){return x()},"getActors"),v={getConfig:(0,s.K2)(()=>(0,a.D7)().journey,"getConfig"),clear:y,setDiagramTitle:a.ke,getDiagramTitle:a.ab,setAccTitle:a.SV,getAccTitle:a.iN,setAccDescription:a.EI,getAccDescription:a.m7,addSection:d,getSections:f,getTasks:g,addTask:m,addTaskOrg:k,getActors:b},w=(0,s.K2)(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${(0,r.o)()}
`,"getStyles"),K=(0,s.K2)(function(t,e){return(0,n.tk)(t,e)},"drawRect"),$=(0,s.K2)(function(t,e){let i=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");function r(t){let i=(0,l.JLW)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function a(t){let i=(0,l.JLW)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function o(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return n.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,s.K2)(r,"smile"),(0,s.K2)(a,"sad"),(0,s.K2)(o,"ambivalent"),e.score>3?r(n):e.score<3?a(n):o(n),i},"drawFace"),M=(0,s.K2)(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i},"drawCircle"),T=(0,s.K2)(function(t,e){return(0,n.m)(t,e)},"drawText"),S=(0,s.K2)(function(t,e,i){let r=t.append("g"),a=(0,n.PB)();a.x=e.x,a.y=e.y,a.fill=e.fill,a.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),a.height=i.height,a.class="journey-section section-type-"+e.num,a.rx=3,a.ry=3,K(r,a),I(i)(e.text,r,a.x,a.y,a.width,a.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),E=-1,C=(0,s.K2)(function(t,e,i){let r=e.x+i.width/2,a=t.append("g");E++,a.append("line").attr("id","task"+E).attr("x1",r).attr("y1",e.y).attr("x2",r).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),$(a,{cx:r,cy:300+(5-e.score)*30,score:e.score});let s=(0,n.PB)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width,s.height=i.height,s.class="task task-type-"+e.num,s.rx=3,s.ry=3,K(a,s);let l=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color;M(a,{cx:l,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position}),l+=10}),I(i)(e.task,a,s.x,s.y,s.width,s.height,{class:"task"},i,e.colour)},"drawTask"),I=function(){function t(t,e,i,r,a,s,l,o){n(e.append("text").attr("x",i+a/2).attr("y",r+s/2+5).style("font-color",o).style("text-anchor","middle").text(t),l)}function e(t,e,i,r,a,s,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,p=t.split(/<br\s*\/?>/gi);for(let t=0;t<p.length;t++){let o=t*h-h*(p.length-1)/2,y=e.append("text").attr("x",i+a/2).attr("y",r).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);y.append("tspan").attr("x",i+a/2).attr("dy",o).text(p[t]),y.attr("y",r+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(y,l)}}function i(t,i,r,a,s,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",r).attr("y",a).attr("width",s).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");u.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,r,a,s,l,o,c),n(u,o)}function n(t,e){for(let i in e)i in e&&t.attr(i,e[i])}return(0,s.K2)(t,"byText"),(0,s.K2)(e,"byTspan"),(0,s.K2)(i,"byFo"),(0,s.K2)(n,"_setTextAttrs"),function(n){return"fo"===n.textPlacement?i:"old"===n.textPlacement?t:e}}(),P=(0,s.K2)(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),A=(0,s.K2)(function(t){Object.keys(t).forEach(function(e){B[e]=t[e]})},"setConf"),j={},D=0;function V(t){let e=(0,a.D7)().journey,i=e.maxLabelWidth;D=0;let n=60;Object.keys(j).forEach(r=>{let a=j[r].color;M(t,{cx:20,cy:n,r:7,fill:a,stroke:"#000",pos:j[r].position});let s=t.append("text").attr("visibility","hidden").text(r),l=s.node().getBoundingClientRect().width;s.remove();let o=[];if(l<=i)o=[r];else{let e=r.split(" "),n="";s=t.append("text").attr("visibility","hidden"),e.forEach(t=>{let e=n?`${n} ${t}`:t;if(s.text(e),s.node().getBoundingClientRect().width>i){if(n&&o.push(n),n=t,s.text(t),s.node().getBoundingClientRect().width>i){let e="";for(let n of t)e+=n,s.text(e+"-"),s.node().getBoundingClientRect().width>i&&(o.push(e.slice(0,-1)+"-"),e=n);n=e}}else n=e}),n&&o.push(n),s.remove()}o.forEach((i,r)=>{let a=T(t,{x:40,y:n+7+20*r,fill:"#666",text:i,textMargin:e.boxTextMargin??5}).node().getBoundingClientRect().width;a>D&&a>e.leftMargin-a&&(D=a)}),n+=Math.max(20,20*o.length)})}(0,s.K2)(V,"drawActorLegend");var B=(0,a.D7)().journey,F=0,L=(0,s.K2)(function(t,e,i,n){let r,s=(0,a.D7)(),o=s.journey.titleColor,c=s.journey.titleFontSize,h=s.journey.titleFontFamily,u=s.securityLevel;"sandbox"===u&&(r=(0,l.Ltv)("#i"+e));let p="sandbox"===u?(0,l.Ltv)(r.nodes()[0].contentDocument.body):(0,l.Ltv)("body");R.init();let y=p.select("#"+e);P(y);let d=n.db.getTasks(),f=n.db.getDiagramTitle(),g=n.db.getActors();for(let t in j)delete j[t];let x=0;g.forEach(t=>{j[t]={color:B.actorColours[x%B.actorColours.length],position:x},x++}),V(y),F=B.leftMargin+D,R.insert(0,0,F,50*Object.keys(j).length),z(y,d,0);let m=R.getBounds();f&&y.append("text").text(f).attr("x",F).attr("font-size",c).attr("font-weight","bold").attr("y",25).attr("fill",o).attr("font-family",h);let k=m.stopy-m.starty+2*B.diagramMarginY,_=F+m.stopx+2*B.diagramMarginX;(0,a.a$)(y,k,_,B.useMaxWidth),y.append("line").attr("x1",F).attr("y1",4*B.height).attr("x2",_-F-4).attr("y2",4*B.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let b=70*!!f;y.attr("viewBox",`${m.startx} -25 ${_} ${k+b}`),y.attr("preserveAspectRatio","xMinYMin meet"),y.attr("height",k+b+25)},"draw"),R={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,s.K2)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:(0,s.K2)(function(t,e,i,n){void 0===t[e]?t[e]=i:t[e]=n(i,t[e])},"updateVal"),updateBounds:(0,s.K2)(function(t,e,i,n){let r=(0,a.D7)().journey,l=this,o=0;function c(a){return(0,s.K2)(function(s){o++;let c=l.sequenceItems.length-o+1;l.updateVal(s,"starty",e-c*r.boxMargin,Math.min),l.updateVal(s,"stopy",n+c*r.boxMargin,Math.max),l.updateVal(R.data,"startx",t-c*r.boxMargin,Math.min),l.updateVal(R.data,"stopx",i+c*r.boxMargin,Math.max),"activation"!==a&&(l.updateVal(s,"startx",t-c*r.boxMargin,Math.min),l.updateVal(s,"stopx",i+c*r.boxMargin,Math.max),l.updateVal(R.data,"starty",e-c*r.boxMargin,Math.min),l.updateVal(R.data,"stopy",n+c*r.boxMargin,Math.max))},"updateItemBounds")}(0,s.K2)(c,"updateFn"),this.sequenceItems.forEach(c())},"updateBounds"),insert:(0,s.K2)(function(t,e,i,n){let r=Math.min(t,i),a=Math.max(t,i),s=Math.min(e,n),l=Math.max(e,n);this.updateVal(R.data,"startx",r,Math.min),this.updateVal(R.data,"starty",s,Math.min),this.updateVal(R.data,"stopx",a,Math.max),this.updateVal(R.data,"stopy",l,Math.max),this.updateBounds(r,s,a,l)},"insert"),bumpVerticalPos:(0,s.K2)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:(0,s.K2)(function(){return this.verticalPos},"getVerticalPos"),getBounds:(0,s.K2)(function(){return this.data},"getBounds")},O=B.sectionFills,N=B.sectionColours,z=(0,s.K2)(function(t,e,i){let n=(0,a.D7)().journey,r="",s=i+(2*n.height+n.diagramMarginY),l=0,o="#CCC",c="black",h=0;for(let[i,a]of e.entries()){if(r!==a.section){o=O[l%O.length],h=l%O.length,c=N[l%N.length];let s=0,u=a.section;for(let t=i;t<e.length;t++)if(e[t].section==u)s+=1;else break;S(t,{x:i*n.taskMargin+i*n.width+F,y:50,text:a.section,fill:o,num:h,colour:c,taskCount:s},n),r=a.section,l++}let u=a.people.reduce((t,e)=>(j[e]&&(t[e]=j[e]),t),{});a.x=i*n.taskMargin+i*n.width+F,a.y=s,a.width=n.diagramMarginX,a.height=n.diagramMarginY,a.colour=c,a.fill=o,a.num=h,a.actors=u,C(t,a,n),R.insert(a.x,a.y,a.x+a.width+n.taskMargin,450)}},"drawTasks"),W={setConf:A,draw:L},Y={parser:o,db:v,renderer:W,styles:w,init:(0,s.K2)(t=>{W.setConf(t.journey),v.clear()},"init")}}}]);