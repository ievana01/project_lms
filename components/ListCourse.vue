<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-for="(kelas, index) in kelas" :key="index">
        <v-card class="pl-2 pr-2" style="background-color: #F5F5F5;">
          <h1>{{ kelas.nama_kelas }}</h1>
          <v-progress-linear v-model="kelas.selesai" height="10" width="300" rounded bg-color="red" color="#612D81">
          </v-progress-linear>
          <h6>{{ Math.ceil(kelas.selesai) }}% selesai</h6>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  setup(){
    const kelasFiltered = ref([])
    return {kelasFiltered}
  },
  props:[
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

</style>