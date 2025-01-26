import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Tej Travels - Cab and Taxi Service',
  description: 'Explore, rent, and enjoy your dream car with Ridex.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=0.75, user-scalable=no" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        {children}

        {/* Include Ionicons */}
        <Script
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          type="module"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          noModule
          strategy="afterInteractive"
        />

        {/* Include Razorpay */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
