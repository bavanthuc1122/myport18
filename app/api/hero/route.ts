import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    // Truy vấn dữ liệu từ Sanity
    const heroData = await client.fetch(`*[_type == "heroSection"][0]`);
    
    // Trả về dữ liệu dưới dạng JSON
    return NextResponse.json(heroData);
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}
