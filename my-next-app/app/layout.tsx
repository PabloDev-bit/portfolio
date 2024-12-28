import './globals.css'
import { ReactNode } from 'react'
import Navbar from './(components)/Navbar'
import Footer from './(components)/Footer'
import PageTransition from './(components)/PageTransition'


export const metadata = {
  title: 'Pablo | Portfolio',
  description: 'Le portfolio ultra-moderne de Pablo, développeur passionné.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="h-full w-full">
      <body className="relative min-h-screen bg-black text-white overflow-y-auto">
        <Navbar />

        

        {/* Contenu principal */}
        <div className="flex flex-col min-h-screen">
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  )
}
