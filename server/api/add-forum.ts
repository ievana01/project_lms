export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  
  const response = await fetch(`${runtimeConfig.URL2}/imavi/forums/create`, {
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
      content: body.content,
      meetingId: body.meetingId,
      forumId: body.forumId,
    }), 
  });
  
  if (response.ok) {
    const addForum = await response.json();
    return addForum;
  } else {
    throw new Error('Failed to add forum');
  }
});