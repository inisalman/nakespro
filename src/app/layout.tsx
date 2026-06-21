import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NakesPro.id — Website Profesional Nakes Mulai Rp25.000/bulan",
  description:
    "Website profesional untuk tenaga kesehatan mandiri mulai Rp25.000/bulan. Tanpa repot domain dan server — semua sudah included. Live dalam 1-3 hari, tinggal upload foto dan data praktik.",
  metadataBase: new URL("https://nakespro.id"),
  icons: {
    icon: [{ url: "/nakespro-logo.webp", sizes: "any" }],
    apple: [{ url: "/nakespro-logo.webp" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
