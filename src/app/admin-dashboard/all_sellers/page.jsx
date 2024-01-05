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
    return { error: error.message };
  }
};
export const dynamic = "force-dynamic";
async function page() {
  const sellers = await getSellers().catch((error) => {
    toast.error(error, {
      duration: 3000,
      cancel: {
        label: "cancel",
      },
    });
  });

  return <SellerTable data={sellers} />;
}

export default page;
