"use client";
import Link from "next/link";
import { useState } from "react";
import { FiAlignLeft } from "react-icons/fi";

const mainMenu = [
  {
    id: 1,
    icon: "zp zp-home",
    label: "DashBoard",
    link: "/admin-dashboard",
  },
  {
    id: 2,
    icon: "zp zp-info",
    label: "Banar",
    link: "/admin-dashboard/banar",
  },
  {
    id: 90,
    icon: "zp zp-info",
    label: "User",
    link: "/admin-dashboard/all_users",
  },
  {
    id: 90,
    icon: "zp zp-info",
    label: "Seller",
    link: "/admin-dashboard/all_sellers",
  },
  {
    id: 3,
    icon: "zp zp-credit-card",
    label: "Order",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "All orders",
        link: "/admin-dashboard/all-orders",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Refund Orders",
        link: "/admin-dashboard/refunds-order",
      },
    ],
  },
  {
    id: 4,
    icon: "zp zp-credit-card",
    label: "Products",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "All Product",
        link: "/admin-dashboard/all-products",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Create Product",
        link: "/admin-dashboard/create-product",
      },
    ],
  },
  {
    id: 5,
    icon: "zp zp-credit-card",
    label: "Category",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "All Category",
        link: "/admin-dashboard/category",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Create Category",
        link: "/admin-dashboard/create-category",
      },
    ],
  },
];

export default function Home() {
  const [mobileNavClick, setMobileNavClick] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (id) => {
    if (activeSubMenu === id) {
      // setActiveSubArrow(false);
      setActiveSubMenu(null);
    }
    // else {
    //   if (!activeSubArrow) {
    //     setActiveSubMenu(id);
    //   }
    //   if (id === 3) {
    //     // setActiveSubArrow(true);
    //   }
    //   if (mobileNavClick && mobileNav) {
    //     if (id !== 3) {
    //       setMobileNav(false);
    //     }
    //   }
    // }
  };
  return (
    <main>
      <div>
        <div className="h-[8vh] bg-[#05595B] w-full ">
          <div className="flex justify-between items-center h-full my-auto mx-10">
            <div className="flex gap-6 items-center ">
              <FiAlignLeft
                size={25}
                color="white"
                className=" cursor-pointer"
                onClick={() => setMobileNavClick(!mobileNavClick)}
              />

              <h2 className="text-white ">Raj-Dhola</h2>
            </div>
            <div className="flex flex-row gap-4">
              <FiAlignLeft size={25} color="white" />
              <FiAlignLeft size={25} color="white" />
              <FiAlignLeft size={25} color="white" />
            </div>
          </div>
        </div>
        <div
          className="h-[92vh] w-[250px] bg-red-400  duration-700"
          style={{
            width: mobileNavClick ? "75px" : "225px",
          }}
        >
          <ul>
            {mainMenu.map((item) => (
              <li key={item.id} className="hover:bg-gray-300  ">
                <Link
                  className="px-4	py-2.5 flex text-sm	font-semibold items-center text-white"
                  href={item.link || "#"}
                  onClick={() => toggleSubMenu(item.id)}
                >
                  {!mobileNavClick ? <span>{item.label}</span> : null}
                </Link>
                {item.subMenuItems && activeSubMenu === item.id && (
                  <ul>
                    {item.subMenuItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          className="mx-2.5 text-sm	font-medium py-2.5 block text-slate-600"
                          href={subItem.link || "#"}
                          onClick={() => clickSubMenu(item.id)}
                        >
                          <i className={subItem.icon + " pl-1.5 pr-3"}></i>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
