// OVERRIDES the theme's assets/scripts/application.js (bundled by its script-bundle.html).
// Imports only what this one-page site uses. Dropped from the theme's version:
//   - Font Awesome's JS (every icon, ~1.2 MB): icons are inlined as SVG at build time
//     (layouts/partials/icon.html).
//   - Section scripts for sections this site doesn't render (education, achievements,
//     publications, the theme's projects/skills grids with Filterizr and the GitHub
//     star-button loader), the sidebar, and the note/search/single page scripts.
// Relative imports resolve to the theme's files. Re-check this list after theme upgrades.

import 'popper.js'
import 'bootstrap' // navbar collapse + theme dropdown
import feather from 'feather-icons' // navbar menu icon

import './core'
import './features' // theme (light/dark/system) switcher; disabled features are dropped at build time
import './sections/navbar'
import './pages/home' // hero typing tagline

import './site'

feather.replace()
