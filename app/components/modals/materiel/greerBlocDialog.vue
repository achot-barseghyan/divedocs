<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    class="mobile-full-dialog"
    content-class="mobile-full-dialog__content"
    :closable="true"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <i class="pi pi-wrench text-2xl text-yellow-500"></i>
        <h2 class="text-2xl font-bold text-white">Guide : Gréer son bloc</h2>
      </div>
    </template>

    <div class="space-y-6 text-white">
      <!-- Introduction -->
      <div class="rounded-lg border border-teal-500/30 bg-teal-500/10 p-4">
        <h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
          <i class="pi pi-info-circle text-teal-400"></i>
          Pourquoi bien gréer son bloc ?
        </h3>
        <p class="text-sm text-gray-300">
          Le gréage correct de votre bloc est essentiel pour votre sécurité et
          votre confort. Un bon gréage permet une meilleure stabilité sous l'eau
          et facilite l'accès à vos équipements.
        </p>
      </div>

      <!-- Étape 1 : Positionner le gilet -->
      <div class="space-y-3">
        <h3 class="text-xl font-semibold text-yellow-500">
          1. Positionner le gilet stabilisateur (stab)
        </h3>
        <div class="rounded-lg bg-white/5 p-4">
          <img
            src="https://www.plongee-plaisir.com/fr/wp-content/uploads/2016/07/gilet_sangle.png"
            alt="Position du gilet sur le bloc - Schémas de fixation"
            class="mb-4 w-[40rem] rounded-lg"
          />
          <div class="mb-4 grid grid-cols-1 gap-3 text-xs text-gray-400">
            <div class="flex gap-2">
              <span class="font-semibold text-teal-400">Schéma 1-2:</span>
              <span>Numérotation de la boucle et des fentes</span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold text-teal-400">Schéma 3-4:</span>
              <span>
                La sangle revient dans la fente 1, puis passe dans la boucle 0
                et maintenir la pression
              </span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold text-teal-400">Schéma 5-6:</span>
              <span>
                Passer la sangle dans la fente n°3, puis rabattre l'attache
                plastique
              </span>
            </div>
          </div>
          <ul class="space-y-2 text-sm text-gray-300">
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Placer la sangle du gilet dans le dos du bloc, au niveau du
                culot
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Le haut du gilet doit arriver juste en dessous du robinet
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Vérifier que la sangle est bien centrée et ne vrille pas
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Serrer fermement la sangle (le bloc ne doit pas bouger)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Étape 2 : Fixer le détendeur -->
      <div class="space-y-3">
        <h3 class="text-xl font-semibold text-yellow-500">
          2. Fixer le détendeur
        </h3>
        <div class="rounded-lg bg-white/5 p-4">
          <img
            src=""
            alt="Fixation du détendeur sur le robinet"
            class="mb-4 w-full rounded-lg"
          />
          <ul class="space-y-2 text-sm text-gray-300">
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Vérifier que le joint torique est présent et en bon état
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Positionner le premier étage avec la sortie HP (manomètre) vers
                la droite
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>Visser fermement à la main (ne pas utiliser d'outil)</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-teal-400"></i>
              <span>
                Connecter l'inflateur du gilet sur la moyenne pression
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Étape 3 : Vérifications -->
      <div class="space-y-3">
        <h3 class="text-xl font-semibold text-yellow-500">
          3. Vérifications finales
        </h3>
        <div class="rounded-lg bg-white/5 p-4">
          <ul class="space-y-2 text-sm text-gray-300">
            <li class="flex items-start gap-2">
              <i class="pi pi-check-circle mt-1 text-yellow-400"></i>
              <span>
                Ouvrir doucement le robinet du bloc (tourner dans le sens
                inverse des aiguilles d'une montre)
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check-circle mt-1 text-yellow-400"></i>
              <span>
                Vérifier la pression sur le manomètre (au moins 200 bars
                recommandés)
              </span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check-circle mt-1 text-yellow-400"></i>
              <span>Tester les deux détendeurs en respirant dedans</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check-circle mt-1 text-yellow-400"></i>
              <span>Tester l'inflateur (gonfler et dégonfler le gilet)</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check-circle mt-1 text-yellow-400"></i>
              <span>
                Vérifier qu'il n'y a pas de fuite d'air (écouter attentivement)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Points importants -->
      <div class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
        <h3 class="mb-3 flex items-center gap-2 text-lg font-semibold">
          <i class="pi pi-exclamation-triangle text-yellow-400"></i>
          Points importants à retenir
        </h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li class="flex items-start gap-2">
            <i class="pi pi-arrow-right mt-1 text-yellow-400"></i>
            <span>
              Ne jamais forcer lors du vissage du détendeur (risque de dommages)
            </span>
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-arrow-right mt-1 text-yellow-400"></i>
            <span>Toujours ouvrir le robinet lentement et complètement</span>
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-arrow-right mt-1 text-yellow-400"></i>
            <span>
              En cas de fuite, fermer immédiatement le robinet et vérifier les
              connexions
            </span>
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-arrow-right mt-1 text-yellow-400"></i>
            <span>
              Faire vérifier votre montage par un moniteur si vous avez un doute
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const visible = ref(false)

const open = () => {
  visible.value = true
}

defineExpose({
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
