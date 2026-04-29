# Hướng dẫn sử dụng CSS Smooth Scroll

## Giới thiệu

Dự án này sử dụng CSS `scroll-behavior: smooth` để tạo trải nghiệm cuộn mượt mà mà không cần thư viện JavaScript phức tạp. Giải pháp này được đánh giá cao bởi các nhà phát triển vì:

1. **Hiệu suất cao**: Sử dụng CSS native thay vì JavaScript nặng
2. **Tương thích tốt**: Hoạt động trên hầu hết các trình duyệt hiện đại
3. **Dễ bảo trì**: Không phụ thuộc vào thư viện bên thứ ba
4. **Đơn giản**: Dễ hiểu và dễ triển khai

## Cách hoạt động

### 1. CSS Smooth Scroll

Smooth scroll được thiết lập thông qua CSS:

```css
html {
  scroll-behavior: smooth;
}
```

### 2. Animation đơn giản

Các animation được thực hiện thông qua CSS transitions và Intersection Observer API:

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

| Tính năng | CSS Smooth Scroll | Locomotive Scroll | GSAP ScrollTrigger |
|-----------|-------------------|-------------------|-------------------|
| Hiệu suất | Rất cao | Trung bình | Cao |
| Tương thích | >95% trình duyệt | >90% trình duyệt | >95% trình duyệt |
| Kích thước | Rất nhỏ | Lớn | Trung bình |
| Tùy biến | Trung bình | Cao | Rất cao |
| Độ phức tạp | Rất thấp | Cao | Trung bình |
| Bảo trì | Dễ | Khó | Trung bình |

## Lưu ý

- CSS `scroll-behavior: smooth` không hoạt động trên Safari iOS < 15.4
- Nếu cần hỗ trợ trình duyệt cũ hơn, có thể sử dụng polyfill: [smoothscroll-polyfill](https://github.com/iamdustan/smoothscroll)
- Nếu cần animation phức tạp hơn, có thể xem xét thêm GSAP sau khi đã đảm bảo hiệu suất cơ bản
