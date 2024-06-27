<template>
  <div class="ms-3 mr-3">
    <v-row class="list-card">
      <v-col v-for="(presensi, index) in presensi" :key="index">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="ms-3 mt-2">
            <h6>{{ presensi.meetingName }}</h6>
            <p>Tanggal: {{ formattedDate(presensi.timestamp) }}</p>
            <p>Status: {{ presensi.status }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const props = defineProps({
  presensi: {
    type: Array,
    required: true
  }
})

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
};
</script>

<style></style>