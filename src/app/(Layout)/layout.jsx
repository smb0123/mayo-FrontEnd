import ReactQueryProvider from '@/components/common/Provider/ReactQueryProvider';
import dynamic from 'next/dynamic';
import GoogleAnalytics from '../../lib/GoogleAnalytics';

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
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProvider>
          <div id="modal-root"></div>
          <DynamicLayout>{children}</DynamicLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
