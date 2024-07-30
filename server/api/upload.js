import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);

  // console.log(body[1].data.toString());
  const file = body[0].data;
  // console.log('ini', file);
  const name = body[1].data.toString();
  let runTimeConfig = useRuntimeConfig();
  const config = {
    endpoint: runTimeConfig.S3_endpoint,
    region: runTimeConfig.S3_region,
    accessKeyId: runTimeConfig.S3_accessKeyId,
    secretAccessKey: runTimeConfig.S3_secretAccessKey,
    Bucket: runTimeConfig.S3_ember,
  };
  //   console.log(body.name);
  const s3Client = new S3({
    endpoint: config.endpoint,
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  const x = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.Bucket,
      Key: name,
      Body: file,
      ACL: 'public-read',
      CacheControl: 'no-cache',
    })
  );
  // console.log(x);
  return { url: `${config.endpoint}/${config.Bucket}/${name}`};
});
