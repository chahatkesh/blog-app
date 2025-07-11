"use client";
import { assets, blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await axios.get("/api/blog", {
        params: { id: params.id },
      });
      setData(response.data);
    };
    
    fetchBlogData();
  }, [params.id]);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-[150px]"
            />
          </Link>
          <Link href="/admin/addProduct">
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:px-6 sm:py-3 border border-solid border-black shadow-[-7px_7px_0px_#000] hover:bg-gray-100 transition-colors">
              Get Started <Image src={assets.arrow} alt="get started" />
            </button>
          </Link>
        </div>
        <div className="overflow-hidden text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.author_img}
            alt="Author Image"
            width={60}
            height={60}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          width={1280}
          height={720}
          src={data.image}
          alt=""
        />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}></div>
        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-2">
            <Image 
              src={assets.facebook_icon} 
              width={50} 
              alt="Share on Facebook"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                const url = window.location.href;
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
              }}
            />
            <Image 
              src={assets.twitter_icon} 
              width={50} 
              alt="Share on Twitter"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                const url = window.location.href;
                const text = `Check out this blog post: ${data.title}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
              }}
            />
            <Image 
              src={assets.googleplus_icon} 
              width={50} 
              alt="Share on LinkedIn"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                const url = window.location.href;
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedinUrl, '_blank', 'width=600,height=400');
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
