# Hướng dẫn sử dụng Sanity CMS với Next.js

## Giới thiệu

Tài liệu này hướng dẫn cách sử dụng Sanity CMS để quản lý nội dung cho trang web Next.js. Chúng tôi đã cấu hình Sanity CMS để quản lý nội dung cho các trang chính của website: Home, Portfolio, BTS và Contact.

## Cấu trúc dự án

```
my-port/
├── app/                  # Next.js app
├── components/           # React components
├── lib/                  # Thư viện và tiện ích
│   └── sanity.js         # Cấu hình Sanity Client
├── public/               # Tài nguyên tĩnh
└── sanity/               # Sanity Studio
    └── schemaTypes/      # Schema cho Sanity CMS
```

## Cách truy cập Sanity Studio

1. **Truy cập trực tuyến**: https://8ucvng19.sanity.studio/
2. **Chạy cục bộ**:
   ```bash
   cd sanity
   npm run dev
   ```
   Sau đó truy cập: http://localhost:3335

## Cách sử dụng Sanity CMS

### 1. Quản lý Hero Section

1. Truy cập **Home Page > Hero Section**
2. Tạo mới hoặc chỉnh sửa Hero Section:
   - **Media Type**: Chọn Image hoặc Video
   - **Background Image**: Tải lên hình nền (khi chọn Image)
   - **Video URL/File**: Thêm URL video hoặc tải lên file video (khi chọn Video)
   - **Title**: Tiêu đề chính
   - **Subtitle**: Tiêu đề phụ
   - **Background Overlay**: Bật/tắt lớp overlay tối

### 2. Quản lý Portfolio Preview

1. Truy cập **Home Page > Portfolio Preview**
2. Tạo mới hoặc chỉnh sửa Portfolio Preview:
   - **Title**: Tiêu đề chính (h2)
   - **Subtitle1**: Tiêu đề phụ 1 (h3)
   - **Subtitle2**: Tiêu đề phụ 2 (p)
   - **Preview Images**: Thêm 3 hình ảnh với:
     - **Image**: Tải lên hình ảnh
     - **Alt Text**: Văn bản thay thế
     - **Link URL**: URL khi người dùng click vào hình ảnh
   - **Portfolio Link**: Link đến trang portfolio

### 3. Quản lý Portfolio Items

1. Truy cập **Portfolio > Categories** để tạo các danh mục
2. Truy cập **Portfolio > Portfolio Items** để thêm các mục portfolio:
   - **Title**: Tên của mục portfolio
   - **Image Source**: Chọn Upload Image hoặc External URL
   - **Cover Image**: Tải lên hình ảnh bìa (khi chọn Upload Image)
   - **Image URL**: Nhập URL hình ảnh (khi chọn External URL)
   - **Behance Link**: Link đến album Behance
   - **Category**: Chọn danh mục

## Cách hiển thị nội dung từ Sanity trong Next.js

### 1. Truy vấn dữ liệu

```javascript
// Trong file app/page.tsx hoặc bất kỳ component nào
import { getHeroSection, getPortfolioPreview } from "@/lib/sanity"

export default async function Home() {
  // Fetch data from Sanity
  const heroData = await getHeroSection()
  const portfolioData = await getPortfolioPreview()
  
  // Sử dụng dữ liệu trong component
  return (
    // ...
  )
}
```

### 2. Hiển thị hình ảnh

```jsx
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

// Trong component
<Image
  src={urlFor(heroData.backgroundImage).width(1920).height(1080).url()}
  alt={heroData.title || 'Hero image'}
  fill
  className="object-cover"
  priority
/>
```

### 3. Hiển thị video

```jsx
// Video từ URL
{heroData.videoUrl && (
  <iframe
    src={heroData.videoUrl}
    title={heroData.title || 'Hero video'}
    className="w-full h-full object-cover"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
)}

// Video tải lên
{heroData.videoFile?.asset?.url && (
  <video
    src={heroData.videoFile.asset.url}
    className="w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  />
)}
```

### 4. Hiển thị danh mục và lọc

```jsx
// Trong component client
const [categories, setCategories] = useState([])
const [selectedCategory, setSelectedCategory] = useState('all')
const [items, setItems] = useState([])

// Tải danh mục
useEffect(() => {
  const fetchData = async () => {
    const categoriesData = await getAllCategories()
    setCategories([{ _id: 'all', title: 'All' }, ...categoriesData])
    
    const portfolioData = await getAllPortfolioItems()
    setItems(portfolioData)
  }
  fetchData()
}, [])

// Lọc theo danh mục
const handleCategoryChange = async (categoryId) => {
  if (categoryId === 'all') {
    const portfolioData = await getAllPortfolioItems()
    setItems(portfolioData)
  } else {
    const filteredData = await getPortfolioItemsByCategory(categoryId)
    setItems(filteredData)
  }
  setSelectedCategory(categoryId)
}

// Hiển thị danh mục
<div className="flex justify-center gap-12 mb-16">
  {categories.map((category) => (
    <button
      key={category._id}
      className={`text-base ${selectedCategory === category._id ? 'text-white' : 'text-gray-400'}`}
      onClick={() => handleCategoryChange(category._id)}
    >
      {category.title}
    </button>
  ))}
</div>
```

## Lưu ý quan trọng

1. **Xử lý hình ảnh**:
   - Luôn sử dụng `urlFor()` để tạo URL cho hình ảnh từ Sanity
   - Chỉ định kích thước hình ảnh để tối ưu hiệu suất

2. **Xử lý lỗi**:
   - Luôn thêm xử lý lỗi khi truy vấn dữ liệu từ Sanity
   - Sử dụng optional chaining (`?.`) khi truy cập các thuộc tính có thể không tồn tại

3. **Fallback**:
   - Luôn cung cấp giá trị mặc định cho trường hợp không có dữ liệu từ Sanity
   - Sử dụng toán tử `||` để cung cấp giá trị mặc định

4. **Tối ưu hóa**:
   - Sử dụng Next.js Image component để tối ưu hóa hình ảnh
   - Sử dụng lazy loading cho hình ảnh không nằm trong viewport ban đầu
