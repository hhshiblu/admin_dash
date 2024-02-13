"use client";

import React, { useEffect, useState } from "react";
import { AiFillPlusSquare, AiTwotoneEdit } from "react-icons/ai";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { RiDeleteBin2Fill, RiDeleteBinLine } from "react-icons/ri";
import AddBanar from "./addbanar";
import Image from "next/image";
import { toast } from "sonner";
import { deleteBanners, updateBannerRoles } from "@/serverAction/home";

function BanarInfo({ banars }) {
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedBanars, setSelectedBanars] = useState([]);

  const deleteBanarHandler = async () => {
    try {
      for (const bannerId of selectedBanars) {
        const res = await deleteBanners(bannerId);
        if (res.success == true) {
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "Cancel",
            },
          });
        }
      }
    } catch (error) {
      toast.error(error, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };

  const handleBanarCheck = (bannerId) => {
    const newSelectedBanars = [...selectedBanars];

    if (newSelectedBanars.includes(bannerId)) {
      const index = newSelectedBanars.indexOf(bannerId);
      if (index !== -1) {
        newSelectedBanars.splice(index, 1);
      }
    } else {
      newSelectedBanars.push(bannerId);
    }

    setSelectedBanars(newSelectedBanars);
  };

  const updateBannerRole = async () => {
    try {
      for (const bannerId of selectedBanars) {
        const res = await updateBannerRoles(bannerId);
        if (res.success == true) {
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "Cancel",
            },
          });
        }
      }
      selectedBanars.length = 0;
    } catch (error) {
      toast.error(error, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };
  return (
    <div className=" w-full px-2 mt-4 overflow-y-scroll overflow-hidden h-[88vh]">
      <div className="flex  justify-around  pb-2">
        <h1 className="text-sm 800px:text-lg font-bold ">all banar</h1>

        <div className="flex gap-2 items-center">
          {selectedBanars.length > 0 && (
            <div className="flex gap-4 items-center ">
              <AiTwotoneEdit
                size={25}
                onClick={updateBannerRole}
                className="cursor-pointer"
              />
              <RiDeleteBin2Fill
                className="text-red-800 cursor-pointer"
                size={22}
                onClick={() => {
                  setConfirm(true);
                }}
              />
            </div>
          )}
          <AiFillPlusSquare
            size={25}
            className="rounded-lg text-green-700 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <hr /> <hr /> <hr />
      <h1 className=" font-semibold pt-4">Active banners</h1>
      <div className=" m-auto w-[80%] 800px:w-[95%] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[15px] xl:grid-cols-4 xl:gap-[15px] p-6">
        {banars &&
          banars
            .filter((item) => item.role === 1)
            .map((item, index) => {
              return (
                <div className="  w-full flex relative" key={index}>
                  <div className="px-2 pr-4  flex flex-col justify-center gap-6  absolute top-4 left-2">
                    <input
                      type="checkbox"
                      name="cheak"
                      id="cheak"
                      className="h-6 w-6 text-red-600 focus:ring-red-900 border-red-600   rounded-lg cursor-pointer"
                      checked={selectedBanars.includes(item._id)}
                      onChange={() => handleBanarCheck(item._id, item.role)}
                    />
                  </div>

                  <Image
                    src={item?.image?.url}
                    alt={item.url}
                    width={500}
                    height={500}
                    className="!w-full  h-[22vh] rounded-2xl border-gray-700 border-[2px]"
                  />
                </div>
              );
            })}
      </div>
      <hr /> <hr /> <hr /> <hr />
      <h1 className=" font-semibold pt-4">InActive banners</h1>
      <div className=" m-auto w-[80%] 800px:w-[95%] grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[15px] xl:grid-cols-4 xl:gap-[15px] p-6">
        {banars &&
          banars
            .filter((item) => item.role === 0)
            .map((item, index) => {
              return (
                <div className="  w-full flex relative" key={index}>
                  <div className="px-2 pr-4  flex flex-col justify-center gap-6  absolute top-4 left-2">
                    <input
                      type="checkbox"
                      name="cheak"
                      id="cheak"
                      className="h-6 w-6 text-red-600 focus:ring-red-900 border-red-600   rounded-lg cursor-pointer"
                      checked={selectedBanars.includes(item._id)}
                      onChange={() => handleBanarCheck(item._id, item.role)}
                    />
                  </div>

                  <Image
                    src={item?.image?.url}
                    alt={item.url}
                    width={500}
                    height={500}
                    className="!w-full  h-[22vh] rounded-2xl border-gray-700 border-[2px]"
                  />
                </div>
              );
            })}
      </div>
      <hr />
      {confirm && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[90%] 800px:w-[40%]  bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setConfirm(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Are you sure you wanna delete this this banar?
            </h3>

            <div className="w-full flex items-center justify-center">
              <div
                className={`  text-[18px] !h-[42px] mr-4 cursor-pointer bg-[#00453e] px-1 py-1 rounded-md`}
                onClick={() => setConfirm(false)}
              >
                cancel
              </div>
              <div
                className={`text-[18px] !h-[42px] ml-4 cursor-pointer bg-[#00453e] px-1 py-1 rounded-md`}
                onClick={() => setConfirm(false) || deleteBanarHandler()}
              >
                confirm
              </div>
            </div>
          </div>
        </div>
      )}
      {open && <AddBanar setOpen={setOpen} />}
    </div>
  );
}

export default BanarInfo;
