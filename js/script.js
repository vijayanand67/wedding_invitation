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
  a.addEventListener("click", (event) => {
    document.querySelector(".topbar")?.classList.remove("nav-open");
    const id = a.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    const header = document.querySelector(".topbar");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 22);
    window.scrollTo({ top, left: 0, behavior: "smooth" });
    history.replaceState(null, "", id);
  });
});

/* Language */
let lang = localStorage.getItem("weddingLang") === "ta" ? "ta" : "en";

const LANGUAGE_TEXT = {
  en: {
    heroQuote: "Two families, one beautiful celebration.",
    heroSub: "With love, blessings, and joy, we begin our forever together."
  },
  ta: {
    heroQuote: "இரண்டு குடும்பங்கள், ஒரு அழகான கொண்டாட்டம்.",
    heroSub: "அன்பும், ஆசீர்வாதங்களும், மகிழ்ச்சியுடனும் எங்கள் வாழ்நாள் பயணத்தை தொடங்குகிறோம்."
  }
};

function applyLanguage(nextLang) {
  lang = nextLang === "ta" ? "ta" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  localStorage.setItem("weddingLang", lang);

  const dictionary = LANGUAGE_TEXT[lang];
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.dataset.key;
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) el.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-en][data-ta]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  const invitationImage = document.getElementById("languageInvitationImage");
  if (invitationImage) {
    invitationImage.src = lang === "ta"
      ? "assets/images/wedding-invitation-tamil.jpeg"
      : "assets/images/wedding-invitation-english.jpeg";
    invitationImage.alt = lang === "ta" ? "தமிழ் திருமண அழைப்பிதழ்" : "English wedding invitation";
  }

  const toggle = $("#langToggle");
  if (toggle) toggle.textContent = lang === "en" ? "தமிழ்" : "EN";

  window.dispatchEvent(new CustomEvent("wedding:languagechange", { detail: { lang } }));
}

$("#langToggle")?.addEventListener("click", () => {
  applyLanguage(lang === "en" ? "ta" : "en");
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => applyLanguage(lang), { once: true });
} else {
  applyLanguage(lang);
}

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
const LOCAL_SONG = "assets/music/HemalathaLove.mp3";
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

    // Load the local MP3 before playing. The click itself provides the browser's
    // user-gesture permission needed for reliable playback on mobile browsers.
    if (music.readyState === 0) music.load();
    if (!Number.isFinite(music.duration)) {
      await new Promise((resolve, reject) => {
        const onReady = () => { cleanup(); resolve(); };
        const onError = () => { cleanup(); reject(new Error("Unable to load HemalathaLove.mp3")); };
        const cleanup = () => {
          music.removeEventListener("loadedmetadata", onReady);
          music.removeEventListener("canplay", onReady);
          music.removeEventListener("error", onError);
        };
        music.addEventListener("loadedmetadata", onReady, { once: true });
        music.addEventListener("canplay", onReady, { once: true });
        music.addEventListener("error", onError, { once: true });
      });
    }
    if (music.currentTime < SONG_START || music.currentTime >= music.duration) {
      music.currentTime = Math.min(SONG_START, Math.max(0, music.duration - 0.1));
    }
    await music.play();
    musicBtn.textContent = "❚❚";
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

/* RSVP — native cross-origin form POST through a hidden iframe.
   Google Apps Script handles the write to the Sheet and mirrors the row to
   GitHub log/rsvp.csv. The UI waits for the iframe response instead of
   claiming success after an arbitrary delay. */
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
    Object.assign(iframe.style,{position:"absolute",width:"1px",height:"1px",border:"0",opacity:"0",pointerEvents:"none"});
    document.body.appendChild(iframe);
  }

  let submitting = false;
  let responseTimer = null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submitting) return;

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

    submitting = true;
    if (button) { button.disabled = true; button.setAttribute("aria-busy","true"); }
    status.textContent = "";
    status.className = "rsvp-status";

    const originalAction = form.getAttribute("action");
    const originalTarget = form.getAttribute("target");
    const originalMethod = form.getAttribute("method");
    let responseSeen = false;

    const restore = () => {
      if (originalAction === null) form.removeAttribute("action"); else form.setAttribute("action",originalAction);
      if (originalTarget === null) form.removeAttribute("target"); else form.setAttribute("target",originalTarget);
      if (originalMethod === null) form.removeAttribute("method"); else form.setAttribute("method",originalMethod);
      if (responseTimer) { clearTimeout(responseTimer); responseTimer=null; }
      iframe.removeEventListener("load", onLoad);
      submitting=false;
      if (button) { button.disabled=false; button.removeAttribute("aria-busy"); }
    };

    const onLoad = () => {
      if (responseSeen) return;
      responseSeen = true;
      // Google Apps Script has completed the request by the time the target
      // iframe receives its response. The response body is intentionally not
      // read because it is cross-origin.
      status.textContent = "RSVP submitted successfully";
      status.className = "rsvp-status success";
      form.reset();
      restore();
    };

    iframe.addEventListener("load", onLoad);
    form.setAttribute("action",endpoint);
    form.setAttribute("method","POST");
    form.setAttribute("target","rsvpSubmitFrame");
    HTMLFormElement.prototype.submit.call(form);

    // Fail safely if the Apps Script deployment is unreachable.
    responseTimer = window.setTimeout(() => {
      if (responseSeen) return;
      responseSeen=true;
      status.textContent="Unable to confirm the RSVP. Please try again.";
      status.className="rsvp-status error";
      restore();
    },15000);
  });
})();

/* Premium landing atmosphere — lightweight, CSS-driven particles. */
(function initLandingAtmosphere() {
  const cover = document.getElementById("welcome");
  const layer = cover?.querySelector(".landing-particles");
  if (!cover || !layer) return;

  const count = window.matchMedia("(max-width: 600px)").matches ? 12 : 20;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "landing-particle" + (i % 4 === 0 ? " is-small" : "") + (i % 5 === 0 ? " is-soft" : "");
    particle.style.left = `${12 + Math.random() * 76}%`;
    particle.style.top = `${20 + Math.random() * 64}%`;
    particle.style.setProperty("--duration", `${5.5 + Math.random() * 4.5}s`);
    particle.style.setProperty("--delay", `${Math.random() * -8}s`);
    particle.style.setProperty("--drift", `${-18 + Math.random() * 36}px`);
    fragment.appendChild(particle);
  }
  layer.appendChild(fragment);
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

    cover.classList.add("is-opening");
    cover.setAttribute("aria-busy", "true");

    // Remove the cover synchronously. No artificial loading delay or spinner.
    cover.remove();
    document.documentElement.classList.remove("wedding-cover-html-lock");
    document.body.classList.remove("wedding-cover-lock");

    // Always open the FIRST invitation content page (#home).
    const home = document.getElementById("home");
    if (home) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      history.replaceState(null, "", "#home");
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }

  // Only the V♥H seal is the opening control.
  seal.addEventListener("click", openCover);
  seal.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") openCover(event);
  });
})();
