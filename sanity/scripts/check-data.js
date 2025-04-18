// scripts/check-data.js
import {createClient} from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: 'skGhxXJrFivXRBqmBdNtweu08hAVPxaQ1X09a7DrASDROnhCLXenvvUJBFibLROeEQvDphDd5ZkU9eL16xdzVOYCszfEuP2O0VcUsAki6hSl34iIUx3XZzrQGCtSNuk3FsepxzYy8yyIyblHGTFBoq1IFsqPJ2ECH40db8rMDJEPpb98YlWY'
})

// Truy vấn dữ liệu
async function fetchData() {
  try {
    // Lấy tất cả document heroSection
    const heroSections = await client.fetch('*[_type == "heroSection"]')
    console.log('Hero Sections:', JSON.stringify(heroSections, null, 2))
    
    // Lấy tất cả document aboutSection
    const aboutSections = await client.fetch('*[_type == "aboutSection"]')
    console.log('About Sections:', JSON.stringify(aboutSections, null, 2))
    
    // Lấy tất cả document portfolioPreview
    const portfolioPreviews = await client.fetch('*[_type == "portfolioPreview"]')
    console.log('Portfolio Previews:', JSON.stringify(portfolioPreviews, null, 2))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Chạy hàm
fetchData()
