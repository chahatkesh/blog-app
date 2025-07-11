"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
        <Image src={assets.logo_light} alt="" width={120} />
        <p className="text-sm text-white ">
          All right reserved. Copyright @blogger
        </p>
        <div className="flex gap-1">
          <Image 
            src={assets.facebook_icon} 
            alt="Visit our Facebook page" 
            width={40}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.open('https://www.facebook.com', '_blank');
            }}
          />
          <Image 
            src={assets.twitter_icon} 
            alt="Follow us on Twitter" 
            width={40}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.open('https://www.twitter.com', '_blank');
            }}
          />
          <Image 
            src={assets.googleplus_icon} 
            alt="Connect with us on LinkedIn" 
            width={40}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.open('https://www.linkedin.com', '_blank');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
