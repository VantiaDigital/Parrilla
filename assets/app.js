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

    /* ================================================================
       BESPOKE COMPONENTS
       ================================================================ */

    /* ---------- Book CTAs: catch fire on hover, smoke transition on click ----
       Hover: button gets ember glow (CSS) + JS spawns continuous embers
              and quality smoke wisps that drift upward from the button.
       Click: a denser puff of the same wisps emanates from the button, then
              navigates after a short delay. */

    const _hereForSmoke = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const _isCoarsePointer = window.matchMedia('(hover: none)').matches;

    function spawnWispNode(host, x, y, opts) {
        const w = document.createElement('span');
        w.className = opts.cls || 'wisp';
        w.style.left = x + 'px';
        w.style.top  = y + 'px';
        const dx = (Math.random() * 70 - 35);
        const dy = -(110 + Math.random() * 120);
        w.style.setProperty('--dx', (opts.dx != null ? opts.dx : dx) + 'px');
        w.style.setProperty('--dy', (opts.dy != null ? opts.dy : dy) + 'px');
        w.style.setProperty('--scale', (3 + Math.random() * 1.6).toString());
        w.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
        const dur = opts.dur || (1.8 + Math.random() * 0.6);
        w.style.setProperty('--dur', dur + 's');
        host.appendChild(w);
        setTimeout(function () { w.remove(); }, dur * 1000 + 100);
    }

    function spawnEmber(host, x, y) {
        const e = document.createElement('span');
        e.className = 'fire-ember';
        e.style.left = x + 'px';
        e.style.bottom = y + 'px';
        e.style.setProperty('--dx', Math.round(Math.random() * 50 - 25) + 'px');
        e.style.setProperty('--dy', -(80 + Math.random() * 90) + 'px');
        const dur = 1.1 + Math.random() * 0.7;
        e.style.setProperty('--dur', dur + 's');
        host.appendChild(e);
        setTimeout(function () { e.remove(); }, dur * 1000 + 100);
    }

    document.querySelectorAll('a[href$="book.html"]').forEach(function (link) {
        const linkHref = (link.getAttribute('href') || '').toLowerCase();
        if (linkHref === _hereForSmoke) return;
        if (!link.classList.contains('btn-primary')) {
            // For non-primary book links (footer "Book an Asado →", nav-cta, etc.):
            // give them the click→smoke too, but skip the fire-on-hover.
            link.addEventListener('click', function (e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
                e.preventDefault();
                doClickSmoke(link);
            });
            return;
        }

        // Inject fire-host inside the button for hover ember/wisp particles
        let fireHost = link.querySelector('.fire-host');
        if (!fireHost) {
            fireHost = document.createElement('span');
            fireHost.className = 'fire-host';
            fireHost.setAttribute('aria-hidden', 'true');
            link.appendChild(fireHost);
        }

        let hoverTimer = null;
        let hovering = false;

        function tick() {
            if (!hovering) return;
            const r = link.getBoundingClientRect();
            // Coordinates relative to the fire-host (which spans top:-200 to bottom:-30 of the button)
            // fire-host inset: left:0 right:0 top:-200 bottom:-30; its width = btn width
            const w = r.width;
            // ember from random position along bottom edge, rising up
            const ex = Math.random() * w;
            // bottom-anchored relative to fire-host (so bottom: small px = near button top)
            const ey = 30 + Math.random() * 4;
            spawnEmber(fireHost, ex, ey);
            if (Math.random() < 0.45) {
                spawnEmber(fireHost, Math.random() * w, 30 + Math.random() * 6);
            }
            // smoke wisp at slower cadence
            if (Math.random() < 0.55) {
                // wisp coordinates are relative to fire-host (absolute pos inside it)
                // fire-host height covers above the button — y near the bottom of host
                const wx = w / 2 + (Math.random() * w * 0.7 - w * 0.35);
                const wy = fireHost.offsetHeight - 30 - Math.random() * 12;
                spawnWispNode(fireHost, wx, wy, { cls: 'fire-wisp', dur: 1.6 + Math.random() * 0.6 });
            }
        }

        link.addEventListener('mouseenter', function () {
            if (prefersReduced || _isCoarsePointer) return;
            hovering = true;
            // burst of embers right away
            tick();
            hoverTimer = setInterval(tick, 130);
        });
        link.addEventListener('mouseleave', function () {
            hovering = false;
            if (hoverTimer) { clearInterval(hoverTimer); hoverTimer = null; }
        });

        link.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
            e.preventDefault();
            // stop hover spawner
            hovering = false;
            if (hoverTimer) { clearInterval(hoverTimer); hoverTimer = null; }
            doClickSmoke(link);
        });
    });

    function doClickSmoke(link) {
        const href = link.getAttribute('href');
        if (!href) return;
        const r = link.getBoundingClientRect();
        const ox = r.left + r.width / 2;
        const oy = r.top + r.height * 0.35;

        const veil = document.createElement('div');
        veil.className = 'smoke-veil';
        veil.setAttribute('aria-hidden', 'true');

        const total = prefersReduced ? 1 : 8;
        for (let i = 0; i < total; i++) {
            const w = document.createElement('span');
            w.className = 'wisp';
            w.style.left = (ox + (Math.random() * 30 - 15)) + 'px';
            w.style.top  = (oy + (Math.random() * 14 - 7)) + 'px';
            const dx = (Math.random() * 100 - 50);
            const dy = -(170 + Math.random() * 140);
            w.style.setProperty('--dx', dx + 'px');
            w.style.setProperty('--dy', dy + 'px');
            w.style.setProperty('--scale', (3.6 + Math.random() * 1.6).toString());
            w.style.setProperty('--rot', (Math.random() * 50 - 25) + 'deg');
            const dur = 1.5 + Math.random() * 0.5;
            w.style.setProperty('--dur', dur + 's');
            w.style.animationDelay = (i * 55) + 'ms';
            veil.appendChild(w);
        }
        document.body.appendChild(veil);

        const delay = prefersReduced ? 180 : 520;
        setTimeout(function () { window.location.href = href; }, delay);
        // self-cleanup veil after smoke fades
        setTimeout(function () { veil.remove(); }, 2600);
    }

    /* ---------- Doneness slider ---------- */
    const dn = document.querySelector('.doneness');
    if (dn) {
        const input = dn.querySelector('.doneness-input');
        const body = dn.querySelector('.steak-body');
        const char = dn.querySelector('.steak-char');
        const grill = dn.querySelectorAll('.steak-grill');
        const readout = dn.querySelector('.doneness-readout');
        const labels = dn.querySelectorAll('.doneness-labels span');

        const stages = [
            { name: 'Raw',          desc: 'No, gracias.' },
            { name: 'Jugoso · Rare', desc: 'How we usually serve entraña.' },
            { name: 'A punto · Medium-rare', desc: 'House default. The cuts shine here.' },
            { name: 'Cocido · Medium', desc: 'Sure, we can do that.' },
            { name: 'Bien cocido · Well done', desc: 'Bruno will sigh, but he\'ll do it.' }
        ];

        function update() {
            const v = parseInt(input.value, 10);
            for (let i = 0; i <= 4; i++) body.classList.remove('d-' + i);
            body.classList.add('d-' + v);
            if (char) char.style.opacity = Math.min(0.9, v * 0.22);
            grill.forEach(function (g, idx) {
                g.style.opacity = v >= idx + 2 ? 0.85 : 0;
            });
            labels.forEach(function (l, i) {
                l.classList.toggle('active', i === v);
            });
            const s = stages[v];
            readout.innerHTML = '<strong>' + s.name + '</strong> — <em>' + s.desc + '</em>';
        }
        if (input) {
            input.addEventListener('input', update);
            update();
        }
    }

    /* ---------- Heat meter on menu items ---------- */
    document.querySelectorAll('.menu-item[data-temp]').forEach(function (item) {
        const temp = parseInt(item.dataset.temp, 10); // 0..100 scale of heat
        const tempC = item.dataset.tempLabel || (250 + Math.round(temp * 0.5) + '°C');
        const meter = document.createElement('div');
        meter.className = 'heat-meter';
        meter.innerHTML =
            '<div class="heat-bar" style="--inv: ' + (1 - temp / 100) + ';"></div>' +
            '<div class="heat-temp">' + tempC + '</div>';
        item.appendChild(meter);
    });

})();
