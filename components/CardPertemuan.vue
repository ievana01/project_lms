<template>
  <div>
    <div class="ms-4 mr-4 mb-4 ma-2">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Penjelasan</v-expansion-panel-title>
          <v-expansion-panel-text>
            <h6>Deskripsi</h6>
            <p style="text-align: justify;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
              tempora molestiae temporibus
              quisquam dolore assumenda ab officia quasi a perspiciatis! Vitae porro dolorem corrupti accusamus, eum
              eligendi iste dicta? Sequi.</p>
            <br>
            <h6>Tujuan</h6>
            <p style="text-align: justify;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde amet rem
              dolor quia! Numquam unde error id,
              ad necessitatibus aliquam distinctio odio dolor? A eius accusamus et ut, ducimus deserunt?</p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="ms-4 mr-4 ">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, index) in pertemuan" :key="index" class="mb-4">
          <v-expansion-panel-title>{{ item.nama_pertemuan }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(file, fIndex) in getFiles(item.id_pertemuan)" :key="fIndex">
              <div class="file mb-4">
                <NuxtLink :to="file.link" style="color: black;">
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2">{{ file.icon }}</v-icon> {{ file.nama }}
                  </div>
                </NuxtLink>
                  <v-btn :class="file.done ? 'btn-done' : 'btn-mark-done'" @click="toggleDone(file)" variant="outlined" style="font-size: 12px;">
                    {{ file.done ? 'Done' : 'Mark as Done' }}
                  </v-btn>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
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
    getFiles(id_pertemuan) {
      return this.file.filter(file => file.pertemuan === id_pertemuan);
    },
    toggleDone(file) {
      file.done = !file.done;
    }
  }
}
</script>

<style scoped>
.file-content {
  display: flex;
  align-items: center;
}

.btn-mark-done {
  color: green !important;
}

.btn-done {
  color: white !important;
  background-color: green !important;
}
</style>
