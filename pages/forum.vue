<template>
  <NavButton />

  <NuxtLink to="/tambahtopik"><v-btn class="button pa-2 mr-2 ml-2 mt-4 mb-4" rounded="xl">tambahkan topik diskusi</v-btn></NuxtLink>

  <CardForum :topik="topik" />
</template>

<script lang="ts" setup>
const topik = [
  { nama_topik: 'Topik 1', nama_dosen: 'dosen1' },
  { nama_topik: 'Topik 2', nama_dosen: 'dosen3' },
  { nama_topik: 'Topik 3', nama_dosen: 'dosen2' },
]
</script>

<style></style>