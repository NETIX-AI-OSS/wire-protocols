/* NETIX Wire Protocols — progressive enhancement.
   Everything here is optional: with JS off the diagrams render every layer and
   list every step as prose, the directory shows all protocols, and navigation is
   plain links. This script only ever collapses that into a richer control. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- theme ---- */
  var STORE = 'netix-wp-theme';
  function applyTheme(v) {
    if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v);
    else root.removeAttribute('data-theme');
  }
  try { applyTheme(localStorage.getItem(STORE)); } catch (e) { /* private mode */ }
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignore */ }
      themeBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  /* ---- mobile sidebar ---- */
  var side = document.querySelector('.side');
  var menuBtn = document.querySelector('[data-menu]');
  var scrim = null;
  function closeSide() {
    if (!side) return;
    side.removeAttribute('data-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (scrim) { scrim.remove(); scrim = null; }
  }
  if (menuBtn && side) {
    menuBtn.addEventListener('click', function () {
      if (side.hasAttribute('data-open')) return closeSide();
      side.setAttribute('data-open', '');
      menuBtn.setAttribute('aria-expanded', 'true');
      scrim = document.createElement('div');
      scrim.className = 'scrim';
      scrim.addEventListener('click', closeSide);
      document.body.appendChild(scrim);
    });
    side.addEventListener('click', function (e) { if (e.target.closest('a')) closeSide(); });
  }

  /* ---- diagram step-through ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-diagram]'), function (fig) {
    var plate = fig.querySelector('.dgm');
    var caps = JSON.parse(fig.getAttribute('data-steps') || '[]');
    if (!plate || !caps.length) return;
    var pills = fig.querySelectorAll('.steps .tab');
    var num = fig.querySelector('.stepcap .n');
    var body = fig.querySelector('.stepcap p');
    var live = fig.querySelector('[data-live]');
    var cur = 1;

    function show(n, announce) {
      cur = ((n - 1 + caps.length) % caps.length) + 1;
      plate.setAttribute('data-step', String(cur));
      Array.prototype.forEach.call(pills, function (p, i) {
        p.setAttribute('aria-pressed', i + 1 === cur ? 'true' : 'false');
      });
      if (num) num.textContent = 'STEP ' + cur;
      if (body) {
        body.innerHTML = '';
        var b = document.createElement('strong');
        b.textContent = caps[cur - 1][0] + '.';
        body.appendChild(b);
        body.appendChild(document.createTextNode(' ' + caps[cur - 1][1]));
      }
      if (live && announce) live.textContent = 'Step ' + cur + ' of ' + caps.length + ': ' + caps[cur - 1][0];
    }

    Array.prototype.forEach.call(pills, function (p, i) {
      p.addEventListener('click', function () { show(i + 1, true); });
    });
    var prev = fig.querySelector('[data-prev]');
    var next = fig.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { show(cur - 1, true); });
    if (next) next.addEventListener('click', function () { show(cur + 1, true); });

    fig.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { show(cur + 1, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { show(cur - 1, true); e.preventDefault(); }
    });
    show(1, false);
  });

  /* ---- directory filter ---- */
  var dir = document.querySelector('[data-directory]');
  if (dir) {
    var tiles = Array.prototype.slice.call(dir.querySelectorAll('[data-fam]'));
    var famBtns = Array.prototype.slice.call(dir.querySelectorAll('[data-tab]'));
    var input = dir.querySelector('input[type="search"]');
    var empty = dir.querySelector('[data-empty]');
    var count = dir.querySelector('[data-count]');
    var fam = 'all';

    function run() {
      var q = (input && input.value || '').trim().toLowerCase();
      var shown = 0;
      tiles.forEach(function (t) {
        var ok = (fam === 'all' || t.getAttribute('data-fam') === fam) &&
                 (!q || t.getAttribute('data-search').indexOf(q) >= 0);
        t.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = String(shown);
    }
    famBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        fam = b.getAttribute('data-tab');
        famBtns.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        run();
      });
    });
    if (input) {
      input.addEventListener('input', run);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { input.value = ''; run(); }
      });
    }
    run();
  }

  /* ---- compare table filter ---- */
  var cmp = document.querySelector('[data-compare]');
  if (cmp) {
    var rows = Array.prototype.slice.call(cmp.querySelectorAll('tbody tr'));
    var btns = Array.prototype.slice.call(cmp.querySelectorAll('[data-tab]'));
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-tab');
        btns.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        rows.forEach(function (r) { r.hidden = !(f === 'all' || r.getAttribute('data-fam') === f); });
      });
    });
  }

  /* Only now claim JS: the no-JS fallbacks stay in place until the stepper,
     filters and toggles are all wired. */
  root.classList.add('js');

  /* ---- "/" focuses search, as on every docs site ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    var box = document.querySelector('input[type="search"]');
    if (box) { box.focus(); box.select(); e.preventDefault(); }
  });
})();
