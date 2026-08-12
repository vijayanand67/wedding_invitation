const $=s=>document.querySelector(s);
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000)};
$("#menuToggle")?.addEventListener("click",()=>document.querySelector(".topbar").classList.toggle("nav-open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".topbar").classList.remove("nav-open")));

let lang="en";
$("#langToggle")?.addEventListener("click",()=>{lang=lang==="en"?"ta":"en";document.documentElement.lang=lang;$("#langToggle").textContent=lang==="en"?"தமிழ்":"EN";document.querySelectorAll("[data-en][data-ta]").forEach(e=>e.textContent=e.dataset[lang]);});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

const petals=$(".petals");
function petal(){const p=document.createElement("i");p.className="petal";p.style.left=Math.random()*100+"vw";p.style.animationDuration=7+Math.random()*7+"s";petals.appendChild(p);setTimeout(()=>p.remove(),15000)}
setInterval(petal,900);

document.querySelectorAll(".gallery-item").forEach(i=>i.addEventListener("click",()=>{$("#lightboxImg").src=i.dataset.full;$("#lightbox").classList.add("open")}));
$("#closeLightbox")?.addEventListener("click",()=>$("#lightbox").classList.remove("open"));
$("#lightbox")?.addEventListener("click",e=>{if(e.target.id==="lightbox")$("#lightbox").classList.remove("open")});

const music=$("#bgMusic"), musicBtn=$("#musicToggle");
musicBtn?.addEventListener("click",async()=>{try{if(music.paused){await music.play();musicBtn.textContent="❚❚"}else{music.pause();musicBtn.textContent="♫"}}catch(e){toast("Tap again to start music.")}});

$("#shareBtn")?.addEventListener("click",async()=>{const data={title:"Vijay ❤️ Hemalatha — Wedding Invitation",text:"Join us for our wedding celebrations.",url:SITE_CONFIG.websiteUrl};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(SITE_CONFIG.websiteUrl);toast("Website link copied!")}}catch(e){}});

$("#calendarBtn")?.addEventListener("click",()=>{
 const start="20260907T060000",end="20260907T073000";
 const url=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vijay%20%26%20Hemalatha%20Wedding&dates=${start}/${end}&location=${encodeURIComponent(SITE_CONFIG.venueAddress)}&details=Wedding%20of%20Vijay%20and%20Hemalatha`;
 window.open(url,"_blank","noopener");
});

$("#rsvpForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const data = new FormData(form);

  if (!SITE_CONFIG.rsvpWebAppUrl) {
    toast("RSVP endpoint is not connected yet.");
    return;
  }

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    await fetch(SITE_CONFIG.rsvpWebAppUrl, {
      method: "POST",
      body: data,
      mode: "no-cors"
    });

    form.reset();
    toast("❤️ RSVP received! Thank you.");

  } catch (error) {
    console.error(error);
    toast("Could not submit RSVP. Please try again.");
  } finally {
    button.disabled = false;
    button.textContent = "Send RSVP";
  }
});





/* Wedding invitation cover controller — final */
(function () {
  function initWeddingCover() {
    var cover = document.getElementById("welcome");
    var seal = document.getElementById("openInvitation");
    if (!cover || !seal) return;

    document.documentElement.classList.add("wedding-cover-html-lock");
    document.body.classList.add("wedding-cover-lock");

    if (seal.getAttribute("data-wedding-cover-ready") === "true") return;
    seal.setAttribute("data-wedding-cover-ready", "true");

    var opened = false;

    function openCover(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (opened) return;
      opened = true;

      cover.classList.add("is-closing");

      window.setTimeout(function () {
        cover.remove();
        document.documentElement.classList.remove("wedding-cover-html-lock");
        document.body.classList.remove("wedding-cover-lock");
        window.scrollTo(0, 0);
      }, 600);
    }

    seal.addEventListener("click", openCover, false);
    seal.addEventListener("pointerup", function (e) {
      if (e.pointerType === "touch") openCover(e);
    }, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWeddingCover, {once:true});
  } else {
    initWeddingCover();
  }
})();
