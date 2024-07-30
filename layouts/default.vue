<template>
  <Loading v-if="loading"></Loading>
  <div v-if="$viewport.isLessThan('tablet')">
    <HeaderMobile />
  </div>
  <div v-if="$viewport.isGreaterOrEquals('tablet')">
    <HeaderDesktop />
  </div>
  <v-main class="mt-3">
    <slot />
    <br>
  </v-main>
  <Footer class="footer" />
</template>

<script setup>
import { useNuxtApp } from '#app'
import { onMounted } from 'vue';

const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

let { $viewport } = useNuxtApp();

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})
let timer;
let token = useCookie('token')
onMounted(() => {
  if (!token.value) {
    return navigateTo('/login')
  }

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      token.value = undefined;
      navigateTo('/login');
    }, 100 * 60 * 1000);
  };

  resetTimer();

  const activityEvents = ['click', 'mousemove', 'keydown', 'scroll'];
  activityEvents.forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  onBeforeUnmount(() => {
    activityEvents.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  });
});

const { data: profile } = await useFetch('/api/profile', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
if (profile.value) {
  const profileApi = ref();
  profileApi.value = profile.value;
  loading.value = false;
}

</script>

<style>

</style>