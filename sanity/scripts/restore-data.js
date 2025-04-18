// scripts/restore-data.js
import {createClient} from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: 'skGhxXJrFivXRBqmBdNtweu08hAVPxaQ1X09a7DrASDROnhCLXenvvUJBFibLROeEQvDphDd5ZkU9eL16xdzVOYCszfEuP2O0VcUsAki6hSl34iIUx3XZzrQGCtSNuk3FsepxzYy8yyIyblHGTFBoq1IFsqPJ2ECH40db8rMDJEPpb98YlWY'
})

// Hàm sao chép dữ liệu
async function copyData() {
  try {
    // 1. Sao chép dữ liệu portfolioPreview
    const portfolioPreviewSource = await client.fetch('*[_type == "portfolioPreview" && _id == "671ed856-4b45-42f9-8f93-9305a3867380"][0]')
    
    if (portfolioPreviewSource) {
      // Tạo document mới với ID cụ thể
      const portfolioPreviewData = {
        ...portfolioPreviewSource,
        _id: 'portfolioPreview',
        _type: 'portfolioPreview'
      }
      
      // Xóa các trường không cần thiết
      delete portfolioPreviewData._rev
      delete portfolioPreviewData._createdAt
      delete portfolioPreviewData._updatedAt
      
      // Tạo hoặc cập nhật document
      await client.createOrReplace(portfolioPreviewData)
      console.log('Đã sao chép dữ liệu portfolioPreview thành công')
    } else {
      console.log('Không tìm thấy dữ liệu portfolioPreview nguồn')
    }
    
    // 2. Sao chép dữ liệu aboutSection
    const aboutSectionSource = await client.fetch('*[_type == "aboutSection" && _id == "77522e42-930c-49c4-8797-0a1452c72f34"][0]')
    
    if (aboutSectionSource) {
      // Tạo document mới với ID cụ thể
      const aboutSectionData = {
        ...aboutSectionSource,
        _id: 'aboutSection',
        _type: 'aboutSection'
      }
      
      // Xóa các trường không cần thiết
      delete aboutSectionData._rev
      delete aboutSectionData._createdAt
      delete aboutSectionData._updatedAt
      
      // Tạo hoặc cập nhật document
      await client.createOrReplace(aboutSectionData)
      console.log('Đã sao chép dữ liệu aboutSection thành công')
    } else {
      console.log('Không tìm thấy dữ liệu aboutSection nguồn')
    }
    
    // 3. Sao chép dữ liệu heroSection (nếu có)
    const heroSectionSource = await client.fetch('*[_type == "heroSection"][0]')
    
    if (heroSectionSource && heroSectionSource._id !== 'heroSection') {
      // Tạo document mới với ID cụ thể
      const heroSectionData = {
        ...heroSectionSource,
        _id: 'heroSection',
        _type: 'heroSection'
      }
      
      // Xóa các trường không cần thiết
      delete heroSectionData._rev
      delete heroSectionData._createdAt
      delete heroSectionData._updatedAt
      
      // Tạo hoặc cập nhật document
      await client.createOrReplace(heroSectionData)
      console.log('Đã sao chép dữ liệu heroSection thành công')
    } else if (heroSectionSource) {
      console.log('heroSection đã tồn tại với ID đúng')
    } else {
      console.log('Không tìm thấy dữ liệu heroSection nguồn')
    }
    
    // 4. Sao chép dữ liệu contactInfo (nếu có)
    const contactInfoSource = await client.fetch('*[_type == "contactInfo"][0]')
    
    if (contactInfoSource && contactInfoSource._id !== 'contactInfo') {
      // Tạo document mới với ID cụ thể
      const contactInfoData = {
        ...contactInfoSource,
        _id: 'contactInfo',
        _type: 'contactInfo'
      }
      
      // Xóa các trường không cần thiết
      delete contactInfoData._rev
      delete contactInfoData._createdAt
      delete contactInfoData._updatedAt
      
      // Tạo hoặc cập nhật document
      await client.createOrReplace(contactInfoData)
      console.log('Đã sao chép dữ liệu contactInfo thành công')
    } else if (contactInfoSource) {
      console.log('contactInfo đã tồn tại với ID đúng')
    } else {
      console.log('Không tìm thấy dữ liệu contactInfo nguồn')
    }
    
    console.log('Hoàn tất sao chép dữ liệu')
  } catch (error) {
    console.error('Lỗi khi sao chép dữ liệu:', error)
  }
}

// Chạy hàm
copyData()
