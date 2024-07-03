import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets, blog_data } from "@/Assets/assets";

const BlogItem = ({ title, description, image, category, id }) => {
  const newtitle = title.slice(0, 50);
  return (
    <>
      <div className="overflow-hidden max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000]">
        <Link href={`/blogs/${id}`}>
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            className="h-48 border-b border-black"
          />
        </Link>
        <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
          {category}
        </p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {newtitle}
          </h5>
          <p
            className="mb-3 text-sm tracking-tight text-gray-700"
            dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}></p>
          <Link
            href={`/blogs/${id}`}
            className="inline-flex items-center py-2 font-semibold text-center">
            Read More
            <Image className="ml-2" src={assets.arrow} alt="" width={12} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
