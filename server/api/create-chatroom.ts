export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  
  const response = await fetch(`${runtimeConfig.URL2}/imavi/chats/create/${body.id}`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body : JSON.stringify({})
  });

  if (response.status==200) {
    const createRoomchat = await response.json();
    return createRoomchat;
  } else {
    throw new Error('Failed to create room chat');
  }
});
