import Playbar from "@/components/Playbar/Playbar";
import PlaybarProvider from "@/components/Providers/PlaybarProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PlaybarProvider>
        <body>{children}</body>
        <Playbar />
      </PlaybarProvider>
    </html>
  );
}
