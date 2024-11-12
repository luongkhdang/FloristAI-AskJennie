"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";

export default function FlowerIdentifier() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setResult(null); // Reset result

    // Upload the image to get a URL (using a storage service like Cloudinary or similar)
    const imageUrl = await uploadImageToStorage(file);
    if (!imageUrl) {
      setLoading(false);
      alert("Image upload failed.");
      return;
    }

    // Call the Next.js API route
    try {
      const response = await fetch("/api/identifyFlower", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      setResult(data); // Set result from API response
    } catch (error) {
      console.error("Error identifying flower:", error);
      alert("Failed to identify flower.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToStorage = async (file: File) => {
    // Upload logic here, return the URL after upload
    return "https://your-storage-service.com/uploaded-image-url.jpg";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ImageUpload onImageUpload={handleImageUpload} />
      {loading ? <p>Loading...</p> : result && <p>Result: {result}</p>}
    </div>
  );
}
