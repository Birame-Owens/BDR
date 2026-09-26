<script setup>
import AppIcon from './AppIcon.vue'

const steps = [
  { icon: 'chat', title: 'On échange', text: 'Un premier échange pour comprendre votre activité, vos objectifs et votre cible.' },
  { icon: 'target', title: 'On planifie', text: 'Stratégie de communication et calendrier éditorial validés ensemble chaque mois.' },
  { icon: 'pen', title: 'On crée & on publie', text: 'Captation, visuels, Reels, rédaction et programmation : vous n’avez rien à gérer.' },
  { icon: 'chart', title: 'On mesure & on ajuste', text: 'Rapport de performances et recommandations pour faire mieux le mois suivant.' },
]
</script>

<template>
  <section id="methode" class="process">
    <div class="container layout">
      <div v-reveal:left class="intro">
        <span class="eyebrow">Notre méthode</span>
        <h2>Simple, clair, <span class="grad-text">efficace</span></h2>
        <p>
          Vous gardez la main sur votre image, on s’occupe de tout le reste. Un accompagnement suivi, avec des
          résultats que vous pouvez mesurer chaque mois.
        </p>
      </div>

      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s.title" v-reveal="i * 120">
          <span class="n">{{ i + 1 }}</span>
          <div>
            <h3><AppIcon :name="s.icon" /> {{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--cream);
}

.layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: start;
  gap: 60px;
}

.intro {
  position: sticky;
  top: 120px;
}

.intro h2 {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
}

.intro p {
  margin-top: 18px;
  color: var(--muted);
  font-size: 1.08rem;
}

.steps {
  display: grid;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.steps li {
  display: flex;
  gap: 22px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  transition: transform 0.4s, box-shadow 0.4s, border-color 0.4s;
}

.steps li:hover {
  transform: translateX(10px);
  border-color: rgba(255, 90, 60, 0.35);
  box-shadow: var(--shadow);
}

.n {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  color: #fff;
  background: var(--navy);
  font-family: var(--display);
  font-size: 1.4rem;
  font-weight: 800;
  transition: background 0.4s;
}

.steps li:hover .n {
  background: var(--grad);
}

h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 1.2rem;
}

h3 svg {
  width: 20px;
  height: 20px;
  color: var(--coral);
}

p {
  color: var(--muted);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .intro {
    position: static;
    text-align: center;
  }

  .steps li {
    padding: 22px 18px;
  }
}
</style>
