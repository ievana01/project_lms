<template>
  <v-container class="container">
    <v-card elevation="20" class="card-login">
      <div class="logo">
        <img class="set-image" src="/public/img/logobulat.png"></img>
        <v-card-title class="justify-center">
          <v-text-field label="Username" variant="solo"></v-text-field>
          <v-text-field label="Password" variant="solo"></v-text-field>
          <v-btn class="btn-login label-login" to="/dasbor">LOGIN</v-btn>
          <div class="text-center" style="padding: 20px 0;">
            <h5><a href="/forgot" style="color: var(--blue);">Lupa username/password?</a></h5>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </v-container>
</template>

<style>
</style>