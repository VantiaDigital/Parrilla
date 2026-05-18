/* Los Hermanos Parrilleros — shared scripts */

(function () {
    'use strict';

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

    // ---------- Mark active nav link by filename ----------
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === here || (here === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ---------- Reveal-on-scroll ----------
    const io = ('IntersectionObserver' in window)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
        : null;

    if (io) {
        document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
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
