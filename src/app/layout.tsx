import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { Config } from '@/components/Config';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/banner.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/banner.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='bg-black text-white h-screen flex flex-col justify-between'>
        <Config>
          <Header />
          {children}
          <Footer />
        </Config>
      </body>
    </html>
  );
}
