export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch(`${runtimeConfig.URL2}/imavi/users/logout`, {
    method:'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Authorization': `Bearer ${token}`,
    }
  });
  let result = await response.json();
  const status = response.status;
  return { result, status };
});