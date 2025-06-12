import '../styles/globals.css'; // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add necessary head elements here, like title, meta tags, etc. */}
        <title>CivicMix</title>
        <meta name="description" content="Civic engagement made fun." />
      </head>
      <body>
        {/* Placeholder for Header */}
        <header>Header Placeholder</header>
        <main>{children}</main>
        {/* Placeholder for Footer */}
        <footer>Footer Placeholder</footer>
        {/* Placeholder for ModalsContainer */}
      </body>
    </html>
  );
}