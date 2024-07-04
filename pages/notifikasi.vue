<template>
  <div class="ms-2 mt-2">
    <h1>Notifikasi</h1>
  </div>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'Tugas'">Tugas</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" to="" @click="selectedBtn = 'Kuis'">Kuis</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="ms-2 mr-2 mt-4" v-for="(notif, index) in getNotification" :key="index">
    <div v-if="notif.categoryName == 'assignment'">
      <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" rounded v-if="selectedBtn === 'Tugas'">
        <div class="ms-3 pt-3 pb-3">
          <h3>Pengingat Tugas</h3>
          <h4>{{ notif.acName }}</h4>
          <p>Tugas Pertemuan 1</p>
          <p>{{ notif.message }}</p>
        </div>
      </v-sheet>
    </div>
    <div v-else>
      <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" rounded v-if="selectedBtn === 'Tugas'">
        <div class="ms-3 pt-3 pb-3">
          <h3>Pengingat Tugas</h3>
          <p>Tidak ada tugas tersedia</p>
        </div>
      </v-sheet>
    </div>

    <div v-if="selectedBtn === 'Kuis'">
      <div v-if="notif.categoryName == 'quiz'">
        <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" class="" rounded
          v-if="selectedBtn === 'Kuis'">
          <div class="ms-3 pt-3 pb-3">
            <h3>Pengingat Kuis</h3>
            <h4>{{ notif.acName }}</h4>
            <p>Tugas Pertemuan 1</p>
            <p>{{ notif.message }}</p>
          </div>
        </v-sheet>
      </div>
      <div v-else>
        <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" rounded>
          <div class="ms-3 pt-3 pb-3">
            <h3>Pengingat Kuis</h3>
            <p>Tidak ada kuis tersedia</p>
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup>
const done = ref(false);

const toggleDone = () => {
  done.value = !done.value;
};

const selectedBtn = ref('Tugas');

const token = useCookie('token');
const { data: notification } = await useFetch('/api/get-notification', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const getNotification = ref(notification.value);
console.log(getNotification);
</script>

<style>
.btn-mark-done {
  color: green !important;
}

.btn-done {
  color: white !important;
  background-color: green !important;
}
</style>