export default defineEventHandler (async(event) => {
  const runtimeConfig=useRuntimeConfig();
  const body=await readBody(event);
  const response = await fetch(`${runtimeConfig.URL2}/imavi/users/login-lms`, {
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

  let result = await response.json();
  const status = response.status;
  return {result, status};
})
