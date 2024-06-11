<template>
  <v-app-bar :elevation="0" class="pb-3 pt-1">
    <img class="logo-panjang ml-4" src="public/img/logopanjang.png" alt="">
    <div class="ml-auto pr-4">
      <v-btn rounded="xs" class="btn-login" to="/login">LOGIN</v-btn>
    </div>
  </v-app-bar>

  <!-- mobile  -->
  <div v-if="$viewport.isLessThan('tablet')">
    <div class="container-foto">
      <v-img class="set-foto" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
    </div>
    <div class="container-info">
      <v-card class="color-purple" style="max-height: 235px;">
        <v-card-text>
          <h1>Informasi Penting UTS Genap 2023-2024</h1>
          <ul class="pl-10">
            <li class="font-li">Ujian Tengah Semester (22 April 2024 - 6 May 2024)</li>
            <li class="font-li">Ujian Akhir Semester (22 April 2024 - 6 May 2024)</li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <div class="container-foto">
      <v-img class="pt-14" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <div class="overlay d-flex justify-center align-center">
          <v-card width="1136px" height="235px" class="color-purple">
            <v-card-text>
              <h1>Informasi Penting UTS Genap 2023-2024</h1>
              <ul class="pl-10">
                <li>Ujian Tengah Semester (22 April 2024 - 6 May 2024)</li>
                <li>Ujian Akhir Semester (22 April 2024 - 6 May 2024)</li>
              </ul>
            </v-card-text>
          </v-card>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blank'
})
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})
</script>

<style>
.container-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-height: 120px;
  padding: 10px 20px 0;
}

.logo {
  margin: 0;
  padding: 0;
}

.logo-container {
  display: flex;
  align-items: center;
}

.btn-container {
  display: flex;
  align-items: center;
  padding: 30px 0 0;
}

.font-btn {
  font-size: 24px !important;
  font-weight: bold !important;
  color: var(--yellow) !important;
  background-color: var(--purple) !important;
}

.image-container {
  position: relative;
  width: 100%
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 80%;
}

li {
  font-size: 22px;
  font-weight: normal;
}

/* .btn-login{
  background-color: #612D81 !important;
  color: #FCF4B0 !important;
  font-weight: bold !important;
} */
</style>
