<template>
    <div>
      <v-row class="py-2">
        <v-col cols="auto" class="d-flex">
          <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/kelas/${detailCourse._id}`">Kursus</v-btn>
          <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/peserta/${detailCourse._id}`">Peserta</v-btn>
          <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/listpresensi/${detailCourse._id}`">Presensi</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-row class="align-center ms-1">
      <v-col cols="12" md="2" lg="2">
        <v-img src="public/img/bg.jpeg" style="width: 300px;"></v-img>
      </v-col>
      <v-col class="ms-2">
        <h5 class="pt-2">{{ detailCourse.name }}</h5> {{dataCourse}}
        <p>{{ desKelas.code }}</p>
        <p>{{ detailCourse.lecturerName }}</p>
      </v-col>
    </v-row>
    <CardPertemuan :file="file" :pertemuan="pertemuan" />
  </template>
  
  <script setup>
  import { useNuxtApp } from '#app'
  const { $viewport } = useNuxtApp()
  
  watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
    console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
  })
  
  let token = useCookie('token')
  
  const { data: course } = await useFetch('/api/get-detailCourse', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
  });
  const detailCourse = ref();
  detailCourse.value = course.value;
  
  const { data: descCourse } = await useFetch('/api/deskCourse', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value})
  });
  const desKelas = ref(descCourse.value);
  if (descCourse.value && descCourse.value.length > 0) {
    desKelas.value = descCourse.value[0];
  }
  </script>
  
  <style>
  .foto {
    width: 365px;
    height: 80px;
    padding-left: 10px;
  }
  
  .file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 16px;
  }
  </style>
  
