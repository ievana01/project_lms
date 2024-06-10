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
            <v-list>
              <h6>Tidak ada tugas/acara yang tersedia</h6>
            </v-list>
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

<script>
export default {
  data() {
    return {
      date: new Date(),
    }
  },
}
</script>

<style>
.bold {
  font-weight: bold !important;
}

.v-date-picker__title {
  display: none!important;
}
</style>