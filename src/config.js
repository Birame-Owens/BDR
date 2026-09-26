// Coordonnées de l'agence — à modifier ici uniquement
export const PHONE = '221784661412'
export const PHONE_DISPLAY = '+221 78 466 14 12'

// Laisser vide pour masquer l'icône dans le pied de page
export const SOCIALS = {
  instagram: '',
  facebook: '',
  tiktok: '',
  linkedin: '',
}

const DEFAULT_MESSAGE = 'Bonjour BDR Agency 👋, je souhaite en savoir plus sur vos services de communication digitale.'

export const waLink = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
