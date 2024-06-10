<template>
  <div class="ms-2 mt-2">
    <h1>Notifikasi</h1>
  </div>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'Tugas'">Tugas</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'Kuis'">Kuis</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="ms-2 mr-2 mt-4">
    <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" class="" rounded
      v-if="selectedBtn === 'Tugas'">
      <div class="ms-3 pt-3 pb-3">
        <h3>Pengingat Tugas</h3>
        <h4>Bahasa Indonesia</h4>
        <p>Tugas Pertemuan 1</p>
        <p>Tugas Anda akan dikumpulkan dalam waktu kurang dari 1 jam</p>
        <v-btn :class="done ? 'btn-done' : 'btn-mark-done'" @click="toggleDone" variant="outlined">
          {{ done ? 'Done' : 'Mark as Done' }}
        </v-btn>
      </div>
    </v-sheet>

    <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" class="" rounded
      v-if="selectedBtn === 'Kuis'">
      <div class="ms-3 pt-3 pb-3">
        <h3>Pengingat Kuis</h3>
        <p>Tidak ada kuis tersedia</p>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
const done = ref(false);

const toggleDone = () => {
  done.value = !done.value;
};

const selectedBtn = ref('Tugas');
</script>

<style>
.btn-mark-done {
  color: green !important;
}

.btn-done {
  color: white !important;
  background-color: green !important;
}
</style>