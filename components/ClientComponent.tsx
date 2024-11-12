"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";

export default function ClientComponent() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isIdentifying, setIsIdentifying] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);

    // Handle AI identification API call
    async function handleIdentify() {
        if (!imageUrl) return;
        setIsIdentifying(true);
        try {
            const response = await fetch('/api/identify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });
            const data = await response.json();
            setResult(data?.result || "No identification result available.");
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
            
            {/* Description */}
            <section>
                <p className="text-lg text-green-700">
                    Flowers Identifier - Use AI to identify flower species. Great for retail florists, botanical gardens, landscapers, and more.
                </p>
            </section>

 

            {/* Image URL Input */}
            <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="p-2 border rounded-md w-full mt-4"
            />

            {/* Identify Button */}
            <Button
                onClick={handleIdentify}
                disabled={isIdentifying || !imageUrl}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md mt-2"
            >
                {isIdentifying ? "Identifying..." : "Identify Flower"}
            </Button>

            {/* Display Result */}
            {result && (
                <p className="text-green-800 font-semibold mt-4">
                    {result}
                </p>
            )}
        </main>
    );
}
