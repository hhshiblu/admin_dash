import SingleOrder from "@/components/orders/singleOrder";
import { getOrder } from "@/serverAction/order/order";
import { Suspense } from "react";

async function page({ params }) {
  await getOrder(params.id);
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <SingleOrder id={params.id} />
      </Suspense>
    </div>
  );
}

export default page;
