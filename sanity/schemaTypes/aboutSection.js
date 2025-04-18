export default {
  name: 'aboutSection',
  title: 'Phần Giới Thiệu',
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
      description: 'Tiêu đề chính của phần giới thiệu (ví dụ: "About Me")',
      group: 'content',
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      description: 'Mô tả ngắn về bạn hoặc công việc của bạn',
      rows: 3,
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
      description: 'Hình ảnh nền cho phần About',
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
      name: 'profileImage',
      title: 'Hình ảnh giới thiệu',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hình ảnh chân dung hoặc hình ảnh đại diện',
      group: 'images',
    },
    {
      name: 'galleryImages',
      title: 'Hình ảnh bộ sưu tập',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Các hình ảnh hiển thị trong bộ sưu tập (tối đa 6 hình)',
      validation: Rule => Rule.max(6).warning('Tối đa 6 hình ảnh'),
      group: 'images',
    },
    {
      name: 'skillsTitle',
      title: 'Tiêu đề kỹ năng',
      type: 'string',
      description: 'Tiêu đề cho phần kỹ năng (ví dụ: "SKILL COLLECTION")',
      initialValue: 'SKILL COLLECTION',
      group: 'content',
    },
    {
      name: 'skills',
      title: 'Danh sách kỹ năng',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'Danh sách các kỹ năng nhiếp ảnh của bạn',
      group: 'content',
    },
    {
      name: 'buttonText',
      title: 'Văn bản nút',
      type: 'string',
      description: 'Văn bản hiển thị trên nút (ví dụ: "See >>")',
      initialValue: 'See >>',
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
      media: 'profileImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Phần Giới Thiệu',
        media,
      };
    },
  },
};
