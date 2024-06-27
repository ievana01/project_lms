<template>
  <div>
    <h1 class="ms-2" style="color: var(--purple);">TAMBAH TOPIK BARU</h1>
    <div class="ms-2 mr-2">
      <v-text-field v-model="forumName" label="Nama topik" variant="solo"></v-text-field>
      <v-text-field v-model="deskripsi" label="Deskripsi" variant="solo"></v-text-field>
    </div>
    <div class="text-center mt-16">
      <v-btn class="button pa-2 mr-2 ml-2" @click="addForum">KIRIM KE FORUM</v-btn>
      <v-btn class="button pa-2 mr-2 ml-2" color="red">BATAL</v-btn>
    </div>
  </div>
</template>

<script setup>

const token = useCookie('token');
const { data: topik } = await useFetch('/api/get-forum-diskusi', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const topikKelas = ref(topik.value); // Pastikan topikKelas diinisialisasi sebagai ref()

const forumName = ref('');
const deskripsi = ref('');
const meetingId = ref(useRoute().params.meetingId);
const forumId = ref(useRoute().params._id);

const addForum = async () => {
  console.log(forumName.value);
  console.log(deskripsi.value);
  console.log(meetingId.value);
  console.log(forum.value);
  
  try {
    const response = await fetch('/api/add-forum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({
        name: forumName.value,
        content: deskripsi.value,
        meetingId: meetingId.value,
        topicId: topicId.value,
      }),
    });

    if (response.ok) {
      const tambahForum = await response.json();
      topikKelas.value.push(tambahForum); // Pastikan push ke topikKelas.value
    } else {
      console.error('Failed to save forum:', response.statusText);
    }
  } catch (error) {
    console.error('Error saving forum:', error);
  }
};
</script>
