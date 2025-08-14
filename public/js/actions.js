// actions.js
// Listens for a custom event fired by listener.js and performs an action (redirect).

(function () {
  // TODO: replace with your target Facebook post URL
  const FACEBOOK_POST_URL = "https://www.facebook.com/your-page-or-user/posts/1234567890";

  // Receive "canvas:click" events dispatched from listener.js
  window.addEventListener("canvas:click", (ev) => {
    // (Optional) inspect ev.detail if you want to branch on it
    // console.log("canvas:click detail:", ev.detail);
    // Perform the action
    window.location.assign(FACEBOOK_POST_URL);
  }, { passive: true });
})();
