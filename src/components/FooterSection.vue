<script setup>
import AppIcon from './AppIcon.vue'
import { PHONE_DISPLAY, SOCIALS, waLink } from '../config'

const socials = Object.entries(SOCIALS).filter(([, url]) => url)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer dark">
    <div class="container">
      <div class="big" aria-hidden="true">BDR AGENCY</div>

      <div class="cols">
        <div>
          <a href="#top" class="logo"><span class="mark">B</span> BDR<span class="dot">.</span>Agency</a>
          <p>Communication digitale · Stratégie, contenus, community management et publicité pour les entreprises.</p>
        </div>

        <nav aria-label="Liens du pied de page">
          <strong>Navigation</strong>
          <a href="#services">Services</a>
          <a href="#offres">Offres</a>
          <a href="#lancement">Campagne de lancement</a>
          <a href="#contact">Contact</a>
        </nav>

        <div>
          <strong>Contact</strong>
          <a :href="waLink()" target="_blank" rel="noopener" class="wa"><AppIcon name="whatsapp" /> {{ PHONE_DISPLAY }}</a>
          <div v-if="socials.length" class="socials">
            <a v-for="[name, url] in socials" :key="name" :href="url" target="_blank" rel="noopener" :aria-label="name">
              <AppIcon :name="name" />
            </a>
          </div>
        </div>
      </div>

      <div class="legal">
        <span>© {{ year }} BDR Agency. Tous droits réservés.</span>
        <a href="#top">Retour en haut ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 60px 0 30px;
  overflow: hidden;
}

.big {
  margin-bottom: 50px;
  font-family: var(--display);
  font-size: clamp(3rem, 14vw, 11rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-align: center;
  white-space: nowrap;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cols {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--display);
  font-size: 1.4rem;
  font-weight: 800;
}

.mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--grad);
}

.dot {
  color: var(--coral);
}

.cols p {
  max-width: 340px;
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.6);
}

nav,
.cols > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

strong {
  margin-bottom: 6px;
  font-family: var(--display);
}

nav a,
.wa {
  color: rgba(255, 255, 255, 0.65);
  transition: color 0.3s, transform 0.3s;
}

nav a:hover {
  color: #fff;
  transform: translateX(4px);
}

.wa {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.wa svg {
  width: 20px;
  height: 20px;
  color: var(--wa);
}

.wa:hover {
  color: #fff;
}

.socials {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.socials a {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.3s, transform 0.3s;
}

.socials a:hover {
  background: var(--coral);
  transform: translateY(-3px);
}

.socials svg {
  width: 20px;
  height: 20px;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding-top: 24px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
}

.legal a:hover {
  color: #fff;
}

@media (max-width: 760px) {
  .cols {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .legal {
    padding-bottom: 70px;
  }
}
</style>
