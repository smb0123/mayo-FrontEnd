import Layout from '@/components/common/Layout/Layout';
import ReactQueryProvider from '@/components/common/Provider/ReactQueryProvider';

import '@/styles/_reset.scss';

export const metadata = {
  title: 'mayo',
  description: '마요 사이트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <div id="modal-root"></div>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
