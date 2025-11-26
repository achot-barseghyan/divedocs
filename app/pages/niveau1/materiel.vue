<template>
  <div class="min-h-screen text-white">
    <div class="relative mt-[3rem] overflow-hidden px-4 py-20">
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-6xl font-bold">
          <span class="text-yellow-500">Niveau 1</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300">
          Découvre le matériel recommandé et les schémas pratiques pour le
          niveau 1.
        </p>
      </div>
    </div>

    <div class="mx-auto -mt-12 max-w-7xl px-6 pb-20">
      <!-- Intro Card -->
      <Card class="mb-10 border border-white/10 bg-white/5 backdrop-blur-md">
        <template #content>
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 class="mb-2 text-2xl font-bold">Avant d'acheter</h2>
              <p class="text-sm text-gray-400">
                Privilégie le confort, la sécurité et la compatibilité (taille
                de palmes, type de jupe de masque, DIN/K pour bloc).
              </p>
            </div>
            <div class="flex items-center gap-3">
              <Button
                label="Voir le matériel"
                class="border-gray-500 bg-transparent text-teal-200"
                @click="scrollToSection('materiel')"
              />
              <Button
                label="Voir les schémas"
                class="border-none bg-teal-600 hover:bg-teal-700"
                @click="scrollToSection('schemas')"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Matériel Section -->
      <section id="materiel" class="mb-12">
        <p class="z-20 mb-6 text-3xl font-bold text-white">
          Matériel recommandé pour Niveau 1
        </p>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Masque -->
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <div class="mb-4 flex items-start gap-4">
                <div
                  class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#0b6470] to-[#04363a]"
                >
                  <img
                    src="/img/materiel/masque.jpg"
                    alt="Masque"
                    class="h-full w-full object-cover opacity-95"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="mb-2 text-xl font-semibold">Masque</h4>
                  <p class="mb-3 text-sm text-gray-400">
                    Jupe souple, bonne étanchéité, verre correctif si besoin.
                    Teste l'aspiration sur le visage sans sangle.
                  </p>
                </div>
              </div>
              <ul class="mb-4 space-y-1 pl-4 text-sm text-gray-400">
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Type low-volume conseillé</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Verres correctifs possibles</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Sangle confortable, neoprene si long usage</span>
                </li>
              </ul>
              <!-- <div class="flex gap-3">
                <Button label="Voir modèles" outlined class="flex-1" />
                <Button label="Acheter" severity="info" class="flex-1" />
              </div> -->
            </template>
          </Card>

          <!-- Tuba -->
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <div class="mb-4 flex items-start gap-4">
                <div
                  class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#0b6470] to-[#04363a]"
                >
                  <img
                    src="/img/materiel/tuba.jpg"
                    alt="Tuba"
                    class="h-full w-full object-cover opacity-95"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="mb-2 text-xl font-semibold">Tuba</h4>
                  <p class="mb-3 text-sm text-gray-400">
                    Tuba simple ou pliable; embout confortable. Utile pendant
                    les exercices en surface.
                  </p>
                </div>
              </div>
              <ul class="mb-4 space-y-1 pl-4 text-sm text-gray-400">
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Position latérale sur sangles du masque</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Anti-retour pour eau éventuelle (optionnel)</span>
                </li>
              </ul>
              <!-- <div class="flex gap-3">
                <Button label="Guide d'achat" outlined class="flex-1" />
                <Button label="Acheter" severity="info" class="flex-1" />
              </div> -->
            </template>
          </Card>

          <!-- Palmes -->
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <div class="mb-4 flex items-start gap-4">
                <div
                  class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#0b6470] to-[#04363a]"
                >
                  <img
                    src="/img/materiel/palmes.jpg"
                    alt="Palmes"
                    class="h-full w-full object-cover opacity-95"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="mb-2 text-xl font-semibold">Palmes</h4>
                  <p class="mb-3 text-sm text-gray-400">
                    Palmes chaussantes ou réglables selon la pratique. Taille
                    adaptée au chausson, confort du talon.
                  </p>
                </div>
              </div>
              <ul class="mb-4 space-y-1 pl-4 text-sm text-gray-400">
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Palmes souples pour la piscine (entraînement)</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Palmes plus dures pour l'eau naturelle (courants)</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check mt-1 text-teal-400"></i>
                  <span>Chausson si eau froide</span>
                </li>
              </ul>
              <!-- <div class="flex gap-3">
                <Button label="Comparatif" outlined class="flex-1" />
                <Button label="Acheter" severity="info" class="flex-1" />
              </div> -->
            </template>
          </Card>
        </div>

        <!-- Autres équipements -->
        <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <h4 class="mb-2 text-lg font-semibold">
                Gilet stabilisateur (BCD)
              </h4>
              <p class="text-sm text-gray-400">
                Doit permettre une bonne assise du bloc, avoir des purges
                accessibles et un inflateur fonctionnel.
              </p>
            </template>
          </Card>

          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <h4 class="mb-2 text-lg font-semibold">Détendeur (si acheté)</h4>
              <p class="text-sm text-gray-400">
                1er + 2e étage de qualité, octopus et manomètre. Vérifier
                compatibilité DIN/INT avec ton club.
              </p>
            </template>
          </Card>

          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <h4 class="mb-2 text-lg font-semibold">
                Équipement complémentaire
              </h4>
              <p class="text-sm text-gray-400">
                Combinaison, bottillons, gants fins, couteau de plongée, lampe
                si plongées sombres.
              </p>
            </template>
          </Card>
        </div>
      </section>

      <!-- Schémas Section -->
      <section id="schemas" class="mb-12">
        <h3 class="mb-6 text-3xl font-bold text-teal-200">
          Schémas & Tutoriels pratiques
        </h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://www.subchandlers.com/blog/wp-content/uploads/2020/07/entretien-bloc-plongee-sous-marine.jpg"
                alt="Gréer son bloc"
                class="h-48 w-full object-cover"
              />
              <div class="p-4">
                <h4 class="mb-2 text-lg font-semibold">
                  Gréer son bloc — pas à pas
                </h4>
                <p class="mb-4 text-sm text-gray-400">
                  Positionnement du bloc, sangle, raccordement du détendeur,
                  vérifications visuelles et sonores.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Voir le PDF"
                    outlined
                    class="flex-1"
                    icon="pi pi-file-pdf"
                    disabled
                  />
                  <Button
                    label="Tutoriel vidéo"
                    severity="info"
                    class="flex-1"
                    icon="pi pi-video"
                    disabled
                  />
                </div>
              </div>
            </template>
          </Card>

          <Card
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://i.ytimg.com/vi/bDXVO8kkgj4/maxresdefault.jpg"
                alt="Dégréer son bloc"
                class="h-48 w-full object-cover"
              />
              <div class="p-4">
                <h4 class="mb-2 text-lg font-semibold">Dégréer son bloc</h4>
                <p class="mb-4 text-sm text-gray-400">
                  Ordre des opérations, vidange d'air, sécurisation, transport
                  du bloc.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Télécharger"
                    outlined
                    class="flex-1"
                    icon="pi pi-download"
                    disabled
                  />
                  <Button
                    label="Voir la fiche"
                    severity="info"
                    class="flex-1"
                    icon="pi pi-file"
                    disabled
                  />
                </div>
              </div>
            </template>
          </Card>

          <Card
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://sbc-content.s3.amazonaws.com/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/f/effective-safety-checklist.jpg"
                alt="Checklist sécurité"
                class="h-48 w-full object-cover"
              />
              <div class="p-4">
                <h4 class="mb-2 text-lg font-semibold">
                  Checklist sécurité pré-immersion
                </h4>
                <p class="mb-4 text-sm text-gray-400">
                  Contrôles du détendeur, pression du bloc, purge du masque,
                  boucles de la stab.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Imprimer"
                    outlined
                    class="flex-1"
                    icon="pi pi-print"
                    disabled
                  />
                  <Button
                    label="Planning"
                    severity="info"
                    class="flex-1"
                    icon="pi pi-calendar"
                    disabled
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </section>

      <!-- Resources -->
      <Card class="border border-white/10 bg-white/5 backdrop-blur-md">
        <template #content>
          <div class="flex flex-col gap-6 md:flex-row md:justify-between">
            <div class="flex-1">
              <h4 class="mb-3 text-lg font-semibold">
                Conseils d'achat rapides
              </h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li class="flex items-start gap-2">
                  <i class="pi pi-info-circle mt-1 text-teal-400"></i>
                  <span>
                    Privilégier l'essai avant achat (confort du masque, taille
                    des palmes).
                  </span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-info-circle mt-1 text-teal-400"></i>
                  <span>
                    Demander au club si certaines pièces (détendeur, bloc) sont
                    fournies.
                  </span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-info-circle mt-1 text-teal-400"></i>
                  <span>
                    Garder les factures et garanties — entretien annuel
                    recommandé.
                  </span>
                </li>
              </ul>
            </div>

            <div class="md:min-w-[280px]">
              <h4 class="mb-3 text-lg font-semibold">Fichiers utiles</h4>
              <ul class="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-2 text-teal-300 hover:text-teal-200"
                  >
                    <i class="pi pi-file-pdf"></i>
                    Checklist pré-immersion (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-2 text-teal-300 hover:text-teal-200"
                  >
                    <i class="pi pi-file-pdf"></i>
                    Guide gréer/dégréer (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center gap-2 text-teal-300 hover:text-teal-200"
                  >
                    <i class="pi pi-video"></i>
                    Vidéos tutoriels
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* PrimeVue Card customization */
:deep(.p-card) {
  box-shadow: none;
}

:deep(.p-card-content) {
  padding: 0;
}

/* Button customizations */
:deep(.p-button) {
  font-weight: 600;
}

:deep(.p-button-outlined) {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.2);
  color: #cfece6;
}

:deep(.p-button-outlined:hover) {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
