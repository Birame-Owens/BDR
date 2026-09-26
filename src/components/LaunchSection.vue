<script setup>
import AppIcon from './AppIcon.vue'
import { launch } from '../data/offers'
import { waLink } from '../config'

const quote =
  'Bonjour BDR Agency 👋, je prépare un lancement (produit / service / marque) et je souhaite un devis pour le Pack Campagne de lancement.'
</script>

<template>
  <section id="lancement" class="launch dark">
    <div class="glow" aria-hidden="true" />
    <div class="container">
      <div v-reveal class="section-head">
        <span class="eyebrow">Pack Campagne de lancement · Sur devis</span>
        <h2>Un lancement qui <span class="grad-text">fait du bruit</span></h2>
        <p>
          Une formule complète pour accompagner le lancement d’un produit, d’un service, d’une marque ou d’un nouveau
          projet. Durée définie selon vos besoins.
        </p>
      </div>

      <ol v-reveal class="timeline">
        <li v-for="(s, i) in launch.steps" :key="s.title" :style="{ '--d': `${i * 0.25 + 0.3}s` }">
          <span class="node"><AppIcon :name="s.icon" /></span>
          <small>Étape {{ i + 1 }}</small>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>

      <div class="bottom">
        <div v-reveal:left class="included">
          <h3>Ce qui est inclus</h3>
          <ul>
            <li v-for="f in launch.features" :key="f"><AppIcon name="check" /> {{ f }}</li>
          </ul>
        </div>

        <div v-reveal:right class="quote">
          <AppIcon name="rocket" class="rocket" />
          <h3>Tarif sur devis</h3>
          <p>Selon la durée, le volume de contenus, la couverture événementielle et le budget publicitaire choisi.</p>
          <a :href="waLink(quote)" target="_blank" rel="noopener" class="btn btn-primary btn-block">
            Demander un devis <AppIcon name="arrow" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.launch {
  overflow: hidden;
}

.glow {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 900px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 90, 60, 0.22), transparent 70%);
  transform: translateX(-50%);
  pointer-events: none;
}

.launch .eyebrow {
  color: var(--coral-2);
}

/* ---------- Frise ---------- */
.timeline {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0 0 80px;
  padding: 0;
  list-style: none;
}

.timeline::before,
.timeline::after {
  content: '';
  position: absolute;
  top: 32px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
}

.timeline::after {
  background: var(--grad);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s 0.3s cubic-bezier(0.6, 0, 0.2, 1);
}

.timeline.is-visible::after {
  transform: scaleX(1);
}

.timeline li {
  position: relative;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s var(--d), transform 0.7s var(--d);
}

.timeline.is-visible li {
  opacity: 1;
  transform: none;
}

.node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 66px;
  height: 66px;
  margin: 0 auto 18px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  background: var(--navy-2);
  transition: transform 0.4s, background 0.4s, border-color 0.4s;
}

.node svg {
  width: 28px;
  height: 28px;
  color: var(--coral-2);
  transition: color 0.4s;
}

.timeline li:hover .node {
  border-color: transparent;
  background: var(--grad);
  transform: scale(1.12) rotate(-8deg);
}

.timeline li:hover .node svg {
  color: #fff;
}

.timeline small {
  color: var(--coral-2);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.timeline h3 {
  margin: 6px 0 8px;
  font-size: 1.35rem;
}

.timeline p {
  max-width: 240px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.92rem;
}

/* ---------- Bas ---------- */
.bottom {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
}

.included,
.quote {
  padding: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
}

.included h3,
.quote h3 {
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.included ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.included li {
  display: flex;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.92rem;
}

.included svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  color: var(--coral-2);
  stroke-width: 3;
}

.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(160deg, rgba(255, 90, 60, 0.18), rgba(255, 255, 255, 0.03));
}

.quote h3 {
  margin-bottom: 10px;
}

.quote p {
  margin-bottom: 26px;
  color: rgba(255, 255, 255, 0.7);
}

.rocket {
  width: 44px;
  height: 44px;
  margin-bottom: 18px;
  color: var(--coral-2);
  animation: launch 3s ease-in-out infinite;
}

@keyframes launch {
  50% {
    transform: translate(6px, -8px);
  }
}

@media (max-width: 900px) {
  .timeline {
    grid-template-columns: 1fr;
    gap: 34px;
    padding-left: 10px;
  }

  .timeline::before,
  .timeline::after {
    top: 0;
    bottom: 0;
    left: 42px;
    right: auto;
    width: 2px;
    height: auto;
    transform-origin: top;
  }

  .timeline::after {
    transform: scaleY(0);
  }

  .timeline.is-visible::after {
    transform: scaleY(1);
  }

  .timeline li {
    display: grid;
    grid-template-columns: 66px 1fr;
    column-gap: 20px;
    text-align: left;
  }

  .node {
    grid-row: span 3;
    margin: 0;
  }

  .timeline p {
    max-width: none;
    margin: 0;
  }

  .bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .included,
  .quote {
    padding: 26px 20px;
  }

  .included ul {
    grid-template-columns: 1fr;
  }
}
</style>
