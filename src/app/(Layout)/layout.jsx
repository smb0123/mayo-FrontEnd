import ReactQueryProvider from '@/components/common/Provider/ReactQueryProvider';
import dynamic from 'next/dynamic';

import '@/styles/_reset.scss';

export const metadata = {
  title: 'mayo',
  description: '마요 사이트',
};

const DynamicLayout = dynamic(() => import('@/components/common/Layout/Layout'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <div id="modal-root"></div>
          <DynamicLayout>{children}</DynamicLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
