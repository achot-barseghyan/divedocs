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
                  class="flex-1"
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
                  class="flex-1"
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
                class="flex-1"
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

        <!-- Autres équipements -->
        <!-- <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
            class="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
        </div> -->
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
                <h4 class="mb-2 text-lg font-semibold">
                  Gréer son bloc — pas à pas
                </h4>
                <p class="mb-4 text-sm text-gray-400">
                  Positionnement du bloc, sangle, raccordement du détendeur,
                  vérifications visuelles et sonores.
                </p>
                <div class="flex gap-3">
                  <Button
                    label="Guide écrit"
                    outlined
                    class="flex-1"
                    icon="pi pi-file"
                    disabled
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
            class="overflow-hidden border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:transform"
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
                    label="Voir la list"
                    severity="info"
                    class="flex-1"
                    icon="pi pi-list"
                    @click="visibleDialogChecklist = true"
                  />
                </div>
              </div>
            </template>
          </Card>
          <Dialog
            v-model:visible="visibleDialogChecklist"
            modal
            header="Checklist Sécurité Pré-Immersion"
            :style="{ width: '70%' }"
            closable
            :pt="{
              header: {
                class: ' text-white',
              },
              content: { class: 'p-0' },
            }"
          >
            <div class="p-6">
              <!-- Introduction avec Message -->
              <Message severity="info" :closable="false" class="mb-6">
                <template #icon>
                  <i class="pi pi-info-circle text-2xl"></i>
                </template>
                <div>
                  <h3 class="mb-2 text-lg font-semibold">
                    Pourquoi cette checklist ?
                  </h3>
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
                        <h3 class="text-lg font-bold">
                          Gilet stabilisateur (BCD)
                        </h3>
                        <p class="text-sm text-gray-600">
                          Contrôle de la flottabilité
                        </p>
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

              <!-- Footer avec Card -->
              <Card
                class="mt-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50"
              >
                <template #content>
                  <div class="flex items-start gap-3">
                    <i class="pi pi-lightbulb text-2xl text-yellow-600"></i>
                    <div>
                      <h4 class="mb-2 font-semibold text-gray-900">
                        Deviendra un automatisme !
                      </h4>
                      <p class="text-sm text-gray-700">
                        Ces vérifications paraissent longues, mais après
                        quelques plongées, vous les effectuerez
                        <strong>instinctivement en quelques minutes</strong>
                        . Mieux vaut multiplier les contrôles pour que la
                        plongée reste toujours un plaisir en toute sécurité.
                      </p>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </Dialog>
        </div>
      </section>
    </div>
  </div>

  <ModalsMaterielVideoDialog ref="ModalsMaterielDialog" />
</template>

<script setup lang="ts">
const ModalsMaterielDialog = ref()
const visibleDialogChecklist = ref(false)

const openVideoDialog = (url: string, startTime?: number) => {
  ModalsMaterielDialog.value.open(url, startTime)
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
