<template>
  <div class="ms-4 mt-2">
    <h1>Bahasa Indonesia</h1>
    <h6>Tugas Pertemuan 1</h6>
    <p>Dibuka : Jumat, 20 April 2024, 12:00 </p>
    <p>Ditutup : Jumat, 26 April 2024, 11.59</p>
  </div>
  <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 mb-6">
    <p class="pl-2 pr-2">Dalam tugas ini, siswa diminta untuk menulis sebuah esai deskriptif tentang pengalaman masa
      kecil yang paling
      berkesan. Esai ini harus mencakup deskripsi detail tentang tempat, orang-orang yang terlibat, serta perasaan dan
      suasana yang dialami. Siswa harus menggunakan berbagai teknik deskriptif untuk membuat pembaca dapat membayangkan
      dan merasakan pengalaman tersebut</p>
  </v-sheet>

  <div class="ms-4">
    <h6>Pengumpulan Tugas</h6>
    <div>
      <v-sheet color="var(--grey)" rounded class="mr-2" @click="triggerFileInput">
        <div v-if="!uploadedFile" class="text-center pt-8 pb-8">
          <v-icon size="x-large">mdi-arrow-down-bold</v-icon>
          <p>Tarik dan taruh berkas anda</p>
        </div>
        <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange">
      </v-sheet>

      <v-sheet v-if="uploadedFile" class="mt-4 mr-4" color="var(--grey)">
        <div class="ms-2 pt-2 pb-2">
          <p>File yang diunggah:</p>
          <p><strong>Nama File:</strong> {{ uploadedFile.name }}</p>
        </div>
      </v-sheet>
    </div>
    <br>
    <span>Jenis tugas yg diterima : <br> pdf</span>
  </div>

  <div class="text-center mt-16">
    <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">SIMPAN</v-btn>
    <v-btn class="button pa-2 mr-2 ml-2" to="/tugas" rounded="lg">BATAL</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      if (files.length) {
        this.uploadedFile = files[0];
      }
    }
  }
};
</script>


<style>
.file-input-wrapper {
  position: relative;
  display: inline-block;
}

.file-input {
  padding-left: 2.5rem;
  /* Tambahkan jarak untuk ikon */
}

.file-input-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #888;
}
</style>