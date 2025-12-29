import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4H0FWL25R3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-4H0FWL25R3');
            `,
          }}
        />
      </head>
      <body className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">{children}</body>
    </html>
  );
}
