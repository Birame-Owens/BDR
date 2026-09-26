<script setup>
import { reactive, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { packs, comparison } from '../data/offers'
import { waLink } from '../config'

const VISIBLE = 7
const view = ref('cards')
const expanded = reactive({})

const packMessage = (p) =>
  `Bonjour BDR Agency 👋, je suis intéressé(e) par le Pack ${p.name} (${p.from ? 'à partir de ' : ''}${p.price} F CFA / mois). Pouvons-nous en discuter ?`

function onTilt(e) {
  if (window.matchMedia('(hover: none)').matches) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--rx', `${y * -6}deg`)
  el.style.setProperty('--ry', `${x * 6}deg`)
}

function resetTilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section id="offres" class="offers">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="eyebrow">Nos offres</span>
        <h2>Un pack pour <span class="grad-text">chaque ambition</span></h2>
        <p>
          Chaque entreprise a des besoins différents. Choisissez le niveau d’accompagnement qui vous correspond :
          d’une présence régulière sur un réseau social jusqu’à l’externalisation complète de votre communication.
        </p>
      </div>

      <div v-reveal class="tabs" role="tablist">
        <span class="indicator" :class="view" />
        <button role="tab" :aria-selected="view === 'cards'" :class="{ active: view === 'cards' }" @click="view = 'cards'">
          Les packs
        </button>
        <button role="tab" :aria-selected="view === 'table'" :class="{ active: view === 'table' }" @click="view = 'table'">
          Comparer
        </button>
      </div>

      <Transition name="swap" mode="out-in">
        <div v-if="view === 'cards'" key="cards" class="cards">
          <div v-for="(p, i) in packs" :key="p.id" v-reveal="i * 110" class="pack-wrap">
          <article
            class="pack"
            :class="{ featured: p.featured }"
            @mousemove="onTilt"
            @mouseleave="resetTilt"
          >
            <span v-if="p.featured" class="badge">Recommandé</span>

            <h3>Pack {{ p.name }}</h3>
            <div class="price">
              <small v-if="p.from">à partir de</small>
              <strong>{{ p.price }}</strong>
              <span>F CFA / mois</span>
            </div>
            <p class="ideal"><b>Idéal pour :</b> {{ p.ideal }}</p>

            <div class="keys">
              <div v-for="k in p.keys" :key="k.label">
                <strong>{{ k.value }}</strong>
                <small>{{ k.label }}</small>
              </div>
            </div>

            <ul class="features">
              <li v-for="f in expanded[p.id] ? p.features : p.features.slice(0, VISIBLE)" :key="f">
                <AppIcon name="check" /> {{ f }}
              </li>
            </ul>

            <Transition name="fade">
              <div v-if="expanded[p.id] && (p.option || p.excluded)" class="notes">
                <p v-if="p.option"><b>Option :</b> {{ p.option }}</p>
                <p v-if="p.excluded"><b>Non inclus :</b> {{ p.excluded }}</p>
              </div>
            </Transition>

            <button class="more" @click="expanded[p.id] = !expanded[p.id]">
              {{ expanded[p.id] ? 'Voir moins' : `Tout voir (+${p.features.length - VISIBLE})` }}
              <AppIcon name="chevron" :class="{ flip: expanded[p.id] }" />
            </button>

            <a
              :href="waLink(packMessage(p))"
              target="_blank"
              rel="noopener"
              class="btn btn-block"
              :class="p.featured ? 'btn-primary' : 'btn-ghost'"
            >
              Choisir ce pack <AppIcon name="arrow" />
            </a>
          </article>
          </div>
        </div>

        <div v-else key="table" class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Prestation</th>
                <th v-for="p in packs" :key="p.id" :class="{ hl: p.featured }">{{ p.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparison" :key="row[0]">
                <th>{{ row[0] }}</th>
                <td v-for="(cell, i) in row.slice(1)" :key="i" :class="{ hl: packs[i].featured }">
                  <AppIcon v-if="cell === true" name="check" class="yes" />
                  <span v-else-if="cell === false" class="no">—</span>
                  <template v-else>{{ cell }}</template>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="swipe">← Faites glisser pour tout voir →</p>
        </div>
      </Transition>

      <p v-reveal class="fine">
        Le budget publicitaire (Meta Ads) n’est inclus dans aucun abonnement mensuel. Besoin d’une formule sur-mesure ?
        <a href="#lancement">Découvrez le Pack Campagne de lancement</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.offers {
  background: linear-gradient(180deg, var(--cream) 0%, #fff 100%);
}

/* ---------- Onglets ---------- */
.tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 300px;
  max-width: 100%;
  margin: 0 auto 50px;
  padding: 6px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 10px 30px -15px rgba(22, 33, 62, 0.3);
}

.tabs button {
  position: relative;
  z-index: 1;
  padding: 11px;
  border: 0;
  border-radius: 999px;
  color: var(--muted);
  background: none;
  font-weight: 700;
  transition: color 0.3s;
}

.tabs button.active {
  color: #fff;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: calc(50% - 6px);
  border-radius: 999px;
  background: var(--navy);
  transition: transform 0.45s cubic-bezier(0.5, 1.4, 0.4, 1);
}

.indicator.table {
  transform: translateX(100%);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ---------- Cartes ---------- */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  gap: 20px;
  perspective: 1400px;
}

.pack {
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 26px;
  border: 1px solid var(--line);
  border-radius: 26px;
  background: #fff;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.2s ease-out, box-shadow 0.4s;
}

.pack:hover {
  box-shadow: 0 30px 60px -30px rgba(22, 33, 62, 0.45);
}

.pack.featured {
  color: #fff;
  border: 2px solid transparent;
  background: linear-gradient(160deg, var(--navy-2) 0%, var(--navy) 100%) padding-box,
    conic-gradient(from var(--angle), var(--coral), #ffb36b, #5b4bff, var(--coral)) border-box;
  box-shadow: 0 30px 70px -30px rgba(22, 33, 62, 0.8);
  animation: rotate 5s linear infinite;
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

.badge {
  position: absolute;
  top: -14px;
  left: 50%;
  padding: 6px 16px;
  border-radius: 999px;
  color: #fff;
  background: var(--grad);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(-50%);
  box-shadow: 0 8px 20px -6px rgba(255, 90, 60, 0.7);
}

h3 {
  font-size: 1.35rem;
}

.price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 8px;
  margin: 16px 0 14px;
}

.price small {
  width: 100%;
  color: var(--coral);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.price strong {
  font-family: var(--display);
  font-size: 2.3rem;
  line-height: 1;
}

.price span {
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 600;
}

.featured .price span,
.featured .ideal,
.featured .keys small,
.featured .features li,
.featured .notes {
  color: rgba(255, 255, 255, 0.75);
}

.ideal {
  min-height: 5.6em;
  color: var(--muted);
  font-size: 0.88rem;
}

.ideal b {
  color: var(--coral);
}

.keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px 0;
  padding: 14px 0;
  border-block: 1px dashed var(--line);
  text-align: center;
}

.featured .keys {
  border-color: rgba(255, 255, 255, 0.15);
}

.keys strong {
  display: block;
  font-family: var(--display);
  font-size: 1.5rem;
  line-height: 1.1;
}

.keys small {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
}

.features {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.features li {
  display: flex;
  gap: 10px;
  color: var(--ink);
  font-size: 0.88rem;
  line-height: 1.45;
  animation: fadeIn 0.4s both;
}

.features svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  padding: 3px;
  border-radius: 50%;
  color: var(--coral);
  background: rgba(255, 90, 60, 0.12);
  stroke-width: 3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}

.notes {
  display: grid;
  gap: 10px;
  margin-top: 18px;
  padding: 14px;
  border-radius: 14px;
  color: var(--muted);
  background: rgba(22, 33, 62, 0.04);
  font-size: 0.82rem;
}

.featured .notes {
  background: rgba(255, 255, 255, 0.06);
}

.notes b {
  color: var(--coral);
}

.more {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  margin: 16px 0 22px;
  padding: 0;
  border: 0;
  color: var(--coral);
  background: none;
  font-size: 0.88rem;
  font-weight: 700;
}

.more svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
}

.more svg.flip {
  transform: rotate(180deg);
}

.pack .btn {
  margin-top: auto;
}

.featured .btn-ghost {
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------- Tableau ---------- */
.table-wrap {
  border-radius: 24px;
  background: #fff;
  box-shadow: var(--shadow);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  font-size: 0.92rem;
}

th,
td {
  padding: 15px 18px;
  border-bottom: 1px solid var(--line);
  text-align: center;
}

tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
  background: #fff;
  font-weight: 600;
  text-align: left;
}

thead th {
  color: #fff;
  background: var(--navy);
  font-family: var(--display);
  font-size: 1.05rem;
}

thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 2;
  text-align: left;
}

thead th.hl {
  background: var(--coral);
}

td.hl {
  background: rgba(255, 90, 60, 0.06);
  font-weight: 700;
}

tbody tr {
  transition: background 0.2s;
}

tbody tr:hover td,
tbody tr:hover th {
  background: #fff4ef;
}

.yes {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  color: var(--coral);
  stroke-width: 3;
}

.no {
  color: #c3c8d6;
}

.swipe {
  display: none;
  padding: 12px;
  color: var(--muted);
  font-size: 0.8rem;
  text-align: center;
}

.fine {
  max-width: 680px;
  margin: 40px auto 0;
  color: var(--muted);
  font-size: 0.9rem;
  text-align: center;
}

.fine a {
  color: var(--coral);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 1100px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 34px 20px;
  }
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .ideal {
    min-height: 0;
  }

  .swipe {
    display: block;
  }
}
</style>
