<template>
  <div class="font-grotesk text-[#e8f1f4] antialiased">
    <UiPageBackground />

    <main class="mx-auto max-w-[1280px] px-5 pb-24 md:px-8">
      <UiPageHero
        eyebrow="Checklist"
        title="Préparation sortie"
        subtitle="Checklist complète pour ne rien oublier avant de partir plonger."
        size="md"
      />

      <!-- ===== Mobile ===== -->
      <div class="md:hidden">
        <div
          class="-mx-5 border-b border-white/[0.08] bg-[#05111a]/30 px-5 pb-4 pt-3"
        >
          <div class="flex items-center justify-between gap-3">
            <div
              class="grid grid-cols-2 gap-0.5 rounded-[10px] border border-white/[0.08] bg-white/5 p-[3px]"
              role="tablist"
              aria-label="Profil de checklist"
            >
              <button
                v-for="profile in profiles"
                :key="profile.id"
                type="button"
                role="tab"
                :aria-selected="activeProfile === profile.id"
                class="rounded-[7px] px-3.5 py-2 text-sm transition-colors"
                :class="
                  activeProfile === profile.id
                    ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
                    : 'font-medium text-[#b7c9d1]'
                "
                @click="switchProfile(profile.id)"
              >
                {{ profile.label }}
              </button>
            </div>
            <span class="font-mono text-sm">
              <span
                class="font-bold"
                :class="allDone ? 'text-[#7fe3d6]' : 'text-white'"
              >
                {{ checkedCount }}
              </span>
              <span class="text-[#7f97a2]">/ {{ totalCount }}</span>
            </span>
          </div>
          <div
            class="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgba(232,241,244,0.12)]"
            role="progressbar"
            :aria-valuenow="progressPercent"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="h-full rounded-full bg-[#7fe3d6] transition-[width] duration-300"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
        </div>

        <div class="mt-5 flex flex-col gap-3">
          <section
            v-if="allDone"
            class="flex items-center gap-3 rounded-[14px] border border-[rgba(127,227,214,0.4)] bg-[rgba(127,227,214,0.07)] px-4 py-4"
            role="status"
          >
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#7fe3d6] font-bold text-[#05111a]"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <h2 class="m-0 text-base font-semibold text-white">
                Tout est prêt !
              </h2>
              <p class="m-0 text-sm text-[#d4e2e7]">
                Bonne plongée et pensez toujours à la sécurité.
              </p>
            </div>
          </section>

          <section
            v-for="(group, g) in bagGroups"
            :key="group.id"
            :ref="
              (el) => setGroupEl('mobile', group.id, el as HTMLElement | null)
            "
            class="overflow-hidden rounded-[14px] border bg-white/[0.035] transition-colors"
            :class="[
              draggingId === group.id
                ? 'border-[rgba(127,227,214,0.7)] bg-[rgba(127,227,214,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
                : mobileEditId === group.id
                  ? 'border-[rgba(127,227,214,0.55)]'
                  : groupDone(group)
                    ? 'border-[rgba(127,227,214,0.45)]'
                    : 'border-[rgba(232,241,244,0.09)]',
              draggingId && 'select-none',
            ]"
          >
            <!-- Header -->
            <div class="flex items-center gap-3 py-3 pl-2 pr-4">
              <button
                type="button"
                class="grid h-9 w-7 shrink-0 touch-none place-items-center rounded-md text-[#7f97a2]"
                :class="
                  draggingId === group.id ? 'cursor-grabbing' : 'cursor-grab'
                "
                :aria-label="`Déplacer la section ${group.title}`"
                @pointerdown="startDrag($event, group, 'mobile')"
                @pointermove="onDragMove"
                @pointerup="endDrag"
                @pointercancel="endDrag"
              >
                <svg
                  viewBox="0 0 10 16"
                  class="h-3.5 w-2"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="1.5" />
                  <circle cx="8" cy="2" r="1.5" />
                  <circle cx="2" cy="8" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="2" cy="14" r="1.5" />
                  <circle cx="8" cy="14" r="1.5" />
                </svg>
              </button>
              <span
                class="grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-xs text-[#7fe3d6]"
                :class="
                  groupDone(group)
                    ? 'border-[#7fe3d6] bg-[rgba(127,227,214,0.15)]'
                    : 'border-[rgba(127,227,214,0.3)] bg-[rgba(127,227,214,0.06)]'
                "
              >
                {{ pad2(g + 1) }}
              </span>

              <form
                v-if="mobileEditId === group.id"
                class="flex min-w-0 flex-1"
                @submit.prevent="finishMobileEdit(group)"
              >
                <input
                  v-model="mobileEditTitle"
                  v-focus="focusTitleOnEdit"
                  type="text"
                  :aria-label="`Nom de la section ${group.title}`"
                  class="h-11 min-w-0 flex-1 rounded-[10px] border border-[rgba(232,241,244,0.2)] bg-[#05111a]/40 px-3 text-base font-semibold text-white outline-none transition-colors focus:border-[rgba(127,227,214,0.6)]"
                />
              </form>
              <button
                v-else
                type="button"
                class="flex min-w-0 flex-1 items-center gap-3 text-left"
                :aria-expanded="expandedIds.has(group.id)"
                @click="toggleExpanded(group.id)"
              >
                <span class="min-w-0 flex-1">
                  <span
                    class="block break-words text-base font-semibold leading-snug text-white"
                  >
                    {{ group.title }}
                  </span>
                  <span
                    class="block font-mono text-xs"
                    :class="
                      groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'
                    "
                  >
                    {{ doneIn(group) }} / {{ group.items.length }} cochés
                  </span>
                </span>
                <i
                  class="pi shrink-0 text-xs text-[#7f97a2]"
                  :class="
                    expandedIds.has(group.id)
                      ? 'pi-chevron-up'
                      : 'pi-chevron-down'
                  "
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <!-- Body -->
            <div
              v-if="expandedIds.has(group.id) || mobileEditId === group.id"
              class="border-t border-[rgba(232,241,244,0.08)]"
            >
              <ul class="m-0 flex list-none flex-col p-0 py-1.5">
                <li
                  v-for="item in group.items"
                  :key="item.id"
                  class="flex items-center pr-2"
                >
                  <button
                    type="button"
                    role="checkbox"
                    :aria-checked="item.checked"
                    class="grid min-h-[52px] flex-1 grid-cols-[22px_1fr] items-center gap-4 px-4 text-left"
                    @click="toggle(item)"
                  >
                    <span
                      class="grid h-[22px] w-[22px] place-items-center rounded-md border-[1.5px] text-xs font-bold text-[#05111a] transition-colors"
                      :class="
                        item.checked
                          ? 'border-[#7fe3d6] bg-[#7fe3d6]'
                          : 'border-[rgba(232,241,244,0.3)]'
                      "
                      aria-hidden="true"
                    >
                      {{ item.checked ? '✓' : '' }}
                    </span>
                    <span
                      class="break-words text-[15px] leading-snug transition-colors"
                      :class="
                        item.checked
                          ? 'text-[#7f97a2] line-through'
                          : 'text-[#e8f1f4]'
                      "
                    >
                      {{ item.label }}
                    </span>
                  </button>
                  <button
                    v-if="mobileEditId === group.id"
                    type="button"
                    class="grid h-10 w-10 shrink-0 place-items-center rounded-md text-base text-[#ff8f80]"
                    :aria-label="`Supprimer ${item.label}`"
                    @click="removeItem(group, item)"
                  >
                    ✕
                  </button>
                </li>
                <li
                  v-if="!group.items.length"
                  class="px-4 py-3 text-sm text-[#7f97a2]"
                >
                  Aucun item pour l'instant.
                </li>
              </ul>

              <form
                v-if="addingItemId === group.id && mobileEditId !== group.id"
                class="flex gap-2 px-4 pb-3"
                @submit.prevent="addItem(group)"
              >
                <input
                  v-model="newItemLabels[group.id]"
                  v-focus
                  type="text"
                  placeholder="Nouvel item"
                  :aria-label="`Ajouter un item à ${group.title}`"
                  class="h-11 min-w-0 flex-1 rounded-[10px] border border-[rgba(232,241,244,0.2)] bg-[#05111a]/40 px-3 text-[15px] text-[#e8f1f4] placeholder-[#7f97a2] outline-none transition-colors focus:border-[rgba(127,227,214,0.6)]"
                />
                <button
                  type="submit"
                  class="h-11 shrink-0 rounded-[10px] bg-[#7fe3d6] px-4 text-sm font-semibold text-[#05111a] disabled:opacity-50"
                  :disabled="!newItemLabels[group.id]?.trim()"
                >
                  Ajouter
                </button>
              </form>

              <!-- Footer -->
              <div
                class="flex items-center gap-2 border-t border-[rgba(232,241,244,0.08)] px-3 py-2.5"
              >
                <template v-if="mobileEditId === group.id">
                  <button
                    type="button"
                    class="h-10 rounded-[10px] px-3 text-[13px] font-semibold transition-colors"
                    :class="
                      confirmDeleteId === group.id
                        ? 'bg-[#ff8f80] text-[#05111a]'
                        : 'border border-[rgba(255,143,128,0.45)] text-[#ff8f80]'
                    "
                    @click="requestDeleteGroup(group)"
                  >
                    {{
                      confirmDeleteId === group.id
                        ? 'Confirmer la suppression ?'
                        : 'Supprimer la section'
                    }}
                  </button>
                  <button
                    type="button"
                    class="ml-auto h-10 rounded-[10px] bg-[#7fe3d6] px-4 text-[13px] font-semibold text-[#05111a]"
                    @click="finishMobileEdit(group)"
                  >
                    Terminé
                  </button>
                </template>
                <template v-else>
                  <button
                    v-if="addingItemId === group.id"
                    type="button"
                    class="h-10 rounded-[10px] bg-white/[0.06] px-3 text-[13px] font-semibold text-[#b7c9d1]"
                    @click="addingItemId = null"
                  >
                    Annuler
                  </button>
                  <button
                    v-else
                    type="button"
                    class="h-10 px-2 text-[13px] font-semibold text-[#7fe3d6]"
                    @click="startAddItem(group)"
                  >
                    + Ajouter un item
                  </button>
                  <button
                    type="button"
                    class="ml-auto h-10 px-2 text-[13px] font-medium text-[#d4e2e7] disabled:opacity-40"
                    :disabled="!group.items.length"
                    @click="
                      groupDone(group) ? uncheckGroup(group) : checkGroup(group)
                    "
                  >
                    {{ groupDone(group) ? 'Tout décocher' : 'Tout cocher' }}
                  </button>
                  <button
                    type="button"
                    class="h-10 rounded-[10px] border border-[rgba(232,241,244,0.15)] px-3 text-[13px] font-medium text-[#e8f1f4]"
                    @click="startMobileEdit(group)"
                  >
                    Modifier
                  </button>
                </template>
              </div>
            </div>
          </section>

          <button
            type="button"
            class="h-16 rounded-[14px] border border-dashed border-[rgba(127,227,214,0.35)] text-sm font-semibold text-[#7fe3d6] transition-colors active:bg-[rgba(127,227,214,0.06)]"
            @click="addGroupMobile"
          >
            + Nouvelle section
          </button>

          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              class="h-11 rounded-[10px] border border-[rgba(232,241,244,0.15)] px-3.5 text-[13px] font-medium text-[#e8f1f4]"
              @click="toggleAllExpanded"
            >
              {{ allExpanded ? 'Tout replier' : 'Tout déplier' }}
            </button>
            <button
              type="button"
              class="h-11 rounded-[10px] border border-[rgba(232,241,244,0.15)] px-3.5 text-[13px] font-medium text-[#e8f1f4]"
              @click="uncheckAll"
            >
              Tout décocher
            </button>
            <button
              type="button"
              class="h-11 rounded-[10px] border border-[rgba(255,143,128,0.45)] px-3.5 text-[13px] font-medium text-[#ff8f80]"
              @click="resetAll"
            >
              ↻ Réinitialiser la liste
            </button>
          </div>
        </div>
      </div>

      <!-- ===== Desktop ===== -->
      <div class="hidden flex-wrap items-start gap-8 md:flex">
        <!-- Sidebar: profile + progress -->
        <aside
          class="flex max-w-[260px] flex-[1_1_220px] flex-col gap-3 md:sticky md:top-24"
        >
          <div
            class="grid grid-cols-2 gap-0.5 rounded-[10px] border border-white/[0.08] bg-white/5 p-[3px]"
            role="tablist"
            aria-label="Profil de checklist"
          >
            <button
              v-for="profile in profiles"
              :key="profile.id"
              type="button"
              role="tab"
              :aria-selected="activeProfile === profile.id"
              class="rounded-[7px] px-3 py-2 text-sm transition-colors"
              :class="
                activeProfile === profile.id
                  ? 'bg-[#7fe3d6] font-semibold text-[#05111a]'
                  : 'font-medium text-[#b7c9d1] hover:bg-white/[0.06] hover:text-white'
              "
              @click="switchProfile(profile.id)"
            >
              {{ profile.label }}
            </button>
          </div>

          <section :class="[cardBase, 'flex flex-col gap-4 p-[18px]']">
            <span
              class="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7f97a2]"
            >
              Progression
            </span>
            <div class="flex items-baseline gap-1.5">
              <span
                class="text-5xl font-bold leading-none tracking-[-0.03em]"
                :class="allDone ? 'text-[#7fe3d6]' : 'text-white'"
              >
                {{ checkedCount }}
              </span>
              <span class="text-lg font-semibold text-[#7f97a2]">
                / {{ totalCount }}
              </span>
            </div>
            <div
              class="h-1.5 overflow-hidden rounded-full bg-[rgba(232,241,244,0.12)]"
              role="progressbar"
              :aria-valuenow="progressPercent"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="h-full rounded-full bg-[#7fe3d6] transition-[width] duration-300"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>

            <ul
              class="m-0 flex list-none flex-col gap-2.5 border-t border-[rgba(232,241,244,0.08)] p-0 pt-4"
            >
              <li
                v-for="group in bagGroups"
                :key="group.id"
                class="flex items-start justify-between gap-3 text-[13px] font-medium leading-snug"
                :class="groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#d4e2e7]'"
              >
                <span>{{ group.title }}</span>
                <span
                  class="shrink-0 font-mono text-[11px]"
                  :class="
                    groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'
                  "
                >
                  {{ doneIn(group) }} / {{ group.items.length }}
                </span>
              </li>
            </ul>

            <div
              class="grid grid-cols-2 gap-2 border-t border-[rgba(232,241,244,0.08)] pt-4"
            >
              <button
                type="button"
                :class="[secondaryButton, 'h-8 px-2.5 text-xs']"
                @click="checkAll"
              >
                Tout cocher
              </button>
              <button
                type="button"
                :class="[secondaryButton, 'h-8 px-2.5 text-xs']"
                @click="uncheckAll"
              >
                Tout décocher
              </button>
              <button
                type="button"
                :class="[
                  secondaryButton,
                  'col-span-2 h-8 border-[rgba(255,143,128,0.35)] px-2.5 text-xs text-[#ff8f80] hover:border-[rgba(255,143,128,0.6)] hover:bg-[rgba(255,143,128,0.08)]',
                ]"
                @click="resetAll"
              >
                ↻ Réinitialiser
              </button>
            </div>
          </section>
        </aside>

        <!-- Groups -->
        <div class="flex min-w-0 flex-[999_1_480px] flex-col gap-3">
          <section
            v-if="allDone"
            class="flex items-center gap-4 rounded-[14px] border border-[rgba(127,227,214,0.4)] bg-[rgba(127,227,214,0.07)] px-6 py-5"
            role="status"
          >
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#7fe3d6] font-bold text-[#05111a]"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <h2 class="m-0 text-lg font-semibold text-white">
                Tout est prêt !
              </h2>
              <p class="m-0 text-[15px] text-[#d4e2e7]">
                Bonne plongée et pensez toujours à la sécurité.
              </p>
            </div>
          </section>

          <section
            v-for="(group, g) in bagGroups"
            :key="group.id"
            :ref="
              (el) => setGroupEl('desktop', group.id, el as HTMLElement | null)
            "
            class="rounded-[14px] border bg-white/[0.035] px-5 py-[18px] transition-colors"
            :class="[
              draggingId === group.id
                ? 'border-[rgba(127,227,214,0.7)] bg-[rgba(127,227,214,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
                : groupDone(group)
                  ? 'border-[rgba(127,227,214,0.45)]'
                  : 'border-[rgba(232,241,244,0.09)]',
              draggingId && 'select-none',
            ]"
          >
            <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div class="flex min-w-0 flex-[1_1_14rem] items-center gap-3">
                <button
                  type="button"
                  class="-ml-2 grid h-7 w-7 shrink-0 touch-none place-items-center rounded-md text-[#7f97a2] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fe3d6]"
                  :class="
                    draggingId === group.id ? 'cursor-grabbing' : 'cursor-grab'
                  "
                  :aria-label="`Déplacer la section ${group.title} (flèches haut/bas)`"
                  title="Glisser pour déplacer"
                  @pointerdown="startDrag($event, group, 'desktop')"
                  @pointermove="onDragMove"
                  @pointerup="endDrag"
                  @pointercancel="endDrag"
                  @keydown.up.prevent="moveGroup(g, -1)"
                  @keydown.down.prevent="moveGroup(g, 1)"
                >
                  <i class="pi pi-bars text-xs" aria-hidden="true"></i>
                </button>
                <span class="font-mono text-[13px] text-[#7fe3d6]">
                  {{ pad2(g + 1) }}
                </span>
                <form
                  v-if="editingGroupId === group.id"
                  class="flex min-w-0 flex-1"
                  @submit.prevent="saveTitle(group)"
                >
                  <input
                    v-model="editingTitle"
                    v-focus
                    type="text"
                    :aria-label="`Renommer la section ${group.title}`"
                    class="h-8 min-w-0 flex-1 rounded-lg border border-[rgba(127,227,214,0.6)] bg-[#05111a]/40 px-2.5 text-lg font-semibold tracking-[-0.01em] text-white outline-none"
                    @keydown.esc.prevent="cancelEdit"
                    @blur="saveTitle(group)"
                  />
                </form>
                <h2
                  v-else
                  class="m-0 min-w-0 flex-1 cursor-text break-words text-lg font-semibold tracking-[-0.01em] text-white"
                  title="Double-cliquer pour renommer"
                  @dblclick="startEdit(group)"
                >
                  {{ group.title }}
                </h2>
              </div>
              <div class="ml-auto flex shrink-0 items-center gap-2">
                <span
                  class="mr-1 font-mono text-xs"
                  :class="
                    groupDone(group) ? 'text-[#7fe3d6]' : 'text-[#7f97a2]'
                  "
                >
                  {{ doneIn(group) }} / {{ group.items.length }}
                </span>
                <button
                  type="button"
                  class="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[#7f97a2] transition-colors hover:bg-white/[0.06] hover:text-white"
                  :aria-label="`Renommer la section ${group.title}`"
                  title="Renommer"
                  @click="startEdit(group)"
                >
                  <i class="pi pi-pencil text-xs" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  class="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[#7f97a2] transition-colors hover:bg-[rgba(255,143,128,0.1)] hover:text-[#ff8f80]"
                  :aria-label="`Supprimer la section ${group.title}`"
                  title="Supprimer la section"
                  @click="deleteGroup(group)"
                >
                  <i class="pi pi-trash text-xs" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  :class="[secondaryButton, 'h-7 rounded-lg px-2.5 text-xs']"
                  @click="
                    groupDone(group) ? uncheckGroup(group) : checkGroup(group)
                  "
                >
                  {{ groupDone(group) ? 'Tout décocher' : 'Tout cocher' }}
                </button>
              </div>
            </div>

            <ul
              class="m-0 mt-3 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-x-3 gap-y-1 p-0"
            >
              <li
                v-for="item in group.items"
                :key="item.id"
                class="group/item flex items-center rounded-lg transition-colors hover:bg-white/[0.04]"
              >
                <button
                  type="button"
                  role="checkbox"
                  :aria-checked="item.checked"
                  class="grid min-h-11 flex-1 grid-cols-[20px_1fr] items-center gap-3 rounded-lg px-2 py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fe3d6]"
                  @click="toggle(item)"
                >
                  <span
                    class="grid h-5 w-5 place-items-center rounded-md border-[1.5px] text-xs font-bold text-[#05111a] transition-colors"
                    :class="
                      item.checked
                        ? 'border-[#7fe3d6] bg-[#7fe3d6]'
                        : 'border-[rgba(232,241,244,0.3)]'
                    "
                    aria-hidden="true"
                  >
                    {{ item.checked ? '✓' : '' }}
                  </span>
                  <span
                    class="break-words text-sm leading-snug transition-colors"
                    :class="
                      item.checked
                        ? 'text-[#7f97a2] line-through'
                        : 'text-[#e8f1f4]'
                    "
                  >
                    {{ item.label }}
                  </span>
                </button>
                <button
                  type="button"
                  class="mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs text-[#7f97a2] transition hover:bg-[rgba(255,143,128,0.1)] hover:text-[#ff8f80] focus-visible:opacity-100 sm:opacity-0 sm:group-hover/item:opacity-100"
                  :aria-label="`Supprimer ${item.label}`"
                  title="Supprimer"
                  @click="deleteItem(group, item)"
                >
                  ✕
                </button>
              </li>
            </ul>

            <form
              class="mt-3 flex gap-2 border-t border-[rgba(232,241,244,0.08)] pt-3"
              @submit.prevent="addItem(group)"
            >
              <input
                v-model="newItemLabels[group.id]"
                type="text"
                placeholder="Ajouter un item..."
                :aria-label="`Ajouter un item à ${group.title}`"
                class="h-10 min-w-0 flex-1 rounded-[10px] border border-[rgba(232,241,244,0.12)] bg-[#05111a]/40 px-3 text-sm text-[#e8f1f4] placeholder-[#7f97a2] outline-none transition-colors focus:border-[rgba(127,227,214,0.6)]"
              />
              <button
                type="submit"
                class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.1)] text-lg text-[#7fe3d6] transition-colors hover:bg-[rgba(127,227,214,0.2)] disabled:opacity-40"
                :disabled="!newItemLabels[group.id]?.trim()"
                aria-label="Ajouter"
              >
                +
              </button>
            </form>
          </section>

          <form
            class="flex gap-2 rounded-[14px] border border-dashed border-[rgba(232,241,244,0.15)] px-5 py-4"
            @submit.prevent="addGroup"
          >
            <input
              v-model="newGroupTitle"
              type="text"
              placeholder="Nouvelle section..."
              aria-label="Nom de la nouvelle section"
              class="h-10 min-w-0 flex-1 rounded-[10px] border border-[rgba(232,241,244,0.12)] bg-[#05111a]/40 px-3 text-sm text-[#e8f1f4] placeholder-[#7f97a2] outline-none transition-colors focus:border-[rgba(127,227,214,0.6)]"
            />
            <button
              type="submit"
              class="h-10 shrink-0 rounded-[10px] border border-[rgba(127,227,214,0.35)] bg-[rgba(127,227,214,0.1)] px-4 text-sm font-medium text-[#7fe3d6] transition-colors hover:bg-[rgba(127,227,214,0.2)] disabled:opacity-40"
              :disabled="!newGroupTitle.trim()"
            >
              + Ajouter une section
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

definePageMeta({ breadcrumb: 'Préparation sortie' })

const confirm = useConfirm()

interface CheckItem {
  id: string
  label: string
  checked: boolean
}

interface BagGroup {
  id: string
  title: string
  emoji?: string
  items: CheckItem[]
}

type DefaultGroup = Omit<BagGroup, 'id'>

type ProfileId = 'essentiel' | 'complet'

const profiles = [
  { id: 'essentiel' as ProfileId, label: 'Essentiel', emoji: '⚡' },
  { id: 'complet' as ProfileId, label: 'Complet', emoji: '✅' },
]

const STORAGE_KEYS: Record<ProfileId, string> = {
  essentiel: 'preparation-sortie-essentiel',
  complet: 'preparation-sortie-complet',
}

const PROFILE_KEY = 'preparation-sortie-profile'

const profilesData: Record<ProfileId, DefaultGroup[]> = {
  essentiel: [
    {
      title: 'Équipement de plongée',
      emoji: '🤿',
      items: [
        { id: 'eq-1', label: 'Masque et tuba', checked: false },
        { id: 'eq-3', label: 'Palmes', checked: false },
        { id: 'eq-4', label: 'Gilet stabilisateur', checked: false },
        { id: 'eq-6', label: 'Combinaison', checked: false },
        {
          id: 'eq-7',
          label: 'Bottillons / chaussons de plongée',
          checked: false,
        },
        { id: 'eq-8', label: 'Ordinateur de plongée', checked: false },
      ],
    },
    {
      title: 'Kit de dépannage',
      emoji: '🔧',
      items: [{ id: 'kit-4', label: 'Masque de secours', checked: false }],
    },
    {
      title: 'Documents',
      emoji: '📋',
      items: [
        {
          id: 'doc-1',
          label: 'Carte(s) de certification / niveau',
          checked: false,
        },
        { id: 'doc-3', label: 'Assurance plongée', checked: false },
        { id: 'doc-2', label: 'Carnet de plongée', checked: false },
      ],
    },
    {
      title: 'Sac étanche (surface / bateau)',
      emoji: '☀️',
      items: [
        {
          id: 'surf-1',
          label: 'Crème solaire respectueuse des récifs',
          checked: false,
        },
        { id: 'surf-2', label: 'Casquette', checked: false },
        { id: 'surf-3', label: 'Gourde', checked: false },
        { id: 'surf-4', label: 'Serviette à séchage rapide', checked: false },
        { id: 'surf-5', label: 'Lunettes de soleil', checked: false },
        {
          id: 'surf-7',
          label: 'Piles / chargeurs de rechange',
          checked: false,
        },
      ],
    },
    {
      title: 'Trousse de premiers secours',
      emoji: '🩹',
      items: [
        {
          id: 'med-1',
          label: 'Médicaments contre le mal des transports',
          checked: false,
        },
        { id: 'med-2', label: 'Aspirine / antidouleur', checked: false },
        { id: 'med-4', label: 'Pansements', checked: false },
      ],
    },
  ],
  complet: [
    {
      title: 'Équipement de plongée',
      emoji: '🤿',
      items: [
        { id: 'eq-1', label: 'Masque et tuba', checked: false },
        {
          id: 'eq-2',
          label: 'Anti-buée respectueux des récifs',
          checked: false,
        },
        { id: 'eq-3', label: 'Palmes et chaussons', checked: false },
        { id: 'eq-4', label: 'Gilet stabilisateur', checked: false },
        { id: 'eq-5', label: 'Maillot de bain', checked: false },
        { id: 'eq-6', label: 'Combinaison', checked: false },
        { id: 'eq-7', label: 'Gants', checked: false },
        {
          id: 'eq-8',
          label: 'Bottillons / chaussons de plongée',
          checked: false,
        },
        { id: 'eq-9', label: 'Outil de coupe', checked: false },
        {
          id: 'eq-10',
          label: 'Montre / ordinateur de plongée',
          checked: false,
        },
        {
          id: 'eq-11',
          label: 'Lampes de plongée / lampes de signalisation',
          checked: false,
        },
        { id: 'eq-12', label: 'Sac étanche', checked: false },
      ],
    },
    {
      title: 'Kit de dépannage',
      emoji: '🔧',
      items: [
        { id: 'kit-1', label: 'Sangles de palmes de rechange', checked: false },
        { id: 'kit-2', label: 'Sangles de masque de rechange', checked: false },
        { id: 'kit-3', label: 'Mousquetons de rechange', checked: false },
        { id: 'kit-4', label: 'Masque de secours', checked: false },
      ],
    },
    {
      title: 'Documents',
      emoji: '📋',
      items: [
        {
          id: 'doc-1',
          label: 'Carte(s) de certification / niveau',
          checked: false,
        },
        { id: 'doc-3', label: 'Assurance plongée', checked: false },
        { id: 'doc-2', label: 'Carnet de plongée', checked: false },
      ],
    },
    {
      title: 'Sac étanche (surface / bateau)',
      emoji: '☀️',
      items: [
        {
          id: 'surf-1',
          label: 'Crème solaire respectueuse des récifs',
          checked: false,
        },
        { id: 'surf-2', label: 'Casquette', checked: false },
        { id: 'surf-3', label: 'Gourde', checked: false },
        { id: 'surf-4', label: 'Serviette à séchage rapide', checked: false },
        { id: 'surf-5', label: 'Lunettes de soleil', checked: false },
        { id: 'surf-6', label: 'Veste coupe-vent', checked: false },
        {
          id: 'surf-7',
          label: 'Piles / chargeurs de rechange',
          checked: false,
        },
        {
          id: 'surf-8',
          label: "Produit contre l'otite du nageur",
          checked: false,
        },
        { id: 'surf-9', label: 'En-cas', checked: false },
      ],
    },
    {
      title: 'Trousse de premiers secours',
      emoji: '🩹',
      items: [
        {
          id: 'med-1',
          label: 'Médicaments contre le mal des transports',
          checked: false,
        },
        { id: 'med-2', label: 'Aspirine / antidouleur', checked: false },
        { id: 'med-3', label: 'Antihistaminique', checked: false },
        { id: 'med-4', label: 'Pansements', checked: false },
        { id: 'med-5', label: 'Masque de poche (RCP)', checked: false },
        { id: 'med-6', label: 'Pince à épiler', checked: false },
        { id: 'med-7', label: 'Gants en nitrile', checked: false },
        { id: 'med-8', label: 'Antiacide', checked: false },
        {
          id: 'med-9',
          label: 'Bande élastique (type Ace Bandage)',
          checked: false,
        },
        { id: 'med-10', label: 'Guide de premiers secours', checked: false },
      ],
    },
  ],
}

const activeProfile = ref<ProfileId>('essentiel')

const bagGroups = reactive<BagGroup[]>([])
const editingGroupId = ref<string | null>(null)

function defaultGroups(profile: ProfileId): BagGroup[] {
  return profilesData[profile].map((g, i) => ({
    id: `default-${i}`,
    title: g.title,
    emoji: g.emoji,
    items: g.items.map((item) => ({ ...item })),
  }))
}

function loadProfile(profile: ProfileId) {
  activeProfile.value = profile
  localStorage.setItem(PROFILE_KEY, profile)
  const saved = localStorage.getItem(STORAGE_KEYS[profile])

  let newGroups = defaultGroups(profile)
  if (saved) {
    try {
      // Les anciennes sauvegardes n'ont pas d'id de section : on en génère un
      const savedGroups: Array<Partial<BagGroup>> = JSON.parse(saved)
      if (Array.isArray(savedGroups)) {
        newGroups = savedGroups.map((sg, i) => ({
          id: sg.id ?? `default-${i}`,
          title: sg.title ?? 'Section',
          items: Array.isArray(sg.items) ? sg.items : [],
        }))
      }
    } catch {
      // Sauvegarde illisible : on garde les valeurs par défaut
    }
  }

  resetUiState()
  bagGroups.splice(0, bagGroups.length, ...newGroups)
}

function switchProfile(profile: ProfileId) {
  if (profile === activeProfile.value) return
  loadProfile(profile)
}

const newItemLabels = reactive<Record<string, string>>({})

function addItem(group: BagGroup) {
  const label = newItemLabels[group.id]?.trim()
  if (!label) return
  const id = `custom-${Date.now()}`
  group.items.push({ id, label, checked: false })
  newItemLabels[group.id] = ''
}

// --- Sections : ajout, renommage, suppression ---

const newGroupTitle = ref('')
const editingTitle = ref('')

const vFocus = {
  mounted: (el: HTMLInputElement, binding: { value?: boolean }) => {
    if (binding.value === false) return
    el.focus()
    el.select()
  },
}

function addGroup() {
  const title = newGroupTitle.value.trim()
  if (!title) return
  bagGroups.push({ id: `group-${Date.now()}`, title, items: [] })
  newGroupTitle.value = ''
}

function startEdit(group: BagGroup) {
  editingGroupId.value = group.id
  editingTitle.value = group.title
}

function saveTitle(group: BagGroup) {
  if (editingGroupId.value !== group.id) return
  const title = editingTitle.value.trim()
  if (title) group.title = title
  editingGroupId.value = null
}

function cancelEdit() {
  editingGroupId.value = null
}

function deleteGroup(group: BagGroup) {
  confirm.require({
    message: `Supprimer la section "${group.title}" et ses ${group.items.length} item(s) ?`,
    header: 'Supprimer la section',
    icon: 'pi pi-trash',
    acceptLabel: 'Supprimer',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    rejectProps: { severity: 'secondary', outlined: true },
    accept: () => removeGroup(group),
  })
}

function removeGroup(group: BagGroup) {
  const idx = bagGroups.indexOf(group)
  if (idx !== -1) bagGroups.splice(idx, 1)
  delete newItemLabels[group.id]
  expandedIds.delete(group.id)
}

// --- Vue mobile : accordéon, mode édition, ajout d'item ---

const expandedIds = reactive(new Set<string>())
const mobileEditId = ref<string | null>(null)
const mobileEditTitle = ref('')
const focusTitleOnEdit = ref(false)
const addingItemId = ref<string | null>(null)
const confirmDeleteId = ref<string | null>(null)
let confirmDeleteTimer: ReturnType<typeof setTimeout> | undefined

const allExpanded = computed(
  () => bagGroups.length > 0 && bagGroups.every((g) => expandedIds.has(g.id))
)

function resetUiState() {
  editingGroupId.value = null
  mobileEditId.value = null
  addingItemId.value = null
  confirmDeleteId.value = null
  expandedIds.clear()
}

function toggleExpanded(id: string) {
  if (expandedIds.has(id)) {
    expandedIds.delete(id)
    if (addingItemId.value === id) addingItemId.value = null
  } else {
    expandedIds.add(id)
  }
}

function toggleAllExpanded() {
  if (allExpanded.value) {
    expandedIds.clear()
    addingItemId.value = null
  } else {
    bagGroups.forEach((g) => expandedIds.add(g.id))
  }
}

function startMobileEdit(group: BagGroup, focusTitle = false) {
  mobileEditId.value = group.id
  mobileEditTitle.value = group.title
  focusTitleOnEdit.value = focusTitle
  addingItemId.value = null
  confirmDeleteId.value = null
  expandedIds.add(group.id)
}

function finishMobileEdit(group: BagGroup) {
  const title = mobileEditTitle.value.trim()
  if (title) group.title = title
  mobileEditId.value = null
  confirmDeleteId.value = null
}

// Suppression en deux temps : le premier appui arme, le second confirme
function requestDeleteGroup(group: BagGroup) {
  clearTimeout(confirmDeleteTimer)
  if (confirmDeleteId.value === group.id) {
    confirmDeleteId.value = null
    mobileEditId.value = null
    removeGroup(group)
    return
  }
  confirmDeleteId.value = group.id
  confirmDeleteTimer = setTimeout(() => (confirmDeleteId.value = null), 4000)
}

function startAddItem(group: BagGroup) {
  addingItemId.value = group.id
  newItemLabels[group.id] = ''
}

function removeItem(group: BagGroup, item: CheckItem) {
  const idx = group.items.indexOf(item)
  if (idx !== -1) group.items.splice(idx, 1)
}

function addGroupMobile() {
  const group: BagGroup = {
    id: `group-${Date.now()}`,
    title: 'Nouvelle section',
    items: [],
  }
  bagGroups.push(group)
  startMobileEdit(group, true)
}

// --- Réorganisation des sections (glisser-déposer) ---

type LayoutVariant = 'desktop' | 'mobile'

const groupEls = new Map<string, HTMLElement>()
const draggingId = ref<string | null>(null)
let dragVariant: LayoutVariant = 'desktop'

function setGroupEl(
  variant: LayoutVariant,
  id: string,
  el: HTMLElement | null
) {
  const key = `${variant}:${id}`
  if (el) groupEls.set(key, el)
  else groupEls.delete(key)
}

function moveGroup(from: number, delta: number) {
  const to = from + delta
  if (to < 0 || to >= bagGroups.length) return
  const [moved] = bagGroups.splice(from, 1)
  bagGroups.splice(to, 0, moved!)
}

function midY(id: string | undefined) {
  const el = id ? groupEls.get(`${dragVariant}:${id}`) : undefined
  const rect = el?.getBoundingClientRect()
  return rect ? rect.top + rect.height / 2 : null
}

function startDrag(e: PointerEvent, group: BagGroup, variant: LayoutVariant) {
  if (e.button !== 0) return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  dragVariant = variant
  draggingId.value = group.id
}

function onDragMove(e: PointerEvent) {
  if (!draggingId.value) return
  // On ne compare qu'aux voisins directs pour éviter les oscillations
  // entre sections de hauteurs différentes.
  for (;;) {
    const idx = bagGroups.findIndex((g) => g.id === draggingId.value)
    const nextMid = midY(bagGroups[idx + 1]?.id)
    const prevMid = midY(bagGroups[idx - 1]?.id)
    if (nextMid !== null && e.clientY > nextMid) moveGroup(idx, 1)
    else if (prevMid !== null && e.clientY < prevMid) moveGroup(idx, -1)
    else break
  }
}

function endDrag(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  draggingId.value = null
}

function deleteItem(group: BagGroup, item: CheckItem) {
  confirm.require({
    message: `Supprimer "${item.label}" ?`,
    header: "Supprimer l'item",
    icon: 'pi pi-trash',
    acceptLabel: 'Supprimer',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    rejectProps: { severity: 'secondary', outlined: true },
    accept: () => {
      const idx = group.items.indexOf(item)
      if (idx !== -1) group.items.splice(idx, 1)
    },
  })
}

const allItems = computed<CheckItem[]>(() => [
  ...bagGroups.flatMap((g) => g.items),
])

onMounted(() => {
  const savedProfile = localStorage.getItem(PROFILE_KEY) as ProfileId | null
  loadProfile(
    savedProfile && savedProfile in STORAGE_KEYS ? savedProfile : 'essentiel'
  )
})

watch(
  bagGroups,
  (groups) => {
    const data = groups.map((g) => ({
      id: g.id,
      title: g.title,
      items: g.items,
    }))
    localStorage.setItem(
      STORAGE_KEYS[activeProfile.value],
      JSON.stringify(data)
    )
  },
  { deep: true }
)

const totalCount = computed(() => allItems.value.length)
const checkedCount = computed(
  () => allItems.value.filter((i) => i.checked).length
)
const progressPercent = computed(() =>
  totalCount.value
    ? Math.round((checkedCount.value / totalCount.value) * 100)
    : 0
)
const allDone = computed(
  () => totalCount.value > 0 && checkedCount.value === totalCount.value
)

const doneIn = (group: BagGroup) => group.items.filter((i) => i.checked).length
const groupDone = (group: BagGroup) =>
  group.items.length > 0 && doneIn(group) === group.items.length

function toggle(item: CheckItem) {
  item.checked = !item.checked
}

function checkGroup(group: BagGroup) {
  group.items.forEach((item) => (item.checked = true))
}

function uncheckGroup(group: BagGroup) {
  group.items.forEach((item) => (item.checked = false))
}

function checkAll() {
  allItems.value.forEach((item) => (item.checked = true))
}

function uncheckAll() {
  allItems.value.forEach((item) => (item.checked = false))
}

function resetAll() {
  confirm.require({
    message:
      'La checklist retrouvera ses sections et items par défaut : sections ajoutées, renommées ou déplacées et cases cochées seront perdues. Continuer ?',
    header: 'Réinitialiser la checklist',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Réinitialiser',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    rejectProps: { severity: 'secondary', outlined: true },
    accept: () => {
      resetUiState()
      bagGroups.splice(
        0,
        bagGroups.length,
        ...defaultGroups(activeProfile.value)
      )
      localStorage.removeItem(STORAGE_KEYS[activeProfile.value])
    },
  })
}
</script>
