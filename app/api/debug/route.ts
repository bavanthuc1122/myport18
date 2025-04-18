import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    // Truy vấn tất cả các document từ Sanity
    const allDocuments = await client.fetch(`{
      "aboutSection": *[_type == "aboutSection"][0] {
        ...,
        "profileImageUrl": profileImage.asset->url,
        "backgroundImageUrl": backgroundImage.asset->url,
        "galleryImagesUrls": galleryImages[].asset->url
      },
      "heroSection": *[_type == "heroSection"][0] {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url
      },
      "portfolioPreview": *[_type == "portfolioPreview"][0] {
        ...,
        "backgroundImageUrl": backgroundImage.asset->url,
        "previewImagesUrls": previewImages[]{..., "imageUrl": image.asset->url}
      },
      "contactInfo": *[_type == "contactInfo"][0] {
        ...,
        "contactImageUrl": contactImage.asset->url
      },
      "btsSections": *[_type == "btsSection"] | order(orderRank) {
        ...,
        "mainImageUrl": mainImage.asset->url,
        "imagesUrls": images[]{..., "imageUrl": image.asset->url}
      },
      "categories": *[_type == "category"],
      "portfolioItems": *[_type == "portfolioItem"] {
        ...,
        "coverImageUrl": coverImage.asset->url
      }
    }`);

    // Trả về dữ liệu dưới dạng JSON
    return NextResponse.json(allDocuments);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
