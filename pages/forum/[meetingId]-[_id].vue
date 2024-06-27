<template>
  <NuxtLink :to="`/forum/addTopic/${topikKelas[0].meetingId}-${idForum}`">
    <v-btn class="button ms-4 mb-2" rounded="x-large">tambahkan topik diskusi</v-btn>
  </NuxtLink>
  <CardForum :topikKelas="topikKelas" />
</template>

<script setup>
let token = useCookie('token');
const { data: topik } = await useFetch('/api/get-forum-kelas', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.meetingId })
});
const idForum = useRoute().params._id

const topikKelas = topik.value;
console.log(topikKelas.value);

</script>

<style></style>