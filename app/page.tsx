import { Suspense } from 'react';
import HomePage from './HomePage';
import Loading from './loading';

export const revalidate = 10; // Revalidate every 10 seconds

export default async function Home() {
  // Fetch data using batch request to reduce API calls
  const { batchFetchSanityData } = await import('@/lib/sanity');

  // Batch fetch data - using singleton documents
  const data = await batchFetchSanityData({
    heroData: {
      query: `*[_type == "heroSection" && _id == "heroSection"][0]`
    },
    portfolioData: {
      query: `*[_type == "portfolioPreview" && _id == "portfolioPreview"][0] {
        ...,
        "previewImagesWithAssets": previewImages[] {
          ...,
          "imageAsset": image.asset->
        }
      }`
    },
    aboutData: {
      query: `*[_type == "aboutSection" && _id == "aboutSection"][0] {
        ...,
        title,
        description,
        mediaType,
        backgroundImage,
        videoUrl,
        backgroundColor,
        profileImage,
        skills,
        skillsTitle
      }`
    },
    galleryData: {
      query: `*[_type == "galleryHighlights" && _id == "galleryHighlights"][0] {
        ...,
        galleryImages[] {
          ...,
          image {
            asset-> {
              _id,
              url
            }
          },
          alt,
          title,
          description,
          link,
          rowSpan
        }
      }`
    },
    ctaData: {
      query: `*[_type == "ctaSection" && _id == "ctaSection"][0]`
    }
  });

  // Extract data from batch response
  const heroData = data.heroData;
  const portfolioData = data.portfolioData;
  const aboutData = data.aboutData;
  const galleryData = data.galleryData;
  const ctaData = data.ctaData;

  // Debug: Log gallery data
  console.log('Gallery Data:', galleryData);
  console.log('Gallery Images:', galleryData?.galleryImages);

  return (
    <Suspense fallback={<Loading />}>
      <HomePage
        heroData={heroData}
        portfolioData={portfolioData}
        aboutData={aboutData}
        galleryData={galleryData}
        ctaData={ctaData}
      />
    </Suspense>
  )
}
