// scripts/check-video-data.js
import {createClient} from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
})

// Truy vấn dữ liệu video
async function checkVideoData() {
  try {
    // Kiểm tra Hero Section
    const heroSection = await client.fetch(`
      *[_type == "heroSection" && _id == "heroSection"][0] {
        _id,
        title,
        mediaType,
        videoUrl,
        "videoFile": videoFile.asset->{
          _id,
          url,
          mimeType,
          originalFilename,
          size
        }
      }
    `)
    console.log('Hero Section Video Data:', JSON.stringify(heroSection, null, 2))

    // Kiểm tra About Section
    const aboutSection = await client.fetch(`
      *[_type == "aboutSection" && _id == "aboutSection"][0] {
        _id,
        title,
        mediaType,
        videoUrl,
        "videoFile": videoFile.asset->{
          _id,
          url,
          mimeType,
          originalFilename,
          size
        }
      }
    `)
    console.log('About Section Video Data:', JSON.stringify(aboutSection, null, 2))

    // Kiểm tra CTA Section
    const ctaSection = await client.fetch(`
      *[_type == "ctaSection" && _id == "ctaSection"][0] {
        _id,
        title,
        mediaType,
        videoUrl,
        "videoFile": videoFile.asset->{
          _id,
          url,
          mimeType,
          originalFilename,
          size
        }
      }
    `)
    console.log('CTA Section Video Data:', JSON.stringify(ctaSection, null, 2))

    // Kiểm tra Portfolio Preview
    const portfolioPreview = await client.fetch(`
      *[_type == "portfolioPreview" && _id == "portfolioPreview"][0] {
        _id,
        title,
        mediaType,
        videoUrl,
        "videoFile": videoFile.asset->{
          _id,
          url,
          mimeType,
          originalFilename,
          size
        }
      }
    `)
    console.log('Portfolio Preview Video Data:', JSON.stringify(portfolioPreview, null, 2))

  } catch (error) {
    console.error('Error checking video data:', error)
  }
}

// Chạy hàm
checkVideoData()
