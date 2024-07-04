  <template>
    <div v-if="$viewport.isLessThan('tablet')">
      <div v-if="!selectedUser">
        <div class="ms-2 mr-2">
          <v-btn class="button" prepend-icon="mdi-plus" rounded="lg">pesan baru</v-btn>
          <div>
            <v-card>
              <div class="mt-2 ms-2">
                <v-text-field density="compact" label="Cari orang" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
                single-line style="width: 250px;"></v-text-field>
                {{getUser}}
              </div>
            </v-card>
          </div>
          <div class="mt-4">
            <h1>Pesan</h1>
          </div>
        </div>
        <!-- <div class="ms-2">
          <v-text-field density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
            single-line style="width: 250px;"></v-text-field>
        </div> -->
        <div class="ms-2 mr-2 mb-4" @click="openChat(userChat.fullName)" v-for="(userChat, index) in dataUserChat"
          :key="index">
          <v-card color="var(--grey)" style="max-height: auto;">
            <div class="d-flex">
              <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
              <v-card-text class="mt-2">{{ userChat.fullName }}</v-card-text>
            </div>
          </v-card>
        </div>
      </div>
      <div v-else>
        <v-sheet color="var(--grey)" rounded class="d-flex align-center justify-space-between ms-2 mr-2">
          <v-icon @click="selectedUser = null">mdi-chevron-left</v-icon>
          <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
          <span>{{ selectedUser }}</span>
          <v-spacer></v-spacer>
        </v-sheet>
        <div class="ms-11 pt-4 mr-11">
          <v-sheet color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
            class="d-flex align-center justify-space-between mb-4" v-for="(chat, index) in getChat" :key="index">
            <div class="pt-2 ms-2">
              <p>{{ chat.message }}</p>
            </div>
          </v-sheet>
        </div>
        <div class="ms-2 mr-2 pt-5"
          style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px">
          <v-text-field density="compact" label="Ketik pesan anda disini..." variant="solo" flat single-line
            rounded="lg" class="ms-2 mr-2" v-model="message">
            <template v-slot:append-inner>
              <v-btn icon="mdi-send" variant="text" color="#612D81" @click="sendMessage"></v-btn>
            </template>
          </v-text-field>
        </div>
      </div>
    </div>

    <div v-if="$viewport.isGreaterOrEquals('tablet')">
      <div class="ms-2 d-flex">
        <v-sheet style="background-color: var(--grey); width: 400px;" class="pt-4 pb-4">
          <div class="ms-2">
            <v-btn class="button" prepend-icon="mdi-plus" rounded="lg">pesan baru</v-btn>
            <div class="mt-4">
              <h1>Pesan</h1>
            </div>
          </div>

          <div class="ms-2 mr-2">
            <v-text-field density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo" flat
              single-line style="width: 200px;"></v-text-field>
          </div>
          <div v-for="(userChat, index) in dataUserChat" :key="index" class="ms-2 mr-2 mb-4">
            <v-card color="var(--white)" style="max-height: auto;" @click="selectUser(userChat.fullName)">
              <div class="d-flex">
                <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
                <v-card-text class="mt-2">{{ userChat.fullName }}</v-card-text>
              </div>
            </v-card>
          </div>
        </v-sheet>

        <v-sheet v-if="!selectedUser"
          style="background-color: var(--grey); width: 100%; display: flex; justify-content: center; align-items: center;"
          class="ms-4 mr-4 text-center">
          <v-card text="Pilih obrolan untuk memulai mengirim pesan" color="var(--purple)"
            style="color: white; width: 400px;" class="ms-4 mr-4">
          </v-card>
        </v-sheet>

        <div v-if="selectedUser" style="width: 100%;">
          <v-sheet color="var(--grey)" rounded class="d-flex align-center justify-space-between ms-2 mr-2">
            <v-icon @click="selectedUser = null">mdi-chevron-left</v-icon>
            <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
            <span>{{ selectedUser }}</span>
            <v-spacer></v-spacer>
          </v-sheet>
          <div class="ms-11 pt-4 mr-11">
            <!-- (left aligned) -->
            <v-sheet color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
              class="d-flex align-center justify-space-between mb-4" v-for="(chat, index) in getChat" :key="index">
              <div class="pt-2 ms-2">
                <p style="color: var(--purple)!important; font-weight: bold">{{ chat.senderName }}</p>
                <p>{{ chat.message }}</p>
              </div>
            </v-sheet>
          </div>
          <div class="ms-2 mr-2 pt-5"
            style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px;">
            <v-text-field density="compact" label="Ketik pesan anda disini..." variant="solo" flat single-line
              rounded="lg" class="ms-2 mr-2" v-model="message">
              <template v-slot:append-inner>
                <v-btn icon="mdi-send" variant="text" color="#612D81" @click="sendMessage"></v-btn>
              </template>
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

//ambil data user yg pernah di chat oleh user login
const token = useCookie('token');
const { data: userChat } = await useFetch('/api/get-list-student-chat', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataUserChat = ref(userChat.value);
console.log(dataUserChat.value);

const dataRoomChat = ref(userChat.value[0]);
console.log(dataRoomChat.value);

//get user yg ada di kelas aktif
const { data: allUser } = await useFetch('/api/get-all-student-chat', {
  body: JSON.stringify({ profileToken: token.value })
});
const getUser = ref(allUser.value); 
console.log(getUser.value);

//get detail chat by user klik
const { data: chat } = await useFetch('/api/get-chat', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: dataRoomChat.value._id })
});
const getChat = ref();
getChat.value = chat.value;

const idReceiver = ref(getChat.value[0]);
console.log(idReceiver.value.receiverId);

const idRoom = getChat.value.roomId;
console.log(idRoom);
const selectedUser = ref(null);

const selectUser = (user) => {
  selectedUser.value = user;
};

const message = ref();
const sendMessage = async () => {
  try {
    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idReceiver.value.roomId,
        message: message.value,
        receiverId: idReceiver.value.senderId,
      }),
    });
    console.log(response)
    if (response.ok) {
      const newMessage = await response.json();
      getChat.value.push(newMessage);
    } else {
      console.error('Failed to add new message:', response.status);
    }
  } catch (error) {
    console.error('Error add message:', error);
  }
};



const item = ref([
  { title: 'Blokir Pengguna', action: 'block' },
  { title: 'Bisukan', action: 'mute' },
  { title: 'Hapus Percakapan', action: 'delete' },
])

const openChat = (user) => {
  selectedUser.value = user;
}

let fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const { $swal } = useNuxtApp()
let showMutedIcon = false;
const showAlert = (action) => {
  if (action === 'block') {
    $swal.fire({
      title: 'Blokir',
      showCancelButton: true,
      text: 'Apakah anda yakin ingin memblokir pengguna ini?',
      confirmButtonText: 'Blokir',
      cancelButtonText: 'Batal',
    })
  } else if (action === 'delete') {
    $swal.fire({
      title: 'Hapus',
      showCancelButton: true,
      text: 'Apakah anda yakin ingin menghapus percakapan ini?',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    })
  } else if (action === 'mute') {
    showMutedIcon = true;
  }

  return { showMutedIcon };
}

</script>

<style></style>