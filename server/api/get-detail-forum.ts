export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  console.log('forum', body);
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/forums/get/${body.id}`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(response)
  if (response.ok) {
    const detailForum = await response.json();
    console.log('ini detail forum', detailForum)
    return detailForum;
  } else {
    return { error: 'Unable to detail forum' };
  }
});