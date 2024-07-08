<template>
  <div v-if="$viewport.isLessThan('tablet')">
    <HeaderMobile />
  </div>
  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <HeaderDesktop />
  </div>
  <v-main class="mt-3">
    <slot />
    <br>
    <Footer />
  </v-main>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { onMounted } from 'vue';
let { $viewport } = useNuxtApp()

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

let token = useCookie('token')
onMounted(() => {
  if (token.value == undefined) {
    return navigateTo('/login')
  }
});

const { data: profile } = await useFetch('/api/profile', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
if (profile.value) {
  const profileApi = ref();
  profileApi.value = profile.value;
}

</script>

<style></style>