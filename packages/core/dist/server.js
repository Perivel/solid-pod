import{ssr as t,ssrHydrationKey as e,escape as r,isServer as n,createComponent as o,ssrSpread as a,mergeProps as s}from"solid-js/web";import{createSignal as l,onCleanup as i,getOwner as c,runWithOwner as u,createMemo as h,createContext as p,useContext as d,createComponent as f,on as g,useTransition as v,untrack as m,resetErrorBoundaries as w,createRenderEffect as y,createRoot as b,Show as P,splitProps as x,mergeProps as A}from"solid-js";import{MetaProvider as E,Meta as L}from"solid-meta";import{Color as R}from"@swindle/color";const C=["<div","><h1>Error: \x3c!--#--\x3e","\x3c!--/--\x3e</h1><p>","</p></div>"],j=n=>t(C,e(),r(n.error.message),r(n.error.stack)),K=["<div",">","</div>"],O=n=>t(K,e(),r(n.content));function U(t,e,r){return t.addEventListener(e,r),()=>t.removeEventListener(e,r)}function $(t,e){const r=document.getElementById(t);r?r.scrollIntoView():e&&window.scrollTo(0,0)}function k(t,e,r,n){let o=!1;const a=t=>"string"==typeof t?{value:t}:t,s=function([t,e],r,n){return[r?()=>r(t()):t,n?t=>e(n(t)):e]}(l(a(t()),{equals:(t,e)=>t.value===e.value}),void 0,(t=>(!o&&e(t),t)));return r&&i(r(((e=t())=>{o=!0,s[1](a(e)),o=!1}))),{signal:s,utils:n}}const B=/^(?:[a-z0-9]+:)?\/\//i,I=/^\/+|\/+$|\s+/g;function N(t){const e=t.replace(I,"");return e?e.startsWith("?")?e:"/"+e:""}function S(t,e,r){if(B.test(e))return;const n=N(t),o=r&&N(r);let a="";return a=o&&"/"!==e.charAt(0)?0!==o.toLowerCase().indexOf(n.toLowerCase())?n+o:o:n,a+N(e)||"/"}function V(t,e){return N(t).replace(/\/*(\*.*)?$/g,"")+N(e)}function W(t,e){const[r,n]=t.split("/*",2),o=r.split("/").filter(Boolean),a=o.length;return t=>{const r=t.split("/").filter(Boolean),s=r.length-a;if(s<0||s>0&&void 0===n&&!e)return null;const l={path:a?"":"/",params:{}};for(let t=0;t<a;t++){const e=o[t],n=r[t];if(":"===e[0])l.params[e.slice(1)]=n;else if(0!==e.localeCompare(n,void 0,{sensitivity:"base"}))return null;l.path+=`/${n}`}return n&&(l.params[n]=s?r.slice(-s).join("/"):""),l}}function q(t){const[e,r]=t.pattern.split("/*",2),n=e.split("/").filter(Boolean);return n.reduce(((t,e)=>t+(e.startsWith(":")?2:3)),n.length-(void 0===r?0:1))}function F(t){const e=new Map,r=c();return new Proxy({},{get:(n,o)=>(e.has(o)||u(r,(()=>e.set(o,h((()=>t()[o]))))),e.get(o)()),getOwnPropertyDescriptor:()=>({enumerable:!0,configurable:!0}),ownKeys:()=>Reflect.ownKeys(t())})}const D=p(),M=p(),T=()=>function(t,e){if(null==t)throw new Error(e);return t}(d(D),"Make sure your app is wrapped in a <Router />");let z;const G=()=>z||d(M)||T().base;function H(t,e="",r){const{path:n,component:o,data:a,children:s}=t,l=!s||Array.isArray(s)&&!s.length,i=V(e,n),c=l?i:i.split("/*",1)[0];return{originalPath:n,pattern:c,element:o?()=>f(o,{}):()=>{const{element:e}=t;return void 0===e&&r?f(r,{}):e},preload:t.component?o.preload:t.preload,data:a,matcher:W(c,!l)}}function J(t,e=0){return{routes:t,score:1e4*q(t[t.length-1])-e,matcher(e){const r=[];for(let n=t.length-1;n>=0;n--){const o=t[n],a=o.matcher(e);if(!a)return null;r.unshift({...a,route:o})}return r}}}function Q(t,e="",r,n=[],o=[]){const a=Array.isArray(t)?t:[t];for(let t=0,s=a.length;t<s;t++){const s=a[t];if(s&&"object"==typeof s&&s.hasOwnProperty("path")){const t=H(s,e,r);if(n.push(t),s.children)Q(s.children,t.pattern,r,n,o);else{const t=J([...n],o.length);o.push(t)}n.pop()}}return n.length?o:o.sort(((t,e)=>e.score-t.score))}function X(t,e="",r,o){const{signal:[a,s],utils:c={}}=function(t){return t?Array.isArray(t)?{signal:t}:t:{signal:l({value:""})}}(t),u=c.parsePath||(t=>t),p=c.renderPath||(t=>t),f=S("",e),b=n&&o?Object.assign(o,{matches:[],url:void 0}):void 0;if(void 0===f)throw new Error(`${f} is not a valid base path`);f&&!a().value&&s({value:f,replace:!0,scroll:!1});const[P,x]=v(),[A,E]=l(a().value),[L,R]=l(a().state),C=function(t,e){const r=new URL("http://sar"),n=h((e=>{const n=t();try{return new URL(n,r)}catch(t){return console.error(`Invalid path ${n}`),e}}),r,{equals:(t,e)=>t.href===e.href}),o=h((()=>n().pathname)),a=h((()=>n().search.slice(1))),s=h((()=>n().hash.slice(1))),l=h((()=>""));return{get pathname(){return o()},get search(){return a()},get hash(){return s()},get state(){return e()},get key(){return l()},query:F(g(a,(()=>function(t){const e={};return t.searchParams.forEach(((t,r)=>{e[r]=t})),e}(n()))))}}(A,L),j=[],K={pattern:f,params:{},path:()=>f,outlet:()=>null,resolvePath:t=>S(f,t)};if(r)try{z=K,K.data=r({data:void 0,params:{},location:C,navigate:U(K)})}finally{z=void 0}function O(t,e,r){m((()=>{if("number"==typeof e)return void(e&&(c.go?c.go(e):console.warn("Router integration does not support relative routing")));const{replace:o,resolve:a,scroll:l,state:i}={replace:!1,resolve:!0,scroll:!0,...r},u=a?t.resolvePath(e):S("",e);if(void 0===u)throw new Error(`Path '${e}' is not a routable path`);if(j.length>=100)throw new Error("Too many redirects");const h=A();if(u!==h||i!==L())if(n)b&&(b.url=u),s({value:u,replace:o,scroll:l,state:i});else{const t=j.push({value:h,replace:o,scroll:l,state:L});x((()=>{E(u),R(i),w()})).then((()=>{j.length===t&&function(t){const e=j[0];e&&(t.value===e.value&&t.state===e.state||s({...t,replace:e.replace,scroll:e.scroll}),j.length=0)}({value:u,state:i})}))}}))}function U(t){return t=t||d(M)||K,(e,r)=>O(t,e,r)}if(y((()=>{const{value:t,state:e}=a();t!==m(A)&&x((()=>{E(t),R(e)}))})),!n){function $(t){if(t.defaultPrevented||0!==t.button||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)return;const e=t.composedPath().find((t=>t instanceof Node&&"A"===t.nodeName.toUpperCase()));if(!e)return;const r=e instanceof SVGAElement,n=r?e.href.baseVal:e.href;if((r?e.target.baseVal:e.target)||!n&&!e.hasAttribute("state"))return;const o=(e.getAttribute("rel")||"").split(/\s+/);if(e.hasAttribute("download")||o&&o.includes("external"))return;const a=r?new URL(n,document.baseURI):new URL(n);if(a.origin!==window.location.origin||f&&a.pathname&&!a.pathname.toLowerCase().startsWith(f.toLowerCase()))return;const s=u(a.pathname+a.search+a.hash),l=e.getAttribute("state");t.preventDefault(),O(K,s,{resolve:!1,replace:e.hasAttribute("replace"),scroll:!e.hasAttribute("noscroll"),state:l&&JSON.parse(l)})}document.addEventListener("click",$),i((()=>document.removeEventListener("click",$)))}return{base:K,out:b,location:C,isRouting:P,renderPath:p,parsePath:u,navigatorFactory:U}}function Y(t,e,r,n){const{base:o,location:a,navigatorFactory:s}=t,{pattern:l,element:i,preload:c,data:u}=n().route,p=h((()=>n().path)),d=F((()=>n().params));c&&c();const f={parent:e,pattern:l,get child(){return r()},path:p,params:d,data:e.data,outlet:i,resolvePath:t=>S(o.path(),t,p())};if(u)try{z=f,f.data=u({data:e.data,params:d,location:a,navigate:s(f)})}finally{z=void 0}return f}const Z=t=>{const{source:e,url:r,base:a,data:s,out:l}=t;var i;const c=X(e||(n?(i={value:r||""},{signal:[()=>i,t=>Object.assign(i,t)]}):k((()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state})),(({value:t,replace:e,scroll:r,state:n})=>{e?window.history.replaceState(n,"",t):window.history.pushState(n,"",t),$(window.location.hash.slice(1),r)}),(t=>U(window,"popstate",(()=>t()))),{go:t=>window.history.go(t)})),a,s,l);return o(D.Provider,{value:c,get children(){return t.children}})},_=t=>{const e=T(),r=G(),n=h((()=>Q(t.children,V(r.pattern,t.base||""),tt))),a=h((()=>function(t,e){for(let r=0,n=t.length;r<n;r++){const n=t[r].matcher(e);if(n)return n}return[]}(n(),e.location.pathname)));e.out&&e.out.matches.push(a().map((({route:t,path:e,params:r})=>({originalPath:t.originalPath,pattern:t.pattern,path:e,params:r}))));const s=[];let l;const i=h(g(a,((t,n,o)=>{let c=n&&t.length===n.length;const u=[];for(let l=0,h=t.length;l<h;l++){const h=n&&n[l],p=t[l];o&&h&&p.route.pattern===h.route.pattern?u[l]=o[l]:(c=!1,s[l]&&s[l](),b((t=>{s[l]=t,u[l]=Y(e,u[l-1]||r,(()=>i()[l+1]),(()=>a()[l]))})))}return s.splice(t.length).forEach((t=>t())),o&&c?o:(l=u[0],u)})));return o(P,{get when(){return i()&&l},children:t=>o(M.Provider,{value:t,get children(){return t.outlet()}})})},tt=()=>{const t=G();return o(P,{get when(){return t.child},children:t=>o(M.Provider,{value:t,get children(){return t.outlet()}})})};const et=t=>{let e=t.routes?t.routes:[];const r=t.context.server.url;let n="",a=null;try{s=t.themeColor,n=void 0===s?R.White().hex().value():s instanceof R?s.hex().value():R.FromHex(s).hex().value()}catch(t){a=t}var s;(t=>t.some((t=>"/"===t.path.trim())))(e)||(null!=t.index?e.push({path:"/",component:()=>t.index}):a=new Error("No index route defined")),a&&(e=[{path:"/",component:()=>o(j,{error:a})}]);const l=((t,e)=>()=>o(_,{base:e,children:t}))(e),i=t.layout&&!a?t.layout:O;return o(E,{get tags(){return t.context.server.tags},get children(){return[o(L,{name:"theme-color",content:n}),o(Z,{url:r,get children(){return o(i,{get content(){return o(l,{})}})}})]}})};export{O as DefaultLayout,j as SolidusError,et as View};
