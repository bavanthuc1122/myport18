const imageField = (name, title, description) => ({
  name,
  title,
  type: 'image',
  options: { hotspot: true },
  description,
});

const textBlock = (name, title, description) => ({
  name,
  title,
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow / nhãn nhỏ',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 3,
    },
  ],
  description,
});

export default {
  name: 'homePageSessions',
  title: 'Home Page Sessions - Ảnh & Nội dung từng vùng',
  type: 'document',
  groups: [
    { name: 'session1Hero', title: 'Session 1 - Hero' },
    { name: 'session2Horizontal', title: 'Session 2 - Horizontal Showcase' },
    { name: 'session3Process', title: 'Session 3 - Process' },
    { name: 'session4Services', title: 'Session 4 - Services' },
    { name: 'session5About', title: 'Session 5 - About' },
    { name: 'session6Contact', title: 'Session 6 - Contact' },
    { name: 'seo', title: 'SEO / ghi chú' },
  ],
  fields: [
    {
      name: 'hero',
      title: 'Hero content',
      type: 'object',
      group: 'session1Hero',
      fields: [
        { name: 'eyebrow', title: 'Dòng nhỏ phía trên', type: 'string', initialValue: 'Photography / Visual Direction / 2026' },
        { name: 'title', title: 'Tiêu đề lớn', type: 'string', initialValue: 'Welcome to Portfolio' },
        { name: 'subtitle', title: 'Mô tả ngắn', type: 'text', rows: 2 },
        imageField('backgroundImage', 'Ảnh nền toàn session 1', 'Ảnh phủ nền của Hero.'),
        imageField('featuredImage', 'Ảnh nổi bật trong grid Hero', 'Ảnh nằm trong khối ảnh preview ở Hero. Nếu bỏ trống có thể dùng ảnh nền.'),
      ],
    },
    {
      name: 'horizontalShowcase',
      title: 'Horizontal Showcase - image / text / image / image / text',
      type: 'object',
      group: 'session2Horizontal',
      description: 'Session 2 dùng đúng bố cục: image | text | image | image | text.',
      fields: [
        imageField('backgroundImage', 'Ảnh nền session 2', 'Ảnh phủ nền phía sau track ngang.'),
        imageField('image1', 'Item 1 - Image', 'Ảnh đầu tiên của horizontal track.'),
        textBlock('text1', 'Item 2 - Text', 'Khối chữ thứ nhất trong horizontal track.'),
        imageField('image2', 'Item 3 - Image', 'Ảnh thứ hai của horizontal track.'),
        imageField('image3', 'Item 4 - Image', 'Ảnh thứ ba của horizontal track.'),
        textBlock('text2', 'Item 5 - Text', 'Khối chữ thứ hai trong horizontal track.'),
        {
          name: 'scrollHeight',
          title: 'Độ dài vùng scroll ngang',
          type: 'string',
          description: 'Ví dụ: 300vh, 350vh, 400vh. Dùng để chỉnh tốc độ trượt ngang.',
          initialValue: '300vh',
        },
      ],
    },
    {
      name: 'process',
      title: 'Process section',
      type: 'object',
      group: 'session3Process',
      fields: [
        imageField('backgroundImage', 'Ảnh nền session Process', 'Ảnh phủ nền của Process.'),
        textBlock('copy', 'Text chính', 'Eyebrow, title, description của Process.'),
        {
          name: 'steps',
          title: 'Các bước process',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', title: 'Số thứ tự', type: 'string' },
                { name: 'title', title: 'Tên bước', type: 'string' },
                { name: 'description', title: 'Mô tả', type: 'text', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'number' },
              },
            },
          ],
          validation: Rule => Rule.max(6),
        },
        {
          name: 'images',
          title: 'Ảnh phụ của Process',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          validation: Rule => Rule.max(4),
        },
      ],
    },
    {
      name: 'services',
      title: 'Services section',
      type: 'object',
      group: 'session4Services',
      fields: [
        imageField('backgroundImage', 'Ảnh nền session Services', 'Ảnh phủ nền của Services.'),
        textBlock('copy', 'Text chính', 'Eyebrow, title, description của Services.'),
        {
          name: 'items',
          title: 'Danh sách service',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(8),
        },
      ],
    },
    {
      name: 'about',
      title: 'About section',
      type: 'object',
      group: 'session5About',
      fields: [
        imageField('backgroundImage', 'Ảnh nền About', 'Ảnh nền phía sau About.'),
        imageField('portraitImage', 'Ảnh chân dung / ảnh chính About', 'Ảnh lớn của About.'),
        textBlock('copy', 'Text About', 'Eyebrow, title, description của About.'),
        {
          name: 'featureCards',
          title: '3 thẻ feature phía dưới About',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(3),
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact / CTA section',
      type: 'object',
      group: 'session6Contact',
      fields: [
        imageField('backgroundImage', 'Ảnh nền Contact', 'Ảnh phủ nền của Contact / CTA.'),
        textBlock('copy', 'Text Contact', 'Eyebrow, title, description của Contact.'),
        { name: 'buttonText', title: 'Text nút', type: 'string', initialValue: 'Contact Me' },
        { name: 'buttonLink', title: 'Link nút', type: 'string', initialValue: '/contact' },
        {
          name: 'supportingLines',
          title: 'Các dòng mô tả nhỏ',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(3),
        },
      ],
    },
    {
      name: 'notes',
      title: 'Ghi chú cho người nhập liệu',
      type: 'text',
      rows: 4,
      group: 'seo',
      description: 'Ghi chú nội bộ, không bắt buộc hiển thị ngoài website.',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Sessions',
        subtitle: 'Điều khiển ảnh và nội dung theo từng session',
      };
    },
  },
};
