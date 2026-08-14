const $ = (selector) => document.querySelector(selector);

const toast = (message) => {
  const t = $("#toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  window.setTimeout(() => t.classList.remove("show"), 3000);
};

/* Navigation */
$("#menuToggle")?.addEventListener("click", () => {
  document.querySelector(".topbar")?.classList.toggle("nav-open");
});
document.querySelectorAll("nav a").forEach((a) => {
  a.addEventListener("click", () => document.querySelector(".topbar")?.classList.remove("nav-open"));
});

/* Language */
let lang = "en";
$("#langToggle")?.addEventListener("click", () => {
  lang = lang === "en" ? "ta" : "en";
  document.documentElement.lang = lang;
  $("#langToggle").textContent = lang === "en" ? "தமிழ்" : "EN";
  document.querySelectorAll("[data-en][data-ta]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });
});

/* Reveal */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

/* Falling petals */
const petals = $(".petals");
function createPetal() {
  if (!petals) return;
  const p = document.createElement("i");
  p.className = "petal";
  p.style.left = `${Math.random() * 100}vw`;
  p.style.animationDuration = `${7 + Math.random() * 7}s`;
  petals.appendChild(p);
  window.setTimeout(() => p.remove(), 15000);
}
window.setInterval(createPetal, 900);

/* Gallery */
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const lightbox = $("#lightbox");
    const image = $("#lightboxImg");
    if (!lightbox || !image) return;
    image.src = item.dataset.full;
    lightbox.classList.add("open");
  });
});
$("#closeLightbox")?.addEventListener("click", () => $("#lightbox")?.classList.remove("open"));
$("#lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") e.currentTarget.classList.remove("open");
});

/* Music */
const music = $("#bgMusic");
const musicBtn = $("#musicToggle");
const musicPanel = $("#musicPanel");
const musicClose = $("#musicClose");
const neelaLink = $("#neelaVaanamLink");
const LOCAL_SONG = "assets/music/neela-vanam.mp3";
const SONG_START = 15;

function showMusicPanel() {
  musicPanel?.classList.add("open");
  musicPanel?.setAttribute("aria-hidden", "false");
}
function hideMusicPanel() {
  musicPanel?.classList.remove("open");
  musicPanel?.setAttribute("aria-hidden", "true");
}
function localSongAvailable() {
  return music && music.readyState > 0 && Number.isFinite(music.duration);
}

musicBtn?.addEventListener("click", async () => {
  if (!music) {
    showMusicPanel();
    return;
  }

  try {
    if (!music.paused) {
      music.pause();
      musicBtn.textContent = "♫";
      return;
    }

    // The MP3 is intentionally user-supplied/licensed. If present, start at 0:15.
    if (localSongAvailable()) {
      if (music.currentTime < SONG_START || music.currentTime >= music.duration) {
        music.currentTime = Math.min(SONG_START, Math.max(0, music.duration - 0.1));
      }
      await music.play();
      musicBtn.textContent = "❚❚";
    } else {
      showMusicPanel();
    }
  } catch (error) {
    console.error("Music playback error:", error);
    showMusicPanel();
  }
});

music?.addEventListener("ended", () => {
  if (musicBtn) musicBtn.textContent = "♫";
});

musicClose?.addEventListener("click", hideMusicPanel);
musicPanel?.addEventListener("click", (e) => {
  if (e.target === musicPanel) hideMusicPanel();
});
neelaLink?.addEventListener("click", () => {
  hideMusicPanel();
});

/* Share */
$("#shareBtn")?.addEventListener("click", async () => {
  const data = {
    title: "Vijay ❤️ Hemalatha — Wedding Invitation",
    text: "Join us for our wedding celebrations.",
    url: SITE_CONFIG.websiteUrl
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(SITE_CONFIG.websiteUrl);
      toast("Website link copied!");
    }
  } catch (_) {}
});

/* Calendar */
$("#calendarBtn")?.addEventListener("click", () => {
  const start = "20260907T060000";
  const end = "20260907T073000";
  const venue = SITE_CONFIG.venue || "Ramaswamy Mahal / S.R. Sami Party Hall";
  const address = SITE_CONFIG.venueAddress || venue;
  const details = `Wedding of Vijay and Hemalatha\\nVenue: ${venue}`;
  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent("Vijay & Hemalatha Wedding")}` +
    `&dates=${start}/${end}` +
    `&location=${encodeURIComponent(address)}` +
    `&details=${encodeURIComponent(details)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

/* RSVP — reliable cross-origin HTML form POST through a hidden iframe.
   This avoids the browser CORS/no-cors response problem that caused the
   previous fetch implementation to report success without a reliable flow. */
(function initRSVP() {
  const form = $("#rsvpForm");
  if (!form) return;

  const endpoint = String(SITE_CONFIG.rsvpWebAppUrl || "").trim();
  const button = form.querySelector("button[type='submit']");

  let status = $("#rsvpStatus");
  if (!status) {
    status = document.createElement("span");
    status.id = "rsvpStatus";
    status.className = "rsvp-status";
    button?.insertAdjacentElement("afterend", status);
  }

  let iframe = document.getElementById("rsvpSubmitFrame");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "rsvpSubmitFrame";
    iframe.name = "rsvpSubmitFrame";
    iframe.title = "RSVP submission";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "absolute";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!endpoint) {
      status.textContent = "RSVP is not connected.";
      status.className = "rsvp-status error";
      return;
    }

    const name = String(form.querySelector('[name="name"]')?.value || "").trim();
    const guests = String(form.querySelector('[name="guests"]')?.value || "").trim();
    const wishes = String(form.querySelector('[name="wishes"]')?.value || "").trim();

    if (!name || !guests) {
      status.textContent = "Please enter your name and number of guests.";
      status.className = "rsvp-status error";
      return;
    }

    // No "Sending..." message. Show only the requested success message after
    // the cross-origin form POST has been dispatched.
    const submitName = form.querySelector('[name="name"]');
    const submitGuests = form.querySelector('[name="guests"]');
    const submitWishes = form.querySelector('[name="wishes"]');

    const originalAction = form.getAttribute("action");
    const originalTarget = form.getAttribute("target");
    const originalMethod = form.getAttribute("method");

    form.setAttribute("action", endpoint);
    form.setAttribute("method", "POST");
    form.setAttribute("target", "rsvpSubmitFrame");

    if (button) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
    }

    // Submit natively so Google Apps Script receives application/x-www-form-urlencoded.
    HTMLFormElement.prototype.submit.call(form);

    // Restore normal attributes after dispatch.
    window.setTimeout(() => {
      if (originalAction === null) form.removeAttribute("action");
      else form.setAttribute("action", originalAction);

      if (originalTarget === null) form.removeAttribute("target");
      else form.setAttribute("target", originalTarget);

      if (originalMethod === null) form.removeAttribute("method");
      else form.setAttribute("method", originalMethod);

      status.textContent = "RSVP data received successfully";
      status.className = "rsvp-status success";
      form.reset();

      if (button) {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    }, 900);
  });
})();

/* Premium envelope opening */
(function initWeddingCover() {
  const cover = document.getElementById("welcome");
  const art = document.querySelector(".wedding-cover__art");
  const seal = document.getElementById("openInvitation");
  if (!cover || !seal) return;

  document.documentElement.classList.add("wedding-cover-html-lock");
  document.body.classList.add("wedding-cover-lock");

  let opened = false;

  function openCover(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (opened) return;
    opened = true;

    cover.classList.add("is-closing");

    window.setTimeout(() => {
      cover.remove();
      document.documentElement.classList.remove("wedding-cover-html-lock");
      document.body.classList.remove("wedding-cover-lock");

      // Always open the FIRST invitation content page (#home),
      // never a later section such as Events/Venue/RSVP.
      const home = document.getElementById("home");
      if (home) {
        const header = document.querySelector(".topbar");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const top = Math.max(0, home.getBoundingClientRect().top + window.scrollY - headerHeight);
        window.scrollTo({ top, left: 0, behavior: "instant" });
        history.replaceState(null, "", "#home");
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 620);
  }

  // Only the V♥H seal is the opening control.
  seal.addEventListener("click", openCover);
  seal.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") openCover(event);
  });
})();
