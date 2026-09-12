/* =========================================================================
   APP CORE  (knows nothing about SQL — works on any Content Pack)
   ========================================================================= */

(function () {
  "use strict";

  var STORAGE_KEY = "sqlDaily.v1";

  /* ---------- date helpers (local day as YYYY-MM-DD) ---------- */
  function todayStr(d) {
    d = d || new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function addDays(dateStr, n) {
    var d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + n);
    return todayStr(d);
  }
  function isDueOnOrBefore(dueStr, refStr) {
    return dueStr <= refStr; // string compare works for YYYY-MM-DD
  }

  /* ---------- default state ---------- */
  function defaultState() {
    return {
      activeCourse: (window.COURSES && window.COURSES[0]) || "sqlserver",
      currentLevel: "beginner",       // manual, changed in Settings
      totalAnswered: 0,
      activeDates: [],                // distinct days the user practiced
      perQuestion: {},                // id -> { interval, nextDue, lastRating }
      today: null,                    // { date, queue:[ids], index, completed, extra }
      settings: {
        questionsPerDay: 3,
        notificationsEnabled: false,
        notificationTime: "08:00"
      }
    };
  }

  /* ---------- load / save ---------- */
  var state = null;

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      state = raw ? JSON.parse(raw) : defaultState();
    } catch (e) {
      state = defaultState();
    }
    // fill any missing fields (forward-compatible)
    var d = defaultState();
    for (var k in d) if (!(k in state)) state[k] = d[k];
    for (var s in d.settings) if (!(s in state.settings)) state.settings[s] = d.settings[s];
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage may be blocked; app still works in-memory */ }
  }

  /* ---------- course access ---------- */
  function course() {
    return window.getCourse(state.activeCourse);
  }
  function allQuestions() {
    var c = course();
    return c ? c.questions : [];
  }
  function questionById(id) {
    return allQuestions().filter(function (q) { return q.id === id; })[0];
  }

  /* ---------- spaced repetition (simple Leitner) ---------- */
  function scheduleAfterRating(id, rating) {
    var t = todayStr();
    var prev = state.perQuestion[id] || { interval: 0 };
    var interval;

    if (rating === "Easy") {
      interval = prev.interval >= 4 ? Math.round(prev.interval * 2) : 4;
      if (interval > 60) interval = 60;
    } else if (rating === "Medium") {
      interval = prev.interval >= 2 ? Math.round(prev.interval * 1.5) : 2;
      if (interval > 30) interval = 30;
    } else if (rating === "Hard") {
      interval = 1;
    } else { // Review Later
      interval = 0; // due again today/next session
    }

    state.perQuestion[id] = {
      interval: interval,
      nextDue: addDays(t, interval),
      lastRating: rating
    };
  }

  /* ---------- daily session building ---------- */
  function buildQueue(targetCount, excludeIds) {
    var t = todayStr();
    excludeIds = excludeIds || {};
    var qs = allQuestions();

    // 1) due reviews: already-seen questions whose nextDue <= today
    var due = qs.filter(function (q) {
      var p = state.perQuestion[q.id];
      return p && isDueOnOrBefore(p.nextDue, t) && !excludeIds[q.id];
    });

    // 2) new questions in the current level, never seen, in pack order
    var fresh = qs.filter(function (q) {
      return q.difficulty === state.currentLevel &&
             !state.perQuestion[q.id] &&
             !excludeIds[q.id];
    });

    var queue = [];
    var i;
    for (i = 0; i < due.length && queue.length < targetCount; i++) queue.push(due[i].id);
    for (i = 0; i < fresh.length && queue.length < targetCount; i++) queue.push(fresh[i].id);

    // 3) if still short (level exhausted), allow due reviews from any level already seen
    if (queue.length < targetCount) {
      var moreReviews = qs.filter(function (q) {
        var p = state.perQuestion[q.id];
        return p && queue.indexOf(q.id) === -1 && !excludeIds[q.id];
      }).sort(function (a, b) {
        return (state.perQuestion[a.id].nextDue < state.perQuestion[b.id].nextDue) ? -1 : 1;
      });
      for (i = 0; i < moreReviews.length && queue.length < targetCount; i++) {
        queue.push(moreReviews[i].id);
      }
    }
    return queue;
  }

  function ensureTodaySession() {
    var t = todayStr();
    if (!state.today || state.today.date !== t) {
      state.today = {
        date: t,
        queue: buildQueue(state.settings.questionsPerDay),
        index: 0,
        completed: 0,
        extra: false
      };
      save();
    }
  }

  /* ---------- public engine API ---------- */
  var App = {};

  App.init = function () {
    load();
    ensureTodaySession();
  };

  App.getState = function () { return state; };
  App.getCourse = function () { return course(); };

  App.getDayNumber = function () {
    // distinct practiced days, counting today once active; min 1
    var n = state.activeDates.length;
    if (state.activeDates.indexOf(todayStr()) === -1) n += 1; // today not yet counted
    return Math.max(1, n);
  };

  App.getTarget = function () { return state.settings.questionsPerDay; };
  App.getCompleted = function () { return state.today ? state.today.completed : 0; };
  App.isTargetMet = function () {
    return App.getCompleted() >= App.getTarget();
  };

  App.getCurrentQuestion = function () {
    ensureTodaySession();
    var td = state.today;
    if (td.index >= td.queue.length) return null;
    return questionById(td.queue[td.index]);
  };

  App.getUpNext = function () {
    var td = state.today;
    var list = [];
    for (var i = td.index + 1; i < td.queue.length; i++) {
      var q = questionById(td.queue[i]);
      if (q) list.push(q);
    }
    return list;
  };

  App.rate = function (rating) {
    var q = App.getCurrentQuestion();
    if (!q) return;
    scheduleAfterRating(q.id, rating);

    // count activity
    state.totalAnswered += 1;
    var t = todayStr();
    if (state.activeDates.indexOf(t) === -1) state.activeDates.push(t);

    state.today.completed += 1;
    state.today.index += 1;
    save();
  };

  App.skip = function () {
    var td = state.today;
    if (td.index >= td.queue.length) return;
    var skippedId = td.queue[td.index];

    // try to pull a replacement not already in the queue
    var exclude = {};
    td.queue.forEach(function (id) { exclude[id] = true; });
    var repl = buildQueue(1, exclude);

    if (repl.length) {
      td.queue[td.index] = repl[0]; // swap in a fresh one
    } else {
      // nothing to replace with — just move past it, keep it for later
      td.queue.splice(td.index, 1);
    }
    save();
  };

  App.keepPracticing = function () {
    // add more questions beyond the daily target
    var tue = {};
    state.today.queue.forEach(function (id) { tue[id] = true; });
    var more = buildQueue(3, tue);
    if (more.length) {
      state.today.queue = state.today.queue.concat(more);
      state.today.extra = true;
      save();
      return true;
    }
    return false;
  };

  App.hasMoreAvailable = function () {
    var tue = {};
    state.today.queue.forEach(function (id) { tue[id] = true; });
    return buildQueue(1, tue).length > 0;
  };

  /* ---------- settings ---------- */
  App.setQuestionsPerDay = function (n) {
    state.settings.questionsPerDay = n;
    // rebuild today's remaining target if not started much
    if (state.today && state.today.completed === 0) {
      state.today.queue = buildQueue(n);
      state.today.index = 0;
    } else if (state.today) {
      // extend/trim queue to reflect new target where possible
      var need = n - state.today.completed;
      if (need > (state.today.queue.length - state.today.index)) {
        var tue = {};
        state.today.queue.forEach(function (id) { tue[id] = true; });
        var extra = buildQueue(need - (state.today.queue.length - state.today.index), tue);
        state.today.queue = state.today.queue.concat(extra);
      }
    }
    save();
  };

  App.setLevel = function (level) {
    state.currentLevel = level;
    if (state.today && state.today.completed === 0) {
      state.today.queue = buildQueue(state.settings.questionsPerDay);
      state.today.index = 0;
    }
    save();
  };

  App.setCourse = function (id) {
    if (!window.getCourse(id)) return;
    state.activeCourse = id;
    state.today = null;      // rebuild session for the new course
    ensureTodaySession();
    save();
  };

  App.getSettings = function () { return state.settings; };

  App.setNotifications = function (enabled, time) {
    state.settings.notificationsEnabled = enabled;
    if (time) state.settings.notificationTime = time;
    save();
  };

  App.resetProgress = function () {
    var settings = state.settings;      // keep preferences
    var course = state.activeCourse;
    state = defaultState();
    state.settings = settings;
    state.activeCourse = course;
    ensureTodaySession();
    save();
  };

  /* ---------- notifications (best-effort local) ---------- */
  App.requestNotificationPermission = function () {
    if (!("Notification" in window)) return Promise.resolve("unsupported");
    return Notification.requestPermission();
  };

  // Schedules a one-off reminder for the next occurrence of the chosen time.
  // Best-effort: relies on the page/service worker being alive. Documented in README.
  var reminderTimer = null;
  App.scheduleReminder = function () {
    if (reminderTimer) { clearTimeout(reminderTimer); reminderTimer = null; }
    if (!state.settings.notificationsEnabled) return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    var parts = state.settings.notificationTime.split(":");
    var now = new Date();
    var next = new Date();
    next.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);

    var ms = next - now;
    // setTimeout is capped (~24.8 days) which is fine for a daily reminder.
    reminderTimer = setTimeout(function () {
      var c = course();
      var body = state.settings.questionsPerDay + " new questions are waiting for you.";
      try {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then(function (reg) {
            reg.showNotification((c ? c.name : "SQL") + " Practice 🧠", {
              body: body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: "daily"
            });
          });
        } else {
          new Notification((c ? c.name : "SQL") + " Practice 🧠", { body: body });
        }
      } catch (e) {}
      App.scheduleReminder(); // schedule the following day
    }, ms);
  };

  window.App = App;
})();
