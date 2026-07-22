import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/lib/session-context";

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "책이 되어 걷다",
  description: "탐나라공화국 사유 산책 애플리케이션",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoKR.variable} h-full`}>
      <body className="min-h-full bg-[#dbdad5] font-sans antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-paper">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
