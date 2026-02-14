import type { Metadata, Viewport } from 'next'
import { Poppins, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Ahnaf Tahsin | Student, Web Developer & Creative Mind from Bangladesh',
  description:
    'Ahnaf Tahsin is a class 9 student from Bogura, Bangladesh. Passionate about web development, AI, chess, photography, and poetry. Studying at APBN Public School and College.',
  keywords: [
    'Ahnaf Tahsin',
    'ahnaf tahsin',
    'Ahnaf Tahsin Bangladesh',
    'Ahnaf Tahsin Bogura',
    'Ahnaf Tahsin APBN',
    'Ahnaf Tahsin APBN Public School and College',
    '4apbnpsc',
    'Ahnaf Tahsin web developer',
    'Ahnaf Tahsin student',
    'Ahnaf Tahsin portfolio',
    'ahnaftahsin',
    'Ahnaf Tahsin chess',
    'Ahnaf Tahsin photography',
    'Ahnaf Tahsin poetry',
    'Ahnaf Tahsin Tic Tac Khamba',
    'Ahnaf Tahsin retro games',
    'APBN Public School Bogura student',
  ],
  authors: [{ name: 'Ahnaf Tahsin', url: 'https://ahnaftahsin.ami.bd' }],
  creator: 'Ahnaf Tahsin',
  publisher: 'Ahnaf Tahsin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ahnaf Tahsin | Student & Creative Mind from Bangladesh',
    description:
      'Ahnaf Tahsin - Class 9 student from Bogura, Bangladesh. Web developer, AI enthusiast, chess player, photographer, and poet.',
    siteName: 'Ahnaf Tahsin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahnaf Tahsin | Student & Creative Mind from Bangladesh',
    description:
      'Ahnaf Tahsin - Class 9 student, web developer, chess player, photographer from Bogura, Bangladesh.',
    creator: '@ahnaftahsin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ahnaftahsin.ami.bd',
  },
}

export const viewport: Viewport = {
  themeColor: '#5b7cfa',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ahnaf Tahsin',
              url: 'https://ahnaftahsin.ami.bd',
              description: 'Class 9 student from Bogura, Bangladesh. Web developer, AI enthusiast, chess player, photographer.',
              sameAs: ['https://www.facebook.com/ahnaftahsin11', 'https://4apbnpsc.edu.bd/'],
              jobTitle: 'Student',
              worksFor: {
                '@type': 'Organization',
                name: 'APBN Public School and College',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bogura',
                addressCountry: 'BD',
              },
              knowsAbout: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'AI', 'Chess', 'Photography', 'Poetry'],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
