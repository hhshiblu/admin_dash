import { getProduct } from "@/serverAction/product";
import Image from "next/image";
import React from "react";

async function page({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      {product &&
        product.images.map((image, id) => (
          <Image
            key={id}
            src={`https://rajdhola-com-admin-desh.onrender.com/upload/${image.filename}`}
          />
        ))}
    </div>
  );
}

export default page;
