# quantumjosh.me

A static web site based on Hugo theme [Toha](https://github.com/hugo-toha/toha). Basically a profile/portfolio site for Josh Gloria.

Some attributions:

- Background photo by Mitchell Luo on [Unsplash](https://unsplash.com/photos/FWoq_ldWlNQ)
- favicon generated from https://favicon.io/favicon-generator/
- Icons from Font Awesome https://fontawesome.com/license/free

See live at https://www.quantumjosh.me

## Customizations on top of Toha

Content lives in `data/en/` as YAML. The look is Toha's classic layout plus site-owned templates and styles:

| What | Where | Notes |
|---|---|---|
| Hero | `layouts/partials/sections/home.html` | **Overrides** the theme partial. Keeps the theme's typing-carousel markup (`#typed`, `#typing-carousel-data`). |
| Site script | `layouts/partials/scripts.html`, `assets/scripts/site.js` | **Overrides** the theme partial to add `site.js` (scroll reveal, active nav link). |
| About | `layouts/partials/sections/about-profile.html` | Selected with `template:` in `about.yaml`. Shows certification badges only. |
| Experience | `layouts/partials/sections/experience-timeline.html`, `layouts/partials/experience-timeline/` | Selected with `template:` in `experiences.yaml`. `expandedCount` sets how many companies show in full. |
| Projects | `layouts/partials/sections/projects-showcase.html`, `layouts/partials/projects-showcase/` | Selected with `template:` in `projects.yaml`. `featured: true` makes a project the large card. |
| Styles | `assets/styles/override.scss` → `assets/styles/site/` | Design tokens (colors, spacing, radius, motion) are in `_tokens.scss`; one partial per component. |

After upgrading the theme, compare the two **overridden** partials with the theme's new versions.

### Local preview

Requires Hugo (0.163+, extended or with Dart Sass on `PATH`), Go and Node.js.

```
npm install
hugo server
```

If a style change doesn't show up, restart `hugo server`: it can keep serving a cached stylesheet.
