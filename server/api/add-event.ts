export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch('https://b6f9-202-148-15-210.ngrok-free.app/', {
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
      content: body.category,
    }), 
  });
  if (response.ok) {
    const addEvent = await response.json();
    return addEvent;
  } else {
    throw new Error('Failed to save comment');
  }
});
