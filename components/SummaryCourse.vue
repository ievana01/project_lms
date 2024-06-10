<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-for="(kelas, index) in kelas" :key="index">
        <v-card style="background-color: #F5F5F5;">
          <v-img src="/public/img/course.jpg" style="height: 100px; width: 250px;"></v-img>
          <br>

          <div style="padding: 0 10px 0 10px;">
            <h1>{{ kelas.nama_kelas }}</h1>
            <h6>Deskripsi Kelas</h6>
            <p style="text-align: justify;">{{ kelas.deskripsi }}</p>

            <h6>Capaian Pembelajaran</h6>
            <p style="text-align: justify;">{{ kelas.tujuan }}</p>
            <v-progress-linear v-model="kelas.selesai" height="10" width="300" rounded bg-color="red" color="#612D81">
            </v-progress-linear>
            <h6>{{ Math.ceil(kelas.selesai) }}% selesai</h6>
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
export default {
  setup() {
    const kelasFiltered = ref([])
    return { kelasFiltered }
  },
  props: [
    'kelas'
  ],
  methods: {
    navigateToKelas(nama_kelas) {
      window.location.href = `/kelas/${nama_kelas}`;
    },
  },
}
</script>

<style></style>