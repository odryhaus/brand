(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (location.hash && location.hash !== "#contact") {
      history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo(0, 0);
    }

    const header = document.getElementById("siteHeader");
    const progress = document.querySelector("[data-progress]");
    const yearNow = document.getElementById("yearNow");
    if (yearNow) yearNow.textContent = String(new Date().getFullYear());

    document.querySelectorAll(".imageFrame img").forEach((img) => {
      const frame = img.closest(".imageFrame");
      if (!frame) return;

      const markMissing = () => frame.classList.add("isMissing");
      if (img.complete && img.naturalWidth === 0) markMissing();
      img.addEventListener("error", markMissing, { once: true });
    });
  
    // Mobile menu
    const btn = document.querySelector(".menuBtn");
    const mobileNav = document.getElementById("mobileNav");
    if (btn && mobileNav) {
      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!isOpen));
        mobileNav.hidden = isOpen;
      });
  
      mobileNav.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        btn.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    }
  
    const headerOffset = () => (header ? header.getBoundingClientRect().height + 16 : 90);
  
    // Smooth scroll (with header offset)
    const scrollToHash = (hash) => {
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
  
      const top = window.scrollY + el.getBoundingClientRect().top - headerOffset();
      window.scrollTo({ top, behavior: "smooth" });
    };
  
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
  
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
  
      // Back to top
      if (a.hasAttribute("data-to-top")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
  
      if (document.querySelector(href)) {
        e.preventDefault();
        scrollToHash(href);
      }
    });
  
    // TOC active section highlight
    const toc = document.querySelector(".toc");
    const tocLinks = Array.from(document.querySelectorAll(".tocLink[data-section]"));
    const sections = tocLinks
      .map(a => document.getElementById(a.dataset.section))
      .filter(Boolean);
  
    const setCurrent = (id) => {
      tocLinks.forEach(a => a.classList.toggle("isCurrent", a.dataset.section === id));
      if (toc) {
        const currentSection = document.getElementById(id);
        toc.classList.toggle("isOnInverse", Boolean(currentSection?.classList.contains("secInverse")));
      }
    };
  
    if (sections.length) {
      let ticking = false;

      const updateCurrentSection = () => {
        if (progress) {
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
        }

        const offset = headerOffset() + 24;
        let current = sections[0].id;
        const firstSectionTop = sections[0].getBoundingClientRect().top - offset;
        if (toc) toc.classList.toggle("isVisible", firstSectionTop <= 0);

        sections.forEach((sec) => {
          if (sec.getBoundingClientRect().top - offset <= 0) {
            current = sec.id;
          }
        });

        setCurrent(current);
        ticking = false;
      };

      const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateCurrentSection);
      };

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      requestUpdate();
    } else if (progress) {
      const updateProgress = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
      };
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);
      updateProgress();
    }
  
    // If page loads with hash — scroll with offset
    window.addEventListener("load", () => {
      if (!location.hash || location.hash !== "#contact") return;
      const hash = location.hash;
      window.scrollTo(0, 0);
      setTimeout(() => scrollToHash(hash), 0);
    });
  })();
