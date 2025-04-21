import { Suspense } from 'react';
import HomeWowPage from './HomeWowPage';
import Loading from '../loading';

export const revalidate = 10; // Revalidate every 10 seconds

export default async function HomeWow() {
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
      query: `*[_type == "aboutSection" && _id == "aboutSection"][0]`
    }
  });

  // Extract data from batch response
  const heroData = data.heroData;
  const portfolioData = data.portfolioData;
  const aboutData = data.aboutData;

  return (
    <Suspense fallback={<Loading />}>
      <HomeWowPage 
        heroData={heroData} 
        portfolioData={portfolioData} 
        aboutData={aboutData} 
      />
    </Suspense>
  );
}
