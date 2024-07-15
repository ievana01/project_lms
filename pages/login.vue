<template>
  <Loading v-if="loading"></Loading>
  <v-container class="container">
    <v-card elevation="20" class="card-login">
      <div class="logo">
        <div class="pb-2">
          <img class="set-image" src="/public/img/logobulat.png"></img>
        </div>
        <v-card-title class="justify-center">
          <v-text-field label="Username" variant="solo" v-model="username"></v-text-field>
          <v-text-field label="Password" variant="solo" v-model="password" type="password"></v-text-field>
          <v-btn class="btn-login label-login" @click="login" >LOGIN</v-btn>
          <div class="text-center pt-2">
            <h5><a href="/forgot" style="color: var(--blue);">Lupa username/password?</a></h5>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </v-container>
</template>

<style></style>

<script setup>
import Swal from 'sweetalert2';

const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

definePageMeta({
  layout: 'blank'
})

let username = ref('');
let password = ref('');

const router = useRouter()
const token = useCookie('token')
const login = async () => {
  const { data } = await useFetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ username: username.value, password: password.value }),
  });
  if (data.value) {
    if (data.value.status == 200) {
      token.value = data.value.result.profileToken;
      Swal.fire({
        title: 'Berhasil',
        text: 'Sukses Login',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        activity()
        router.push('/dasbor')
      })
    }
    else {
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Username atau password salah',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }else{
    Swal.fire({
        title: 'Error',
        text: 'Server error, silahkan muat ulang!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  }
}

const activity = async() => {
    const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
    });
};
</script>

<style>
.swal2-show {
  width: 300px;
  height: auto;
}
</style>
