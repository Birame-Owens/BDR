<script setup>
import AppIcon from './AppIcon.vue'

const services = [
  { icon: 'target', title: 'Stratégie de communication', text: 'Positionnement, objectifs, ligne éditoriale et calendrier : une feuille de route claire pour chaque mois.' },
  { icon: 'pen', title: 'Création de contenu', text: 'Visuels, carrousels, légendes et stories aux couleurs de votre marque, pensés pour capter l’attention.' },
  { icon: 'video', title: 'Reels & captation vidéo', text: 'On se déplace, on filme, on monte : des vidéos courtes dynamiques qui font grandir votre audience.' },
  { icon: 'chat', title: 'Community management', text: 'Animation des commentaires, gestion des messages privés et veille : votre communauté n’est jamais laissée sans réponse.' },
  { icon: 'megaphone', title: 'Publicité Meta Ads', text: 'Campagnes Facebook & Instagram ciblées, suivies et optimisées pour toucher les bons clients.' },
  { icon: 'globe', title: 'Site web', text: 'Création et gestion de votre site pour une présence professionnelle au-delà des réseaux sociaux.' },
  { icon: 'print', title: 'Supports print', text: 'Flyers, affiches, bannières : une identité cohérente du digital jusqu’au terrain.' },
  { icon: 'calendar', title: 'Couverture d’événements', text: 'Captation, stories en direct et Reel récapitulatif pour faire vivre vos événements en ligne.' },
]

function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="services" class="services">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="eyebrow">Nos services</span>
        <h2>Tout ce qu’il faut pour <span class="grad-text">briller en ligne</span></h2>
        <p>De la stratégie à la publication, en passant par la vidéo et la publicité : une seule équipe pour toute votre communication digitale.</p>
      </div>

      <div class="grid">
        <article
          v-for="(s, i) in services"
          :key="s.title"
          v-reveal="(i % 4) * 90"
          class="card"
          @mousemove="onMove"
        >
          <span class="num">0{{ i + 1 }}</span>
          <span class="icon"><AppIcon :name="s.icon" /></span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding-top: 90px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  padding: 30px 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s, border-color 0.4s;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(260px circle at var(--mx) var(--my), rgba(255, 90, 60, 0.13), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s;
}

.card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 90, 60, 0.35);
  box-shadow: var(--shadow);
}

.card:hover::before {
  opacity: 1;
}

.card > * {
  position: relative;
}

.num {
  position: absolute;
  top: 22px;
  right: 24px;
  color: rgba(22, 33, 62, 0.12);
  font-family: var(--display);
  font-size: 2rem;
  font-weight: 800;
  transition: color 0.4s;
}

.card:hover .num {
  color: rgba(255, 90, 60, 0.3);
}

.icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 22px;
  border-radius: 16px;
  color: var(--coral);
  background: rgba(255, 90, 60, 0.1);
  transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.5, 1), background 0.4s, color 0.4s;
}

.icon svg {
  width: 26px;
  height: 26px;
}

.card:hover .icon {
  color: #fff;
  background: var(--grad);
  transform: rotate(-8deg) scale(1.1);
}

h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

p {
  color: var(--muted);
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
