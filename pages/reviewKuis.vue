<template>
    <div class="text-right mt-4">
      <v-btn class="pa-2 mr-4 ml-2" to="kerjaKuis" color="red" style="font-weight: bold;">01:20:05</v-btn>
    </div>

    <div class="ms-2 mr-2 mt-3">
      <v-sheet style="background-color: var(--grey);" class="pt-2 pb-6">
        <div class="ms-4 pt-4 pb-2">
          <h1>NAVIGASI KUIS</h1>
          <v-btn class="mb-2 mr-2" color="white">1</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">2</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">3</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">4</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">6</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">7</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">8</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">9</v-btn> <span>Pertanyaan terjawab</span><br>
          <v-btn class="mb-2 mr-2" color="white">10</v-btn> <span>Pertanyaan terjawab</span><br>
        </div>
        <div class="text-center mt-4">
          <v-btn class="button mb-4" to="/kerjakuis">mengerjakan kembali</v-btn><br>
          <v-btn class="button" style="width: 236px;" to="/kumpulkuis">kumpulkan kuis</v-btn>
        </div>
      </v-sheet>
    </div>
</template>

<script>
definePageMeta({
  layout: 'kuis'
})
</script>

<style>
</style>