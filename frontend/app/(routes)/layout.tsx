import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" style={{ zIndex: 99999 }} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
