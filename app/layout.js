import "./globals.css";
import { Inter } from "next/font/google";
import ThemeRegistry from "./utilities/ThemeRegistry";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "mui-theme" }}>
          <Nav />

          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
