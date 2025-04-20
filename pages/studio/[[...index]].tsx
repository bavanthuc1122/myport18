import { NextStudio } from 'next-sanity/studio';
import config from '../../sanity/sanity.config';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

// Thêm metadata cho trang
export const metadata = {
  title: 'Sanity Studio',
  description: 'Admin dashboard for content management',
};

// Thêm cấu hình cho trang Studio
const StudioPage: NextPage = () => {
  // Sử dụng client-side rendering để tránh lỗi hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <NextStudio config={config} />;
};

export default StudioPage;
