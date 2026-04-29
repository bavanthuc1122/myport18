import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    // Truy vấn dữ liệu từ Sanity
    const portfolioData = await client.fetch(`*[_type == "portfolioPreview"][0]`);
    
    // Trả về dữ liệu dưới dạng JSON
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error fetching portfolio preview data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio preview data' },
      { status: 500 }
    );
  }
}
