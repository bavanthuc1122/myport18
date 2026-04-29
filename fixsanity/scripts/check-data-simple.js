// scripts/check-data-simple.js
import {createClient} from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
})

// Truy vấn dữ liệu
async function fetchData() {
  try {
    // Lấy tất cả document heroSection
    const heroSections = await client.fetch('*[_type == "heroSection"]')
    console.log('Hero Sections:', heroSections.map(doc => ({ _id: doc._id, title: doc.title })))
    
    // Lấy tất cả document aboutSection
    const aboutSections = await client.fetch('*[_type == "aboutSection"]')
    console.log('About Sections:', aboutSections.map(doc => ({ _id: doc._id, title: doc.title })))
    
    // Lấy tất cả document portfolioPreview
    const portfolioPreviews = await client.fetch('*[_type == "portfolioPreview"]')
    console.log('Portfolio Previews:', portfolioPreviews.map(doc => ({ _id: doc._id, title: doc.title })))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Chạy hàm
fetchData()
