export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log('save',body)
  console.log(body.content)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`https://b6f9-202-148-15-210.ngrok-free.app/imavi/assignments/comment/${body.id}`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: body.content,
    }), 
  });

  console.log('save', response);

  if (response.ok) {
    const saveComment = await response.json();
    console.log('Saved Comment:', saveComment);
    return saveComment;
  } else {
    console.error('Failed to save comment:', response.statusText);
    throw new Error('Failed to save comment');
  }
});
