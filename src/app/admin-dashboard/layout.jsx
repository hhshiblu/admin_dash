"use client";

import { useState } from "react";

import { usePathname, useRouter, redirect } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

// const inter = Inter({ subsets: ['latin'] })

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
  {
    id: 6,
    icon: "zp zp-private-connectivity",
    label: "Access Permission",
    link: "../../access-permission",
  },
];

function RootLayout({ children }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileNavClick, setMobileNavClick] = useState(false);

  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubArrow, setActiveSubArrow] = useState(false);

  const toggleSubMenu = (id) => {
    if (activeSubMenu === id) {
      setActiveSubArrow(false);
      setActiveSubMenu(null);
    } else {
      if (!activeSubArrow) {
        setActiveSubMenu(id);
      }
      if (id === 3) {
        setActiveSubArrow(true);
      }
      if (mobileNavClick && mobileNav) {
        if (id !== 3) {
          setMobileNav(false);
        }
      }
    }
  };

  const clickSubMenu = (id) => {
    if (mobileNavClick && mobileNav) {
      setMobileNav(false);
    }
  };

  const NavigationMenu = () => {
    setMobileNavClick(true);
    setMobileNav(!mobileNav);
    if (mobileNav) {
    } else {
    }
  };

  const ProfileMenu = () => {
    if (notificationMenu) {
      setNotificationMenu(false);
    }
    setProfileMenu(!profileMenu);
  };

  const NotificationDropdown = () => {
    if (profileMenu) {
      setProfileMenu(false);
    }
    setNotificationMenu(!notificationMenu);
  };

  return (
    <html lang="en">
      <body>
        <>
          <header className="bg-[#00453e] flex  justify-around items-center w-full text-neutral-950 shadow-lg border border-gray-300	">
            <h2
              onClick={() => NavigationMenu()}
              className="zp zp-arrow-back text-2xl px-4 block md:hidden cursor-pointer"
            >
              toggle
            </h2>
            <h2 onClick={ProfileMenu}>Rajdhola</h2>

            <div className="ml-auto	">
              <ul className="flex items-center">
                <>
                  <li>
                    <div className="cursor-pointer mr-2 flex h-9 w-9 rounded-full bg-gray-300 items-center relative">
                      <div className="bg-gray-300 text-xl mx-auto">h</div>
                    </div>
                  </li>
                  <li>
                    <div className="w-9 h-9 mx-4 rounded-full my-3.5 bg-gray-300">
                      j
                    </div>
                  </li>
                </>

                <>
                  <li>
                    <div
                      className="cursor-pointer mr-2 flex h-9 w-9 rounded-full bg-gray-300 items-center relative"
                      onClick={NotificationDropdown}
                    >
                      <i className="zp zp-notifications text-xl mx-auto"></i>

                      <span className="h-5 w-5 bg-red-500 rounded-full top-[-3px] right-[-3px] absolute flex items-center justify-center text-gray-100">
                        2
                      </span>
                    </div>
                  </li>
                </>
              </ul>
            </div>
          </header>
          <div
            className="absolute right-4 bg-white pt-4 z-50 shadow-lg w-72 rounded-b"
            style={{ display: profileMenu ? "block" : "none" }}
          >
            <div className="flex">
              <div className="border-b pb-3 px-5 w-full">
                <h2 className="font-bold">hello</h2>
                <span>@username</span>
              </div>
            </div>
            <ul className="">
              <li>
                <Link
                  href="../../account-settings"
                  className="px-5 py-3 block hover:bg-slate-300 rounded"
                >
                  <i className="zp zp-manage-accounts mr-3"></i>Account Settings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="px-5 py-3 block hover:bg-slate-300 rounded"
                >
                  <i className="zp zp-logout mr-3"></i>Sign Out
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="absolute right-4 bg-white pt-4 z-50 shadow-lg w-full max-w-sm rounded-b"
            style={{ display: notificationMenu ? "block" : "none" }}
          >
            <div className="flex h-56 items-center">
              <i className="zp zp-notifications mx-auto h-28 w-28 rounded-full text-center flex items-center justify-center text-4xl bg-slate-200 text-slate-500 right-20"></i>
            </div>
          </div>
          <nav
            className="w-72 bg-[#205e56]  fixed h-full shadow-lg   duration-700 ml-[-315px] md:ml-0 z-50"
            style={{
              marginLeft: mobileNavClick ? (mobileNav ? "0" : "-315px") : "",
            }}
          >
            <ul>
              {mainMenu.map((item) => (
                <li key={item.id} className="hover:bg-gray-300  my-2">
                  <Link
                    className="px-4	py-2.5 flex text-sm	font-semibold items-center text-white"
                    href={item.link || "#"}
                    onClick={() => toggleSubMenu(item.id)}
                  >
                    <span>{item.label}</span>
                    {item.label == "Payments" ? (
                      <i
                        className={
                          activeSubArrow
                            ? "zp zp-expand-less ml-auto font-bold text-sm"
                            : "zp zp-expand-more ml-auto font-bold text-sm"
                        }
                      ></i>
                    ) : (
                      ""
                    )}
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
          </nav>
        </>
        <div
          className={`${
            mobileNavClick
              ? mobileNavClick
                ? "w-full"
                : "w-[calc(100%-288px)] ml-auto"
              : "w-[calc(100%-288px)] ml-auto"
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
