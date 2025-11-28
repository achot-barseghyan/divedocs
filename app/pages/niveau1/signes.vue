<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto flex max-w-7xl flex-col gap-[2rem] px-6 pb-20">
      <!-- Header -->
      <div class="mx-auto mb-8 max-w-6xl">
        <div class="mb-6 text-center">
          <h1 class="mb-3 text-4xl font-bold text-yellow-500 md:text-5xl">
            Les signes de plongée
          </h1>
          <p class="text-xl text-teal-300">
            Niveau 1 - Communication sous-marine
          </p>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-2">
          <Button
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :class="[
              'transition-all duration-300',
              {
                'scale-105 shadow-lg': selectedCategory === category.id,
                'bg-white/10 hover:bg-white/20':
                  selectedCategory !== category.id,
              },
            ]"
            class="text-white"
            rounded
            @click="selectedCategory = category.id"
          />
        </div>
      </div>

      <!-- Signs Grid -->
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="sign in filteredSigns"
            :key="sign.id"
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
          >
            <template #content>
              <div class="mb-4 overflow-hidden rounded-xl">
                <img
                  :src="sign.image"
                  :alt="sign.name"
                  class="aspect-square w-full object-cover opacity-95"
                />
              </div>
              <div class="mb-3">
                <h3 class="mb-2 text-xl font-bold text-white">
                  {{ sign.name }}
                </h3>
                <Tag
                  :value="getCategoryName(sign.category)"
                  class="text-white"
                  rounded
                />
              </div>
              <p class="text-sm leading-relaxed text-gray-300">
                {{ sign.description }}
              </p>
            </template>
          </Card>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="mx-auto mt-12 max-w-6xl">
        <Message severity="info" class="border-teal-500/30 bg-teal-500/20">
          <div>
            <h3 class="mb-2 text-lg font-bold text-white">
              Conseils importants
            </h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-start gap-2">
                <i class="pi pi-check mt-1 text-teal-400"></i>
                <span>
                  Toujours faire les signes lentement et distinctement
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check mt-1 text-teal-400"></i>
                <span>
                  S'assurer que votre binôme a bien compris avant de continuer
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check mt-1 text-teal-400"></i>
                <span>
                  En cas de doute, répéter le signe ou remonter en sécurité
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check mt-1 text-teal-400"></i>
                <span>
                  Pratiquer régulièrement les signes en surface avant la plongée
                </span>
              </li>
            </ul>
          </div>
        </Message>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Message from 'primevue/message'

const selectedCategory = ref('all')

const signs = [
  {
    id: 1,
    name: 'OK / Ça va ?',
    description:
      'Ce signe est le plus important en plongée. Utilisez-le régulièrement pour communiquer avec votre binôme et votre guide. Attendez toujours une réponse claire avant de continuer.',
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_OK.jpeg',
  },
  {
    id: 2,
    name: 'Ça va pas / problème',
    description:
      "Ne minimisez pas ce signe. Si un membre de votre palanquée indique que ça ne va pas, apportez votre aide et n'hésitez jamais à terminer la plongée. Un petit problème sous l'eau peut rapidement s'aggraver.",
    category: 'sécurité',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_ca-ne-va-pas.jpeg',
  },
  {
    id: 3,
    name: 'Stop / Attends',
    description:
      "Utilisez ce signe pour arrêter immédiatement la progression de la palanquée. Peut indiquer un danger, un besoin de vérification ou simplement qu'il faut ralentir. Tout le monde doit respecter ce signe sans discussion.",
    category: 'sécurité',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Stop.jpeg',
  },
  {
    id: 4,
    name: 'Monter',
    description:
      "Indique la volonté ou l'ordre de remonter vers la surface. La remontée doit toujours être contrôlée (maximum 10-15 mètres par minute) avec des paliers de sécurité si nécessaire.",
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Monter.jpeg',
  },
  {
    id: 5,
    name: 'Descendre',
    description:
      'Signal pour commencer ou continuer la descente. Descendez toujours à la vitesse de votre binôme le plus lent et équilibrez régulièrement vos oreilles pour éviter les barotraumatismes.',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Descendre.jpeg',
  },
  {
    id: 6,
    name: "Panne d'air",
    description:
      "Situation d'urgence critique. Le binôme doit immédiatement fournir son octopus (détendeur de secours). Remontez ensemble de manière contrôlée en maintenant le contact visuel. Entraînez régulièrement cette procédure.",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Panne-dair.jpeg',
  },
  {
    id: 7,
    name: 'Quel est ton stock de gaz ?',
    description:
      'Question cruciale à poser régulièrement durant la plongée. Chacun doit connaître sa consommation et celle de son binôme. Planifiez le retour avec une marge de sécurité (règle des tiers en exploration).',
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Stock-dair.jpeg',
  },
  {
    id: 8,
    name: "J'ai froid",
    description:
      "Le froid augmente la consommation d'air et peut entraîner des crampes ou une perte de dextérité. Si vous avez vraiment froid, il vaut mieux écourter la plongée. Une hypothermie peut être dangereuse.",
    category: 'sensation',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Froid.jpeg',
  },
  {
    id: 9,
    name: 'Restez groupé',
    description:
      'Signal important du guide pour maintenir la cohésion de la palanquée. Ne vous éloignez jamais de votre groupe, surtout en cas de courant, de mauvaise visibilité ou dans un environnement inconnu.',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_-Rester-groupe.jpeg',
  },
  {
    id: 10,
    name: 'Palier / Stabilise-toi',
    description:
      "Indique qu'il faut maintenir une profondeur stable, souvent lors d'un palier de décompression ou de sécurité. Une bonne stabilisation évite les yo-yos dangereux et permet de respecter les paliers obligatoires.",
    category: 'technique',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Palier.jpeg',
  },
  {
    id: 12,
    name: "L'un derrière l'autre",
    description:
      'Formation en file indienne utilisée dans les passages étroits, les grottes, ou en cas de courant fort. Suivez le binôme devant vous en gardant une distance de sécurité suffisante.',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Se-suivre.jpeg',
  },
  {
    id: 13,
    name: 'Mi-bouteille',
    description:
      "Point de contrôle important : avec la moitié de votre air consommée, il est temps de planifier le retour ou la remontée. C'est un repère crucial pour la gestion de votre autonomie.",
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Mi-bouteille.jpeg',
  },
  {
    id: 14,
    name: 'Je suis sur la réserve',
    description:
      "Signale qu'il reste environ 50 bars de pression. Il faut remonter immédiatement de manière contrôlée. Ne jamais attendre d'être complètement vide : gardez toujours une marge de sécurité pour la remontée.",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Reserve.jpeg',
  },
  {
    id: 15,
    name: "Fin d'exercice / Fin de plongée",
    description:
      "Marque la fin officielle d'un exercice de formation ou de la plongée. Après ce signe, effectuez toujours un palier de sécurité de 3 minutes à 5 mètres avant de sortir de l'eau.",
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Fin-de-plongee.jpeg',
  },
  {
    id: 16,
    name: 'Je suis essoufflé(e)',
    description:
      'Situation potentiellement dangereuse qui peut mener à une surpression pulmonaire. Arrêtez tout effort, stabilisez-vous, respirez calmement et lentement. Si ça ne passe pas, remontez progressivement.',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Essouflement.jpeg',
  },
  {
    id: 17,
    name: "J'ai des vertiges",
    description:
      "Peut indiquer un problème d'oreille interne, de désorientation ou le début d'un accident de plongée. Arrêtez la descente immédiatement et remontez lentement si les symptômes persistent. Consultez un médecin après la plongée.",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Vertifge.jpeg',
  },
  {
    id: 18,
    name: 'Je suis narcosé(e)',
    description:
      "La narcose à l'azote affecte le jugement et les capacités cognitives. Il faut remonter de quelques mètres immédiatement pour retrouver ses esprits. Ne jamais continuer à descendre en état de narcose.",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Narcose.jpeg',
  },
  {
    id: 19,
    name: 'Danger dans cette direction',
    description:
      'Alerte sur un danger immédiat : courant fort, animal dangereux, filet, épave instable, etc. Éloignez-vous de la zone indiquée et restez vigilant. Le guide prendra une route alternative.',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Danger.jpeg',
  },
  {
    id: 20,
    name: 'Palier de trois minutes',
    description:
      "Indique la durée du palier de sécurité à effectuer, généralement à 5 mètres de profondeur. Ce palier n'est pas toujours obligatoire mais fortement recommandé pour éliminer l'azote résiduel et prévenir les accidents de décompression.",
    category: 'technique',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Palier-3-minutes.jpeg',
  },
]
const categories = [
  { id: 'all', name: 'Tous les signes' },
  { id: 'communication', name: 'Communication' },
  { id: 'sécurité', name: 'Sécurité' },
  { id: 'urgence', name: 'Urgence' },
  { id: 'direction', name: 'Direction' },
  { id: 'sensation', name: 'Sensations' },
  { id: 'technique', name: 'Technique' },
]

const filteredSigns = computed(() => {
  return selectedCategory.value === 'all'
    ? signs
    : signs.filter((sign) => sign.category === selectedCategory.value)
})

const getCategoryName = (category: string) => {
  const cat = categories.find((c) => c.id === category)
  return cat ? cat.name : category
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
