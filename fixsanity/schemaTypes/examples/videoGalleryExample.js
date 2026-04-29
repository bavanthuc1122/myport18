/**
 * Schema mẫu minh họa cách sử dụng video và gallery
 * File này chỉ để tham khảo và không được sử dụng trong sản phẩm thực tế
 */

export default {
  name: 'videoGalleryExample',
  title: 'Ví dụ Video và Gallery',
  type: 'document',
  groups: [
    {
      name: 'video',
      title: 'Video Background',
    },
    {
      name: 'gallery',
      title: 'Gallery',
    },
    {
      name: 'tips',
      title: 'Mẹo sử dụng',
    },
  ],
  fields: [
    // Video Background
    {
      name: 'videoTitle',
      title: 'Tiêu đề phần Video',
      type: 'string',
      description: 'Tiêu đề cho phần minh họa video',
      initialValue: 'Cách sử dụng Video Background',
      group: 'video',
    },
    {
      name: 'mediaType',
      title: 'Loại nền',
      type: 'string',
      options: {
        list: [
          { title: 'Hình ảnh', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Màu đơn', value: 'color' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
      description: 'Chọn "Video" để hiển thị các tùy chọn video',
      group: 'video',
    },
    {
      name: 'videoUrl',
      title: 'URL Video YouTube',
      type: 'url',
      description: 'Dán URL video YouTube (dạng https://www.youtube.com/watch?v=XXXX hoặc https://youtu.be/XXXX). Video sẽ tự động phát, tắt tiếng, lặp lại và ẩn logo YouTube.',
      group: 'video',
      hidden: ({ document }) => document?.mediaType !== 'video',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      }).custom(url => {
        if (!url) return true;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          return true;
        }
        return 'Vui lòng nhập URL video YouTube hợp lệ';
      })
    },
    {
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload video trực tiếp (khuyến nghị: MP4, tối đa 100MB)',
      hidden: ({ document }) => document?.mediaType !== 'video',
      group: 'video',
    },
    {
      name: 'videoDescription',
      title: 'Mô tả về Video',
      type: 'text',
      description: 'Mô tả cách sử dụng video background',
      initialValue: 'Bạn có thể thêm video background bằng cách upload trực tiếp hoặc sử dụng YouTube URL. Hệ thống sẽ ưu tiên sử dụng video upload nếu cả hai được cung cấp.',
      group: 'video',
    },
    
    // Gallery
    {
      name: 'galleryTitle',
      title: 'Tiêu đề phần Gallery',
      type: 'string',
      description: 'Tiêu đề cho phần minh họa gallery',
      initialValue: 'Cách sử dụng Gallery',
      group: 'gallery',
    },
    {
      name: 'galleryImages',
      title: 'Hình ảnh gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Hình ảnh',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              title: 'Mô tả hình ảnh',
              type: 'string',
              description: 'Văn bản thay thế khi hình ảnh không tải được',
            },
            {
              name: 'title',
              title: 'Tiêu đề hình ảnh',
              type: 'string',
              description: 'Tiêu đề hiển thị cho hình ảnh này',
            },
            {
              name: 'description',
              title: 'Mô tả',
              type: 'text',
              description: 'Mô tả ngắn về hình ảnh',
              rows: 2,
            },
            {
              name: 'link',
              title: 'Đường dẫn liên kết',
              type: 'string',
              description: 'URL khi người dùng nhấp vào hình ảnh này',
            },
            {
              name: 'rowSpan',
              title: 'Chiều cao (Masonry)',
              type: 'number',
              description: 'Giá trị từ 30-45 để điều chỉnh chiều cao trong layout masonry',
              validation: Rule => Rule.min(30).max(45),
              initialValue: 35,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'alt',
              media: 'image'
            }
          }
        },
      ],
      description: 'Thêm hình ảnh để hiển thị trong gallery (tối đa 4 hình)',
      validation: Rule => Rule.max(4).error('Chỉ được thêm tối đa 4 hình ảnh'),
      group: 'gallery',
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'galleryDescription',
      title: 'Mô tả về Gallery',
      type: 'text',
      description: 'Mô tả cách sử dụng gallery',
      initialValue: 'Thêm tối đa 4 hình ảnh vào gallery. Điều chỉnh chiều cao của mỗi item bằng trường "Chiều cao (Masonry)" với giá trị từ 30-45. Thêm tiêu đề và mô tả để tạo hiệu ứng hover đẹp mắt.',
      group: 'gallery',
    },
    
    // Tips
    {
      name: 'tipsTitle',
      title: 'Tiêu đề phần Mẹo',
      type: 'string',
      description: 'Tiêu đề cho phần mẹo sử dụng',
      initialValue: 'Mẹo sử dụng',
      group: 'tips',
    },
    {
      name: 'tips',
      title: 'Danh sách mẹo',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tiêu đề mẹo',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Mô tả mẹo',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            }
          }
        },
      ],
      description: 'Thêm các mẹo sử dụng video và gallery',
      group: 'tips',
    },
  ],
  preview: {
    select: {
      title: 'videoTitle',
      subtitle: 'galleryTitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Ví dụ Video và Gallery',
        subtitle: 'Hướng dẫn sử dụng',
      };
    },
  },
};
