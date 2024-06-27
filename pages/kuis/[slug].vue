<template>
    <div class="ms-4">
        <h1>{{ detailKuis.acName }}</h1>
        <h6>{{ detailKuis.name }}</h6>
        <p>Dibuka : {{ formattedDate(detailKuis.startDate) }}</p>
        <p>Ditutup : {{ formattedDate(detailKuis.endDate) }}</p>
    </div>

    <v-sheet style="background-color: var(--grey);" rounded class="ms-4 mr-4 pt-2 pb-1">
        <p class="pl-2 pr-2">{{ detailKuis.description }}
        </p>
    </v-sheet>
    <div class="text-center mt-16 mb-8">
        <p>Waktu pengerjaan {{ detailKuis.duration }} menit</p>
        <v-btn class="button pa-2 mr-2 ml-2" :to="`/kuis/kerjaKuis/${detailKuis._id}`" rounded="lg">Kerjakan Kuis</v-btn>
    </div>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

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
detailKuis.value = kuis.value;

</script>

<style></style>