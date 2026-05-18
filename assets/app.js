/* Los Hermanos Parrilleros — shared scripts (effects-rich version) */

(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Mobile menu toggle ----------
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

    // ---------- Mark active nav link ----------
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === here || (here === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ---------- Scroll progress bar ----------
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function updateProgress() {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
        bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // ---------- Letter-by-letter reveal for hero h1 ----------
    document.querySelectorAll('[data-split]').forEach(function (el) {
        const text = el.textContent;
        el.textContent = '';
        const wrap = document.createElement('span');
        wrap.className = 'split-chars';
        let i = 0;
        text.split('').forEach(function (ch) {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.setProperty('--i', i++);
            span.textContent = ch === ' ' ? ' ' : ch;
            wrap.appendChild(span);
        });
        el.appendChild(wrap);
        // Trigger in on next tick
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { wrap.classList.add('in'); });
        });
    });

    // ---------- Reveal-on-scroll (also triggers stat counters + stagger + clip) ----------
    const io = ('IntersectionObserver' in window)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    if (entry.target.classList.contains('stat-grid')) {
                        animateCounters(entry.target);
                    }
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
        : null;

    if (io) {
        document.querySelectorAll('.reveal, .reveal-stagger, .clip-reveal, .stat-grid').forEach(function (el) {
            io.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal, .reveal-stagger, .clip-reveal').forEach(function (el) {
            el.classList.add('in');
        });
    }

    // ---------- Stat counter animation ----------
    function animateCounters(scope) {
        if (prefersReduced) return;
        scope.querySelectorAll('.counter').forEach(function (el) {
            const target = parseFloat(el.dataset.to || el.textContent || '0');
            const suffix = el.dataset.suffix || '';
            const isFloat = (el.dataset.to || '').indexOf('.') >= 0;
            const duration = 1400;
            const start = performance.now();
            function step(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const value = target * eased;
                el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.classList.add('pulse');
                }
            }
            requestAnimationFrame(step);
        });
    }

    // ---------- Parallax on hero bg ----------
    if (!prefersReduced) {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            window.addEventListener('scroll', function () {
                const y = window.scrollY;
                if (y < window.innerHeight) {
                    heroBg.style.transform = 'translate3d(0, ' + (y * 0.25) + 'px, 0) scale(1.08)';
                }
            }, { passive: true });
        }
    }

    // ---------- Embers in hero ----------
    if (!prefersReduced) {
        const embersHost = document.querySelector('.embers');
        if (embersHost) {
            for (let i = 0; i < 14; i++) {
                const e = document.createElement('span');
                e.className = 'ember';
                e.style.left = (Math.random() * 100) + '%';
                e.style.animationDelay = (Math.random() * 7) + 's';
                e.style.animationDuration = (5 + Math.random() * 5) + 's';
                e.style.width = e.style.height = (3 + Math.random() * 3) + 'px';
                embersHost.appendChild(e);
            }
        }
    }

    // ---------- Magnetic buttons ----------
    if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.magnet').forEach(function (el) {
            const strength = 18;
            el.addEventListener('mousemove', function (e) {
                const r = el.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                el.style.transform = 'translate(' + (x / r.width * strength) + 'px, ' + (y / r.height * strength) + 'px)';
            });
            el.addEventListener('mouseleave', function () {
                el.style.transform = '';
            });
        });
    }

    // ---------- Tilt cards ----------
    if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.tilt').forEach(function (card) {
            const max = 6;
            card.addEventListener('mousemove', function (e) {
                const r = card.getBoundingClientRect();
                const cx = e.clientX - r.left;
                const cy = e.clientY - r.top;
                const rx = ((cy / r.height) - 0.5) * -max;
                const ry = ((cx / r.width) - 0.5) * max;
                card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(0)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    // ---------- Booking form → WhatsApp ----------
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const name = (data.get('name') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const eventType = (data.get('event_type') || '').toString().trim();
            const date = (data.get('date') || '').toString().trim();
            const guests = (data.get('guests') || '').toString().trim();
            const place = (data.get('place') || '').toString().trim();
            const message = (data.get('message') || '').toString().trim();

            const lines = [
                'Hi! I would like to book an Argentine asado:',
                '',
                'Name: ' + name,
                'Email: ' + email,
                'Event: ' + eventType,
                'Date: ' + date,
                'Guests: ' + guests,
                'Location: ' + place,
                ''
            ];
            if (message) {
                lines.push('Notes:');
                lines.push(message);
            }

            const phone = form.dataset.phone || '34652251002';
            const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(lines.join('\n'));
            window.open(url, '_blank', 'noopener');
        });
    }
})();
