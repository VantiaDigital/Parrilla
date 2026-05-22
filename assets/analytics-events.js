/* ============================================
   LOS HERMANOS PARRILLEROS — EVENTOS (dataLayer)
   Mide los botones clave del sitio. Empuja eventos al
   dataLayer; GTM los lee y dispara los tags de GA4.
   El Consent Mode controla si GA4 los envía o no.
   ============================================ */

(() => {
  'use strict';

  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  function clean(txt) {
    return (txt || '').replace(/\s+/g, ' ').trim().slice(0, 90);
  }

  function pageName() {
    const p = window.location.pathname;
    if (p === '/' || p.endsWith('/index.html')) return 'home';
    const m = p.match(/\/([^\/]+)\.html$/);
    return m ? m[1] : 'otra';
  }

  // -------- Clics --------
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!t || !t.closest) return;

    // WhatsApp
    if (t.closest('a[href*="wa.me"]')) {
      track('click_whatsapp', { ubicacion: pageName() });
      return;
    }

    // Email
    if (t.closest('a[href^="mailto:"]')) {
      track('click_email', { ubicacion: pageName() });
      return;
    }

    // Navegación del header
    const navLink = t.closest('.nav-links a');
    if (navLink) {
      const href = navLink.getAttribute('href') || '';
      const m = href.match(/([^\/]+)\.html/);
      track('click_navegacion', { destino: clean(m ? m[1] : href) });
      return;
    }

    // Reservar — cualquier enlace que lleva a book.html (nav-cta, CTAs)
    if (t.closest('a[href*="book.html"]')) {
      track('click_reservar', { ubicacion: pageName() });
      return;
    }
  }, true);

  // -------- Envío del formulario de reserva --------
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'booking-form') {
      track('enviar_reserva', { ubicacion: pageName() });
    }
  }, true);

  // -------- Inicio del formulario de reserva (embudo) --------
  let formStarted = false;
  document.addEventListener('focusin', (e) => {
    if (formStarted) return;
    const t = e.target;
    if (t && t.closest && t.closest('#booking-form')) {
      formStarted = true;
      track('form_start', { ubicacion: pageName() });
    }
  }, true);
})();
