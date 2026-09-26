<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBand from './components/MarqueeBand.vue'
import ServicesSection from './components/ServicesSection.vue'
import StatsBand from './components/StatsBand.vue'
import OffersSection from './components/OffersSection.vue'
import PackFinder from './components/PackFinder.vue'
import LaunchSection from './components/LaunchSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'

const progress = ref(0)

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? window.scrollY / max : 0
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" />
  <NavBar />
  <main>
    <HeroSection />
    <MarqueeBand />
    <ServicesSection />
    <StatsBand />
    <OffersSection />
    <PackFinder />
    <LaunchSection />
    <ProcessSection />
    <ContactSection />
  </main>
  <FooterSection />
  <WhatsAppFloat />
</template>

<style>
.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  z-index: 200;
  height: 3px;
  background: var(--grad);
  transform-origin: left;
}
</style>
