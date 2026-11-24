// Site-level enhancements, bundled into the main script by assets/scripts/application.js.
// Everything here is progressive: without JS the page is fully readable.

const root = document.documentElement
root.classList.add('js')

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canObserve = 'IntersectionObserver' in window

// Reveal each section once as it scrolls into view. CSS only hides content while
// html.js-reveal is set, so skipping this (reduced motion, old browsers) shows everything.
function setUpReveal () {
  const targets = document.querySelectorAll('.section-holder > *')
  if (reduceMotion || !canObserve || targets.length === 0) return

  root.classList.add('js-reveal')
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })

  targets.forEach((target) => observer.observe(target))
}

// Highlight the navbar link of the section crossing the middle of the viewport.
function setUpActiveNav () {
  if (!canObserve) return

  const links = Array.from(document.querySelectorAll('#top-nav-items a.nav-link[href*="#"]'))
  const linkBySection = new Map()
  for (const link of links) {
    const id = decodeURIComponent(link.hash.slice(1))
    const section = id && document.getElementById(id)
    if (section && link.pathname === window.location.pathname) linkBySection.set(section, link)
  }
  if (linkBySection.size === 0) return

  const setActive = (activeLink) => {
    for (const link of links) {
      const isActive = link === activeLink
      link.classList.toggle('active', isActive)
      if (isActive) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    }
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) setActive(linkBySection.get(entry.target))
    }
  }, { rootMargin: '-45% 0px -50% 0px' })

  linkBySection.forEach((_, section) => observer.observe(section))
}

setUpReveal()
setUpActiveNav()
