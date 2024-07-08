export default defineEventHandler(async (event) => {  
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
  if (response.status == 200) {
    const getStudentChat = await response.json();    
    return getStudentChat;
  } else {
    throw new Error('Failed to get student chat ');
  }
});
