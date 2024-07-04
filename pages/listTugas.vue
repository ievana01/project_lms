<template>
  <div class="ms-4 pb-2">
    <h1>Tugas untuk Semua Kursus</h1>
  </div>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'going'">Sedang Berjalan</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'late'">Terlambat</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="ms-4 mr-4 mb-4 ma-2" v-if="daftarTugas != 0">
    <v-sheet v-for="(tugas, index) in daftarTugas" :key="index" :max-height="expandedPanels[index] ? 'auto' : 'auto'"
      elevation="2" rounded v-if="selectedBtn == 'going'">
      <v-row>
        <v-col cols="10">
          <div class="pl-2">
            <span @click="toggleExpansionPanel(index)">
              <v-icon>{{ expandedPanels[index] ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon> {{
                tugas.courseName }}
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expandedPanels[index]" class="px-4">
        <div class="ms-4 mr-2 pb-2">
          <NuxtLink :to="`/kelas/${tugas.acId}`" style="color: black;">
            <div class="ms-4">
              <span>{{ tugas.name }}</span><br>
              <span>Ditutup: {{ formattedDate(tugas.dateEnd) }}</span>
            </div>
          </NuxtLink>
        </div>
      </v-row>
    </v-sheet>
  </div>
  <div v-else>
    <v-sheet>
      <div class="ms-3 pt-3 pb-3">
        <p>Tidak ada tugas tersedia</p>
      </div>
    </v-sheet>
  </div>

  <div v-if="selectedBtn === 'late'" class="ms-2 mr-2">
    <v-sheet v-if="lateAssignments.length > 0" style="background-color: var(--grey); min-height: 50px; width: 100%;" rounded>
      <div class="ms-2 pt-2">
        <p>Ada tugas terlambat</p>
      </div>
    </v-sheet>
    <v-sheet v-else style="background-color: var(--grey); min-height: 50px; width: 100%;" rounded>
      <div class="ms-2 pt-2">
        <p>Tidak ada tugas terlambat</p>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const { $viewport } = useNuxtApp();

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint);
});
const selectedBtn = ref('going');

const token = useCookie('token');
const { data: tugas } = await useFetch('/api/daftartugas', {
  headers: {
    'Authorization': `Bearer ${token.value}`
  }
});

const daftarTugas = ref(tugas.value);
const now = new Date();
const lateAssignments = ref(daftarTugas.value.filter(tugas => new Date(tugas.dateEnd) < now));

const expandedDesKelas = ref(false);
const expandedPanels = ref(daftarTugas.value.map(() => false));

const toggleExpansionDesKelas = () => {
  expandedDesKelas.value = !expandedDesKelas.value;
};

const toggleExpansionPanel = (index) => {
  expandedPanels.value[index] = !expandedPanels.value[index];
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
};
</script>

<style scoped></style>
