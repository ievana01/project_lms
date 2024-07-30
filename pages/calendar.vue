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
                  <div class="d-flex">
                    <!-- <li class="font-li">Acara Kelas</li> -->
                    <v-sheet class="bg-purple-accent-1 mr-4" width="20" height="20" rounded="xl"></v-sheet>
                    <p>Acara Kelas</p>
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <div class="d-flex">
                    <!-- <li class="font-li">Acara Pengguna</li> -->
                    <v-sheet class="bg-light-blue-accent-3 mr-4" width="20" height="20" rounded="xl"></v-sheet>
                    <p>Acara Pengguna</p>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        
        <v-card class="pa-4 mt-4" elevation="20">
          <div class="text-right">
            <v-btn class="button pa-2 mr-2 ml-2" to="/tambahEvent">TAMBAH ACARA</v-btn>
          </div>
          <v-container fluid class="d-flex justify-center align-center">
            <v-layout row wrap class="d-flex justify-center align-center">
              <div>
                <v-calendar
                  :events="events"></v-calendar>
              </div>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pt-3" elevation="20">
          <v-card-text>
            <div v-if="dataEvent">
              <div v-for="(event, index) in filteredDataEvent" :key="index">
                <v-card class="mb-4" rounded elevation="5" :color="event.category === 'acara kelas' ? 'purple-accent-1' : event.category === 'acara pengguna' ? 'light-blue-accent-3' : ''">
                  <v-card-text>
                    <div class="ms-2 mr-2 pt-1">
                      <h6>{{ event.name }}</h6>
                      <p>Tanggal: {{ formattedDate(event.date) }}</p>
                      <p>Kategori: {{ event.category }}</p>
                      <p v-if="event.acName">Kelas : {{ event.acName }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
            <div v-else>
              <p>Tidak event tersedia</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
 import { useDate } from 'vuetify'

const date = ref(new Date());

let token = useCookie('token');
const { data: event } = await useFetch('/api/get-event', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataEvent = ref(event.value);

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};

const events = ref([]);
const colors= ['purple-accent-1','light-blue-accent-3'];

const fetchEvents = ({ start, end }) => {
  const event = []
  const data = dataEvent.value;
  for (let i = 0; i < data.length; i++) {
    const first = new Date(data[i].date)
    const second = new Date(data[i].date)
    console.log(first, second);

    event.push({
      title: "",
      start: first,
      end: second,
      color: data[i].category =='acara kelas' ? colors[0] : colors[1],
      allDay: false,
    })
  }
  events.value = event;
};

const filteredDataEvent = computed(() => {
  const adapter = useDate();
  const startOfMonth = adapter.startOfMonth(new Date());
  const endOfMonth = adapter.endOfMonth(new Date());
  return dataEvent.value.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startOfMonth && eventDate <= endOfMonth;
  });
});

onMounted(() =>{
  const adapter = useDate()
    fetchEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
});
</script>

<style scope>
.bold {
  font-weight: bold !important;
}

.v-date-picker__title {
  display: none !important;
}

.v-calendar-month__days > .v-calendar-month__day {
    min-height: 50px!important;
}

.v-calendar-month__weeknumber {
    padding-top: 6px;
    background: rgb(var(--v-theme-surface-light));
    border-bottom: thin solid #e0e0e0;
    color: rgba(var(--v-theme-on-surface-light), var(--v-high-emphasis-opacity));
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    visibility: hidden;
}
</style>