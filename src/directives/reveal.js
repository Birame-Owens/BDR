// v-reveal            → apparition vers le haut
// v-reveal="150"      → avec délai (ms)
// v-reveal:left / :right / :zoom → variantes
export default {
  mounted(el, binding) {
    el.classList.add('reveal', `reveal-${binding.arg || 'up'}`)
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
