import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE = process.env.NEXT_PUBLIC_BASE_URL || 'https://fundacrecer.org'
const OG_IMAGE = 'https://images.unsplash.com/photo-1614710791641-4cd7a5c855f2?w=1200&h=630&fit=crop'

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Funda Crecer — Sembramos oportunidades, cosechamos futuro',
    template: '%s',
  },
  description: 'ONG dedicada al desarrollo comunitario, educación y esperanza para las nuevas generaciones. Trabajamos con niñas, niños y familias vulnerables en 6 comunidades.',
  keywords: ['ONG', 'Funda Crecer', 'desarrollo comunitario', 'educación', 'donaciones', 'voluntariado', 'niñez', 'becas', 'nutrición'],
  authors: [{ name: 'Funda Crecer' }],
  creator: 'Funda Crecer',
  publisher: 'Funda Crecer',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE,
    siteName: 'Funda Crecer',
    title: 'Funda Crecer — Sembramos oportunidades, cosechamos futuro',
    description: 'ONG dedicada al desarrollo comunitario, educación y esperanza para las nuevas generaciones.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Funda Crecer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Funda Crecer',
    description: 'Sembramos oportunidades, cosechamos futuro.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌱%3C/text%3E%3C/svg%3E" }],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Funda Crecer',
  url: SITE,
  logo: OG_IMAGE,
  description: 'ONG dedicada al desarrollo comunitario, educación y esperanza para las nuevas generaciones.',
  sameAs: ['https://facebook.com/fundacrecer', 'https://instagram.com/fundacrecer', 'https://twitter.com/fundacrecer'],
  contactPoint: { '@type': 'ContactPoint', email: 'hola@fundacrecer.org', contactType: 'customer service', availableLanguage: 'Spanish' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
        {/* Netlify Identity Widget — captura el #invite_token del email
            y redirige a /admin/ luego del primer login. */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
