<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const options = [
  { label: 'Acara Kursus', value: 'Acara Kursus' },
  { label: 'Acara Pengguna', value: 'Acara Pengguna' },
]
const state = reactive({
  namaAcara: '',
  tanggal: '',
  selectMenu: undefined,
})

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}

const dialog = ref(false);
const selectedDate = ref(null);

const openDatePicker = () => {
  dialog.value = true;
};

const closeDatePicker = () => {
  dialog.value = false;
};

const formatDate = (date: Date): string  => {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(date);
};
</script>

<template>
  <h1 class="ms-2" style="color: var(--purple);">MENAMBAHKAN ACARA BARU</h1>
  <UForm :state="state" class="ms-2 mr-2 space-y-4" @submit="onSubmit">
    <UFormGroup name="input" label="Nama Acara">
      <UInput v-model="state.namaAcara" style="border: 1px solid grey!important;" />
    </UFormGroup>
    <UFormGroup name="selectMenu" label="Pilih Kategori Acara">
      <USelectMenu v-model="state.selectMenu" placeholder="Silahkan memilih" :options="options"
        style="border: 1px solid grey!important;" />
    </UFormGroup>

    <div>
      <span style="font-size: 14px;">Pilih tanggal</span>
      <v-sheet style="border: 1px solid grey!important;" rounded @click="openDatePicker">
        <div class="ms-2 pt-1 pb-1">
          <v-icon>mdi-calendar-month</v-icon>
          <span class="ms-2">{{ selectedDate ? formatDate(selectedDate) : 'Pilih tanggal' }}</span>
        </div>
      </v-sheet>
      <v-dialog v-model="dialog" @click="closeDatePicker" class="ms-2">
        <v-date-picker v-model="selectedDate" locale="id"></v-date-picker>
      </v-dialog>
    </div>
  </UForm>

  <div class="text-center mt-4">
    <v-btn class="button pa-2 mr-2 ml-2">SIMPAN</v-btn>
    <v-btn class="button pa-2 mr-2 ml-2">BATAL</v-btn>
  </div>
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
</style>