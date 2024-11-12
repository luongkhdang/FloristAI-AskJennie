'use client'

import { useSession } from "next-auth/react"; 
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { FlowerDescription } from "./FlowerDescription";

export default function ClientComponent() {
  const { data: session, status } = useSession(); 
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(true);

  // Don't render the content until the session is loaded
  if (status === "loading") {
    return <p>Loading...</p>; // Optionally, add a loading indicator here
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setResult(null); // Reset result when a new image is selected
      setShowDescription(true);
    }
  }

  async function handleIdentify() {
    if (!selectedImage) return;

    setIsIdentifying(true);
    setShowDescription(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.url) {
        const response = await fetch("/api/identify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: uploadData.url }),
        });

        const data = await response.json();
        const identifiedFlower = data?.result || "Unknown";

        setResult(identifiedFlower);
      } else {
        setResult("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error identifying flower:", error);
      setResult("Failed to identify the flower.");
    } finally {
      setIsIdentifying(false);
    }
  }

  return (
    <main className="absolute top-20  flex flex-col items-center justify-center text-center p-4 space-y-8 bg-white bg-opacity-70 rounded-md w-[60%] max-w-md">
      {/* Title Section */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-green-800">Ask Jennie</h1>
        <h1 className="text-4xl font-extrabold text-green-800">the Florist</h1>
      </section>

      {/* Conditionally Render Description */}
      {showDescription && (
        <section>
          <p className="text-lg text-green-700">
            Flowers Identifier - Use AI to identify flower species. Great for retail florists, botanical gardens, landscapers, and more.
          </p>
        </section>
      )}

      {/* Conditionally render the input if user is logged in */}
      {status === "authenticated" ? ( // Only show if the user is authenticated
        <div className="w-full space-y-4">
          {/* File Input */}
          <label htmlFor="file-upload" className="block text-center text-purple-800 font-bold text-lg">
            🌸 Choose a flower image! 🌸
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border-2 border-purple-400 rounded-lg w-full text-center text-purple-700 font-semibold
                       bg-gradient-to-r from-pink-200 via-purple-100 to-yellow-200
                       hover:bg-gradient-to-l hover:from-yellow-200 hover:via-purple-100 hover:to-pink-200
                       transition-all duration-300 transform hover:scale-105 cursor-pointer"
          />
 
          {previewUrl && (
            <div className="mt-4 flex justify-center">
              <Image
                src={previewUrl}
                alt="Preview"
                width={420}
                height={420}
                className="rounded-lg shadow-lg object-cover transition-all duration-500 transform hover:scale-110 hover:shadow-xl"
                unoptimized
              />
            </div>
          )}

          {/* Identify Button */}
          <Button
            onClick={handleIdentify}
            disabled={isIdentifying || !selectedImage}
            className="w-full bg-gradient-to-r from-green-300 to-blue-400 hover:from-green-400 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-full
                       flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-1 hover:shadow-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🌻 {isIdentifying ? "Identifying..." : "Let’s See the Bloom!"} 🌻
          </Button>
        </div>
      ) : (
        <p className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-900 font-semibold text-lg text-center shadow-lg animate-bounce hover:animate-none transition-all duration-900 ease-in-out transform hover:scale-105 hover:bg-yellow-200 hover:shadow-xl">
          <span className="animate-pulse inline-block">🌸🌻</span> Oopsie Daisy! <span className="animate-spin-slow inline-block">🌻🌸</span> <br />
          Please log in to upload and identify flowers. <span className="animate-wave inline-block">🌼</span> <br />
          We promise not to leaf you hanging! <span className="animate-bounce inline-block">🍃🌹</span>
        </p>
      )}

      {/* Display Result and Description */}
      {result && <FlowerDescription flowerName={result} />}
    </main>
  );
}
