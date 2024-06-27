<template>
  <v-container class="ms-1">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Kategori</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <li class="font-li">Acara Kursus</li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li class="font-li">Acara Pengguna</li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-text>
            <div v-for="(event, index) in dataEvent" :key="index" class="mb-3">
              <v-list style="background-color: var(--grey);" rounded>
                <div class="ms-2 mr-2 pt-1">
                  <h1>{{ event.name }}</h1>
                  <p>Tanggal: {{ formattedDate(event.date) }}</p>
                  <p>Kategori: {{ event.category }}</p>
                  <p v-if="event.acName">Kelas : {{ event.acName }}</p>
                </div>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <div class="text-right">
            <v-btn class="button pa-2 mr-2 ml-2" to="/tambahEvent">TAMBAH ACARA</v-btn>
          </div>
          <v-container fluid class="d-flex justify-center align-center">
            <v-layout row wrap class="d-flex justify-center align-center">
              <div>
                <v-date-picker v-model="date" color="var(--purple)">
                  <template v-slot:header>
                    <div></div>
                  </template>
                </v-date-picker>
              </div>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const date = ref(new Date());

let token = useCookie('token');
const { data: event } = await useFetch('/api/get-event', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataEvent = ref(event.value);
console.log(dataEvent.value);

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};
</script>

<style>
.bold {
  font-weight: bold !important;
}

.v-date-picker__title {
  display: none !important;
}
</style>