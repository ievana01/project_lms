export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('chatroom', body.id);

  const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig);

  const cookies = parseCookies(event);
  const token = cookies.token;
  console.log(`${runtimeConfig.URL2}/imavi/chats/create/${body.id}`);
  
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

  console.log(response);
  

  if (response.status==200) {
    const createRoomchat = await response.json();
    console.log('chatroom:', createRoomchat);
    return createRoomchat;
  } else {
    throw new Error('Failed to create room chat');
  }
});
