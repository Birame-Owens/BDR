<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { waLink } from '../config'

const words = ['visibilité', 'engagement', 'clients', 'impact']
const index = ref(0)
const likes = ref(1284)
const liked = ref(false)
const tilt = ref({ x: 0, y: 0 })

let wordTimer, likeTimer

onMounted(() => {
  wordTimer = setInterval(() => (index.value = (index.value + 1) % words.length), 2400)
  likeTimer = setInterval(() => {
    likes.value += Math.ceil(Math.random() * 7)
    liked.value = true
    setTimeout(() => (liked.value = false), 700)
  }, 1800)
})

onUnmounted(() => {
  clearInterval(wordTimer)
  clearInterval(likeTimer)
})

function onMove(e) {
  if (window.matchMedia('(hover: none)').matches) return
  const r = e.currentTarget.getBoundingClientRect()
  tilt.value = {
    x: ((e.clientX - r.left) / r.width - 0.5) * 14,
    y: ((e.clientY - r.top) / r.height - 0.5) * -14,
  }
}

const stories = ['Coulisses', 'Nouveau', 'Avis', 'Promo', 'Équipe']
</script>

<template>
  <section id="top" class="hero dark">
    <div class="bg" aria-hidden="true">
      <span class="blob b1" />
      <span class="blob b2" />
      <span class="blob b3" />
      <span class="grid" />
    </div>

    <div class="container hero-inner">
      <div class="copy">
        <span class="eyebrow hero-eyebrow"><span class="live" /> Agence de communication digitale</span>

        <h1>
          Donnons à votre marque
          <span class="line2">
            plus de
            <span class="rotator">
              <Transition name="word" mode="out-in">
                <span :key="index" class="grad-text">{{ words[index] }}</span>
              </Transition>
            </span>
          </span>
        </h1>

        <p class="lead">
          <strong>BDR Agency</strong> prend en main la communication et le marketing digital de votre entreprise :
          stratégie, contenus, Reels, community management, publicité Meta et site web. Vous vous concentrez sur
          votre métier, on fait parler de vous.
        </p>

        <div class="ctas">
          <a :href="waLink()" target="_blank" rel="noopener" class="btn btn-wa">
            <AppIcon name="whatsapp" /> Parlons de votre projet
          </a>
          <a href="#offres" class="btn btn-ghost">Voir nos offres <AppIcon name="arrow" /></a>
        </div>

        <ul class="platforms">
          <li><AppIcon name="instagram" /> Instagram</li>
          <li><AppIcon name="facebook" /> Facebook</li>
          <li><AppIcon name="tiktok" /> TikTok</li>
          <li><AppIcon name="megaphone" /> Meta Ads</li>
        </ul>
      </div>

      <div class="visual" @mousemove="onMove" @mouseleave="tilt = { x: 0, y: 0 }">
        <div class="phone" :style="{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }">
          <div class="notch" />
          <div class="screen">
            <div class="profile">
              <span class="avatar">B</span>
              <div>
                <strong>votre.marque</strong>
                <small>Sponsorisé</small>
              </div>
            </div>

            <div class="stories">
              <div v-for="(s, i) in stories" :key="s" class="story" :style="{ animationDelay: `${i * 0.2}s` }">
                <span class="ring"><span /></span>
                <small>{{ s }}</small>
              </div>
            </div>

            <div class="post">
              <div class="post-img">
                <span class="shape s1" />
                <span class="shape s2" />
                <span class="post-title">NOUVELLE<br />COLLECTION</span>
                <Transition name="pop">
                  <AppIcon v-if="liked" name="heart" class="big-heart" />
                </Transition>
              </div>
              <div class="actions">
                <AppIcon name="heart" :class="{ beat: liked }" class="heart" />
                <AppIcon name="chat" />
                <AppIcon name="send" />
                <AppIcon name="bookmark" class="right" />
              </div>
              <strong class="likes">{{ likes.toLocaleString('fr-FR') }} J'aime</strong>
              <span class="bar w80" />
              <span class="bar w55" />
            </div>
          </div>
        </div>

        <div class="chip c1"><AppIcon name="trending" /> Portée en hausse</div>
        <div class="chip c2"><AppIcon name="video" /> Reel publié</div>
        <div class="chip c3"><AppIcon name="chat" /> Nouveau message</div>
      </div>
    </div>

    <a href="#services" class="scroll-cue" aria-label="Défiler vers les services"><span /></a>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 130px 0 90px;
  overflow: hidden;
}

.bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  animation: float 14s ease-in-out infinite alternate;
}

.b1 {
  width: 520px;
  height: 520px;
  top: -140px;
  right: -120px;
  background: var(--coral);
}

.b2 {
  width: 420px;
  height: 420px;
  bottom: -160px;
  left: -120px;
  background: #5b4bff;
  opacity: 0.35;
  animation-delay: -5s;
}

.b3 {
  width: 260px;
  height: 260px;
  top: 40%;
  left: 45%;
  background: #ffb36b;
  opacity: 0.25;
  animation-delay: -9s;
}

.grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
}

@keyframes float {
  to {
    transform: translate(60px, 40px) scale(1.15);
  }
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 60px;
}

.hero-eyebrow {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  animation: fadeUp 0.8s both;
}

.live {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--wa);
  box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  animation: ping 1.8s infinite;
}

@keyframes ping {
  70% {
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}

h1 {
  font-size: clamp(2.5rem, 6.2vw, 4.8rem);
  font-weight: 800;
  animation: fadeUp 0.9s 0.1s both;
}

.line2 {
  display: block;
}

.rotator {
  display: inline-block;
  min-width: 5ch;
}

.rotator > span {
  display: inline-block;
  padding-bottom: 0.08em;
}

.word-enter-active,
.word-leave-active {
  transition: opacity 0.4s, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s;
}

.word-enter-from {
  opacity: 0;
  transform: translateY(0.5em) rotateX(-60deg);
  filter: blur(6px);
}

.word-leave-to {
  opacity: 0;
  transform: translateY(-0.5em) rotateX(60deg);
  filter: blur(6px);
}

.lead {
  max-width: 560px;
  margin-top: 26px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.12rem;
  animation: fadeUp 0.9s 0.25s both;
}

.lead strong {
  color: #fff;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
  animation: fadeUp 0.9s 0.4s both;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
  font-weight: 600;
  animation: fadeUp 0.9s 0.55s both;
}

.platforms li {
  display: flex;
  align-items: center;
  gap: 7px;
}

.platforms svg {
  width: 18px;
  height: 18px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

/* ---------- Téléphone ---------- */
.visual {
  position: relative;
  display: grid;
  place-items: center;
  perspective: 1200px;
  animation: fadeUp 1s 0.3s both;
}

.phone {
  position: relative;
  width: min(300px, 78vw);
  aspect-ratio: 9 / 18.5;
  padding: 12px;
  border-radius: 44px;
  background: linear-gradient(145deg, #2c3b66, #0d1428);
  box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.7), inset 0 0 0 2px rgba(255, 255, 255, 0.08);
  transition: transform 0.25s ease-out;
  transform-style: preserve-3d;
  animation: bob 6s ease-in-out infinite;
}

@keyframes bob {
  50% {
    translate: 0 -14px;
  }
}

.notch {
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 2;
  width: 90px;
  height: 24px;
  border-radius: 20px;
  background: #0d1428;
  transform: translateX(-50%);
}

.screen {
  height: 100%;
  padding: 48px 14px 14px;
  border-radius: 34px;
  color: var(--ink);
  background: #fff;
  overflow: hidden;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  line-height: 1.2;
}

.profile small {
  display: block;
  color: var(--muted);
  font-size: 0.68rem;
}

.avatar {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  background: var(--grad);
  font-weight: 800;
}

.stories {
  display: flex;
  gap: 8px;
  margin: 14px 0;
}

.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  animation: storyIn 0.6s both;
}

.story small {
  font-size: 0.55rem;
  color: var(--muted);
}

@keyframes storyIn {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
}

.ring {
  position: relative;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #ff5a3c, #ffb36b, #d62976, #ff5a3c);
  animation: spin 4s linear infinite;
}

.ring span {
  width: 36px;
  height: 36px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--peach), #c9d3f0);
  animation: spin 4s linear infinite reverse;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.post-img {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-3) 100%);
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.s1 {
  width: 70%;
  height: 70%;
  top: -15%;
  right: -15%;
  background: var(--grad);
  animation: float 5s ease-in-out infinite alternate;
}

.s2 {
  width: 40%;
  height: 40%;
  bottom: -10%;
  left: -8%;
  border: 10px solid rgba(255, 255, 255, 0.15);
  animation: float 7s ease-in-out infinite alternate-reverse;
}

.post-title {
  position: relative;
  color: #fff;
  font-family: var(--display);
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.05;
  text-align: center;
  letter-spacing: 0.02em;
}

.big-heart {
  position: absolute;
  width: 70px;
  height: 70px;
  color: #fff;
  fill: #fff;
  filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4));
}

.pop-enter-active {
  animation: pop 0.6s cubic-bezier(0.3, 1.8, 0.5, 1);
}

.pop-leave-active {
  transition: opacity 0.2s;
}

.pop-leave-to {
  opacity: 0;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
}

.actions {
  display: flex;
  gap: 12px;
  margin: 10px 2px 6px;
}

.actions svg {
  width: 20px;
  height: 20px;
}

.actions .right {
  margin-left: auto;
}

.heart {
  transition: color 0.3s, fill 0.3s;
}

.heart.beat {
  color: var(--coral);
  fill: var(--coral);
  animation: beat 0.5s;
}

@keyframes beat {
  40% {
    transform: scale(1.35);
  }
}

.likes {
  display: block;
  font-size: 0.78rem;
}

.bar {
  display: block;
  height: 7px;
  margin-top: 7px;
  border-radius: 6px;
  background: #eceff6;
}

.w80 {
  width: 80%;
}

.w55 {
  width: 55%;
}

/* ---------- Pastilles flottantes ---------- */
.chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 14px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow);
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  animation: chip 5s ease-in-out infinite;
}

.chip svg {
  width: 18px;
  height: 18px;
  color: var(--coral);
}

.c1 {
  top: 12%;
  left: -6%;
}

.c2 {
  top: 48%;
  right: -8%;
  animation-delay: -1.6s;
}

.c3 {
  bottom: 10%;
  left: -2%;
  animation-delay: -3.2s;
}

.c3 svg {
  color: var(--wa);
}

@keyframes chip {
  50% {
    transform: translateY(-12px);
  }
}

.scroll-cue {
  position: absolute;
  bottom: 26px;
  left: 50%;
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 14px;
  transform: translateX(-50%);
}

.scroll-cue span {
  position: absolute;
  top: 8px;
  left: 50%;
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: #fff;
  transform: translateX(-50%);
  animation: wheel 1.8s infinite;
}

@keyframes wheel {
  to {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
}

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .lead {
    margin-inline: auto;
  }

  .ctas,
  .platforms {
    justify-content: center;
  }

  .visual {
    margin-top: 20px;
  }

  .scroll-cue {
    display: none;
  }
}

@media (max-width: 480px) {
  .ctas .btn {
    width: 100%;
  }

  .chip {
    padding: 8px 12px;
    font-size: 0.75rem;
  }

  .c1 {
    left: 0;
  }

  .c2 {
    right: 0;
  }

  .c3 {
    left: 2%;
  }
}
</style>
