import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authprovider from '@/components/Authprovider/Authprovider'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Security Cell",
  description: "Web Vulnerability Scanning Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authprovider>
          {children}
        </Authprovider>
      </body>
    </html>
  );
}
