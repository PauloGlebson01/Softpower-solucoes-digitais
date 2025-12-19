/* ===============================
   SOFTPOWER – SCRIPT OFICIAL
   Menu | Dark/Light | Scroll Reveal
================================ */

/* ================= MENU LATERAL ================= */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  // Fecha ao clicar em links
  document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });
}

/* ================= DARK / LIGHT MODE ================= */
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (toggle) {
  // aplica tema salvo
  if (savedTheme) {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(savedTheme);
    toggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  } else {
    document.body.classList.add("dark");
    toggle.textContent = "🌙";
  }

  // clique no botão
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);

    const theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", theme);
    toggle.textContent = theme === "dark" ? "🌙" : "☀️";
  });
}

/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);
