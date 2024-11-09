import './globals.css';

export const metadata = {
  title: 'BIN Checker',
  description: 'A modern BIN checker tool with enhanced UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}
