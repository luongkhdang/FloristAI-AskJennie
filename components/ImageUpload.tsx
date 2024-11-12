"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ImageUpload({ onImageUpload }: { onImageUpload: (file: File) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onImageUpload(file); // Trigger callback to upload image
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-gray-700"
      />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
}
