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
    nameMaterial: nameMaterialHeaders,
    assignmentId: idAssignmentHeaders,
    quizId: idQuizHeaders,
  };

  const materi = `https://b6f9-202-148-15-210.ngrok-free.app/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&nameMaterial=${requestData.nameMaterial}&type=${requestData.type}`

  const tugas = `https://b6f9-202-148-15-210.ngrok-free.app/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&idAssignment=${requestData.assignmentId}&type=${requestData.type}`

  const quiz = `https://b6f9-202-148-15-210.ngrok-free.app/imavi/activeCourses/student-finish-meeting?acId=${requestData.acId}&meetingId=${requestData.meetingId}&idAssignment=${requestData.quizId}&type=${requestData.type}`

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
