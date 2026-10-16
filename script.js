/* ==========================================================================
   Castor Dafonte — interacciones
   ========================================================================== */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* ---------- Tema (claro / oscuro) ---------- */
    function initTheme() {
        const toggle = $('#theme-toggle');
        if (!toggle) return;

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
        const current = () => document.documentElement.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');

        toggle.addEventListener('click', () => {
            const next = current() === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* sin almacenamiento */ }
        });
    }

    /* ---------- Cabecera: estado scroll + barra de progreso ---------- */
    function initHeader() {
        const header = $('.header');
        const progress = $('.scroll-progress');
        const toTop = $('#scroll-to-top');
        let ticking = false;

        function update() {
            const y = window.scrollY;
            header.classList.toggle('scrolled', y > 12);
            if (progress) {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
            }
            if (toTop) toTop.classList.toggle('visible', y > 500);
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();

        if (toTop) {
            toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
        }
    }

    /* ---------- Menú móvil ---------- */
    function initMobileMenu() {
        const toggle = $('.mobile-menu-toggle');
        const links = $('#nav-links');
        if (!toggle || !links) return;

        const setOpen = (open) => {
            toggle.classList.toggle('active', open);
            links.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        };

        toggle.addEventListener('click', () => setOpen(!links.classList.contains('active')));
        $$('.nav-link', links).forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && links.classList.contains('active')) setOpen(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && links.classList.contains('active')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    /* ---------- Navegación activa por sección ---------- */
    function initActiveNav() {
        const sections = $$('main section[id]');
        const links = $$('.nav-link');
        if (!sections.length || !('IntersectionObserver' in window)) return;

        const byId = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(l => l.classList.remove('active'));
                const link = byId.get(entry.target.id);
                if (link) link.classList.add('active');
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
    }

    /* ---------- Aparición al hacer scroll (con escalonado) ---------- */
    function initReveal() {
        const items = $$('.reveal');
        if (!items.length) return;
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('in-view'));
            return;
        }

        // Escalonado dentro de cada contenedor padre
        const groups = new Map();
        items.forEach(el => {
            const parent = el.parentElement;
            const idx = groups.get(parent) || 0;
            el.style.setProperty('--delay', `${Math.min(idx, 8) * 70}ms`);
            groups.set(parent, idx + 1);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        items.forEach(el => observer.observe(el));
    }

    /* ---------- Contadores ---------- */
    function animateCounter(el, target, duration = 1600) {
        const start = performance.now();
        const ease = t => 1 - Math.pow(1 - t, 3);
        function frame(now) {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(ease(p) * target) + (p === 1 ? '+' : '');
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function initCounters() {
        const numbers = $$('.stat-number');
        if (!numbers.length) return;
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            numbers.forEach(n => { n.textContent = (n.dataset.target || n.textContent) + '+'; });
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                animateCounter(el, parseInt(el.dataset.target || el.textContent, 10));
                observer.unobserve(el);
            });
        }, { threshold: 0.6 });
        numbers.forEach(n => observer.observe(n));
    }

    /* ---------- Texto rotatorio del hero ---------- */
    function initTyped() {
        const el = $('#typed');
        if (!el) return;
        const words = ['Business Central', 'Power Platform', 'Copilot Studio', 'Azure DevOps', 'Agentic AI'];
        if (prefersReducedMotion) {
            el.textContent = words[0];
            return;
        }
        let wordIdx = 0, charIdx = 0, deleting = false;

        function tick() {
            const word = words[wordIdx];
            charIdx += deleting ? -1 : 1;
            el.textContent = word.slice(0, charIdx);
            let delay = deleting ? 45 : 85;
            if (!deleting && charIdx === word.length) { delay = 1900; deleting = true; }
            else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; delay = 350; }
            setTimeout(tick, delay);
        }
        setTimeout(tick, 900);
    }

    /* ---------- Inclinación 3D del letrero ---------- */
    function initTilt() {
        const board = $('#sign-board');
        const wrap = $('.hero-visual');
        if (!board || !wrap || prefersReducedMotion) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        wrap.addEventListener('pointermove', (e) => {
            const r = board.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            board.style.setProperty('--ry', `${x * 10}deg`);
            board.style.setProperty('--rx', `${-y * 10}deg`);
        });
        wrap.addEventListener('pointerleave', () => {
            board.style.setProperty('--ry', '0deg');
            board.style.setProperty('--rx', '0deg');
        });
    }

    /* ---------- Foco que sigue al ratón en tarjetas ---------- */
    function initSpotlight() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest('.spotlight');
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }, { passive: true });
    }

    /* ---------- Contador de certificaciones por nivel ---------- */
    function initCertCounts() {
        $$('.cert-level-title').forEach(title => {
            const grid = title.closest('summary')
                ? title.closest('details').querySelector('.certifications-grid')
                : title.nextElementSibling;
            if (!grid || !grid.classList.contains('certifications-grid')) return;
            const n = grid.querySelectorAll('.cert-card').length;
            if (title.querySelector('.cert-count')) return;
            const badge = document.createElement('span');
            badge.className = 'cert-count';
            badge.textContent = n;
            // Se inserta tras el texto; el sistema de traducción solo toca el nodo de texto
            title.appendChild(badge);
        });
    }

    /* ---------- Formulario de contacto (EmailJS) ---------- */
    const EMAILJS_CONFIG = {
        serviceID: 'service_1xi4fd2',
        templateID: 'template_hbvy6au',
        publicKey: 'U-Wf3ClHCZ12zZsBH'
    };

    function initContactForm() {
        const form = $('#contact-form');
        const status = $('#form-status');
        if (!form) return;

        const t = () => (typeof translations !== 'undefined' && typeof currentLang !== 'undefined') ? translations[currentLang] : null;
        const showStatus = (type, text) => {
            status.className = `form-status is-${type}`;
            status.textContent = text;
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (typeof emailjs === 'undefined') {
                showStatus('error', (t() && t().formError) || 'No se pudo cargar el servicio de envío. Escríbeme a castordafonte@outlook.es');
                return;
            }
            emailjs.init(EMAILJS_CONFIG.publicKey);

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = (t() && t().formSending) || 'Enviando…';

            const data = new FormData(form);
            emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
                from_name: data.get('from_name'),
                reply_to: data.get('reply_to'),
                subject: data.get('subject'),
                message: data.get('message')
            })
                .then(() => {
                    showStatus('success', (t() && t().formSuccess) || '✓ Mensaje enviado correctamente. ¡Gracias por contactar!');
                    form.reset();
                    setTimeout(() => { status.className = 'form-status'; }, 6000);
                })
                .catch((err) => {
                    showStatus('error', (t() && t().formError) || '✗ Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
                    console.error('EmailJS Error:', err);
                })
                .finally(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initHeader();
        initMobileMenu();
        initActiveNav();
        initReveal();
        initCounters();
        initTyped();
        initTilt();
        initSpotlight();
        initCertCounts();
        initContactForm();
    });
})();
