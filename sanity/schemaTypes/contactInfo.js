export default {
  name: 'contactInfo',
  title: 'Thông Tin Liên Hệ',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Thông tin cơ bản',
    },
    {
      name: 'social',
      title: 'Mạng xã hội',
    },
    {
      name: 'content',
      title: 'Nội dung trang',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề trang',
      type: 'string',
      description: 'Tiêu đề chính cho trang liên hệ',
      initialValue: 'LIÊN HỆ',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Phụ đề',
      type: 'string',
      description: 'Phụ đề cho trang liên hệ',
      initialValue: 'Cho Nhiếp Ảnh',
      group: 'content',
    },
    {
      name: 'photographerName',
      title: 'Tên nhiếp ảnh gia',
      type: 'string',
      description: 'Tên của bạn hoặc tên doanh nghiệp',
      initialValue: 'Thức ( Nhiếp ảnh gia )',
      group: 'basic',
    },
    {
      name: 'email',
      title: 'Địa chỉ email',
      type: 'string',
      description: 'Địa chỉ email liên hệ của bạn',
      initialValue: 'thucnhthuc@gmail.com',
      group: 'basic',
    },
    {
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      description: 'Số điện thoại liên hệ của bạn',
      initialValue: '(+84) 0814019555',
      group: 'basic',
    },
    {
      name: 'backgroundColor',
      title: 'Màu nền',
      type: 'color',
      description: 'Màu nền cho trang liên hệ',
      group: 'content',
    },
    {
      name: 'contactImage',
      title: 'Ảnh liên hệ',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      description: 'Hình ảnh hiển thị trên trang liên hệ',
      group: 'content',
    },
    {
      name: 'socialLinks',
      title: 'Liên kết mạng xã hội',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Nền tảng',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Behance', value: 'behance' },
                ],
              },
            },
            {
              name: 'url',
              title: 'Đường dẫn',
              type: 'url',
              description: 'Liên kết đến trang cá nhân của bạn trên nền tảng này',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
      group: 'social',
    },
  ],
  preview: {
    select: {
      title: 'photographerName',
      email: 'email',
    },
    prepare({ title, email }) {
      return {
        title: title || 'Thông Tin Liên Hệ',
        subtitle: email,
      };
    },
  },
};
