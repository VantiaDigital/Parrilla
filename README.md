# Los Hermanos Parrilleros

Authentic Argentine asado catering in Barcelona — static website for English-speaking travelers, expats and event hosts.

**Live brand:** Bruno & Facundo Goette · Barcelona
**Domain:** loshermanosparrilleros.com

## Stack

Pure static HTML / CSS / JS. No build step, no dependencies. Deploy by uploading the folder to any static host (Netlify, Vercel, GitHub Pages, S3, plain shared hosting).

## Structure

```
.
├── index.html        # Home — hero, value props, brothers preview, stats, CTA
├── experience.html   # The asado timeline, what's included, where, how booking works, FAQ
├── menu.html         # Picada, achuras, cuts, sides, dessert, drinks + 3 set menus
├── events.html       # Airbnb, birthdays, bachelor/ette, weddings, corporate
├── about.html        # The brothers, the story, the rules they cook by
├── book.html         # Booking form → WhatsApp + direct contacts
└── assets/
    ├── styles.css    # Shared stylesheet
    ├── app.js        # Shared scripts (mobile nav, reveal, form → WhatsApp)
    └── images/
        └── asado-hero.jpg
```

## Booking flow

The form on `book.html` does **not** require a backend. It serializes its fields into a pre-filled WhatsApp message and opens `wa.me/<phone>?text=...` in a new tab. The phone number is configurable via the `data-phone` attribute on the form.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000
# or
npx serve .
```

## Brand

- Typography: Cormorant Garamond (display) + Inter (body)
- Palette: ink `#0a0807`, gold `#c9a55c`, ember `#c84a1f`
- Voice: confident, hospitality-first, light Spanish accents (cursos, fernet, picada) for authenticity

## Contact

- Bruno: +34 652 25 10 02 · brunogoette2002@gmail.com
- Facundo: +34 645 72 04 20 · facugoette8@gmail.com
