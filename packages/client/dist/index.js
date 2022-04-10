import{createMemo as e,createRoot as t,createRenderEffect as n,sharedConfig as o,enableHydration as r,createSignal as i,onCleanup as l,splitProps as f,untrack as s,createComponent as a}from"solid-js";new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline","allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"]),new Set(["innerHTML","textContent","innerText","children"]),new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]);function u(e,t,o,r){if(void 0===o||r||(r=[]),"function"!=typeof t)return d(e,t,r,o);n((n=>d(e,t(),n,o)),r)}function c(e,n,r={}){o.completed=globalThis._$HY.completed,o.events=globalThis._$HY.events,o.load=globalThis._$HY.load,o.gather=e=>g(n,e),o.registry=new Map,o.context={id:r.renderId||"",count:0},g(n,r.renderId);const i=function(e,n,o){let r;return t((t=>{r=t,n===document?e():u(n,e(),n.firstChild?null:void 0,o)})),()=>{r(),n.textContent=""}}(e,n,[...n.childNodes]);return o.context=null,i}function d(e,t,r,i,l){for(o.context&&!r&&(r=[...e.childNodes]);"function"==typeof r;)r=r();if(t===r)return r;const f=typeof t,s=void 0!==i;if(e=s&&r[0]&&r[0].parentNode||e,"string"===f||"number"===f){if(o.context)return r;if("number"===f&&(t=t.toString()),s){let n=r[0];n&&3===n.nodeType?n.data=t:n=document.createTextNode(t),r=m(e,r,i,n)}else r=""!==r&&"string"==typeof r?e.firstChild.data=t:e.textContent=t}else if(null==t||"boolean"===f){if(o.context)return r;r=m(e,r,i)}else{if("function"===f)return n((()=>{let n=t();for(;"function"==typeof n;)n=n();r=d(e,n,r,i)})),()=>r;if(Array.isArray(t)){const f=[];if(p(f,t,l))return n((()=>r=d(e,f,r,i,!0))),()=>r;if(o.context)for(let e=0;e<f.length;e++)if(f[e].parentNode)return r=f;if(0===f.length){if(r=m(e,r,i),s)return r}else Array.isArray(r)?0===r.length?h(e,f,i):function(e,t,n){let o=n.length,r=t.length,i=o,l=0,f=0,s=t[r-1].nextSibling,a=null;for(;l<r||f<i;)if(t[l]!==n[f]){for(;t[r-1]===n[i-1];)r--,i--;if(r===l){const t=i<o?f?n[f-1].nextSibling:n[i-f]:s;for(;f<i;)e.insertBefore(n[f++],t)}else if(i===f)for(;l<r;)a&&a.has(t[l])||t[l].remove(),l++;else if(t[l]===n[i-1]&&n[f]===t[r-1]){const o=t[--r].nextSibling;e.insertBefore(n[f++],t[l++].nextSibling),e.insertBefore(n[--i],o),t[r]=n[i]}else{if(!a){a=new Map;let e=f;for(;e<i;)a.set(n[e],e++)}const o=a.get(t[l]);if(null!=o)if(f<o&&o<i){let s,u=l,c=1;for(;++u<r&&u<i&&null!=(s=a.get(t[u]))&&s===o+c;)c++;if(c>o-f){const r=t[l];for(;f<o;)e.insertBefore(n[f++],r)}else e.replaceChild(n[f++],t[l++])}else l++;else t[l++].remove()}}else l++,f++}(e,r,f):(r&&m(e),h(e,f));r=f}else if(t instanceof Node){if(o.context&&t.parentNode)return r=s?[t]:t;if(Array.isArray(r)){if(s)return r=m(e,r,i,t);m(e,r,null,t)}else null!=r&&""!==r&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);r=t}}return r}function p(e,t,n){let o=!1;for(let r=0,i=t.length;r<i;r++){let i,l=t[r];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))o=p(e,l)||o;else if("string"==(i=typeof l))e.push(document.createTextNode(l));else if("function"===i)if(n){for(;"function"==typeof l;)l=l();o=p(e,Array.isArray(l)?l:[l])||o}else e.push(l),o=!0;else e.push(document.createTextNode(l.toString()))}return o}function h(e,t,n){for(let o=0,r=t.length;o<r;o++)e.insertBefore(t[o],n)}function m(e,t,n,o){if(void 0===n)return e.textContent="";const r=o||document.createTextNode("");if(t.length){let o=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(r!==l){const t=l.parentNode===e;o||i?t&&l.remove():t?e.replaceChild(r,l):e.insertBefore(r,n)}else o=!0}}else e.insertBefore(r,n);return[r]}function g(e,t){const n=e.querySelectorAll("*[data-hk]");for(let e=0;e<n.length;e++){const r=n[e],i=r.getAttribute("data-hk");t&&!i.startsWith(t)||o.registry.set(i,r)}}const y=(e,t)=>{const n={server:{port:t.port,debug:"development"===t.env,url:"/",tags:[]}};return((...e)=>(r(),c(...e)))((()=>a(e,{context:n})),document)};export{y as runClient};
