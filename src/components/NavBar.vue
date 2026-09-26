<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { waLink } from '../config'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#offres', label: 'Offres' },
  { href: '#lancement', label: 'Lancement' },
  { href: '#methode', label: 'Méthode' },
  { href: '#contact', label: 'Contact' },
]

const scrolled = ref(false)
const open = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 30)

watch(open, (v) => (document.body.style.overflow = v ? 'hidden' : ''))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled, open }">
    <div class="container nav-inner">
      <a href="#top" class="logo" @click="open = false">
        <span class="logo-mark">B</span>
        <span>BDR<span class="logo-dot">.</span><small>Agency</small></span>
      </a>

      <nav class="links" aria-label="Navigation principale">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <a :href="waLink()" target="_blank" rel="noopener" class="btn btn-wa nav-cta">
        <AppIcon name="whatsapp" /> Discutons
      </a>

      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <AppIcon :name="open ? 'close' : 'menu'" />
      </button>
    </div>

    <Transition name="drawer">
      <div v-if="open" class="drawer">
        <a
          v-for="(l, i) in links"
          :key="l.href"
          :href="l.href"
          :style="{ transitionDelay: `${i * 60 + 100}ms` }"
          @click="open = false"
        >
          <span>0{{ i + 1 }}</span>{{ l.label }}
        </a>
        <a :href="waLink()" target="_blank" rel="noopener" class="btn btn-wa btn-block" @click="open = false">
          <AppIcon name="whatsapp" /> Écrire sur WhatsApp
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding: 18px 0;
  transition: padding 0.4s, background 0.4s, box-shadow 0.4s;
}

.nav.scrolled,
.nav.open {
  padding: 10px 0;
  background: rgba(22, 33, 62, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}

.logo small {
  margin-left: 6px;
  font-family: var(--font);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.7;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--grad);
  font-size: 1.2rem;
  transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.logo:hover .logo-mark {
  transform: rotate(-12deg) scale(1.08);
}

.logo-dot {
  color: var(--coral);
}

.links {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.links a {
  position: relative;
  padding: 8px 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.links a::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--coral);
  transform: scaleX(0);
  transition: transform 0.35s;
}

.links a:hover {
  color: #fff;
}

.links a:hover::after {
  transform: scaleX(1);
}

.nav-cta {
  padding: 11px 20px;
  font-size: 0.92rem;
}

.burger {
  display: none;
  margin-left: auto;
  padding: 8px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.burger svg {
  width: 26px;
  height: 26px;
}

.drawer {
  position: fixed;
  inset: 64px 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 30px 20px;
  background: var(--navy);
  overflow-y: auto;
}

.drawer a:not(.btn) {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 14px 0;
  color: #fff;
  font-family: var(--display);
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: opacity 0.4s, transform 0.4s;
}

.drawer a span {
  color: var(--coral);
  font-size: 0.9rem;
}

.drawer .btn {
  margin-top: 28px;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.35s, clip-path 0.5s cubic-bezier(0.7, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}

.drawer-enter-from a:not(.btn) {
  opacity: 0;
  transform: translateY(20px);
}

.drawer-enter-to,
.drawer-leave-from {
  clip-path: inset(0 0 0 0);
}

@media (max-width: 900px) {
  .links,
  .nav-cta {
    display: none;
  }

  .burger {
    display: grid;
  }
}
</style>
