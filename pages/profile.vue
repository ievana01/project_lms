<template>
  <v-container class="ms-1">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Detail Pengguna</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Alamat email</v-list-item-title>
                <v-list-item-subtitle>{{ user[0].email }}</v-list-item-subtitle>
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
          <div class="text-right">
            <NuxtLink to="/editprofil"><v-btn class="button pa-2 mr-2 ml-2" rounded="lg">EDIT PROFIL</v-btn></NuxtLink>
          </div>

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
              <v-list-item>
                <v-list-item-title>
                  <li><a href="" style="color: var(--blue);font-size: 14px;">Kelas 4</a></li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Laporan</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="/jelajahiSesi" style="color: var(--blue);font-size: 14px;">Jelajahi Sesi</a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="" style="color: var(--blue);font-size: 14px;">Nilai</a></li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Aktivitas masuk</v-card-title>
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
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Privasi dan Kebijakan</v-card-title>
          <a href="/privasi" style="color: var(--blue); font-weight: bold" class="ms-4">Baca Selengkapnya</a>
        </v-card>
        <v-card class="pa-4 mt-4" elevation="20">
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
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Aplikasi Seluler</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Kode QR untuk Aplikasi Seluler</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-row>
              <v-col cols="auto">
                <v-icon size="100" color="black" x-large>mdi-qrcode</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const user = [
  {
    nama: 'Sarah',
    nrp: '1236895',
    email: 'sarah1234@gmail.com',
    noHp: '',
    foto: '',
  }
]
</script>

<style>
.bold {
  font-weight: bold !important;
  ;
}
</style>