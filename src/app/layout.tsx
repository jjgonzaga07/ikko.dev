import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jericho James Gonzaga | Full Stack Developer",
  description: "Portfolio of Jericho James Gonzaga - Full Stack Developer. Code. Build. Scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
