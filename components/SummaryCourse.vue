<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-if=kelas.length v-for="(kelas, index) in kelas" :key="index">
        <NuxtLink :to="`/kelas/${kelas.acId}`">
          <v-card style="background-color: #F5F5F5;">
            <v-img src="/public/img/course.jpg" style="height: 100px; width: 250px;" class="mt-4"></v-img>
            <br>
            <div style="padding: 0 10px 0 10px;">
              <h1>{{ kelas.courseName }}</h1>
              <h6>Deskripsi Kelas</h6>
              <p style="text-align: justify;">{{ desKelas.description }}</p>
              <h6>Capaian Pembelajaran</h6>
              <p style="text-align: justify;">{{ desKelas.purpose }}</p>
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
  },
})
const kelasFiltered = ref([])

let token = useCookie('token');
// detailCourse
const { data: descCourse } = await useFetch('/api/deskCourse', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value})
});
const desKelas = ref(descCourse.value);
if (descCourse.value && descCourse.value.length > 0) {
  desKelas.value = descCourse.value[0];
};
console.log(desKelas);
</script>

<style></style>