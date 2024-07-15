export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  
  const response = await fetch(`${runtimeConfig.URL2}/imavi/users/edit-profile`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      phoneNumber: body.phoneNumber,
      description: body.description,
      password: body.password,
    }), 
  });
  if (response.ok) {
    const addForum = await response.json();
    return addForum;
  } else {
    throw new Error('Failed to add forum');
  }
});