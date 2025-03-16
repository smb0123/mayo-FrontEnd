import dynamic from 'next/dynamic';

const MainPageLayout = dynamic(() => import('@/components/page-layout/MainPageLayout/MainPageLayout'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function MainPage() {
  return <MainPageLayout />;
}
