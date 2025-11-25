<template>
  <Button icon="pi pi-arrow-left" label="Retour" @click="handleClick" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  useRouter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useRouter: false,
})

const emit = defineEmits(['go-back'])
const router = useRouter()

function handleClick() {
  if (props.useRouter) {
    router.back()
  } else {
    emit('go-back')
  }
}
</script>
