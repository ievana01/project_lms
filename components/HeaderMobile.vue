<template>
  <div style="padding-bottom: 0;">
    <v-app-bar :elevation="0">
      <v-btn class="ma-2 ml-0" size="x-small" color="#612D81" icon="mdi-menu" @click.stop="drawer = !drawer"></v-btn>
      <img class="set-foto-header mr-4" src="public/img/logopanjang.png" alt="">

      <div class="icon ml-auto pr-2">
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-account" variant="outlined" to="/profile"></v-btn>
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-chat" variant="outlined" to="/chat"></v-btn>
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-bell" variant="outlined" to="/notifikasi"></v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary color="#612D81" style="width: 150px;"
      :rounded="false">
      <v-list density="compact" nav>
        <v-list-item link to="/dasbor">
          <h4>Dasbor</h4>
        </v-list-item>

        <v-list-item>
          <h4>Kursus Saya</h4>
          <div v-if="dataCourse && dataCourse.length">
            <v-list-item v-for="(course, index) in dataCourse" :key="index" link :to="`/kelas/${course.acId}`">
              <li class="font-li">{{ course.courseName }}</li>
            </v-list-item>
          </div>
        </v-list-item>
        <v-list-item link to="/nilai">
          <h4>Nilai</h4>
        </v-list-item>
        <v-list-item link to="/listTugas">
          <h4>Tugas</h4>
        </v-list-item>
        <v-list-item link to="calendar">
          <h4>Kalendar</h4>
        </v-list-item>
        <v-list-item link @click="logout">
          <h4>Keluar</h4>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script setup>
import Swal from 'sweetalert2';

const drawer = ref(false);
let token = useCookie('token');
const userId = useCookie('userId')
const { data: course } = await useFetch('/api/course', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataCourse = ref(course.value || []);

const logout = async () => {
  try {
    const { data: logoutResponse } = await useFetch('/api/logout', {
      method: 'POST',
      body: JSON.stringify({ profileToken: token.value })
    });
    console.log(logoutResponse)
    if (logoutResponse.value.status == 200) {

      token.value = null;
      userId.value = null;
      Swal.fire({
        title: 'Berhasil',
        text: 'Sukses Logout',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigateTo('/login')
      })
    } else {
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Gagal logout',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<style>
.set-foto-header {
  width: 133px;
  height: 39px;
}

.icon {
  display: flex;
  justify-content: flex-end;
}
</style>
