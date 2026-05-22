/* ============================================
   LOS HERMANOS PARRILLEROS — CONSENT MANAGER
   Google Consent Mode v2 — GA4 se carga vía GTM
   Cumple RGPD / LOPD-DDD (AEPD España)

   Debe ejecutarse ANTES del snippet de GTM: fija el estado
   de consentimiento por defecto (todo denegado) para que
   GTM/GA4 lo respeten desde el inicio.
   ============================================ */

(() => {
  'use strict';

  const STORAGE_KEY = 'lhp_consent_v1';
  const CONSENT_VERSION = 1;

  // -------- gtag base (antes de cargar GTM) --------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Consent por defecto: TODO denegado hasta que el usuario decida
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  // -------- Persistencia --------
  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(prefs) {
    const data = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      analytics: !!prefs.analytics
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    return data;
  }

  function applyConsent(prefs) {
    gtag('consent', 'update', {
      'analytics_storage': prefs.analytics ? 'granted' : 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });
  }

  // -------- API pública (la usa el banner) --------
  window.LHPConsent = {
    get: readConsent,

    acceptAll() {
      const data = saveConsent({ analytics: true });
      applyConsent(data);
      document.dispatchEvent(new CustomEvent('consent:updated', { detail: data }));
    },

    rejectAll() {
      const data = saveConsent({ analytics: false });
      applyConsent(data);
      document.dispatchEvent(new CustomEvent('consent:updated', { detail: data }));
    },

    save(prefs) {
      const data = saveConsent(prefs);
      applyConsent(data);
      document.dispatchEvent(new CustomEvent('consent:updated', { detail: data }));
    },

    reset() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      location.reload();
    },

    hasDecision() {
      return readConsent() !== null;
    }
  };

  // Re-aplicar la decisión guardada en cada carga
  const existing = readConsent();
  if (existing) applyConsent(existing);
})();
