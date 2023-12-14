import Category from "@/components/category/category";
import { Suspense } from "react";

async function page() {
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-3 ">
        <h3 className="text-[21px]  font-semibold text-slate-600">Category</h3>
      </div>

      <hr />
      <hr />
      <div>
        <Suspense fallback={<p>loading...</p>}>
          <Category />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
