<template>
  <div v-if="$viewport.isLessThan('desktop')">
    <div v-if="!selectedUser">
      <div class="ms-2">
        <v-btn class="button mb-4" prepend-icon="mdi-plus" rounded="lg" @click="toggleNewMessagePanel">pesan baru</v-btn>
      </div>
      <div v-if="showNewMessagePanel" class="ms-2 mr-2">
        <v-sheet style="border: 2px solid var(--purple)" class="pb-4" rounded>
          <div class="pt-4 ms-2 mr-2">
            <v-text-field density="compact" label="Cari pengguna" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
            single-line style="width: 250px;" v-model="search"></v-text-field>
          </div>
          <v-card class="ms-2 mr-2" color="var(--grey)">
            <div>
              <div v-for="(user, index) in filteredUsers" :key="index" class="d-flex">
                <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
                <v-card-text class="mt-2" @click="createRoomChat(user._id)">{{ user.fullName }}</v-card-text>
              </div>
            </div>
          </v-card>
        </v-sheet>
      </div>
      <div class="ms-2 mr-2 mt-4">
        <h1>Pesan</h1>
        <v-sheet v-if="dataUserChat.length === 0" style=" width: 100%; display: flex; justify-content: center;" class="text-center">
          <v-card text="Pilih obrolan untuk memulai mengirim pesan" color="var(--purple)" style="color: white; width: 400px;"></v-card>
        </v-sheet>
      </div>
      <div class="ms-2 mr-2 mb-4" v-for="(userChat, index) in dataUserChat" :key="index" @click="openChat(userChat.fullName, userChat._id)">
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
        <v-icon @click="clearSelectedUser">mdi-chevron-left</v-icon>
        <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
        <span>{{ selectedUser }}</span>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" icon="mdi-refresh" variant="text" size="medium" color="var(--purple)" @click="reload"></v-btn>
      </v-sheet>
      <div class="ms-11 pt-4 mr-11">
        <v-sheet color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
          class="d-flex align-center justify-space-between mb-4" v-for="(chat, index) in getChat" :key="index">
          <div class="pt-2 ms-2">
            <p style="color: var(--purple)!important; font-weight: bold">{{ chat.senderName }}</p>
            <p>{{ chat.message }}</p>
          </div>
        </v-sheet>
      </div>
      <div class="ms-2 mr-2 pt-5" style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px;">
        <v-text-field density="compact" label="Ketik pesan Anda di sini..." variant="solo" flat single-line
          rounded="lg" class="ms-2 mr-2" v-model="message">
          <template v-slot:append-inner>
            <v-btn icon="mdi-send" variant="text" color="#612D81" @click="sendMessage(selectedChatId, selectedUserId)"></v-btn>
          </template>
        </v-text-field>
      </div>
    </div>
  </div>

  <div v-if="$viewport.isGreaterThan('tablet')">
    <div class="ms-2 d-flex">
      <v-sheet style="background-color: var(--grey); width: 400px; min-height: 500px;" class="pt-4 pb-4">
        <div class="ms-2">
          <v-btn class="button" prepend-icon="mdi-plus" rounded="lg" @click="toggleNewMessagePanel">pesan baru</v-btn>
        </div>
        <div v-if="showNewMessagePanel" class="ms-2 mr-2 mt-3">
          <v-sheet style="border: 2px solid var(--purple)" class="pb-4" rounded>
            <div class="pt-4 ms-2 mr-2">
              <v-text-field density="compact" label="Cari pengguna" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
                single-line style="width: 250px;" v-model="search"></v-text-field>
            </div>
            <v-card class="ms-2 mr-2">
              <div>
                <div v-for="(user, index) in filteredUsers" :key="index" class="d-flex">
                  <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
                  <v-card-text class="mt-2" @click="createRoomChat(user._id)">{{ user.fullName }}</v-card-text>
                </div>
              </div>
            </v-card>
          </v-sheet>
        </div>
        <div class="ms-2 mt-4">
          <h1>Pesan</h1>
        </div>
        <div v-for="(userChat, index) in dataUserChat" :key="index" class="ms-2 mr-2 mb-4" @click="openChat(userChat.fullName, userChat._id)">
          <v-card color="var(--white)" style="max-height: auto;">
            <div class="d-flex">
              <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
              <v-card-text class="mt-2">{{ userChat.fullName }}</v-card-text>
            </div>
          </v-card>
        </div>
      </v-sheet>
      <v-sheet v-if="!selectedUser" style="background-color: var(--grey); width: 100%; display: flex; justify-content: center; align-items: center;" class="ms-4 mr-4 text-center">
        <v-card text="Pilih obrolan untuk memulai mengirim pesan" color="var(--purple)" style="color: white; width: 400px;" class="ms-4 mr-4"></v-card>
      </v-sheet>
      <div v-if="selectedUser" style="width: 100%;">
        <v-sheet color="var(--grey)" rounded class="d-flex align-center justify-space-between ms-2 mr-2">
          <v-icon @click="clearSelectedUser">mdi-chevron-left</v-icon>
          <v-btn class="ma-3" size="x-small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
          <span>{{ selectedUser }}</span>
          <v-spacer></v-spacer>
          <v-btn class="mr-4" icon="mdi-refresh" variant="text" size="medium" color="var(--purple)" @click="reload"></v-btn>
        </v-sheet>
        <div class="ms-11 pt-4 mr-11">
          <v-sheet color="var(--grey)" style="border: 2px solid black; margin-right: auto;"
            class="d-flex align-center justify-space-between mb-4" v-for="(chat, index) in getChat" :key="index">
            <div class="pt-2 ms-2">
              <p style="color: var(--purple)!important; font-weight: bold">{{ chat.senderName }}</p>
              <p>{{ chat.message }}</p>
            </div>
          </v-sheet>
        </div>
        <div class="ms-2 mr-2 pt-5" style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 340px;">
          <v-text-field density="compact" label="Ketik pesan Anda di sini..." variant="solo" flat single-line
            rounded="lg" class="ms-2 mr-2" v-model="message">
            <template v-slot:append-inner>
              <v-btn icon="mdi-send" variant="text" color="#612D81" @click="sendMessage(selectedChatId, selectedUserId)"></v-btn>
            </template>
          </v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNuxtApp } from '#app';

const { $viewport } = useNuxtApp();

const showNewMessagePanel = ref(false);
const toggleNewMessagePanel = () => {
  showNewMessagePanel.value = !showNewMessagePanel.value;
};

const token = useCookie('token');

const { data: allUser } = await useFetch('/api/get-all-student-chat', {
  body: JSON.stringify({ profileToken: token.value })
});
const getUser = ref(allUser.value);

const search = ref('');
const filteredUsers = computed(() => {
  if (!search.value) {
    return getUser.value;
  }
  return getUser.value.filter(user =>
    user.fullName.toLowerCase().includes(search.value.toLowerCase())
  );
});

const { data: userChat } = await useFetch('/api/get-list-student-chat', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataUserChat = ref(userChat.value);

const selectedUserId = ref(null);
const selectedChatId = ref(null);
const getChat = ref([]);

import Swal from 'sweetalert2';

const createRoomChat = async (id) => {
  try {
    const response = await fetch('/api/create-chatroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({ id })
    });

    if (response.status == 200) {
      Swal.fire({
        title: 'Berhasil',
        text: 'Ruang obrolan berhasil dibuat, silahkan pilih obrolan yang telah dibuat!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      })
    } else {
      Swal.fire({
        title: 'Gagal',
        text: data.value.message ?? 'Gagal membuat ruang obrolan',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  } catch (error) {
    Swal.fire({
        title: 'Error',
        text: 'Server error, silahkan muat ulang!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  }
};


const message = ref('');
const sendMessage = async (chatId, receiverId) => {
  try {
    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({
        id: chatId,
        message: message.value,
        receiverId: receiverId
      })
    });

    if (response.status == 200) {
      const newMessage = await response.json();
      getChat.value.push(newMessage);
      message.value='';
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};


const fetchChat = async (id) => {
  try {
    const response = await fetch('/api/get-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({ id })
    });

    if (response.status === 200) {
      const chatData = await response.json();
      getChat.value = chatData;
    } else {
      console.error('Failed to fetch chat data');
    }
  } catch (error) {
    console.error('Error fetching chat data:', error);
  }
};

const reload = () => {
  fetchChat(selectedChatId.value);
};

const selectedUser = ref(null);

const openChat = async (fullName, chatId) => {
  selectedUser.value = fullName;
  selectedChatId.value = chatId;
  selectedUserId.value = getUser.value.find(user => user.fullName === fullName)._id;
  await fetchChat(chatId);
};
const clearSelectedUser = () => {
  selectedUser.value = null;
};

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint);
});
</script>

