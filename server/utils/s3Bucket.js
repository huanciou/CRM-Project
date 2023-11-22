import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function uploadsFiles(req) {
  const files = [];
  req.body.images = [];
  const mainImageName = uuidv4();
  files.push({
    imgBuffer: req.files.main_image[0].buffer,
    imgType: req.files.main_image[0].mimetype,
    imgName: mainImageName,
  });
  req.body.main_image = mainImageName;

  req.files.images.forEach((file, index) => {
    const imgName = uuidv4();
    files.push({
      imgBuffer: req.files.images[index].buffer,
      imgType: req.files.images[index].mimetype,
      imgName,
    });
    req.body.images.push(imgName);
  });

  return files;
}

async function imgUpload(req) {
  const {
    S3_BUCKET_REGION,
    S3_BUCKET_NAME,
    S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY,
  } = process.env;

  const s3 = new S3Client({
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
    region: S3_BUCKET_REGION,
  });

  const files = uploadsFiles(req);
  const uploadPromises = files.map((i) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: i.imgName,
      Body: i.imgBuffer,
      ContentType: i.imgType,
    };
    const command = new PutObjectCommand(params);
    return s3.send(command);
  });

  try {
    await Promise.all(uploadPromises);
    console.log('Successful');
  } catch (err) {
    console.error('Upload Failed');
  }

  return req.body;
}

export default imgUpload;
