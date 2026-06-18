const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealItems = document.querySelectorAll(".reveal");
const galleryButtons = document.querySelectorAll(".gallery-item, .mini-shot");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-img]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const whatsappForm = document.querySelector("[data-whatsapp-form]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 28);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

whatsappForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(whatsappForm);
  const message = [
    "Olá, Profissional Marketing! Gostaria de solicitar um orçamento para uma ação promocional.",
    `Nome: ${data.get("nome") || ""}`,
    `Empresa: ${data.get("empresa") || ""}`,
    `Produto/Rede: ${data.get("evento") || ""}`,
    `Mensagem: ${data.get("mensagem") || ""}`
  ].join("\n");
  window.open(`https://wa.me/5541992890704?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
