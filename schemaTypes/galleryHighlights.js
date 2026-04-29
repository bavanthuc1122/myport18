export default {
  name: 'galleryHighlights',
  title: 'Gallery Highlights',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Nội dung',
    },
    {
      name: 'background',
      title: 'Nền',
    },
    {
      name: 'images',
      title: 'Hình ảnh',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề chính',
      type: 'string',
      description: 'Tiêu đề chính cho phần Gallery Highlights',
      initialValue: 'Gallery Highlights',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Tiêu đề phụ',
      type: 'string',
      description: 'Dòng tiêu đề phụ (ví dụ: "A selection of my best work with smooth reveal animations")',
      initialValue: 'A selection of my best work with smooth reveal animations',
      group: 'content',
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
      initialValue: 'color',
      group: 'background',
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      type: 'color',
      description: 'Chọn màu nền',
      group: 'background',
    },
    {
      name: 'backgroundImage',
      title: 'Hình ảnh nền',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hình ảnh nền cho phần Gallery Highlights',
      group: 'background',
      hidden: ({ document }) => document?.mediaType !== 'image',
    },
    {
      name: 'videoUrl',
      title: 'URL Video YouTube',
      type: 'url',
      description: 'Dán URL video YouTube (dạng https://www.youtube.com/watch?v=XXXX hoặc https://youtu.be/XXXX). Video sẽ tự động phát, tắt tiếng, lặp lại và ẩn logo YouTube.',
      group: 'background',
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
      description: 'Thêm hình ảnh để hiển thị trong phần Gallery Highlights (tối đa 4 hình)',
      validation: Rule => Rule.max(4).error('Chỉ được thêm tối đa 4 hình ảnh'),
      group: 'images',
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'buttonText',
      title: 'Văn bản nút',
      type: 'string',
      description: 'Văn bản hiển thị trên nút (ví dụ: "View All")',
      initialValue: 'View All',
      group: 'content',
    },
    {
      name: 'buttonLink',
      title: 'Đường dẫn nút',
      type: 'string',
      description: 'Đường dẫn khi nhấp vào nút',
      initialValue: '/portfolio',
      group: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'galleryImages.0.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Gallery Highlights',
        media,
      };
    },
  },
};