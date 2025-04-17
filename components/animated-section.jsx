"use client";

export default function AnimatedSection({
  children,
  className = "",
  delay = 0.2,
  direction = "up",
  ...props
}) {
  // Đơn giản hóa hoàn toàn, chỉ render section bình thường
  return (
    <section
      className={className}
      {...props}
    >
      {children}
    </section>
  );
}
