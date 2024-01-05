"use client";
import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";

function Page() {
  const [images, setImages] = useState([]);

  const handleUpload = (result, reject) => {
    if (result.info && result.info.public_id && result.info.secure_url) {
      // Create a new object with public_id and url
      const newImage = {
        publicId: result.info.public_id,
        url: result.info.secure_url,
      };

      // Update the state with the new image
      setImages((prevImages) => [...prevImages, newImage]);

      console.log("Image uploaded:", newImage);
    } else {
      console.error("Upload failed:", reject);
    }
  };
  console.log(images);

  return (
    <div>
      <CldUploadButton
        uploadPreset="upload"
        options={{
          sources: ["local", "unsplash"],
        }}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Page;
