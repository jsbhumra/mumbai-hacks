import localFont from "next/font/local";
import "./globals.css";
import NextAuthProvider from "@/app/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GenAI Task Management",
  description: "Productivity Track for Mumbai Hacks",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </NextAuthProvider>
  );
}
