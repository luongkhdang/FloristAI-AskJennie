import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    const response = await fetch('https://www.nyckel.com/v1/functions/flowers-identifier/invoke', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NYCKEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: imageUrl }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to identify flower' }, { status: 500 });
  }
}
