// Utils
const $ = (q, c=document) => c.querySelector(q);
const $$ = (q, c=document) => Array.from(c.querySelectorAll(q));

// Año en footer (si lo quisieras mostrar en algún span#year)
// $("#year").textContent = new Date().getFullYear();

// Burger
const burger = $(".burger");
const navMenu = $("#navMenu");
burger.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
$$(".nav-link").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

// ScrollSpy
const sections = $$("section[id]");
const links = $$(".nav-link");
const linkFor = id => links.find(a => a.getAttribute("href") === `#${id}`);
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = linkFor(id);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.25 });
sections.forEach(s => spy.observe(s));

// Reveal on scroll
const rev = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      rev.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
$$(".observe").forEach(el => rev.observe(el));

// Form → WhatsApp (reemplaza tu número)
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = (data.get("nombre") || "").toString().trim() || "Sin nombre";
  const tel    = (data.get("tel")    || "").toString().trim() || "Sin teléfono";
  const zona   = (data.get("zona")   || "").toString().trim() || "Sin zona";
  const msg    = (data.get("mensaje")|| "").toString().trim() || "Consulta por jardinería";
  const numero = "5491112345678"; // <--- tu número (código país + área, sin +)
  const texto  = `Hola! Soy ${nombre} (${tel}) de ${zona}. ${msg}`;
  const url    = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener");
});

// ===== Hojas cayendo =====
(function fallingLeaves(){
  const container = $("#leaves");
  const LEAF_EMOJIS = ["🍃","🍂","🍁"]; // mezcla para variedad
  const LEAF_COUNT = Math.min(40, Math.max(18, Math.floor(window.innerWidth / 35)));
  for (let i = 0; i < LEAF_COUNT; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = LEAF_EMOJIS[(Math.random()*LEAF_EMOJIS.length)|0];

    // posición y animación aleatoria
    const startLeft = Math.random() * 100;                // vw
    const delay = (Math.random() * 6).toFixed(2);         // s
    const fallDur = (8 + Math.random()*10).toFixed(2);    // s
    const swayDur = (3 + Math.random()*4).toFixed(2);     // s
    const scale = (0.8 + Math.random()*0.7).toFixed(2);   // tamaño

    leaf.style.left = `${startLeft}vw`;
    leaf.style.animationDuration = `${fallDur}s, ${swayDur}s`;
    leaf.style.animationDelay = `${delay}s, ${delay/2}s`;
    leaf.style.transform = `scale(${scale})`;

    container.appendChild(leaf);

    // reiniciar cuando llega al fondo, para que sea infinito
    leaf.addEventListener("animationiteration", (e) => {
      if (e.animationName === "fall") {
        leaf.style.left = `${Math.random()*100}vw`;
      }
    });
  }

  // Recalcular en resize (suave)
  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      container.innerHTML = "";
      fallingLeaves();
    }, 300);
  }, { once: true });
})();
