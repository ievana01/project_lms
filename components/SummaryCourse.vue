<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-if="kelas.length" v-for="(item, index) in kelas" :key="index">
        <NuxtLink :to="`/kelas/${item.acId}`">
          <v-card style="background-color: #F5F5F5;">
            <v-img src="/public/img/course.jpg" style=" width: 200px;" class="ms-2 mt-2"></v-img>
            <br>
            <div style="padding: 0 10px 0 10px;">
              <h1>{{ item.courseName }}</h1>
              <h6>Deskripsi Kelas</h6>
              <p style="text-align: justify;">{{ getDeskripsi(item.courseName) }}</p>
              <h6>Capaian Pembelajaran</h6>
              <p style="text-align: justify;">{{ getPurpose(item.courseName) }}</p>
              <v-progress-linear v-model="item.complition" height="10" width="300" rounded bg-color="red" color="#612D81"></v-progress-linear>
              <h6>{{ item.complition ? Math.ceil(item.complition) : 0 }}% selesai</h6>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  kelas: {
    type: Array,
    required: true
  },
})

// Mengambil data dari API
let token = useCookie('token')
const { data: descCourse } = await useFetch('/api/deskCourse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ profileToken: token.value })
})

// Menyimpan data deskripsi kelas
const desKelas = ref(descCourse.value)

// Fungsi untuk mendapatkan deskripsi berdasarkan nama kelas
const getDeskripsi = (courseName) => {
  const course = desKelas.value.find(course => course.name === courseName)
  return course ? course.description : 'Deskripsi tidak tersedia'
}

// Fungsi untuk mendapatkan tujuan berdasarkan nama kelas
const getPurpose = (courseName) => {
  const course = desKelas.value.find(course => course.name === courseName)
  return course ? course.purpose : 'Tujuan tidak tersedia'
}

</script>

<style>
/* Tambahkan gaya sesuai kebutuhan */
</style>
