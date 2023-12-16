import SingleOrder from "@/components/orders/singleOrder";
import { Suspense } from "react";

function page({ params }) {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <SingleOrder id={params.id} />
      </Suspense>
    </div>
  );
}

export default page;
