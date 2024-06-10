<template>
  <div v-if="$viewport.isLessThan('tablet')">
    <div class="ms-4">
      <h1>Tugas untuk Semua Kursus</h1>
    </div>
    <div class="ms-4 mr-4 mb-4 ma-2">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Bahasa Indonesia</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="d-flex">
              <div class="pt-4">
                <v-icon>mdi-clipboard-text</v-icon>
              </div>
              <div class="ms-2">
                <span>Tugas Pertemuan 1</span><br>
                <span>Ditutup : Friday, 26 April 2024, 12:00 PM</span>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="ms-4 mr-4 mb-4 ma-2">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Bahasa Inggris</v-expansion-panel-title>
          <v-expansion-panel-text>
            <h6>Tidak ada tugas tersedia</h6>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <div class="ms-4">
      <h1>Tugas untuk Semua Kursus</h1>
    </div>
    <div class="d-flex">
      <div class="ms-4">
        <v-btn class="button mb-4" style="width: 120px;" @click="selectedKelas = 'Bahasa Indonesia'">Bahasa <br>Indonesia</v-btn><br>
        <v-btn class="button" style="width: 120px;" @click="selectedKelas = 'Bahasa Inggris'">Bahasa <br> Inggris</v-btn>
      </div>
      <v-sheet style="background-color: var(--grey);height: auto; width: 100%;" class="ms-4 pb-4 mr-4" rounded>
        <v-card class="ms-2 mr-2 mt-4" v-if="selectedKelas === 'Bahasa Indonesia'">
          <div class="d-flex">
            <div class="pt-4 ms-2">
              <v-icon>mdi-clipboard-text</v-icon>
            </div>
            <div class="ms-2">
              <span>Tugas Pertemuan 1</span><br>
              <span>Ditutup : Friday, 26 April 2024, 12:00 PM</span>
            </div>
          </div>
        </v-card>

        <v-card class="ms-2 mr-2 mt-4" v-if="selectedKelas === 'Bahasa Inggris'">
          <div class="d-flex">
            <div class="ms-2 mt-2 mb-2">
              <span>Tidak ada tugas tersedia</span>
            </div>
          </div>
        </v-card>
      </v-sheet>
    </div>
  </div>

</template>

<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

const selectedKelas = ref('Bahasa Indonesia');
</script>

<style></style>