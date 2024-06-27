<template>
  <div class="d-flex align-center mb-5  ">
    <v-btn class="ms-4" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
    <div>
      <v-card-text class="pb-0"><span class="nama">Nama Mahasiswa</span><v-btn icon="mdi-chat" variant="text" color="var(--purple)" class="ms-2"></v-btn></v-card-text>
      <v-card-text class="pb-0"><span class="nrp">NRP/No Absen</span></v-card-text>
    </div>
  </div>

  <div class="ms-4 mr-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Detail Pengguna</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Alamat email</v-list-item-title>
                <v-list-item-subtitle>aaa@gmail.com</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Provinsi</v-list-item-title>
                <v-list-item-subtitle>Jawa Timur</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Negara</v-list-item-title>
                <v-list-item-subtitle>Indonesia</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Detail Kursus</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="" style="color: var(--blue);font-size: 14px;">Bahasa Indonesia</a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="" style="color: var(--blue);font-size: 14px;">Bahasa Inggris</a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="" style="color: var(--blue);font-size: 14px;">Kelas 3</a></li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <V-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Aneka Ragam</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="/forumPost" style="color: var(--blue); font-size: 14px;">Postingan Forum </a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="/diskusiForum" style="color: var(--blue); font-size: 14px;">Diskusi Forum</a></li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </V-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Aktivitas Masuk</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-subtitle>Akses pertama ke situs</v-list-item-subtitle>
                <v-list-item-subtitle>Rabu, 16 April 2024, 15.00 (3 menit)</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>Akses terakhir ke situs</v-list-item-subtitle>
                <v-list-item-subtitle>Rabu, 16 April 2024, 15.45 (sekarang)</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
</script>

<style>
.bold {
  font-weight: bold !important;
  ;
}
</style>