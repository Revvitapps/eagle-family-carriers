import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eagle Family Carriers Hiring",
  description: "CDL hiring intake with on-brand crest, fast Edge API, and owner portal starter.",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
