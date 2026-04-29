# Hướng dẫn sử dụng CSS Animation đơn giản

## Giới thiệu

Dự án này sử dụng CSS thuần túy kết hợp với Intersection Observer API để tạo animation đơn giản, hiệu quả và có hiệu suất cao. Giải pháp này được đánh giá cao bởi các nhà phát triển vì:

1. **Hiệu suất tối đa**: Sử dụng CSS native thay vì JavaScript nặng
2. **Đơn giản**: Dễ hiểu và dễ bảo trì
3. **Tương thích tốt**: Hoạt động trên hầu hết các trình duyệt hiện đại
4. **Không phụ thuộc**: Không phụ thuộc vào các thư viện bên thứ ba

## Cách hoạt động

### 1. CSS Smooth Scroll

Smooth scroll được thiết lập thông qua CSS:

```css
html {
  scroll-behavior: smooth;
}
```

### 2. Animation đơn giản

Các animation được thực hiện thông qua CSS transitions:

```css
.animated-section {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 3. Intersection Observer

Intersection Observer được sử dụng để phát hiện khi phần tử xuất hiện trong viewport:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(element);
```

## Cách sử dụng

### 1. Tạo section với animation

```jsx
import AnimatedSection from '@/components/animated-section';

export default function HomePage() {
  return (
    <main>
      <AnimatedSection className="hero-section">
        {/* Nội dung hero section */}
      </AnimatedSection>
      
      <AnimatedSection className="about-section">
        {/* Nội dung about section */}
      </AnimatedSection>
    </main>
  );
}
```

### 2. Cuộn đến một section cụ thể

```jsx
<a href="#section-id">Cuộn đến section</a>

// Section đích
<AnimatedSection id="section-id" className="target-section">
  {/* Nội dung */}
</AnimatedSection>
```

## Ưu điểm so với các giải pháp khác

| Tính năng | CSS Animation | Framer Motion | GSAP |
|-----------|---------------|---------------|------|
| Hiệu suất | Rất cao | Trung bình | Cao |
| Tương thích | >95% trình duyệt | >90% trình duyệt | >95% trình duyệt |
| Kích thước | Rất nhỏ | Lớn | Trung bình |
| Tùy biến | Trung bình | Cao | Rất cao |
| Độ phức tạp | Rất thấp | Trung bình | Cao |
| Bảo trì | Rất dễ | Trung bình | Khó |

## Lưu ý

- Nếu cần animation phức tạp hơn, có thể xem xét thêm GSAP sau khi đã đảm bảo hiệu suất cơ bản
- Intersection Observer không hoạt động trên một số trình duyệt cũ, nhưng có thể sử dụng polyfill nếu cần
- Luôn đặt hiệu suất lên hàng đầu, đặc biệt là trên thiết bị di động
