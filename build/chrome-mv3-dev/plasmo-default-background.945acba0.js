// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gdFJy":[function(require,module,exports) {
var m = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var y = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var w = new Set(m), _ = (e)=>w.has(e), W = m.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || y().VERBOSE === "true", I = g();
var f = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var v = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), b = (...e)=>f("\uD83D\uDD35 INFO", ...e), h = (...e)=>f("\uD83D\uDFE0 WARN", ...e), B = 0, l = (...e)=>g() && f(`\u{1F7E1} ${B++}`, ...e);
var r = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/home/achraf/Projects/tooling/sparql-browser-extention/node_modules/.pnpm/@plasmohq+parcel-transformer-manifest@0.13.3/node_modules/@plasmohq/parcel-transformer-manifest/runtime/plasmo-default-background.ts",
    "bundleId": "3fabf76f945acba0",
    "envHash": "210281caf8d4160d",
    "verbose": "false",
    "secure": false,
    "serverPort": 37827
};
module.bundle.HMR_BUNDLE_ID = r.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: r.verbose
    }
};
var C = module.bundle.Module;
function M(e) {
    C.call(this, e), this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData = void 0;
}
module.bundle.Module = M;
var i = globalThis.chrome || globalThis.browser || null;
function u() {
    return r.host || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function d() {
    return r.port || location.port;
}
var H = `${r.secure ? "https" : "http"}://${u()}:${d()}/`;
async function x(e = 1470) {
    for(;;)try {
        await fetch(H);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (i.runtime.getManifest().manifest_version === 3) {
    let e = i.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let n = new URL(decodeURIComponent(o.slice(e.length)));
            n.hostname === r.host && n.port === `${r.port}` ? (n.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(n).then((a)=>new Response(a.body, {
                    headers: {
                        "Content-Type": a.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function R(e, t) {
    let { modules: o  } = e;
    return o ? !!o[t] : !1;
}
function S(e = d()) {
    let t = u(), o = r.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws";
    return i?.runtime?.lastError && globalThis?.location?.reload?.(), `${o}://${t}:${e}/`;
}
function k(e) {
    typeof e.message == "string" && v("[plasmo/parcel-runtime]: " + e.message);
}
function E(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(S(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        if (JSON.parse(o.data).type === "build_ready") {
            await e();
            return;
        }
    }), t.addEventListener("error", k), t;
}
function L(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(S());
    return t.addEventListener("message", async function(o) {
        let n = JSON.parse(o.data);
        if (n.type === "update" && await e(n.assets), n.type === "error") for (let a of n.diagnostics.ansi){
            let c = a.codeframe || a.stack;
            h("[plasmo/parcel-runtime]: " + a.message + `
` + c + `

` + a.hints.join(`
`));
        }
    }), t.addEventListener("error", k), t.addEventListener("open", ()=>{
        b(`[plasmo/parcel-runtime]: Connected to HMR server for ${r.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        h(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${r.entryFilePath}`);
    }), t;
}
var T = module.bundle.parent, s = {
    buildReady: !1,
    hmrUpdated: !1,
    csCodeChanged: !1,
    ports: new Set
};
function p(e = !1) {
    if (e || s.buildReady && (s.hmrUpdated || s.csCodeChanged)) {
        l("BGSW Runtime - reloading"), i.runtime.reload();
        for (let t of s.ports)t.postMessage({
            __plasmo_cs_reload__: !0
        });
    }
}
if (!T || !T.isParcelRequire) {
    let e1 = L(async (t)=>{
        l("BGSW Runtime - On HMR Update"), s.hmrUpdated ||= t.filter((n)=>n.envHash === r.envHash).some((n)=>R(module.bundle, n.id));
        let o = t.find((n)=>n.type === "json");
        if (o) {
            let n = new Set(t.map((c)=>c.id)), a = Object.values(o.depsByBundle).map((c)=>Object.values(c)).flat();
            s.hmrUpdated ||= a.every((c)=>n.has(c));
        }
        p();
    });
    e1.addEventListener("open", ()=>{
        let t = setInterval(()=>e1.send("ping"), 24e3);
        e1.addEventListener("close", ()=>clearInterval(t));
    }), e1.addEventListener("close", async ()=>{
        await x(), p(!0);
    });
}
E(async ()=>{
    l("BGSW Runtime - On Build Repackaged"), s.buildReady ||= !0, p();
});
i.runtime.onConnect.addListener(function(e) {
    e.name.startsWith("__plasmo_runtime_script_") && (s.ports.add(e), e.onDisconnect.addListener(()=>{
        s.ports.delete(e);
    }), e.onMessage.addListener(function(t) {
        t.__plasmo_cs_changed__ && (l("BGSW Runtime - On CS code changed"), s.csCodeChanged ||= !0, p());
    }));
});
i.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (l("BGSW Runtime - On top-level code changed"), p(!0)), !0;
});

},{}],"fIhkU":[function(require,module,exports) {

},{}]},["gdFJy","fIhkU"], "fIhkU", "parcelRequire6b5c")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQUUsSUFBRyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUM7UUFBQyxFQUFFLHFCQUFxQixJQUFHLENBQUEsRUFBRSxzQ0FBcUMsRUFBRSxhQUFhLEtBQUcsQ0FBQyxHQUFFLEdBQUcsQUFBRDtJQUFFLEVBQUUsQUFBRDtBQUFFO0FBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQztJQUFDLE9BQU8sRUFBRSxzQkFBc0IsSUFBRyxDQUFBLEVBQUUsNkNBQTRDLEVBQUUsQ0FBQyxFQUFFLEFBQUQsR0FBRyxDQUFDLENBQUM7QUFBQSIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzLy5wbnBtL0BwbGFzbW9ocStwYXJjZWwtcnVudGltZUAwLjE1LjUvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcnVudGltZS9kaXN0L3J1bnRpbWUtMjc0OGM5NzkyZDdmM2RlMy5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXRyYW5zZm9ybWVyLW1hbmlmZXN0QDAuMTMuMy9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC10cmFuc2Zvcm1lci1tYW5pZmVzdC9ydW50aW1lL3BsYXNtby1kZWZhdWx0LWJhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG09dHlwZW9mIGdsb2JhbFRoaXMucHJvY2VzczxcInVcIj9nbG9iYWxUaGlzLnByb2Nlc3MuYXJndjpbXTt2YXIgeT0oKT0+dHlwZW9mIGdsb2JhbFRoaXMucHJvY2VzczxcInVcIj9nbG9iYWxUaGlzLnByb2Nlc3MuZW52Ont9O3ZhciB3PW5ldyBTZXQobSksXz1lPT53LmhhcyhlKSxXPW0uZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgVT1fKFwiLS1kcnktcnVuXCIpLGc9KCk9Pl8oXCItLXZlcmJvc2VcIil8fHkoKS5WRVJCT1NFPT09XCJ0cnVlXCIsST1nKCk7dmFyIGY9KGU9XCJcIiwuLi50KT0+Y29uc29sZS5sb2coZS5wYWRFbmQoOSksXCJ8XCIsLi4udCk7dmFyIHY9KC4uLmUpPT5jb25zb2xlLmVycm9yKFwiXFx1ezFGNTM0fSBFUlJPUlwiLnBhZEVuZCg5KSxcInxcIiwuLi5lKSxiPSguLi5lKT0+ZihcIlxcdXsxRjUzNX0gSU5GT1wiLC4uLmUpLGg9KC4uLmUpPT5mKFwiXFx1ezFGN0UwfSBXQVJOXCIsLi4uZSksQj0wLGw9KC4uLmUpPT5nKCkmJmYoYFxcdXsxRjdFMX0gJHtCKyt9YCwuLi5lKTt2YXIgcj17XCJpc0NvbnRlbnRTY3JpcHRcIjpmYWxzZSxcImlzQmFja2dyb3VuZFwiOnRydWUsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcImJhY2tncm91bmQtc2VydmljZS1ydW50aW1lXCJdLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIi9ob21lL2FjaHJhZi9Qcm9qZWN0cy90b29saW5nL3NwYXJxbC1icm93c2VyLWV4dGVudGlvbi9ub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC10cmFuc2Zvcm1lci1tYW5pZmVzdEAwLjEzLjMvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtdHJhbnNmb3JtZXItbWFuaWZlc3QvcnVudGltZS9wbGFzbW8tZGVmYXVsdC1iYWNrZ3JvdW5kLnRzXCIsXCJidW5kbGVJZFwiOlwiM2ZhYmY3NmY5NDVhY2JhMFwiLFwiZW52SGFzaFwiOlwiMjEwMjgxY2FmOGQ0MTYwZFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjM3ODI3fTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9ci5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOnIudmVyYm9zZX19O3ZhciBDPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIE0oZSl7Qy5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1NO3ZhciBpPWdsb2JhbFRoaXMuY2hyb21lfHxnbG9iYWxUaGlzLmJyb3dzZXJ8fG51bGw7ZnVuY3Rpb24gdSgpe3JldHVybiByLmhvc3R8fChsb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIil9ZnVuY3Rpb24gZCgpe3JldHVybiByLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIEg9YCR7ci5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7dSgpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiB4KGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChIKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihpLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9aS5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBuPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7bi5ob3N0bmFtZT09PXIuaG9zdCYmbi5wb3J0PT09YCR7ci5wb3J0fWA/KG4uc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gobikudGhlbihhPT5uZXcgUmVzcG9uc2UoYS5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOmEuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBSKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gUyhlPWQoKSl7bGV0IHQ9dSgpLG89ci5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCI7cmV0dXJuIGk/LnJ1bnRpbWU/Lmxhc3RFcnJvciYmZ2xvYmFsVGhpcz8ubG9jYXRpb24/LnJlbG9hZD8uKCksYCR7b306Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBrKGUpe3R5cGVvZiBlLm1lc3NhZ2U9PVwic3RyaW5nXCImJnYoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrZS5tZXNzYWdlKX1mdW5jdGlvbiBFKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChTKE51bWJlcihkKCkpKzEpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2lmKEpTT04ucGFyc2Uoby5kYXRhKS50eXBlPT09XCJidWlsZF9yZWFkeVwiKXthd2FpdCBlKCk7cmV0dXJufX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsayksdH1mdW5jdGlvbiBMKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChTKCkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IG49SlNPTi5wYXJzZShvLmRhdGEpO2lmKG4udHlwZT09PVwidXBkYXRlXCImJmF3YWl0IGUobi5hc3NldHMpLG4udHlwZT09PVwiZXJyb3JcIilmb3IobGV0IGEgb2Ygbi5kaWFnbm9zdGljcy5hbnNpKXtsZXQgYz1hLmNvZGVmcmFtZXx8YS5zdGFjaztoKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2EubWVzc2FnZStgXG5gK2MrYFxuXG5gK2EuaGludHMuam9pbihgXG5gKSl9fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixrKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntiKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7ci5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e2goYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtyLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciBUPW1vZHVsZS5idW5kbGUucGFyZW50LHM9e2J1aWxkUmVhZHk6ITEsaG1yVXBkYXRlZDohMSxjc0NvZGVDaGFuZ2VkOiExLHBvcnRzOm5ldyBTZXR9O2Z1bmN0aW9uIHAoZT0hMSl7aWYoZXx8cy5idWlsZFJlYWR5JiYocy5obXJVcGRhdGVkfHxzLmNzQ29kZUNoYW5nZWQpKXtsKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nXCIpLGkucnVudGltZS5yZWxvYWQoKTtmb3IobGV0IHQgb2Ygcy5wb3J0cyl0LnBvc3RNZXNzYWdlKHtfX3BsYXNtb19jc19yZWxvYWRfXzohMH0pfX1pZighVHx8IVQuaXNQYXJjZWxSZXF1aXJlKXtsZXQgZT1MKGFzeW5jIHQ9PntsKFwiQkdTVyBSdW50aW1lIC0gT24gSE1SIFVwZGF0ZVwiKSxzLmhtclVwZGF0ZWR8fD10LmZpbHRlcihuPT5uLmVudkhhc2g9PT1yLmVudkhhc2gpLnNvbWUobj0+Uihtb2R1bGUuYnVuZGxlLG4uaWQpKTtsZXQgbz10LmZpbmQobj0+bi50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBuPW5ldyBTZXQodC5tYXAoYz0+Yy5pZCkpLGE9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGM9Pk9iamVjdC52YWx1ZXMoYykpLmZsYXQoKTtzLmhtclVwZGF0ZWR8fD1hLmV2ZXJ5KGM9Pm4uaGFzKGMpKX1wKCl9KTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntsZXQgdD1zZXRJbnRlcnZhbCgoKT0+ZS5zZW5kKFwicGluZ1wiKSwyNGUzKTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT5jbGVhckludGVydmFsKHQpKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsYXN5bmMoKT0+e2F3YWl0IHgoKSxwKCEwKX0pfUUoYXN5bmMoKT0+e2woXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLHMuYnVpbGRSZWFkeXx8PSEwLHAoKX0pO2kucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7ZS5uYW1lLnN0YXJ0c1dpdGgoXCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIikmJihzLnBvcnRzLmFkZChlKSxlLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKT0+e3MucG9ydHMuZGVsZXRlKGUpfSksZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24odCl7dC5fX3BsYXNtb19jc19jaGFuZ2VkX18mJihsKFwiQkdTVyBSdW50aW1lIC0gT24gQ1MgY29kZSBjaGFuZ2VkXCIpLHMuY3NDb2RlQ2hhbmdlZHx8PSEwLHAoKSl9KSl9KTtpLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcGxhc21vX2Z1bGxfcmVsb2FkX18mJihsKFwiQkdTVyBSdW50aW1lIC0gT24gdG9wLWxldmVsIGNvZGUgY2hhbmdlZFwiKSxwKCEwKSksITB9KTtcbiIsIiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJwbGFzbW8tZGVmYXVsdC1iYWNrZ3JvdW5kLjk0NWFjYmEwLmpzLm1hcCJ9
