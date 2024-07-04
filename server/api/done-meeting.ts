export default defineEventHandler(async (event) => {
  const acIdHeaders = getHeader(event, 'acId');
  const meetingIdHeaders = getHeader(event, 'meetingId');
  const nameMaterialHeaders = getHeader(event, 'materialName');
  const typeHeaders = getHeader(event, 'type');
  const idAssignmentHeaders = getHeader(event, 'assignmentId');
  const idQuizHeaders = getHeader(event, 'quizId');

  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;

  const requestData = {
    acId: acIdHeaders,
    meetingId: meetingIdHeaders,
    type: typeHeaders,
    materialName: nameMaterialHeaders,
    assignmentId: idAssignmentHeaders,
    quizId: idQuizHeaders,
  };

  const materi = `${runtimeConfig.URL2}/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&materialName=${requestData.materialName}&type=${requestData.type}`

  const tugas = `${runtimeConfig.URL2}/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&assignmentId=${requestData.assignmentId}&type=${requestData.type}`

  const quiz = `${runtimeConfig.URL2}/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&quizId=${requestData.quizId}&type=${requestData.type}`

  let response;
  let result;

  if (requestData.type == 'materi') {
    response = await fetch(materi, {
      method: 'POST',
      headers: {
        'Id': runtimeConfig.Id,
        'Secret': runtimeConfig.Secret,
        'Partner': runtimeConfig.Partner,
        'Authorization': `Bearer ${token}`,
      },
    });
    result = await response.json();
  } else if (requestData.type == 'tugas') {
    response = await fetch(tugas, {
      method: 'POST',
      headers: {
        'Id': runtimeConfig.Id,
        'Secret': runtimeConfig.Secret,
        'Partner': runtimeConfig.Partner,
        'Authorization': `Bearer ${token}`,
      },
    });
    result = await response.json();
  } else if (requestData.type == 'kuis') {
    response = await fetch(quiz, {
      method: 'POST',
      headers: {
        'Id': runtimeConfig.Id,
        'Secret': runtimeConfig.Secret,
        'Partner': runtimeConfig.Partner,
        'Authorization': `Bearer ${token}`,
      },
    });
    result = await response.json();
  }
  return { result, status: response.status };
});
