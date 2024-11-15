import './globals.css';

export const metadata = {
  title: 'BIN Checker',
  description: 'Generate random test credit card numbers for testing, development,validation and or verification purposes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="BIN Checker, BIN Lookup, Credit Card BIN, Banking Tools, Financial Tools" />
        <meta name="author" content="Nullbite" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bin-check-peach.vercel.app/" />
        <meta property="og:image" content="https://bin-check-peach.vercel.app/f0441c05-5609-4346-8cb8-41e25d4f5965.webp" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://bin-check-peach.vercel.app/f0441c05-5609-4346-8cb8-41e25d4f5965.webp" />
        
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}
