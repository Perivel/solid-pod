import{renderToStream as t,createComponent as r,renderToStringAsync as n,renderToString as e}from"solid-js/web";import{DateTime as s}from"@swindle/core";import o from"express";function i(t,r){for(var n=0,e=t.length-1;e>=0;e--){var s=t[e];"."===s?t.splice(e,1):".."===s?(t.splice(e,1),n++):n&&(t.splice(e,1),n--)}if(r)for(;n--;n)t.unshift("..");return t}function u(t){var r=c(t),n="/"===a(t,-1);return(t=i(p(t.split("/"),(function(t){return!!t})),!r).join("/"))||r||(t="."),t&&n&&(t+="/"),(r?"/":"")+t}function c(t){return"/"===t.charAt(0)}function l(){var t=Array.prototype.slice.call(arguments,0);return u(p(t,(function(t,r){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))}function p(t,r){if(t.filter)return t.filter(r);for(var n=[],e=0;e<t.length;e++)r(t[e],e,t)&&n.push(t[e]);return n}var a="b"==="ab".substr(-1)?function(t,r,n){return t.substr(r,n)}:function(t,r,n){return r<0&&(r=t.length+r),t.substr(r,n)};const f=(i,u,c=[])=>{const p=o();p.use(...c),p.use(o.static(l(__dirname,"assets"))),p.get("*",(async(s,o)=>{const c={server:{debug:"development"===u.env,port:u.port,url:s.url}};if("stream"===u.ssr)t((()=>r(i,{context:c}))).pipe(o);else try{let t;t="async"===u.ssr?await n((()=>r(i,{context:c}))):e((()=>r(i,{context:c}))),o.status(200).send(t)}catch(t){o.status(500).send("Server Error")}})),console.log("Starting app"),p.listen(u.port,(()=>{console.log(`[${s.Now().toString()}]: Application successfully running on ${u.host}:${u.port}`)}))};export{f as runServer};