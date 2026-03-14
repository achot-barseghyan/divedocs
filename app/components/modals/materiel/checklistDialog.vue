<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    class="mobile-full-dialog"
    content-class="mobile-full-dialog__content"
    :closable="true"
  >
    <div class="md:p-6">
      <!-- Introduction avec Message -->
      <Message severity="info" :closable="false" class="mb-6">
        <template #icon>
          <i class="pi pi-info-circle text-2xl"></i>
        </template>
        <div>
          <h3 class="mb-2 text-lg font-semibold">Pourquoi cette checklist ?</h3>
          <p class="text-sm">
            Comme un pilote avant le décollage, le
            <strong>contrôle pré-plongée (buddy check)</strong>
            assure que tout l'équipement est en place et fonctionne
            parfaitement. L'acronyme
            <strong class="text-blue-700">AGLLO</strong>
            aide à ne rien oublier.
          </p>
        </div>
      </Message>

      <!-- Checklist Items avec Accordion -->
      <Accordion :multiple="true" :activeIndex="[0]">
        <!-- A - Air -->
        <AccordionTab>
          <template #header>
            <div class="flex w-full items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700"
              >
                A
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold">Air</h3>
                <p class="text-sm text-gray-600">
                  Vérification de la bouteille et des détendeurs
                </p>
              </div>
              <span class="text-3xl">💨</span>
            </div>
          </template>
          <div class="pl-4">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Bouteille
                  <strong>correctement ouverte</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Sangle de sécurité du gilet
                  <strong>bien placée</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Tester les
                  <strong>détendeurs</strong>
                  (principal + secours)
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Vérifier la pression:
                  <strong class="text-blue-700">180-220 bars</strong>
                </span>
              </li>
            </ul>
          </div>
        </AccordionTab>

        <!-- G - Gilet -->
        <AccordionTab>
          <template #header>
            <div class="flex w-full items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-xl font-bold text-cyan-700"
              >
                G
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold">Gilet stabilisateur (BCD)</h3>
                <p class="text-sm text-gray-600">Contrôle de la flottabilité</p>
              </div>
              <span class="text-3xl">🎈</span>
            </div>
          </template>
          <div class="pl-4">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Gonfler avec
                  <strong>l'inflator</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Gonfler
                  <strong>à la bouche</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Tester
                  <strong>toutes les purges</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>Vérifier le système de contrôle</span>
              </li>
            </ul>
          </div>
        </AccordionTab>

        <!-- L - Lestage -->
        <AccordionTab>
          <template #header>
            <div class="flex w-full items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700"
              >
                L
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold">Lestage</h3>
                <p class="text-sm text-gray-600">Poids et équilibre</p>
              </div>
              <span class="text-3xl">⚖️</span>
            </div>
          </template>
          <div class="pl-4">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Vérifier la
                  <strong>présence du lestage</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Quantité
                  <strong>adaptée au plongeur</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Ceinture ou
                  <strong>poches à plombs</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>Ajusté selon l'eau et la combinaison</span>
              </li>
            </ul>
          </div>
        </AccordionTab>

        <!-- L - Largage -->
        <AccordionTab>
          <template #header>
            <div class="flex w-full items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700"
              >
                L
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold">Largage / Liens</h3>
                <p class="text-sm text-gray-600">Sécurité et sangles</p>
              </div>
              <span class="text-3xl">🔗</span>
            </div>
          </template>
          <div class="pl-4">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Ceinture:
                  <strong>ouverture main droite</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Poches à plombs
                  <strong>bien accrochées</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Toutes les
                  <strong>boucles serrées</strong>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Sangles du gilet
                  <strong>ajustées</strong>
                </span>
              </li>
            </ul>
          </div>
        </AccordionTab>

        <!-- O - OK Final -->
        <AccordionTab>
          <template #header>
            <div class="flex w-full items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700"
              >
                O
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold">OK Final</h3>
                <p class="text-sm text-gray-600">
                  Dernier contrôle avant la plongée
                </p>
              </div>
              <span class="text-3xl">✓</span>
            </div>
          </template>
          <div class="pl-4">
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  <strong>Masque et palmes</strong>
                  en place
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  <strong>Ordinateur de plongée</strong>
                  fonctionnel
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  Accessoires attachés (
                  <strong>lampe, compas</strong>
                  )
                </span>
              </li>
              <li class="flex items-start gap-2">
                <i class="pi pi-check-circle mt-1 text-green-600"></i>
                <span>
                  <strong>Marqueur de surface</strong>
                  présent
                </span>
              </li>
            </ul>
          </div>
        </AccordionTab>
      </Accordion>

      <!-- Footer custom card -->
      <div
        class="mt-6 rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6"
      >
        <div class="flex items-start gap-3">
          <i class="pi pi-lightbulb text-2xl text-yellow-600"></i>
          <div>
            <h4 class="mb-2 font-semibold text-gray-900">
              Deviendra un automatisme !
            </h4>
            <p class="text-sm text-gray-700">
              Ces vérifications paraissent longues, mais après quelques
              plongées, vous les effectuerez
              <strong>instinctivement en quelques minutes</strong>
              . Mieux vaut multiplier les contrôles pour que la plongée reste
              toujours un plaisir en toute sécurité.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
const visible = ref(false)

const open = () => {
  visible.value = true
}

defineExpose({
  visible,
  open,
})
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  /* Make dialog root full-screen and remove fancy radius */
  .mobile-full-dialog.p-dialog {
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    border-radius: 0 !important;
    display: flex !important;
    align-items: stretch !important;
    justify-content: center !important;
  }

  /* Ensure the content area becomes a flex column that fills the dialog */
  .mobile-full-dialog__content {
    display: flex !important;
    flex-direction: column !important;
    height: 100vh !important;
    max-height: 100vh !important;
    padding: 0.5rem !important; /* adjust if you want spacing */
  }

  /* Header/footer keep intrinsic size */
  .mobile-full-dialog__content .p-dialog-header,
  .mobile-full-dialog__content .p-dialog-footer {
    flex: 0 0 auto !important;
    z-index: 2;
  }

  /* Body takes remaining space and scrolls */
  .mobile-full-dialog__content .p-dialog-content,
  .mobile-full-dialog__content .p-dialog-body {
    flex: 1 1 auto !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 1rem !important; /* adjust spacing */
  }

  /* Optional: keep overlay visible below dialog */
  .p-dialog-mask {
    align-items: stretch !important;
  }
}

@media (min-width: 768px) {
  .mobile-full-dialog.p-dialog {
    width: 70% !important;
    max-width: 70% !important;
    height: auto !important;
    max-height: 90vh !important;
    margin: auto !important;
    border-radius: 12px !important;
  }

  .mobile-full-dialog__content {
    max-height: 90vh !important;
    display: flex !important;
    flex-direction: column;
  }

  .mobile-full-dialog__content .p-dialog-content,
  .mobile-full-dialog__content .p-dialog-body {
    overflow-y: auto !important;
  }
}
</style>
