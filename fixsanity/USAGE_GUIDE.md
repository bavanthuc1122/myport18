# Hướng dẫn sử dụng Sanity Studio

## Mục lục
1. [Cấu hình Video Background](#cấu-hình-video-background)
2. [Cấu hình Gallery](#cấu-hình-gallery)
3. [Các lưu ý quan trọng](#các-lưu-ý-quan-trọng)

## Cấu hình Video Background

Sanity Studio cho phép bạn thêm video background vào các phần khác nhau của website (Hero Section, About Section, Gallery Highlights, CTA Section). Có hai cách để thêm video:

### Cách 1: Upload video trực tiếp

1. Mở phần bạn muốn thêm video (ví dụ: Gallery Highlights)
2. Trong tab "Nền", chọn "Loại nền" là "Video"
3. Cuộn xuống và tìm trường "Video File"
4. Nhấp vào "Upload" và chọn file video từ máy tính của bạn
   - **Kích thước tối đa**: 100MB
   - **Định dạng khuyến nghị**: MP4

![Upload Video](https://via.placeholder.com/800x400?text=Upload+Video+Screenshot)

### Cách 2: Sử dụng YouTube URL

1. Mở phần bạn muốn thêm video (ví dụ: Gallery Highlights)
2. Trong tab "Nền", chọn "Loại nền" là "Video"
3. Tìm trường "URL Video YouTube"
4. Dán URL YouTube vào trường này
   - **Hỗ trợ dạng đầy đủ**: `https://www.youtube.com/watch?v=XXXX`
   - **Hỗ trợ dạng rút gọn**: `https://youtu.be/XXXX`

![YouTube URL](https://via.placeholder.com/800x400?text=YouTube+URL+Screenshot)

### Lưu ý về Video Background

- Nếu bạn cung cấp cả video upload và YouTube URL, hệ thống sẽ ưu tiên sử dụng video upload
- Video sẽ tự động phát, tắt tiếng, lặp lại và điều chỉnh kích thước để phù hợp với container
- Đối với YouTube video, logo YouTube sẽ được ẩn bằng overlay

## Cấu hình Gallery

Gallery Highlights cho phép bạn hiển thị bộ sưu tập hình ảnh với layout masonry đẹp mắt. Dưới đây là cách cấu hình:

### Thêm hình ảnh vào Gallery

1. Mở phần "Gallery Highlights"
2. Chuyển đến tab "Hình ảnh"
3. Tìm trường "Hình ảnh gallery"
4. Nhấp vào "Thêm item" để thêm hình ảnh mới (tối đa 4 hình)
5. Cho mỗi hình ảnh, bạn có thể cấu hình:
   - **Hình ảnh**: Upload hình ảnh từ máy tính
   - **Mô tả hình ảnh (alt)**: Văn bản thay thế khi hình ảnh không tải được
   - **Tiêu đề hình ảnh**: Hiển thị khi hover
   - **Mô tả**: Thêm mô tả ngắn về hình ảnh
   - **Đường dẫn liên kết**: URL khi người dùng nhấp vào hình ảnh
   - **Chiều cao (Masonry)**: Giá trị từ 30-45 để điều chỉnh chiều cao của item

![Gallery Configuration](https://via.placeholder.com/800x400?text=Gallery+Configuration+Screenshot)

### Điều chỉnh chiều cao của Gallery Item

Trường "Chiều cao (Masonry)" cho phép bạn điều chỉnh chiều cao của mỗi item trong gallery:

- **Giá trị thấp (30-35)**: Item ngắn hơn
- **Giá trị trung bình (35-40)**: Item chiều cao trung bình
- **Giá trị cao (40-45)**: Item cao hơn

Điều chỉnh các giá trị này để tạo layout masonry đa dạng và hấp dẫn.

### Tạo hiệu ứng Hover

Để tạo hiệu ứng hover đẹp mắt cho gallery item:

1. Thêm "Tiêu đề hình ảnh" để hiển thị tiêu đề khi hover
2. Thêm "Mô tả" để hiển thị mô tả ngắn khi hover
3. Nếu muốn item có thể nhấp được, thêm "Đường dẫn liên kết"

Khi người dùng di chuột qua hình ảnh, họ sẽ thấy overlay với tiêu đề và mô tả.

## Các lưu ý quan trọng

### Kích thước file và hiệu suất

- **Video**: Nên giữ kích thước video dưới 50MB để tối ưu hiệu suất tải trang
- **Hình ảnh**: Nên sử dụng hình ảnh có kích thước phù hợp (tối đa 2000px chiều rộng)
- **Định dạng hình ảnh**: Ưu tiên sử dụng định dạng WebP hoặc JPEG với nén hợp lý

### Tối ưu hóa nội dung

- **Tiêu đề và mô tả**: Giữ ngắn gọn và súc tích
- **Alt text**: Luôn cung cấp alt text có ý nghĩa cho hình ảnh để tối ưu SEO
- **Liên kết**: Đảm bảo tất cả các liên kết đều hoạt động và dẫn đến trang đích phù hợp

### Lưu và xuất bản

Đừng quên nhấp vào nút "Lưu" sau khi thực hiện các thay đổi, và "Xuất bản" khi bạn muốn các thay đổi xuất hiện trên website.

![Save and Publish](https://via.placeholder.com/800x400?text=Save+and+Publish+Screenshot)

---

Nếu bạn có bất kỳ câu hỏi nào về cách sử dụng Sanity Studio, vui lòng liên hệ với quản trị viên hệ thống.
