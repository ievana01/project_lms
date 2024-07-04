export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('quiz', body);

  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;

  console.log(body.answers);
  
  const response = await fetch(`${runtimeConfig.URL2}/imavi/quizzes/submit/${body.id}`, {
    method: 'PUT',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      answers: body.answers
    }),
  });

  console.log('submit', response);

  if (response.status == 200) {
    const submitQuiz = await response.json();
    console.log('Submit:', submitQuiz);
    return submitQuiz;
  } else {
    console.error('Failed to submit quiz:', response.statusText);
    console.log(response);
    throw new Error('Failed to submit quiz');
    
  }
});
