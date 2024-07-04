export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('grade', body);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/grades/get`, {
    headers: {
      'Id': runtimeConfig.Id2,
      'Secret': runtimeConfig.Secret2,
      'Partner': 'cim',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log('grade', response);

  if (response.ok) {
    const getGrade = await response.json();
    console.log('Submit:', getGrade);
    return getGrade;
  } else {
    console.error('Failed to get grade:', response.statusText);
    throw new Error('Failed to get grade');
  }
});
