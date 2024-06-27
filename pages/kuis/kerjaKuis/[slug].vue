<template>
  <div class="text-right mt-4">
    <v-btn class="pa-2 mr-4 ml-2" color="red" style="font-weight: bold;">01:20:05</v-btn>
  </div>
  <div class="kuis-container ms-4 mr-4 mt-4">
    <div :class="viewMode == 0 ? 'block':'d-none'">
      <v-row class="list-card">
        <v-col v-for="(detailSoal, index) in detailSoal" :key="index">
          <v-card class="mb-4">
            <div class="d-flex ms-2 mt-4">
              <h1>Soal {{ index + 1 }}</h1>
              <v-icon class="ms-3">mdi-flag-variant-outline</v-icon>
              <a href="">Flag Question</a>
            </div>
            <div class="ms-2" style="color: red;">
              <p>Bobot soal : {{ detailSoal.score }}</p>
            </div>
            <div class="ms-4">
              <h4 style="font-weight: normal;">{{ detailSoal.question }}</h4>
              <div v-if="detailSoal.type == 'pilgan'">
                <v-radio-group>
                  <v-radio v-for="answer in detailSoal.chooseAnswer" 
                    :key="answer.index"
                    :label="answer.value" 
                    :value="answer.index"
                    @change="saveAnswer(index, answer.index)">
                  </v-radio>
                </v-radio-group>
              </div>
  
              <div v-if="detailSoal.type == 'jawabSingkat'" class="mr-4">
                <v-text-field label="Isikan jawaban anda"></v-text-field>
              </div>
            </div>
  
          </v-card>
        </v-col>
      </v-row>
      <div class="btnnext mt-16">
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">sebelumnya</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" rounded="lg">selanjutnya</v-btn>
      </div>
    </div>
    <div :class="viewMode == 2 ? 'block' : 'd-none'">
      <div class="text-right mt-4">
        <v-btn class="pa-2 mr-4 ml-2" to="kerjaKuis" color="red" style="font-weight: bold;">01:20:05</v-btn>
      </div>

      <div class="ms-2 mr-2 mt-3">
        <v-sheet style="background-color: var(--grey);" class="pt-2 pb-6">
          <div class="ms-4 pt-4 pb-2">
            <h1>NAVIGASI KUIS</h1>
            <v-btn class="mb-2 mr-2" color="white">1</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">2</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">3</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">4</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">6</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">7</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">8</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">9</v-btn> <span>Pertanyaan terjawab</span><br>
            <v-btn class="mb-2 mr-2" color="white">10</v-btn> <span>Pertanyaan terjawab</span><br>
          </div>
          <div class="text-center mt-4">
            <!-- <v-btn class="button mb-4" to="/kerjakuis">mengerjakan kembali</v-btn><br> -->
            <!-- <v-btn class="button" style="width: 236px;" to="/kumpulkuis">kumpulkan kuis</v-btn> -->
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
  <div class="navigasi-container">
    <div style="background-color: var(--grey);" class="navigasi" rounded>
      <h1 class="ms-3 pt-2">NAVIGASI KUIS</h1>
      <div class="ms-3">
        <v-btn v-for="(soal, index) in detailSoal" :key="index" class="mb-2 mr-2" color="white">{{index + 1 }} </v-btn>
      </div>
      <div class="text-center mt-8 mb-4" v-if="detailKuis">
        <!-- <v-btn class="button pa-2 mr-2 ml-2" :to="`/kuis/kerjaKuis/reviewKuis/${detailKuis._id}`" rounded="lg">selesaikan kuis</v-btn> -->
        <v-btn class="button pa-2 mr-2 ml-2" @click="changeViewMode(0)" rounded="lg">kembali</v-btn>
        <v-btn class="button pa-2 mr-2 ml-2" @click="changeViewMode(2)" rounded="lg">selesaikan kuis</v-btn>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blank'
})

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
console.log(detailKuis);

const saveAnswer = (index, answer) => {
  const thisQuestions = detailSoal.value[index];
  
  thisQuestions.answer = answer;
  // $cookies.set('quiz_answers', JSON.stringify(answers));
};

const changeViewMode=(mode)=>{
  viewMode.value = mode;
}
</script>

<style>
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

/* Media queries for larger screens */
@media (min-width: 1024px) {
  .kuis-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
  }

  .soal-container {
    grid-column: 1 / 2;
  }

  .navigasi-container {
    grid-column: 2 / 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .navigasi {
    margin-top: 0px;
  }

  .btnnext {
    grid-column: 2/3;
    grid-row: 2/3;
  }

  .text-center {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}
</style>