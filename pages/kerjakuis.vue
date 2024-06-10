<template>
    <div class="text-right mt-4">
      <v-btn class="pa-2 mr-4 ml-2" to="kerjaKuis" color="red" style="font-weight: bold;">01:20:05</v-btn>
    </div>

    <div class="kuis-container ms-4 mr-4 mt-4">
      <div class="soal-container">
        <v-card class="mb-4">
          <div class="d-flex ms-2 mt-4">
            <h1>Soal 1</h1>
            <v-icon class="ms-3">mdi-flag-variant-outline</v-icon>
            <a href="">Flag Question</a>
          </div>
          <div class="ms-4">
            <h4 style="font-weight: normal;">Nelayan menghasilkan?</h4>
            <v-radio-group>
              <v-radio label="Sayuran" value="one"></v-radio>
              <v-radio label="Padi" value="two"></v-radio>
              <v-radio label="Ikan" value="three"></v-radio>
            </v-radio-group>
          </div>
        </v-card>

        <v-card>
          <div class="d-flex ms-2 mt-4">
            <h1>Soal 2</h1>
            <v-icon class="ms-3">mdi-flag-variant-outline</v-icon>
            <a href="">Flag Question</a>
          </div>
          <div class="ms-4">
            <h4 style="font-weight: normal;">Contoh lainnya?</h4>
            <v-radio-group>
              <v-radio label="Opsi 1" value="one"></v-radio>
              <v-radio label="Opsi 2" value="two"></v-radio>
              <v-radio label="Opsi 3" value="three"></v-radio>
            </v-radio-group>
          </div>
        </v-card>
        <div class="btnnext mt-16">
          <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">sebelumnya</v-btn>
          <v-btn class="button pa-2 mr-2 ml-2"rounded="lg">selanjutnya</v-btn>
        </div>
      </div>

      <div class="navigasi-container">
        <div style="background-color: var(--grey);" class="navigasi" rounded>
          <h1 class="ms-3 pt-2">NAVIGASI KUIS</h1>
          <div class="ms-3">
            <v-btn class="mb-2 mr-2" color="white">1</v-btn>
            <v-btn class="mb-2 mr-2" color="white">2</v-btn>
            <v-btn class="mb-2 mr-2" color="white">3</v-btn>
            <v-btn class="mb-2 mr-2" color="white">4</v-btn>
            <v-btn class="mb-2 mr-2" color="white">5</v-btn>
            <v-btn class="mb-2 mr-2" color="white">6</v-btn>
            <v-btn class="mb-2 mr-2" color="white">7</v-btn>
            <v-btn class="mb-2 mr-2" color="white">8</v-btn>
            <v-btn class="mb-2 mr-2" color="white">9</v-btn>
            <v-btn class="mb-2 mr-2" color="white">10</v-btn>
          </div>
          <div class="text-center mt-8 mb-4">
            <v-btn class="button pa-2 mr-2 ml-2" to="reviewKuis" rounded="lg">selesaikan kuis</v-btn>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
definePageMeta({
  layout: 'kuis'
})
</script>

<style>
.kuis-container {
  display: flex;
  flex-direction: column;
}

.btnnext {
  display: flex;
  justify-content: space-between;
}

.nomor {
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  background-color: white !important;
}

.nomor-container {
  display: flex;
}

/* Media queries for larger screens */
@media (min-width: 1024px) {
  .kuis-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
  }

  .soal-container {
    grid-column: 1 / 2;
  }

  .navigasi-container {
    grid-column: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .navigasi {
    margin-top: 0px;
  }

  .btnnext {
    grid-column: 2/3;
    grid-row: 2/3;
  }

  .text-center {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}
</style>