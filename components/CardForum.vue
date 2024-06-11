<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-for="(topik, index) in topik" :key="index">
        <v-card class="pl-2 pr-2" style="background-color: #F5F5F5;" to="/detailForum">
          <div class="pt-4">
            <h1>{{ topik.nama_topik }}</h1>
            <p>Dibuat oleh: {{ topik.nama_dosen }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'topik'
  ]
}
</script>
