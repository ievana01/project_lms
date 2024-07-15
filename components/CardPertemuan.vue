<template>
  <div>
    <div class="ms-4 mr-4 mb-4 ma-2">
      <v-sheet :max-height="expandedDesKelas ? 'auto' : 'auto'" elevation="2" rounded>
        <v-row>
          <v-col cols="10">
            <div class="pt-2 pl-2 mb-2">
              <span @click="toggleExpansionDesKelas">
                <v-icon>{{ expandedDesKelas ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon> Penjelasan
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="expandedDesKelas" class="px-4">
          <div class="ms-8 mr-2 pb-2">
            <h6>Deskripsi</h6>
            <p style="text-align: justify;">{{ desKelas.description }}</p>
            <br>
            <h6>Tujuan</h6>
            <p style="text-align: justify;">
              {{ desKelas.purpose }}
            </p>
          </div>
        </v-row>
      </v-sheet>
    </div>
    <div class="ms-4 mr-4">
      <v-sheet v-for="(item, index) in detailCourse.meetings" :key="index" class="mb-4"
        :max-height="expandedPanels[index] ? 'auto' : 'auto'" elevation="2" rounded>
        <v-row>
          <v-col cols="10">
            <div class="pt-2 pl-2 mb-2">
              <span @click="toggleExpansionPanel(index)">
                <v-icon>{{ expandedPanels[index] ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon> {{ item.name }}
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="expandedPanels[index]" class="px-4">
          <!-- absensi -->
          <div>
            <div class="ms-8 mb-2 d-flex" v-if="item.attendance">
                <NuxtLink>
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2" color="green">{{ getIcon('absensi') }}</v-icon><span style="color: black">{{ item.attendance.meetingName }}</span> 
                  </div>
                </NuxtLink>
              </div>
            <div v-else>
              <div class="ms-8 mb-2 d-flex">
                <NuxtLink :to="`/absensi/${detailCourse._id}-${item._id}`">
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2" color="black">{{ getIcon('absensi') }}</v-icon><span style="color: black">{{ item.attendance.meetingName }}</span> 
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- forum -->
          <div v-if="item.forums.length" class="ms-4 mr-2 w-100 mt-1">
              <div v-for="(forum, fIndex) in item.forums" :key="fIndex" class="assignment-item mb-4 ms-4 mr-4">
                <NuxtLink :to="`/forum/${forum.meetingId}-${forum._id}`" style="color: black;">
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2">{{ getIcon('forum') }}</v-icon> {{ forum.name }}
                  </div>
                </NuxtLink>
              </div>
            </div>

          <!-- materi -->
          <div class="ms-4 mr-2 w-100 pb-2">
            <div v-for="(file, index) in item.links" :key="index"
                class="assignment-item mb-4 ms-4 mr-4">
                <NuxtLink :to="file.link" style="color: black;" @click="doneMeeting(item._id,file.name)">
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2">{{ getIcon('file') }}</v-icon> {{ file.name }}
                  </div>
                </NuxtLink>
                <div class="d-flex justify-content-end">
                  <div v-for="(fileFinish, index) in item.isFinished" :key="index">
                    <v-btn v-if="file.name == fileFinish.materialName "
                      :class="file.name == fileFinish._id ? 'btn-mark-done' : 'btn-done'"
                      @click="doneMeeting(item._id, file.name)" variant="outlined" style="font-size: 12px;">
                      {{ fileFinish.materialName == file.name ? 'Selesai' : 'Tandai telah selesai' }}
                    </v-btn>
                  </div>
                </div>
              </div>
            <!-- <div v-for="(file, fIndex) in getFiles(item._id)" :key="fIndex">
              <div class="file mb-4" v-for="(link, index) in item.links" :key="index">
                <NuxtLink :to="file.link" style="color: black;" @click="doneMeeting(file.name, link.name)">
                  <div class="mt-2">
                    <v-icon left class="mr-2">{{ getIcon('file') }}</v-icon> {{ file.name }}
                  </div>
                </NuxtLink>
                <div class="d-flex justify-content-end">
                  <div v-for="(item2, index2) in item.isFinished" :key="index2">
                    {{ item2 }}
                    <v-btn v-if="item2._id == file.name"
                      :class="item2._id == file.name ? 'btn-done' : 'btn-mark-done'"
                      @click="doneMeeting(file.name, item._id)" variant="outlined" style="font-size: 12px;">
                      {{ item2.nameMaterial == file.name ? 'Selesai' : 'Tandai telah selesai' }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- tugas -->
            <div v-if="item.assignments.length">
              <div v-for="(assignment, aIndex) in item.assignments" :key="aIndex"
                class="assignment-item mb-4 ms-4 mr-4">
                <NuxtLink :to="`/tugas/${assignment._id}`" style="color: black;" @click="doneMeetingAssignment(item._id, assignment._id)">
                  <div class="file-content mt-2">
                    <v-icon left class="mr-2">{{ getIcon('task') }}</v-icon> {{ assignment.name }}
                  </div>
                </NuxtLink>
                <div class="d-flex justify-content-end">
                  <div v-for="(item3, index3) in item.isFinished" :key="index3">
                    <v-btn v-if="item3.assignmentId == assignment._id"
                      :class="item3.assignmentId == assignment._id ? 'btn-done' : 'btn-mark-done'"
                      @click="doneMeetingAssignment(item._id, assignment._id)" variant="outlined"
                      style="font-size: 12px;">
                      {{ item3.assignmentId == assignment._id ? 'Selesai' : 'Tandai telah selesai' }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>

            <!-- kuis -->
            <div v-if="item.quizzes.length">
              <div v-for="(kuis, qIndex) in item.quizzes" :key="qIndex" class="assignment-item mb-4 ms-4 mr-4">
                <NuxtLink :to="`/kuis/${kuis._id}`" style="color: black;" >
                  <div class="file-content mt-2" @click="doneMeetingQuiz(item._id, kuis._id)">
                    <v-icon left class="mr-2">{{ getIcon('kuis') }}</v-icon> {{ kuis.name }}
                  </div>
                </NuxtLink>
                <div class="d-flex justify-content-end">
                  <div v-for="(item4, index4) in item.isFinished" :key="index4">
                    <v-btn v-if="item4.quizId == kuis._id"
                      :class="item4.quizId == kuis._id ? 'btn-done' : 'btn-mark-done'"
                      @click="doneMeetingQuiz(item._id, kuis._id)" variant="outlined"
                      style="font-size: 12px;">
                      {{ item4.quizId == kuis._id ? 'Selesai' : 'Tandai telah selesai' }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </v-row>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
let token = useCookie('token');
const route = useRoute();

const doneMeeting = async (idPertemuan,name) => {
  const { data: meeting } = await useFetch('/api/done-meeting', {
    headers: {
      profileToken: token.value, acId: route.params.slug, meetingId: idPertemuan, type: 'materi', materialName: name, 
    },
  });
  console.log(headers);
  console.log(meeting.value);
};

const doneMeetingAssignment = async (idPertemuan, assignmentId) => {
  const { data: assignment } = await useFetch('/api/done-meeting', {
    headers: {
      profileToken: token.value, acId: route.params.slug, meetingId: idPertemuan, assignmentId: assignmentId, type: 'tugas',
    },
  });
  console.log(assignment.value);
};

const doneMeetingQuiz = async (idPertemuan, quizId) => {
  const { data: quiz } = await useFetch('/api/done-meeting', {
    headers: {
      profileToken: token.value, acId: route.params.slug, meetingId: idPertemuan, quizId: quizId, type: 'kuis',
    },
  });
  console.log(quiz.value);
};

// deskripsi kelas
const { data: descCourse } = await useFetch('/api/deskCourse', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: route.params.slug })
});
const desKelas = ref(descCourse.value);
if (descCourse.value && descCourse.value.length > 0) {
  desKelas.value = descCourse.value[0];
}

//detail kelas
const { data: course } = await useFetch('/api/get-detailCourse', {
  method: 'POST',
  body: JSON.stringify({ profileToken: token.value, id: route.params.slug })
});
const detailCourse = ref(course.value);
console.log(detailCourse.value);
// const getFiles = (id_pertemuan) => {
//   return detailCourse.value.meetings.find(meeting => meeting._id === id_pertemuan)?.links || [];
// };

//ambil meetings di detail kelas
const attendance = detailCourse.value.meetings;
console.log(attendance);

const file = [
  { icon: 'mdi-file-powerpoint', nama: 'Introduction', link: '', pertemuan: 1 },
  { icon: 'mdi-file-document', nama: 'Chapter 1', link: '', pertemuan: 1 },
  { icon: 'mdi-clipboard-text', nama: 'Tugas Pertemuan 1', link: '/tugas', pertemuan: 1, code: 'task' },
  { icon: 'mdi-check-circle-outline', nama: 'Presensi Pertemuan 1', link: '/presensi', pertemuan: 1, code: 'absensi' },
  { icon: 'mdi-file-document', nama: 'Setup Guide', link: '', pertemuan: 2, code: 'file' },
  { icon: 'mdi-checkbox-marked-outline', nama: 'Kuis Pertemuan 2', link: '/kuis', pertemuan: 2, code: 'kuis' },
  { icon: 'mdi-forum', nama: 'Forum Kelas', link: '/forum', pertemuan: 3, code: 'forum' },
];

const expandedDesKelas = ref(false);
const expandedPanels = ref(detailCourse.value.meetings.map(() => false));

const toggleExpansionDesKelas = () => {
  expandedDesKelas.value = !expandedDesKelas.value;
};

const toggleExpansionPanel = (index) => {
  expandedPanels.value[index] = !expandedPanels.value[index];
};

const getIcon = (code) => {
  const thisIcon = file.find(item => item.code == code);
  return thisIcon.icon;
};
</script>

<style scoped>
.file-content {
  display: flex;
  align-items: center;
}

/* selesai */
.btn-mark-done {
  color: green !important;
}
/* tandai telah selesai */
.btn-done {
  color: white !important;
  background-color: green !important;
}

.v-sheet {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.assignment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
</style>
