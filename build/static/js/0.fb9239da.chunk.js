(this["webpackJsonptemper-ionic"]=this["webpackJsonptemper-ionic"]||[]).push([[0],{249:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return a}));var r=n(33),i=(n(53),n(79)),a=function(t,e,n,a,c){var o=t.ownerDocument.defaultView;return Object(i.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/o.innerWidth;a(e)},onEnd:function(t){var e=t.deltaX,n=o.innerWidth,i=e/n,a=t.velocityX,u=n/2,s=a>=0&&(a>.2||t.deltaX>u),d=(s?1-i:i)*n,h=0;if(d>5){var p=d/Math.abs(a);h=Math.min(p,540)}c(s,i<=0?.01:Object(r.c)(0,i,.9999),h)}})}}}]);
//# sourceMappingURL=0.fb9239da.chunk.js.map