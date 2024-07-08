export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('pesan', body);
  
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/chats/get-chat/${body.id}`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const getChat = await response.json();
    return getChat;
  } else {
    throw new Error('Failed to get chat');
  }
});
