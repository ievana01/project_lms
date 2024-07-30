<template>
  <v-container class="card-kelas ms-0">
    <v-row class="ga-6">
      <v-col v-for="(kelas, index) in kelas" :key="index" class="pt-0" style="max-width: 345px;">
        <NuxtLink :to="`/kelas/${kelas.acId}`">
          <v-card style="background-color: #F5F5F5; width: 345px; padding-top: 20px;">
            <div class="d-flex justify-center">
              <img src="/public/img/course.jpg" alt="" style="width: 180px;">
            </div>
            <br>
            <div style="padding: 0 10px 0 10px;">
              <h1>{{ kelas.courseName }}</h1>
              <v-progress-linear v-model="kelas.complition" height="10" width="300" rounded bg-color="red" color="#612D81">
              </v-progress-linear>
              <h6>{{ kelas.complition ? Math.ceil(kelas.complition) : 0 }}% selesai</h6>
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
  }
})

const kelasFiltered = ref([])
</script>

<style>
.card-kelas {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
