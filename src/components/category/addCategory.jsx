import { RxCross1 } from "react-icons/rx";
import { useFormStatus } from "react-dom";
import { addCategory } from "@/serverAction/category";
function AddCategory({ data, setConfirm }) {
  const { pending } = useFormStatus();

  return (
    <div>
      <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
        <div className="w-[90%] md:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
          <div className="w-full flex justify-end cursor-pointer">
            <RxCross1 size={25} onClick={() => setConfirm(false)} />
          </div>
          <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
            Add Category
          </h3>

          <form
            action={async (formData) => {
              await addCategory(formData).then(() => setConfirm(false));
            }}
            encType="multipart/form-data"
          >
            <div className="flex  flex-col md:flex-row gap-4">
              <div className="md:w-[50%]">
                <label className="pb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={`Category Name`}
                  required
                  className="my-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="md:w-[50%]">
                <label className="pb-2 block">
                  Select Parent Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="p-[7px] pl-4 rounded-md w-[100%] "
                  type="text"
                  name="parentId"
                >
                  <option>select category</option>
                  {data.map((option, i) => (
                    <option key={i} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />

            <div>
              <button
                type="submit"
                aria-disabled={pending}
                className={`group relative mt-4 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
                  pending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-800"
                }`}
              >
                {pending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
