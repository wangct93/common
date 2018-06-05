!function r(o,a,s){function c(n,t){if(!a[n]){if(!o[n]){var e="function"==typeof require&&require;if(!t&&e)return e(n,!0);if(u)return u(n,!0);throw new Error("Cannot find module '"+n+"'")}var i=a[n]={exports:{}};o[n][0].call(i.exports,function(t){var e=o[n][1][t];return c(e||t)},i,i.exports,r,o,a,s)}return a[n].exports}for(var u="function"==typeof require&&require,t=0;t<s.length;t++)c(s[t]);return c}({1:[function(require,module,exports){"use strict";var util=require("../lib/util");function $(t){if(!util.isFunction(t))return new DomElement(t);DOMReady(t)}function DomElement(t){if(t instanceof DomElement)return t;var e=[];(this.selector=t)&&(e=9===t.nodeType||1===t.nodeType?[t]:"string"==typeof t?"<"===(t=t.trim()).charAt(0)?createElemByHTML(t):document.querySelectorAll(t):t);for(var n=e.length,i=0;i<n;i++)this[i]=e[i];this.length=n}module.exports=$;var rnoInnerhtml=/<(?:script|style|link)/i;DomElement.prototype={forEach:function(t,e){return arrForEach(this,t,e=e||this),this},clone:function(e){var n=[];return this.forEach(function(t){n.push(t.cloneNode(!!e))}),$(n)},add:function(t){var e=this;return $(t).forEach(function(t){e[e.length++]=t}),this},eq:function(t){var e=this.length;if(e)for(e<=t&&(t%=e);t<0;)t+=e;return $(this[t])},first:function(){return this.eq(0)},last:function(){return this.eq(this.length-1)},on:function(t,o,a){var e=t.split(/\s+/);return this.forEach(function(r){e.forEach(function(t){var e=r.eventList;e||(r.eventList=e={});var n=e[t];if(n||(e[t]=n=[]),r.addEventListener)n.push(o),r.addEventListener(t,o,a);else{var i=function(t){(t=t||event).target=t.target||t.srcElement,t.deltaY=-t.wheelDelta,o.call(r,t)};i.execFunc=o,n.push(i),r.attachEvent("on"+filterEventTypeForIE8(t),i)}})})},off:function(r,o){var e=this;return this.forEach(function(n){var t=n.eventList,i=t&&t[r];i&&(o?n.removeEventListener?(n.removeEventListener(r,o),i.remove(o)):arrForEach(i,function(t,e){if(t.execFunc===o)return n.detachEvent("on"+filterEventTypeForIE8(r),t),i.splice(e,1),!1}):i.forEach(function(t){return e.off(r,t)},e))},this)},attr:function(e,n){return n===undefined?this[0]?this[0].getAttribute(e):"":this.forEach(function(t){t.setAttribute(e,n)})},removeAttr:function(e){return this.forEach(function(t){return t.removeAttribute(e)})},prop:function(e,n){return n===undefined?this[0]?this[0][e]:"":this.forEach(function(t){t[e]=n})},hasClass:function(e){var n=!1;return arrForEach(this,function(t){if(_hasClass(t,e))return!(n=!0)}),n},addClass:function(t){return t?this.forEach(function(e){t.split(/\s+/).forEach(function(t){_hasClass(e,t)||(e.className+=" "+t)})}):this},removeClass:function(t){return t?this.forEach(function(n){t.split(/\s+/).forEach(function(t){var e=new RegExp("\\s+"+t+"\\s+");n.className=(" "+n.className+" ").replace(e," ").trim()})}):this},toggleClass:function(n){return this.forEach(function(t){var e=$(t);e.hasClass(n)?e.removeClass(n):e.addClass(n)})},css:function(e,n){if(util.isString(e)){if(n===undefined){var t=this[0];return t?t.currentStyle?t.currentStyle[e]:getComputedStyle(t,!1)[e]:""}this.forEach(function(t){t.style[e]=n})}else for(var i in e)e.hasOwnProperty(i)&&this.css(i,e[i]);return this},getElemList:function(a){var s=[];return this.forEach(function(t,e){var n=a(t,e);if(n){util.isNumber(n.length)||(n=[n]);for(var i=void 0,r=0,o=n.length;r<o;r++)i=n[r],-1===s.indexOf(i)&&s.push(i)}}),s},next:function(n){return $(this.getElemList(function(t){for(var e=t.nextSibling;e&&(1!==e.nodeType||!checkElem(e,n));)e=e.nextSibling;return e}))},prev:function(){return $(this.getElemList(function(t){for(var e=t.previousSibling;e&&(1!==e.nodeType||!checkElem(e,selector));)e=e.previousSibling;return e}))},index:function(){var t=0,e=this[0];if(e===undefined)return-1;for(;e=e.previousSibling;)1===e.nodeType&&t++;return t},show:function(){return this.css("display","block")},hide:function(){return this.css("display","none")},parent:function(){return $(this.getElemList(function(t){return t.parentNode}))},children:function(t){return $(this.getElemList(function(t){return t.children})).filter(t)},childNodes:function(){return $(this.getElemList(function(t){return t.childNodes}))},siblings:function(i){return $(this.getElemList(function(e){var n=[];return arrForEach(e.parentNode.children,function(t){-1===n.indexOf(t)&&t!==e&&1===t.nodeType&&checkElem(t,i)&&n.push(t)}),n}))},append:function(n){return this.forEach(function(e){var t=$(n);t.forEach(function(t){return e.appendChild(t)}),$._execScript(t)})},prepend:function(e){return this.forEach(function(n){var t=$(e);t.forEach(function(t){var e=n.children[0];e?n.insertBefore(t,e):n.appendChild(t)}),$._execScript(t)})},before:function(n){return this.forEach(function(e){var t=$(n);t.forEach(function(t){e.parentNode.insertBefore(t,e)}),$._execScript(t)})},after:function(i){return this.forEach(function(t){var e=$(t),n=e.next();n.length?n.before(i):e.parent().append(i)})},remove:function(){return this.forEach(function(t){t.parentNode.removeChild(t)})},isContain:function(t){var e=this[0],n=t[0];return!(!e||!n)&&e.contains(n)},getRect:function(){var t=this[0];if(t){var e=t.getBoundingClientRect(),n=e.left,i=e.top,r=e.right,o=e.bottom;return{left:n,top:i,right:r,bottom:o,width:e.width||r-n,height:e.height||o-i}}},getNodeName:function(){return this[0]?this[0].nodeName:""},find:function(e){return $(this.getElemList(function(t){return t.querySelectorAll(e)}))},bind:function(){return this.on.apply(this,arguments)},unbind:function(){return this.off.apply(this,arguments)},text:function(e){return e===undefined?this[0]?this[0].innerText:"":this.forEach(function(t){t.innerText=e})},html:function(e){return e===undefined?this[0]?this[0].innerHTML:"":util.isString(e)&&"<"!==e.charAt(0)||util.isNumber(e)||util.isBoolean(e)?this.forEach(function(t){t.innerHTML=e}):this.empty().append(e)},val:function(e){return e===undefined?this[0]?this[0].value:"":this.forEach(function(t){t.value=e})},empty:function(){return this.forEach(function(t){t.innerHTML=""})},filter:function(e){return $(this.getElemList(function(t){return checkElem(t,e)?t:null}))},offset:function(){var t=this[0];if(t)return{left:t.offsetLeft,top:t.offsetTop}},closest:function(e){return $(this.getElemList(function(t){for(;t&&!checkElem(t,e);)t=t.parentNode;return t}))},data:function(e,n){if(n===undefined){var t=this[0];return t?cacheData.getData(t,e):""}return this.forEach(function(t){cacheData.setData(t,e,n)})},removeData:function(e){return this.forEach(function(t){cacheData.removeData(t,e)})},animate:function(){var s=0<arguments.length&&arguments[0]!==undefined?arguments[0]:{},c=1<arguments.length&&arguments[1]!==undefined?arguments[1]:100,u=arguments[2];return this.forEach(function(t){var n=$(t);clearInterval(n.data("animateTimer"));var i={},r=Math.ceil(c/30);for(var e in s)if(s.hasOwnProperty(e)&&s[e]!==undefined){var o=s[e].toString().toFloatNum();i[e]=(o-n.css(e).toFloatNum())/r,s[e]=o+("opacity"===e?"":"px")}var a=setInterval(function(){var t=s;if(0===--r)clearInterval(a),util.execFunc(u,n);else for(var e in t={},s)s.hasOwnProperty(e)&&s[e]!==undefined&&(t[e]=n.css(e).toFloatNum()+i[e]+("opacity"===e?"":"px"));t.opacity!==undefined&&(t.filter="alpha(opacity="+100*t.opacity+")"),n.css(t)},30);n.data("animateTimer",a)})},dragSort:function(){this.off("mousedown").mousedown(function(e){$(this);var n=$(e.target),c=n.closest(".dragsort-elem"),u=c.siblings();if(1===e.which&&0!==c.length&&0!==u.length&&!n.closest(".nodrag-elem").length){var f=e.clientX,l=e.clientY,h=void 0,d=void 0,p=void 0,v=[],g=!1;$("body").mousemove(m).mouseup(function t(e){if(g){var n=u.filter(".drag-active");c.css({left:0,top:0,position:"relative",zIndex:"auto"}),n.length?n.after(c).removeClass("drag-active"):(n=u.filter(".drag-active-left")).length?n.before(c).removeClass("drag-active-left"):u.parent().append(c)}$("body").off("mousemove",m).off("mouseup",t)})}function m(t){var e=t.clientX,n=t.clientY;if(g||n===l&&e===f){if(g){c.css({left:e-h+"px",top:n-d+"px"});var i=v[0],r=void 0;for(r=0;r<v.length;r++)v[r][0].y<n&&(i=v[r]);var o=void 0,a=i[0].i,s=!0;for(r=0;r<i.length;r++)(o=i[r]).x<e&&(s=!1,a=o.i);u.removeClass("drag-active"),u.removeClass("drag-active-left"),s?u.eq(a).addClass("drag-active-left"):u.eq(a).addClass("drag-active")}}else g=!0,p=c[0].getBoundingClientRect(),h=f-p.left,d=l-p.top,c.css({position:"absolute",zIndex:500,left:p.left+"px",top:p.top+"px"}),u.forEach(function(t,e){var n=t.getBoundingClientRect(),i=n.width||n.right-n.left,r=$(t).css("marginBottom").toNum(),o=n.top-r/2,a=n.left+i/2,s=v.indexOfFunc(function(t){return t[0].y===o}),c={y:o,x:a,i:e};-1===s?v.push([c]):v[s].push(c)}),$("body").append(c),m(t)}}),this[0].onselectstart=function(){return!1},$("body")[0].ondragstart=function(){return!1}},drag:function(){return this.off("mousedown").mousedown(function(e){var n=$(this),i=e.clientX-this.offsetLeft+n.css("marginLeft").toNum(),r=e.clientY-this.offsetTop+n.css("marginTop").toNum();function o(t){n.css({left:t.clientX-i+"px",top:t.clientY-r+"px"})}$("body").mousemove(o).mouseup(function t(e){$("body").off("mousemove",o).off("mouseup",t)})})},zoom:function(){return this.off("wheel").wheel(function(t){var e=$(this),n=e.getRect(),i=t.clientX-this.offsetLeft,r=t.clientY-this.offsetTop,o=this.offsetLeft-e.css("marginLeft").toNum(),a=this.offsetTop-e.css("marginTop").toNum(),s=(t.wheelDelta===undefined?t.deltaY<0:0<t.wheelDelta)?1.2:1/1.2;e.css({width:n.width*s+"px",height:n.height*s+"px",left:o+i*(1-s)+"px",top:a+r*(1-s)+"px"}),$.preventDefault(t)})},magnify:function(t){return this.data("option",util.extend({offset:10,scale:8},t)),this.off("mouseenter").mouseenter(function(e){var n=$(this),i=n.getRect(),r=i.width,o=i.height,a=n.data("option"),s=n.find("img").attr("src");if(!(!s||a.enable&&a.enable.call(this,s))){var c=n.find(".magnify-slider");0===c.length&&(c=$('<div class="magnify-slider"></div>'),n.append(c));var u=$(".magnify-view"),f=$("body");0===u.length&&(u=$('<div class="magnify-view"><img class="magnify-img"></div>'),f.append(u));var l=u.find("img").attr("src",s),h=function(t){var e=t.clientX-i.left-d/2,n=t.clientY-i.top-d/2;e=Math.min(Math.max(e,0),r-d),n=Math.min(Math.max(n,0),o-d),c.css({left:e+"px",top:n+"px"}),l.css({left:-e*p+"px",top:-n*p+"px"})},d=c.css("width").toNum(),p=a.scale,v=a.offset,g=i.right+10,m=d*p;i.right+m+v>innerWidth&&(g=i.left-v-m);var y=i.top;y+m>innerHeight&&(y=i.bottom-m),u.css({left:g+"px",top:y+"px",width:m+"px",height:m+"px"}),l.css({width:r*p+"px",height:o*p+"px"}),h(e),c.show(),u.show();f.on("mousemove",h),n.on("mouseleave",function t(){c.hide(),u.hide(),$("body").off("mousemove",h),n.off("mouseleave",t)})}})},paste:function(t){this.off("paste").on("paste",function(t){var e=t.clipboardData,n=t.target,i=e.items[0],r=($(n).data("pasteOption")||{}).success;if(i&&-1!==i.type.indexOf("image")){var o=new FileReader,a=i.getAsFile();o.onload=function(t){wt.execFunc.call(n,r,t.target.result)},o.readAsDataURL(a)}else wt.execFunc.call(n,r,e.getData("text"))}).data("pasteOption",t)},fileDrop:function(t){this.off("drop").on("drop",function(t){t.preventDefault();var e=t.dataTransfer,n=t.target,i=e.files,r=($(n).data("fileDropOption")||{}).success;new wt.Queue({list:Array.from(i),execFunc:function(t,n){var i=this,e=new FileReader;e.onload=function(t){var e=i.result;e||(e=[],i.result=e),e.push(t.target.result),n()},e.readAsDataURL(t)},success:function(){wt.execFunc.call(n,r,this.result)}}).start()}).data("fileDropOption",t).on("dragover",function(t){return t.preventDefault()})}},util.extend($,{ajax:function(t){var e=t.type,n=e===undefined?"get":e,i=t.url,r=t.data,o=t.async,a=o===undefined||o,s=t.headers,c=s===undefined?{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"}:s,u=t.processData,f=u===undefined||u,l=t.contentType,h=l===undefined||l,d=t.responseType,p=t.success,v=t.error,g=t.timeout,m=t.ontimeout,y=new XMLHttpRequest,x=util.execFunc;if(y.onreadystatechange=function(){if(4===y.readyState){var t=y.responseText;try{t=JSON.parse(t)}catch(e){}200===y.status?x(p,t):x(v,t)}},y.onerror=function(t){x(v,y.responseText)},f&&util.isPlainObj(r)){var w=[];for(var b in r)if(r.hasOwnProperty(b)){var E=r[b];E!==undefined&&(E=util.isPlainObj(E)?JSON.stringify(E):E,w.push(b+"="+E))}r=w.join("&"),"GET"===n.toUpperCase()&&r&&(i+=(-1===i.indexOf("?")?"?":"&")+r)}for(var S in y.open(n,i,a),c)c.hasOwnProperty(S)&&("content-type"!==S||h)&&y.setRequestHeader(S,c[S]);wt.extend(y,{timeout:g,ontimeout:m,responseType:d}),y.send(r)},_execScript:function _execScript($node){$node=$node instanceof DomElement?$node:$($node),$node.find("script").forEach(function(script){if(script.src)$.ajax({url:script.src,async:!1,success:function success(data){try{eval(data)}catch(e){}}});else try{eval(script.innerHTML)}catch(e){}})},preventDefault:function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},stopPropagation:function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}});var eventNames="click dblclick mouseover mouseout mouseenter mouseleave mousedown mousemove mouseup keydown keyup wheel change";function createElemByHTML(t){var e=document.createElement("div");e.innerHTML=t;for(var n=e.children,i=[],r=0,o=n.length;r<o;r++)i.push(n[r]);return i}function filterEventTypeForIE8(t){return{wheel:"mousewheel"}[t]||t}function _hasClass(t,e){var n=new RegExp("\\s+"+e+"\\s+"),i=" "+t.className+" ";return n.test(i)}function arrForEach(t,e,n){n=n||this;for(var i=0,r=t.length;i<r&&!1!==e.call(n,t[i],i);i++);}function concat(t,e){for(var n=t.length,i=0,r=e.length;i<r;i++)t[n+i]=e[i];t.length=n+len}eventNames.split(" ").forEach(function(e){DomElement.prototype[e]=function(t){return util.isFunction(t)?this.on(e,t):this.forEach(function(t){return t.click()})}});var selectorExpr=/^(#([\w-]+)|(\w+)|\.([\w-]+))$/,selectorPropExpr=/\[[\w\W]+\]$/;function checkElem(n){var t=1<arguments.length&&arguments[1]!==undefined?arguments[1]:"",i=!0;t=t.replace(selectorPropExpr,function(t){var e=t.replace(/^\[|\]$/g,"").split("=");return i=n.getAttribute(e[0])===e[1],""});var e=selectorExpr.exec(t);return!!i&&(!t||!!e&&(e[2]?n.id===e[2]:e[3]?n.nodeName===e[3].toUpperCase():!!e[4]&&_hasClass(n,e[4])))}var cacheData={data:[],getDataByElem:function(e){var t=this.data.indexOfFunc(function(t){return t._target===e});return this.data[t]},setData:function(t,e,n){var i=this.getDataByElem(t);i?i.data[e]=n:((i={_target:t,data:{}}).data[e]=n,this.data.push(i))},getData:function(t,e){var n=this.getDataByElem(t);return n?n.data[e]:""},removeData:function(t,e){var n=this.getDataByElem(t);n&&(e===undefined?this.data.remove(n):delete n.data[e])}};function DOMReady(t){"complete"===document.readyState?t():document.addEventListener?document.addEventListener("DOMContentLoaded",t,!1):ieDOMReady(t)}function ieDOMReady(t){try{document.documentElement.doScroll("left"),t()}catch(e){setTimeout(function(){ieDOMReady(t)},10)}}},{"../lib/util":6}],2:[function(t,e,n){"use strict";var g=t("../lib/util"),m=t("./$");try{window.wt=g,window.$=window.$||m,window.innerHeight=window.innerHeight||document.documentElement.offsetHeight,window.innerWidth=window.innerWidth||document.documentElement.offsetWidth}catch(s){}function i(e){var c=m('<div class="rect-box"></div>'),n=m(this),u=n.getRect(),f=e.clientX-u.left,l=e.clientY-u.top,h=u.width||u.right-u.left,d=u.height||u.bottom-u.top;n.append(c);var i=h-f,r=d-l;c.css({right:i/h*100+"%",bottom:r/d*100+"%",width:0,height:0});var p=function(t){var e="auto",n="auto",i=t.clientX-u.left,r=t.clientY-u.top,o=i-f,a=r-l;0<o?(e=f/h*100+"%",o=Math.min(o,h-f)):o=Math.min(-o,f),0<a?(n=l/d*100+"%",a=Math.min(a,d-l)):a=Math.min(-a,l),c.css({left:e,top:n,width:o/h*100+"%",height:a/d*100+"%"})},v=this.drawRectOpt;m("body").mousemove(p).mouseup(function t(e){var n=Math.max(Math.min(e.clientX-u.left,h),0),i=Math.max(Math.min(e.clientY-u.top,d),0),r=Math.min(f,n)/h,o=Math.min(l,i)/d,a=Math.abs(f-n)/h,s=Math.abs(l-i)/d;c.css({left:100*r+"%",top:100*o+"%",width:100*a+"%",height:100*s+"%"}),c.attr("coord",r+","+o+","+(r+a)+","+(o+s)),m("body").off("mousemove",p).off("mouseup",t),g.execFunc(v.mouseup,c)})}function d(t){var e=null;try{t.contentWindow&&(e=t.contentWindow.document)}catch(n){console.log("cannot get iframe.contentWindow document: "+n)}if(e)return e;try{e=t.contentDocument?t.contentDocument:t.document}catch(n){console.log("cannot get iframe.contentDocument: "+n),e=t.document}return e}var r=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(t)}return e.prototype.init=function(t){var e=t.limit,n=e===undefined?3:e,i=t.list,r=i===undefined?[]:i,o=t.interval,a=o===undefined?30:o,s=t.imgLoad,c=t.imgError,u=t.errorSrc;r=g.isArray(r)?r:g.toArray(r),this.queue=new g.Queue({list:r,execFunc:function(t,e){var n=m(t);if(n.prop("src"))e();else{var i=n.attr("dsrc");setTimeout(function(){t.complete||(u?t.src=u:(t.src=null,e()))},6e3),n.on("load",function(){g.execFunc(s,this),e()}).on("error",function(){g.execFunc(c,this)}).attr("src",i)}},interval:a,limit:n})},e.prototype.load=function(){this.queue.start()},e.prototype.add=function(t){this.queue.addItem(t)},e}();function o(t){var e=t.target;if(!e||1!==e.nodeType)throw new Error("参数中的target不是一个dom元素！");this.setOpt(t),this.init()}o.prototype={init:function(t){this.initHtml(),this.addEvent()},setOpt:function(t){t.$target=m(t.target),g.extend(this,{pageSize:10,total:100,pageNum:1,itemLength:10,message:"共{maxNum}页",hasInput:!0},t)},initHtml:function(){for(var t=this.$target,e=this.getMaxNum(),n=Math.min(e,this.itemLength),i=this.getMessage(),r='<span class="paging-btn paging-btn-prev">上一页</span><div class="paging-pagebox">',o=1;o<=n;o++)r+='<span class="paging-item '+(1===o?"active":"")+'">'+o+"</span>";r+='</div><span class="paging-btn paging-btn-next">下一页</span>',this.hasInput&&(r+='<input class="paging-input" type="text">'),r+='<span class="paging-message">'+i+"</span>",t.html(r),t.addClass("paging-box paging-box-"+(this.position||"right"));var a=t.find(".paging-btn");this.$prevBtn=a.eq(0),this.$nextBtn=a.eq(1),this.$input=t.find(".paging-input")},resetTotal:function(t){this.opt;if(this.total!==t){this.total=t;for(var e=this.getMaxNum(),n=Math.min(e,this.itemLength),i="",r=this.pageNum,o=1;o<=n;o++)i+='<span class="paging-item '+(o===r?"active":"")+'">'+o+"</span>";this.$prevBtn.next().html(i),this.updateBtnState(),this.$input.next().html(this.getMessage())}},updateBtnState:function(){var t=this.$prevBtn,e=this.$nextBtn,n=this.getMaxNum();1===this.pageNum?t.addClass("paging-diasbaled"):t.removeClass("paging-diasbaled"),this.pageNum>=n?e.addClass("paging-diasbaled"):e.removeClass("paging-diasbaled")},getMaxNum:function(){return Math.ceil(this.total/this.pageSize)||1},getMessage:function(){var n={total:this.total,num:this.pageNum,size:this.size,maxNum:this.getMaxNum()};return this.message.replace(/\{[\w\W]*\}/g,function(t){var e=t.substring(1,t.length-1);return n[e]||""})},addEvent:function(){var i=this;this.$target.on("click",function(t){var e=m(t.target);if(e.hasClass("paging-btn")&&!e.hasClass("paging-diasbaled")){var n=m(this).find(".active").html().toNum();i.select(n+(e.hasClass("paging-btn-next")?1:-1))}else e.hasClass("paging-item")&&i.select(e.html().toNum())}),this.$input.on("keydown",function(t){var e=t.keyCode;-1!==[8,37,39].indexOf(e)||48<=e&&e<=57||96<=e&&e<=105||a.preventDefault(t)}).on("keyup",function(t){var e=this.value.toNum(),n=i.getMaxNum();n<e&&(e=n,this.value=e),13===t.keyCode&&i.select(e)})},select:function(r){this.pageNum=r;var t=this.$target,e=this.itemLength,n=this.getMaxNum(),i=Math.floor(e/2),o=r-i;r<=i+1?o=1:n-i<r&&(o=n-e+1),t.find(".paging-item").forEach(function(t,e){var n=m(t),i=o+e;n.html(i),i===r?n.addClass("active"):n.removeClass("active")}),this.updateBtnState(),g.execFunc.call(this,this.onSelect,r,this.pageSize)},reload:function(){g.execFunc.call(this,this.onSelect,this.pageNum,this.pageSize)}};var a={isIE:function(){return"ActiveXObject"in window},isChrome:function(){return-1!==navigator.userAgent.indexOf("Chrome")},isFirefox:function(){return-1!==navigator.userAgent.indexOf("Firefox")},isSafari:function(){return-1!==navigator.userAgent.indexOf("Safari")},isOpera:function(){return-1!==navigator.userAgent.indexOf("Opera")},$:m,ajax:m.ajax,addScript:function(t,e){var n=(e||window).document,i=n.createDocumentFragment();g.isArray(t)||(t=[t]),t.forEach(function(t){var e=n.createElement("script");e.src=t,i.appendChild(e)}),n.querySelector("head").appendChild(i)},getQueryString:function(t,e){var n=e||window,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),r=n.location.search.substr(1).match(i);return r&&decodeURIComponent(r[2])},addActive:function(t,e){var n=m(t);n.addClass("active"),!1!==e&&n.siblings().removeClass("active")},stopPropagation:m.stopPropagation,preventDefault:m.preventDefault,formData:function(t){var e=t.formatTarget,a=e===undefined?window:e,n=t.formatField,s=n===undefined?"format":n,i=t.list,r=i===undefined?[]:i,c=(t.field,undefined,t.data),u=c||{};return m(r).forEach(function(t){var e=m(t),n=e.attr(n);if(n){var i=e.getNodeName(),r="INPUT"===i||"TEXTAREA"===i?"val":"html",o=a[e.attr(s)];"function"!=typeof o&&(o=function(t){return t}),c?e[r](o(c[n])):u[n]=e[r]()}}),u},ajaxSubmit:function(t){var e,i,n,r=g.extend({},{url:"/",method:"post",enctype:"multipart/form-data"},t);window.FormData?(e=r,i=new FormData,n=e.form,m(n).find("input").forEach(function(t){var e=m(t),n=e.attr("name");n&&("file"===e.attr("type")?g.forEach(t.files,function(t,e){i.append(n+"_"+e,t)}):i.append(n,t.value))}),g.ajax({url:e.url,type:e.method,data:i,processData:!1,contentType:!1,success:e.success,error:e.error})):function(c){var u=this,f=c.form,l=m(f);c.enctype&&l.attr("enctype",c.enctype),c.method&&l.attr("method",c.method),c.url&&l.attr("action",c.url),l.clone(!0);var h=m('<iframe style="display: none"></iframe>');h.on("load",function t(){h.off("load",t);var e=d(u);h.after(l),e.body.appendChild(f);try{f.submit()}catch(s){var n=document.createElement("form").submit;n.apply(f)}var i=u,r=+new Date,o=c.timeout||6e3,a=setInterval(function(){if(+new Date-r>o)clearInterval(a),console.log("the ajaxSubmit is timeout!"),g.execFunc(c.error),h.remove();else{var t=d(i);t&&t.body.innerText&&(g.execFunc(c.success,t.body.innerText),clearInterval(a),h.remove())}},500)}),h.attr("src",/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"),m("body").append(h)}(r)},previewImg:function(){var t=m(opt.input),n=m(opt.target);t.on("change",function(){if(window.FileReader){var t=this.files[0],e=new FileReader;e.onload=function(t){var e=t.target||t.srcElement;n.css({background:'url("'+e.result+'") left center no-repeat',backgroundSize:"100% 100%"})},e.readAsDataURL(t)}else n[0].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+input.value+",sizingMethod=scale)";g.execFunc(opt.onChange,this)})},dialog:function(e){var t=function(){var t=m(this).closest(".mask-container");t.length&&(t.remove(),g.execFunc(e.onClose))},n={id:"w_win_dialog_"+ +new Date,title:"默认标题",width:400,height:300,modal:!0,toTop:!0,tools:[],buttons:[{iconCls:"icon-close",text:"关闭",handler:t}],content:"",btnAlign:"right"},i=g.extend(n,e);i.tools.push({iconCls:"icon-win-close",handler:t});var r="",o="";i.tools.forEach(function(t){r+='<span class="prompt-tool prompt-handler '+t.iconCls+'"></span>'}),i.buttons.forEach(function(t){o+='<a class="w-btn prompt-handler"><i class="iconfont '+(t.iconCls?t.iconCls:"iconfont-hide")+'"></i><span>'+t.text+"</span></a>"});var a='<div class="mask-container"><div class="mask-shadow"></div><div class="prompt-box" style="width:'+i.width+"px;height:"+i.height+"px;margin:-"+i.height/2+"px 0 0 -"+i.width/2+'px"><div class="prompt-header"><span>'+i.title+'</span><div class="prompt-toolbox">'+r+'</div></div><div class="prompt-body fit" id="'+i.id+'">'+i.content+'</div><div class="prompt-btnbox" style="text-align:'+i.btnAlign+'">'+o+"</div></div></div>",s=m(a);return m("body").append(s),s.on("click",function(t){var e=m(t.target).closest(".prompt-handler");if(e.length){var n=e.hasClass(".prompt-tool")?"tools":"buttons";i[n][e.index()].handler.call(e[0])}}),s},fullScreen:function(t){var e=(t=t||document.body).requestFullScreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||t.msRequestFullscreen;if(e)e.call(t);else if("undefined"!=typeof window.ActiveXObject)try{new ActiveXObject("WScript.Shell").SendKeys("{F11}")}catch(s){this.alert("请先将本站加入信任站点，并允许ActiveX控件交互，再进行全屏操作！")}},exitFullScreen:function(){var t=document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen;if(t)t.call(document);else if("undefined"!=typeof window.ActiveXObject)try{new ActiveXObject("WScript.Shell").SendKeys("{F11}")}catch(s){this.alert("请先将本站加入信任站点，并允许ActiveX控件交互，再进行全屏操作！")}},getCPU:function(){var t=navigator.userAgent.toLowerCase();return 0<=t.indexOf("win64")||0<=t.indexOf("wow64")?"x64":navigator.cpuClass},alert:function(t){var e={title:"提示",width:300,height:165,btnCenter:!0,buttons:[{iconCls:"icon-ok",text:"确定",handler:function(){m(this).closest(".mask-container").remove()}}],content:'<div class="prompt-content fit"><div class="prompt-icon"></div><div class="prompt-text">'+t+"</div></div>"};this.dialog(e)},scrollTop:function(t){if(t===undefined)return document.documentElement.scrollTop||document.body.scrollTop;t=t.toString().toNum(),document.body.scrollTop=t,document.documentElement.scrollTop=t},bindDrawRect:function(t){var e=m(t.target),n=e[0];e.on("mousedown",i),n.onselectstart=function(){return!1},n.drawRectOpt=t},unbindDrawRect:function(t){var e=m(t.target),n=e[0];e.off("mousedown",i),delete n.drawRectOpt},LoadImgList:r,inProcess:function(t){var e=m('<div class="mask-container text-center process-box"><div class="mask-shadow"></div><div class="process-text">'+(t=t||"&nbsp;")+'</div><div class="inline-m fit-height"></div></div>');m("body").append(e)},outProcess:function(){m(".process-box").remove()},Paging:o};e.exports=g.extend(g,a)},{"../lib/util":6,"./$":1}],3:[function(t,e,n){"use strict";e.exports={forEach:function(t){if(!this)throw new TypeError("this is null or not defined");if("function"!=typeof t)throw new TypeError(t+" is not a function");for(var e=1<arguments.length?arguments[1]:this,n=0;n<this.length;n++)t.call(e,this[n],n,this)},reduce:function(t,e){if(!this.length)return e;e=e===undefined?this[0]:t(e,this[0],0);for(var n=1;n<this.length;n++)e=t(e,this[n],n);return e},every:function(t){if(!this)throw new TypeError("this is null or not defined");if("function"!=typeof t)throw new TypeError(t+" is not a function");for(var e=1<arguments.length?arguments[1]:this,n=0;n<this.length;n++)if(!t.call(e,this[n],n,this))return!1;return!0},some:function(t){if(!this)throw new TypeError("this is null or not defined");if("function"!=typeof t)throw new TypeError(t+" is not a function");for(var e=1<arguments.length?arguments[1]:this,n=0;n<this.length;n++)if(t.call(e,this[n],n,this))return!0;return!1},map:function(t){if(!this)throw new TypeError("this is null or not defined");if("function"!=typeof t)throw new TypeError(t+" is not a function");for(var e=1<arguments.length?arguments[1]:this,n=[],i=0;i<this.length;i++)n.push(t.call(e,this[i],i,this));return n},filter:function(t){if(!this)throw new TypeError("this is null or not defined");if("function"!=typeof t)throw new TypeError(t+" is not a function");for(var e=1<arguments.length?arguments[1]:this,n=[],i=0;i<this.length;i++)t.call(e,this[i],i,this)&&n.push(this[i]);return n},indexOf:function(t){if(t!==undefined)for(var e=0;e<this.length;e++)if(this[e]===t)return e;return-1},indexOfFunc:function(t){for(var e=0;e<this.length;e++)if("function"==typeof t?t(this[e]):t===this[e])return e;return-1},remove:function(t){for(var e="function"==typeof t,n=0;n<this.length&&((e?!t(this[n],n):this[n]!==t)||(this.splice(n,1),n--,e));n++);return this},toFieldObject:function(i){var r={};return this.forEach(function(t,e){var n="function"==typeof i?i(t,e):t[i]||e;r[n]=t}),r},noRepeat:function(){for(var t=0;t<this.length;t++)for(var e=t+1;e<this.length;e++)this[t]===this[e]&&(this.splice(e,1),e--);return this}}},{}],4:[function(t,e,n){"use strict";function i(t,e,n){e=e||"Year";var i=new Date(t);return-1!==["FullYear","Date","Month","Hours","Minutes","Seconds"].indexOf(e)&&i["set"+e](i["get"+e]()+n.toString().toNum(0)),i}e.exports={toFormatString:function(t){t=t||"YYYY-MM-DD hh:mm:ss";var n={Y:this.getFullYear(),M:this.getMonth()+1,D:this.getDate(),h:this.getHours(),m:this.getMinutes(),s:this.getSeconds()},e=function(e){t=t.replace(new RegExp(e+"+","g"),function(t){return n[e].toString().addZero(t.length)})};for(var i in n)e(i);return t},diffDays:function(t){return i(this,"Date",t)},diffMonths:function(t){return i(this,"Month",t)},diffYears:function(t){return i(this,"FullYear",t)},diffHours:function(t){return i(this,"Hours",t)},diffMinutes:function(t){return i(this,"Minutes",t)},diffSeconds:function(t){return i(this,"Seconds",t)}}},{}],5:[function(t,e,n){"use strict";var u=/[^\x00-\xff]/;e.exports={isValid:function(t){return"function"==typeof t?t(this):t===this.toString()},charCount:function(t,e){if(arguments.length){for(var n=0,i=this.substr(0,e),r=0;r<i.length;r++)i.charAt(r)===t&&n++;return n}return this.split("").reduce(function(t,e){return t[e]?t[e]++:t[e]=1,t},{})},toJSON:function(){var t=0<arguments.length&&arguments[0]!==undefined?arguments[0]:"&",n=1<arguments.length&&arguments[1]!==undefined?arguments[1]:"=",i={};this.length&&this.split(t).forEach(function(t){if(t){var e=t.split(n);i[e[0].trim()]=e[1].trim()}});return i},trim:function(){return this.toString().replace(/^\s+|\s+$/g,"")},addSpaceForJsonStr:function(){var i=0<arguments.length&&arguments[0]!==undefined?arguments[0]:0;return new Array(i+1).join("\t")+this.replace(/[\[\]\{\},]/g,function(t){var e="",n="";return"]"===t||"}"===t?(i--,n="\n"+new Array(i+1).join("\t")):("["!==t&&"{"!==t||i++,e="\n"+new Array(i+1).join("\t")),n+t+e})},escapeHtml:function(){return this.replace(/[<>&\s"']/g,function(t){return"&#"+t.charCodeAt(0)+";"})},unescapeHtml:function(){return this.replace(/&#[^;]+;/g,function(t){var e=t.substr(2),n=void 0;return n="x"===e[0]?parseInt(e.substr(1,e.length-2),16):parseInt(e),String.fromCharCode(n)})},limitBytes:function(t,e,n){for(var i=3<arguments.length&&arguments[3]!==undefined?arguments[3]:"<br/>",r=0,o=this.toString(),a=o.length,s=0;s<a;s++){var c=o.charAt(s);if("\n"===c?r=(Math.floor(r/t)+1)*t:u.test(c)?r+=2:r++,e<=r){o=o.substr(0,s)+(!1===n?"":"...");break}}return o.replace(/\s?\n\s?/g,i)},countBytes:function(){for(var t=0,e=this.length,n=0;n<e;n++){var i=this.charAt(n);u.test(i)?t+=2:t++}return t},getLensAndLines:function(t){for(var e=this.length,n=0,i=0,r=1,o=0;o<e;o++){var a=this.charAt(o);if("\n"===a)r++,n<(i=0)&&(n=i);else{var s=u.test(a)?2:1;i+=s,t&&t<i&&(r++,i=s,n=t)}}return{x:Math.max(n,i),y:r}},getKeywords:function(t,e,n){t=t||0,e=e||[];var i=n?function(t){var e=n[t];return e||(n[t]=1),e}:function(t){return-1!==e.indexOf(t)},r=this.length,o="";if(r<=t)return e;for(var a=0,s=r-t;a<s;a++){o="";for(var c=0;c<=t;c++)o+=this.charAt(c+a);i[o]||e.push(o)}return this.getKeywords(t+1,e,n)},toNum:function(){var t=0<arguments.length&&arguments[0]!==undefined?arguments[0]:0,e=parseInt(this);return isNaN(e)?t:e},toFloatNum:function(){var t=0<arguments.length&&arguments[0]!==undefined?arguments[0]:0,e=parseFloat(this);return isNaN(e)?t:e},addZero:function(t){for(var e=this.length,n=this.toString(),i=e;i<t;i++)n="0"+n;return n},toUtf8HexString:function(){return this.split("").map(function(t){return function(t){var e=t.length;if(e<8)return"0"+t.addZero(7);var n=[],i=e%6;n.push(t.substr(0,i));for(var r=i;r<e;r+=6)n.push(t.substr(r,6));var o=n.length;return"1".repeat(o)+"0".repeat(8-o-i)+n.join(" 10")}(t.charCodeAt(0).toString(2)).split(" ").map(function(t){return parseInt(t,2).toString(16)}).join(" ")}).join(" ")},decodeUtf8ByHex:function(){return String.fromCharCode(parseInt(function(t){var e=t.length,n=Math.ceil(e/8);t.addZero(8*n);for(var i="",r=0;r<t.length;r+=8)i+=0===r?t.substr(n,8-n).replace(/^0+/,""):t.substr(r+2,6);return i}(parseInt(this.replace(/\s/g,""),16).toString(2)),2))},toCssValue:function(){var t=0<arguments.length&&arguments[0]!==undefined?arguments[0]:"px",e=parseInt(this);return-1!==this.indexOf("%")||isNaN(e)?this:e+t}}},{}],6:[function(m,y,t){(function(e){"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){var o=void 0;try{o=window}catch(a){o=e}v({Array:m("./object/Array"),Date:m("./object/Date"),String:m("./object/String")},function(t,e){var n=o[e];if(n)try{for(var i in t){var r=n.prototype;if(t.hasOwnProperty(i)&&t[i]!==undefined&&r[i]===undefined)try{Object.defineProperty(r,i,{value:t[i],enumerable:!1})}catch(a){r[i]=t[i]}}}catch(a){console.log(a)}})}();function c(t){return"[object Array]"===Object.prototype.toString.call(t)}function u(t){return"[object Number]"===Object.prototype.toString.call(t)}function f(t){return"[object Boolean]"===Object.prototype.toString.call(t)}function l(t){return"[object String]"===Object.prototype.toString.call(t)}function h(t){return t===undefined}function r(t){return"[object Function]"===Object.prototype.toString.call(t)}function d(t){return t&&(t.constructor===Object||t.constructor===undefined)}function p(){var t=!1,e=arguments[0],n=arguments.length,i=1;for(f(e)&&(t=e,e=arguments[i++]||{}),(h(e)||u(e)||l(e)||f(e))&&(e={});i<n;i++){var r=arguments[i];if(d(r)||c(r))for(var o in r)if(r.hasOwnProperty(o)){var a=e[o],s=r[o];if(t&&(d(s)||c(s))){s=p(!0,d(s)?d(a)?a:{}:c(a)?a:[],s)}s!==undefined&&(e[o]=s)}}return e}var n=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(t)}return e.prototype.init=function(t){p(this,{limit:1,interval:10,_runCount:0,list:[],result:[],getItem:function(){return this.list.shift()},check:function(t){return t!==undefined}},t)},e.prototype.start=function(){for(var t=this._runCount,e=this.limit,n=t;n<e;n++)this._runCount++,this._exec()},e.prototype._exec=function(){var e=this,t=this.getItem();s.call(this,this.next),t===undefined?(this._runCount--,0===this._runCount&&s.call(this,this.success,this.result)):this.check(t)?this.execFunc(t,function(t){e.result.push(t),setTimeout(function(){e._exec()},e.interval)}):this._exec()},e.prototype.addItem=function(t){var e;c(t)||(t=[t]),(e=this.list).push.apply(e,t)},e}();function i(t){this.state="pending",this.resolveList=[],this.rejectList=[],this.value=null,t(this.getFunc("resolve"),this.getFunc("reject"))}function s(){var t=arguments[0];if(r(t)){for(var e=[],n=1,i=arguments.length;n<i;n++)e.push(arguments[n]);return t.apply(this,e)}}function v(t,e,n){if(n=n||this,t)if(c(t))for(var i=0,r=t.length;i<r&&!1!==e.call(n,t[i],i);i++);else for(var o in t)if(t.hasOwnProperty(o)&&!1===e.call(n,t[o],o))break;return t}i.all=function(t){var o=t.length;return new i(function(n){var i=[],r=function(t,e){return function(t){i[e]=t,0===--o&&n(i)}};t.forEach(function(t,e){t.then(r(0,e),r(0,e))})})},i.prototype={then:function(t,e){var n={resolve:t,reject:e},i=this.state;return this.isPending()?(this.resolveList.push(t),this.rejectList.push(e)):n[i](this.value),this},getState:function(){return this.state},isPending:function(){return"pending"===this.state},getFunc:function(e){var n=this;return function(t){n.value=t,n.state=e,n.emit(e,t)}},emit:function(t,e){for(var n=this[t+"List"],i=void 0;i=n.shift();)s(i,e)}};var g={isFunction:r,isArray:c,isObject:function(t){return"[object Object]"===Object.prototype.toString.call(t)},isNumber:u,isString:l,isBoolean:f,isUndefined:h,isEmpty:function(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},isPlainObj:d,equal:function t(e,n){if((void 0===e?"undefined":a(e))===(void 0===n?"undefined":a(n))){if(d(e)||c(e)){var i={};for(var r in e)if(e.hasOwnProperty(r)){if(!t(e[r],n[r]))return!1;i[r]=1}for(var o in n)if(n.hasOwnProperty(o)&&!i[o]&&!t(e[o],n[o]))return!1;return!0}return e===n}return!1},Queue:n,execFunc:s,toArray:function(t){if(t instanceof Array)return t;for(var e=t.length,n=[],i=0;i<e;i++)n[i]=t[i];return n},Promise:i,extend:p,pinyin:void 0,forEach:v,clone:function o(e,n,t){var i=e;if(d(e)||c(e)){i=c(e)?[]:{};var r=function(t,e,n,i){var r=e[n];i&&(d(r)||c(r))&&(r=o(r,!0)),t[n]=r};if(f(n)||(t=n,n=!0),l(t)?t=[t]:c(t)||(t=[]),t.length)t.forEach(function(t){r(i,e,t,n)});else for(var a in e)e.hasOwnProperty(a)&&r(i,e,a,n)}return i},getValue:function(t,e,n){var i=t[e];return h(i)&&(t[e]=i=n),i}};y.exports=g}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./object/Array":3,"./object/Date":4,"./object/String":5}]},{},[2]);