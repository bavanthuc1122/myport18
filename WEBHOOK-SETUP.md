# Hướng dẫn cấu hình webhook trong Sanity CMS

Để website tự động cập nhật khi có thay đổi trong Sanity CMS, bạn cần cấu hình webhook trong Sanity. Dưới đây là các bước thực hiện:

## Bước 1: Tạo Secret Key

1. Tạo một secret key mạnh (có thể sử dụng [generator](https://randomkeygen.com/))
2. Cập nhật file `.env.local` với secret key này:
   ```
   SANITY_WEBHOOK_SECRET=your-generated-secret-key
   ```

## Bước 2: Cấu hình webhook trong Sanity

1. Đăng nhập vào [manage.sanity.io](https://manage.sanity.io/)
2. Chọn dự án của bạn
3. Đi đến tab "API"
4. Cuộn xuống phần "Webhooks" và nhấp vào "Add webhook"
5. Điền thông tin:
   - **Name**: "Revalidate Next.js Website"
   - **URL**: URL của API endpoint (ví dụ: https://yourwebsite.com/api/revalidate)
   - **Dataset**: Chọn dataset bạn đang sử dụng (thường là "production")
   - **Trigger on**: Chọn "Create", "Update", và "Delete"
   - **Filter**: Có thể để trống hoặc thêm filter nếu bạn chỉ muốn webhook kích hoạt cho một số loại nội dung cụ thể
   - **Secret**: Nhập secret key bạn đã tạo ở Bước 1
   - **HTTP method**: POST
   - **HTTP Headers**: Thêm header `Content-Type: application/json`
   - **Projection**: Để trống (mặc định)

## Bước 3: Kiểm tra webhook

1. Thực hiện một thay đổi nhỏ trong Sanity CMS (ví dụ: cập nhật tiêu đề của một mục)
2. Kiểm tra logs của website để xác nhận webhook đã được kích hoạt
3. Truy cập website để xác nhận thay đổi đã được cập nhật

## Xử lý sự cố

Nếu webhook không hoạt động:

1. Kiểm tra URL endpoint có chính xác không
2. Xác nhận secret key trong Sanity và trong `.env.local` giống nhau
3. Kiểm tra logs của website để xem lỗi cụ thể
4. Đảm bảo website đã được triển khai trên hosting hỗ trợ ISR và On-Demand Revalidation (như Vercel hoặc Netlify)

## Lưu ý

- Webhook chỉ hoạt động khi website đã được triển khai lên hosting
- Trong môi trường development, bạn vẫn cần làm mới trang để thấy thay đổi mới nhất
- Nếu bạn thay đổi cấu trúc dữ liệu trong Sanity, bạn có thể cần build lại website
