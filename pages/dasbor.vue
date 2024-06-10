<template>
  <div>
    <v-sheet class="ms-4 mr-4 pt-2 pb-2" style="background-color: #F5F5F5;" rounded>
      <h6 class="ms-2 ma-1">Selamat datang, nama mahasiswa!</h6>
    </v-sheet>
  </div>

  <TampilanBtn @option-selected="showComponent" class="ms-2 mr-2"/>

  <div class="ms-4">
    <v-text-field v-model="search" @change="searchKelas" density="compact" label="Search"
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
const kelas = [
  {
    nama_kelas: 'Bahasa Indonesia',
    deskripsi: 'Kelas ini fokus pada pengembangan keterampilan menulis tingkat lanjut dan retorika. Siswa belajar menulis esai akademis yang jelas dan koheren, mengembangkan argumen yang logis, serta melakukan penelitian yang mendalam. Kursus ini juga mengajarkan teknik-teknik retorika untuk memperkuat kemampuan berbicara dan menulis persuasif.',
    tujuan: 'Tujuan kelas Bahasa Indonesia adalah untuk mengembangkan keterampilan berbahasa siswa, mencakup kemampuan membaca, menulis, mendengarkan, dan berbicara dengan baik dan benar.Secara keseluruhan, kelas Bahasa Indonesia bertujuan untuk membekali siswa dengan keterampilan komunikasi yang efektif, pemikiran kritis, serta apresiasi terhadap budaya dan sastra Indonesia, yang penting untuk keberhasilan akademis dan profesional di masa depan.',
    selesai: 20,
  },
  {
    nama_kelas: 'Bahasa Inggris',
    deskripsi: 'Kelas ini menekankan keterampilan menulis tingkat lanjut, termasuk penulisan makalah penelitian, esai persuasif, dan tulisan kreatif. Siswa belajar mengorganisasi ide mereka, mengembangkan argumen, dan menggunakan format sitasi yang tepat. Kurikulum juga mencakup ulasan tentang aturan tata bahasa yang kompleks dan peningkatan kosakata.',
    tujuan: 'Tujuan kelas Bahasa Inggris di berbagai tingkat pendidikan adalah untuk mengembangkan keterampilan dasar dan lanjutan dalam membaca, menulis, mendengarkan, dan berbicara.Secara keseluruhan, kelas Bahasa Inggris bertujuan untuk membekali siswa dengan kemampuan komunikasi yang efektif, pemikiran kritis, dan apresiasi terhadap sastra dan budaya, yang semuanya penting untuk keberhasilan akademis dan profesional di masa depan.',
    selesai: 50,
  },
]

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

const search = ref('')
let filteredKelas = ref(kelas)

const searchKelas = () => {
  filteredKelas.value = (kelas.filter((x) => x.nama_kelas.toString().toLowerCase().includes(search.value)))
}

const selectedOption = ref('Kartu')

// tampilan kelas->daftar, list / ringkasan 
const showComponent = (option) => {
  selectedOption.value = option
}

</script>

<style></style>