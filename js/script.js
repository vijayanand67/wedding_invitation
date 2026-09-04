const $ = (selector) => document.querySelector(selector);

const toast = (message) => {
  const t = $("#toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  window.setTimeout(() => t.classList.remove("show"), 3000);
};

/* Navigation */
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
    brandGroom:"Vijay",brandBride:"Hemalatha",navInvitation:"Invitation",navJourney:"Journey",navEvents:"Events",navVenue:"Venue",navGallery:"Gallery",navRsvp:"RSVP",
    heroEyebrow:"A NEW BEGINNING",groomName:"Vijay Anand",brideName:"Hemalatha",heroQuote:"Two families, one beautiful celebration.",heroSub:"With love, blessings, and joy, we begin our forever together.",heroDate:"07 September 2026",viewInvitation:"View Invitation",addCalendar:"＋ Add to Calendar",
    inviteEyebrow:"WITH OUR FAMILIES",inviteTitle:"Wedding Invitation",inviteDescription:"Together with our families, we warmly invite you to celebrate our wedding.",
    journeyTitle:"Our Journey Begins",journeyDescription:"With the blessings of our parents and elders, two families come together for a lifetime of togetherness.",childhood:"Our Memories",journeyStep1Title:"Two Families",journeyStep1Text:"A beautiful union blessed by our families.",journeyStep2Title:"Engagement",journeyStep2Text:"A joyful celebration that brought our families closer.",journeyStep3Title:"A Promise for a Lifetime",journeyStep3Text:"With love, blessings and joy, we begin our new chapter.",journeyStep4Title:"Forever Begins",journeyStep4Text:"07 September 2026",
    eventsEyebrow:"SAVE THE DATE",eventsTitle:"Wedding Celebrations",eventsDescription:"Two beautiful moments, one unforgettable beginning.",receptionDate:"06 SEP 2026",receptionTitle:"Reception",receptionTime:"6:30 PM onwards",weddingDate:"07 SEP 2026",weddingTitle:"Wedding Ceremony",weddingTime:"6:00 AM – 7:30 AM",celebrationVenue:"CELEBRATION VENUE",venueName:"Ramaswamy Mahal / S.R. Sami Party Hall",directions:"📍 Get Directions",celebrationNote:"With the love and blessings of our families, we warmly invite you to celebrate with us.",
    saveDateEyebrow:"DATE BIG DATE ALERT",saveDateTitle:"Date Big Date Alert",saveDateQuote:"Clear your plans, We’re Getting Married You’re coming❤️🙏…",saveDateDescription:"A little glimpse of our special day, made with love for everyone we cherish.",saveDateSoundOn:"Tap for sound",saveDateCaption:"Vijay ❤️ Hemalatha · 07 September 2026",venueEyebrow:"JOIN US",venueTitle:"The Venue",venueAddress:"8, North Avenue, Muthamizh Nagar, Kodungaiyur, Chennai – 600118",venueNear:"Near Muthamizh Nagar Church",openMaps:"Open in Google Maps",galleryEyebrow:"PRE-WEDDING MEMORIES",galleryTitle:"Pre-Wedding Photos",galleryDescription:"A collection of our favourite moments together, captured before our wedding day.",galleryMore:"More memories coming soon",footerEyebrow:"WITH LOVE & GRATITUDE",footerTitle:"Thank You",quotesEyebrow:"WORDS FOR YOUR JOURNEY",quotesTitle:"A Few Beautiful Words",quotesDescription:"Thoughts to celebrate togetherness, laughter and a lifetime of memories.",rsvpEyebrow:"WE WOULD LOVE TO HAVE YOU",rsvpTitle:"RSVP",rsvpDescription:"Please share your attendance and wishes with us.",rsvpNameLabel:"Your Name",rsvpGuestsLabel:"Number of Guests",rsvpWishesLabel:"Your Wishes",rsvpSubmit:"Send RSVP",footerThanks:"With hearts full of love and gratitude, thank you for being a part of our beautiful journey. Your presence, blessings and warm wishes mean the world to us. ❤️🙏"
  },
  ta: {
    brandGroom:"விஜய்",brandBride:"ஹேமலதா",navInvitation:"அழைப்பிதழ்",navJourney:"நமது பயணம்",navEvents:"நிகழ்வுகள்",navVenue:"திருமண இடம்",navGallery:"நினைவுகள்",navRsvp:"வருகை உறுதி",
    heroEyebrow:"ஒரு புதிய தொடக்கம்",groomName:"விஜய் ஆனந்த்",brideName:"ஹேமலதா",heroQuote:"இரண்டு குடும்பங்கள், ஒரு அழகான கொண்டாட்டம்.",heroSub:"அன்பும், ஆசீர்வாதங்களும், மகிழ்ச்சியுடனும் எங்கள் வாழ்நாள் பயணத்தை தொடங்குகிறோம்.",heroDate:"07 செப்டம்பர் 2026",viewInvitation:"அழைப்பிதழைப் பார்க்கவும்",addCalendar:"＋ காலண்டரில் சேர்க்கவும்",
    inviteEyebrow:"எங்கள் குடும்பங்களுடன்",inviteTitle:"திருமண அழைப்பிதழ்",inviteDescription:"எங்கள் குடும்பங்களுடன் இணைந்து, எங்கள் திருமண விழாவை கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்.",
    journeyTitle:"எங்கள் பயணம் தொடங்குகிறது",journeyDescription:"பெற்றோர் மற்றும் பெரியோர்களின் ஆசீர்வாதத்துடன், இரண்டு குடும்பங்கள் வாழ்நாள் உறவாக ஒன்றிணைகின்றன.",childhood:"நமது நினைவுகள்",journeyStep1Title:"இரண்டு குடும்பங்கள்",journeyStep1Text:"எங்கள் குடும்பங்களின் ஆசீர்வாதத்துடன் ஒரு அழகான இணைவு.",journeyStep2Title:"நிச்சயதார்த்தம்",journeyStep2Text:"எங்கள் குடும்பங்களை இன்னும் நெருக்கமாக இணைத்த மகிழ்ச்சியான விழா.",journeyStep3Title:"வாழ்நாள் வாக்குறுதி",journeyStep3Text:"அன்பும், ஆசீர்வாதமும், மகிழ்ச்சியுடனும் எங்கள் புதிய அத்தியாயத்தை தொடங்குகிறோம்.",journeyStep4Title:"என்றென்றும் தொடங்குகிறது",journeyStep4Text:"07 செப்டம்பர் 2026",
    eventsEyebrow:"தேதியை நினைவில் கொள்ளுங்கள்",eventsTitle:"திருமண விழாக்கள்",eventsDescription:"இரண்டு அழகான தருணங்கள், மறக்க முடியாத ஒரு தொடக்கம்.",receptionDate:"06 செப் 2026",receptionTitle:"வரவேற்பு விழா",receptionTime:"மாலை 6:30 மணி முதல்",weddingDate:"07 செப் 2026",weddingTitle:"திருமண விழா",weddingTime:"காலை 6:00 – 7:30 மணி",celebrationVenue:"விழா நடைபெறும் இடம்",venueName:"ராமசாமி மஹால் / எஸ்.ஆர். சாமி பார்ட்டி ஹால்",directions:"📍 வழிகாட்டியைப் பார்க்கவும்",celebrationNote:"எங்கள் குடும்பங்களின் அன்பும் ஆசீர்வாதமும் நிறைந்த இந்த விழாவை எங்களுடன் இணைந்து கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்.",
    saveDateEyebrow:"DATE BIG DATE ALERT",saveDateTitle:"Date Big Date Alert",saveDateQuote:"Clear your plans, We’re Getting Married You’re coming❤️🙏…",saveDateDescription:"எங்கள் சிறப்பு நாளின் சிறிய முன்னோட்டம் — நாம் நேசிக்கும் அனைவருக்காக அன்புடன் உருவாக்கப்பட்டது.",saveDateSoundOn:"ஒலிக்க தட்டவும்",saveDateCaption:"விஜய் ❤️ ஹேமலதா · 07 செப்டம்பர் 2026",venueEyebrow:"எங்களுடன் இணைந்திடுங்கள்",venueTitle:"திருமண இடம்",venueAddress:"8, நார்த் அவென்யூ, முத்தமிழ் நகர், கொடுங்கையூர், சென்னை – 600118",venueNear:"முத்தமிழ் நகர் தேவாலயம் அருகில்",openMaps:"Google Maps-ல் திறக்கவும்",galleryEyebrow:"திருமணத்திற்கு முன் நினைவுகள்",galleryTitle:"திருமணத்திற்கு முன் புகைப்படங்கள்",galleryDescription:"எங்கள் திருமண நாளுக்கு முன் பதிவு செய்யப்பட்ட எங்களுக்கு பிடித்த அழகான தருணங்களின் தொகுப்பு.",galleryMore:"மேலும் நினைவுகள் விரைவில்",footerEyebrow:"அன்பும் நன்றியும்",footerTitle:"நன்றி",quotesEyebrow:"நம் பயணத்திற்கான இனிய வார்த்தைகள்",quotesTitle:"சில அழகான வார்த்தைகள்",quotesDescription:"அன்பு, மகிழ்ச்சி, சிரிப்பு மற்றும் வாழ்நாள் நினைவுகளை கொண்டாடும் இனிய எண்ணங்கள்.",rsvpEyebrow:"உங்கள் வருகையை ஆவலுடன் எதிர்நோக்குகிறோம்",rsvpTitle:"வருகை உறுதி",rsvpDescription:"உங்கள் வருகையையும் வாழ்த்துகளையும் எங்களுடன் பகிர்ந்து கொள்ளுங்கள்.",rsvpNameLabel:"உங்கள் பெயர்",rsvpGuestsLabel:"வரும் விருந்தினர்களின் எண்ணிக்கை",rsvpWishesLabel:"உங்கள் வாழ்த்துகள்",rsvpSubmit:"வருகையை உறுதிப்படுத்துங்கள்",footerThanks:"அன்பும் நன்றியும் நிறைந்த இதயத்துடன், எங்கள் அழகான பயணத்தின் ஒரு பகுதியாக இருந்ததற்கு நன்றி. உங்கள் வருகையும், ஆசீர்வாதங்களும், அன்பான வாழ்த்துகளும் எங்களுக்கு மிகவும் அருமையானவை. ❤️🙏"
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

/* Save The Date video: autoplay is muted for browser policy compatibility.
   Sound can be enabled by a direct user gesture. */
(() => {
  const video = $("#saveDateVideo");
  const soundBtn = $("#saveDateSound");
  if (!video) return;

  const tryPlay = () => {
    const promise = video.play();
    if (promise && typeof promise.catch === "function") promise.catch(() => {});
  };

  video.addEventListener("loadedmetadata", tryPlay, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });
  tryPlay();

  soundBtn?.addEventListener("click", () => {
    video.muted = !video.muted;
    video.setAttribute("aria-pressed", String(!video.muted));
    soundBtn.setAttribute("aria-label", video.muted ? "Enable video sound" : "Mute video sound");
    const label = soundBtn.querySelector("[data-key]");
    if (label) label.textContent = video.muted ? (lang === "ta" ? "ஒலிக்க தட்டவும்" : "Tap for sound") : (lang === "ta" ? "ஒலியை நிறுத்தவும்" : "Mute sound");
    tryPlay();
  });
})();

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

/* Hero viewport boundary: keep the next section completely out of the initial screen.
   It becomes visible as soon as the user scrolls or taps the down arrow. */
(function initHeroBoundary() {
  const hero = document.getElementById("home");
  const invite = document.getElementById("invite");
  if (!hero || !invite) return;

  const update = () => {
    const passedHero = window.scrollY > 8 || window.location.hash === "#invite";
    document.body.classList.toggle("hero-at-top", !passedHero);
  };

  document.body.classList.add("hero-at-top");
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("hashchange", update, { passive: true });

  document.querySelectorAll('a[href="#invite"]').forEach((link) => {
    link.addEventListener("click", () => {
      // Allow the browser's native anchor scroll to happen immediately.
      document.body.classList.remove("hero-at-top");
    }, { passive: true });
  });

  update();
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

/* Fast, cross-platform landing opening. Android-safe: touchend + pointerup + click, no delay. */
(function initWeddingCover() {
  const cover = document.getElementById("welcome");
  const seal = document.getElementById("openInvitation");
  if (!cover || !seal) return;
  document.documentElement.classList.add("wedding-cover-html-lock");
  document.body.classList.add("wedding-cover-lock");
  let opened = false;
  function openCover(event) {
    if (opened) return;
    if (event) { event.preventDefault(); event.stopPropagation(); }
    opened = true;
    cover.remove();
    document.documentElement.classList.remove("wedding-cover-html-lock");
    document.body.classList.remove("wedding-cover-lock");
    window.scrollTo(0, 0);
    history.replaceState(null, "", "#home");
  }
  seal.addEventListener("click", openCover, {passive:false});
  seal.addEventListener("touchend", openCover, {passive:false});
  seal.addEventListener("pointerup", (e) => { if (e.pointerType === "touch" || e.pointerType === "pen") openCover(e); }, {passive:false});
  seal.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openCover(e); });
})();


/* =========================================================
   Dynamic quotes — single-controller, language-aware and cross-browser safe
   ========================================================= */
(function initDynamicQuotes(){
  const quoteEl = document.getElementById("dynamicQuote");
  const progressEl = document.getElementById("quoteProgress");
  const numberEl = document.getElementById("quoteNumber");
  const totalEl = document.getElementById("quoteTotal");
  if (!quoteEl || !progressEl || !numberEl || !totalEl) return;

  // Prevent duplicate timers if the script is evaluated more than once.
  if (window.__weddingQuoteController) {
    window.__weddingQuoteController.refresh();
    return;
  }

  const QUOTES = {
    en: [
      "Love grows more beautiful when two hearts choose each other, every day.",
      "The best part of forever is having someone to share every little moment with.",
      "A happy marriage is built from friendship, laughter, patience and a thousand small acts of love.",
      "May your home always be filled with warm smiles, kind words and wonderful memories.",
      "Two hearts, two families and one beautiful journey — together is a lovely place to be.",
      "Marriage is finding your favourite person and choosing them again and again.",
      "A lifetime is made of little moments; may yours be filled with love and laughter.",
      "May every chapter ahead bring you closer, make you laugh louder and love deeper."
    ],
    ta: [
      "ஒவ்வொரு நாளும் ஒருவரை ஒருவர் தேர்ந்தெடுக்கும் இரு இதயங்களில் காதல் இன்னும் அழகாக மலர்கிறது.",
      "வாழ்நாள் முழுவதும் பகிர்ந்து கொள்ள ஒருவரை பெற்றிருப்பதே என்றும் நீளும் பயணத்தின் அழகான பகுதி.",
      "நட்பு, சிரிப்பு, பொறுமை மற்றும் சிறு சிறு அன்புச் செயல்களால் இனிய திருமண வாழ்க்கை உருவாகிறது.",
      "உங்கள் இல்லம் எப்போதும் இனிய புன்னகை, அன்பான வார்த்தைகள் மற்றும் அழகான நினைவுகளால் நிறைந்திருக்கட்டும்.",
      "இரு இதயங்கள், இரு குடும்பங்கள், ஒரு அழகான பயணம் — ஒன்றாக இருப்பதே மிக இனிமையான இடம்.",
      "திருமணம் என்பது உங்களுக்கு பிடித்த மனிதரை மீண்டும் மீண்டும் தேர்ந்தெடுத்து நேசிப்பது.",
      "வாழ்க்கை சிறு சிறு தருணங்களால் உருவாகிறது; உங்கள் தருணங்கள் அன்பும் சிரிப்பும் நிறைந்ததாக இருக்கட்டும்.",
      "முன்னேறும் ஒவ்வொரு அத்தியாயமும் உங்களை மேலும் நெருக்கமாக்கி, அதிகம் சிரிக்கவும் ஆழமாக நேசிக்கவும் செய்யட்டும்."
    ]
  };

  const INTERVAL = 5000;
  let index = 0;
  let timer = null;
  let animationTimer = null;
  let destroyed = false;

  function getLanguage() {
    return document.documentElement.dataset.lang === "ta" ? "ta" : "en";
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function cancelAnimation() {
    if (animationTimer !== null) {
      window.clearTimeout(animationTimer);
      animationTimer = null;
    }
    quoteEl.classList.remove("quote-changing");
  }

  function updateDOM(text, position, total) {
    quoteEl.textContent = text;
    numberEl.textContent = String(position + 1);
    totalEl.textContent = String(total);
    progressEl.style.width = `${((position + 1) / total) * 100}%`;
  }

  function render(position, animate) {
    const list = QUOTES[getLanguage()];
    if (!list || !list.length) return;

    index = ((position % list.length) + list.length) % list.length;
    const nextText = list[index];

    cancelAnimation();

    if (!animate || prefersReducedMotion()) {
      updateDOM(nextText, index, list.length);
      return;
    }

    quoteEl.classList.add("quote-changing");
    animationTimer = window.setTimeout(() => {
      animationTimer = null;
      if (destroyed) return;
      updateDOM(nextText, index, list.length);
      // Keep the class lifecycle explicit: it must be removed after the
      // content update, otherwise the quote remains permanently invisible.
      window.requestAnimationFrame(() => quoteEl.classList.remove("quote-changing"));
    }, 180);
  }

  function scheduleNext() {
    stopTimer();
    if (destroyed || document.hidden) return;
    timer = window.setTimeout(() => {
      timer = null;
      render(index + 1, true);
      scheduleNext();
    }, INTERVAL);
  }

  function refresh() {
    index = 0;
    render(0, false);
    scheduleNext();
  }

  function handleLanguageChange() {
    refresh();
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopTimer();
      cancelAnimation();
    } else {
      // Resume from the currently displayed quote rather than creating a
      // second interval/timeout or unexpectedly advancing twice.
      scheduleNext();
    }
  }

  window.__weddingQuoteController = {
    refresh,
    stop: stopTimer,
    getQuotes: () => QUOTES
  };

  render(0, false);
  scheduleNext();
  window.addEventListener("wedding:languagechange", handleLanguageChange, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
})();
