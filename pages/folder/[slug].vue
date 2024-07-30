<template>
  <div class="ms-2">
    <h1 style="color: var(--purple)">{{ detailFolder.activeCourseName }}</h1>
    <h4>{{ detailFolder.meetingName }}</h4>
    <p>{{ detailFolder.name }}</p>
  </div>

  <div class="ms-2 mr-2 mb-3" v-for="(data, index) in detailFolder.links" :key="index">
    <NuxtLink :to="data.link">
      <v-sheet rounded style="min-height: 45px; border: 2px solid var(--purple);">
        <div class="pt-2 ms-2">
          <v-icon left>mdi-file</v-icon> {{ data.name }}
        </div>
      </v-sheet>
    </NuxtLink>
  </div>
</template>

<script setup>
let token = useCookie('token');

const { data: folder } = await useFetch('/api/get-folder-detail', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});
const detailFolder = ref(folder.value);
</script>

<style>

</style>