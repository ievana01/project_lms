export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/chats/get-all-student`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log('get all student', response);
  
  if (response.status == 200) {
    const getStudentChat = await response.json();
    console.log('get all student',getStudentChat);
    
    return getStudentChat;
  } else {
    throw new Error('Failed to get student chat ');
  }
});
