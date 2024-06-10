<template>
  <div v-if="$viewport.isLessThan('tablet')">
    <HeaderMobile />
  </div>
  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <HeaderDesktop />
  </div>
  <v-main>
    <slot /> 
    <br>
    <Footer/>
  </v-main>
</template>

<script setup>
import { useNuxtApp } from '#app'
const { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

</script>

<style></style>