// Tạo dữ liệu mẫu cho Sanity CMS
// Chạy script này bằng lệnh: node scripts/create-sample-data.js

const { client } = require('../lib/sanity');

async function createSampleData() {
  try {
    console.log('Bắt đầu tạo dữ liệu mẫu...');

    // Tạo About Section
    const aboutSection = {
      _type: 'aboutSection',
      _id: 'aboutSection',
      title: 'Về Chúng Tôi',
      description: 'Studio nhiếp ảnh chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực thời trang và chân dung.',
      skillsTitle: 'KỸ NĂNG',
      skills: ['CHÂN DUNG', 'THỜI TRANG', 'QUẢNG CÁO', 'SẢN PHẨM'],
      buttonText: 'Xem thêm >>',
      buttonLink: '/portfolio',
      mediaType: 'color',
      backgroundColor: '#505050',
      // Thêm backgroundImage nếu có hình ảnh mẫu
      // backgroundImage: {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-id-background'
      //   }
      // },
      // videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      // Thêm galleryImages nếu có hình ảnh mẫu
      // galleryImages: [
      //   {
      //     _type: 'image',
      //     asset: {
      //       _type: 'reference',
      //       _ref: 'image-id-1'
      //     }
      //   },
      //   // Thêm các hình ảnh khác nếu cần
      // ]
    };

    // Tạo Contact Info
    const contactInfo = {
      _type: 'contactInfo',
      _id: 'contactInfo',
      title: 'LIÊN HỆ',
      subtitle: 'Cho Nhiếp Ảnh',
      email: 'bavanthuc@gmail.com',
      phone: '+84988710321',
      address: 'Hà Nội, Việt Nam',
      socialLinks: [
        {
          _key: 'instagram',
          platform: 'instagram',
          url: 'https://instagram.com'
        },
        {
          _key: 'facebook',
          platform: 'facebook',
          url: 'https://facebook.com'
        },
        {
          _key: 'behance',
          platform: 'behance',
          url: 'https://behance.net'
        }
      ],
      // Thêm contactImage nếu có hình ảnh mẫu
      // contactImage: {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-id-contact'
      //   }
      // }
    };

    // Tạo BTS Section
    const btsSection = {
      _type: 'btsSection',
      title: 'Hậu Trường',
      subtitle: 'Góc nhìn gần hơn',
      layout: 'layout1',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      // Thêm mainImage nếu có hình ảnh mẫu
      // mainImage: {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-id-bts-main'
      //   }
      // },
      // Thêm images nếu có hình ảnh mẫu
      // images: [
      //   {
      //     _key: 'image1',
      //     image: {
      //       _type: 'image',
      //       asset: {
      //         _type: 'reference',
      //         _ref: 'image-id-bts-1'
      //       }
      //     },
      //     alt: 'Hình ảnh hậu trường 1'
      //   },
      //   // Thêm các hình ảnh khác nếu cần
      // ]
    };

    // Tạo Portfolio Preview
    const portfolioPreview = {
      _type: 'portfolioPreview',
      _id: 'portfolioPreview',
      title: 'Welcome to Portfolio',
      subtitle1: 'I tell your story',
      subtitle2: 'in pictures',
      portfolioLink: '/portfolio',
      mediaType: 'color',
      backgroundColor: '#000000',
      // backgroundImage: {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-id-portfolio-bg'
      //   }
      // },
      // videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      // Thêm previewImages nếu có hình ảnh mẫu
      // previewImages: [
      //   {
      //     _key: 'image1',
      //     image: {
      //       _type: 'image',
      //       asset: {
      //         _type: 'reference',
      //         _ref: 'image-id-preview-1'
      //       }
      //     },
      //     alt: 'Portfolio image 1',
      //     link: '/portfolio'
      //   },
      //   {
      //     _key: 'image2',
      //     image: {
      //       _type: 'image',
      //       asset: {
      //         _type: 'reference',
      //         _ref: 'image-id-preview-2'
      //       }
      //     },
      //     alt: 'Portfolio image 2',
      //     link: '/portfolio'
      //   },
      //   {
      //     _key: 'image3',
      //     image: {
      //       _type: 'image',
      //       asset: {
      //         _type: 'reference',
      //         _ref: 'image-id-preview-3'
      //       }
      //     },
      //     alt: 'Portfolio image 3',
      //     link: '/portfolio'
      //   }
      // ]
    };

    // Tạo các document
    await client.createOrReplace(aboutSection);
    await client.createOrReplace(contactInfo);
    await client.createOrReplace(portfolioPreview);
    await client.create(btsSection);

    console.log('Đã tạo dữ liệu mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu mẫu:', error);
  }
}

createSampleData();
