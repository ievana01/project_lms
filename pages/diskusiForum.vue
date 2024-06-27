<template>
  <div class="ms-4">
    <h1 style="color: var(--purple)">DISKUSI FORUM</h1>
    <h2 v-if="diskusiForum.length > 0">Postingan dibuat oleh {{ diskusiForum[0][0].createdByName }}</h2>
  </div>

  <div class="ms-4 mr-4 mb-4">
    <v-sheet color="var(--grey)" rounded v-for="(forumGroup, groupIndex) in diskusiForum" :key="groupIndex">
      <div class="ms-2 pt-2 pb-2 mt-2" v-for="(forum, forumIndex) in forumGroup" :key="forumIndex">
        <p style="color: blue">{{ forum.name }} - {{ forum.acName }}</p>
        <template v-if="forumIndex > 0">
          <v-sheet class="bg-white mr-2" rounded>
            <div class="ms-2 mr-12 pt-2">
              <p>{{ forum.content }}</p>
            </div>
          </v-sheet>
        </template>
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
console.log(diskusiForum.value);
</script>

<style></style>
