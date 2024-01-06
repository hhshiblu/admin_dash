import { getProduct } from "@/serverAction/product";
import Image from "next/image";
import React from "react";

async function page({ params }) {
  const product = await getProduct(params.id);
  console.log(product.images);

  return (
    <div>
      {product && (
        <Image
          src={`https://rajdhola-com-admin-desh.onrender.com/${product.images[0].filename}`}
          width={100}
          height={100}
          alt="hello world"
        />
      )}
    </div>
  );
}

export default page;
