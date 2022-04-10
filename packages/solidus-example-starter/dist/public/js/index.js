import { runClient } from '@solidusjs/client';
import { View } from '@solidusjs/core';

const sharedConfig = {};
let runEffects = runQueue;
const NOTPENDING = {};
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let Pending = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;

function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}

function batch(fn) {
  if (Pending) return fn();
  let result;
  const q = Pending = [];

  try {
    result = fn();
  } finally {
    Pending = null;
  }

  runUpdates(() => {
    for (let i = 0; i < q.length; i += 1) {
      const data = q[i];

      if (data.pending !== NOTPENDING) {
        const pending = data.pending;
        data.pending = NOTPENDING;
        writeSignal(data, pending);
      }
    }
  }, false);
  return result;
}

function untrack(fn) {
  let result;
  result = fn();
  return result;
}

function writeSignal(node, value, isComp) {
  if (node.comparator) {
    if (node.comparator(node.value, value)) return value;
  }

  if (Pending) {
    if (node.pending === NOTPENDING) Pending.push(node);
    node.pending = value;
    return value;
  }

  let TransitionRunning = false;

  node.value = value;

  if (node.observers && node.observers.length) {
    runUpdates(() => {
      for (let i = 0; i < node.observers.length; i += 1) {
        const o = node.observers[i];
        if (TransitionRunning && Transition.disposed.has(o)) ;

        if (TransitionRunning && !o.tState || !TransitionRunning && !o.state) {
          if (o.pure) Updates.push(o);else Effects.push(o);
          if (o.observers) markUpstream(o);
        }

        if (TransitionRunning) ;else o.state = STALE;
      }

      if (Updates.length > 10e5) {
        Updates = [];
        if (false) ;
        throw new Error();
      }
    }, false);
  }

  return value;
}

function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const owner = Owner,
        time = ExecCount;
  Owner = node;
  runComputation(node, node.value, time);
  Owner = owner;
}

function runComputation(node, value, time) {
  let nextValue;

  try {
    nextValue = node.fn(value);
  } catch (err) {
    handleError(err);
  }

  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.observers && node.observers.length) {
      writeSignal(node, nextValue);
    } else node.value = nextValue;

    node.updatedAt = time;
  }
}

function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state: state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: null,
    pure
  };

  if (Owner === null) ;else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
    }
  }

  return c;
}

function runTop(node) {
  const runningTransition = Transition ;
  if (node.state === 0 || runningTransition ) return;
  if (node.state === PENDING || runningTransition ) return lookDownstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];

  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state || runningTransition ) ancestors.push(node);
  }

  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];

    if (node.state === STALE || runningTransition ) {
      updateComputation(node);
    } else if (node.state === PENDING || runningTransition ) {
      const updates = Updates;
      Updates = null;
      lookDownstream(node, ancestors[0]);
      Updates = updates;
    }
  }
}

function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;else Effects = [];
  ExecCount++;

  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    completeUpdates(wait);
  }
}

function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }

  if (wait) return;

  if (Effects.length) batch(() => {
    runEffects(Effects);
    Effects = null;
  });else {
    Effects = null;
  }
}

function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}

function lookDownstream(node, ignore) {
  const runningTransition = Transition ;
  node.state = 0;

  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];

    if (source.sources) {
      if (source.state === STALE || runningTransition ) {
        if (source !== ignore) runTop(source);
      } else if (source.state === PENDING || runningTransition ) lookDownstream(source, ignore);
    }
  }
}

function markUpstream(node) {
  const runningTransition = Transition ;

  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];

    if (!o.state || runningTransition ) {
      o.state = PENDING;
      if (o.pure) Updates.push(o);else Effects.push(o);
      o.observers && markUpstream(o);
    }
  }
}

function cleanNode(node) {
  let i;

  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(),
            index = node.sourceSlots.pop(),
            obs = source.observers;

      if (obs && obs.length) {
        const n = obs.pop(),
              s = source.observerSlots.pop();

        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }

  if (node.owned) {
    for (i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);

    node.owned = null;
  }

  if (node.cleanups) {
    for (i = 0; i < node.cleanups.length; i++) node.cleanups[i]();

    node.cleanups = null;
  }

  node.state = 0;
  node.context = null;
}

function handleError(err) {
  throw err;
}

function createComponent(Comp, props) {

  return untrack(() => Comp(props));
}

function template(html, check, isSVG) {
  const t = document.createElement("template");
  t.innerHTML = html;
  let node = t.content.firstChild;
  if (isSVG) node = node.firstChild;
  return node;
}

function setAttribute(node, name, value) {
  if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
}

function getNextElement(template) {
  let node, key;

  if (!sharedConfig.context || !(node = sharedConfig.registry.get(key = getHydrationKey()))) {
    return template.cloneNode(true);
  }

  if (sharedConfig.completed) sharedConfig.completed.add(node);
  sharedConfig.registry.delete(key);
  return node;
}

function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return `${hydrate.id}${hydrate.count++}`;
}

var img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 166 155.3'%3e%3cpath d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z' fill='%2376b3e1'/%3e%3clinearGradient id='a' gradientUnits='userSpaceOnUse' x1='27.5' y1='3' x2='152' y2='63.5'%3e%3cstop offset='.1' stop-color='%2376b3e1'/%3e%3cstop offset='.3' stop-color='%23dcf2fd'/%3e%3cstop offset='1' stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z' opacity='.3' fill='url(%23a)'/%3e%3cpath d='M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z' fill='%23518ac8'/%3e%3clinearGradient id='b' gradientUnits='userSpaceOnUse' x1='95.8' y1='32.6' x2='74' y2='105.2'%3e%3cstop offset='0' stop-color='%2376b3e1'/%3e%3cstop offset='.5' stop-color='%234377bb'/%3e%3cstop offset='1' stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath d='M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z' opacity='.3' fill='url(%23b)'/%3e%3clinearGradient id='c' gradientUnits='userSpaceOnUse' x1='18.4' y1='64.2' x2='144.3' y2='149.8'%3e%3cstop offset='0' stop-color='%23315aa9'/%3e%3cstop offset='.5' stop-color='%23518ac8'/%3e%3cstop offset='1' stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath d='M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z' fill='url(%23c)'/%3e%3clinearGradient id='d' gradientUnits='userSpaceOnUse' x1='75.2' y1='74.5' x2='24.4' y2='260.8'%3e%3cstop offset='0' stop-color='%234377bb'/%3e%3cstop offset='.5' stop-color='%231a336b'/%3e%3cstop offset='1' stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath d='M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z' fill='url(%23d)'/%3e%3c/svg%3e";

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

const _tmpl$ = /*#__PURE__*/template(`<div><header><img alt="logo"><p>Edit <code>src/App.tsx</code> and save to reload.</p><a href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">Learn Solid</a></header></div>`);

const App = () => {
  return (() => {
    const _el$ = getNextElement(_tmpl$),
          _el$2 = _el$.firstChild,
          _el$3 = _el$2.firstChild,
          _el$4 = _el$3.nextSibling,
          _el$5 = _el$4.nextSibling;

    setAttribute(_el$3, "src", img);

    createRenderEffect(_p$ => {
      const _v$ = css.App,
            _v$2 = css.header,
            _v$3 = css.logo,
            _v$4 = css.link;
      _v$ !== _p$._v$ && (_el$.className = _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && (_el$2.className = _p$._v$2 = _v$2);
      _v$3 !== _p$._v$3 && (_el$3.className = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && (_el$5.className = _p$._v$4 = _v$4);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });

    return _el$;
  })();
};

const MyApp = props => {
  return createComponent(View, {
    get context() {
      return props.context;
    },

    get index() {
      return createComponent(App, {});
    }

  });
};

var config = {
  title: "SolidusJS",
  charset: 'utf-8',
  lang: 'en',
  env: 'production',
  host: 'localhost',
  port: 5000,
  static: './src/assets',
  ssr: 'async'
};

runClient(MyApp, config);
