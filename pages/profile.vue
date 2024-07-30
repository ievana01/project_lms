<template>
  <v-container class="ms-1">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Detail Pengguna</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Nama</v-list-item-title>
                <v-list-item-subtitle>{{ profileApi.fullName }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Alamat email</v-list-item-title>
                <v-list-item-subtitle>{{ profileApi.email }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Nomor Hp</v-list-item-title>
                <v-list-item-subtitle>{{ profileApi.phoneNumber }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Deskripsi</v-list-item-title>
                <v-list-item-subtitle>{{ profileApi.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <div class="text-right">
            <NuxtLink to="/editprofil"><v-btn class="button" rounded="lg">UBAH PROFIL</v-btn></NuxtLink>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20" style="min-height: 340px;">
          <v-card-title class="bold">Daftar Kelas</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(course, index) in dataCourse" :key="index" link :to="`/kelas/${course.acId}`">
                <li class="font-li">{{ course.courseName }}</li>
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
                  <li><a href="/jelajahiSesi" class="ukuran-font">Jelajahi Sesi</a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="/nilai" class="ukuran-font">Nilai</a></li>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="20">
          <v-card-title class="bold">Aktivitas Masuk</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-subtitle class="ukuran-font">Akses pertama ke situs</v-list-item-subtitle>
                <v-list-item-subtitle class="ukuran-font">{{formattedDate(profileApi?.access?.firstAccess)}}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle class="ukuran-font">Akses terakhir ke situs</v-list-item-subtitle>
                <v-list-item-subtitle class="ukuran-font">{{formattedDate(profileApi?.access?.lastAccess)}}</v-list-item-subtitle>
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
                  <li><a href="/forumPost" class="ukuran-font">Postingan Forum </a></li>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <li><a href="/diskusiForum" class="ukuran-font">Diskusi Forum</a></li>
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
                <v-list-item-title class="ukuran-font">Kode QR untuk Aplikasi Seluler</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-row>
              <v-col cols="auto">
                <v-icon class="ms-2" size="80" color="black" x-large>mdi-qrcode</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

let token = useCookie('token')
const { data: profile } = await useFetch('/api/profile', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const profileApi = ref();
profileApi.value = profile.value;
const access = profileApi.value.access;

const { data: course } = await useFetch('/api/course', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataCourse = ref();
dataCourse.value = course.value;

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};
</script>

<style>
.bold {
  font-weight: bold !important;
  ;
}

</style>