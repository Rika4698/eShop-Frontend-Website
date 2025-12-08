
import type { Metadata, Viewport } from "next";
import { Judson,} from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico.png",
  },
};
const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico.png  " sizes="any" />
      <body className={judson.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
