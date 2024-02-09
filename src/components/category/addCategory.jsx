"use client";
import { RxAvatar, RxCross1 } from "react-icons/rx";

import { addCategory } from "@/serverAction/category";
import { toast } from "sonner";
import { useState } from "react";
import SubmitButton from "../button/submitButton";

function AddCategory({ data, setConfirm }) {
  const [avatar, setAvatar] = useState(null);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
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
              formData.append("file", avatar);
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
            <div className="pb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <br />
            <div>
              <SubmitButton name="Add category" type="Loading ..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
