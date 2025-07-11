import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <div className="py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              className="w-[130px] sm:w-[150px] cursor-pointer"
              src={assets.logo}
              width={180}
              alt="Logo"
            />
          </Link>
          <Link href="/admin/addProduct">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:px-6 sm:py-3 border border-solid border-black shadow-[-7px_7px_0px_#000] hover:bg-gray-100 transition-colors">
              Get Started <Image src={assets.arrow} alt="get started" />
            </button>
          </Link>
        </div>
        <div className="text-center my-8">
          <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
          <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia,
            sed incidunt et recusandae tempora illum nesciunt molestias illo
            amet, alias laborum.
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]"
            action="">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="pl-4 outline-none"
              type="email"
              placeholder="Enter your email"
            />
            <button className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
