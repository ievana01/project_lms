export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/courses/get-all`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const descCourse = await response.json();
    return descCourse;
  } else {
    return { error: 'Unable to fetch desk kelas' };
  }
});