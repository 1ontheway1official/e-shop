import Header from "@/components/header/header";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "On The Way E-Shop",
  description: "E-commerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}

            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyright &copy; 2024 - All rights reserved by On The Way</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
