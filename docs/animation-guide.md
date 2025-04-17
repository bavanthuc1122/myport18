# Hướng dẫn sử dụng Animation và Smooth Scroll

Dự án đã được tích hợp với Framer Motion và Locomotive Scroll để tạo trải nghiệm cuộn mượt và animation đẹp mắt. Dưới đây là hướng dẫn cách sử dụng các tính năng này.

## 1. Smooth Scroll với Locomotive Scroll

Locomotive Scroll đã được tích hợp vào dự án thông qua hook `useLocomotive`. Toàn bộ trang web đã được bọc trong `ScrollContainer` để kích hoạt cuộn mượt.

### Cách sử dụng:

1. **Đánh dấu section cần cuộn mượt:**

```jsx
<section data-scroll-section>
  {/* Nội dung của section */}
</section>
```

2. **Đánh dấu phần tử cần hiệu ứng khi cuộn:**

```jsx
<div data-scroll data-scroll-speed="2">
  {/* Phần tử này sẽ di chuyển với tốc độ khác khi cuộn */}
</div>
```

3. **Các thuộc tính data-scroll khác:**

- `data-scroll-speed`: Tốc độ di chuyển (số dương: di chuyển cùng chiều, số âm: di chuyển ngược chiều)
- `data-scroll-delay`: Độ trễ của hiệu ứng
- `data-scroll-direction`: Hướng di chuyển (horizontal, vertical)
- `data-scroll-class`: Class được thêm vào khi phần tử xuất hiện trong viewport

## 2. Animation với Framer Motion

Framer Motion đã được tích hợp để tạo các hiệu ứng animation mượt mà. Dự án đã có sẵn component `AnimatedSection` để dễ dàng sử dụng.

### Cách sử dụng AnimatedSection:

```jsx
<AnimatedSection 
  delay={0.2} 
  duration={0.8} 
  direction="up" 
  distance={50}
  className="your-class-name"
>
  {/* Nội dung cần animation */}
</AnimatedSection>
```

### Các tham số:

- `delay`: Thời gian trễ trước khi bắt đầu animation (giây)
- `duration`: Thời gian diễn ra animation (giây)
- `direction`: Hướng animation (up, down, left, right)
- `distance`: Khoảng cách di chuyển (pixel)

### Sử dụng Framer Motion trực tiếp:

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  {/* Nội dung cần animation */}
</motion.div>
```

## 3. Kết hợp Locomotive Scroll và Framer Motion

Để tạo hiệu ứng tốt nhất, bạn có thể kết hợp cả hai:

```jsx
<AnimatedSection 
  delay={0.2} 
  direction="up" 
  className="your-class-name"
  data-scroll-section
>
  <div data-scroll data-scroll-speed="-0.5">
    {/* Nội dung với hiệu ứng parallax */}
  </div>
</AnimatedSection>
```

## 4. Thêm CSS cho animation

Dự án đã có sẵn một số class CSS cho animation:

```css
.fade-in {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.fade-in.is-revealed {
  opacity: 1;
}

.slide-up {
  transform: translateY(50px);
  opacity: 0;
  transition: transform 1s ease-out, opacity 1s ease-out;
}

.slide-up.is-revealed {
  transform: translateY(0);
  opacity: 1;
}
```

Sử dụng:

```jsx
<div className="fade-in" data-scroll>
  {/* Nội dung sẽ hiện dần khi cuộn đến */}
</div>
```

## 5. Tùy chỉnh cấu hình Locomotive Scroll

Bạn có thể tùy chỉnh cấu hình Locomotive Scroll bằng cách truyền options vào hook `useLocomotive`:

```jsx
import useLocomotive from '@/hooks/useLocomotive';

// Trong component của bạn
const { containerRef, locomotiveInstance } = useLocomotive({
  smooth: true,
  multiplier: 0.5,
  lerp: 0.05,
});
```

## 6. Tạo hiệu ứng Parallax

```jsx
<div data-scroll data-scroll-speed="-2">
  {/* Phần tử này sẽ di chuyển ngược hướng cuộn với tốc độ gấp 2 lần */}
</div>
```

## 7. Lưu ý quan trọng

- Đảm bảo rằng mỗi section đều có thuộc tính `data-scroll-section`
- Sử dụng `data-scroll` cho các phần tử cần hiệu ứng khi cuộn
- Khi thêm/xóa phần tử động, cần gọi `locomotiveInstance.update()` để cập nhật Locomotive Scroll
- Tránh lồng nhiều `AnimatedSection` vào nhau để tránh xung đột animation
