<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { packs } from '../data/offers'
import { waLink } from '../config'

// Chaque réponse pointe vers le niveau de pack minimum (0 = Starter … 3 = 360°)
const questions = [
  {
    q: 'Sur combien de réseaux sociaux voulez-vous être présent ?',
    answers: [
      { label: '1 seul', level: 0 },
      { label: '2 réseaux', level: 1 },
      { label: '3 réseaux', level: 2 },
      { label: '4 ou plus', level: 3 },
    ],
  },
  {
    q: 'Quelle place pour la vidéo (Reels, TikTok) ?',
    answers: [
      { label: 'Pas besoin pour l’instant', level: 0 },
      { label: 'Quelques vidéos par mois', level: 1 },
      { label: 'Beaucoup de vidéos + tournages', level: 2 },
    ],
  },
  {
    q: 'Avez-vous besoin de publicité ou d’actions terrain ?',
    answers: [
      { label: 'Non, du contenu organique', level: 0 },
      { label: 'Oui, des campagnes Meta Ads', level: 2 },
      { label: 'Pub + événements + print', level: 3 },
    ],
  },
]

const step = ref(0)
const picks = ref([])

const done = computed(() => step.value >= questions.length)
const result = computed(() => packs[Math.max(0, ...picks.value)])

function choose(level) {
  picks.value[step.value] = level
  step.value++
}

function restart() {
  step.value = 0
  picks.value = []
}
</script>

<template>
  <section class="finder">
    <div class="container">
      <div v-reveal:zoom class="box">
        <div class="intro">
          <span class="eyebrow on-dark">Vous hésitez ?</span>
          <h2>Trouvez votre pack <span class="grad-text">en 3 clics</span></h2>
          <div class="dots">
            <span v-for="(_, i) in questions" :key="i" :class="{ on: i < step, cur: i === step }" />
          </div>
        </div>

        <div class="stage">
          <Transition name="slide" mode="out-in">
            <div v-if="!done" :key="step" class="question">
              <small>Question {{ step + 1 }} / {{ questions.length }}</small>
              <h3>{{ questions[step].q }}</h3>
              <div class="answers">
                <button v-for="a in questions[step].answers" :key="a.label" @click="choose(a.level)">
                  {{ a.label }} <AppIcon name="arrow" />
                </button>
              </div>
            </div>

            <div v-else key="result" class="result">
              <small>Notre recommandation</small>
              <h3>Pack <span class="grad-text">{{ result.name }}</span></h3>
              <p class="price">{{ result.from ? 'à partir de ' : '' }}{{ result.price }} F CFA / mois</p>
              <p>{{ result.ideal }}</p>
              <div class="res-ctas">
                <a
                  :href="waLink(`Bonjour BDR Agency 👋, le simulateur de votre site me recommande le Pack ${result.name}. J'aimerais en savoir plus !`)"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-wa"
                >
                  <AppIcon name="whatsapp" /> En parler sur WhatsApp
                </a>
                <button class="btn btn-ghost on-dark" @click="restart">Recommencer</button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.finder {
  padding: 20px 0 110px;
  background: #fff;
}

.box {
  position: relative;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 50px;
  padding: 56px;
  border-radius: 32px;
  color: #fff;
  background: var(--navy);
  overflow: hidden;
}

.box::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  top: -200px;
  left: -100px;
  border-radius: 50%;
  background: var(--coral);
  filter: blur(100px);
  opacity: 0.35;
}

.box > * {
  position: relative;
}

.eyebrow.on-dark {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
}

.dots {
  display: flex;
  gap: 8px;
  margin-top: 30px;
}

.dots span {
  width: 34px;
  height: 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  transition: background 0.4s, width 0.4s;
}

.dots .on {
  background: var(--coral);
}

.dots .cur {
  width: 56px;
  background: rgba(255, 255, 255, 0.6);
}

.stage {
  min-height: 280px;
}

small {
  color: var(--coral-2);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3 {
  margin: 10px 0 24px;
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
}

.answers {
  display: grid;
  gap: 12px;
}

.answers button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
  text-align: left;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
}

.answers button svg {
  width: 20px;
  height: 20px;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.answers button:hover {
  border-color: var(--coral);
  background: rgba(255, 90, 60, 0.15);
  transform: translateX(6px);
}

.answers button:hover svg {
  opacity: 1;
  transform: none;
}

.result h3 {
  margin-bottom: 6px;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.result .price {
  margin-bottom: 14px;
  font-weight: 700;
}

.result p:not(.price) {
  color: rgba(255, 255, 255, 0.7);
}

.res-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

@media (max-width: 860px) {
  .box {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 36px 22px;
  }

  .res-ctas .btn {
    width: 100%;
  }
}
</style>
