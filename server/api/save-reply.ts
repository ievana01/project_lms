export default defineEventHandler(async (event) => {
  let body = await readBody(event);

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


  const reply = `${runtimeConfig.URL2}/imavi/forums/reply?topicId=${requestData.topicId}&commentId=${requestData.commentId}`;
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
      return saveReply;
    }
  }
});
