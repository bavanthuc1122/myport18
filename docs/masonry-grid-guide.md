# Hướng dẫn sử dụng Masonry Grid

## Giới thiệu

Dự án này sử dụng thư viện `react-masonry-css` để tạo layout dạng lưới Masonry (kiểu Pinterest) cho trang portfolio. Masonry Grid là một kiểu layout trong đó các phần tử được sắp xếp theo chiều dọc tối ưu, giống như cách xếp gạch, tạo ra một giao diện đẹp mắt và hiệu quả.

## Cài đặt

Thư viện `react-masonry-css` đã được cài đặt trong dự án:

```bash
npm install react-masonry-css
```

## Cách sử dụng

### 1. Import thư viện

```jsx
import Masonry from 'react-masonry-css'
```

### 2. Thiết lập breakpoints

Định nghĩa số cột cho mỗi breakpoint:

```jsx
const breakpointColumns = {
  default: 6,  // Mặc định (màn hình lớn)
  1536: 5,     // 2xl
  1280: 4,     // xl
  1024: 3,     // lg
  768: 2,      // md
  640: 2,      // sm
}
```

### 3. Sử dụng component Masonry

```jsx
<Masonry
  breakpointCols={breakpointColumns}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
  {items.map((item) => (
    <div key={item.id} className="mb-2">
      {/* Nội dung item */}
    </div>
  ))}
</Masonry>
```

### 4. CSS cần thiết

Thêm CSS sau vào file CSS của bạn:

```css
.my-masonry-grid {
  display: flex;
  width: auto;
  margin-left: -8px; /* gutter size offset */
}

.my-masonry-grid_column {
  padding-left: 8px; /* gutter size */
  background-clip: padding-box;
}

.my-masonry-grid_column > div {
  margin-bottom: 8px;
}
```

## Tùy chỉnh

### Thay đổi khoảng cách giữa các item

Để thay đổi khoảng cách giữa các item, cập nhật các giá trị sau:

1. Trong CSS:
   - `margin-left` trong `.my-masonry-grid`
   - `padding-left` trong `.my-masonry-grid_column`
   - `margin-bottom` trong `.my-masonry-grid_column > div`

2. Đảm bảo các giá trị này khớp với nhau.

### Thay đổi số cột

Để thay đổi số cột cho mỗi breakpoint, cập nhật object `breakpointColumns`.

## Ví dụ

### Component MasonryGrid

```jsx
import Masonry from 'react-masonry-css'
import ImageCard from './ImageCard'

interface MasonryGridProps {
  items: {
    id: number;
    src: string;
    title: string;
    category: string;
  }[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const breakpointColumns = {
    default: 6,
    1536: 5, // 2xl
    1280: 4, // xl
    1024: 3, // lg
    768: 2,  // md
    640: 2,  // sm
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          <ImageCard
            src={item.src}
            alt={item.title}
            title={item.title}
            category={item.category}
          />
        </div>
      ))}
    </Masonry>
  )
}
```

### Component ImageCard

```jsx
import Image from "next/image"

export interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export default function ImageCard({ src, alt, title, category }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden">
      <div className="aspect-[3/4] w-full bg-white relative">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={600}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{category}</p>
        </div>
      </div>
    </div>
  )
}
```

## Lưu ý

- Đảm bảo mỗi item trong grid có một `key` duy nhất
- Sử dụng `loading="lazy"` cho các hình ảnh để cải thiện hiệu suất
- Điều chỉnh số cột phù hợp với nội dung và thiết kế của bạn
