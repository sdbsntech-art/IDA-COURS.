# SDBSNX (SDBSN Codes)

## Run locally on Replit

This is a static HTML/CSS/JavaScript site. Start its preview with:

```sh
python3 -m http.server 5000
```

Open `/` for the entry page. The progressive web app requires HTTPS or localhost for service-worker installation; the Replit preview provides the secure context.

## PWA and security

- `manifest.webmanifest`, `sw.js`, and `pwa.js` provide install metadata and an offline cache for the static site.
- The primary SEO URL is `https://ida-cours.netlify.app/index.htm`; `robots.txt` and `sitemap.xml` use that domain.
- The homepage targets SDBSNX/SDBSN Codes, web development and computing learners, including IDA and UNCHK (ex-UVS) queries. Search ranking is not guaranteed by metadata alone.
- `_headers` applies browser security headers when the site is deployed to Netlify. GitHub Pages does not apply Netlify `_headers` rules.
- The static security policy allows inline scripts/styles because the existing legal pages still contain inline code; this is a remaining hardening opportunity.
- This project has no server-side authentication, data store, or API. The contact form sends directly to its existing Formspree endpoint.
