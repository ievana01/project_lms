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
  <CardParticipant :peserta="listPeserta" />
</template>

<script setup>
let token = useCookie('token')
const { data: participant } = await useFetch('/api/listpeserta', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});

const listPeserta = ref();
listPeserta.value = participant.value;
</script>

<style></style>