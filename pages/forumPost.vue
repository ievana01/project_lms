<template>
  <div class="ms-4">
    <h1 style="color: var(--purple)">POSTINGAN FORUM</h1>
    <h2 v-if="dataForum.length > 0">Postingan dibuat oleh {{ dataForum[0].createdByName }}</h2>
  </div>
  <div class="ms-4">
    <v-text-field v-model="search" density="compact" label="Cari Topik Forum"
      prepend-inner-icon="mdi-magnify" variant="solo-filled" flat single-line style="width: 350px;"></v-text-field>
  </div>
  <div class="ms-4 mr-4 mb-4">
    <NuxtLink :to="`/forum/detailForum/${forum._id}`" v-for="(forum, index) in filteredTopik" :key="index">
      <v-sheet color="var(--grey)" rounded>
        <div class="ms-2 pt-2 pb-2 mt-2">
          <p style="color: blue">{{ forum.name }} - {{ forum.acName }}</p>
          <v-sheet class="bg-white mr-2" rounded>
            <div class="ms-2 mr-12 pt-2">
              <p>{{ forum.content }}.</p>
            </div>
          </v-sheet>
        </div>
      </v-sheet>
    </NuxtLink>
  </div>
</template>

<script setup>
const token = useCookie('token');
const { data: forum } = await useFetch('/api/get-forum-post', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const dataForum = ref(forum.value || []);
const search = ref('');

const filteredTopik = computed(() => {
  if (!search.value) {
    return dataForum.value;
  }
  return dataForum.value.filter(forum =>
    forum.name && forum.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style></style>
