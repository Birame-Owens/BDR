<script setup>
const rowA = ['Stratégie digitale', 'Community management', 'Création de contenu', 'Reels & vidéos', 'Meta Ads', 'Site web']
const rowB = ['Instagram', 'Facebook', 'TikTok', 'Captation photo & vidéo', 'Événementiel', 'Campagnes de lancement']
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="row a">
      <div class="track">
        <template v-for="n in 2" :key="n">
          <span v-for="w in rowA" :key="w + n">{{ w }} <i>✦</i></span>
        </template>
      </div>
    </div>
    <div class="row b">
      <div class="track reverse">
        <template v-for="n in 2" :key="n">
          <span v-for="w in rowB" :key="w + n">{{ w }} <i>✦</i></span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  z-index: 2;
  margin-top: -40px;
  padding: 20px 0 10px;
  overflow: hidden;
}

.row {
  padding: 16px 0;
  overflow: hidden;
}

.a {
  background: var(--grad);
  color: #fff;
  transform: rotate(-2deg) scale(1.05);
  box-shadow: 0 20px 40px -20px rgba(255, 90, 60, 0.6);
}

.b {
  margin-top: -10px;
  background: #fff;
  color: var(--navy);
  transform: rotate(1.5deg) scale(1.05);
  border-block: 1px solid var(--line);
}

.track {
  display: flex;
  width: max-content;
  animation: scroll 35s linear infinite;
}

.track.reverse {
  animation-direction: reverse;
}

.track span {
  display: flex;
  align-items: center;
  gap: 28px;
  padding-right: 28px;
  font-family: var(--display);
  font-size: clamp(1.1rem, 2.4vw, 1.6rem);
  font-weight: 700;
  white-space: nowrap;
}

.track i {
  font-style: normal;
  opacity: 0.6;
}

.b i {
  color: var(--coral);
  opacity: 1;
}

.marquee:hover .track {
  animation-play-state: paused;
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
