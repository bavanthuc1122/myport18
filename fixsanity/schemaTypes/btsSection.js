import {orderRankField} from '@sanity/orderable-document-list'

// Schema cho phần hậu trường
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
    orderRankField({type: 'btsSection'}),
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
          { title: 'Bố cục 3 (5 hình ngang hàng)', value: 'layout3' },
          { title: 'Bố cục 5 (Lưới hình ảnh tự động)', value: 'layout5' },
          { title: 'Bố cục 6 (Slideshow)', value: 'layout6' },
          { title: 'Bố cục 7 (Masonry - xếp chồng)', value: 'layout7' },
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
    {
      name: 'customLayout',
      title: 'Tùy chỉnh bố cục',
      type: 'object',
      description: 'Các tùy chỉnh thêm cho bố cục',
      group: 'content',
      fields: [
        {
          name: 'columns',
          title: 'Số cột',
          type: 'number',
          description: 'Số cột hiển thị trên màn hình lớn (mặc định: 3)',
          initialValue: 3,
          validation: Rule => Rule.min(1).max(6)
        },
        {
          name: 'gap',
          title: 'Khoảng cách',
          type: 'number',
          description: 'Khoảng cách giữa các hình ảnh (px)',
          initialValue: 16,
          validation: Rule => Rule.min(0).max(100)
        },
        {
          name: 'roundedCorners',
          title: 'Bo góc',
          type: 'number',
          description: 'Độ bo góc của hình ảnh (px)',
          initialValue: 8,
          validation: Rule => Rule.min(0).max(50)
        },
        {
          name: 'shadow',
          title: 'Bóng đổ',
          type: 'boolean',
          description: 'Thêm bóng đổ cho hình ảnh',
          initialValue: true
        },
        {
          name: 'hoverEffect',
          title: 'Hiệu ứng hover',
          type: 'string',
          description: 'Hiệu ứng khi di chuột qua hình ảnh',
          options: {
            list: [
              {title: 'Không có', value: 'none'},
              {title: 'Phóng to', value: 'scale'},
              {title: 'Mờ đục', value: 'opacity'},
              {title: 'Xoay nhẹ', value: 'rotate'},
              {title: 'Thay đổi màu sắc', value: 'color'}
            ]
          },
          initialValue: 'scale'
        },
        {
          name: 'aspectRatio',
          title: 'Tỷ lệ khung hình',
          type: 'string',
          description: 'Tỷ lệ khung hình cho hình ảnh',
          options: {
            list: [
              {title: 'Vuông (1:1)', value: '1:1'},
              {title: 'Ngang (16:9)', value: '16:9'},
              {title: 'Ngang (4:3)', value: '4:3'},
              {title: 'Dọc (9:16)', value: '9:16'},
              {title: 'Dọc (3:4)', value: '3:4'},
              {title: 'Tự động', value: 'auto'}
            ]
          },
          initialValue: '1:1'
        }
      ]
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
