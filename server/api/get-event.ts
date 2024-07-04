export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;

  //enrolment
  const response = await fetch(`${runtimeConfig.URL2}/imavi/events/get`, {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const event = await response.json();
    return event;
    
  } else {
    return { error: 'Unable to fetch course' };
  }
});