export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  console.log(runtimeConfig)
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/events/create`, {
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

  if (response.ok) {
    const addEvent = await response.json();
    return addEvent;
  } else {
    throw new Error('Failed to add event');
  }
});
