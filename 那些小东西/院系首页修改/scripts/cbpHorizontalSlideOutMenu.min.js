/**
 * cbpHorizontalSlideOutMenu.min.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function(b){var a=b.document;function d(f,e){for(var g in e){if(e.hasOwnProperty(g)){f[g]=e[g]}}return f}function c(f,e){this.el=f;this.options=d(this.defaults,e);this._init()}c.prototype={defaults:{},_init:function(){this.current=-1;this.touch=Modernizr.touch;this.menu=this.el.querySelector(".cbp-hsmenu");this.menuItems=this.el.querySelectorAll(".cbp-hsmenu > li");this.menuBg=a.createElement("div");this.menuBg.className="cbp-hsmenubg";this.el.appendChild(this.menuBg);this._initEvents()},_openMenu:function(i,k){var g=this,j=i.parentNode,f=Array.prototype.slice.call(this.menuItems),h=j.querySelector(".cbp-hssubmenu"),l=function(m){var m=m||g.menuItems[g.current];m.className="";m.setAttribute("data-open","")},e=function(){g.current=-1;g.menuBg.style.height="0px"};if(h){k.preventDefault();if(j.getAttribute("data-open")==="open"){l(j);e()}else{j.setAttribute("data-open","open");if(g.current!==-1){l()}g.current=f.indexOf(j);j.className="cbp-hsitem-open";g.menuBg.style.height=h.offsetHeight+"px"}}else{if(g.current!==-1){l();e()}}},_initEvents:function(){var e=this;Array.prototype.slice.call(this.menuItems).forEach(function(h,g){var f=h.querySelector("a");if(e.touch){f.addEventListener("touchstart",function(i){e._openMenu(this,i)})}else{f.addEventListener("click",function(i){e._openMenu(this,i)})}});b.addEventListener("resize",function(f){e._resizeHandler()})},_resizeHandler:function(){var e=this;function f(){e._resize();e._resizeTimeout=null}if(this._resizeTimeout){clearTimeout(this._resizeTimeout)}this._resizeTimeout=setTimeout(f,50)},_resize:function(){if(this.current!==-1){this.menuBg.style.height=this.menuItems[this.current].querySelector(".cbp-hssubmenu").offsetHeight+"px"}}};b.cbpHorizontalSlideOutMenu=c})(window);