import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import AuthProvider from "@/app/components/Private/AuthProvider";

interface IApp {
  children: React.ReactNode
}

export default function App({ children }: IApp) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  )
}