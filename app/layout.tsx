import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./context/context";
import "./globals.css";
import Nav from "./coponents/Nav";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title:"Next Chat App",
  description: 'Chat App',
  icons:{
    icon:"/favicon-32x32.png",
    apple:"/apple-touch-icon.png",
    shortcut:"/apple-touch-icon.png",
  },
  other:{
    rel:'/favicon.ico'
  },
  manifest:"/site.webmanifest"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  ${inter.className}`}>
        <Provider>
          <Nav/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
