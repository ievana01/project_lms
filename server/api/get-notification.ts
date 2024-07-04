export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/notifications/get-all/imaviLms`, {
    headers: {
      'Id': runtimeConfig.Id2,
      'Secret': runtimeConfig.Secret2,
      'Partner': 'cim',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      
    },
  });
  if (response.ok) {
    const getNotification = await response.json();
    return getNotification;
  } else {
    throw new Error('Failed to get notificaiton');
  }
});