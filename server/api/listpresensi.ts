export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  console.log('presensi' , body)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/activeCourses/get-attendances/${body.id}`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
console.log('presensi', response)
  if (response.ok) {
    const listPresensi = await response.json();
    console.log('presensi',listPresensi)
    return listPresensi;
  } else {
    return { error: 'Unable to fetch list presensi' };
  }
});