<template>
  <div class="ms-3 mr-3">
    <v-row class="list-card">
      <v-col v-for="(presensi, index) in presensi" :key="index">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="ms-2 mt-2">
            <h6>{{ presensi.pertemuan }}</h6>
            <p>Status: {{ presensi.status }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: [
    'presensi'
  ],
}
</script>

<style></style>