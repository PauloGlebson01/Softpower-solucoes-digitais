/* ===============================
   SOFTPOWER – SCRIPT OFICIAL
   Menu | Dark/Light | Reveal | Carousel | Share Modal | Smooth Scroll
================================ */

/* ==================================================
   MENU LATERAL
================================================== */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });
}

/* ==================================================
   DARK / LIGHT MODE
================================================== */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (themeToggle) {
  if (savedTheme) {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  } else {
    document.body.classList.add("dark");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);

    const theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  });
}

/* ==================================================
   SCROLL REVEAL
================================================== */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

/* ==================================================
   SCROLL SUAVE PARA ÂNCORAS (EBOOK)
================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    // Fecha menu lateral se estiver aberto
    sidebar?.classList.remove("open");

    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 0 : 90;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

/* ==================================================
   PORTFOLIO CAROUSEL
================================================== */
document.querySelectorAll(".carousel").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const slides = track?.querySelectorAll("img") || [];
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  if (!track || slides.length === 0) return;

  let index = 0;
  let interval = null;
  const delay = 5000;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, delay);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  nextBtn?.addEventListener("click", () => {
    stopAuto();
    nextSlide();
    startAuto();
  });

  prevBtn?.addEventListener("click", () => {
    stopAuto();
    prevSlide();
    startAuto();
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("touchstart", stopAuto);
  carousel.addEventListener("touchend", startAuto);

  startAuto();
});

/* ==================================================
   COMPARTILHAMENTO – CARTÃO DIGITAL
================================================== */
const cardLink = "https://softpower-solucoes-digitais.vercel.app";

const shareBtn = document.getElementById("shareBtn");
const shareModal = document.getElementById("shareModal");
const closeShare = document.getElementById("closeShare");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const shareLinkBtn = document.getElementById("shareLinkBtn");

shareBtn?.addEventListener("click", () => {
  shareModal.style.display = "flex";
});

closeShare?.addEventListener("click", () => {
  shareModal.style.display = "none";
});

shareModal?.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    shareModal.style.display = "none";
  }
});

copyLinkBtn?.addEventListener("click", () => {
  const message = `Confira meu cartão digital profissional: ${cardLink}`;
  navigator.clipboard.writeText(message).then(() => {
    alert("Mensagem copiada com sucesso!");
  });
});

shareLinkBtn?.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "Cartão Digital Profissional",
      text: "Confira meu cartão digital profissional:",
      url: cardLink
    });
  } else {
    navigator.clipboard.writeText(cardLink);
    alert("Link copiado!");
  }
});

/* ==================================================
   CARROSSEL DE VÍDEOS
================================================== */
document.querySelectorAll(".video-carousel").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const cards = carousel.querySelectorAll(".video-card");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  if (!track || cards.length === 0) return;

  let index = 0;
  let autoPlay = null;
  const gap = 24;
  const delay = 5000;

  function cardWidth() {
    return cards[0].offsetWidth + gap;
  }

  function pauseAllVideos() {
    cards.forEach(card => {
      const video = card.querySelector("video");
      if (video) video.pause();
    });
  }

  function updateCarousel() {
    pauseAllVideos();
    track.style.transform = `translateX(-${index * cardWidth()}px)`;
  }

  function nextSlide() {
    index = (index + 1) % cards.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  function startAuto() {
    stopAuto();
    autoPlay = setInterval(nextSlide, delay);
  }

  function stopAuto() {
    if (autoPlay) clearInterval(autoPlay);
  }

  nextBtn?.addEventListener("click", () => {
    stopAuto();
    nextSlide();
    startAuto();
  });

  prevBtn?.addEventListener("click", () => {
    stopAuto();
    prevSlide();
    startAuto();
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("touchstart", stopAuto);
  carousel.addEventListener("touchend", startAuto);

  startAuto();
});
