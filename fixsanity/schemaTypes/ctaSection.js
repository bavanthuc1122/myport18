export default {
  name: 'ctaSection',
  title: 'Ready to Work Together',
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
      name: 'buttons',
      title: 'Nút',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề chính',
      type: 'string',
      description: 'Tiêu đề chính cho phần CTA (ví dụ: "Ready to Work Together")',
      initialValue: 'Ready to Work Together',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Tiêu đề phụ',
      type: 'string',
      description: 'Dòng tiêu đề phụ (ví dụ: "Let\'s create something amazing")',
      group: 'content',
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      description: 'Mô tả ngắn về dịch vụ của bạn',
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
      initialValue: 'image',
      group: 'background',
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      type: 'color',
      description: 'Chọn màu nền',
      group: 'background',
      hidden: ({ document }) => document?.mediaType !== 'color',
    },
    {
      name: 'backgroundImage',
      title: 'Hình ảnh nền',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hình ảnh nền cho phần CTA',
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
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload video trực tiếp (khuyến nghị: MP4, tối đa 100MB)',
      hidden: ({ document }) => document?.mediaType !== 'video',
      group: 'background',
    },
    {
      name: 'primaryButtonText',
      title: 'Văn bản nút chính',
      type: 'string',
      description: 'Văn bản hiển thị trên nút chính (ví dụ: "Contact Me")',
      initialValue: 'Contact Me',
      group: 'buttons',
    },
    {
      name: 'primaryButtonLink',
      title: 'Đường dẫn nút chính',
      type: 'string',
      description: 'Đường dẫn khi nhấp vào nút chính',
      initialValue: '/contact',
      group: 'buttons',
    },
    {
      name: 'secondaryButtonText',
      title: 'Văn bản nút phụ',
      type: 'string',
      description: 'Văn bản hiển thị trên nút phụ (ví dụ: "View Portfolio")',
      group: 'buttons',
    },
    {
      name: 'secondaryButtonLink',
      title: 'Đường dẫn nút phụ',
      type: 'string',
      description: 'Đường dẫn khi nhấp vào nút phụ',
      initialValue: '/portfolio',
      group: 'buttons',
      hidden: ({ document }) => !document?.secondaryButtonText,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Ready to Work Together',
        media,
      };
    },
  },
};