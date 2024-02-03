import type { Metadata } from 'next'
// import { Poppins } from 'next/font/google'
import './globals.css'

import Provider from '@/components/Auth/Provider';
import { Toaster } from '@/components/ui/toaster';

import { Lexend_Deca} from 'next/font/google'


const marhey = Lexend_Deca({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })


// const poppins = Poppins({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
// });

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
      <body className={marhey.className}>
        <Provider>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
