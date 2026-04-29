# Portfolio CMS - Sanity Studio

## Giới thiệu

Đây là Sanity Studio cho website Portfolio. Sanity Studio là một CMS (Content Management System) mạnh mẽ cho phép quản lý nội dung website một cách dễ dàng.

## Cách sử dụng

### Khởi động Sanity Studio

```bash
# Khởi động Sanity Studio
npm run dev
```

> **Lưu ý**: Cấu hình hiện tại đã được cập nhật để hỗ trợ upload file lớn (lên đến 100MB) trực tiếp với lệnh `npm run dev` thông thường.

### Upload video

Sanity Studio hỗ trợ hai cách để thêm video vào các phần của website:

1. **URL YouTube**: Nhập URL video YouTube vào trường "URL Video YouTube"
2. **Upload trực tiếp**: Upload file video trực tiếp từ máy tính của bạn

Để upload video trực tiếp:

1. Khởi động Sanity Studio với lệnh `npm run dev`
2. Chọn phần bạn muốn thêm video (Gallery Highlights, About Section, CTA Section)
3. Chọn "Loại nền" là "Video"
4. Sử dụng trường "Video File" để upload video từ máy tính của bạn

### Lưu ý khi upload video

- Kích thước tối đa cho video là 100MB
- Định dạng khuyến nghị: MP4
- Nếu video quá lớn, nên sử dụng URL YouTube thay vì upload trực tiếp

## Triển khai

```bash
# Triển khai Sanity Studio
npm run deploy
```

> **Lưu ý**: Cấu hình hiện tại đã được cập nhật để hỗ trợ upload file lớn (lên đến 100MB) khi triển khai.

## Hướng dẫn chi tiết

Các hướng dẫn chi tiết về cách sử dụng Sanity Studio:

- [Hướng dẫn sử dụng tổng quát](./USAGE_GUIDE.md)
- [Hướng dẫn cấu hình Video](./docs/VIDEO_GUIDE.md)


## Tài liệu tham khảo

- [Tài liệu Sanity](https://www.sanity.io/docs)
- [Cộng đồng Sanity Slack](https://slack.sanity.io/)
