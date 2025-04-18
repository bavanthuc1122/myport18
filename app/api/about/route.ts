import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    // Truy vấn dữ liệu từ Sanity với các trường ảnh đầy đủ
    const aboutData = await client.fetch(`*[_type == "aboutSection"][0] {
      ...,
      "profileImageUrl": profileImage.asset->url,
      "backgroundImageUrl": backgroundImage.asset->url,
      "galleryImagesUrls": galleryImages[].asset->url
    }`);

    // Trả về dữ liệu dưới dạng JSON
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}
