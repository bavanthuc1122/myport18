import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { studioConfig } from '../../lib/studio/studio-config';

// Sử dụng dynamic import để tránh SSR
const StudioComponent = dynamic(
  () => import('next-sanity/studio').then((module) => module.NextStudio),
  { ssr: false }
);

// Thêm cấu hình cho trang Studio
const StudioPage: NextPage = () => {
  return (
    <StudioComponent
      config={studioConfig}
    />
  );
};

// Tắt SSR cho trang này
export const getServerSideProps = () => ({ props: {} });

export default StudioPage;
