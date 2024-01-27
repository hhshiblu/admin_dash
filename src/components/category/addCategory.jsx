import { RxCross1 } from "react-icons/rx";

import { addCategory } from "@/serverAction/category";
import SubmitButton from "./submitButton";
import { toast } from "sonner";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Photocard from "@/app/admin-dashboard/category/photocard";

function AddCategory({ data, setConfirm }) {
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
              await addCategory(formData).then((res) => {
                if (res.success) {
                  toast.success(res.message, {
                    duration: 3000,
                    cancel: {
                      label: "cancel",
                    },
                  });
                  setConfirm(false);
                }
                if (res.error) {
                  toast.error(res.error, {
                    duration: 3000,
                    cancel: {
                      label: "cancel",
                    },
                  });
                }
              });
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
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap ">
                <label htmlFor="upload" className="cursor-pointer">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {images &&
                  images.map((files, index) => (
                    <Photocard
                      key={index}
                      url={URL.createObjectURL(files)}
                      onClick={() => handelDeleteFile(index)}
                    />
                  ))}
              </div>
              <br />
            </div>
            <br />
            <div>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
