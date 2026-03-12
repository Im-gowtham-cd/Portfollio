/* ════════════════════════════════════════════════
   GOWTHAM C D — Portfolio  |  script.js
   Features:
   - Loader animation
   - Custom cursor with magnetic effect
   - Hero text stagger reveal (GSAP)
   - Hero photos parallax (mouse + scroll)
   - Nav scroll behaviour
   - ScrollTrigger section reveals
   - Counter animation
   - Projects list generation
   - Contact card 3D tilt
   - Mobile menu
   ════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const projects = [
    { id: '01', name: 'Ambyto',      period: 'Mar 2025 — ?',            status: 'inprogress', label: 'In Progress', link: '#' },
    { id: '02', name: 'YouTube UI',  period: 'Apr 14 — Apr 15, 2025',   status: 'completed',  label: 'Completed',   link: 'https://gotamu-exe-youtube.netlify.app/' },
    { id: '03', name: 'Spotify UI',  period: 'Apr 18 — Apr 23, 2025',   status: 'completed',  label: 'Completed',   link: 'https://spotamu.vercel.app/' },
    { id: '04', name: 'Dataexey',    period: 'Sep 10 — Sep 14, 2025',   status: 'completed',  label: 'Completed',   link: 'https://dataexey.vercel.app/' },
    { id: '05', name: 'Repofy',      period: 'Nov 29, 2025 — ?',        status: 'inprogress', label: 'In Progress', link: 'https://repofy.netlify.app/' },
];

/* ─── Utility ─── */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ══════════════════════════════
   LOADER
══════════════════════════════ */
(function initLoader() {
    const loader = $('#loader');
    const bar = $('#loaderBar');
    const letters = $$('.loader-letters span');

    // Stagger letters in
    gsap.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.2,
    });

    // Progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finishLoader();
        }
        bar.style.width = progress + '%';
    }, 80);

    function finishLoader() {
        gsap.to(letters, {
            y: -40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.in',
            delay: 0.3,
            onComplete: () => {
                gsap.to(loader, {
                    y: '-100%',
                    duration: 0.7,
                    ease: 'power3.inOut',
                    delay: 0.1,
                    onComplete: () => {
                        loader.style.display = 'none';
                        initHeroAnimation();
                    }
                });
            }
        });
    }
})();

/* ══════════════════════════════
   HERO ENTRANCE ANIMATION
══════════════════════════════ */
function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('#heroWord1', { y: '0%', duration: 1.1, delay: 0.1 })
      .to('#heroWord2', { y: '0%', duration: 1.0 }, '-=0.8')
      .to('#heroSub',   { y: '0%', duration: 0.8 }, '-=0.6')
      .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

    // Stagger the photo cards in
    gsap.to('.hero-photo-card', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
    });

    // Apply initial photo positions
    gsap.set('.card-a', { rotation: -4 });
    gsap.set('.card-b', { rotation: 3 });
    gsap.set('.card-c', { rotation: -2 });
}

/* ══════════════════════════════
   CUSTOM CURSOR
══════════════════════════════ */
(function initCursor() {
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    // Smooth follower ring
    (function animateRing() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        raf = requestAnimationFrame(animateRing);
    })();

    // Hide on leave
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();

/* ══════════════════════════════
   MAGNETIC EFFECT
══════════════════════════════ */
function initMagnetic() {
    $$('.magnetic').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.35;
            const dy = (e.clientY - cy) * 0.35;
            gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

/* ══════════════════════════════
   HERO PHOTOS PARALLAX
══════════════════════════════ */
(function initParallax() {
    const cards = $$('.hero-photo-card');
    if (!cards.length) return;

    // Mouse parallax in hero
    const hero = $('.hero');
    hero && hero.addEventListener('mousemove', e => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top - cy) / cy;

        cards.forEach(card => {
            const speed = parseFloat(card.dataset.speed || 0.06);
            gsap.to(card, {
                x: dx * speed * 60,
                y: dy * speed * 60,
                duration: 0.8,
                ease: 'power2.out',
            });
        });
    });

    // Scroll parallax
    gsap.to('.card-a', {
        y: -80,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
    gsap.to('.card-b', {
        y: -120,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 }
    });
    gsap.to('.card-c', {
        y: -50,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.9 }
    });
})();

/* ══════════════════════════════
   NAV SCROLL STATE
══════════════════════════════ */
(function initNav() {
    const nav = $('#nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = y;
    }, { passive: true });
})();

/* ══════════════════════════════
   MOBILE MENU
══════════════════════════════ */
(function initMobileMenu() {
    const toggle = $('#navToggle');
    const menu = $('#mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.classList.toggle('active', open);
    });

    $$('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
})();

/* ══════════════════════════════
   GENERATE PROJECT ROWS
══════════════════════════════ */
(function buildProjects() {
    const list = $('#projectsList');
    if (!list) return;

    projects.forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'project-row';
        row.style.transitionDelay = (i * 0.08) + 's';
        row.innerHTML = `
            <span class="proj-num">${p.id}</span>
            <span class="proj-name">${p.name}</span>
            <span class="proj-period">${p.period}</span>
            <span class="proj-status ${p.status}">${p.label}</span>
            <a href="${p.link}" target="_blank" rel="noopener" class="proj-link">
                VIEW <span class="proj-link-arrow">→</span>
            </a>
        `;
        list.appendChild(row);
    });

    // Observe rows
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    $$('.project-row').forEach(r => observer.observe(r));
})();

/* ══════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════ */
(function initReveal() {
    const revealEls = $$('.reveal-up, .reveal-left');

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Stagger children within reveal groups
    $$('.about-right .reveal-up').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.12) + 's';
    });
})();

/* ══════════════════════════════
   COUNTER ANIMATION
══════════════════════════════ */
(function initCounters() {
    const counters = $$('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = clamp(elapsed / duration, 0, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + '+';
        }
        requestAnimationFrame(step);
    }
})();

/* ══════════════════════════════
   CONTACT CARD 3D TILT
══════════════════════════════ */
(function initCardTilt() {
    $$('.contact-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rx = ((e.clientY - cy) / rect.height) * -12;
            const ry = ((e.clientX - cx) / rect.width) * 12;
            gsap.to(card, {
                rotateX: rx,
                rotateY: ry,
                scale: 1.03,
                duration: 0.4,
                ease: 'power2.out',
                transformPerspective: 800,
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
            });
        });
    });

    // Observe cards for reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), 
                    parseInt(e.target.dataset.delay || 0));
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    $$('.contact-card').forEach(c => observer.observe(c));
})();

/* ══════════════════════════════
   SECTION WATERMARK PARALLAX
══════════════════════════════ */
(function initWatermarks() {
    $$('.section-watermark').forEach(wm => {
        gsap.to(wm, {
            y: -60,
            scrollTrigger: {
                trigger: wm.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            }
        });
    });
})();

/* ══════════════════════════════
   SMOOTH SCROLL for anchor links
══════════════════════════════ */
(function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();

/* ══════════════════════════════
   INIT MAGNETIC (after DOM ready)
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initMagnetic();
});

/* ══════════════════════════════
   FOOTER BIG TEXT — subtle scroll
══════════════════════════════ */
(function initFooter() {
    gsap.to('.footer-big-text', {
        x: -80,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
        }
    });
})();

/* ══════════════════════════════
   PROJECT ROWS — cursor VIEW text
══════════════════════════════ */
(function initProjectCursor() {
    $$('.project-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            $('#cursorDot') && ($('#cursorDot').style.width = '10px');
        });
        row.addEventListener('mouseleave', () => {
            $('#cursorDot') && ($('#cursorDot').style.width = '6px');
        });
    });
})();