"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

function removeDuplicateNumber(url) {
  const regex = /(\(\d+\))/; // Regular expression to match (1), (2), etc.

  // Remove any spaces before the file extension
  const updatedUrl = url.replace(/\s+/g, "");
  if (regex.test(updatedUrl)) {
    const finalUrl = updatedUrl.replace(regex, "");

    return finalUrl;
  } else {
    return updatedUrl;
  }
}
function getObjectKeyFromS3Url(url) {
  try {
    const urlObject = new URL(url);
    const objectKey = urlObject.pathname.substring(1); // Remove leading '/'
    return objectKey;
  } catch (error) {
    console.error("Error extracting object key:", error.message);
    return null;
  }
}
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    const fileUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    const url = removeDuplicateNumber(fileUrl);
    const objectkey = getObjectKeyFromS3Url(url);
    if (response.ServerSideEncryption === "AES256") {
      return {
        url,
        objectkey,
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function deleteFiles(filesToDelete) {
  for (const fileName of filesToDelete) {
    const params = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
      Key: fileName,
    };

    try {
      const res = await s3Client.send(new DeleteObjectCommand(params));
      return res;
    } catch (err) {
      console.error(`Error deleting file ${fileName}:`, err);
    }
  }
}
