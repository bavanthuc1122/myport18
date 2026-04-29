'use client';

import React, { ReactNode } from 'react';
import { ScrollProvider } from './scroll';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ScrollProvider
      options={{
        smooth: true,
        lerp: 0.05, // Giảm xuống để cuộn mượt hơn
        multiplier: 0.8, // Giảm tốc độ cuộn xuống một chút
        class: 'is-revealed',
        scrollFromAnywhere: true, // Cho phép cuộn từ bất kỳ đâu
        touchMultiplier: 2, // Tăng độ nhạy khi cuộn trên thiết bị cảm ứng
        smoothMobile: true, // Đảm bảo cuộn mượt trên thiết bị di động
        smartphone: {
          smooth: true,
          multiplier: 0.8,
          touchMultiplier: 2,
        },
        tablet: {
          smooth: true,
          multiplier: 0.8,
          touchMultiplier: 2,
        },
      }}
    >
      {children}
    </ScrollProvider>
  );
};

export default ClientLayout;
