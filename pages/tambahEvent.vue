<template>
  <v-form>
    <div class="ms-2 mr-2">
      <h1 class="font-color-purple">TAMBAH ACARA</h1>
      <v-text-field label="Nama Acara" variant="solo" v-model="namaAcara"></v-text-field>
      <v-select v-model="kategoriAcara" :items="['acara kelas', 'acara pengguna']" item-text="label" item-value="value" 
        label="Pilih Kategori Acara" variant="solo"></v-select>
      <div>
        <v-sheet style="border: 1px solid grey!important;" rounded @click="openDatePicker" height="56px">
          <div class="ms-2 pt-4">
            <v-icon>mdi-calendar-month</v-icon>
            <span class="ms-2" style="font-size: 14px;">{{ selectedDate ? formatDate(selectedDate) : 'Pilih tanggal'
              }}</span>
          </div>
        </v-sheet>
        <v-dialog v-model="dialog" @click="closeDatePicker" class="ms-2">
          <v-date-picker v-model="selectedDate" locale="id"></v-date-picker>
        </v-dialog>
      </div>
      <div class="text-right mt-6">
        <v-btn class="button pa-2 mr-2 ml-2" @click="addEvent">TAMBAH</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" to="/profile" color="red">BATAL</v-btn>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { constructNow, format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

const router = useRouter();

const selectedDate = ref(null);
const dialog = ref(false);

const openDatePicker = () => {
  dialog.value = true;
};

const closeDatePicker = () => {
  dialog.value = false;
};

const formatDate = (date) => {
  return format(new Date(date), 'EEEE, d MMMM yyyy', { locale: id });
};

const token = useCookie('token');
const { data: event } = await useFetch('/api/get-event', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataEvent = ref(event.value);

const namaAcara = ref('');
const kategoriAcara = ref('');

const formatDateApi = (date) => {
  return format(new Date(date), 'MM/dd/yyyy HH:mm:ss');
};


const addEvent = async () => {
  try {
    if(namaAcara.value === '' || kategoriAcara.value === '' || selectedDate.value === null){
      Swal.fire({
            title: 'Gagal',
            text: 'Nama, kategori dan tanggal acara wajib diisi!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
      return;
    }
    const response = await fetch('/api/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({
        name: namaAcara.value,
        date: formatDateApi(selectedDate.value),
        category: kategoriAcara.value,
      })
    });
    if (response.status == 200) {
      const tambahEvent = await response.json();
      dataEvent.value.push(tambahEvent);
      Swal.fire({
            title: 'Berhasil',
            text: 'Berhasil menambahkan event',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
          router.push('/calendar')
        })
    }else{
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Gagal menambahkan event',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } 
  } catch (error) {
    console.error('Error saving event:', error);
  }
};

</script>
