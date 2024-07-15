export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/chats/get`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (response.ok) {
    const dataUserChat = await response.json();
    return dataUserChat;
    
  } else {
    return { error: 'Unable to fetch course' };
  }
});