<template>
    <div class="ms-4">
        <h1>{{ detailKuis.acName }}</h1>
        <h6>{{ detailKuis.name }}</h6>
        <p>Dibuka : {{ formattedDate(detailKuis.startDate) }}</p>
        <p>Ditutup : {{ formattedDate(detailKuis.endDate) }}</p>
    </div>
    <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 pt-2 pb-1">
        <p class="pl-2 pr-2">{{ detailKuis.description }}</p>
    </v-sheet>

    <div v-if="detailKuis.isFinished">
        <v-sheet style="background-color: var(--grey)" rounded class="ms-4 mr-4 mt-4">
            <div class="ms-2 mr-2 pt-2 pb-2">
                <h6>Status Pengerjaan Kuis</h6>
                <p>Status Pengerjaan : Selesai</p>
                <p v-if="detailKuis.score"> Nilai : {{ detailKuis.score }}</p>
                <p v-else>Nilai : -</p>
            </div>
        </v-sheet>
    </div>

    <div v-else>
        <div class="text-center mt-16 mb-8">
             <p>Waktu pengerjaan {{ detailKuis.duration }} menit</p>
            <div>
                <v-btn class="button pa-2 mr-2 ml-2" rounded="lg" @click="confirmQuiz">Kerjakan Kuis</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';


const formattedDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
    } catch (error) {
        console.error('Invalid date:', dateString);
        return 'Invalid date';
    }
};

let token = useCookie('token');
const { data: kuis } = await useFetch('/api/detailQuiz', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});
const detailKuis = ref();
detailKuis.value = kuis.value;;


const router = useRouter();
const confirmQuiz = () => {
Swal.fire({
    title : 'Apakah anda yakin memulai kuis?',
    text: 'Setelah kuis dimulai, jangan melakukan refresh atau kembali ke halaman sebelummnya, karena tindakan tersebut akan dianggap telah menyelesaikan kuis!',
    icon: 'question', 
    showCancelButton: true,
    confirmButtonText: 'Yakin',
    cancelButtonText:'Batal'
}).then((result) =>{
    if(result.isConfirmed){
        startQuiz();
    }
})
};

const startQuiz = async () => {
    const response = await fetch('/api/start-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
            id: useRoute().params.slug,
        })
    });
    if (response.status == 200) {
        const data = await response.json();
        router.push({
            path: `/kuis/kerjaKuis/${useRoute().params.slug}`,
            query: {
                startTime: data.startTime,
                endTime: data.endTime
            }
        });
    }
};
</script>

<style></style>