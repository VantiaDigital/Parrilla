/* Los Hermanos Parrilleros — fanzine edition */
(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Mobile menu ----------
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            links.classList.toggle('open');
        });
        links.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                toggle.classList.remove('open');
                links.classList.remove('open');
            }
        });
    }

    // ---------- Active nav link ----------
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === here || (here === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ---------- Scroll progress ----------
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function progress() {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        bar.style.width = max > 0 ? (h.scrollTop / max * 100) + '%' : '0%';
    }
    window.addEventListener('scroll', progress, { passive: true });
    progress();

    // ---------- Reveal-on-scroll (drop / stamp / slide) + counters ----------
    const io = ('IntersectionObserver' in window)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                if (entry.target.classList.contains('tickets')) {
                    animateCounters(entry.target);
                }
                io.unobserve(entry.target);
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' })
        : null;

    if (io) {
        document.querySelectorAll('.drop, .stamp-in, .slide-in, .tickets').forEach(function (el) {
            io.observe(el);
        });
    } else {
        document.querySelectorAll('.drop, .stamp-in, .slide-in').forEach(function (el) {
            el.classList.add('in');
        });
    }

    // ---------- Counter animation ----------
    function animateCounters(scope) {
        if (reduced) return;
        scope.querySelectorAll('.counter').forEach(function (el) {
            const target = parseFloat(el.dataset.to || el.textContent || '0');
            const suffix = el.dataset.suffix || '';
            const duration = 1300;
            const start = performance.now();
            function step(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const value = Math.round(target * eased);
                el.textContent = value + suffix;
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    // ---------- Magnetic CTAs ----------
    if (!reduced && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.magnet').forEach(function (el) {
            const strength = 16;
            el.addEventListener('mousemove', function (e) {
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                el.style.transform = 'translate(' + (x / r.width * strength) + 'px,' + (y / r.height * strength) + 'px)';
            });
            el.addEventListener('mouseleave', function () { el.style.transform = ''; });
        });
    }

    // ---------- FAQ accordion ----------
    document.querySelectorAll('.faq-item').forEach(function (item) {
        const q = item.querySelector('.q');
        if (!q) return;
        q.setAttribute('role', 'button');
        q.setAttribute('tabindex', '0');
        function open() { item.classList.toggle('open'); }
        q.addEventListener('click', open);
        q.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    });

    // ---------- Booking form → WhatsApp ----------
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const get = function (k) { return (data.get(k) || '').toString().trim(); };
            const lines = [
                'Hi! I would like to book an Argentine asado:',
                '',
                'Name: ' + get('name'),
                'Email: ' + get('email'),
                'Event: ' + get('event_type'),
                'Date: ' + get('date'),
                'Guests: ' + get('guests'),
                'Location: ' + get('place'),
                ''
            ];
            const msg = get('message');
            if (msg) {
                lines.push('Notes:');
                lines.push(msg);
            }
            const phone = form.dataset.phone || '34652251002';
            const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(lines.join('\n'));
            window.open(url, '_blank', 'noopener');
        });
    }

    // ---------- Wobble on hero polaroid (subtle, on scroll) ----------
    if (!reduced) {
        const polaroids = document.querySelectorAll('.polaroid');
        let raf = null;
        window.addEventListener('scroll', function () {
            if (raf) return;
            raf = requestAnimationFrame(function () {
                raf = null;
                const y = window.scrollY;
                polaroids.forEach(function (p, i) {
                    const sign = i % 2 === 0 ? 1 : -1;
                    const base = parseFloat(p.dataset.baseRot || (p.classList.contains('left') ? -4 : 3));
                    if (!p.dataset.baseRot) p.dataset.baseRot = base;
                    const rot = base + Math.sin(y * 0.003 + i) * 0.8 * sign;
                    if (!p.matches(':hover')) {
                        p.style.transform = 'rotate(' + rot + 'deg)';
                    }
                });
            });
        }, { passive: true });
    }
})();
