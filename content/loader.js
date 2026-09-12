/* =========================================================================
   COURSE LOADER  (auto-discovery)
   ------------------------------------------------------------------------
   You add a new course by dropping ONE file into /content (e.g. redis.js).
   Nothing else to edit. This loader finds every .js file in /content and
   loads it. Each course file registers itself into window.CONTENT_PACKS.

   How discovery works (in order, first that succeeds wins):
     1. GitHub API — lists the /content folder of THIS repo.
        Works when the repo is PUBLIC and the app is on *.github.io.
        This is the "just drop a file" path.
     2. content/courses.json — an optional manifest ["sqlserver","mongodb"].
        Use this only if your repo is private or you host elsewhere.
     3. Built-in fallback list — so the app never breaks offline.

   Note: a brand-new course works online immediately. Its offline copy is
   cached after you open it once with a connection.
   ========================================================================= */

window.CONTENT_PACKS = window.CONTENT_PACKS || {};

(function () {
  var FALLBACK = ["sqlserver", "mongodb"]; // never breaks if discovery fails

  function loadScript(name) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = "content/" + name + ".js";
      s.onload = function () { resolve(true); };
      s.onerror = function () { resolve(false); }; // skip a bad file, don't crash
      document.head.appendChild(s);
    });
  }

  function loadAll(names) {
    // load in sequence so order is stable
    return names.reduce(function (p, n) {
      return p.then(function () { return loadScript(n); });
    }, Promise.resolve()).then(function () { return names; });
  }

  function finalize(order) {
    // keep only ids that actually registered a pack
    var ids = order.filter(function (id) { return window.CONTENT_PACKS[id]; });
    // include any extra packs that registered but weren't in the order list
    Object.keys(window.CONTENT_PACKS).forEach(function (id) {
      if (ids.indexOf(id) === -1) ids.push(id);
    });
    // keep "sqlserver" first if present (nice default on a fresh install)
    ids.sort(function (a, b) {
      if (a === "sqlserver") return -1;
      if (b === "sqlserver") return 1;
      return 0;
    });
    window.COURSES = ids;
    window.getCourse = function (id) { return window.CONTENT_PACKS[id]; };
    window.getAllCourses = function () {
      return window.COURSES.map(function (id) { return window.CONTENT_PACKS[id]; }).filter(Boolean);
    };
    window.__COURSES_READY = true;
    window.dispatchEvent(new Event("courses-ready"));
  }

  /* --- strategy 1: GitHub API directory listing (public repo on github.io) --- */
  function viaGitHub() {
    var host = location.hostname;                 // e.g. oryanme.github.io
    if (host.indexOf("github.io") === -1) return Promise.reject("not github pages");
    var owner = host.split(".")[0];
    var repo = location.pathname.split("/").filter(Boolean)[0];
    if (!owner || !repo) return Promise.reject("no owner/repo");
    var api = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/content";
    return fetch(api).then(function (r) {
      if (!r.ok) throw new Error("api " + r.status);
      return r.json();
    }).then(function (list) {
      var names = list
        .filter(function (f) {
          return f.type === "file" &&
                 /\.js$/.test(f.name) &&
                 f.name !== "loader.js" &&
                 f.name !== "index.js";
        })
        .map(function (f) { return f.name.replace(/\.js$/, ""); });
      if (!names.length) throw new Error("no course files");
      return loadAll(names);
    });
  }

  /* --- strategy 2: optional manifest --- */
  function viaManifest() {
    return fetch("content/courses.json").then(function (r) {
      if (!r.ok) throw new Error("no manifest");
      return r.json();
    }).then(function (ids) {
      if (!ids || !ids.length) throw new Error("empty manifest");
      return loadAll(ids);
    });
  }

  /* --- strategy 3: built-in fallback --- */
  function viaFallback() { return loadAll(FALLBACK); }

  viaGitHub()
    .catch(function () { return viaManifest(); })
    .catch(function () { return viaFallback(); })
    .then(finalize)
    .catch(function () { finalize(FALLBACK); });
})();
