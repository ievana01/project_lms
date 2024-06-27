<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

let token = useCookie('token')
const { data: profile } = await useFetch('/api/profile', {
});

const profileApi = ref();
profileApi.value = profile.value;

const state = reactive({
  namaDepan: '',
  namaBelakang: '',
  email: '',
  noHp: '',
  deskripsi: '',
})

async function onSubmit(event: FormSubmitEvent<any>) {
  console.log(event.data)
}

const uploadedFile: Ref<File | null> = ref(null);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  if (files && files.length > 0) {
    uploadedFile.value = files[0];
  }
};

const isInputDisabled = ref(true);

</script>

<template>
  <h1 class="ms-4" style="color: var(--purple);">EDIT PROFIL</h1>
  <UForm :state="state" class="ms-4 mr-4 space-y-4" @submit="onSubmit">
    <UFormGroup name="input" label="Nama" enabled>
      <UInput v-model="profileApi.fullName" style="border: 1px solid grey!important;" :disabled="isInputDisabled"/>
    </UFormGroup>

    <UFormGroup name="input" label="Email" enabled>
      <UInput v-model="profileApi.email" style="border: 1px solid grey!important;" :disabled="isInputDisabled" />
    </UFormGroup>

    <UFormGroup name="input" label="No HP">
      <UInput v-model="profileApi.phoneNumber" style="border: 1px solid grey!important;" />
    </UFormGroup>

    <UFormGroup name="textarea" label="Deskripsi">
      <UTextarea v-model="state.deskripsi" style="border: 1px solid grey!important;" />
    </UFormGroup>

    <div>
      <span style="font-size: 14px;">Foto Pengguna</span>
      <div>
        <v-sheet rounded @click="triggerFileInput" style="border: 1px solid grey;">
          <div v-if="!uploadedFile" class="text-center pt-8 pb-8">
            <v-icon size="x-large">mdi-arrow-down-bold</v-icon>
            <p style="font-size: 14px;">Tarik dan taruh foto anda</p>
          </div>
          <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange">
        </v-sheet>

        <v-sheet v-if="uploadedFile" class="mt-4 mr-4" color="var(--grey)">
          <div class="ms-2 pt-2 pb-2">
            <p style="font-size: 14px;">File yang diunggah:</p>
            <p style="font-size: 14px;"> {{ uploadedFile.name }}</p>
          </div>
        </v-sheet>
      </div>
    </div>

    <div class="text-right mt-2">
      <v-btn class="button pa-2 mr-2 ml-2">UBAH PROFIL</v-btn>
      <v-btn class="button pa-2 mr-2 ml-2" to="/profile">BATAL</v-btn>
    </div>
  </UForm>
</template>

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

.disable{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>