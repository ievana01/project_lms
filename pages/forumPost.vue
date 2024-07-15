<template>
  <div class="ms-4">
    <h1 style="color: var(--purple)">POSTINGAN FORUM</h1>
    <h2 v-if="dataForum.length > 0">Postingan dibuat oleh {{ dataForum[0].createdByName }}</h2>
  </div>
  <div class="ms-4 mr-4 mb-4">
    <v-sheet color="var(--grey)" rounded v-for="(forum, index) in dataForum" :key="index">
      <div class="ms-2 pt-2 pb-2 mt-2">
        <p style="color: blue">{{ forum.name }} - {{forum.acName}}</p>
        <v-sheet class="bg-white mr-2" rounded>
          <div class="ms-2 mr-12 pt-2">
            <p>{{ forum.content }}.</p>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
let token = useCookie('token');
const { data: forum } = await useFetch('/api/get-forum-post', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataForum = ref(forum.value);
</script>
<style></style>