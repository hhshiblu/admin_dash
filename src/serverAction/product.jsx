import connectToDB from "@/lib/connect";
export const getProducts = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();
    const plainProducts = products.map((products) => {
      const {
        _id,
        name,
        originalPrice,
        discountPrice,
        sold_out,
        stock,
        createdAt,
      } = products;

      // date formated
      const dateObject = new Date(createdAt);
      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      // date object

      return {
        id: _id.toString(),
        name,
        originalPrice,
        discountPrice,
        sold_out,
        stock,
        createdAt: formattedDate,
      };
    });
    return plainProducts;
  } catch (error) {
    return error.message;
  }
};

export const getProduct = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");

    const product = await collection.findOne({ _id: ObjectId(id) });
    return product;
  } catch (error) {
    return error.message;
  }
};
