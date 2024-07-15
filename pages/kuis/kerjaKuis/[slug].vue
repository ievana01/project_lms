<template>
  <div class="text-right mt-4">
    <v-btn class="pa-2 mr-4 ml-2" color="red" style="font-weight: bold;">{{ times }}</v-btn>
  </div>
  <div class="kuis-container ms-4 mr-4 mt-4">
    <div :class="viewMode == 0 ? 'block' : 'd-none'">
      <v-row class="list-card">
        <v-col v-for="(detailSoal, index) in detailSoal" :key="index">
          <v-card class="mb-4">
            <div class="d-flex ms-2 mt-4 align-center">
              <h1>Soal {{ index + 1 }}</h1>
              <v-btn :icon="clickedIcons[index] ? 'mdi-flag' : 'mdi-flag-variant-outline'" variant="text"
                :class="clickedIcons[index] ? 'clicked' : 'default'" @click="iconClick(index)" color="error">
              </v-btn>Flag Question
            </div>
            <div class="ms-2" style="color: red;">
              <p>Bobot soal : {{ detailSoal.score }}</p>
            </div>
            <div class="ms-4">
              <h4 style="font-weight: normal;">{{ detailSoal.question }}</h4>
              <div v-if="detailSoal.type == 'pilgan'">
                <v-radio-group>
                  <v-radio v-for="answer in detailSoal.chooseAnswer" :key="answer.index" :label="answer.value"
                    :value="answer.value" @change="saveAnswer(index, answer.value)">
                  </v-radio>
                </v-radio-group>
              </div>

              <div v-if="detailSoal.type == 'jawabSingkat'" class="mr-4">
                <v-text-field label="Isikan jawaban anda" v-model="detailSoal.answer"></v-text-field>
              </div>
            </div>

          </v-card>
        </v-col>
      </v-row>
      <!-- <div class="btnnext mt-16">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">sebelumnya</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">selanjutnya</v-btn>
      </div> -->
    </div>
    <div :class="viewMode == 2 ? 'block' : 'd-none'">
      <div class="ms-2 mr-2 mt-3">
        <v-sheet style="background-color: var(--grey);" class="pt-2 pb-6">
          <div class="ms-4 pt-4 pb-2">
            <h1>NAVIGASI KUIS</h1>
            <div v-for="(detailSoal, index) in detailSoal" :key="index">
              <v-btn class="mb-2 mr-2" color="white">{{ index + 1 }}</v-btn> <span v-if="detailSoal.answer">Pertanyaan
                sudah terjawab</span> <span v-else>Pertanyaan belum terjawab</span><br>
            </div>
          </div>
          <div class="text-center mt-4">
            <v-btn class="button mb-4" @click="changeViewMode(0)" color="red">mengerjakan kembali</v-btn><br>
            <v-btn class="button" style="width: 236px;" @click="submitKuis">kumpulkan kuis</v-btn>  
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
  <div :class="viewMode == 0 ? 'block' : 'd-none'">
    <v-sheet style="background-color: var(--grey);" class="ms-4 mr-4 mt-6 pb-2" rounded>
      <h1 class="ms-3 pt-2">NAVIGASI KUIS</h1>
      <div class="ms-3">
        <v-btn v-for="(soal, index) in detailSoal" :key="index" class="mb-2 mr-2" color="white">{{ index + 1 }} </v-btn>
      </div>
      <div class="text-center mt-8 mb-2" v-if="detailKuis">
        <v-btn class="button pa-2 mr-2 ml-2" @click="changeViewMode(2)" rounded="lg">selesaikan kuis</v-btn>
      </div>
    </v-sheet>

  </div>
</template>

<script setup>
const route = useRoute();  

const router = useRouter();  

definePageMeta({
  layout: 'blank'
})
import { format } from 'date-fns';

const times = ref("")
const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const formatted = format(date, 'MMMM dd, yyyy HH:mm');
    return formatted;
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};

let token = useCookie('token');
const viewMode = ref(0);

const { data: soalKuis } = await useFetch('/api/get-soal-kuis', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});
const detailSoal = ref();
detailSoal.value = soalKuis.value;

const { data: kuis } = await useFetch('/api/detailQuiz', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: useRoute().params.slug })
});
const detailKuis = ref();
detailKuis.value = kuis.value;

const saveAnswer = (index, answer) => {
  const thisQuestions = detailSoal.value[index];
  thisQuestions.answer = answer;
};

const clickedIcons = ref(detailSoal.value.map(() => false));
const iconClick = (index) => {
  clickedIcons.value[index] = !clickedIcons.value[index];
};


const submitKuis = async () => {
  const answer = detailSoal.value.map(jawaban => ({
        _id: jawaban._id,
        type: jawaban.type,
        answer: jawaban.answer ?? ''
      }));

  const response = await fetch('/api/submit-quiz', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({
      id: useRoute().params.slug,
      answers: answer
    }),
  });
  if(response.status == 200){
    alert('Kuis berhasil dikumpulkan');
    router.push(`/kuis/${useRoute().params.slug}`);
  }else{
    alert('Gagal submit kuis')
  }
};

const changeViewMode = (mode) => {
  viewMode.value = mode;
}



onMounted(() => {
  let x = setInterval(() => {
    const end = formattedDate(route.query.endTime);

    const endTime = new Date(end).getTime();

    let timeRemaining = '';

    const currentTime = new Date().getTime();

    const distance = endTime - currentTime;

    if (distance <= 0) {
      return "00:00:00  ";
    }

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeRemaining = `${hours} : ${minutes} : ${seconds} `;

    times.value = timeRemaining;
  }, 1000);
});



</script>

<style>
.click {
  color: red;
}

.default {
  color: inherit;
}

.kuis-container {
  display: flex;
  flex-direction: column;
}

.btnnext {
  display: flex;
  justify-content: space-between;
}

.nomor {
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  background-color: white !important;
}

.nomor-container {
  display: flex;
}
</style>