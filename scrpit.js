const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.getElementById("current-year");
const projectModal = document.getElementById("project-modal");
const projectModalClose = document.getElementById("project-modal-close");
const projectTriggers = document.querySelectorAll("[data-project]");
const projectCloseTargets = document.querySelectorAll("[data-close-modal]");
const projectContents = document.querySelectorAll("[data-project-content]");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const setActiveSection = () => {
  let currentId = "";

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.id;
    }
  });

  navItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveSection);
window.addEventListener("load", setActiveSection);

const openProjectModal = (projectId) => {
  if (!projectModal) {
    return;
  }

  projectContents.forEach((content) => {
    content.hidden = content.dataset.projectContent !== projectId;
  });

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeProjectModal = () => {
  if (!projectModal) {
    return;
  }

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

projectTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openProjectModal(trigger.dataset.project));
});

projectCloseTargets.forEach((target) => {
  target.addEventListener("click", closeProjectModal);
});

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});
