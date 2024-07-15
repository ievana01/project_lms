<template>
  <div class="ms-2 mr-2">
    <h1 style="color: var(--purple);">JELAJAHI SESI</h1>
    <v-table bordered>
      <thead>
        <tr>
          <th class="text-left" style="font-weight: bold;">Masuk</th>
          <th class="text-left" style="font-weight: bold;">Aktivitas Terakhir</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{formattedDate(profileApi?.access?.firstAccess)}}</td>
          <td>{{formattedDate(profileApi?.access?.lastAccess)}}</td>
        </tr>
      </tbody>
    </v-table>
  </div>

</template>

<script setup>
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

let token = useCookie('token')
const { data: profile } = await useFetch('/api/profile', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});

const profileApi = ref();
profileApi.value = profile.value;
const access = profileApi.value.access;

const formattedDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
};
</script>

<style>
/* Menyesuaikan gaya border sesuai keinginan Anda */
.v-table {
  border-collapse: collapse;
  width: 100%;
}

.v-table th,
.v-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.v-table th {
  background-color: #f2f2f2;
}
</style>
