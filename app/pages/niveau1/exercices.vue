<template>
  <div class="min-h-screen text-white">
    <div class="relative mt-[3rem] overflow-hidden px-4 py-20">
      <div class="relative z-10 mx-auto max-w-7xl px-6">
        <h1 class="mb-4 text-center text-6xl font-bold">
          <span class="text-yellow-500">Exercices pratiques</span>
        </h1>
        <p class="mx-auto max-w-3xl text-center text-xl text-gray-300"></p>
      </div>
    </div>

    <div class="mx-auto -mt-12 flex max-w-7xl flex-col gap-[2rem] px-6 pb-20">
      <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        <ModalsExercicesCard
          title="Vidage de masque"
          description="Voir les deux technique"
          image-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0Cpxd3840vQ3rY6oBlvJ7gbEFbNCh3KbTg&s"
          :features="[]"
        >
          <Button
            label="Voir en vidéo"
            severity="contrast"
            size="small"
            @click="
              openVideoDialog(
                'https://www.youtube.com/embed/rf-w0LmaDyk?si=_TTLqxKMziZ6FRCT'
              )
            "
          >
            <template #icon>
              <Icon name="logos:youtube-icon" class="m-0 p-0" />
            </template>
          </Button>
        </ModalsExercicesCard>
        <ModalsExercicesCard
          title="Lâcher et reprise d'embout"
          description="Voir les deux technique"
          image-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0Cpxd3840vQ3rY6oBlvJ7gbEFbNCh3KbTg&s"
          :features="[]"
        >
          <Button
            label="Voir en vidéo"
            severity="contrast"
            size="small"
            @click="
              openVideoDialog(
                'https://www.youtube.com/embed/MJ3-_PwSyIQ?si=lTpboiD7AhZIhqYN'
              )
            "
          >
            <template #icon>
              <Icon name="logos:youtube-icon" class="m-0 p-0" />
            </template>
          </Button>
        </ModalsExercicesCard>
      </div>
    </div>

    <CommonVideoDialog ref="VideoDialog" />
  </div>
</template>

<script lang="ts" setup>
const VideoDialog = ref()

const openVideoDialog = (url: string, startTime?: number) => {
  VideoDialog.value.open(url, startTime)
}
</script>

<style></style>
