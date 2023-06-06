import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AuthProvider from "@/app/components/Private/AuthProvider";
import Toaster from "@/app/components/Toaster";

interface IApp {
  children: React.ReactNode
}

export default function App({ children }: IApp) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </AuthProvider>
  )
}