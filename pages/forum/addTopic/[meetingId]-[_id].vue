<template>
  <div>
    <h1 class="ms-2" style="color: var(--purple);">TAMBAH TOPIK BARU</h1>
    <div class="ms-2 mr-2">
      <v-text-field v-model="forumName" label="Nama topik" variant="solo"></v-text-field>
      <v-text-field v-model="deskripsi" label="Deskripsi" variant="solo"></v-text-field>
    </div>
    <div class="text-center mt-16">
      <v-btn class="button pa-2 mr-2 ml-2" @click="addForum">KIRIM KE FORUM</v-btn>
      <v-btn class="button pa-2 mr-2 ml-2" color="red" :to="`/forum/${topikKelas[0].meetingId}-${idForum}`">BATAL</v-btn>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';

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
    if(forumName.value === '' || deskripsi.value === ''){
      Swal.fire({
            title: 'Gagal',
            text: 'Nama topik dan deskripsi wajib diisi!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
      return;
    }
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
      Swal.fire({
        title: 'Berhasil',
        text: 'Berhasil menambahkan topik baru',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push(`/forum/${meetingId.value}-${forumId.value}`)
      });
    } else {
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Gagal tambah topik',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  } catch (error) {
    console.error('Error saving forum:', error);
  }
};
</script>
