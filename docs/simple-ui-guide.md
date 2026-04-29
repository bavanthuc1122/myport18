# Hướng dẫn UI đơn giản

## Giới thiệu

Dự án này sử dụng UI đơn giản với Tailwind CSS và React. Chúng tôi đã loại bỏ tất cả các thư viện animation phức tạp để đảm bảo hiệu suất tối đa và tránh các lỗi không cần thiết.

## Cấu trúc trang

Trang web bao gồm các phần chính:

1. **Hero Section**: Hiển thị hình ảnh chính và tiêu đề
2. **About Us Section**: Hiển thị thông tin về nhiếp ảnh gia và kỹ năng
3. **Portfolio Preview**: Hiển thị xem trước các hình ảnh trong portfolio

## Component chính

### AnimatedSection

Component `AnimatedSection` được sử dụng để bọc các section. Nó đơn giản chỉ render một thẻ `<section>` với các props được truyền vào.

```jsx
<AnimatedSection className="relative h-screen w-full">
  {/* Nội dung section */}
</AnimatedSection>
```

### AboutUs

Component `AboutUs` hiển thị thông tin về nhiếp ảnh gia và kỹ năng. Nó bao gồm một hình ảnh bên trái và một grid hình ảnh bên phải.

## CSS

CSS được tổ chức thành các phần:

1. **CSS cơ bản**: Thiết lập màu sắc và font chữ
2. **Section styles**: Thiết lập kích thước và layout cho các section
3. **Component styles**: Thiết lập style cho các component cụ thể như nav-link, image-card, v.v.

## Thêm section mới

Để thêm một section mới, bạn có thể sử dụng mẫu sau:

```jsx
<AnimatedSection className="relative h-screen w-full">
  {/* Background (nếu cần) */}
  <div className="absolute inset-0 bg-black/80 z-0"></div>
  
  {/* Nội dung */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <h2 className="text-3xl lg:text-4xl text-center font-light mb-16">Tiêu đề section</h2>
    
    {/* Nội dung chính */}
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Nội dung bên trái */}
      <div className="w-full lg:w-1/2">
        {/* ... */}
      </div>
      
      {/* Nội dung bên phải */}
      <div className="w-full lg:w-1/2">
        {/* ... */}
      </div>
    </div>
  </div>
</AnimatedSection>
```

## Thêm hình ảnh

Để thêm hình ảnh, sử dụng component `Image` của Next.js:

```jsx
<Image
  src="/path/to/image.jpg"
  alt="Mô tả hình ảnh"
  width={500}
  height={300}
  className="object-cover"
/>
```

## Thêm video background

Để thêm video background, bạn có thể sử dụng mẫu sau:

```jsx
<div className="absolute inset-0 z-0 overflow-hidden">
  <video 
    autoPlay 
    loop 
    muted 
    className="absolute w-full h-full object-cover"
  >
    <source src="/videos/your-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-black/50"></div>
</div>
```

## Responsive

Trang web đã được thiết kế để responsive trên tất cả các thiết bị. Chúng tôi sử dụng các breakpoint của Tailwind CSS:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px
