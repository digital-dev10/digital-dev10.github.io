// Small interactions for the first homepage version.
const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Keep the footer year current without needing an annual edit.
const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Highlight the current section in the navigation as the page scrolls.
const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && navLinks.length && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  observedSections.forEach((section) => sectionObserver.observe(section));
}
