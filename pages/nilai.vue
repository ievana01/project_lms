<template>
  <div class="ms-4">
    <h1 style="color: var(--purple);">DAFTAR NILAI</h1>
  </div>
  <div style="min-height: 380px">
    <v-table class="ms-4 mr-4" v-if="dataNilai">
      <thead>
        <tr>
          <th style="font-weight: bold;">Nama Kelas</th>
          <th style="font-weight: bold;">NTS</th>
          <th style="font-weight: bold;">NAS</th>
          <th style="font-weight: bold;">Nilai Akhir</th>
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
      </tbody>
    </v-table>
    <v-table v-else>
      <div class="mt-4">
        <p class="text-center" style="font-weight: bold">Data nilai belum tersedia</p>
      </div>
    </v-table>
  </div>
</template>

<script setup>
const token = useCookie('token');
const { data: grade } = await useFetch('/api/get-grade', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value })
});
const dataNilai = ref(grade.value);
</script>
