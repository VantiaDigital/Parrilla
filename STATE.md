# STATE — Los Hermanos Parrilleros Web

> **Para la próxima sesión de Claude**: leer este archivo primero. Resume el
> estado del proyecto, las preferencias del cliente acumuladas a lo largo de
> varias iteraciones, y la lista exacta de ediciones pendientes que quedaron
> sin commitear cuando se llenó el contexto.

---

## 1 · Despliegue

- **Sitio en producción:** https://loshermanosparrilleros.pages.dev
- **Repo:** https://github.com/VantiaDigital/Parrilla (rama `main`)
- **Hosting:** Cloudflare Pages, conectado al repo. Cada `git push origin main`
  redespliega solo en ~30 s.
- **GitHub Pages:** el usuario hizo `unpublish site` en GitHub Pages. Esto
  **no afecta** a Cloudflare (CF lee del repo, no de GH Pages).
- **Dominio propio:** **NO** comprado. Se intentó setup de `.eu.org` pero
  requiere 2–4 semanas de aprobación manual; se descartó. Sitio queda en
  `.pages.dev`. Si el cliente quiere `.com`, son ~$9.77/año en Cloudflare
  Registrar.
- **Cache busting:** los `<link>` y `<script>` tienen `?v=2`. Si después de
  pushear un cambio el usuario no lo ve, bumpear a `?v=3` en las 6 HTML.

## 2 · Marca y contactos

- **Marca:** Los Hermanos Parrilleros
- **Tagline:** Asado argentino · Barcelona
- **Hermanos:**
  - **Bruno Goette** — asador principal, fuego y timing.
    - WhatsApp: +34 652 25 10 02 · brunogoette2002@gmail.com
  - **Facundo Goette** — hospitalidad, bebidas, atención de mesa.
    - WhatsApp: +34 645 72 04 20 · facugoette8@gmail.com
- **Zona de servicio:** Barcelona ciudad · Sitges & Garraf · Costa del
  Maresme · Penedès & Empordà
- **No se mencionan edades** (no decir "older/younger brother", "Asador" y
  "Hospitality" son los eyebrows aceptados).
- **No se menciona ciudad de origen** (no Rosario, no nada — simplemente
  "argentinos").

## 3 · Reglas de copy acumuladas (orden de prioridad)

Estas reglas las pidió el cliente explícitamente a lo largo de varias
iteraciones. Cumplirlas siempre que se toque copy.

### Lo que se ofrece (alcance del servicio)
- **Carne de asado** estilo argentino (asado de tira, vacío, entraña)
- **Pan**, **chimichurri**, **salsa criolla**
- **Pinchos de verdura** o **verduras enteras caseras**
- **Bebidas en lata**: agua, gaseosas, cerveza, cocktails en lata, hielo
- **Vajilla**: la traen y se la llevan (no decir "descartable" / "disposable")
- **Servicio**: Bruno + Facundo de principio a fin
- **Lugar**: si el cliente no tiene espacio, lo buscan y reservan (costo
  extra al presupuesto)

### Pricing
- **Precio cerrado al grupo** (NO por persona). En inglés: "closed group
  price". Si aparece "per-person" / "por persona", cambiarlo.

### Tiempos (**SOLO 2 mencionados, nada más**)
1. **Respondemos en 24 horas** (al mensaje, no al presupuesto)
2. **Reservar mínimo 4 días antes** del evento (anteriormente decía 3, se
   pidió subir a 4)

**Eliminar TODA otra referencia temporal**:
- "Two weeks is comfortable, longer is even better"
- "with 24h notice" (rain/reschedule)
- "90 minutes before" / "Llegamos 90 minutos antes"
- "4 hours, end to end" / "4 horas de principio a fin"
- "6h Average asado" (stat de index — ya se reemplazó por "1 precio cerrado")
- "usually faster" / "normalmente más rápido"
- "Within 24 hours" para entregar presupuesto (sí se puede decir "We reply
  within 24h" para el primer mensaje)

### Cosas a NO mencionar
- **Limpieza / cleanup / no cleanup** — quitar de todas las features y FAQs
- **Reprogramamos / reschedule / cancel** — eliminar la FAQ de lluvia completa
- **Tragos de bienvenida / welcome cocktail / welcome drinks** — quitar
- **Cigarros / cigar pairing** — quitar
- **Dulce de leche, postres, café, fernet como bebida final** — no servicio
  de postres ni café
- Vino servido como pairing (las bebidas son solo en lata)

## 4 · Identidad visual

- **Paleta**: fondo `#0a0807` (warm black), dorado `#c9a55c`, cream
  `#f3ede2`, ember `#c84a1f`
- **Tipografía**: Cormorant Garamond (display serif) + Inter (sans)
- **Bandera argentina**: badge "Made in Argentina · cooked in Barcelona"
  pinned arriba-derecha del hero. NO usar el flag fill en el h1
  (background-clip:text se probó y al cliente no le gustó).
- **NO custom cursor** (regla fija del cliente). El cursor smoke en el
  hero está OK (es un efecto bespoke, no un reemplazo del cursor).
- **Bilingüe EN/ES**: lang-bar arriba con dos botones. Cada string
  envuelta en `<span data-lang="en">…</span><span data-lang="es">…</span>`.
  Castellano **rioplatense** (vos / contanos / querés / ustedes — NO
  vosotros, NO "tú").

## 5 · Componentes interactivos en uso

- **Cursor smoke en hero (index.html)** — partículas de humo emanan del
  cursor al moverlo sobre el hero. Listener en `.hero`, zone con
  `pointer-events: none`. Bug crítico previo: si se vuelve a poner
  `pointer-events: auto` en `.smoke-zone` se bloquean clicks de los CTAs.
- **Smoke wisp on click** del CTA "Book an Asado" — wisps de humo
  realistas (multi-gradient, blur creciente) que rises del botón al
  hacer click, después navega a book.html.
- **Fire-on-hover** en `.btn-primary` — flames pseudo-element + glow
  pulsante + JS spawner de embers + wisps. Skip en touch / coarse pointer.
- **Doneness slider en menu.html** — drag rare→well done, SVG steak
  cambia color, readout cambia con idioma activo.
- **Stats counter animations** — IntersectionObserver dispara cuenta
  ascendente.

### Componentes eliminados (no volver a meter sin consultar)
- Heat meter (termómetro al hover en cortes) — **removido**, no volver.
- Marquee tickers de palabras (right-to-left) — **removidos**, no volver.
- Letter-by-letter reveal con `data-split` en h1s con spans bilingües
  adentro — no funciona, no usar.
- Fanzine cream / butcher-paper style — **rechazado** por el cliente,
  no volver.
- Sol de mayo gigante de fondo — **rechazado**.
- Foto `brothers.jpg` — **eliminada**, no usar.

## 6 · Mobile / responsivo

- **`--nav-h`** CSS variable: 78px desktop / 60px mobile. Drive nav
  height, hero min-height, nav-spacer, dropdown top.
- **Lang-bar fixed top:0** 26px de alto. Nav y hero corridos `var(--nav-h)`.
- **Brand-sub oculto en mobile**, `brand-mark` reducido a 0.92rem.
- **AR-badge oculto en mobile** (`display: none` ≤720px).
- **`100dvh`** fallback en hero min-height para el URL bar dinámico.
- **Doneness slider labels**: `.full` / `.abbr` para mobile (Med, Bien, etc).
- **Breakpoint extra ≤380px** para iPhone SE.

## 7 · Headers / Cloudflare

- **`_headers`** ya configurado: security headers, immutable cache en
  `/assets/*`, must-revalidate en HTML.
- **`/.gitignore`** ya excluye node_modules, .DS_Store, etc.

## 8 · ⚠️ EDICIONES PENDIENTES NO COMMITEADAS

> Lo que estaba en proceso cuando se llenó el contexto. Aplicar **todo
> esto** y después un solo `git commit -m "Copy refresh: 4-day notice,
> closed group pricing, drop cleanup/reschedule/cocktails/cigars"` + push.

### Ya editado localmente (verificar con git diff antes de seguir)
- ✅ `index.html` línea ~92-93 (value lead): quitado "no setup or cleanup"
  → "no setup". (Listo)
- ✅ `index.html` valor 04 "One price": "per-person" → "closed group
  price", quitado "cleanup" / "limpieza" de la lista. (Listo)
- ✅ `index.html` stat-strip: "6h Average asado" reemplazado por
  "1 Closed group price" / "Precio cerrado al grupo". (Listo)

### Falta editar todavía

**index.html**
- CTA banner (línea ~217-218): "We'll come back with a quote and a plan
  within 24 hours. Please book at least 3 days in advance." → reemplazar
  por: EN "We reply within 24 hours. Please book at least 4 days in
  advance." / ES "Te respondemos en 24 horas. Reservá con un mínimo de
  4 días de anticipación."

**experience.html**
- Línea ~70 (h2 split-body): "Un precio.<br/><em>Todo cubierto.</em>" →
  "Un precio cerrado.<br/><em>Todo cubierto.</em>"
- Línea ~73-74 (lead "single per-person quote"): cambiar a
  "single closed group price based on menu and headcount" / "precio
  cerrado al grupo según menú y cantidad de invitados".
- Línea ~94-95 (spec list "Setup & cleanup"): **eliminar todo el `<li>`.**
- Línea ~159-160 (Step 1): 3 días → 4 días en ambos idiomas.
- Línea ~167-168 (Step 2 desc "Within 24 hours. One per-person price…"):
  cambiar a "A closed group price, suggested menu, and venue plan if
  needed. We adjust until it fits." / "Un precio cerrado al grupo, menú
  sugerido y plan de lugar si lo necesitás. Ajustamos hasta que cierre."
  (sin "Within 24 hours" — ese tiempo solo en CTAs y book.html).
- Línea ~216-217 (FAQ Lluvia "We reschedule at no charge with 24h notice…"):
  **eliminar el `<li>` entero** (la pregunta y respuesta de la lluvia).
- Línea ~204-205 (FAQ "How far in advance"): cambiar a "Minimum 4 days
  before the event." / "Mínimo 4 días antes del evento." (sin "Two
  weeks…").

**menu.html**
- Línea ~243-244 ("One per-person price"): "One closed group price" /
  "Un precio cerrado al grupo".
- Línea ~247-248 ("Everything below is included in the quote. Tell us
  your headcount, we send the price."): mantener pero confirmar que
  encaja con pricing cerrado.
- Línea ~281 ("Setup & full cleanup — you don't wash a thing"):
  **eliminar el `<li>`**.
- Línea ~298-299 (CTA "send a quote within 24 hours"): cambiar a "We
  reply within 24 hours." / "Te respondemos en 24 horas."

**events.html**
- Línea ~72 (Airbnb card "4 hours, end to end"): **eliminar el `<li>`**.
- Línea ~76 (Airbnb card "We arrive 90 minutes before"): **eliminar el `<li>`**.
- Línea ~78 (Airbnb card "Cleanup included"): **eliminar el `<li>`**.
- Línea ~105 (Bachelor card "Welcome cocktail option"): **eliminar el `<li>`**.
- Línea ~106 (Bachelor card "Cigar pairing add-on"): **eliminar el `<li>`**.
- Línea ~123 (Wedding card "Welcome drinks & late dessert"): **eliminar
  el `<li>`** (bienvenida + postre tardío).
- Línea ~195-196 ("Please reach out at least 3 days before"): 3 → 4.
- Línea ~228-229 ("welcome cocktail before the meat? late-night fernet
  bar?"): quitar "welcome cocktail" — dejar "A late-night fernet bar?"
- Línea ~245-246 (CTA "we'll come back with a quote, a menu and a venue
  plan"): cambiar a "We reply within 24 hours." / "Te respondemos en 24
  horas."

**book.html**
- Línea ~59 (top notice "Please book at least 3 days in advance"): 3 → 4.
- Línea ~163-164 (response card "Within 24 hours, usually faster…
  Please book at least 3 days"): "usually faster" out, 3 → 4. Queda:
  EN "Within 24 hours. We reply in English and Spanish. Please book at
  least 4 days before the event." / ES "En 24 horas. Respondemos en
  inglés y español. Reservá con un mínimo de 4 días de anticipación."
- Línea ~188-189 (Step 1 desc "We reply with a per-person quote…"):
  "per-person quote" → "closed group price" en ambos idiomas.
- Línea ~213 (Step 4 "90 minutes before"): quitar el "90 minutos antes"
  / "90 minutes before". Queda: "We show up. You open the door. We do
  the rest." / "Llegamos. Vos abrís la puerta. Del resto nos encargamos."

**about.html**
- Línea ~86 (essay "we leave it clean"): quitar "we leave it clean" /
  "dejamos todo limpio". Queda: "We arrive, we light the fire, we feed
  the table." / "Llegamos, prendemos el fuego, alimentamos a la mesa."
- Línea ~221-222 (CTA "Send the basics — we'll come back with a quote
  within 24 hours"): cambiar a "We reply within 24 hours." / "Te
  respondemos en 24 horas."

### Después de aplicar todo
1. `git -C "C:/Users/facun/Documentos/Los Hermanos Parrilleros Web" status`
   para revisar la diff
2. Commit con mensaje claro
3. Push a `origin main`
4. Cloudflare redespliega en ~30 s automáticamente
5. Si el cliente no ve los cambios, sugerir hard refresh (Ctrl+F5) o
   bumpear `?v=2` → `?v=3` en las 6 HTML

## 9 · Archivos relacionados (fuera del repo)

- **Tarjeta de contacto PDFs/PNGs**: en `C:\Users\facun\Downloads\`:
  - `tarjeta_hermanos_parrilleros_pro_frente.pdf` / `.png`
  - `tarjeta_hermanos_parrilleros_pro_dorso.pdf` / `.png`
  - Generador: `C:\Users\facun\Downloads\_hp_card\generate.py`
  - Specs: 85×55mm exactos (sin sangrado, según pidió el cliente en la
    última iteración). Color CMYK, TrimBox/BleedBox/ArtBox definidos,
    sin transparencias, QR vector. Apunta a
    `https://loshermanosparrilleros.pages.dev/`.
  - El último cambio fue "corporativo" en lugar de "corporate" en el dorso.

## 10 · Cuenta Cloudflare

- Account email: `Facugoette8@gmail.com`
- Account ID: `4f89856a5226937703447c953cfee73a`
- Proyecto Pages: `loshermanosparrilleros`
- Para hacer cambios en CF Pages se puede usar la extensión "Claude in
  Chrome" si está disponible (el usuario tiene que aprobar permisos
  cada nuevo dominio).
