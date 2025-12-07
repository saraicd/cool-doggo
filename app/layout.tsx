import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import BalloonsBackground from "./components/BalloonsBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cool Doggo",
  description: "The existentialist",
  openGraph: {
    title: "Cool Doggo",
    description: "The existentialist",
    url: "https://cooldoggo.com",
    siteName: "Cool Doggo",
    images: [
      {
        url: "https://cooldoggo.com/cool-doggo.png"
      },
    ],
    type: "website",
  },
  keywords: ["dogs", "cool doggo", "existentialism", "memes"],
  authors: [{ name: "Sara Domingues" }],
  creator: "Sara Domingues",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <BalloonsBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
