// app/api/identify/route.ts

import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;


export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 }
      );
    }

    // Get access token with the exact format specified in the documentation
    const tokenResponse = await fetch('https://www.nyckel.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });
    

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token error response:', errorText);
      return NextResponse.json(
        { message: "Failed to get access token", error: errorText },
        { status: 500 }
      );
    }

    const { access_token } = await tokenResponse.json();



    const library = "flowers-identifier"
    // Call the flower identification API
    const identifyResponse = await fetch(
      `https://www.nyckel.com/v1/functions/${library}/invoke`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ data: imageUrl })
      }
    );

    if (!identifyResponse.ok) {
      const error = await identifyResponse.text();
      console.error('Identification error:', error);
      return NextResponse.json(
        { message: "Failed to identify flower", error },
        { status: identifyResponse.status }
      );
    }

    const result = await identifyResponse.json();
    console.log('Identification result:', result);  // Add this for debugging

    return NextResponse.json({
      result: result.labelName || "Unknown flower",
      confidence: result.confidence
    });

  } catch (error) {
    console.error("Error in identify route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}