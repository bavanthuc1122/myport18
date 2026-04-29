export default {
  name: 'category',
  title: 'Danh Mục Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên danh mục',
      type: 'string',
      description: 'Tên của danh mục',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      description: 'Mô tả tùy chọn của danh mục',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
