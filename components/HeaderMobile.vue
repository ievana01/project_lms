<template>
  <div style="padding-bottom: 0;">
    <v-app-bar :elevation="0">
      <v-btn class="ma-2 ml-0" size="x-small" color="#612D81" icon="mdi-menu" @click.stop="drawer = !drawer"></v-btn>
      <img class="set-foto-header mr-4" src="public/img/logopanjang.png" alt="">

      <div class="icon ml-auto pr-2">
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"to="/profile"></v-btn>
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-chat" variant="outlined"></v-btn>
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-bell" variant="outlined"></v-btn>
        <v-btn class="ma-2" size="x-small" color="#612D81" icon="mdi-translate" variant="outlined"></v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary color="#612D81" style="width: 150px;" :rounded="false">
      <v-list density="compact" nav>
        <v-list-item link to="/dasbor">
          <h6>Dasbor</h6>
        </v-list-item>

        <v-list-item link to="">
          <h6>Kursus Saya</h6>
        </v-list-item>
        <v-list-item link to="/kelas"><li class="font-li">Bahasa Indonesia</li></v-list-item>
        <v-list-item link to=""><li class="font-li">Bahasa Inggris</li></v-list-item>
        
        <v-list-item link to="/nilai">
          <h6>Nilai</h6>
        </v-list-item>
        <v-list-item link to="/listTugas">
          <h6>Tugas</h6>
        </v-list-item>
        <v-list-item link to="calendar">
          <h6>Kalendar</h6>
        </v-list-item>
        <v-list-item link to="/">
          <h6>Keluar</h6>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
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
</style> -->