export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  console.log(body)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch('https://b6f9-202-148-15-210.ngrok-free.app/imavi/users/logout', {
    method:'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log(response);
  let result = await response.json();
  console.log(result);

  const status = response.status;
  return { result, status };
});