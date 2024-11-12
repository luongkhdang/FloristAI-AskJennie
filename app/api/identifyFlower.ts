// pages/api/identifyFlower.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function identifyFlower(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { imageUrl } = req.body;

  try {
    const response = await fetch("https://www.nyckel.com/v1/functions/flowers-identifier/invoke", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLIENT_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: imageUrl }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error identifying flower:", error);
    res.status(500).json({ message: "Failed to identify flower" });
  }
}
