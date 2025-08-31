// ====== Utilidades ======
const $ = (q, c = document) => c.querySelector(q);
const $$ = (q, c = document) => Array.from(c.querySelectorAll(q));

// Año en footer
$("#year").textContent = new Date().getFullYear();

// Burger / menú móvil
const burger = $(".burger");
const navMenu = $("#navMenu");
burger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Cerrar menú al navegar (en móvil)
$$(".nav-link").forEach(a =>
  a.addEventListener("click", () => navMenu.classList.remove("open"))
);

// ScrollSpy: resalta link activo según sección visible
const sections = $$("section[id]");
const navLinks = $$(".nav-link");
const byId = (id) => navLinks.find(a => a.getAttribute("href") === `#${id}`);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = byId(id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.25 });

sections.forEach(s => observer.observe(s));

// Reveal on scroll
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in-view");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => revealObs.observe(el));

// Form → WhatsApp
const form = $("#contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nombre = data.get("nombre")?.toString().trim() || "Sin nombre";
  const email = data.get("email")?.toString().trim() || "Sin email";
  const msg = data.get("mensaje")?.toString().trim() || "Quiero una One Page";

  // Reemplazá por tu número (con código país, sin +)
  const numero = "5491123456789";
  const texto = `Hola! Soy ${nombre} (${email}). ${msg}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener");
});

// Micro-efecto: mover brillo del header según el mouse
const header = $(".site-header");
header.addEventListener("mousemove", (e) => {
  const { width, left } = header.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  header.style.setProperty("--x", `${x}%`);
});
