<template>
  <Loading v-if="loading"></Loading>
  <div class="ms-4">
    <h1 class="font-color-purple">DAFTAR TUGAS</h1>
  </div>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" @click="selectedBtn = 'going'">Sedang Berjalan</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" @click="selectedBtn = 'late'">Terlambat</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="ms-2 mr-4 mb-2 ma-2"  v-if="selectedBtn == 'going'">
    <v-sheet v-for="(tugas, index) in filteredTugas" :key="index" :max-height="expandedPanels[index] ? 'auto' : 'auto'"
      elevation="2" rounded v-if="daftarTugas != 0 && filteredTugas.length > 0" class="mb-6">
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
    <v-sheet v-else>
      <div class="ms-3 pt-3 pb-3">
        <p>Tidak ada tugas tersedia</p>
      </div>
    </v-sheet>
  </div>

  <div v-if="selectedBtn === 'late'" class="ms-2 mr-2 mb-6" >
    <v-sheet v-if="lateAssignments.length > 0" v-for="(tugasTerlambat, index) in lateAssignments" :key="index" :max-height="expandedPanels[index] ? 'auto' : 'auto'"
      elevation="2" rounded class="mb-4" >
      <v-row >
        <v-col cols="10">
          <div class="pl-2">
            <span @click="toggleExpansionPanel(index)">
              <v-icon>{{ expandedPanels[index] ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon> {{
                tugasTerlambat.courseName }}
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expandedPanels[index]" class="px-4">
        <div class="ms-4 mr-2 pb-2">
          <NuxtLink :to="`/kelas/${tugasTerlambat.acId}`" style="color: black;">
            <div class="ms-4">
              <span>{{ tugasTerlambat.name }}</span><br>
              <span>Ditutup: {{ formattedDate(tugasTerlambat.dateEnd) }}</span>
            </div>
          </NuxtLink>
        </div>
      </v-row>
    </v-sheet>
    <v-sheet v-else style="min-height: 50px; width: 100%;" rounded>
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
const filteredTugas = ref(daftarTugas.value.filter(tugas => new Date(tugas.dateEnd) >= now));
const lateAssignments = ref(daftarTugas.value.filter(tugas => new Date(tugas.dateEnd) < now));

const expandedPanels = ref(daftarTugas.value.map(() => false));

const toggleExpansionPanel = (index) => {
  expandedPanels.value[index] = !expandedPanels.value[index];
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
};
</script>

<style scoped></style>
