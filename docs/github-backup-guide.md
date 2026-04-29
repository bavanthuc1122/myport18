# Hướng dẫn backup lên GitHub

## Bước 1: Tạo repository trên GitHub

1. Đăng nhập vào tài khoản GitHub của bạn
2. Nhấp vào nút "+" ở góc trên bên phải và chọn "New repository"
3. Đặt tên cho repository (ví dụ: "photography-portfolio")
4. Chọn "Public" hoặc "Private" tùy theo nhu cầu của bạn
5. Không chọn "Initialize this repository with a README"
6. Nhấp vào "Create repository"

## Bước 2: Push code lên GitHub

Sau khi tạo repository, GitHub sẽ hiển thị hướng dẫn để push code lên. Hãy chạy các lệnh sau trong terminal:

```bash
git remote add origin https://github.com/username/photography-portfolio.git
git branch -M main
git push -u origin main
```

Thay thế `username` bằng tên người dùng GitHub của bạn và `photography-portfolio` bằng tên repository bạn đã tạo.

## Bước 3: Xác thực (nếu cần)

Nếu bạn chưa cấu hình xác thực GitHub, bạn có thể được yêu cầu nhập tên người dùng và mật khẩu GitHub. Nếu bạn đã bật xác thực hai yếu tố, bạn sẽ cần tạo một personal access token:

1. Truy cập https://github.com/settings/tokens
2. Nhấp vào "Generate new token"
3. Đặt tên cho token và chọn phạm vi "repo"
4. Nhấp vào "Generate token"
5. Sao chép token và sử dụng nó làm mật khẩu khi được yêu cầu

## Bước 4: Kiểm tra

Sau khi push thành công, truy cập repository của bạn trên GitHub để xác nhận rằng code đã được backup thành công.

## Các lệnh Git hữu ích

- Kiểm tra trạng thái: `git status`
- Thêm tất cả các thay đổi: `git add .`
- Commit các thay đổi: `git commit -m "Mô tả thay đổi"`
- Push lên GitHub: `git push`
- Pull từ GitHub: `git pull`
