<template>
  <div>
    <v-sheet class="ms-4 mr-4 pt-2 pb-2" style="background-color: #F5F5F5;" rounded>
      <h6 v-if="profileApi" class="ms-2 ma-1">Selamat datang, {{ profileApi.fullName }}!👋</h6>
    </v-sheet>
  </div>

  <TampilanBtn @option-selected="showComponent" class="ms-2 mr-2" />

  <div class="ms-4">
    <v-text-field v-model="search" density="compact" label="Cari Kelas"
      prepend-inner-icon="mdi-magnify" variant="solo-filled" flat single-line style="width: 250px;"></v-text-field>
  </div>

  <div>
    <CardCourse :kelas="filteredKelas" v-if="selectedOption === 'Kartu'" />
    <ListCourse :kelas="filteredKelas" v-else-if="selectedOption === 'Daftar'" />
    <SummaryCourse :kelas="filteredKelas" v-else-if="selectedOption === 'Ringkasan'" />
  </div>

</template>

<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()
// profile
let token = useCookie('token')
const { data: profile } = await useFetch('/api/profile', {
});
const profileApi = ref();
profileApi.value = profile.value;

// course
const { data: course } = await useFetch('/api/course', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataCourse = ref(course.value);

const search = ref('');
const filteredKelas = computed(() => {
  if (!search.value) {
    return dataCourse.value;
  }
  return dataCourse.value.filter(course =>
    course.courseName && course.courseName.toLowerCase().includes(search.value.toLowerCase())
  );
});

//detail course
const { data: detail } = await useFetch('/api/deskCourse', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const detailCourse = detail.value;

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

const option = ['Kartu', 'Daftar', 'Ringkasan']

const selectedOption = ref('Kartu')

const viewStore = useViewStore()

watch(() => viewStore.viewMode, (newVal) => {
  selectedOption.value = newVal
})

// tampilan kelas->daftar, list / ringkasan 
const showComponent = (option) => {
  selectedOption.value = option
}

onMounted(() => {
  const storedMode = localStorage.getItem('viewMode')
  selectedOption.value = storedMode && option.includes(storedMode) ? storedMode : 'Kartu'
})

</script>

<style></style>