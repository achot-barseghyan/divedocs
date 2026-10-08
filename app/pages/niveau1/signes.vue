<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-8 pb-24">
      <UiPageHero
        eyebrow="Niveau 1 - Communication sous-marine"
        title="Les signes de plongée"
        size="md"
      />

      <!-- Filters (sticky) -->
      <div
        class="sticky top-0 z-[5] mb-2 flex flex-wrap items-center gap-4 border-b border-[rgba(232,241,244,0.1)] bg-[rgba(8,28,42,0.88)] py-3.5 backdrop-blur-[8px]"
      >
        <div
          class="flex flex-1 flex-wrap gap-1.5"
          role="group"
          aria-label="Filtrer par catégorie"
        >
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            :class="chipClass(selectedCategory === category.id)"
            :aria-pressed="selectedCategory === category.id"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
            <span class="font-mono text-xs opacity-70">
              {{ countFor(category.id) }}
            </span>
          </button>
        </div>
        <span class="font-mono text-[13px] text-[#7f97a2]">
          {{ filteredSigns.length }} / {{ signs.length }} signes
        </span>
      </div>

      <!-- Signs -->
      <div
        class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4"
      >
        <article
          v-for="sign in filteredSigns"
          :key="sign.id"
          :class="[cardBase, 'flex flex-col overflow-hidden']"
        >
          <div class="aspect-square bg-[#0e2737]">
            <img
              :src="sign.image"
              :alt="sign.name"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-2.5 px-[22px] pb-6 pt-5">
            <div class="flex items-center justify-between gap-3">
              <span
                :class="
                  tagClass(sign.category === 'urgence' ? 'yellow' : 'aqua')
                "
              >
                {{ getCategoryName(sign.category) }}
              </span>
              <span class="font-mono text-xs text-[#7f97a2]">
                {{ pad2(signs.indexOf(sign) + 1) }}
              </span>
            </div>
            <h2
              class="m-0 mt-1 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-white"
            >
              {{ sign.name }}
            </h2>
            <p
              v-if="sign.description"
              class="m-0 text-[15px] leading-[1.55] text-[#9fb4bd] [text-wrap:pretty]"
            >
              {{ sign.description }}
            </p>
          </div>
        </article>
      </div>

      <UiTipsCallout
        class="mt-20"
        title="Conseils importants"
        :tips="tips"
        accent="aqua"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

definePageMeta({ breadcrumb: 'Signes' })

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
  /*   {
    id: 18,
    name: 'Je suis narcosé(e)',
    description:
      "La narcose à l'azote affecte le jugement et les capacités cognitives. Il faut remonter de quelques mètres immédiatement pour retrouver ses esprits. Ne jamais continuer à descendre en état de narcose.",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Narcose.jpeg',
  }, */
  /*   {
    id: 19,
    name: 'Danger dans cette direction',
    description:
      'Alerte sur un danger immédiat : courant fort, animal dangereux, filet, épave instable, etc. Éloignez-vous de la zone indiquée et restez vigilant. Le guide prendra une route alternative.',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Danger.jpeg',
  }, */
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

const tips = [
  'Toujours faire les signes lentement et distinctement',
  "S'assurer que votre binôme a bien compris avant de continuer",
  'En cas de doute, répéter le signe ou remonter en sécurité',
  'Pratiquer régulièrement les signes en surface avant la plongée',
]

const filteredSigns = computed(() =>
  selectedCategory.value === 'all'
    ? signs
    : signs.filter((sign) => sign.category === selectedCategory.value)
)

const countFor = (id: string) =>
  id === 'all' ? signs.length : signs.filter((s) => s.category === id).length

const getCategoryName = (category: string) =>
  categories.find((c) => c.id === category)?.name ?? category
</script>
