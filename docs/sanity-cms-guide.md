# Hướng dẫn sử dụng Sanity CMS

## Giới thiệu

Sanity CMS đã được cấu hình để quản lý nội dung cho trang web của bạn. CMS được tổ chức thành các nhóm tương ứng với các trang chính của website:

1. **Home Page**: Quản lý 3 section của trang chủ
2. **Portfolio**: Quản lý danh mục và các mục portfolio
3. **Behind The Scenes (BTS)**: Quản lý nội dung trang BTS
4. **Contact**: Quản lý thông tin liên hệ

## Truy cập Sanity Studio

Để truy cập Sanity Studio, bạn có thể:

1. Chạy lệnh sau trong thư mục dự án:
   ```
   cd sanity
   npm run dev
   ```

2. Truy cập địa chỉ: http://localhost:3335

## Cấu trúc CMS

### 1. Home Page

Trang chủ được chia thành 3 section:

#### Hero Section
- **Title**: Tiêu đề chính hiển thị trên hero section
- **Subtitle**: Tiêu đề phụ (nếu có)
- **Media Type**: Chọn loại media (hình ảnh hoặc video)
- **Background Image**: Tải lên hình nền (hiển thị khi chọn Image)
- **Video URL**: Nhập URL video từ YouTube, Vimeo hoặc nguồn khác (hiển thị khi chọn Video)
- **Video File**: Tải lên file video trực tiếp (hiển thị khi chọn Video)
- **Background Overlay**: Bật/tắt lớp overlay tối trên hình nền/video

#### About Us Section
- **Title**: Tiêu đề của section
- **Subtitle**: Tiêu đề phụ
- **Description**: Mô tả chi tiết
- **Main Image**: Hình ảnh chính
- **Gallery Images**: Các hình ảnh trong gallery (tối đa 6 hình)
- **Skills**: Danh sách các kỹ năng
- **Portfolio Link**: Link đến trang portfolio

#### Portfolio Preview
- **Title**: Tiêu đề chính (cập nhật cho thẻ h2)
- **Subtitle1**: Tiêu đề phụ 1 (cập nhật cho thẻ h3)
- **Subtitle2**: Tiêu đề phụ 2 (cập nhật cho thẻ p)
- **Preview Images**: 3 hình ảnh xem trước (yêu cầu đúng 3 hình)
  - **Image**: Tải lên hình ảnh
  - **Alt Text**: Văn bản thay thế cho hình ảnh
  - **Link URL**: URL khi người dùng click vào hình ảnh
- **Portfolio Link**: Link đến trang portfolio

### 2. Portfolio

Portfolio được tổ chức thành hai phần:

#### Categories
- **Title**: Tên danh mục
- **Description**: Mô tả về danh mục

#### Portfolio Items
- **Title**: Tên của mục portfolio
- **Image Source**: Chọn nguồn hình ảnh (tải lên hoặc URL bên ngoài)
- **Cover Image**: Tải lên hình ảnh bìa (hiển thị khi chọn Upload Image)
- **Image URL**: Nhập URL của hình ảnh (hiển thị khi chọn External URL)
- **Behance Link**: Link đến album Behance tương ứng
- **Category**: Danh mục của mục portfolio
- **Published at**: Ngày xuất bản

### 3. Behind The Scenes (BTS)

BTS được tổ chức thành hai phần:

#### BTS Page Settings
- **Title**: Tiêu đề của trang BTS
- **Description**: Mô tả về trang BTS
- **Header Image**: Hình ảnh header

#### BTS Items
- **Title**: Tên của mục BTS
- **Description**: Mô tả chi tiết
- **Main Image**: Hình ảnh chính
- **Gallery Images**: Các hình ảnh trong gallery
- **Related Portfolio Item**: Liên kết đến mục portfolio liên quan
- **Published at**: Ngày xuất bản

### 4. Contact

Quản lý thông tin liên hệ:

- **Page Title**: Tiêu đề của trang liên hệ
- **Page Description**: Mô tả về trang liên hệ
- **Background Image**: Hình nền cho trang liên hệ
- **Email**: Địa chỉ email liên hệ
- **Phone**: Số điện thoại liên hệ
- **Address**: Địa chỉ
- **Social Media Links**: Các liên kết mạng xã hội (Instagram, Facebook, Behance, LinkedIn)

## Hướng dẫn sử dụng

### Thêm mục Portfolio mới

1. Truy cập vào **Portfolio > Portfolio Items**
2. Nhấp vào nút "Create new Portfolio Item"
3. Điền thông tin:
   - **Title**: Tên của mục portfolio
   - **Cover Image**: Tải lên hình ảnh bìa (đây là hình ảnh duy nhất bạn cần tải lên)
   - **Behance Link**: Nhập link đến album Behance tương ứng
   - **Category**: Chọn danh mục từ danh sách đã tạo
   - **Published at**: Ngày xuất bản (mặc định là ngày hiện tại)
4. Nhấp vào nút "Publish" để lưu

### Thêm danh mục mới

1. Truy cập vào **Portfolio > Categories**
2. Nhấp vào nút "Create new Category"
3. Điền thông tin:
   - **Title**: Tên danh mục
   - **Description**: Mô tả về danh mục
4. Nhấp vào nút "Publish" để lưu

### Cập nhật trang chủ

1. Truy cập vào **Home Page**
2. Chọn section bạn muốn cập nhật (Hero Section, About Us Section, hoặc Portfolio Preview)
3. Cập nhật nội dung theo mong muốn
4. Nhấp vào nút "Publish" để lưu

## Lưu ý quan trọng

1. **Portfolio Items**:
   - Chỉ cần tải lên hình ảnh bìa, không cần tải lên tất cả hình ảnh trong album
   - Nhập link Behance để khi người dùng nhấp vào hình ảnh hoặc tiêu đề, họ sẽ được chuyển hướng đến album Behance

2. **Categories**:
   - Tạo các danh mục trước khi thêm các mục portfolio
   - Mỗi mục portfolio phải thuộc về một danh mục

3. **Hình ảnh**:
   - Sử dụng hình ảnh có kích thước phù hợp để tối ưu hiệu suất
   - Có thể điều chỉnh "hotspot" của hình ảnh để kiểm soát cách hiển thị khi cắt hình

4. **Xuất bản**:
   - Luôn nhớ nhấp vào nút "Publish" sau khi thực hiện các thay đổi
   - Các thay đổi chưa được xuất bản sẽ không hiển thị trên trang web
