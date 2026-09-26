<script setup>
import { reactive, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { packs } from '../data/offers'
import { PHONE_DISPLAY, waLink } from '../config'

const form = reactive({ name: '', company: '', pack: '', message: '' })
const sent = ref(false)

const packOptions = [...packs.map((p) => `Pack ${p.name}`), 'Pack Campagne de lancement', 'Je ne sais pas encore']

function submit() {
  const lines = [
    'Bonjour BDR Agency 👋',
    '',
    `Je m'appelle ${form.name.trim()}${form.company.trim() ? `, de ${form.company.trim()}` : ''}.`,
    form.pack && `Offre qui m'intéresse : ${form.pack}`,
    form.message.trim() && `\n${form.message.trim()}`,
  ].filter((l) => l !== '' && l !== false)

  window.open(waLink(lines.join('\n')), '_blank', 'noopener')
  sent.value = true
  setTimeout(() => (sent.value = false), 4000)
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="container layout">
      <div v-reveal:left class="info">
        <span class="eyebrow">Contact</span>
        <h2>Prêt à faire <span class="grad-text">décoller</span> votre communication ?</h2>
        <p>
          Parlez-nous de votre entreprise et de vos objectifs. On vous répond rapidement sur WhatsApp pour construire
          ensemble la formule qui vous correspond.
        </p>

        <a :href="waLink()" target="_blank" rel="noopener" class="wa-card">
          <span class="wa-icon"><AppIcon name="whatsapp" /></span>
          <span>
            <small>Écrivez-nous directement</small>
            <strong>{{ PHONE_DISPLAY }}</strong>
          </span>
          <AppIcon name="arrow" class="go" />
        </a>
      </div>

      <form v-reveal:right class="form" @submit.prevent="submit">
        <h3>Envoyez votre demande</h3>
        <p class="hint">Le formulaire prépare votre message et l’ouvre dans WhatsApp.</p>

        <div class="row">
          <label>
            <span>Votre nom *</span>
            <input v-model="form.name" required placeholder="Ex. Awa Ndiaye" autocomplete="name" />
          </label>
          <label>
            <span>Entreprise</span>
            <input v-model="form.company" placeholder="Nom de votre entreprise" autocomplete="organization" />
          </label>
        </div>

        <label>
          <span>Offre qui vous intéresse</span>
          <select v-model="form.pack">
            <option value="">Choisir une offre…</option>
            <option v-for="o in packOptions" :key="o">{{ o }}</option>
          </select>
        </label>

        <label>
          <span>Votre message</span>
          <textarea v-model="form.message" rows="4" placeholder="Parlez-nous de votre projet, vos objectifs…" />
        </label>

        <button type="submit" class="btn btn-wa btn-block">
          <AppIcon name="whatsapp" />
          {{ sent ? 'WhatsApp ouvert ✓' : 'Envoyer sur WhatsApp' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: #fff;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
}

.info h2 {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
}

.info p {
  margin-top: 18px;
  color: var(--muted);
  font-size: 1.08rem;
}

.wa-card {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 420px;
  margin-top: 34px;
  padding: 18px 22px;
  border: 1px solid rgba(37, 211, 102, 0.3);
  border-radius: 20px;
  background: rgba(37, 211, 102, 0.07);
  transition: transform 0.4s, box-shadow 0.4s;
}

.wa-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -20px rgba(37, 211, 102, 0.6);
}

.wa-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  color: #fff;
  background: var(--wa);
}

.wa-icon svg {
  width: 28px;
  height: 28px;
}

.wa-card small {
  display: block;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.wa-card strong {
  font-family: var(--display);
  font-size: 1.3rem;
}

.go {
  width: 22px;
  height: 22px;
  margin-left: auto;
  color: var(--wa);
  transition: transform 0.3s;
}

.wa-card:hover .go {
  transform: translateX(5px);
}

/* ---------- Formulaire ---------- */
.form {
  display: grid;
  gap: 16px;
  padding: 38px;
  border-radius: 28px;
  background: var(--cream);
  box-shadow: var(--shadow);
}

.form h3 {
  font-size: 1.5rem;
}

.hint {
  margin-top: -10px;
  color: var(--muted);
  font-size: 0.88rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  display: grid;
  gap: 6px;
}

label span {
  font-size: 0.85rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  color: var(--ink);
  background: #fff;
  font: inherit;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

textarea {
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--coral);
  box-shadow: 0 0 0 4px rgba(255, 90, 60, 0.15);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 44px;
  }
}

@media (max-width: 520px) {
  .form {
    padding: 26px 18px;
  }

  .row {
    grid-template-columns: 1fr;
  }

  .wa-card strong {
    font-size: 1.1rem;
  }
}
</style>
