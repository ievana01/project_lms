<template>
  <div class="ms-4">
    <h1>Forum Kelas</h1>
    <h2>Nama topik forum - nama kelas</h2>
  </div>

  <div class="ms-4 mr-4 mb-4">
    <v-sheet color="var(--grey)" rounded>
      <div class="ms-2 pt-2 pb-1">
        <p style="color: blue">Nama pembuat forum</p>
        <v-sheet class="bg-white mr-2" rounded>
          <div class="ms-2 mr-12">
            <p>isi keterangan forum - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima
              dignissimos, impedit ratione
              explicabo eveniet consequatur excepturi dolor! Sed nihil temporibus harum veritatis totam rem ipsa quaerat
              nesciunt quo odio.</p>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>

  <div class="ms-12 mr-4 mb-4">
    <v-sheet color="var(--grey)" rounded v-for="(komentar, index) in komentar" :key="index">
      <div class="ms-2 pt-2 pb-2 mt-2">
        <p style="color: blue">{{ komentar.nama_mahasiswa }}</p>
        <v-sheet class="bg-white mr-2" rounded>
          <div class="ms-2 mr-12">
            <p>{{ komentar.isi }}</p>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
const komentar = [
  {
    nama_mahasiswa: 'Sarah', isi: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima dignissimos, impeditratione'
  },
  {
    nama_mahasiswa: 'Lala', isi: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima dignissimos, impeditratione'
  },
  {
    nama_mahasiswa: 'Thomas', isi: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum minima dignissimos, impeditratione'
  },
]
</script>

<style></style>