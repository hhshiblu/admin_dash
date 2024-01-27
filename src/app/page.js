"use client";

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const hendelSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin-dashboard",
    });
  };
  return (
    <main>
      <div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className=" sm:mx-auto sm:w-full sm:max-w-md ">
            <Image
              src="/rd_logo.svg"
              alt="rajdhola logo"
              width={100}
              height={100}
              className="w-[150px] ml-32 pb-2"
            />
            <hr />
            <hr />

            <h2 className="pt-2 text-center text-3xl font-extrabold text-gray-900">
              Login to for admin account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-lg shadow-[#00453e] sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={hendelSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="curent-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className=" absolute right-3 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className=" absolute right-3 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
                <div className={`flex items-center justify-between `}>
                  <div className={`flex items-center `}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block
                 text-gray-900"
                    >
                      {" "}
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="forgot-password"
                      className="font-medium text-blue-500 hover:text-blue-600"
                    >
                      Forgot password
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className=" group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm bg-blue-600 hover:bg-blue-800 "
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
