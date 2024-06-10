<template>
  <v-container class="card-kelas ms-0">
    <v-row class="ga-6">
      <v-col v-for="(kelas, index) in kelas" :key="index" class="pt-0" style="max-width: 345px;">
        <v-card @click="navigateToKelas(kelas.nama_kelas)"
          style="background-color: #F5F5F5; width: 345px; padding-top: 20px;">
          <v-img src="/public/img/course.jpg" style="height: 84px; width: 309px;"></v-img>
          <br>
          <div style="padding: 0 10px 0 10px;">
            <h1>{{ kelas.nama_kelas }}</h1>
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

<style>
.card-kelas {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
