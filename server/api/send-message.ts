export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log(body);
  
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/chats/send/${body.id}`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: body.message,
      receiverId: body.receiverId,
    }),
  });
  console.log(response);
  
  if (response.ok) {
    const sendMessage = await response.json();
    console.log(sendMessage);
    
    return sendMessage;
  } else {
    throw new Error('Failed to send message');
  }
});
