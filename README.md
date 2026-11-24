# quantumjosh.me

A static web site based on Hugo theme [Toha](https://github.com/hugo-toha/toha). Basically a profile/portfolio site for Josh Gloria.

Some attributions:

- Icons from Font Awesome https://fontawesome.com/license/free
- Certification badge images from [Credly](https://www.credly.com), linked to their verification pages

See live at https://www.quantumjosh.me

## Customizations on top of Toha

Content lives in `data/en/` as YAML. The look is Toha's classic layout plus site-owned templates and styles.

**Overrides** of theme files (compare them with the theme's new versions after upgrading it):

| File | Why |
|---|---|
| `layouts/index.html` | Homepage: descriptive `<title>`, social and structured metadata, skip link, `<main>` and `<section>` landmarks. |
| `layouts/partials/sections/home.html` | Hero. Keeps the theme's typing-carousel markup (`#typed`, `#typing-carousel-data`). |
| `assets/scripts/application.js` | Imports only the theme scripts this site uses, plus `site.js` (scroll reveal, active nav link). Drops Font Awesome's JS. |

**Site-owned templates** (selected with `template:` in the section's YAML, or in `config.yaml`):

| What | Where | Notes |
|---|---|---|
| About | `layouts/partials/sections/about-profile.html` | Shows certification badges only. Local badge images (`assets/images/badges/`) are resized to WebP. |
| Skills | `layouts/partials/sections/skills-grid.html`, `layouts/partials/skills-grid/` | Card grid with decorative icons. |
| Experience | `layouts/partials/sections/experience-timeline.html`, `layouts/partials/experience-timeline/` | `expandedCount` sets how many companies show in full. |
| Projects | `layouts/partials/sections/projects-showcase.html`, `layouts/partials/projects-showcase/` | `featured: true` makes a project the large card. |
| Footer | `layouts/partials/site-footer.html` | Set by `params.footer.template` in `config.yaml`. |
| Icons | `layouts/partials/icon.html` | Inlines Font Awesome SVGs at build time, e.g. `{{ partial "icon.html" "fab fa-github" }}`. |
| SEO | `layouts/partials/seo/`, `layouts/robots.txt` | Open Graph/Twitter tags, JSON-LD (WebSite + ProfilePage/Person), favicons. Settings in `data/en/site.yaml` → `seo`. |
| Styles | `assets/styles/override.scss` → `assets/styles/site/` | Design tokens (colors, spacing, radius, motion) are in `_tokens.scss`; one partial per component. |

In `config.yaml`, every theme feature is listed with `enable: true/false`. Keep it that way: the theme's bundler only drops a feature's JavaScript (KaTeX, Plyr, highlight.js, ...) when its flag is explicitly `false`.

The social sharing image is `assets/images/site/social-card.png` (1200×630). Regenerate it if the name or role changes.

### Local preview

Requires Hugo (0.163+, extended or with Dart Sass on `PATH`), Go and Node.js.

```
npm install
hugo server
```

If a style change doesn't show up, restart `hugo server`: it can keep serving a cached stylesheet.

### Hosting

Hosted on Firebase Hosting (project `quantumjoshdotme`, set in `.firebaserc`). `firebase.json` serves real 404s (no catch-all rewrite) and sets long cache lifetimes for the fingerprinted CSS/JS.

**One-time setup:**

```
npm install -g firebase-tools
firebase login
```

**Deploy:**

```
hugo --gc --minify --cleanDestinationDir
firebase deploy --only hosting
```

`--cleanDestinationDir` empties `public/` first, so files from older builds don't get uploaded.

**Preview before going live (optional):**

```
firebase hosting:channel:deploy preview
```

This prints a temporary URL. Run `firebase deploy --only hosting` once it looks right.
