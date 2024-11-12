// pages/api/getAccessToken.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Make the request to get the access token
    const response = await fetch("https://www.nyckel.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NYCKEL_CLIENT_ID!, // Use environment variables for security
        client_secret: process.env.NYCKEL_CLIENT_SECRET!,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Send the access token back to the client
    } else {
      res.status(response.status).json({ message: "Failed to get access token", error: data });
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
