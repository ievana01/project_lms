export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/quizzes/start/${body.id}`, {
    method:'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const startQuiz = await response.json();
    return startQuiz;
  } else {
    console.error('Failed to start quiz:', response.statusText);
    throw new Error('Failed to start quiz');
  }
});
