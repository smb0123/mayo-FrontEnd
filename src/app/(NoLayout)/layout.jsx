import ReactQueryProvider from '@/components/common/Provider/ReactQueryProvider';
import GoogleAnalytics from '../../lib/GoogleAnalytics';

import '@/styles/_reset.scss';

export const metadata = {
  title: 'mayo',
  description: '마요 사이트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProvider>
          <div id="modal-root"></div>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
