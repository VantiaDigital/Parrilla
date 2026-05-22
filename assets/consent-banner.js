/* ============================================
   LOS HERMANOS PARRILLEROS — COOKIE BANNER
   Banner de consentimiento RGPD, auto-inyectado.
   Bilingüe EN/ES. Usa la API window.LHPConsent (consent.js).
   ============================================ */

(() => {
  'use strict';

  function init() {
    if (!window.LHPConsent || document.getElementById('lhp-cb-banner')) return;

    // ---- estilos (scopeados a .lhp-cb) ----
    const css = `
      .lhp-cb [data-lang="es"]{display:none;}
      html[lang="es"] .lhp-cb [data-lang="es"]{display:inline;}
      html[lang="es"] .lhp-cb [data-lang="en"]{display:none;}
      .lhp-cb-banner{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9998;
        max-width:680px;margin:0 auto;background:#161210;
        border:1px solid rgba(201,165,92,.35);border-radius:10px;
        padding:1.15rem 1.35rem;box-shadow:0 20px 60px rgba(0,0,0,.55);
        font-family:'Inter',sans-serif;color:#e8e2d6;
        transform:translateY(150%);transition:transform .45s cubic-bezier(.2,.7,.2,1);}
      .lhp-cb-banner.is-visible{transform:translateY(0);}
      .lhp-cb-banner__body{display:flex;flex-direction:column;gap:.9rem;}
      .lhp-cb-banner__title{font-family:'Cormorant Garamond',serif;font-size:1.3rem;
        margin:0 0 .15rem;color:#fff;}
      .lhp-cb-banner__text{font-size:.84rem;line-height:1.55;margin:0;color:rgba(232,226,214,.78);}
      .lhp-cb-banner__text a{color:#c9a55c;text-decoration:underline;}
      .lhp-cb-actions{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:flex-end;}
      .lhp-cb-btn{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;
        padding:.6rem 1.05rem;border-radius:6px;border:1px solid transparent;cursor:pointer;
        transition:background-color .2s,border-color .2s,color .2s;}
      .lhp-cb-btn--primary{background:#c9a55c;color:#0a0807;border-color:#c9a55c;}
      .lhp-cb-btn--primary:hover{background:#d8b96f;}
      .lhp-cb-btn--ghost{background:transparent;color:#e8e2d6;border-color:rgba(232,226,214,.28);}
      .lhp-cb-btn--ghost:hover{border-color:#e8e2d6;}
      .lhp-cb-btn--link{background:transparent;color:rgba(232,226,214,.7);border:none;
        text-decoration:underline;padding:.6rem .4rem;}
      .lhp-cb-btn--link:hover{color:#fff;}
      @media(min-width:640px){.lhp-cb-banner__body{flex-direction:row;align-items:center;
        justify-content:space-between;gap:1.4rem;}.lhp-cb-banner__content{flex:1;}}
      .lhp-cb-modal{position:fixed;inset:0;z-index:9999;display:none;
        align-items:center;justify-content:center;padding:1rem;font-family:'Inter',sans-serif;}
      .lhp-cb-modal.is-open{display:flex;}
      .lhp-cb-modal__overlay{position:absolute;inset:0;background:rgba(10,8,7,.8);}
      .lhp-cb-modal__dialog{position:relative;background:#161210;
        border:1px solid rgba(201,165,92,.35);border-radius:10px;
        max-width:520px;width:100%;max-height:85vh;overflow-y:auto;padding:1.8rem;color:#e8e2d6;}
      .lhp-cb-modal__title{font-family:'Cormorant Garamond',serif;font-size:1.6rem;
        margin:0 0 .4rem;color:#fff;}
      .lhp-cb-modal__intro{font-size:.84rem;line-height:1.6;color:rgba(232,226,214,.75);
        margin:0 0 1.3rem;}
      .lhp-cb-cat{border-top:1px solid rgba(232,226,214,.12);padding:.9rem 0;}
      .lhp-cb-cat__head{display:flex;align-items:center;justify-content:space-between;
        gap:1rem;margin-bottom:.35rem;}
      .lhp-cb-cat__name{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:#fff;margin:0;}
      .lhp-cb-cat__desc{font-size:.78rem;line-height:1.5;color:rgba(232,226,214,.6);margin:0;}
      .lhp-cb-cat__locked{color:#c9a55c;font-style:italic;}
      .lhp-cb-switch{position:relative;width:40px;height:22px;flex-shrink:0;}
      .lhp-cb-switch input{opacity:0;width:0;height:0;}
      .lhp-cb-slider{position:absolute;inset:0;background:rgba(232,226,214,.2);
        border-radius:22px;cursor:pointer;transition:background .2s;}
      .lhp-cb-slider::before{content:"";position:absolute;height:16px;width:16px;
        left:3px;top:3px;background:#fff;border-radius:50%;transition:transform .2s;}
      .lhp-cb-switch input:checked+.lhp-cb-slider{background:#c9a55c;}
      .lhp-cb-switch input:checked+.lhp-cb-slider::before{transform:translateX(18px);}
      .lhp-cb-switch input:disabled+.lhp-cb-slider{opacity:.5;cursor:not-allowed;}
      .lhp-cb-modal__actions{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:flex-end;
        margin-top:1.3rem;padding-top:1.1rem;border-top:1px solid rgba(232,226,214,.12);}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ---- HTML ----
    const wrap = document.createElement('div');
    wrap.className = 'lhp-cb';
    wrap.innerHTML = `
      <div class="lhp-cb-banner" role="dialog" aria-label="Cookies" id="lhp-cb-banner">
        <div class="lhp-cb-banner__body">
          <div class="lhp-cb-banner__content">
            <h2 class="lhp-cb-banner__title"><span data-lang="en">We use cookies</span><span data-lang="es">Usamos cookies</span></h2>
            <p class="lhp-cb-banner__text"><span data-lang="en">Necessary cookies keep the site running and, with your consent, analytics cookies help us measure traffic. See our <a href="cookies.html">Cookie Policy</a>.</span><span data-lang="es">Las cookies necesarias hacen funcionar el sitio y, con tu consentimiento, las analíticas nos ayudan a medir el tráfico. Mirá nuestra <a href="cookies.html">Política de cookies</a>.</span></p>
          </div>
          <div class="lhp-cb-actions">
            <button type="button" class="lhp-cb-btn lhp-cb-btn--link" data-cb="prefs"><span data-lang="en">Settings</span><span data-lang="es">Configurar</span></button>
            <button type="button" class="lhp-cb-btn lhp-cb-btn--ghost" data-cb="reject"><span data-lang="en">Reject</span><span data-lang="es">Rechazar</span></button>
            <button type="button" class="lhp-cb-btn lhp-cb-btn--primary" data-cb="accept"><span data-lang="en">Accept all</span><span data-lang="es">Aceptar todo</span></button>
          </div>
        </div>
      </div>
      <div class="lhp-cb-modal" role="dialog" aria-modal="true" id="lhp-cb-modal">
        <div class="lhp-cb-modal__overlay" data-cb="close"></div>
        <div class="lhp-cb-modal__dialog">
          <h2 class="lhp-cb-modal__title"><span data-lang="en">Cookie preferences</span><span data-lang="es">Preferencias de cookies</span></h2>
          <p class="lhp-cb-modal__intro"><span data-lang="en">Manage your consent by category. You can change it anytime.</span><span data-lang="es">Gestioná tu consentimiento por categoría. Podés cambiarlo cuando quieras.</span></p>
          <div class="lhp-cb-cat">
            <div class="lhp-cb-cat__head">
              <h3 class="lhp-cb-cat__name"><span data-lang="en">Necessary</span><span data-lang="es">Necesarias</span></h3>
              <label class="lhp-cb-switch"><input type="checkbox" checked disabled aria-label="Necessary"><span class="lhp-cb-slider"></span></label>
            </div>
            <p class="lhp-cb-cat__desc"><span data-lang="en">Essential for the site to work. <span class="lhp-cb-cat__locked">Always on.</span></span><span data-lang="es">Imprescindibles para que el sitio funcione. <span class="lhp-cb-cat__locked">Siempre activas.</span></span></p>
          </div>
          <div class="lhp-cb-cat">
            <div class="lhp-cb-cat__head">
              <h3 class="lhp-cb-cat__name"><span data-lang="en">Analytics</span><span data-lang="es">Analíticas</span></h3>
              <label class="lhp-cb-switch"><input type="checkbox" id="lhp-cb-analytics" aria-label="Analytics"><span class="lhp-cb-slider"></span></label>
            </div>
            <p class="lhp-cb-cat__desc"><span data-lang="en">Google Analytics with anonymised IP. Helps us see what works. No ads, no profiling.</span><span data-lang="es">Google Analytics con IP anonimizada. Nos ayuda a ver qué funciona. Sin publicidad ni perfilado.</span></p>
          </div>
          <div class="lhp-cb-modal__actions">
            <button type="button" class="lhp-cb-btn lhp-cb-btn--ghost" data-cb="reject"><span data-lang="en">Reject all</span><span data-lang="es">Rechazar todo</span></button>
            <button type="button" class="lhp-cb-btn lhp-cb-btn--primary" data-cb="save"><span data-lang="en">Save</span><span data-lang="es">Guardar</span></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    const banner = wrap.querySelector('#lhp-cb-banner');
    const modal = wrap.querySelector('#lhp-cb-modal');
    const toggle = wrap.querySelector('#lhp-cb-analytics');

    // Mostrar el banner solo si no hay decisión previa
    if (!window.LHPConsent.hasDecision()) {
      requestAnimationFrame(() => banner.classList.add('is-visible'));
    }

    function hideBanner() { banner.classList.remove('is-visible'); }
    function openModal() {
      const c = window.LHPConsent.get();
      toggle.checked = c ? !!c.analytics : false;
      modal.classList.add('is-open');
    }
    function closeModal() { modal.classList.remove('is-open'); }

    wrap.addEventListener('click', (e) => {
      const el = e.target.closest('[data-cb]');
      if (!el) return;
      switch (el.dataset.cb) {
        case 'accept': window.LHPConsent.acceptAll(); hideBanner(); closeModal(); break;
        case 'reject': window.LHPConsent.rejectAll(); hideBanner(); closeModal(); break;
        case 'prefs':  openModal(); break;
        case 'close':  closeModal(); break;
        case 'save':   window.LHPConsent.save({ analytics: !!toggle.checked }); hideBanner(); closeModal(); break;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
