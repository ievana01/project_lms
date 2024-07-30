<template>
  <div class="ms-3 mr-3">
    <v-row class="list-card">
      <v-col v-for="(peserta, index) in peserta" :key="index">
        <v-card color="var(--grey)" style="max-height: auto;">
          <div class="d-flex align-center pb-2">
            <v-btn class="ma-3" size="small" color="#612D81" icon="mdi-account" variant="outlined"></v-btn>
            <div>
              <v-card-text class="pb-0">{{ peserta.studentName }}</v-card-text>
              <v-card-text class="pb-0">NRP: {{ peserta.studentNrp }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const props = defineProps({
  peserta: {
    type: Array,
    required: true
  }
})

</script>

<style></style>