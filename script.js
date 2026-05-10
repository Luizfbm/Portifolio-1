const commands = document.querySelectorAll(".command");
const sections = [...document.querySelectorAll("main section[id]")];
const backToTop = document.querySelector(".back-to-top");
const promptLine = document.querySelector(".hero .prompt");
const codeViewers = document.querySelectorAll("[data-code-viewer]");

const commandByTarget = new Map(
  [...commands].map((button) => [button.dataset.target, button])
);

function setActiveCommand(id) {
  commands.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === id);
  });
}

commands.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;

    setActiveCommand(button.dataset.target);
    history.pushState(null, "", `#${button.dataset.target}`);
    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && commandByTarget.has(visible.target.id)) {
      setActiveCommand(visible.target.id);
    }
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.1, 0.3, 0.6]
  }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function typePrompt(element, text) {
  if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  element.textContent = "$ ";
  let index = 0;
  const timer = window.setInterval(() => {
    element.textContent = `$ ${text.slice(0, index)}`;
    index += 1;

    if (index > text.length) {
      window.clearInterval(timer);
    }
  }, 42);
}

const isHomePage = location.pathname.endsWith("/") || location.pathname.endsWith("/index.html");
if (isHomePage) {
  typePrompt(promptLine, "./about-luiz.sh");
}

codeViewers.forEach((viewer) => {
  const tabs = viewer.querySelectorAll("[data-code-tab]");
  const panes = viewer.querySelectorAll("[data-code-pane]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.codeTab;

      tabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      panes.forEach((pane) => {
        pane.classList.toggle("active", pane.dataset.codePane === target);
      });
    });
  });
});
