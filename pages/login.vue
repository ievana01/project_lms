<template>
  <v-container class="container">
    <v-card elevation="20" class="card-login">
      <div class="logo" @click.prevent="login">
        <img class="set-image" src="/public/img/logobulat.png"></img>
        <v-card-title class="justify-center">
          <v-text-field label="Username" variant="solo" v-model="username"></v-text-field>
          <v-text-field label="Password" variant="solo" v-model="password"></v-text-field>
          <v-btn class="btn-login label-login" to="/dasbor">LOGIN</v-btn>
          <div class="text-center" style="padding: 20px 0;">
            <h5><a href="/forgot" style="color: var(--blue);">Lupa username/password?</a></h5>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </v-container>
</template>

<style></style>

<script setup>
definePageMeta({
  layout: 'blank'
})

let username = ref('');
let password = ref('');

const login = async () => {
  const { data } = await useFetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ username: username.value, password: password.value }),
  });
  console.log(data.value);
}
</script>
