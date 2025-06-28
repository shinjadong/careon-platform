import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ToastProvider } from "@/lib/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "케어온 - B2B 종합 렌탈 플랫폼",
  description: "렌탈이 아닌, 매출을 만들어드립니다. 프랜차이즈 창업자를 위한 원스톱 렌탈 솔루션",
  keywords: "케어온, B2B 렌탈, 프랜차이즈 창업, 사업장 렌탈, 키오스크 렌탈, POS 렌탈",
  authors: [{ name: "케어온" }],
  creator: "케어온",
  publisher: "케어온",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "케어온 - B2B 종합 렌탈 플랫폼",
    description: "렌탈이 아닌, 매출을 만들어드립니다",
    url: "https://careon.kr",
    siteName: "케어온",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
