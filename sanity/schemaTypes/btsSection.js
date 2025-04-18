export default {
  name: 'btsSection',
  title: 'Hậu Trường',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Nội dung',
    },
    {
      name: 'images',
      title: 'Hình ảnh',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      description: 'Tiêu đề của phần hậu trường này',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Phụ đề',
      type: 'string',
      description: 'Phụ đề tùy chọn cho phần này',
      group: 'content',
    },
    {
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      description: 'Thứ tự hiển thị của phần này (số nhỏ hơn hiển thị trước)',
      initialValue: 0,
      group: 'content',
    },
    {
      name: 'layout',
      title: 'Kiểu bố cục',
      type: 'string',
      options: {
        list: [
          { title: 'Bố cục 1 (1 lớn + 4 nhỏ)', value: 'layout1' },
          { title: 'Bố cục 2 (3 trái + 2 phải)', value: 'layout2' },
          { title: 'Bố cục 3 (5 hình ngang hàng)', value: 'layout3' },
          { title: 'Bố cục 4 (2 lớn + 3 nhỏ)', value: 'layout4' },
        ],
      },
      description: 'Chọn kiểu bố cục cho phần này',
      group: 'content',
    },
    {
      name: 'mainImage',
      title: 'Hình ảnh chính',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hình ảnh chính/nổi bật cho phần này (sử dụng trong Bố cục 1)',
      hidden: ({ document }) => document?.layout !== 'layout1',
      group: 'images',
    },
    {
      name: 'videoUrl',
      title: 'URL Video',
      type: 'url',
      description: 'URL đến video (YouTube, Vimeo, v.v.) - có thể sử dụng thay cho hình ảnh chính',
      hidden: ({ document }) => document?.layout !== 'layout1',
      group: 'images',
    },
    {
      name: 'images',
      title: 'Hình ảnh',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
          },
          fields: [
            {
              name: 'alt',
              title: 'Mô tả hình ảnh',
              type: 'string',
              description: 'Văn bản thay thế cho hình ảnh (hỗ trợ SEO)',
            },
          ],
        },
      ],
      description: 'Thêm hình ảnh cho phần hậu trường này (có thể chọn nhiều hình ảnh cùng lúc)',
      options: {
        layout: 'grid',
      },
      group: 'images',
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      type: 'color',
      description: 'Màu nền cho phần này',
      group: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      media: 'mainImage',
      imagesCount: 'images.length',
    },
    prepare({ title, layout, media, imagesCount }) {
      return {
        title: title || 'Phần Hậu Trường',
        subtitle: `${layout ? `Bố cục: ${layout}` : 'Chưa chọn bố cục'} ${imagesCount ? ` | ${imagesCount} hình ảnh` : ''}`,
        media: media || undefined,
      };
    },
  },
};
