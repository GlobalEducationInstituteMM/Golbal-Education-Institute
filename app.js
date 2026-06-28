/* ═══════════════════════════════════════════
   GLOBAL EDUCATION INSTITUTE — APP JS
═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Page Router ──────────────────────────────
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === id);
    });

    // Close mobile menu
    document.getElementById('navLinks').classList.remove('open');

    // Trigger page-specific animations
    if (id === 'home') triggerHeroStamp();
    if (id === 'content') resetFilters();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) showPage(page);
    });
  });

  // ── Hamburger Menu ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  // ── Navbar Scroll ────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Hero Stamp Animation ─────────────────────
  function triggerHeroStamp() {
    const crest = document.getElementById('heroCrest');
    if (!crest) return;
    crest.classList.remove('stamped');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => crest.classList.add('stamped'), 120);
      });
    });
  }

  // ── Counter Animation ────────────────────────
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1400;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  // Run counters when stats strip is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) statsObserver.observe(statsStrip);

  // ── Scroll Reveal ─────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function attachReveal() {
    document.querySelectorAll(
      '.feature-card, .program-preview-card, .subject-card, .content-card, .value-item, .team-card'
    ).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transitionDelay = (i % 4) * 0.07 + 's';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.28s ease, border-color 0.28s ease';
      revealObserver.observe(el);
    });
  }

  // Add CSS for revealed state
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ── Content Hub Filter ───────────────────────
  function resetFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
    document.querySelectorAll('.content-card').forEach(card => {
      card.classList.remove('hidden');
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.content-card').forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.toggle('hidden', card.dataset.category !== filter);
        }
      });
    });
  });

  // ── Init ─────────────────────────────────────
  showPage('home');

  // Small delay so DOM is ready for reveal
  requestAnimationFrame(() => {
    attachReveal();
    triggerHeroStamp();
  });

  // Re-attach reveal when switching pages
  const originalShowPage = showPage;
  window._showPage = function(id) {
    originalShowPage(id);
    setTimeout(attachReveal, 100);
  };

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(attachReveal, 120);
    });
  });

})();