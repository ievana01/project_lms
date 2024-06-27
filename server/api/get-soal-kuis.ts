export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  console.log('ini detail kuis', body)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`https://b6f9-202-148-15-210.ngrok-free.app/imavi/quizzes/get-question/${body.id}`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log('ini soal', response)
  if (response.ok) {
    const soalKuis = await response.json();
    console.log('ini soal kuis', soalKuis)
    return soalKuis;
  } else {
    return { error: 'Unable to fetch soal kuis' };
  }
});