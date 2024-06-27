<template>
  <v-container class="ms-0">
    <v-row class="list-card">
      <v-col v-for="(topik, index) in topikKelas" :key="index">
        <NuxtLink :to="`/forum/detailForum/${topik._id}`">
          <v-card class="pl-2 pr-2" style="background-color: #F5F5F5;">
            <div class="pt-4">
              <h1>{{ topik.name }}</h1>
              <p>Dibuat oleh: {{ topik.createdByName }}</p>
            </div>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  topikKelas: {
    type: Array,
    required: true
  }
})

</script>
