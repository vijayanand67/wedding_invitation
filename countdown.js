(function () {
  "use strict";

  const WEDDING_DATE = "2026-09-07T06:00:00+05:30";

  function initWeddingCountdown() {
    const el = document.getElementById("countdown");
    if (!el) return;

    const weddingDate = new Date(WEDDING_DATE).getTime();
    if (!Number.isFinite(weddingDate)) return;

    function render() {
      const remaining = weddingDate - Date.now();

      if (remaining <= 0) {
        el.innerHTML =
          '<div class="unit"><b>♥</b><small>Wedding Day</small></div>';
        return;
      }

      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      el.innerHTML =
        '<div class="unit"><b>' + days + '</b><small>Days</small></div>' +
        '<div class="unit"><b>' + String(hours).padStart(2, "0") + '</b><small>Hours</small></div>' +
        '<div class="unit"><b>' + String(minutes).padStart(2, "0") + '</b><small>Minutes</small></div>' +
        '<div class="unit"><b>' + String(seconds).padStart(2, "0") + '</b><small>Seconds</small></div>';
    }

    render();
    window.clearInterval(window.__weddingCountdownTimer);
    window.__weddingCountdownTimer = window.setInterval(render, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWeddingCountdown, { once: true });
  } else {
    initWeddingCountdown();
  }
})();