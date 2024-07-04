export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('quiz', body);

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
    body: JSON.stringify({
      name: body.name,
      date: body.date,
      category: body.category,
    }),
  });

  console.log('save', response);

  if (response.ok) {
    const createRoomchat = await response.json();
    console.log('Submit:', createRoomchat);
    return createRoomchat;
  } else {
    console.error('Failed to create room chat:', response.statusText);
    throw new Error('Failed to create room chat');
  }
});
