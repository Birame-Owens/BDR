<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// Chiffres maximum repris du Pack 360°
const stats = [
  { value: 4, label: 'réseaux sociaux gérés', prefix: "jusqu'à" },
  { value: 20, label: 'publications par mois', prefix: "jusqu'à" },
  { value: 30, label: 'stories par mois', prefix: "jusqu'à" },
  { value: 8, label: 'Reels & vidéos courtes', prefix: "jusqu'à" },
]

const root = ref(null)
const shown = ref(stats.map(() => 0))
let io

function animate() {
  const start = performance.now()
  const duration = 1600
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = stats.map((s) => Math.round(s.value * eased))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        animate()
        io.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  io.observe(root.value)
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <div ref="root" class="band dark">
    <div class="container grid">
      <div v-for="(s, i) in stats" :key="s.label" v-reveal="i * 100" class="stat">
        <small>{{ s.prefix }}</small>
        <strong class="grad-text">{{ shown[i] }}</strong>
        <span>{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.band {
  position: relative;
  padding: 70px 0;
  overflow: hidden;
}

.band::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 90, 60, 0.25), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(91, 75, 255, 0.2), transparent 50%);
}

.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat + .stat {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

small {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

strong {
  font-family: var(--display);
  font-size: clamp(3rem, 7vw, 4.8rem);
  font-weight: 800;
  line-height: 1.1;
}

span {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 20px;
  }

  .stat:nth-child(3) {
    border-left: 0;
  }
}
</style>
