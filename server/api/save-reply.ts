export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log(body);
  const topicIdHeaders = getHeader(event, 'topicId');
  const commentIdHeaders = getHeader(event, 'commentId');
  const typeHeaders = getHeader(event, 'type')

  const runtimeConfig = useRuntimeConfig();
  const cookies = parseCookies(event);
  const token = cookies.token;

  const requestData = {
    topicId: topicIdHeaders,
    commentId: commentIdHeaders,
    type: typeHeaders,
  };

  console.log('Request Data:', requestData);

  const reply = `https://b6f9-202-148-15-210.ngrok-free.app/imavi/forums/reply?topicId=${requestData.topicId}&commentId=${requestData.commentId}`;
  let response;
  let result;
  if (requestData.type == 'reply') {
    response = await fetch(reply, {
      method: 'POST',
      headers: {
        'Id': runtimeConfig.Id,
        'Secret': runtimeConfig.Secret,
        'Partner': runtimeConfig.Partner,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: body.content,
      }),
    });
    if(response.ok){
      const saveReply = await response.json();
      console.log(saveReply);
      return saveReply;
    }
    // result = await response.json();
    // console.log('API Response:', result);
  }
});
