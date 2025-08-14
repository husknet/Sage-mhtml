(function () {
  'use strict';

  // Server-side endpoint handled by your Netlify Edge Function (or any backend)
  const ENDPOINT = '/go/open-file';

  // Prevent double-activations (rapid clicks/keypress)
  let navigating = false;

  function go() {
    if (navigating) return;
    navigating = true;

    try {
      // Use assign() to keep the current page in history; use replace() if you don't want that.
      window.location.assign(ENDPOINT);
    } catch (_) {
      // Fallback for very old browsers
      window.location.href = ENDPOINT;
    }
  }

  // Listen for the custom event dispatched by listener.js
  window.addEventListener('canvas:click', go, { passive: true });

  // In case navigation is blocked (rare), re-arm after a short delay
  setTimeout(() => { navigating = false; }, 3000);
})();
