<script setup>
import { onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { waLink } from '../config'

const bubble = ref(false)

onMounted(() => {
  setTimeout(() => (bubble.value = true), 4000)
  setTimeout(() => (bubble.value = false), 12000)
})
</script>

<template>
  <div class="wa-float">
    <Transition name="bubble">
      <div v-if="bubble" class="bubble">
        <button aria-label="Fermer" @click="bubble = false"><AppIcon name="close" /></button>
        <strong>Une question ? 👋</strong>
        <span>Discutons de votre projet sur WhatsApp !</span>
      </div>
    </Transition>

    <a :href="waLink()" target="_blank" rel="noopener" class="fab" aria-label="Nous contacter sur WhatsApp">
      <span class="pulse" />
      <span class="pulse p2" />
      <AppIcon name="whatsapp" />
    </a>
  </div>
</template>

<style scoped>
.wa-float {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.fab {
  position: relative;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: #fff;
  background: var(--wa);
  box-shadow: 0 14px 30px -8px rgba(37, 211, 102, 0.8);
  transition: transform 0.4s cubic-bezier(0.3, 1.8, 0.5, 1);
  animation: enter 0.8s 1s both cubic-bezier(0.3, 1.8, 0.5, 1);
}

.fab:hover {
  transform: scale(1.1) rotate(-8deg);
}

.fab svg {
  position: relative;
  width: 34px;
  height: 34px;
}

.pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--wa);
  animation: pulse 2.4s infinite;
}

.p2 {
  animation-delay: 1.2s;
}

@keyframes pulse {
  to {
    opacity: 0;
    transform: scale(1.8);
  }
}

@keyframes enter {
  from {
    opacity: 0;
    transform: scale(0);
  }
}

.bubble {
  position: relative;
  display: grid;
  gap: 2px;
  max-width: 240px;
  padding: 14px 36px 14px 16px;
  border-radius: 18px 18px 4px 18px;
  color: var(--ink);
  background: #fff;
  box-shadow: 0 20px 40px -12px rgba(22, 33, 62, 0.4);
  font-size: 0.88rem;
}

.bubble span {
  color: var(--muted);
}

.bubble button {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 4px;
  border: 0;
  border-radius: 50%;
  color: var(--muted);
  background: #f1f2f6;
}

.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1);
  transform-origin: bottom right;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: scale(0.6) translateY(10px);
}

@media (max-width: 520px) {
  .wa-float {
    right: 16px;
    bottom: 16px;
  }

  .fab {
    width: 58px;
    height: 58px;
  }
}
</style>
