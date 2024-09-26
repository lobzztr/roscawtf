import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThirdwebProvider } from '@/app/thirdweb'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'rosca',
  description: 'rotating credit & savings association onchain',
  icons: {
    icon: '/piggy.png',
    // icon: '/bank.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  )
}