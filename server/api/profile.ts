export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;
  const response = await fetch('https://b6f9-202-148-15-210.ngrok-free.app/imavi/users/profile-lms', {
    headers: {
      'Id': runtimeConfig.Id,
      'Secret': runtimeConfig.Secret,
      'Partner': runtimeConfig.Partner,
      'Authorization': `Bearer ${token}`,
    },
  });

let profileData;
  if (response.status == 200) {
    profileData = await response.json();
    return profileData;
  } else {
    return { error: 'Unable to fetch profile' };
  }
});