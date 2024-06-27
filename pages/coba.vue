<template>
  <div>
    <v-text-field label="Username" variant="solo" ></v-text-field>
    <v-text-field label="Password" variant="solo"></v-text-field>
    <v-btn class="btn-login label-login">LOGIN</v-btn>
  </div>
</template>


<script setup>
let username = ref('');
let password = ref('');
</script>

<style></style>
