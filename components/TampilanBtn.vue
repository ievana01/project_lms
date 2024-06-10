<template>
  <div class="kursus pt-4">
    <div class="pt-4">
      <h6 class="ms-2">Kursus Saya</h6>
    </div>

    <div class="ml-auto mr-2">
      <v-select v-model="selected" :items="option" prepend-icon="mdi-view-grid-outline" width="190px"
        @update:modelValue="emitOptionSelected"></v-select>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const option = ['Kartu', 'Daftar', 'Ringkasan']
const selected = ref<string | null>('Kartu')

const emit = defineEmits(['option-selected'])

const emitOptionSelected = (value: string) => {
  emit('option-selected', value)
}
</script>

<style>
.kursus {
  display: flex;
}
</style>