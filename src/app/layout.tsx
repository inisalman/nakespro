import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "NakesPro.id — Jasa Pembuatan Website Tenaga Kesehatan",
  description: "Kami membuat website profesional untuk praktisi kesehatan mandiri (perawat, bidan, fisioterapis, home care). Custom design, responsif, booking online, dan invoice management included.",
  metadataBase: new URL("https://nakespro.id"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="h-full bg-cream text-slate-900">{children}</body>
    </html>
  );
}
