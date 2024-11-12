import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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
    const result = await uploadPromise;
    
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
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}