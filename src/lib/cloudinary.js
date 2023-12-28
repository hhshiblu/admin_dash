import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImagesToCloudinary(images, folder) {
  const imageUrls = [];

  for (const image of images) {
    try {
      // Read the content of the file as a data URL
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      // Wait for the file reading to complete
      const imageDataUrl = await new Promise((resolve) => {
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      });

      // Upload the data URL to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imageDataUrl, {
        folder: folder,
      });

      imageUrls.push(uploadResult.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  }

  return imageUrls;
}
