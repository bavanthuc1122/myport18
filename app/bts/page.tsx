import Image from "next/image"
import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import { batchFetchSanityData, urlFor } from "@/lib/sanity"
import "./bts-layouts.css"

// Import client component wrapper
import ClientBtsWrapper from "@/components/client-bts-wrapper"

// Define types
type ProcessedImage = {
  _key: string;
  url: string;
  alt?: string;
}

type BtsImage = {
  _key?: string;
  _type?: string;
  asset?: any;
  alt?: string;
  image?: any; // Thêm trường image để hỗ trợ cấu trúc dữ liệu từ Sanity
}

type BtsSection = {
  _id: string;
  title?: string;
  subtitle?: string;
  layout?: string;
  backgroundColor?: { hex: string };
  mainImage?: any;
  videoUrl?: string;
  images?: BtsImage[];
  customLayout?: {
    columns?: number;
    gap?: number;
    roundedCorners?: number;
    shadow?: boolean;
    hoverEffect?: string;
    aspectRatio?: string;
  };
}

export default async function BTS() {
  // Batch fetch BTS sections from Sanity to reduce API requests
  const data = await batchFetchSanityData({
    btsSections: {
      query: '*[_type == "btsSection"] | order(orderRank asc) { _id, title, subtitle, layout, backgroundColor, mainImage, videoUrl, images[], customLayout }'
    }
  }) as { btsSections: BtsSection[] }

  // Ghi log dữ liệu để kiểm tra
  console.log('Raw BTS data from Sanity:', JSON.stringify(data.btsSections[0]?.images?.slice(0, 1) || [], null, 2));

  // Debug log
  console.log('BTS Sections data:', JSON.stringify(data.btsSections, null, 2))

  // Extract data from batch response
  const btsSections = data.btsSections || []

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <HeaderPortfolio />

        {/* Main content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          {/* Title section */}
          <div className="mb-16 text-center fade-in">
            <h1 className="text-4xl lg:text-6xl font-light mb-3 slide-up">Be High The Scene</h1>
            <p className="text-gray-400 text-lg slide-up delay-200 italic">A closer perspective</p>
            <div className="w-24 h-1 bg-white/20 mx-auto mt-6"></div>
          </div>

          {/* Sử dụng client component wrapper để xử lý layout */}
          <ClientBtsWrapper btsSections={btsSections.map(section => {
            // Xử lý dữ liệu hình ảnh để truyền vào client component
            let processedImages: ProcessedImage[] = [];

            if (section.images && Array.isArray(section.images)) {
              processedImages = section.images.map((img, index) => {
                try {
                  // Kiểm tra xem img có hợp lệ không
                  if (!img) {
                    console.warn('Invalid image object (null or undefined)');
                    return null;
                  }

                  // Xử lý cả trường hợp img là object image trực tiếp hoặc có trường image bên trong
                  const imageToProcess = img.asset ? img : (img.image || img);

                  if (!imageToProcess || (!imageToProcess.asset && !imageToProcess._type)) {
                    console.warn('Invalid image structure:', img);
                    return null;
                  }

                  return {
                    _key: img._key || `img-${index}`,
                    url: urlFor(imageToProcess).url(),
                    alt: img.alt || `Image ${index + 1}`
                  };
                } catch (error) {
                  console.error('Error processing image:', error, img);
                  return null;
                }
              }).filter(Boolean) as ProcessedImage[];
            }

            // Xử lý hình ảnh chính
            let mainImageUrl: string | null = null;
            try {
              if (section.mainImage) {
                // Xử lý cả trường hợp mainImage là object image trực tiếp hoặc có trường image bên trong
                const imageToProcess = section.mainImage.asset ? section.mainImage : (section.mainImage.image || section.mainImage);
                mainImageUrl = imageToProcess ? urlFor(imageToProcess).url() : null;
              }
            } catch (error) {
              console.error('Error processing main image:', error, section.mainImage);
            }

            // Xử lý URL video
            const videoUrl = section.videoUrl || null;

            return {
              ...section,
              mainImage: mainImageUrl ? { url: mainImageUrl } : null,
              videoUrl: videoUrl,
              images: processedImages
            };
          })} />
        </main>

        <Footer />
      </div>
    </div>
  )
}
