import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import './globals.scss';

export const metadata = {
  title: 'Pet care : Carnet de santé de mon animal',
  description: 'Generated by create next app',
  viewport: 'width=device-width, initial-scale=1'
}

interface IGeneralLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: IGeneralLayout) {
  const App = dynamic(
    () => import("@/app/App"),
    { ssr: false, loading: () => <Loading /> }
  );

  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <App>{children}</App>
      </body>
    </html>
  )
}
