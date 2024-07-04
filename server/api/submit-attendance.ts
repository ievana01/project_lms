export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/activeCourses/submit-attendances`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      acId: body.acId,
      meetingId: body.meetingId,
      meetingName: body.meetingName,
      status: body.status,
      isOnTime: body.isOnTime,
      isMaterialAvailable:body.isMaterialAvailable
    }), 
  });

  if (response.ok) {
    const submitAttendance = await response.json();
    return submitAttendance;
  } else {
    throw new Error('Failed to submit attendance');
  }
});
