import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import Provider from '@/components/Auth/Provider';


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JournalX - World\'s Best AI Journaling Platform.',
  description: 'The best AI daily journaling platform where you can chat with your journals and share them with the world.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          {children}
        </Provider>
        
      </body>
    </html>
  )
}
