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
      query: `*[_type == "ctaSection" && _id == "ctaSection"][0] {
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
    }
  });

  // Extract data from batch response
  const heroData = data.heroData;
  const portfolioData = data.portfolioData;
  const aboutData = data.aboutData;
  const galleryData = data.galleryData;
  const ctaData = data.ctaData;

  // Debug logs
  console.log('Hero data:', {
    mediaType: heroData?.mediaType,
    videoUrl: heroData?.videoUrl,
    videoFile: heroData?.videoFile,
    hasVideoFile: !!heroData?.videoFile,
    videoFileUrl: heroData?.videoFile?.url
  });

  console.log('About data:', {
    mediaType: aboutData?.mediaType,
    videoUrl: aboutData?.videoUrl,
    videoFile: aboutData?.videoFile,
    hasVideoFile: !!aboutData?.videoFile,
    videoFileUrl: aboutData?.videoFile?.url
  });

  console.log('Portfolio data:', {
    mediaType: portfolioData?.mediaType,
    videoUrl: portfolioData?.videoUrl,
    videoFile: portfolioData?.videoFile,
    hasVideoFile: !!portfolioData?.videoFile,
    videoFileUrl: portfolioData?.videoFile?.url
  });

  console.log('CTA data:', {
    mediaType: ctaData?.mediaType,
    videoUrl: ctaData?.videoUrl,
    videoFile: ctaData?.videoFile,
    hasVideoFile: !!ctaData?.videoFile,
    videoFileUrl: ctaData?.videoFile?.url
  });

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
