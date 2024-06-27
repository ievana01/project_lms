<template>
  <div>
    <h1 class="ms-2" style="color: var(--purple);">TAMBAH TOPIK BARU</h1>
    <div class="ms-2 mr-2">
      <v-text-field label="Nama forum" variant="solo"></v-text-field>
      <v-text-field label="Deskripsi" variant="solo"></v-text-field>
    </div>
    <div class="text-center mt-16">
        <v-btn class="button pa-2 mr-2 ml-2"  @click="addForum">KIRIM KE FORUM</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" color="red">BATAL</v-btn>
      </div>
  </div>
</template>
<script setup>
const forumName = ref('');
const deskripsi = ref('');

const addForum = async () => {
  console.log(forumName.value)
  console.log(deskripsi.value)
  try {
    const response = await fetch('/api/add-forum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: forumName.value,
        content: deskripsi.value,
      }),
    });
    console.log(response)
    if (response.ok) {
      const tambahForum = await response.json();
      
    } else {
      console.error('Failed to save comment:', response.status);
    }
  } catch (error) {
    console.error('Error saving comment:', error);
  }
};
</script>
