<template>
  <NavButton/>
  <CardPresensi :presensi="presensi" />
</template>

<script setup>
const presensi = [
  {
    pertemuan: 'Pertemuan Week 1',
    status: 'Hadir',
  },
  {
    pertemuan: 'Pertemuan Week 2',
    status: 'Ijin'
  },
  {
    pertemuan: 'Pertemuan Week 3',
    status: 'Hadir',
  },
]
</script>

<style></style>