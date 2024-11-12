import { NextRequest, NextResponse } from "next/server";
import * as cloudinary from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


type CloudinaryUploadResult = {
  secure_url: string;
  public_id?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  // Add other known properties you expect from Cloudinary’s response
};


export async function POST(req: NextRequest) {
  try {
    console.log("Incoming POST request to /api/upload");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    console.log("File received:", file);

    // Convert the file to a Buffer
    if (!(file instanceof File)) {
      console.error("Uploaded file is not a valid File instance");
      return NextResponse.json({ message: "Invalid file format" }, { status: 400 });
    }
    
    const buffer = await file.arrayBuffer();

    // Create a promise-based upload function
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto", folder: "flowers" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
            return;
          }
          console.log("Cloudinary upload successful, image URL:", result?.secure_url);
          resolve(result);
        }
      );

      // Write the buffer to the upload stream
      uploadStream.write(Buffer.from(buffer));
      uploadStream.end();
    });

    // Wait for the upload to complete
    const result = await uploadPromise as CloudinaryUploadResult;
    
    // Return the response with the image URL
    return NextResponse.json({ 
      url: result.secure_url,
      message: "Upload successful" 
    });

  } catch (error) {
    console.error("Error in upload API:", error);
    return NextResponse.json(
      { 
        message: "Error uploading image to Cloudinary", 
        error: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}