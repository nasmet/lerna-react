!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("react"),require("react-router-dom"),require("wjh-keepalive")):"function"==typeof define&&define.amd?define(["react","react-router-dom","wjh-keepalive"],r):"object"==typeof exports?exports["wjh-routers"]=r(require("react"),require("react-router-dom"),require("wjh-keepalive")):e["wjh-routers"]=r(e.React,e.ReactRouterDOM,e.WjhKeepalive)}(self,(function(e,r,t){return(()=>{"use strict";var n={888:r=>{r.exports=e},621:e=>{e.exports=r},700:e=>{e.exports=t}},o={};function a(e){var r=o[e];if(void 0!==r)return r.exports;var t=o[e]={exports:{}};return n[e](t,t.exports,a),t.exports}a.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return a.d(r,{a:r}),r},a.d=(e,r)=>{for(var t in r)a.o(r,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},a.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var l={};return(()=>{a.r(l),a.d(l,{default:()=>p});var e=a(888),r=a.n(e),t=a(621),n=a(700),o=a.n(n);function c(){return(c=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var u=r().createElement("div",null,"loading......");function i(n){var a=n.Component,l=n.children,p=n.path,f=n.WrapperComponent,m=n.keepAlive;if(l&&l.length>0){var d=function(t){return r().createElement(a,t,r().createElement(e.Suspense,{fallback:u},l.map((function(e){return i(e)}))))},s={};return s["".concat(m?"children":"render")]=function(e){return f?m?r().createElement(o(),e,r().createElement(f,null,d(e))):r().createElement(f,null,d(e)):m?r().createElement(o(),e,d(e)):d(e)},r().createElement(t.Route,c({key:p,path:p},s))}return function(e){var n=e.redirect,a=e.path,l=e.Component,u=e.WrapperComponent,i=e.keepAlive;if(n)return r().createElement(t.Redirect,{key:a,exact:!0,from:a,to:n});var p={};return p["".concat(i?"children":"render")]=function(e){return u?i?r().createElement(o(),e,r().createElement(u,null,r().createElement(l,e))):r().createElement(u,null,r().createElement(l,e)):i?r().createElement(o(),e,r().createElement(l,e)):r().createElement(l,e)},r().createElement(t.Route,c({key:a,path:a},p))}(n)}function p(n){var o=n.routerConfig,a=n.loadingCmp;if(!o)throw new Error("routerConfig路由配置未传入");return r().createElement(e.Suspense,{fallback:a||u},r().createElement(t.Switch,null,o.map(i)))}})(),l})()}));