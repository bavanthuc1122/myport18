# Hướng dẫn thêm Video Background

## 1. Thêm Video Background cho AboutUs Section

Để thêm video background cho section AboutUs, hãy thay thế đoạn code sau trong file `components/homesessionabout/page.tsx`:

```jsx
{/* Background container - sẽ được thay thế bằng ảnh hoặc video */}
<div className="absolute inset-0 bg-gray-500/90 z-0"></div>
```

bằng đoạn code sau:

```jsx
{/* Video Background */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <video 
    autoPlay 
    loop 
    muted 
    className="absolute w-full h-full object-cover"
  >
    <source src="/videos/your-video-file.mp4" type="video/mp4" />
    {/* Fallback cho trình duyệt không hỗ trợ video */}
    Your browser does not support the video tag.
  </video>
  {/* Overlay để làm tối video và làm nổi bật nội dung */}
  <div className="absolute inset-0 bg-black/50"></div>
</div>
```

## 2. Thêm Video Background cho Portfolio Preview Section

Để thêm video background cho section Portfolio Preview, hãy thay thế đoạn code sau trong file `app/page.tsx`:

```jsx
{/* Background container - sẽ được thay thế bằng ảnh hoặc video */}
<div className="absolute inset-0 bg-black/80 z-0"></div>
```

bằng đoạn code sau:

```jsx
{/* Video Background */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <video 
    autoPlay 
    loop 
    muted 
    className="absolute w-full h-full object-cover"
  >
    <source src="/videos/your-portfolio-video.mp4" type="video/mp4" />
    {/* Fallback cho trình duyệt không hỗ trợ video */}
    Your browser does not support the video tag.
  </video>
  {/* Overlay để làm tối video và làm nổi bật nội dung */}
  <div className="absolute inset-0 bg-black/60"></div>
</div>
```

## 3. Thêm Ảnh Background thay vì Video

Nếu muốn sử dụng ảnh thay vì video, hãy thay thế bằng đoạn code sau:

```jsx
{/* Image Background */}
<div className="absolute inset-0 z-0">
  <Image
    src="/images/your-background-image.jpg"
    alt="Background"
    fill
    className="object-cover"
    priority
  />
  {/* Overlay để làm tối ảnh và làm nổi bật nội dung */}
  <div className="absolute inset-0 bg-black/50"></div>
</div>
```

## 4. Lưu ý quan trọng

1. Đặt video/ảnh của bạn trong thư mục:
   - `/public/videos/` cho video
   - `/public/images/` cho ảnh

2. Đảm bảo video có kích thước nhỏ để trang web tải nhanh:
   - Nén video trước khi sử dụng
   - Sử dụng độ phân giải phù hợp (1080p là đủ)
   - Xem xét sử dụng định dạng WebM cho kích thước file nhỏ hơn

3. Điều chỉnh độ mờ của overlay (`bg-black/50`) để phù hợp với video/ảnh của bạn:
   - Tăng giá trị (ví dụ: `bg-black/70`) để làm tối hơn
   - Giảm giá trị (ví dụ: `bg-black/30`) để làm sáng hơn

4. Đảm bảo tạo thư mục `/public/videos/` và `/public/images/` nếu chưa có
