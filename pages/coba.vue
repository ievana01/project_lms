<template>
<div v-if="!selectedUser">
          <div class="ms-2">
            <v-btn class="button mb-4" prepend-icon="mdi-plus" rounded="lg" @click="toggleNewMessagePanel">pesan baru</v-btn>
          </div>
          <div  v-if="showNewMessagePanel" class="ms-2 mr-2">
            <v-sheet color="var(--yellow)" class="pb-4" rounded>
              <div class="pt-4 ms-2 mr-2">
                <v-text-field density="compact" label="Cari orang" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
                  single-line style="width: 250px;"></v-text-field>
              </div>
              <v-card class="ms-2 mr-2" >
                <div class="">
                  <div v-for="(user, index) in getUser" :key="index" class="d-flex">
                    <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
                    <v-card-text class="mt-2" @click="createRoomChat(user._id)">{{ user.fullName}}</v-card-text>
                  </div>
                </div>
              </v-card>
            </v-sheet>
          </div>

          <div class="ms-2 mt-4">
            <h1>Pesan</h1>
          </div>
          
          <div class="ms-2 mr-2 mb-4" @click="openChat(userChat.fullName, userChat._id)" v-for="(userChat, index) in dataUserChat"
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
                  <p style="color: var(--purple)!important; font-weight: bold">{{ chat.senderName }}</p>
                  <p>{{ chat.message }}</p>
                </div>
            </v-sheet>
          </div>
          <div class="ms-2 mr-2 pt-5"
            style="background-color: var(--grey); display: flex; align-items: center; justify-content: space-between; margin-top: 200px">
            <v-text-field density="compact" label="Ketik pesan anda disini..." variant="solo" flat single-line
              rounded="lg" class="ms-2 mr-2" v-model="message">
              <template v-slot:append-inner >
                <v-btn icon="mdi-send" variant="text" color="#612D81" @click="sendMessage(selectedChatId, selectedUserId)"></v-btn>
              </template>
            </v-text-field>
          </div>
        </div>
</template>

<script setup>
const showNewMessagePanel = ref(false);

const toggleNewMessagePanel = () => {
  showNewMessagePanel.value = !showNewMessagePanel.value;
};

const token = useCookie('token');

  //1. get all student
  const { data: allUser } = await useFetch('/api/get-all-student-chat', {
    body: JSON.stringify({ profileToken: token.value })
  });
  const getUser = ref(allUser.value); 
  console.log(getUser);
  
  //2.create chat room
  const createRoomChat = async (id) => {
      const response = await fetch('/api/create-chatroom', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.value}`
          },
          body: JSON.stringify({
              id: id,
          })
      });
      console.log(response);
      if(response.status == 200){
        alert('Chat room berhasil dibuat')
        openChat(dataUserChat.fullName);
      }else{
        alert('Gagal')
      }
      console.log(response);
  };

  //3. get lists student chat 
  const { data: userChat } = await useFetch('/api/get-list-student-chat', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value })
  });
  const dataUserChat = ref(userChat.value);
  console.log(dataUserChat.value);

  //4. send message
  const message = ref();
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
          receiverId: receiverId,
        }),
      });
      console.log(response)
      if (response.status == 200) {
        const newMessage = await response.json();
        getChat.value.push(newMessage);
        alert('Berhasil kirim chat');
      } else {
        console.error('Failed to add new message:', response.status);
      }
    } catch (error) {
      console.error('Error add message:', error);
    }
  };
  const selectedUserId = ref(null);
  const selectedChatId = ref(null);
  //5.get chat
  const getChat = ref([]);
const pesan = async (id) => {
  try {
    const response = await fetch('/api/get-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({ id })
    });
    console.log(response);
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


  const selectedUser = ref(null);
  
  const openChat = async (fullName, chatId) => {
  selectedUser.value = fullName;
  selectedChatId.value = chatId;
  selectedUserId.value = getUser.value.find(user => user.fullName === fullName)._id;
  await pesan(chatId);
};

  const selectUser = (user) => {
    selectedUser.value = user;
  };

</script>