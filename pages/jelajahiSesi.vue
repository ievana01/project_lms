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
          <td>Jumat, 17 Mei 2024 08.00 AM</td>
          <td>Sesi saat ini</td>
        </tr>
      </tbody>
    </v-table>
  </div>

</template>

<script lang="ts" setup>

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
