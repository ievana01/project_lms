<template>
  <div class="kursus pt-4">
    <div class="pt-4">
      <h6 class="ms-4">Kursus Saya</h6>
    </div>

    <div class="ml-auto mr-2">
      {{ selectedStore }}
      <v-select v-model="selected" :items="option" prepend-icon="mdi-view-grid-outline" width="190px"
        @update:model-value="updateView"></v-select>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const viewStore = useViewStore()
const option = ['Kartu', 'Daftar', 'Ringkasan']
const selected = ref('Kartu')

const updateView = (val) => {
  selected.value = val
  viewStore.setViewMode(val)
  localStorage.setItem('viewMode', val)
}

onMounted(() => {
  const storedMode = localStorage.getItem('viewMode')
  if (storedMode && option.includes(storedMode)) {
    selected.value = storedMode 
  }
})

</script>

<style>
.kursus {
  display: flex;
}
</style>