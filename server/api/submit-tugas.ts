export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/assignments/submit/${body.id}`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      acName: body.acName,
      acId: body.acId,
      meetingId: body.meetingId,
      link: body.link,
    }), 
  });

  if (response.ok) {
    const submitTugas = await response.json();
    return submitTugas;
  } else {
    throw new Error('Failed to save comment');
  }
});
