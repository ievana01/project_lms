export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/forums/get-by-meeting/${body.id}`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (response.ok) {
    const topikKelas = await response.json();
    return topikKelas;
  } else {
    return { error: 'Unable to forum kelas' };
  }
});