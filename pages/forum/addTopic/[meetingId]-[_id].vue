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
const router = useRouter();

const token = useCookie('token');
const { data: topik } = await useFetch('/api/get-forum-kelas', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.meetingId })
});

const topikKelas = topik.value;

const forumName = ref('');
const deskripsi = ref('');
const meetingId = ref(useRoute().params.meetingId);
const forumId = ref(useRoute().params._id);

const addForum = async () => {
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
        forumId: forumId.value,
      }),
    });

    if (response.ok) {
      alert('Berhasil menambahkan topik baru')
      router.push(`/forum/${meetingId.value}-${forumId.value}`);
    } else {
      alert('Gagal menambahkan topik')
    }
  } catch (error) {
    console.error('Error saving forum:', error);
  }
};
</script>
