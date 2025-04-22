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
      query: `*[_type == "heroSection" && _id == "heroSection"][0] {
        ...,
        mediaType,
        backgroundImage {
          asset->{
            _id,
            url,
            metadata
          }
        },
        videoUrl,
        "videoFile": videoFile.asset->{
          url,
          mimeType,
          _id
        },
        backgroundColor
      }`
    },
    portfolioData: {
      query: `*[_type == "portfolioPreview" && _id == "portfolioPreview"][0] {
        ...,
        mediaType,
        backgroundImage {
          asset->{
            _id,
            url,
            metadata
          }
        },
        videoUrl,
        "videoFile": videoFile.asset->{
          url,
          mimeType,
          _id
        },
        backgroundColor,
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
        backgroundImage {
          asset->{
            _id,
            url,
            metadata
          }
        },
        videoUrl,
        "videoFile": videoFile.asset->{
          url,
          mimeType,
          _id
        },
        backgroundColor,
        profileImage {
          asset->{
            _id,
            url,
            metadata
          }
        },
        skills,
        skillsTitle
      }`
    },
    // galleryData query removed
    ctaData: {
      query: `*[_type == "ctaSection" && _id == "ctaSection"][0] {
        ...,
        videoUrl,
        "videoFile": videoFile.asset->{
          url,
          mimeType,
          _id
        }
      }`
    }
  });

  // Extract data from batch response
  const heroData = data.heroData;
  const portfolioData = data.portfolioData;
  const aboutData = data.aboutData;
  const ctaData = data.ctaData;

  // Gallery section has been removed

  // Debug video data - chi tiết hơn
  console.log('About Video Data:', JSON.stringify({
    mediaType: aboutData?.mediaType,
    videoUrl: aboutData?.videoUrl,
    videoFile: aboutData?.videoFile,
    hasVideoFileAsset: !!aboutData?.videoFile,
    videoFileAssetUrl: aboutData?.videoFile?.url,
    videoFileRaw: JSON.stringify(aboutData?.videoFile)
  }, null, 2));

  console.log('CTA Video Data:', JSON.stringify({
    mediaType: ctaData?.mediaType,
    videoUrl: ctaData?.videoUrl,
    videoFile: ctaData?.videoFile,
    hasVideoFileAsset: !!ctaData?.videoFile,
    videoFileAssetUrl: ctaData?.videoFile?.url,
    videoFileRaw: JSON.stringify(ctaData?.videoFile)
  }, null, 2));

  console.log('Portfolio Video Data:', JSON.stringify({
    mediaType: portfolioData?.mediaType,
    videoUrl: portfolioData?.videoUrl,
    videoFile: portfolioData?.videoFile,
    hasVideoFileAsset: !!portfolioData?.videoFile,
    videoFileAssetUrl: portfolioData?.videoFile?.url,
    videoFileRaw: JSON.stringify(portfolioData?.videoFile)
  }, null, 2));

  console.log('Hero Video Data:', JSON.stringify({
    mediaType: heroData?.mediaType,
    videoUrl: heroData?.videoUrl,
    videoFile: heroData?.videoFile,
    hasVideoFileAsset: !!heroData?.videoFile,
    videoFileAssetUrl: heroData?.videoFile?.url,
    videoFileRaw: JSON.stringify(heroData?.videoFile)
  }, null, 2));

  return (
    <Suspense fallback={<Loading />}>
      <HomePage
        heroData={heroData}
        portfolioData={portfolioData}
        aboutData={aboutData}
        ctaData={ctaData}
      />
    </Suspense>
  )
}
