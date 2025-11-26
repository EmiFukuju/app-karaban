import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CaravanShare - 캠핑카 공유 플랫폼',
  description: '유휴 카라반을 공유하고 특별한 여행을 경험하세요.',
};

import { Toaster } from 'sonner';
import Image from 'next/image'; // Import Image

//...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} relative bg-gray-900`}> {/* Add bg-gray-900 here */}
        <Image
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=80"
          alt="밤하늘 배경"
          fill
          className="object-cover -z-10 opacity-30 pointer-events-none"
        />
        <div className="flex flex-col min-h-screen"> {/* Removed bg-gray-900 from here */}
          <Toaster position="top-center" richColors />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
