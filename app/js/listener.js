// listener.js
// Draws a translucent light-blue canvas centered over the image,
// and dispatches a "canvas:click" CustomEvent when clicked/activated.

(function () {
  const img = document.getElementById("docImage");
  const canvas = document.getElementById("clickCanvas");
  const ctx = canvas.getContext("2d");

  // Size & draw the overlay relative to the image size
  function layoutAndDraw() {
    if (!img.complete || !img.naturalWidth) return; // wait until image is ready

    const rect = img.getBoundingClientRect();

    // Overlay size: ~40% of image width, with 2.2:1 aspect ratio (adjust to taste)
    const cssWidth = Math.max(100, Math.min(rect.width * 0.4, 520));
    const cssHeight = Math.round(cssWidth / 2.2);

    // Retina-friendly sizing
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    // Draw translucent rounded rectangle + label
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Rounded rect helper
    function roundRect(x, y, w, h, r) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    }

    // Transparent light-blue fill + subtle stroke
    roundRect(0.5, 0.5, cssWidth - 1, cssHeight - 1, 14);
    ctx.fillStyle = "rgba(56, 189, 248, 0.18)"; // light blue, transparent
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
    ctx.stroke();

    // Label text
    ctx.font = "600 20px system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "rgba(30, 41, 59, 0.92)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("-                  -", cssWidth / 2, cssHeight / 2);
  }

  // Reflow overlay on load and on resize
  function scheduleDraw() {
    requestAnimationFrame(layoutAndDraw);
  }
  if (img.complete) scheduleDraw();
  else img.addEventListener("load", scheduleDraw, { once: true });
  window.addEventListener("resize", scheduleDraw);

  // Dispatch a custom event; actions.js listens and redirects
  function fireAction() {
    const ev = new CustomEvent("canvas:click", {
      bubbles: false,
      cancelable: false,
      detail: { source: "canvas", timestamp: Date.now() }
    });
    window.dispatchEvent(ev);
  }

  // Click + keyboard activation (Enter/Space)
  canvas.addEventListener("click", fireAction);
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fireAction();
    }
  });
})();
