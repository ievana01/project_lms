<template>
  <v-table class="ms-4 mr-4">
    <thead>
      <tr>
        <th style="font-weight: bold;">Nama Kelas</th>
        <th style="font-weight: bold;">NTS</th>
        <th style="font-weight: bold;">NAS</th>
        <th style="font-weight: bold;">NA</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(nilai, index) in dataNilai" :key="index">
        <td>{{ nilai.acName }}</td>
        <td v-if="nilai.nts !== ''">{{ nilai.nts }}</td>
        <td v-else>-</td>
        <td>{{ nilai.nas !== '' ? nilai.nas : '-' }}</td>
        <td>{{ nilai.na !== '' ? nilai.na : '-' }}</td>
      </tr>
      <tr v-if="dataNilai.length === 0">
        <td colspan="4" class="text-center">Tidak ada data nilai yang tersedia.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
const token = useCookie('token');
const { data: grade } = await useFetch('/api/get-grade', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataNilai = ref(grade.value);
</script>
