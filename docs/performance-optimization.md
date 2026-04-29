# Tối ưu hóa hiệu suất cho Smooth Scroll và Animation

## Vấn đề

Trang web gặp vấn đề hiệu suất (giật lag, load chậm) sau khi thêm tính năng cuộn mượt và animation. Nguyên nhân chính bao gồm:

1. **Xử lý DOM quá nhiều**: Locomotive Scroll và Framer Motion thực hiện nhiều thao tác DOM
2. **CSS phức tạp**: Quá nhiều CSS và animation chạy cùng lúc
3. **Xung đột phiên bản thư viện**: Xung đột giữa các phiên bản thư viện
4. **Không tối ưu hóa hiệu suất**: Thiếu các kỹ thuật tối ưu hóa hiệu suất

## Giải pháp

### 1. Đơn giản hóa Locomotive Scroll

- **Giảm CSS**: Chỉ giữ lại CSS cần thiết
- **Tối ưu hóa cấu hình**: Điều chỉnh các tham số để tăng hiệu suất
- **Sử dụng requestAnimationFrame**: Đồng bộ với chu kỳ render của trình duyệt
- **Lazy loading**: Khởi tạo Locomotive Scroll sau khi DOM đã sẵn sàng

### 2. Tối ưu hóa Animation

- **Sử dụng Intersection Observer**: Thay vì useInView để giảm tải cho CPU
- **Đơn giản hóa animation**: Giảm độ phức tạp của animation
- **Giảm số lượng animation**: Chỉ animation các phần tử quan trọng
- **Hardware acceleration**: Sử dụng transform và opacity thay vì các thuộc tính khác

### 3. Tối ưu hóa CSS

- **will-change**: Báo trước cho trình duyệt về các thuộc tính sẽ thay đổi
- **transform: translateZ(0)**: Kích hoạt hardware acceleration
- **backface-visibility: hidden**: Giảm repaints
- **Giảm thời gian transition**: Từ 1s xuống 0.5s để tăng cảm giác mượt mà

### 4. Khắc phục xung đột phiên bản

- **Cập nhật date-fns**: Từ phiên bản 4.1.0 xuống 3.6.0 để tương thích với react-day-picker

## Các thay đổi đã thực hiện

### 1. hooks/useLocomotive.js

- Đơn giản hóa hook để tăng hiệu suất
- Giảm CSS không cần thiết
- Tối ưu hóa cấu hình Locomotive Scroll
- Sử dụng setTimeout để đảm bảo DOM đã sẵn sàng

### 2. components/scroll-container.jsx

- Loại bỏ AnimatePresence và motion.div không cần thiết
- Sử dụng requestAnimationFrame để cập nhật scroll
- Đơn giản hóa cấu trúc component

### 3. components/animated-section.jsx

- Sử dụng Intersection Observer thay vì useInView
- Đơn giản hóa animation variants
- Tối ưu hóa hiệu suất animation

### 4. app/globals.css

- Tối ưu hóa CSS cho hiệu suất tốt hơn
- Thêm các thuộc tính tối ưu hóa hiệu suất
- Giảm thời gian transition

### 5. package.json

- Cập nhật date-fns từ 4.1.0 xuống 3.6.0

## Cách kiểm tra hiệu suất

1. **Lighthouse**: Chạy Lighthouse trong Chrome DevTools để kiểm tra hiệu suất
2. **Performance tab**: Sử dụng tab Performance trong Chrome DevTools để phân tích
3. **FPS meter**: Bật FPS meter để kiểm tra số khung hình mỗi giây

## Các tối ưu hóa bổ sung (nếu cần)

1. **Code splitting**: Chia nhỏ bundle JavaScript
2. **Lazy loading components**: Chỉ tải các component khi cần
3. **Giảm số lượng re-render**: Sử dụng React.memo, useMemo, useCallback
4. **Tối ưu hóa hình ảnh**: Sử dụng next/image với kích thước phù hợp

## Lưu ý quan trọng

- Nếu vẫn gặp vấn đề hiệu suất, có thể cân nhắc loại bỏ hoàn toàn Locomotive Scroll và sử dụng CSS scroll-behavior: smooth thay thế
- Đảm bảo cài đặt các thư viện với phiên bản tương thích
- Sử dụng flag --legacy-peer-deps khi cần thiết
