export default defineEventHandler(async (event) => {
  // let body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/assignments/get`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const daftarTugas = await response.json();
    return daftarTugas;
  } else {
    return { error: 'Unable to fetch daftar tugas' };
  }
});