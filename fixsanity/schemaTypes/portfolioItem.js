export default {
  name: 'portfolioItem',
  title: 'Các Dự Án Portfolio',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Thông tin cơ bản',
    },
    {
      name: 'media',
      title: 'Hình ảnh',
    },
    {
      name: 'links',
      title: 'Liên kết',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tên dự án',
      type: 'string',
      description: 'Tên của dự án portfolio',
      validation: Rule => Rule.required(),
      group: 'basic',
    },
    {
      name: 'imageSource',
      title: 'Nguồn hình ảnh',
      type: 'string',
      options: {
        list: [
          { title: 'Tải lên hình ảnh', value: 'upload' },
          { title: 'Đường dẫn bên ngoài', value: 'url' },
        ],
      },
      initialValue: 'upload',
      description: 'Chọn cách tải lên hình ảnh hoặc sử dụng URL bên ngoài',
      group: 'media',
    },
    {
      name: 'coverImage',
      title: 'Ảnh bìa',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      description: 'Hình ảnh chính cho dự án portfolio này',
      hidden: ({ document }) => document?.imageSource !== 'upload',
      group: 'media',
    },
    {
      name: 'imageUrl',
      title: 'URL hình ảnh',
      type: 'url',
      description: 'URL đến hình ảnh bên ngoài',
      hidden: ({ document }) => document?.imageSource !== 'url',
      group: 'media',
    },
    {
      name: 'behanceLink',
      title: 'Liên kết Behance',
      type: 'url',
      description: 'Liên kết đến dự án hoặc album Behance',
      group: 'links',
    },
    {
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Danh mục mà dự án portfolio này thuộc về',
      group: 'basic',
    },
    {
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'datetime',
      description: 'Ngày xuất bản dự án này',
      initialValue: () => new Date().toISOString(),
      group: 'basic',
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      type: 'color',
      description: 'Màu nền cho trang chi tiết dự án',
      group: 'basic',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'coverImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category ? `Danh mục: ${category}` : 'Chưa có danh mục',
        media,
      };
    },
  },
};
