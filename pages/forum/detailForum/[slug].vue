<template>
    <div class="ms-4">
        <h2>{{ detailForum.name }}</h2>
    </div>

    <div class="ms-4 mr-4 mb-4">
        <v-sheet color="var(--grey)" rounded>
            <div class="ms-2 pt-2 pb-1">
                <p style="color: blue">{{ detailForum.createdByName }}</p>
                <v-sheet class="bg-white mr-2" rounded>
                    <div class="ms-2 mr-12">
                        <p>{{ detailForum.content }}</p>
                    </div>
                </v-sheet>
                <div class="text-right">
                    <v-btn @click="toggleReply('main')" variant="text"
                        style="color: blue!important; font-weight: bold">Balas</v-btn>
                </div>
                <div v-if="activeReply === 'main'">
                    <v-textarea label="Tambahkan komentar" v-model="isiKomen"></v-textarea>
                    <div class="d-flex justify-end">
                        <v-btn class="mr-2" @click="saveKomen">SIMPAN</v-btn>
                        <v-btn @click="toggleReply('main')">BATAL</v-btn>
                    </div>
                </div>
            </div>
        </v-sheet>
    </div>

    <div class="ms-12 mr-4 mb-4" v-if="detailForum.dataComment">
        <v-sheet color="var(--grey)" rounded v-for="(forum, index) in detailForum.dataComment" :key="index">
            <div class="ms-2 pt-2 pb-2 mt-2">
                <p style="color: blue">{{ forum.studentName }}</p>
                <v-sheet class="bg-white mr-2" rounded>
                    <div class="ms-2 mr-12">
                        <p>{{ forum.content }}</p>
                    </div>
                </v-sheet>
                <div class="text-right">
                    <v-btn @click="toggleReply(index)" variant="text"
                        style="color: blue!important; font-weight: bold">Balas</v-btn>
                </div>
                <div v-if="activeReply === index">
                    <v-textarea label="Tambahkan komentar" v-model="isiReply"></v-textarea>
                    <div class="d-flex justify-end">
                        <v-btn class="mr-2" @click="saveReply(forum.topicId, forum._id)">SIMPAN</v-btn>
                        <v-btn @click="toggleReply(index)">BATAL</v-btn>
                    </div>
                </div>

                <div v-for="(reply, index) in forum.dataReply" :key="index" class="ms-4 mr-4 mb-2 bg-white" rounded>
                    <div class="ms-2 mr-2">
                        <p style="color: blue">{{ reply.studentName }}</p>
                        <p>{{ reply.content }}</p>
                    </div>
                </div>
            </div>
        </v-sheet>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let token = useCookie('token');
const { data: forum } = await useFetch('/api/get-detail-forum', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});

const detailForum = ref(forum.value);
console.log(detailForum.value);

const activeReply = ref(null);

const toggleReply = (index) => {
    if (activeReply.value === index) {
        activeReply.value = null;
    } else {
        activeReply.value = index;
    }
};

const isiKomen = ref('');

const saveKomen = async () => {
    console.log(isiKomen.value)
    try {
        const response = await fetch('/api/save-comment-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: detailForum.value._id,
                content: isiReply.value,
            }),
        });
        console.log(response)
        if (response.ok) {
            const savedComment = await response.json();
            detailForum.value.dataComment.push(savedComment);
            console.log('Saved comment:', savedComment);
        } else {
            console.error('Failed to save comment:', response.status);
        }
    } catch (error) {
        console.error('Error saving comment:', error);
    }
    activeReply.value = null;
};

const isiReply = ref('');

const saveReply = async (idTopic, idComment) => {
    console.log(isiReply.value)
    try {
        const response = await fetch('/api/save-reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`,
                profileToken: token.value, topicId: idTopic, commentId: idComment, type: 'reply'
            },
            body: JSON.stringify({
                id: forum.value._id,
                content: isiReply.value,
            }),
        });
        console.log(response)
        if (response.ok) {
            const savedReply = await response.json();
            // detailForum.value.dataReply.push(savedReply);
            detailForum.value.dataComment.find(comment => comment._id === idComment).dataReply.push(savedReply);
            console.log('Saved reply:', savedReply);
        } else {
            console.error('Failed to save reply:', response.status);
        }
    } catch (error) {
        console.error('Error saving reply:', error);
    }
    activeReply.value = null;
};

</script>

<style>
/* Add any additional styling here */
</style>
