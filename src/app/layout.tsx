import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eagle Family Carriers Hiring",
  description: "CDL hiring intake with on-brand crest, fast Edge API, and owner portal starter.",
  icons: {
    icon: "/efc-crest.jpeg",
  },
  openGraph: {
    images: [
      {
        url: "/efc-crest.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/efc-crest.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
