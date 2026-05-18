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

    /* ---------- Cursor smoke (hero) — listener on parent so clicks pass through ---------- */
    if (!prefersReduced) {
        const hero = document.querySelector('.hero');
        const zone = document.querySelector('.smoke-zone');
        const hint = document.querySelector('.smoke-hint');
        if (hero && zone) {
            let last = 0;
            let lastX = 0, lastY = 0;
            const minDist = 14;
            const interval = 42;
            let dismissedHint = false;

            function spawn(x, y, kind) {
                const puff = document.createElement('span');
                puff.className = 'smoke-puff' + (kind === 'ember' ? ' ember-puff' : '');
                puff.style.left = x + 'px';
                puff.style.top = y + 'px';
                puff.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
                zone.appendChild(puff);
                setTimeout(function () { puff.remove(); }, kind === 'ember' ? 1900 : 2500);
            }

            hero.addEventListener('mousemove', function (e) {
                const now = performance.now();
                if (now - last < interval) return;
                const r = zone.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                if (x < 0 || x > r.width || y < 0 || y > r.height) return;
                const dx = x - lastX, dy = y - lastY;
                if (Math.sqrt(dx * dx + dy * dy) < minDist) return;
                last = now;
                lastX = x; lastY = y;

                spawn(x, y, 'smoke');
                // 40% chance: also spawn an ember
                if (Math.random() < 0.4) {
                    spawn(x + (Math.random() * 16 - 8), y, 'ember');
                }
                if (!dismissedHint && hint) {
                    hint.classList.add('dimmed');
                    dismissedHint = true;
                }
            });

            // touch — burst on tap
            hero.addEventListener('touchstart', function (e) {
                const t = e.touches[0];
                if (!t) return;
                const r = zone.getBoundingClientRect();
                const x = t.clientX - r.left, y = t.clientY - r.top;
                if (x < 0 || x > r.width || y < 0 || y > r.height) return;
                for (let i = 0; i < 5; i++) {
                    spawn(x + (Math.random() * 36 - 18), y + (Math.random() * 24 - 12), i % 2 ? 'ember' : 'smoke');
                }
            }, { passive: true });
        }
    }

    /* ---------- Continuous channel smoke (between hero columns) ---------- */
    if (!prefersReduced) {
        const channel = document.querySelector('.channel-smoke');
        if (channel) {
            const PUFF_COUNT = 7;
            for (let i = 0; i < PUFF_COUNT; i++) {
                const p = document.createElement('span');
                p.className = 'channel-puff';
                p.style.animationDelay = (i * (5 / PUFF_COUNT)) + 's';
                p.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
                channel.appendChild(p);
            }
        }
    }

    /* ---------- Coal bar igniter (bottom of hero) ---------- */
    const coalBar = document.querySelector('.coal-bar');
    if (coalBar) {
        const embersHost = coalBar.querySelector('.coal-bar-embers');
        function toggle() {
            const wasLit = coalBar.classList.toggle('lit');
            const label = coalBar.querySelector('.coal-bar-label .text');
            if (label) label.textContent = wasLit ? 'Fuego encendido' : 'Click to light the coals';
            if (wasLit && embersHost && !embersHost.children.length) {
                for (let i = 0; i < 22; i++) {
                    const e = document.createElement('span');
                    e.className = 'coal-bar-ember';
                    e.style.left = (Math.random() * 100) + '%';
                    e.style.setProperty('--dx', Math.round(Math.random() * 80 - 40));
                    e.style.animationDelay = (Math.random() * 4) + 's';
                    e.style.animationDuration = (3 + Math.random() * 3) + 's';
                    embersHost.appendChild(e);
                }
            } else if (!wasLit && embersHost) {
                embersHost.innerHTML = '';
            }
        }
        coalBar.addEventListener('click', toggle);
        coalBar.setAttribute('role', 'button');
        coalBar.setAttribute('tabindex', '0');
        coalBar.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    }

    /* ---------- Brothers hover-reveal ---------- */
    const bros = document.querySelector('[data-bros]');
    if (bros) {
        const names = bros.querySelectorAll('[data-bro]');
        const body = bros.querySelector('[data-bros-body]');
        const defaultHTML = body ? body.innerHTML : '';
        const bios = {
            bruno: '<strong style="color: var(--gold); font-weight: 500;">Bruno</strong> — older brother, lead asador. Runs the fire and the timing. Grew up watching their father work the parrilla in Rosario. Trained in the kitchen before the kitchen trained him.',
            facundo: '<strong style="color: var(--gold); font-weight: 500;">Facundo</strong> — younger brother, hospitality &amp; service. Handles logistics, drinks pairing and the front of the table. The one you\'ll message while planning, who keeps the wine flowing on the day.'
        };
        names.forEach(function (n) {
            const who = n.dataset.bro;
            n.addEventListener('mouseenter', function () {
                names.forEach(function (m) {
                    m.classList.toggle('bro-dim', m !== n);
                    m.classList.toggle('bro-focus', m === n);
                });
                if (body) body.innerHTML = bios[who] || defaultHTML;
            });
            n.addEventListener('mouseleave', function () {
                names.forEach(function (m) {
                    m.classList.remove('bro-dim');
                    m.classList.remove('bro-focus');
                });
                if (body) body.innerHTML = defaultHTML;
            });
            // touch toggle
            n.addEventListener('click', function () {
                const wasFocus = n.classList.contains('bro-focus');
                names.forEach(function (m) {
                    m.classList.remove('bro-focus');
                    m.classList.remove('bro-dim');
                });
                if (!wasFocus) {
                    names.forEach(function (m) {
                        m.classList.toggle('bro-dim', m !== n);
                        m.classList.toggle('bro-focus', m === n);
                    });
                    if (body) body.innerHTML = bios[who] || defaultHTML;
                } else {
                    if (body) body.innerHTML = defaultHTML;
                }
            });
        });
    }

    /* ---------- Parrilla igniter ---------- */
    const parrilla = document.querySelector('.parrilla');
    if (parrilla) {
        const rising = parrilla.querySelector('.parrilla-rising');
        function light() {
            parrilla.classList.add('lit');
            const label = parrilla.querySelector('.parrilla-label');
            if (label) label.textContent = 'Fuego encendido ✶ ready';
            // populate rising embers
            if (rising && !rising.children.length) {
                for (let i = 0; i < 12; i++) {
                    const e = document.createElement('span');
                    e.className = 'rising-ember';
                    e.style.left = (10 + Math.random() * 80) + '%';
                    e.style.setProperty('--dx', Math.round(Math.random() * 60 - 30));
                    e.style.animationDelay = (Math.random() * 3.5) + 's';
                    e.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
                    rising.appendChild(e);
                }
            }
        }
        function snuff() {
            parrilla.classList.remove('lit');
            const label = parrilla.querySelector('.parrilla-label');
            if (label) label.textContent = 'Click to light the parrilla';
            if (rising) rising.innerHTML = '';
        }
        parrilla.addEventListener('click', function () {
            if (parrilla.classList.contains('lit')) snuff(); else light();
        });
        parrilla.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                parrilla.click();
            }
        });
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
