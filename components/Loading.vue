<template>
  <div class="loading-container">
    <v-progress-circular
      :size="60"
      :width="7"
      indeterminate
      color="var(--purple)"
    ></v-progress-circular>
  </div>
</template>

<script>
definePageMeta({
  layout: 'blank'
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 9999; 
}
</style>
