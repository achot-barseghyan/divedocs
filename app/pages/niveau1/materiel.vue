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

    <div class="mx-auto -mt-12 flex max-w-7xl flex-col gap-[2rem] px-6 pb-20">
      <Card
        class="mb-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm"
      >
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
                    Demander aux formateurs du club pour avoir des conseils.
                  </span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-info-circle mt-1 text-teal-400"></i>
                  <span>
                    Garder les factures et garanties - entretien annuel
                    recommandé (détendeurs, gilet etc...).
                  </span>
                </li>
              </ul>
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
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
            </template>
            <template #footer>
              <div class="flex flex-col gap-2">
                <Button
                  label="Bien choisir son masque"
                  severity="contrast"
                  size="small"
                  @click="
                    openVideoDialog(
                      'https://www.youtube.com/embed/DcoorOWgQTM?si=_f3nyuE9Uh2-0szA',
                      402
                    )
                  "
                >
                  <template #icon>
                    <Icon name="logos:youtube-icon" class="m-0 p-0" />
                  </template>
                </Button>
                <Button
                  label="Les différents technologies de masques"
                  severity="contrast"
                  size="small"
                  @click="
                    openVideoDialog(
                      'https://www.youtube.com/embed/tWfsGohE5wY?si=OAjOFWcW-vOz-o8p'
                    )
                  "
                >
                  <template #icon>
                    <Icon name="logos:youtube-icon" class="m-0 p-0" />
                  </template>
                </Button>
              </div>
            </template>
          </Card>

          <!-- Tuba -->
          <Card
            class="relative flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <div class="mb-4 flex gap-4">
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
            </template>
          </Card>

          <!-- Palmes -->
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
            </template>
            <template #footer>
              <Button
                label="Bien choisir ses palmes"
                severity="contrast"
                class="w-full flex-1"
                size="small"
                @click="
                  openVideoDialog(
                    'https://www.youtube.com/embed/ikKRWVigOz8?si=_pA-JXsZ7s0k7vE5'
                  )
                "
              >
                <template #icon>
                  <Icon name="logos:youtube-icon" class="m-0 p-0" />
                </template>
              </Button>
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
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://www.subchandlers.com/blog/wp-content/uploads/2020/07/entretien-bloc-plongee-sous-marine.jpg"
                alt="Gréer son bloc"
                class="h-48 w-full object-cover"
              />
              <div class="pt-4">
                <h4 class="mb-2 text-lg font-semibold">Gréer son bloc</h4>
                <p class="mb-4 text-sm text-gray-400">
                  Positionnement du bloc, sangle, raccordement du détendeur,
                  vérifications.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Guide écrit"
                    outlined
                    class="flex-1"
                    icon="pi pi-file"
                    @click="openGreerBlocDialog"
                  />
                  <Button
                    label="Guide en vidéo"
                    severity="contrast"
                    class="flex-1"
                    size="small"
                    @click="
                      openVideoDialog(
                        'https://www.youtube.com/embed/C_1XvAmCV20?si=sj9DpFTEG8pUMJq3',
                        6
                      )
                    "
                  >
                    <template #icon>
                      <Icon name="logos:youtube-icon" class="m-0 p-0" />
                    </template>
                  </Button>
                </div>
              </div>
            </template>
          </Card>

          <Card
            class="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <div class="flex h-full flex-col p-0">
                <img
                  src="https://i.ytimg.com/vi/bDXVO8kkgj4/maxresdefault.jpg"
                  alt="Dégréer son bloc"
                  class="h-48 w-full object-cover"
                />
                <div class="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h4 class="mb-2 text-lg font-semibold">Dégréer son bloc</h4>
                    <p class="mb-4 text-sm text-gray-400">
                      Ordre des opérations, vidange d'air, sécurisation,
                      transport du bloc.
                    </p>
                  </div>
                  <div class="flex gap-3">
                    <Button
                      label="Guide en vidéo"
                      severity="contrast"
                      class="flex-1"
                      size="small"
                      @click="
                        openVideoDialog(
                          'https://www.youtube.com/embed/-ZTXdm8S5PQ?si=-wvsU-rdWu_pnLJ3',
                          5
                        )
                      "
                    >
                      <template #icon>
                        <Icon name="logos:youtube-icon" class="m-0 p-0" />
                      </template>
                    </Button>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <Card
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://sbc-content.s3.amazonaws.com/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/f/effective-safety-checklist.jpg"
                alt="Checklist sécurité"
                class="h-48 w-full object-cover"
              />
              <div class="flex flex-col justify-between p-4">
                <h4 class="mb-2 text-lg font-semibold">
                  Checklist sécurité pré-immersion
                </h4>
                <p class="mb-4 text-sm text-gray-400">
                  Contrôles du détendeur, pression du bloc, purge du masque,
                  boucles de la stab.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Voir la list"
                    severity="contrast"
                    class="flex-1"
                    icon="pi pi-list"
                    @click="openChecklistDialog"
                  />
                </div>
              </div>
            </template>
          </Card>
          <ModalsMaterielChecklistDialog
            ref="ModalsMaterielChecklistDialogRef"
          />
          <ModalsMaterielGreerBlocDialog
            ref="ModalsMaterielGreerBlocDialogRef"
          />
        </div>
      </section>

      <section id="autres" class="mb-12">
        <h3 class="mb-6 text-3xl font-bold text-teal-200">
          Comprendre les matériels de plongée & Divers
        </h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
          >
            <template #content>
              <img
                src="https://www.subchandlers.com/blog/wp-content/uploads/2022/08/choisir-son-detendeur-de-plongee-sous-marine-1.jpg"
                alt="Checklist sécurité"
                class="h-48 w-full object-cover"
              />
              <div class="flex flex-col justify-between p-4">
                <h4 class="mb-2 text-lg font-semibold">
                  Détendeur de plongée : Comment ça marche ?
                </h4>
                <p class="mb-4 text-sm text-gray-400">
                  Plonger, c’est respirer librement sous l’eau – et cela ne
                  serait jamais possible sans un détendeur, pièce maîtresse de
                  l'équipement du plongeur sous-marin.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Voir la vidéo"
                    severity="contrast"
                    class="flex-1"
                    @click="
                      openVideoDialog(
                        'https://www.youtube.com/embed/Cd5bagFseME?si=ufciVIwXL_d8bwIa'
                      )
                    "
                  >
                    <template #icon>
                      <Icon name="logos:youtube-icon" class="m-0 p-0" />
                    </template>
                  </Button>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </section>
    </div>
  </div>

  <CommonVideoDialog ref="ModalsMaterielDialog" />
</template>

<script setup lang="ts">
const ModalsMaterielDialog = ref()
const ModalsMaterielChecklistDialogRef = ref()
const ModalsMaterielGreerBlocDialogRef = ref()

const openVideoDialog = (url: string, startTime?: number) => {
  ModalsMaterielDialog.value.open(url, startTime)
}

const openChecklistDialog = () => {
  ModalsMaterielChecklistDialogRef.value.open()
}

const openGreerBlocDialog = () => {
  ModalsMaterielGreerBlocDialogRef.value.open()
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
