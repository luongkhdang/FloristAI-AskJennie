// pages/api/identify.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function identifyFlower(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch access token from your custom API route
    const tokenResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/getAccessToken`);
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      res.status(400).json({ message: "Access token not available" });
      return;
    }

    // Use the access token to call the flower identification API
    const { imageUrl } = req.body;
    const response = await fetch("https://www.nyckel.com/v1/functions/flowers-identifier/invoke", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: imageUrl }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Send the identification result back
    } else {
      res.status(response.status).json({ message: "Failed to identify flower", error: data });
    }
  } catch (error) {
    console.error("Error identifying flower:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
