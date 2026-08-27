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
    brandGroom:"Vijay",brandBride:"Hemalatha",navInvitation:"Invitation",navJourney:"Journey",navEvents:"Events",navVenue:"Venue",navGallery:"Gallery",navQuotes:"Quotes",navRsvp:"RSVP",
    heroEyebrow:"A NEW BEGINNING",groomName:"Vijay Anand",brideName:"Hemalatha",heroQuote:"Two families, one beautiful celebration.",heroSub:"With love, blessings, and joy, we begin our forever together.",heroDate:"07 September 2026",viewInvitation:"View Invitation",addCalendar:"＋ Add to Calendar",
    inviteEyebrow:"WITH OUR FAMILIES",inviteTitle:"Wedding Invitation",inviteDescription:"Together with our families, we warmly invite you to celebrate our wedding.",
    journeyTitle:"Our Journey Begins",journeyDescription:"With the blessings of our parents and elders, two families come together for a lifetime of togetherness.",childhood:"Our Memories",journeyStep1Title:"Two Families",journeyStep1Text:"A beautiful union blessed by our families.",journeyStep2Title:"Engagement",journeyStep2Text:"A joyful celebration that brought our families closer.",journeyStep3Title:"A Promise for a Lifetime",journeyStep3Text:"With love, blessings and joy, we begin our new chapter.",journeyStep4Title:"Forever Begins",journeyStep4Text:"07 September 2026",
    eventsEyebrow:"SAVE THE DATE",eventsTitle:"Wedding Celebrations",eventsDescription:"Two beautiful moments, one unforgettable beginning.",receptionDate:"06 SEP 2026",receptionTitle:"Reception",receptionTime:"6:30 PM onwards",weddingDate:"07 SEP 2026",weddingTitle:"Wedding Ceremony",weddingTime:"6:00 AM – 7:30 AM",celebrationVenue:"CELEBRATION VENUE",venueName:"Ramaswamy Mahal / S.R. Sami Party Hall",directions:"📍 Get Directions",celebrationNote:"With the love and blessings of our families, we warmly invite you to celebrate with us.",
    venueEyebrow:"JOIN US",venueTitle:"The Venue",venueAddress:"8, North Avenue, Muthamizh Nagar, Kodungaiyur, Chennai – 600118",venueNear:"Near Muthamizh Nagar Church",openMaps:"Open in Google Maps",galleryEyebrow:"MOMENTS TO TREASURE",galleryMore:"More memories coming soon",quotesEyebrow:"LOVE • LAUGHTER • FOREVER",quotesStory:"A beautiful journey, growing closer, laughing together, and choosing each other every day.",quotesContinue:"Continue",rsvpEyebrow:"WE WOULD LOVE TO HAVE YOU",rsvpTitle:"RSVP",rsvpDescription:"Please share your attendance and wishes with us.",rsvpNameLabel:"Your Name",rsvpGuestsLabel:"Number of Guests",rsvpWishesLabel:"Your Wishes",rsvpSubmit:"Send RSVP",footerThanks:"Thank you for celebrating our special day with us."
  },
  ta: {
    brandGroom:"விஜய்",brandBride:"ஹேமலதா",navInvitation:"அழைப்பிதழ்",navJourney:"நமது பயணம்",navEvents:"நிகழ்வுகள்",navVenue:"திருமண இடம்",navGallery:"நினைவுகள்",navQuotes:"மேற்கோள்கள்",navRsvp:"வருகை உறுதி",
    heroEyebrow:"ஒரு புதிய தொடக்கம்",groomName:"விஜய் ஆனந்த்",brideName:"ஹேமலதா",heroQuote:"இரண்டு குடும்பங்கள், ஒரு அழகான கொண்டாட்டம்.",heroSub:"அன்பும், ஆசீர்வாதங்களும், மகிழ்ச்சியுடனும் எங்கள் வாழ்நாள் பயணத்தை தொடங்குகிறோம்.",heroDate:"07 செப்டம்பர் 2026",viewInvitation:"அழைப்பிதழைப் பார்க்கவும்",addCalendar:"＋ காலண்டரில் சேர்க்கவும்",
    inviteEyebrow:"எங்கள் குடும்பங்களுடன்",inviteTitle:"திருமண அழைப்பிதழ்",inviteDescription:"எங்கள் குடும்பங்களுடன் இணைந்து, எங்கள் திருமண விழாவை கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்.",
    journeyTitle:"எங்கள் பயணம் தொடங்குகிறது",journeyDescription:"பெற்றோர் மற்றும் பெரியோர்களின் ஆசீர்வாதத்துடன், இரண்டு குடும்பங்கள் வாழ்நாள் உறவாக ஒன்றிணைகின்றன.",childhood:"நமது நினைவுகள்",journeyStep1Title:"இரண்டு குடும்பங்கள்",journeyStep1Text:"எங்கள் குடும்பங்களின் ஆசீர்வாதத்துடன் ஒரு அழகான இணைவு.",journeyStep2Title:"நிச்சயதார்த்தம்",journeyStep2Text:"எங்கள் குடும்பங்களை இன்னும் நெருக்கமாக இணைத்த மகிழ்ச்சியான விழா.",journeyStep3Title:"வாழ்நாள் வாக்குறுதி",journeyStep3Text:"அன்பும், ஆசீர்வாதமும், மகிழ்ச்சியுடனும் எங்கள் புதிய அத்தியாயத்தை தொடங்குகிறோம்.",journeyStep4Title:"என்றென்றும் தொடங்குகிறது",journeyStep4Text:"07 செப்டம்பர் 2026",
    eventsEyebrow:"தேதியை நினைவில் கொள்ளுங்கள்",eventsTitle:"திருமண விழாக்கள்",eventsDescription:"இரண்டு அழகான தருணங்கள், மறக்க முடியாத ஒரு தொடக்கம்.",receptionDate:"06 செப் 2026",receptionTitle:"வரவேற்பு விழா",receptionTime:"மாலை 6:30 மணி முதல்",weddingDate:"07 செப் 2026",weddingTitle:"திருமண விழா",weddingTime:"காலை 6:00 – 7:30 மணி",celebrationVenue:"விழா நடைபெறும் இடம்",venueName:"ராமசாமி மஹால் / எஸ்.ஆர். சாமி பார்ட்டி ஹால்",directions:"📍 வழிகாட்டியைப் பார்க்கவும்",celebrationNote:"எங்கள் குடும்பங்களின் அன்பும் ஆசீர்வாதமும் நிறைந்த இந்த விழாவை எங்களுடன் இணைந்து கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்.",
    venueEyebrow:"எங்களுடன் இணைந்திடுங்கள்",venueTitle:"திருமண இடம்",venueAddress:"8, நார்த் அவென்யூ, முத்தமிழ் நகர், கொடுங்கையூர், சென்னை – 600118",venueNear:"முத்தமிழ் நகர் தேவாலயம் அருகில்",openMaps:"Google Maps-ல் திறக்கவும்",galleryEyebrow:"மனதில் நிற்கும் நினைவுகள்",galleryMore:"மேலும் நினைவுகள் விரைவில்",quotesEyebrow:"அன்பு • சிரிப்பு • என்றும்",quotesStory:"ஒரு அழகான பயணம், நாளுக்கு நாள் நெருக்கமாகி, ஒன்றாக சிரித்து, ஒவ்வொரு நாளும் ஒருவரை ஒருவர் தேர்ந்தெடுக்கும் அன்பு.",quotesContinue:"தொடரலாம்",rsvpEyebrow:"உங்கள் வருகையை ஆவலுடன் எதிர்நோக்குகிறோம்",rsvpTitle:"வருகை உறுதி",rsvpDescription:"உங்கள் வருகையையும் வாழ்த்துகளையும் எங்களுடன் பகிர்ந்து கொள்ளுங்கள்.",rsvpNameLabel:"உங்கள் பெயர்",rsvpGuestsLabel:"வரும் விருந்தினர்களின் எண்ணிக்கை",rsvpWishesLabel:"உங்கள் வாழ்த்துகள்",rsvpSubmit:"வருகையை உறுதிப்படுத்துங்கள்",footerThanks:"எங்கள் சிறப்பு நாளை எங்களுடன் கொண்டாடியதற்கு நன்றி."
  }
};

function applyLanguage(nextLang) {
  lang = nextLang === "ta" ? "ta" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.documentElement.classList.toggle("is-tamil", lang === "ta");
  document.body?.classList.toggle("is-tamil", lang === "ta");
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

/* Love & Marriage quote rotator */
const LOVE_QUOTES = {
  en: [
    { category:"LOVE", text:"The best part of forever is having someone to share every little moment with." },
    { category:"FOREVER", text:"May our love grow deeper, kinder, and sweeter with every passing year." },
    { category:"MARRIAGE", text:"Marriage is two hearts building one beautiful life, one day at a time." },
    { category:"CUTE", text:"Home is wherever we are together — especially when there is good food." },
    { category:"FUNNY", text:"Marriage is sharing everything… including the remote, the snacks, and the last word." },
    { category:"LAUGHTER", text:"A happy marriage is love, laughter, patience, and knowing when to say, “You are right.”" },
    { category:"LOVE", text:"Every ordinary day becomes special when it is spent with the right person." },
    { category:"MARRIAGE", text:"Two hearts, one team, countless memories waiting to be made." },
    { category:"FUNNY", text:"Behind every happy couple is one person asking, “What should we eat?”" },
    { category:"FOREVER", text:"Here’s to growing older together while keeping the laughter young." },
    { category:"CUTE", text:"You are my favourite person to annoy for the rest of my life." },
    { category:"LOVE", text:"The sweetest love stories are written together, one beautiful day at a time." }
  ],
  ta: [
    { category:"அன்பு", text:"வாழ்க்கையின் ஒவ்வொரு சிறிய தருணத்தையும் பகிர்ந்து கொள்ளும் துணை இருப்பதே என்றும் இனிமை." },
    { category:"என்றும்", text:"ஒவ்வொரு ஆண்டும் நமது அன்பு இன்னும் ஆழமாகவும் இனிமையாகவும் வளரட்டும்." },
    { category:"திருமணம்", text:"திருமணம் என்பது இரண்டு இதயங்கள் இணைந்து, நாளுக்கு நாள் ஒரு அழகான வாழ்க்கையை உருவாக்குவது." },
    { category:"அழகு", text:"நாம் ஒன்றாக இருக்கும் இடமெல்லாம் வீடு — குறிப்பாக நல்ல உணவு இருந்தால்!" },
    { category:"நகைச்சுவை", text:"திருமணம் என்பது எல்லாவற்றையும் பகிர்வது… ரிமோட், ஸ்நாக்ஸ், கடைசி வார்த்தை கூட!" },
    { category:"சிரிப்பு", text:"இனிய திருமண வாழ்க்கைக்கு அன்பு, சிரிப்பு, பொறுமை… சரியான நேரத்தில் “நீ சொல்வது சரி” என்பதும் தேவை." },
    { category:"அன்பு", text:"சரியான துணையுடன் கழிக்கும் ஒவ்வொரு சாதாரண நாளும் ஒரு சிறப்பு நாளாக மாறும்." },
    { category:"திருமணம்", text:"இரண்டு இதயங்கள், ஒரு குழு, உருவாக காத்திருக்கும் எண்ணற்ற நினைவுகள்." },
    { category:"நகைச்சுவை", text:"மகிழ்ச்சியான தம்பதிகளுக்குப் பின்னால் எப்போதும் ஒரு கேள்வி இருக்கும் — “என்ன சாப்பிடலாம்?”" },
    { category:"என்றும்", text:"ஒன்றாக வயதாகலாம்; ஆனால் நமது சிரிப்பு என்றும் இளமையாக இருக்கட்டும்." },
    { category:"அழகு", text:"வாழ்நாள் முழுவதும் கிண்டல் செய்ய எனக்கு மிகவும் பிடித்த மனிதர் நீ தான்!" },
    { category:"அன்பு", text:"இனிமையான காதல் கதைகள் இருவரும் சேர்ந்து, ஒவ்வொரு அழகான நாளிலும் எழுதப்படுகின்றன." }
  ]
};

let quoteIndex = 0;
let quoteTimer = null;
function renderQuote(index, immediate = false) {
  const quoteEl = $("#rotatingQuote");
  const dotsEl = $("#quoteDots");
  const categoryEl = $("#quoteCategory");
  if (!quoteEl) return;
  const quotes = LOVE_QUOTES[lang] || LOVE_QUOTES.en;
  quoteIndex = ((index % quotes.length) + quotes.length) % quotes.length;
  const item = quotes[quoteIndex];

  const setQuote = () => {
    quoteEl.textContent = item.text;
    if (categoryEl) categoryEl.textContent = item.category;
  };

  if (immediate) {
    setQuote();
  } else {
    quoteEl.classList.add("is-changing");
    window.setTimeout(() => {
      setQuote();
      requestAnimationFrame(() => quoteEl.classList.remove("is-changing"));
    }, 220);
  }

  if (dotsEl) {
    dotsEl.innerHTML = quotes.map((_, i) =>
      `<span class="quote-dot${i === quoteIndex ? " active" : ""}"></span>`
    ).join("");
  }
}
function startQuoteRotator() {
  if (!$("#rotatingQuote")) return;
  window.clearInterval(quoteTimer);
  renderQuote(quoteIndex, true);
  quoteTimer = window.setInterval(() => {
    const quotes = LOVE_QUOTES[lang] || LOVE_QUOTES.en;
    renderQuote(quoteIndex + 1);
  }, 4800);
}
window.addEventListener("wedding:languagechange", () => {
  quoteIndex = 0;
  startQuoteRotator();
});
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startQuoteRotator, { once: true });
} else {
  startQuoteRotator();
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

/* Android/iOS-safe landing opening. The inline native-first handler in index.html
   performs the actual open; this listener is only a JS-loaded fallback. */
(function initWeddingCover() {
  const cover = document.getElementById("welcome");
  const seal = document.getElementById("openInvitation");
  if (!cover || !seal) return;

  function openCover(event) {
    if (typeof window.openWeddingInvitation === "function") {
      window.openWeddingInvitation(event);
      return;
    }
    if (event) {
      try { event.preventDefault(); } catch (_) {}
      try { event.stopPropagation(); } catch (_) {}
    }
    cover.remove();
    document.documentElement.classList.remove("wedding-cover-html-lock", "cover-locked");
    document.body.classList.remove("wedding-cover-lock", "no-scroll");
    try { history.replaceState(null, "", "#home"); } catch (_) {}
    try { window.scrollTo(0, 0); } catch (_) {}
  }

  seal.addEventListener("click", openCover, { passive: false });
  seal.addEventListener("touchend", openCover, { passive: false });
  seal.addEventListener("pointerup", openCover, { passive: false });
  seal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openCover(e);
  });
})();


/* FINAL MOBILE RENDER SAFETY
   Content must never remain hidden when IntersectionObserver/animation timing
   behaves differently on Android Chrome or lower-end mobile GPUs. */
(function forceVisibleContent() {
  function revealAll() {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.transform = "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealAll, { once: true });
  } else {
    revealAll();
  }

  window.addEventListener("pageshow", revealAll);
  window.setTimeout(revealAll, 120);
  window.setTimeout(revealAll, 600);
})();

