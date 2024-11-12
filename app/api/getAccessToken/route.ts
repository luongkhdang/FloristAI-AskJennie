// app/api/getAccessToken/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.NYCKEL_CLIENT_ID!,
      client_secret: process.env.NYCKEL_CLIENT_SECRET!
    });

    const response = await fetch('https://www.nyckel.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Token fetch error:', error);
      return NextResponse.json(
        { message: 'Failed to fetch access token' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Token fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}