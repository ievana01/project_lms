<template>
  <div>
    <v-row class="py-2">
      <v-col cols="auto" class="d-flex">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/kelas/${useRoute().params.slug}`">Kursus</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/peserta/${useRoute().params.slug}`">Peserta</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" :to="`/listpresensi/${useRoute().params.slug}`">Presensi</v-btn>
      </v-col>
    </v-row>
  </div>
  <div v-if="!listPresensi.length" class="ms-2 mr-2 mt-4">
    <v-card color="var(--grey)" style="max-height: auto;">
      <div class="ms-3 mt-3">
        <p>Data presensi belum tersedia</p>
      </div>
    </v-card>
  </div>
  <div v-else>
    <CardPresensi :presensi="listPresensi" />
  </div>
</template>

<script setup>
let token = useCookie('token')
const { data: attendances } = await useFetch('/api/listpresensi', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});

const listPresensi = ref();
listPresensi.value = attendances.value;
</script>

<style></style>