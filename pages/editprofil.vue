<template>
  <v-form>
    <div class="ms-2 mr-2">
      <h1 style="color: var(--purple);">EDIT PROFIL</h1>
      <v-text-field label="Nama" v-model="profileApi.fullName" variant="solo" readonly></v-text-field>
      <v-text-field label="Email" v-model="profileApi.email" variant="solo" readonly></v-text-field>

      <v-text-field label="Ubah Password" variant="solo" v-model="newPassword" type="password"></v-text-field>

      <v-text-field label="Nomor HP" variant="solo" v-model="profileApi.phoneNumber"></v-text-field>

      <v-textarea label="Deskripsi" v-model="profileApi.description" variant="solo"></v-textarea>

    </div>
  </v-form>
  <div class="text-right mt-2">
    <v-btn class="button pa-2 mr-2 ml-2" @click="updateProfile">UBAH PROFIL</v-btn>
    <v-btn class="button pa-2 mr-2 ml-2" to="/profile" color="red">BATAL</v-btn>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
const token = useCookie('token');
const { data: profile } = await useFetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token.value}`
  }
});
const profileApi = profile.value;

const newPassword = ref('');
const phoneNumber = ref('');
const description = ref('');
const router = useRouter();


const updateProfile = async () => {
  try {
    const response = await fetch('/api/edit-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({
        phoneNumber: profileApi.phoneNumber,
        description: profileApi.description,
        password: newPassword.value
      }),
    });

    if (response.ok) {
      const editProfile = await response.json();
      Swal.fire({
        title: 'Berhasil',
        text: 'Profil berhasil diubah',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/profile')
      })
    } else {
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Gagal ubah profil',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  } catch (error) {
    console.error('Error', error);
  }
};
</script>

<style>
.file-input-wrapper {
  position: relative;
  display: inline-block;
}

.file-input {
  padding-left: 2.5rem;
  /* Tambahkan jarak untuk ikon */
}

.file-input-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #888;
}

.disable {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>
