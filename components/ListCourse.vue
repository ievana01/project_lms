<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-for="(kelas, index) in kelas" :key="index">
        <NuxtLink :to="`/kelas/${kelas.acId}`">
          <v-card class="pl-2 pr-2 pt-3" style="background-color: #F5F5F5;">
            <h1>{{ kelas.courseName }}</h1>
            <v-progress-linear v-model="kelas.complition" height="10" width="300" rounded bg-color="red" color="#612D81">
            </v-progress-linear>
            <h6>{{ kelas.complition ? Math.ceil(kelas.complition) : 0 }}% selesai</h6>
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

<style></style>