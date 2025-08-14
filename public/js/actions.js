// actions.js — client only calls a neutral endpoint; real URL lives server-side
(function () {
  'use strict';
  const ENDPOINT = '/go/open-file';   // handled by Netlify Edge Function
  let navigating = false;

  function go() {
    if (navigating) return;
    navigating = true;
    try { window.location.assign(ENDPOINT); }
    catch { window.location.href = ENDPOINT; }
  }

  window.addEventListener('canvas:click', go, { passive: true });
  setTimeout(() => { navigating = false; }, 3000);
})();
