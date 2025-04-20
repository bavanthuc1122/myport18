/**
 * Script để thêm ảnh mẫu vào portfolioPreview
 * Chạy script này để thêm ảnh mẫu vào portfolioPreview nếu chưa có
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

// Hàm chính để thêm ảnh mẫu vào portfolioPreview
async function addSampleImagesToPortfolioPreview() {
  console.log('Bắt đầu thêm ảnh mẫu vào portfolioPreview...')

  try {
    // Kiểm tra xem portfolioPreview đã tồn tại chưa
    const portfolioPreview = await client.fetch(`*[_type == "portfolioPreview" && _id == "portfolioPreview"][0]`)

    if (!portfolioPreview) {
      console.error('Không tìm thấy portfolioPreview. Hãy chạy script ensure-singleton-documents.js trước.')
      return
    }

    // Kiểm tra xem đã có previewImages chưa
    if (portfolioPreview.previewImages && portfolioPreview.previewImages.length > 0) {
      console.log('portfolioPreview đã có previewImages. Không cần thêm ảnh mẫu.')
      return
    }

    // Cập nhật portfolioPreview với ảnh mẫu
    const result = await client.patch(portfolioPreview._id)
      .set({
        previewImages: [
          {
            _key: 'sample1',
            alt: 'Portfolio image 1',
            link: '/portfolio',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-00edb4c410116f10c0a0a7ba3ee549a15b18b50c-4024x6048-jpg'
              }
            }
          },
          {
            _key: 'sample2',
            alt: 'Portfolio image 2',
            link: '/portfolio',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-00edb4c410116f10c0a0a7ba3ee549a15b18b50c-4024x6048-jpg'
              }
            }
          },
          {
            _key: 'sample3',
            alt: 'Portfolio image 3',
            link: '/portfolio',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-00edb4c410116f10c0a0a7ba3ee549a15b18b50c-4024x6048-jpg'
              }
            }
          }
        ]
      })
      .commit()

    console.log('Đã thêm ảnh mẫu vào portfolioPreview:', result)
  } catch (error) {
    console.error('Lỗi khi thêm ảnh mẫu vào portfolioPreview:', error.message)
  }

  console.log('Hoàn thành!')
}

// Chạy hàm chính
addSampleImagesToPortfolioPreview()
  .catch((err) => {
    console.error('Lỗi:', err)
    process.exit(1)
  })
