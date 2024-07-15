export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/users/activity`, {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const activity = await response.json();
    return activity;
  } else {
    throw new Error('Failed to add activity');
  }
});
