<template>
  <v-form>
    <div class="ms-2 mr-2">
      <h1>TAMBAH ACARA</h1>
      <v-text-field label="Nama Acara" variant="solo"></v-text-field>
      <v-select label="Pilih Kategori Acara" :items="['Acara Kelas', 'Acara Pengguna']"></v-select>

      <div>
        <span style="font-size: 14px;">Pilih Tanggal</span>
        <v-sheet style="border: 1px solid grey!important;" rounded @click="openDatePicker" height="56px">
          <div class="ms-2 pt-1 pb-1">
            <v-icon>mdi-calendar-month</v-icon>
            <span class="ms-2" style="font-size: 14px;">{{ selectedDate ? formatDate(selectedDate) : 'Pilih tanggal'
              }}</span>
          </div>
        </v-sheet>
        <v-dialog v-model="dialog" @click="closeDatePicker" class="ms-2">
          <v-date-picker v-model="selectedDate" locale="id"></v-date-picker>
        </v-dialog>
      </div>

      <v-btn type="submit" color="primary">Submit</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const state = ref({
  namaAcara: '',
  selectMenu: null,
});

const options = [
  { label: 'Acara Kursus', value: 'Acara Kursus' },
  { label: 'Acara Pengguna', value: 'Acara Pengguna' },
];

const selectedDate = ref(null);
const dialog = ref(false);
const valid = ref(false);

const rules = {
  required: value => !!value || 'Field is required',
};

const openDatePicker = () => {
  dialog.value = true;
};

const closeDatePicker = () => {
  dialog.value = false;
};

const formatDate = (date) => {
  return format(new Date(date), 'EEEE, d MMMM yyyy', { locale: id });
};

const onSubmit = () => {
  if (valid.value) {
    // Handle form submission
    console.log(state.value);
  }
};
</script>
