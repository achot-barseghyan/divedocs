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
              selectedCategory === category.id
                ? `scale-105 shadow-lg`
                : 'bg-white/10 hover:bg-white/20',
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
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
          >
            <template #content>
              <div
                class="mb-4 overflow-hidden rounded-xl bg-gradient-to-b from-[#0b6470] to-[#04363a]"
              >
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
          <template #icon>
            <span class="text-2xl">💡</span>
          </template>
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
      "Pouce et index forment un cercle, autres doigts tendus. Ce signe représente une question et une réponse : est-ce OK ? Oui c'est OK.",
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_OK.jpeg',
  },
  {
    id: 2,
    name: 'Ça va pas / problème',
    description:
      "Main à plat qui oscille horizontalement. Ne minimisez pas ce signe. Si un membre de votre palanquée indique que ça ne va pas, apportez votre aide et n'hésitez jamais à terminer la plongée.",
    category: 'sécurité',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_ca-ne-va-pas.jpeg',
  },
  {
    id: 3,
    name: 'Stop / Attends',
    description: 'Main levée à plat, paume face au binôme',
    category: 'sécurité',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Stop.jpeg',
  },
  {
    id: 4,
    name: 'Monter',
    description: 'Pouce levé vers la surface',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Monter.jpeg',
  },
  {
    id: 5,
    name: 'Descendre',
    description: 'Pouce pointé vers le bas',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Descendre.jpeg',
  },
  {
    id: 6,
    name: "Panne d'air",
    description: 'Main en travers de la gorge, mouvement de va-et-vient',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Panne-dair.jpeg',
  },
  {
    id: 7,
    name: 'Quel est ton stock de gaz ?',
    description: 'Main à plat sur la poitrine (manomètre)',
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Stock-dair.jpeg',
  },
  {
    id: 8,
    name: "J'ai froid",
    description: 'Bras croisés sur la poitrine en se serrant',
    category: 'sensation',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Froid.jpeg',
  },
  {
    id: 9,
    name: 'Restez groupé',
    description: 'Poing fermé au-dessus de la tête',
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_-Rester-groupe.jpeg',
  },
  {
    id: 10,
    name: 'Palier / Stabilise-toi',
    description:
      'Mains à plat horizontales qui montent et descendent légèrement',
    category: 'technique',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Palier.jpeg',
  },
  {
    id: 12,
    name: "L'un derrière l'autre",
    description: "Deux doigts se suivent l'un derrière l'autre",
    category: 'direction',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Se-suivre.jpeg',
  },
  {
    id: 13,
    name: 'Mi-bouteille',
    description: 'Main horizontale à mi-hauteur',
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Mi-bouteille.jpeg',
  },
  {
    id: 14,
    name: 'Je suis sur la réserve',
    description:
      'Poing fermé sur le détendeur ou main qui tape sur la bouteille',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Reserve.jpeg',
  },
  {
    id: 15,
    name: "Fin d'exercice / Fin de plongée",
    description: 'Les deux mains se croisent devant soi',
    category: 'communication',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Fin-de-plongee.jpeg',
  },
  {
    id: 16,
    name: 'Je suis essoufflé(e)',
    description: 'Main devant la bouche avec mouvement rapide',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Essouflement.jpeg',
  },
  {
    id: 17,
    name: "J'ai des vertiges",
    description: 'Doigt qui fait des cercles devant le front',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Vertifge.jpeg',
  },
  {
    id: 18,
    name: 'Je suis narcosé(e)',
    description: 'Main à plat qui tape plusieurs fois sur le sommet du crâne',
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Narcose.jpeg',
  },
  {
    id: 19,
    name: 'Danger dans cette direction',
    description:
      "Poing fermé qui tape sur la paume de l'autre main puis indique la direction",
    category: 'urgence',
    image:
      'https://differentdive.com/wp-content/uploads/2021/04/Signes-de-plongee_Danger.jpeg',
  },
  {
    id: 20,
    name: 'Palier de trois minutes',
    description: 'Trois doigts levés',
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
