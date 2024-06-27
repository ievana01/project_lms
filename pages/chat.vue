<template>
  <div v-if="$viewport.isLessThan('tablet')">
    <div v-if="!selectedUser">
      <div class="ms-2">
        <v-btn class="button" prepend-icon="mdi-plus" rounded="lg">pesan baru</v-btn>
        <div class="mt-4">
          <h1>Pesan</h1>
        </div>
      </div>

      <div class="ms-2">
        <v-text-field density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
          single-line style="width: 250px;"></v-text-field>
      </div>
      <div class="ms-2 mr-2 mb-4" @click="openChat('Sarah')">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="d-flex">
            <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
            <v-card-text class="mt-2">Sarah</v-card-text>
          </div>
        </v-card>
      </div>
      <div class="ms-2 mr-2 mb-4" @click="openChat('Martin')">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="d-flex">
            <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
            <v-card-text class="mt-2">Martin</v-card-text>
          </div>
        </v-card>
      </div>
      <div class="ms-2 mr-2" @click="openChat('Lala')">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="d-flex">
            <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
            <v-card-text class="mt-2">Lala</v-card-text>
          </div>
        </v-card>
      </div>
    </div>

    <div v-else>
      <v-sheet color="var(--grey)" rounded class="d-flex align-center justify-space-between ms-2 mr-2">
        <v-icon @click="selectedUser = null">mdi-chevron-left</v-icon>
        <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
        <span>{{ selectedUser }}</span>
        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon v-if="showMutedIcon" color="grey darken-3">mdi-volume-off</v-icon>
            <v-btn color="var(--purple)" dark v-bind="props" icon="mdi-dots-horizontal-circle-outline"
              variant="text"></v-btn>
          </template>
          <v-list style="background-color: #F0D7FF; border: 2px solid #612D81!important;">
            <v-list-item v-for="(item, index) in item" :key="index">
              <v-btn variant="text" color="black" @click="showAlert(item.action)">{{ item.title }}</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-sheet>
      <div class="ms-11 pt-4 mr-3">
        <!-- (left aligned) -->
        <v-sheet width="160px" color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
          class="d-flex align-center justify-space-between mb-4">
          <div class="pt-2 ms-2">
            <p>hai</p>
          </div>
          <div class="mr-2">
            <v-icon size="x-small">mdi-check-all</v-icon>
          </div>
        </v-sheet>
        <!-- (right aligned) -->
        <v-sheet width="160px" color="var(--grey)"
          style="border: 2px solid black; margin-left: auto; margin-bottom: 16px;"
          class="d-flex align-center justify-space-between mb-4">
          <div class="pt-2 ms-2">
            <p>hai</p>
          </div>
          <div class="mr-2">
            <v-icon size="x-small">mdi-check-all</v-icon>
          </div>
        </v-sheet>
      </div>
      <div class="ms-2 mr-2 pt-5"
        style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px">
        <v-text-field density="compact" label="Ketik pesan anda disini..." prepend-inner-icon="mdi-plus" variant="solo"
          flat single-line rounded="lg" class="ms-2 mr-2" @click="triggerFileInput">
          <template v-slot:append-inner>
            <v-btn icon="mdi-emoticon-outline" variant="text" color="#612D81"></v-btn>
            <v-btn icon="mdi-send" variant="text" color="#612D81"></v-btn>
          </template>
        </v-text-field>
      </div>
    </div>
  </div>

  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <div class="ms-2 d-flex">
      <v-sheet style="background-color: var(--grey); width: 400px;" class="pt-4 pb-4">
        <div class="ms-2">
          <v-btn class="button" prepend-icon="mdi-plus" rounded="lg">pesan baru</v-btn>
          <div class="mt-4">
            <h1>Pesan</h1>
          </div>
        </div>

        <div class="ms-2 mr-2">
          <v-text-field density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo" flat
            single-line style="width: 200px;"></v-text-field>
        </div>
        <div v-for="user in users" :key="user.name" class="ms-2 mr-2 mb-4">
          <v-card color="var(--white)" style="max-height: auto;" @click="selectUser(user)">
            <div class="d-flex">
              <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
              <v-card-text class="mt-2">{{ user.name }}</v-card-text>
            </div>
          </v-card>
        </div>
      </v-sheet>

      <v-sheet v-if="!selectedUser"
        style="background-color: var(--grey); width: 100%; display: flex; justify-content: center; align-items: center;"
        class="ms-4 mr-4 text-center">
        <v-card text="Pilih obrolan untuk memulai mengirim pesan" color="var(--purple)"
          style="color: white; width: 400px;" class="ms-4 mr-4">
        </v-card>
      </v-sheet>

      <div v-if="selectedUser" style="width: 100%;">
        <v-sheet color="var(--grey)" rounded class="d-flex align-center justify-space-between ms-2 mr-2">
          <v-icon @click="selectedUser = null">mdi-chevron-left</v-icon>
          <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
          <span>{{ selectedUser.name }}</span>
          <v-spacer></v-spacer>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-icon v-if="showMutedIcon" color="grey darken-3">mdi-volume-off</v-icon>
              <v-btn color="var(--purple)" dark v-bind="props" icon="mdi-dots-horizontal-circle-outline"
                variant="text"></v-btn>
            </template>
            <v-list style="background-color: #F0D7FF; border: 2px solid #612D81!important;">
              <v-list-item v-for="(item, index) in item" :key="index">

                <v-btn variant="text" color="black" @click="showAlert(item.action)">{{ item.title }}</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-sheet>
        <div class="ms-11 pt-4 mr-3">
          <!-- (left aligned) -->
          <v-sheet width="160px" color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
            class="d-flex align-center justify-space-between mb-4">
            <div class="pt-2 ms-2">
              <p>hai</p>
            </div>
            <div class="mr-2">
              <v-icon size="x-small">mdi-check-all</v-icon>
            </div>
          </v-sheet>
          <!-- (right aligned) -->
          <v-sheet width="160px" color="var(--grey)"
            style="border: 2px solid black; margin-left: auto; margin-bottom: 16px;"
            class="d-flex align-center justify-space-between mb-4">
            <div class="pt-2 ms-2">
              <p>hai</p>
            </div>
            <div class="mr-2">
              <v-icon size="x-small">mdi-check-all</v-icon>
            </div>
          </v-sheet>
        </div>
        <div class="ms-2 mr-2 pt-5"
          style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px;">
          <v-text-field density="compact" label="Ketik pesan anda disini..." variant="solo" flat single-line
            rounded="lg" class="ms-2 mr-2">
            <template v-slot:prepend-inner>
              <v-btn icon="mdi-plus" variant="text" color="#612D81" class="" @click="triggerFileInput"></v-btn>
            </template>
            <template v-slot:append-inner>
              <v-btn icon="mdi-emoticon-outline" variant="text" color="#612D81"></v-btn>
              <v-btn icon="mdi-send" variant="text" color="#612D81"></v-btn>
            </template>
          </v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

const users = ref([
  { name: 'Sarah' },
  { name: 'Martin' },
  { name: 'Lala' }
]);

const selectedUser = ref(null);

const selectUser = (user) => {
  selectedUser.value = user;
};

const item = ref([
  { title: 'Blokir Pengguna', action: 'block' },
  { title: 'Bisukan', action: 'mute' },
  { title: 'Hapus Percakapan', action: 'delete' },
])

const openChat = (user) => {
  selectedUser.value = user;
}

let fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const { $swal } = useNuxtApp()
let showMutedIcon = false;
const showAlert = (action) => {
  if (action === 'block') {
    $swal.fire({
      title: 'Blokir',
      showCancelButton: true,
      text: 'Apakah anda yakin ingin memblokir pengguna ini?',
      confirmButtonText: 'Blokir',
      cancelButtonText: 'Batal',
    })
  } else if (action === 'delete') {
    $swal.fire({
      title: 'Hapus',
      showCancelButton: true,
      text: 'Apakah anda yakin ingin menghapus percakapan ini?',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    })
  } else if (action === 'mute') {
    showMutedIcon = true;
  }

  return { showMutedIcon };
}

</script>

<style></style>