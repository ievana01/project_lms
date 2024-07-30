<template>
    <div class="ms-3 mr-3">
        <v-sheet color="var(--grey)" rounded class="mb-4">
            <div class="ms-2 mr-2 pt-2 pb-1">
                <h1>{{ detailAttendance.className }}</h1>
                <p>Tanggal: {{ formattedDate(detailAttendance.dateTime) }}</p>
                <p>Topik: {{ detailAttendance.topic }}</p>
            </div>
        </v-sheet>

        <v-sheet color="var(--grey)" class="pt-2 mb-4" rounded>
            <v-radio-group label="Apakah waktu pembelajaran sesuai jadwal?" v-model="isOnTime">
                <v-radio label="Ya" :value="true"></v-radio>
                <v-radio label="Tidak" :value="false"></v-radio>
            </v-radio-group>
        </v-sheet>

        <v-sheet color="var(--grey)" class="pt-2 mb-4" rounded>
            <v-radio-group label="Apakah materi tersedia di platform?" v-model="isMaterialAvailable">
                <v-radio label="Ya" :value="true"></v-radio>
                <v-radio label="Tidak" :value="false"></v-radio>
            </v-radio-group>
        </v-sheet>

        <v-sheet v-if="decodedString" rounded style="border: 2px solid var(--purple)">
            <div class="ms-2 mt-4">
                <p>Hasil Scan QR: {{ decodedString }}</p>
            </div>
        </v-sheet>
    </div>

    <div class="text-center mt-12">
        <v-btn v-if="!decodedString" class="button pa-2 mr-2 ml-2" prepend-icon="mdi-qrcode" @click="showQrDialog = true">SCAN QR</v-btn>
    </div>

    <v-dialog v-model="showQrDialog" max-width="600px">
         <v-card>
                <v-card-title>Scan Kode QR</v-card-title>
                <v-card-text>
                    <p>Berikan kode qr ini kepada dosen Anda!</p>
                    <QRCode :data="qrData" />
                    <br>
                    <p>NRP: {{nrp}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="button" @click="showQrDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    <div class="text-center mt-4">
        <v-btn class="button pa-2 mr-2 ml-2" @click="submitAttendance">SIMPAN</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" color="red" :to="`/kelas/${route.params.acId}`">BATAL</v-btn>
    </div>
</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

const showQrDialog = ref(false)

const formattedDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
    } catch (error) {
        console.error('Invalid date:', dateString);
        return 'Invalid date';
    }
};
const route = useRoute();
let token = useCookie('token');
const nrp = useCookie('nrp');

const userId = useCookie('userId');
const qrData = userId;

const { data: attendance } = await useFetch('/api/get-detail-attendance', {
    method: 'POST',
    body: JSON.stringify({ profileToken: token.value, id: route.params.meetingId })
});
const detailAttendance = ref(attendance.value);

const router = useRouter();
const status = 'Hadir';
const isOnTime = ref('');
const isMaterialAvailable = ref('');
const submitAttendance = async () => {
    if (isOnTime.value === '' || isMaterialAvailable.value === '') {
        Swal.fire({
            title: 'Gagal',
            text: 'Pertanyaan wajib diisi!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    const response = await fetch('/api/submit-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
            acId: route.params.acId,
            meetingId: route.params.meetingId,
            meetingName: detailAttendance.value.topic,
            status: status,
            isOnTime: isOnTime.value,
            isMaterialAvailable: isMaterialAvailable.value
        }),
    });
    if (response.status == 200) {
        Swal.fire({
            title: 'Berhasil',
            text: 'Berhasil melakukan presensi',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            router.push(`/kelas/${route.params.acId}`);
        })
    } else {
        Swal.fire({
            title: 'Gagal',
            text: data.value.message ?? 'Gagal melakukan presensi',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
};

const decodedString = ref('');

</script>

<style scoped>
.button {
    background-color: var(--blue);
    color: white;
}
</style>
