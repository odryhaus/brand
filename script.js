(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const header = document.getElementById("siteHeader");
    const progress = document.querySelector("[data-progress]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    };
  
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
  
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
  
      // Back to top
      if (a.hasAttribute("data-to-top")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        return;
      }
  
      if (document.querySelector(href)) {
        e.preventDefault();
        scrollToHash(href);
      }
    });
  
    // TOC active section highlight
    const tocLinks = Array.from(document.querySelectorAll(".tocLink[data-section]"));
    const sections = tocLinks
      .map(a => document.getElementById(a.dataset.section))
      .filter(Boolean);
  
    const setCurrent = (id) => {
      tocLinks.forEach((a) => {
        const active = a.dataset.section === id;
        a.classList.toggle("isCurrent", active);
        if (active) {
          a.setAttribute("aria-current", "location");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };
  
    if (sections.length) {
      if ("IntersectionObserver" in window) {
        const visibleSections = new Map();
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibleSections.delete(entry.target.id);
            }
          });

          if (!visibleSections.size) return;

          let current = sections[0].id;
          let bestScore = -1;
          sections.forEach((sec) => {
            const score = visibleSections.get(sec.id) || 0;
            if (score > bestScore) {
              bestScore = score;
              current = sec.id;
            }
          });

          setCurrent(current);
        }, {
          rootMargin: `-${Math.round(headerOffset())}px 0px -55% 0px`,
          threshold: [0, .12, .25, .5, .75]
        });

        sections.forEach((sec) => observer.observe(sec));
      }

      let ticking = false;

      const updateCurrentSection = () => {
        if (progress) {
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
        }

        if ("IntersectionObserver" in window) {
          ticking = false;
          return;
        }

        const offset = headerOffset() + 24;
        let current = sections[0].id;

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
  
    const handleInitialHash = () => {
      if (!location.hash) return;
      const hash = location.hash;
      window.scrollTo({ top: 0, behavior: "auto" });
      setTimeout(() => scrollToHash(hash), 80);
      setTimeout(() => scrollToHash(hash), 320);
    };

    // If page loads with hash — scroll with offset
    if (document.readyState === "complete") {
      handleInitialHash();
    } else {
      window.addEventListener("load", handleInitialHash, { once: true });
    }
  })();
