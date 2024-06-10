<template>
  <v-btn :variant="file.done ? 'success' : 'outlined'" @click="toggleDone(file)">
    {{ file.done ? 'Done' : 'Mark as Done' }}
  </v-btn>
</template>
<script>
export default {
  props: {
    pertemuan: {
      type: Array,
      required: true
    },
    file: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleDone(file) {
      file.done = !file.done; // Toggle the 'done' status of the file
    }
  }
};
</script>