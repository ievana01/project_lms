<template>
  <!-- Untuk mendapatkan semua topic yang dibuat oleh semua user pada course yang diikuti murid -->
  <div class="ms-4">
    <h1 style="color: var(--purple)">DISKUSI FORUM</h1>
  </div>

  <div class="ms-4">
    <v-text-field v-model="search" density="compact" label="Cari Topik Forum"
      prepend-inner-icon="mdi-magnify" variant="solo-filled" flat single-line style="width: 350px;"></v-text-field>
  </div>

  <div class="ms-2 mr-4 mb-2">
    <v-sheet rounded v-for="(forumGroup, groupIndex) in filteredTopik" :key="groupIndex">
      <div class="ms-2 pt-2 mt-2" v-for="(forum, forumIndex) in forumGroup" :key="forumIndex">  
        <NuxtLink :to="`/forum/detailForum/${forum._id}`">
            <v-sheet class="mr-2 " rounded color="var(--grey)">
              <div class="ms-2 mr-2 pt-2 pb-1">
                <p style="color: blue">{{ forum.name }} - {{ forum.acName }}</p>
              </div>
            </v-sheet>
        </NuxtLink>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>

let token = useCookie('token');
const { data: forum } = await useFetch('/api/get-forum-diskusi', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const diskusiForum = ref(Array.isArray(forum.value) ? forum.value : [forum.value]);

const search = ref('');
const filteredTopik = computed(() => {
  if (!search.value) {
    return diskusiForum.value;
  }
  return diskusiForum.value.map(group => 
    group.filter(forum =>
      forum.name && forum.name.toLowerCase().includes(search.value.toLowerCase())
    )
  ).filter(group => group.length > 0);
});
</script>

<style>
/* Add any styles if necessary */
</style>
