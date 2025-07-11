import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import cloudinary from "@/lib/config/cloudinary";
const { NextResponse } = require("next/server")
const fs = require('fs')

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


//API Endpoint to get all Blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    }
    else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ 
      success: false, 
      msg: "Error fetching blogs",
      error: error.message 
    }, { status: 500 })
  }
}

//API Endpoint for uploading Blogs
export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get('image');
    
    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'blog-images',
      resource_type: 'auto',
    });

    const blogData = {
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      category: `${formData.get('category')}`,
      author: `${formData.get('author')}`,
      image: uploadResult.secure_url,
      author_img: `${formData.get('author_img')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog Saved")

    return NextResponse.json({ success: true, msg: "Blog Added" })
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ 
      success: false, 
      msg: "Error adding blog",
      error: error.message 
    }, { status: 500 })
  }
}

//API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    // Extract public_id from Cloudinary URL to delete the image
    if (blog.image && blog.image.includes('cloudinary.com')) {
      const urlParts = blog.image.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = `blog-images/${publicIdWithExtension.split('.')[0]}`;
      
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(publicId);
    }
    
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" })
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ 
      msg: "Error deleting blog",
      error: error.message 
    }, { status: 500 })
  }
}