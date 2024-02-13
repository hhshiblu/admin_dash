"use client";
import SubmitButton from "@/components/button/submitButton";
import { createBanar } from "@/serverAction/home";
import React, { useState } from "react";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

function AddBanar({ setOpen }) {
  const [selectedType, setSelectedType] = useState(null);

  const typeOptions = ["big", "small"];
  const [avatar, setAvatar] = useState(null);
  const [banarLink, setBanarLink] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("urlbanarproduct", banarLink);
      formData.append("type", selectedType);
      const res = await createBanar(formData);

      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
        setOpen(false);
        setBanarLink("");
        setAvatar(null);
      }
    } catch (error) {
      if (error) {
        toast.error(error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    }
  };
  return (
    <div>
      <div className="w-full   fixed top-0 left-0 z-[999] bg-[#11101039] flex items-center justify-center h-screen">
        <div className="w-[95%]  md:w-[40%] min-h-[20vh] bg-white mx-auto rounded shadow p-5">
          <div className="w-full flex justify-end cursor-pointer">
            <RxCross1 size={25} onClick={() => setOpen(false)} />
          </div>
          <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
            create banar
          </h3>
          <form action={handleSubmit}>
            <div>
              <label className="pb-2">
                Banar Link <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="banarLink"
                value={banarLink}
                onChange={(e) => setBanarLink(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your banar link..."
              />
            </div>
            <br />
            <div className="flex flex-col 600px:flex-row gap-1">
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                <option value="">Select Type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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
            <div>
              <SubmitButton name="Create banar" type="Loading" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBanar;
