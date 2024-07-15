<template>
  <div>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<style>

</style>