<template>
  <div class="ms-4">
    <h1>{{ dataTugas.acName }}</h1>
    <h6>{{ dataTugas.name }}</h6>
    <p>Dibuka: {{ formattedDate(dataTugas.dateStart) }}</p>
    <p>Ditutup : {{ formattedDate(dataTugas.dateEnd) }}</p>
  </div>
  <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 mb-6">
    <p class="pl-2 pr-2">{{ dataTugas.description }}</p>
  </v-sheet>
  <div class="ms-1 mr-1">
    <v-table v-if="dataTugas.finishedAssignment" class="mr-2">
          <thead>
            <tr>
              <th class="text-left tabel" style="font-weight: bold;">Status Pengajuan Tugas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataTugas.isSubmitting">
              <td>Status Pengajuan</td>
              <td>: Diajukan</td>
            </tr>
            <tr v-if="dataTugas.isSubmitting">
              <td>Status Penilaian</td>
              <td>: Proses Dinilai</td>
            </tr>
            <tr>
              <td>Waktu tersisa</td>
              <td>: {{ remainingTime }}</td>
            </tr>
            <tr>
              <td>Terakhir diubah</td>
              <td>: {{ formattedDate(dataTugas.finishedAssignment.timestamp) }}</td>
            </tr>
            <tr v-if="dataTugas.finishedAssignment && dataTugas.finishedAssignment.link && dataTugas.finishedAssignment.link.length">
              <td>Berkas pengajuan</td>
              <td v-for="(link, index) in dataTugas.finishedAssignment.link" :key="index">: <a :href="link" class="mr-4">{{ link }}</a></td>
            </tr>
            <tr>
              <td>Komentar pengajuan</td>
              <td>:<v-btn variant="text" @click="toggleComment" style="color: blue; font-weight: bold">Komentar({{dataTugas.commentAssignment.length}})</v-btn></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-sheet rounded class="ms-2 mr-2 pt-4">
                  <div v-if="showComment">
                    <v-textarea label="Tambahkan komentar" v-model="commentContent"></v-textarea>
                    <div class="d-flex justify-end">
                      <v-btn class="mr-2 button" @click="saveComment">SIMPAN</v-btn>
                      <v-btn @click="toggleComment" color="red">BATAL</v-btn>
                    </div>
                  </div>
                  <div v-if="dataTugas.commentAssignment" class="mt-2">
                    <v-row v-for="(komen, index) in dataTugas.commentAssignment" :key="index">
                      <v-col class="mr-2 pt-0 mt-2">
                        <v-card elevation="10" class=" mr-2" style="width: 400px; border: 2px solid var(--purple)">
                          <div class="ms-2 mr-2 mt-2 mb-2">
                            {{ komen.studentName }} - {{ formattedDate(komen.createdAt) }}<br> {{ komen.content }}
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                  <br>
                </v-sheet>
              </td>
            </tr> 
          </tbody>
    </v-table>

        <v-table v-else class="mr-2">
          <thead>
            <tr>
              <th class="text-left tabel" style="font-weight: bold;">Status Pengajuan Tugas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Status Pengajuan</td>
              <td>: Tidak ada pengajuan</td>
            </tr>
            <tr>
              <td>Status Penilaian</td>
              <td>: Tidak Dinilai</td>
            </tr>
            <tr>
              <td>Waktu tersisa</td>
              <td v-if="dataTugas.isSubmitting == true">: {{ remainingTime }}</td> <td v-else><span style="color: red;">: Terlambat {{ remainingTime }}</span></td>
            </tr>
            <tr>
              <td>Terakhir diubah</td>
              <td>: - </td>
            </tr>
            <tr>
              <td>Berkas pengajuan</td>
              <td>: -</td>
            </tr>
            <tr>
              <td>Komentar pengajuan</td>
              <td>:<v-btn variant="text" @click="toggleComment" style="color: blue; font-weight: bold">Komentar({{dataTugas.commentAssignment.length}})</v-btn></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-sheet rounded class="ms-2 mr-2 pt-4">
                  <div v-if="dataTugas.commentAssignment">
                    <v-row v-for="(komen, index) in dataTugas.commentAssignment" :key="index">
                      <v-col class="mr-2 pt-0 mt-2">
                        <v-card elevation="10" class=" mr-2" style="width: 400px; border: 2px solid var(--purple)">
                          <v-card-subtitle>
                            {{ komen.studentName }} - {{ formattedDate(komen.createdAt) }}<br> {{ komen.content }}
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
                </v-sheet>
              </td>
            </tr>
          </tbody>
        </v-table>

    
    <div class="button-container" v-if="!showUploadForm && !dataTugas.finishedAssignment && dataTugas.isSubmitting == true">
      <v-btn class="button pa-2 mr-2 ml-2" @click="toggleUploadForm" rounded="lg">Kumpulkan Tugas</v-btn>
    </div>
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
    <p>Jenis tugas yang diterima:</p>
    <div v-for="(type, index) in dataTugas.fileType" :key="index">
      <ul>
        <li class="">- {{ type }}</li>
      </ul>
    </div>
  </div>

  <div v-if="showUploadForm" class="text-center mt-16">
    <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" @click="saveFile">SIMPAN</v-btn>
    <v-btn class="pa-2 mr-2 ml-2" rounded="lg" color="red" @click="cancelUpload">BATAL</v-btn>
  </div>
</template>
<script setup>
import { format, differenceInMilliseconds } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';


let token = useCookie('token');

const { data: assignment } = await useFetch('/api/detailAssignment', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});

const dataTugas = ref(assignment.value);

const finishSubmit = dataTugas.value.finishedAssignment;

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};

const formatDate = (date) => {
  return format(new Date(date), 'EEEE, d MMMM yyyy', { locale: id });
};

const commentContent = ref('');
const showComment = ref(false);

const toggleComment = () => {
  showComment.value = !showComment.value;
};

const saveComment = async () => {
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
    if (response.ok) {
      const savedComment = await response.json();
      dataTugas.value.commentAssignment.push(savedComment);
      Swal.fire({
        title: 'Berhasil',
        text: 'Berhasil tambah komentar',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      window.location.reload();
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
  let files = event.target.files;
  uploadedFiles.value = [];

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const fileType = '.' + file.name.split('.').pop().toLowerCase();
    
    if (dataTugas.value.fileType.includes(fileType)) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        fileInput = reader.result;
        uploadedFiles.value.push({ nama: file.name, src: fileInput, file: file });
      });
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        title: 'Jenis Berkas Tidak Diterima',
        text: `Berkas dengan jenis ${fileType} tidak diterima. Jenis berkas yang diterima: ${dataTugas.value.fileType.join(', ')}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}; 

const submitTugas = async (link) => {
  const response = await fetch('/api/submit-tugas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({
      id: dataTugas.value._id,
      acName: dataTugas.value.acName,
      acId: dataTugas.value.acId,
      meetingId: dataTugas.value.meetingId,
      link
    }),
  });
  if(response.status == 200){
    Swal.fire({
      title: 'Berhasil',
      text: 'Berhasil mengumpulkan tugas',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    window.location.reload();
  }else{
    Swal.fire({
      title: 'Gagal',
      text: data.value.message ?? 'Gagal mengumpulkan tugas',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
};


const uploadFile = async (uploadData) => {
  const form = new FormData();
  form.append('file', uploadData.file);
  form.append('name', uploadData.name);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: form,
  });
  const result = await response.json();
  return result.url;
};

const saveFile = async () => {
  if (uploadedFiles.value.length > 0) {
    try {
      const randomString = Math.random().toString(36).substring(2, 15);
      const uploadPromises = uploadedFiles.value.map((item, index) => {
        const fileExtension = item.nama.split('.').pop();
        const fileKey = `${randomString}/${item.nama.split(".")[0]}-file${index}.${fileExtension}`;
        const file = item;
        return uploadFile({ file: file.file, name: fileKey });
      });

      const uploadedFileResults = await Promise.all(uploadPromises);
      submitTugas(uploadedFileResults);
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

// hitung durasi 
const remainingTime = computed(() => {
  if (!dataTugas.value.dateEnd) return '';
  const endDate = new Date(dataTugas.value.dateEnd);
  const today = new Date();
  // Hitung selisih waktu dalam milidetik
  const difference = differenceInMilliseconds(endDate, today);

  // Hitung hari, jam, menit, detik
  let remaining = Math.abs(difference);
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  remaining -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  remaining -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(remaining / (1000 * 60));
  remaining -= minutes * (1000 * 60);
  const seconds = Math.floor(remaining / 1000);

  return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
});
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


.tabel{
  white-space: nowrap;
}
</style>
