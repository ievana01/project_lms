export default defineEventHandler (async(event) => {
  const runtimeConfig=useRuntimeConfig();
  const body=await readBody(event);
  console.log(body)
  const response = await fetch('https://api.imavi.org/imavi/users/login-student', {
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
  console.log(result);
  return result;
})
