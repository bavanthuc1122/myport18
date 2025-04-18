export default {
  name: 'portfolioPreview',
  title: 'Portfolio Preview',
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
      description: 'Tiêu đề chính cho phần portfolio preview',
      group: 'content',
    },
    {
      name: 'subtitle1',
      title: 'Tiêu đề phụ 1',
      type: 'string',
      description: 'Dòng tiêu đề phụ thứ nhất (ví dụ: "I tell your story")',
      group: 'content',
    },
    {
      name: 'subtitle2',
      title: 'Tiêu đề phụ 2',
      type: 'string',
      description: 'Dòng tiêu đề phụ thứ hai (ví dụ: "in pictures")',
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
      description: 'Hình ảnh nền cho phần Portfolio Preview',
      group: 'background',
      hidden: ({ document }) => document?.mediaType !== 'image',
    },
    {
      name: 'videoUrl',
      title: 'URL Video YouTube',
      type: 'url',
      description: 'Dán URL video YouTube (dạng https://www.youtube.com/watch?v=XXXX hoặc https://youtu.be/XXXX). Video sẽ tự động phát, tắt tiếng, lặp lại và ẩn logo YouTube. Video sẽ được phóng to để lấp đầy màn hình.',
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
      name: 'previewImages',
      title: 'Hình ảnh xem trước',
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
                storeOriginalFilename: true,
                accept: 'image/*',
                sources: ['local']
              },
            },
            {
              name: 'alt',
              title: 'Mô tả hình ảnh',
              type: 'string',
              description: 'Văn bản thay thế khi hình ảnh không tải được',
            },
            {
              name: 'link',
              title: 'Đường dẫn liên kết',
              type: 'string',
              description: 'URL khi người dùng nhấp vào hình ảnh này',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image'
            }
          }
        },
      ],
      description: 'Thêm tối đa 3 hình ảnh để hiển thị trong phần xem trước portfolio',
      validation: Rule => Rule.max(3).error('Chỉ được thêm tối đa 3 hình ảnh xem trước'),
      group: 'images',
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'portfolioLink',
      title: 'Đường dẫn Portfolio',
      type: 'string',
      description: 'URL đến trang portfolio (mặc định: /portfolio)',
      initialValue: '/portfolio',
      group: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'previewImages.0.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Portfolio Preview',
        media,
      };
    },
  },
};
