import { runServer } from '@solidusjs/server';
import { View } from '@solidusjs/core';
import { createComponent } from 'solid-js';

var configuration = {
  title: "SolidusJS",
  charset: 'utf-8',
  lang: 'en',
  env: 'production',
  host: 'localhost',
  port: 5000,
  static: './src/assets',
  ssr: 'async'
};

function ssr(template, ...nodes) {}
function ssrHydrationKey() {}
function escape(html) {}

var e = [],
    t = [];

function n(n, r) {
  if (n && "undefined" != typeof document) {
    var a,
        s = !0 === r.prepend ? "prepend" : "append",
        d = !0 === r.singleTag,
        i = "string" == typeof r.container ? document.querySelector(r.container) : document.getElementsByTagName("head")[0];

    if (d) {
      var u = e.indexOf(i);
      -1 === u && (u = e.push(i) - 1, t[u] = {}), a = t[u] && t[u][s] ? t[u][s] : t[u][s] = c();
    } else a = c();

    65279 === n.charCodeAt(0) && (n = n.substring(1)), a.styleSheet ? a.styleSheet.cssText += n : a.appendChild(document.createTextNode(n));
  }

  function c() {
    var e = document.createElement("style");
    if (e.setAttribute("type", "text/css"), r.attributes) for (var t = Object.keys(r.attributes), n = 0; n < t.length; n++) e.setAttribute(t[n], r.attributes[t[n]]);
    var a = "prepend" === s ? "afterbegin" : "beforeend";
    return i.insertAdjacentElement(a, e), e;
  }
}

var css = ".App {\n  text-align: center;\n}\n\n.logo {\n  animation: logo-spin infinite 20s linear;\n  height: 40vmin;\n  pointer-events: none;\n}\n\n.header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.link {\n  color: #b318f0;\n}\n\n@keyframes logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n";
n(css,{});

const _tmpl$ = ["<div", " class=\"", "\"><header class=\"", "\"><img src=\"", "\" class=\"", "\" alt=\"logo\"><p>Edit <code>src/App.tsx</code> and save to reload.</p><a class=\"", "\" href=\"https://github.com/solidjs/solid\" target=\"_blank\" rel=\"noopener noreferrer\">Learn Solid</a></header></div>"];

const App = () => {
  return ssr(_tmpl$, ssrHydrationKey(), escape(), escape(), escape(), escape(), escape());
};

const MyApp = props => {
  return createComponent(View, {
    get context() {
      return props.context;
    },

    get index() {
      return createComponent(App, {});
    },

    routes: [{
      path: '/about',
      component: App
    }]
  });
};

runServer(MyApp, configuration, []);
