export default defineEventHandler (async(event) => {
  const runtimeConfig=useRuntimeConfig();
  const body=await readBody(event);
  console.log(body)
  const response = await fetch('https://b6f9-202-148-15-210.ngrok-free.app/imavi/users/login-lms', {
    method: 'POST',
    headers: {
      'Id': runtimeConfig.Id,
      'Secret':runtimeConfig.Secret,
      'Partner' : runtimeConfig.Partner,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      username:body.username,
      password:body.password,
    })
  });

  console.log(response);
  let result = await response.json();
  console.log(result);

  const status = response.status;
  return {result, status};
})
