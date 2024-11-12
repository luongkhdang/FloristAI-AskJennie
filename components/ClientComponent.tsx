"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function ClientComponent() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(true);
  const [description, setDescription] = useState<string | null>(null);

  // Flower description mapping
  const flowerDescriptions: { [key: string]: string } = {

    "Bromelia": "DESCRIPTION",
    "Mallow": "DESCRIPTION",
    "Purplecone flower": "DESCRIPTION",
    "Hard Leaved pocket orchid": "DESCRIPTION",
    "Gaura": "DESCRIPTION",
    "Thornapple": "DESCRIPTION", 
    "Pelargonium": "DESCRIPTION",
    "Mexican aster": "DESCRIPTION",
    "Ballmoss": "DESCRIPTION",

    "Water lily": "Đẹp: 10/10. \nVietnamese: bông súng. \nHoa súng được trồng tạo cảnh quan cho sân vườn, tạo tiểu cảnh nước tĩnh, trồng trong các hồ cá nhân tạo hay được trồng trong các chậu để trang trí ngoại thất, giếng trời, quán cafe sân vườn…",
    "Bolero deep blue": "Đẹp: 9/10. \nVietnamese: hoa Bolero xanh đậm. \nHoa này thường được sử dụng để trang trí bàn tiệc và mang lại cảm giác sang trọng.",
    "Treemallow": "Đẹp: 8/10. \nVietnamese: cẩm cù. \nHoa cẩm cù thường được dùng làm cây cảnh leo, thích hợp trồng ở ban công hoặc ngoài trời.",
    "Globe thistle": "Đẹp: 7/10. \nVietnamese: hoa cúc gai. \nLoại hoa này phù hợp cho trang trí sân vườn với kiểu dáng độc đáo và bền vững.",
    "Carnation": "Đẹp: 9/10. \nVietnamese: hoa cẩm chướng. \nHoa cẩm chướng thường được dùng trong bó hoa cưới và cắm hoa trang trí nội thất.",
    "Spring crocus": "Đẹp: 9/10. \nVietnamese: hoa nghệ tây xuân. \nLoài hoa này thường nở vào mùa xuân và tượng trưng cho sự tái sinh và sức sống mới.",
    "Sunflower": "Đẹp: 10/10. \nVietnamese: hoa hướng dương. \nHoa hướng dương tượng trưng cho sự lạc quan và thường được trồng ở các trang trại hoa và vườn cảnh.",
    "Pink primrose": "Đẹp: 8/10. \nVietnamese: hoa anh thảo hồng. \nLoại hoa này thường được trồng làm cảnh quan do màu sắc nổi bật và dễ trồng.",
    "Azalea": "Đẹp: 9/10. \nVietnamese: hoa đỗ quyên. \nĐỗ quyên thường được trồng trong các khu vườn và sân vườn, đặc biệt vào mùa xuân.",
    "Common dandelion": "Đẹp: 6/10. \nVietnamese: bồ công anh. \nLoại hoa này mọc hoang và thường được trẻ em thổi bay để cầu nguyện.",
    "Oxeye daisy": `Đẹp: 7/10. \nVietnamese: cúc mắt bò. \nHoa cúc mắt bò phổ biến ở các khu vực đồng cỏ và thường được sử dụng để trang trí các cảnh quan tự nhiên do vẻ đẹp giản dị của nó.`,
    "Moonorchid": "Đẹp: 10/10.\nVietnamese: lan mặt trăng.\nLan mặt trăng là biểu tượng của sự quý phái và thường được trồng trong các khu vườn nhiệt đới hoặc sử dụng để trang trí nội thất nhờ vẻ đẹp thanh lịch và độc đáo.",
    // Add more flowers with similar descriptions here

  };

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [selectedImage]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
      setDescription(null); // Reset description when a new image is selected
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
        setImageUrl(uploadData.url);

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
        setDescription(flowerDescriptions[identifiedFlower] || "No description available."); // Set description based on the result
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
    <main className="absolute flex flex-col items-center justify-center text-center p-4 space-y-8 bg-white bg-opacity-70 rounded-md w-[60%] max-w-md">
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

      {/* Image Upload and Preview */}
      <div className="w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border rounded-md w-full"
        />
        {selectedImage && (
          <p className="text-gray-700 mt-2">{selectedImage.name}</p>
        )}
        {previewUrl && (
          <div className="mt-4 flex justify-center">
            <Image
              src={previewUrl}
              alt="Preview"
              width={result ? 42 : 420}
              height={result ? 42 : 420}
              className="rounded-lg shadow-md object-cover transition-all duration-500"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Identify Button */}
      <Button
        onClick={handleIdentify}
        disabled={isIdentifying || !selectedImage}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md"
      >
        {isIdentifying ? "Identifying..." : "Identify Flower"}
      </Button>

      {/* Display Result and Description */}
      {result && (
        <div className="mt-4 p-4 border-2 border-green-600 rounded-lg bg-green-50 shadow-md text-green-900 max-w-xs">
          <p className="font-bold text-lg mb-2">🌻🌞🌹 This must be: 🌻🌺🌹</p>
          <p className="text-base font-medium">{result}</p>
          <p className="mt-2 text-lg text-green-700 whitespace-pre-line">{description}</p>
        </div>
      )}

      {/* Display Uploaded Image URL (if needed) */}
      {imageUrl && !previewUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-xs" />
        </div>
      )}
    </main>
  );
}
