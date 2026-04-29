const STORAGE_THEME_KEY = "portfolio-theme";
const DARK_THEME_COLOR = "#0b1020";
const LIGHT_THEME_COLOR = "#eef3ff";

const body = document.body;
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = [...document.querySelectorAll("section[id]")];
const cursorGlow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll("[data-tilt]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const workFilterButtons = [...document.querySelectorAll("[data-work-filter]")];
const workCards = [...document.querySelectorAll("[data-work-group]")];
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("contact-form-status");
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_THEME_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  body.classList.toggle("light-theme", theme === "light");
  themeMeta?.setAttribute(
    "content",
    theme === "light" ? LIGHT_THEME_COLOR : DARK_THEME_COLOR
  );

  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = theme === "light" ? "bx bx-moon" : "bx bx-sun";
  }

  localStorage.setItem(STORAGE_THEME_KEY, theme);
}

function setFormStatus(message, state) {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.dataset.state = state;
}

function syncHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function syncActiveSection() {
  const marker = window.scrollY + window.innerHeight * 0.3;

  sections.forEach((section) => {
    const start = section.offsetTop;
    const end = start + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = navLinks.find((item) => item.getAttribute("href") === `#${id}`);

    if (!link) {
      return;
    }

    link.classList.toggle("active-link", marker >= start && marker < end);
  });
}

function hideLoader() {
  body.classList.remove("is-loading");
  body.classList.add("is-loaded");
}

function resetTilt(card) {
  card.style.transform = "";
  card.style.setProperty("--pointer-x", "50%");
  card.style.setProperty("--pointer-y", "50%");
  card.classList.remove("is-active");
}

applyTheme(getInitialTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (workFilterButtons.length && workCards.length) {
  workFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.workFilter || "all";

      workFilterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      workCards.forEach((card) => {
        const groups = (card.dataset.workGroup || "").split(" ");
        const isVisible = filter === "all" || groups.includes(filter);
        card.classList.toggle("is-hidden", !isVisible);
      });
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (!prefersReducedMotion.matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relativeX - 0.5) * 14;
      const rotateX = (0.5 - relativeY) * 14;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty("--pointer-x", `${relativeX * 100}%`);
      card.style.setProperty("--pointer-y", `${relativeY * 100}%`);
      card.classList.add("is-active");
    });

    card.addEventListener("pointerleave", () => resetTilt(card));
    card.addEventListener("pointerup", () => resetTilt(card));
    card.addEventListener("pointercancel", () => resetTilt(card));
  });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  const animateCursor = () => {
    glowX += (mouseX - glowX) * 0.16;
    glowY += (mouseY - glowY) * 0.16;

    if (cursorGlow) {
      cursorGlow.style.transform = `translate(${glowX - 192}px, ${glowY - 192}px)`;
    }

    requestAnimationFrame(animateCursor);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const offsetX = (event.clientX / window.innerWidth - 0.5) * 2;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 2;

      parallaxItems.forEach((item) => {
        const depth = Number(item.dataset.parallax || 10);
        item.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, ${depth}px)`;
      });
    },
    { passive: true }
  );

  requestAnimationFrame(animateCursor);
} else {
  cursorGlow?.remove();
}

if (form && formStatus) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const payload = new URLSearchParams();
    const name = document.getElementById("mail_name")?.value.trim() || "";
    const email = document.getElementById("mail_email")?.value.trim() || "";
    const project = document.getElementById("mail_project")?.value.trim() || "";

    if (!name || !email || !project) {
      setFormStatus("Fill in all fields before sending.", "error");
      return;
    }

    payload.set("name", name);
    payload.set("email", email);
    payload.set("project", project);

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    setFormStatus("Sending your message...", "success");

    try {
      const response = await fetch("php/send_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });

      const result = await response.json();

      if (!response.ok || !result.result || !/sent/i.test(result.result)) {
        throw new Error("Unexpected response");
      }

      setFormStatus("Message sent successfully.", "success");
      form.reset();
    } catch (error) {
      setFormStatus(
        "Message could not be sent right now. Use email or WhatsApp instead.",
        "error"
      );
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}

const yearNode = document.getElementById("current-year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

syncHeaderState();
syncActiveSection();

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader, { once: true });
}

window.addEventListener("scroll", syncHeaderState, { passive: true });
window.addEventListener("scroll", syncActiveSection, { passive: true });
window.addEventListener("resize", syncActiveSection);
