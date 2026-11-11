# VENDERS.CO website

A lightweight, responsive static website for a South African digital-services startup serving businesses at different stages. Built with HTML, CSS and plain JavaScript; no build step or package installation is required. Industry examples are fictional demonstration sites, not customer work.

## Preview locally

- Fastest, no-install preview: open `index.html` from File Explorer, or in VS Code right-click it and choose **Open in Default Browser**. Relative navigation, CSS, JavaScript and nested demos work in current desktop browsers.
- For a local web server (recommended when testing clipboard behaviour): from this project folder run `python -m http.server 8000` in a terminal, then visit `http://localhost:8000/`. This requires Python to be installed.
- Use the homepage bubbles to reach project pricing and the seven demo categories. The shared header keeps Services, About, Contact and the quote action; pricing and demo links are intentionally omitted from it.
- Stop a running Python server with Ctrl+C.

Opening HTML files directly with `file://` may limit browser APIs such as clipboard access. The form still displays the prepared enquiry text for manual copying.

## Project structure

- `index.html` — minimal homepage with categorized demo and pricing bubbles.
- `services.html`, `designs.html`, `pricing.html`, `about.html`, `contact.html` — primary information and conversion pages.
- `privacy.html`, `terms.html` — honest launch-draft policy pages; review before going live.
- `demos/glow-studio/` — protected fictional salon demo with its own visual style.
- `demos/karoo-kitchen/` — protected fictional restaurant/takeaway demo with sample menu.
- `demos/veld-build/` — protected fictional contractor/home-services demo with project concepts.
- `demos/wizard-motors/` — automotive concept with client-side inventory filters, vehicle details and demo enquiries.
- `demos/form-01/` — fashion storefront concept with product variants, a session bag and demo checkout.
- `demos/haven-property-group/` — property concept with sample search, detail galleries and viewing requests.
- `demos/kalahari-house/` — hospitality concept with room details and a sample stay enquiry.
- `assets/demo-photo-sources.txt` — provenance and license notes for the four added demo image sets.
- `assets/css/styles.css` — shared main-site design system and responsive rules.
- `assets/js/config.js` — single place for business email, WhatsApp, TikTok and canonical site URL.
- `assets/js/pricing.js` — central pricing and scope configuration. The price cards render from this data.
- `assets/js/main.js` — mobile navigation, industry filters, quote form hand-off and TikTok-link fallback.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.svg` — deployment metadata and browser assets.

## Updating content and prices

- Edit service descriptions in `services.html` and industry descriptions in `designs.html`.
- Update prices, audience, page/product scope, revisions and exclusions in `assets/js/pricing.js`. Both the homepage preview and pricing page render from this shared data.
- Change the theme in `assets/css/styles.css` under `:root` (`--ink`, `--paper`, `--blue`, `--cyan`, `--violet`, `--coral`, spacing, typography, radius and shadow tokens). The main site uses a midnight navy / electric blue / cyan system. Demo sites have intentionally independent industry palettes in their own `style.css` files, with a shared VENDERS.CO demo ribbon.
- Business contact and social URLs belong only in `assets/js/config.js`. Add verified details only. WhatsApp should be international digits with no plus sign or punctuation (example format: `27XXXXXXXXX`, not a real number). Email should be a real inbox. TikTok must be the actual public profile URL. `siteUrl` should be the canonical HTTPS deployment URL.
- The contact form works locally in the browser but does not send or store information. Once configured it exposes WhatsApp and/or email hand-offs; otherwise it lets a visitor copy the prepared enquiry. No backend or form provider is connected.

## Adding an industry demo

1. Add a distinct, fictional demo under `demos/<short-name>/` with an `index.html`, its own `style.css` and a local interaction script where needed.
2. Link back using relative paths, e.g. `../../index.html` and `../../designs.html`, so the pages continue working on GitHub Pages project subpaths.
3. Clearly label sample business details as fictional. Do not suggest the example is a client project.
4. Add a category card in `designs.html`, a filter button only if a new filter category is needed, and a homepage link if relevant.
5. Check all relative paths both at the root and under a project subdirectory.

## Deploying

The project is static and compatible with GitHub Pages, Netlify or similar hosting.

- GitHub Pages: push the folder to a repository, enable Pages for the selected branch/folder, then use its provided project URL. Relative internal links and assets support deployment below the domain root.
- Before launch, replace `YOUR-DOMAIN.example` in `robots.txt` and `sitemap.xml`, and set the verified canonical URL in `assets/js/config.js`. Submit the sitemap to search tools after the production site is reachable.
- HTTPS should be enabled by the chosen host. No server-side secrets or API keys are used.
- A remote Google Fonts stylesheet is currently used by the main site and demos. For a fully self-hosted version, use an appropriately licensed local font or system stack and remove the `@import` requests.

## Before launch checklist

- [ ] Confirm the legal operator/business name and verified contact information.
- [ ] Set real WhatsApp number, email, TikTok profile and canonical URL in `assets/js/config.js`.
- [ ] Test WhatsApp and email links on real mobile devices; confirm the message text and destination.
- [ ] Verify pricing, inclusions, revision counts, exclusions, scope and payment terms are sustainable and accurate.
- [ ] Test all seven demos, menu/filters, internal links, responsive navigation and form validation.
- [ ] Review every page at mobile, tablet and desktop widths, including keyboard navigation and reduced motion.
- [ ] Replace domain placeholders in `robots.txt` and `sitemap.xml`; verify the sitemap URL paths for the deployed host.
- [ ] Confirm domain ownership, HTTPS, hosting costs, favicon, social share preview and deployment subdirectory behaviour.
- [ ] Complete and independently review privacy and service terms against actual operating practices and applicable legal requirements.
- [ ] Decide on a contact form backend only if needed; document retention, access and third-party processing before collecting data.
- [ ] Confirm all demo details remain clearly fictional and all illustrations/assets have appropriate usage rights.
- [ ] Check that no testimonials, results, credentials or service capabilities have been introduced without evidence.

## Current limitations

There is no backend, database, analytics, live booking/order system or payment integration. Fictional demo businesses cannot accept real bookings, food orders, vehicle enquiries, property viewing requests or stay enquiries. Store-cart and form interactions are client-side demonstrations only; they do not create orders, reservations, payments, stock holds, deliveries or messages. Digital marketing services are explicitly marked as planned, not currently bookable. The legal pages are launch drafts, not independently reviewed legal advice.
