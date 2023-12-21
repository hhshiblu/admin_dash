import { SellerTable } from "@/components/seller/sellerTable";
import connectToDB from "@/lib/connect";

const getSellers = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("shops");

    const seller = await collection.find({}).toArray();

    const sellers = JSON.parse(JSON.stringify(seller));
    return sellers;
  } catch (error) {
    return error.message;
  }
};

async function page() {
  const sellers = await getSellers();
  return <SellerTable data={sellers} />;
}

export default page;
