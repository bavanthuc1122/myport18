/**
 * Script để đảm bảo các document singleton (document duy nhất) tồn tại
 * Chạy script này để tạo các document singleton nếu chúng chưa tồn tại
 */

import { createClient } from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_STUDIO_API_TOKEN || 'skGhxXJrFivXRBqmBdNtweu08hAVPxaQ1X09a7DrASDROnhCLXenvvUJBFibLROeEQvDphDd5ZkU9eL16xdzVOYCszfEuP2O0VcUsAki6hSl34iIUx3XZzrQGCtSNuk3FsepxzYy8yyIyblHGTFBoq1IFsqPJ2ECH40db8rMDJEPpb98YlWY',
  useCdn: false,
})

// Danh sách các document singleton cần đảm bảo tồn tại
const singletonDocuments = [
  {
    _id: 'heroSection',
    _type: 'heroSection',
    title: 'Trang Chủ',
    subtitle: 'Nhiếp ảnh gia',
  },
  {
    _id: 'aboutSection',
    _type: 'aboutSection',
    title: 'Về Chúng Tôi',
    subtitle: 'Nhiếp ảnh gia chuyên nghiệp',
  },
  {
    _id: 'portfolioPreview',
    _type: 'portfolioPreview',
    title: 'Dự Án',
    subtitle: 'Các dự án nổi bật',
  },
  {
    _id: 'contactInfo',
    _type: 'contactInfo',
    title: 'LIÊN HỆ',
    subtitle: 'Cho Nhiếp Ảnh',
    photographerName: 'Thức ( Nhiếp ảnh gia )',
    email: 'bavanthuc@gmail.com',
    phone: '(+84) 0814019555',
  },
]

// Hàm chính để đảm bảo các document singleton tồn tại
async function ensureSingletonDocuments() {
  console.log('Bắt đầu kiểm tra và tạo các document singleton...')

  for (const doc of singletonDocuments) {
    try {
      // Kiểm tra xem document đã tồn tại chưa
      const existingDoc = await client.fetch(`*[_id == $id][0]`, { id: doc._id })

      if (existingDoc) {
        console.log(`Document ${doc._id} đã tồn tại.`)
      } else {
        // Nếu chưa tồn tại, tạo mới
        await client.createIfNotExists(doc)
        console.log(`Đã tạo document ${doc._id}.`)
      }
    } catch (error) {
      console.error(`Lỗi khi xử lý document ${doc._id}:`, error.message)
    }
  }

  console.log('Hoàn thành!')
}

// Chạy hàm chính
ensureSingletonDocuments()
  .catch((err) => {
    console.error('Lỗi:', err)
    process.exit(1)
  })
