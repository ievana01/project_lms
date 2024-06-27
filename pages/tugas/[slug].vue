<template>
  <div class="ms-4">
    <h1>{{ dataTugas.acName }}</h1>
    <h6>{{ dataTugas.name }}</h6>
    <p>Dibuka: {{ formattedDate(dataTugas.dateStart) }}</p>
    <p>Ditutup : {{ formattedDate(dataTugas.dateEnd) }}</p>
    {{dataTugas}}
  </div>
  <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 mb-6">
    <p class="pl-2 pr-2">{{ dataTugas.description }}</p>
  </v-sheet>

  <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4">
    <div class="pl-2 pr-2">
      <h6>Status Pengajuan Tugas</h6>
      <p>Status pengajuan : Tidak ada pengajuan</p>
      <p>Status penilaian : Tidak dinilai</p>
      <p>Waktu tersisa : {{ dataTugas.duration }}</p>
      <p>Terakhir diubah : </p>
      <p>Berkas pengajuan : -</p>
      <p>Komentar pengajuan :<v-btn variant="text" @click="toggleComment">Komentar(0)</v-btn></p>
      <div v-if="dataTugas.commentAssignment">
        <v-row v-for="(komen, index) in dataTugas.commentAssignment" :key="index">
          <v-col class="pt-0">
            <v-card color="var(--yellow)" class=" mr-2">
              <v-card-subtitle>
                {{ komen.studentName }} - {{ formattedDate(komen.timestamp) }} <br> {{ komen.content }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <br>

      <div v-if="showComment">
        <v-textarea label="Tambahkan komentar" v-model="commentContent"></v-textarea>
        <div class="d-flex justify-end">
          <v-btn class="mr-2 button" @click="saveComment">SIMPAN</v-btn>
          <v-btn @click="toggleComment" color="red">BATAL</v-btn>
        </div>
      </div>
    </div>

  </v-sheet>

  <div class="button-container" v-if="!showUploadForm">
    <v-btn class="button pa-2 mr-2 ml-2" @click="toggleUploadForm" rounded="lg">Kumpulkan Tugas</v-btn>
  </div>

  <div v-if="showUploadForm" class="ms-4">
    <h6>Pengumpulan Tugas</h6>
    <div>
      <v-sheet color="var(--grey)" rounded class="mr-2" @click="triggerFileInput">
        <div v-if="uploadedFiles.length === 0" class="text-center pt-8 pb-8">
          <v-icon size="x-large">mdi-arrow-down-bold</v-icon>
          <p>Tarik dan taruh berkas anda</p>
        </div>
        <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange" multiple>
      </v-sheet>

      <v-sheet v-if="uploadedFiles.length > 0" class="mt-4 mr-4" color="var(--grey)">
        <!-- <v-btn size="small" color="#612D81" icon="mdi-file" variant="text" @click="triggerFileInput"></v-btn> -->
        <div class="ms-2 pt-2 pb-2">
          <p>Files yang diunggah:</p>
          <ul>
            <li v-for="file in uploadedFiles" :key="file.nama">
              <a :href="file.src" target="_blank">
                <strong>Nama File:</strong>
                <v-icon>
                  mdi-file
                </v-icon>
                {{ file.nama }} 
              </a>
            </li>
          </ul>
        </div>
      </v-sheet>
    </div>
    <br>
    <p>Jenis tugas yang diterima: <br> pdf</p>
  </div>

  <div v-if="showUploadForm" class="text-center mt-16">
    <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" @click="saveFile">SIMPAN</v-btn>
    <v-btn class="pa-2 mr-2 ml-2" rounded="lg" color="red" @click="cancelUpload">BATAL</v-btn>
  </div>
</template>
<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const { $swal } = useNuxtApp();

let token = useCookie('token');
const { data: assignment } = await useFetch('/api/detailAssignment', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});

const dataTugas = ref(assignment.value);

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};

const commentContent = ref('');
const showComment = ref(false);

const toggleComment = () => {
  showComment.value = !showComment.value;
};

const saveComment = async () => {
  console.log(commentContent.value)
  try {
    const response = await fetch('/api/save-comment-tugas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: dataTugas.value._id,
        content: commentContent.value,
      }),
    });
    console.log(response)
    if (response.ok) {
      const savedComment = await response.json();
      dataTugas.value.commentAssignment.push(savedComment);
      console.log('Saved comment:', savedComment);
      toggleComment();
    } else {
      console.error('Failed to save comment:', response.status);
    }
  } catch (error) {
    console.error('Error saving comment:', error);
  }
};


let showUploadForm = ref(false);
let uploadedFiles = ref([]);
let fileInput = ref(null);

const toggleUploadForm = () => {
  showUploadForm.value = !showUploadForm.value;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  let file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
   
    reader.addEventListener('load', function () {
      fileInput = reader.result;
      uploadedFiles.value.push({ nama: file.name, src: fileInput });
      console.log(uploadedFiles.value)
    });
    reader.readAsDataURL(file);
  } else {
    this.$('file').attr('src', '#');
  }
  // console.log(this.index);
};


const uploadFile = async (uploadData) => {
  console.log(uploadData);
  const form = new FormData();
  form.append('file', uploadData.file);
  form.append('name', uploadData.name);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: form,
  });
  const result = await response.json();
  console.log(result);
  return result.url;
};

const saveFile = async () => {
  if (uploadedFiles.value.length > 0) {
    try {
      const randomString = Math.random().toString(36).substring(2, 15);
      const uploadPromises = uploadedFiles.value.map((item, index) => {
        const fileKey = `${randomString}/file${index}.pdf`;
        const file = item;
        console.log(fileKey)
        console.log(item);
        return uploadFile({ file: file.nama, name: fileKey });
      });

      const uploadedFileResults = await Promise.all(uploadPromises);

      alert(`File(s) ${uploadedFileResults.map(file => file.name).join(', ')} disimpan`);
      uploadedFiles.value = [];
      showUploadForm.value = false;
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('There was an error uploading the files. Please try again.');
    }
  } else {
    alert('Harap unggah file terlebih dahulu');
  }
};

const cancelUpload = () => {
  uploadedFiles.value = [];
  showUploadForm.value = false;
};
</script>

<style>
.button-container {
  padding-top: 100px;
  display: flex;
  justify-content: center;
}

.swal2-show {
  width: 300px;
  height: auto;
}
</style>
